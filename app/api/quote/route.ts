import { env } from "cloudflare:workers";

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([
  "pdf",
  "dwg",
  "dxf",
  "step",
  "stp",
  "iges",
  "igs",
  "zip",
  "jpg",
  "jpeg",
  "png",
]);

interface D1Statement {
  bind(...values: unknown[]): D1Statement;
  run(): Promise<unknown>;
}

interface D1DatabaseBinding {
  prepare(query: string): D1Statement;
  batch(statements: D1Statement[]): Promise<unknown>;
}

interface R2BucketBinding {
  put(
    key: string,
    value: ArrayBuffer,
    options?: {
      httpMetadata?: { contentType?: string };
      customMetadata?: Record<string, string>;
    },
  ): Promise<unknown>;
  delete(key: string): Promise<void>;
}

interface RuntimeBindings {
  DB?: D1DatabaseBinding;
  UPLOADS?: R2BucketBinding;
}

function readText(formData: FormData, key: string, maxLength = 1000) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function safeFilename(filename: string) {
  return filename
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "")
    .slice(0, 120) || "drawing";
}

function createReference() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();
  return `MBC-${date}-${suffix}`;
}

async function ensureSchema(db: D1DatabaseBinding) {
  const table = db.prepare(`
    CREATE TABLE IF NOT EXISTS quote_requests (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      company TEXT NOT NULL,
      contact_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      project_type TEXT NOT NULL,
      material TEXT,
      profile TEXT,
      quantity INTEGER,
      radius TEXT,
      timeline TEXT,
      notes TEXT,
      file_key TEXT,
      file_name TEXT,
      file_type TEXT,
      file_size INTEGER
    )
  `);
  const index = db.prepare(
    "CREATE INDEX IF NOT EXISTS quote_requests_created_at_idx ON quote_requests (created_at)",
  );
  await db.batch([table, index]);
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_FILE_SIZE + 1024 * 1024) {
    return Response.json({ error: "The upload is too large. Please keep files under 25 MB." }, { status: 413 });
  }

  try {
    const formData = await request.formData();
    const company = readText(formData, "company", 160);
    const contactName = readText(formData, "contactName", 120);
    const email = readText(formData, "email", 200).toLowerCase();
    const projectType = readText(formData, "projectType", 100);

    if (!company || !contactName || !projectType || !email.includes("@")) {
      return Response.json({ error: "Please complete the required contact and project fields." }, { status: 400 });
    }

    const bindings = env as unknown as RuntimeBindings;
    if (!bindings.DB) {
      return Response.json(
        { error: "Online quote storage is being connected. Please call (714) 238-1200 in the meantime." },
        { status: 503 },
      );
    }

    const reference = createReference();
    const createdAt = new Date().toISOString();
    const fileValue = formData.get("file");
    const drawing = fileValue instanceof File && fileValue.size > 0 ? fileValue : null;
    let fileKey: string | null = null;
    let storedFilename: string | null = null;

    if (drawing) {
      if (drawing.size > MAX_FILE_SIZE) {
        return Response.json({ error: "Please keep drawings and CAD files under 25 MB." }, { status: 413 });
      }

      const extension = drawing.name.split(".").pop()?.toLowerCase() || "";
      if (!ALLOWED_EXTENSIONS.has(extension)) {
        return Response.json(
          { error: "Please upload a PDF, DWG, DXF, STEP, IGES, ZIP, JPG, or PNG file." },
          { status: 415 },
        );
      }
      if (!bindings.UPLOADS) {
        return Response.json(
          { error: "Drawing uploads are being connected. You can continue without the file or call us for help." },
          { status: 503 },
        );
      }

      storedFilename = safeFilename(drawing.name);
      fileKey = `quotes/${reference}/${storedFilename}`;
      await bindings.UPLOADS.put(fileKey, await drawing.arrayBuffer(), {
        httpMetadata: { contentType: drawing.type || "application/octet-stream" },
        customMetadata: { reference, company },
      });
    }

    try {
      await ensureSchema(bindings.DB);
      const rawQuantity = readText(formData, "quantity", 10);
      const quantity = rawQuantity ? Number.parseInt(rawQuantity, 10) : null;

      await bindings.DB.prepare(`
        INSERT INTO quote_requests (
          id, created_at, status, company, contact_name, email, phone,
          project_type, material, profile, quantity, radius, timeline, notes,
          file_key, file_name, file_type, file_size
        ) VALUES (?, ?, 'new', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
        .bind(
          reference,
          createdAt,
          company,
          contactName,
          email,
          readText(formData, "phone", 60) || null,
          projectType,
          readText(formData, "material", 100) || null,
          readText(formData, "profile", 200) || null,
          Number.isFinite(quantity) ? quantity : null,
          readText(formData, "radius", 120) || null,
          readText(formData, "timeline", 80) || null,
          readText(formData, "notes", 4000) || null,
          fileKey,
          storedFilename,
          drawing?.type || null,
          drawing?.size || null,
        )
        .run();
    } catch (databaseError) {
      if (fileKey && bindings.UPLOADS) await bindings.UPLOADS.delete(fileKey);
      throw databaseError;
    }

    return Response.json({ reference });
  } catch (error) {
    console.error("Quote request failed", error);
    return Response.json(
      { error: "We could not save your request. Please try again or call (714) 238-1200." },
      { status: 500 },
    );
  }
}
