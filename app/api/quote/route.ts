import { del, head, put, rename } from "@vercel/blob";

export const runtime = "nodejs";
export const maxDuration = 60;

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

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 1024 * 1024) {
    return Response.json({ error: "The quote request is too large." }, { status: 413 });
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

    if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
      return Response.json(
        { error: "Online quote storage is being connected. Please call (714) 238-1200 in the meantime." },
        { status: 503 },
      );
    }

    const reference = createReference();
    const createdAt = new Date().toISOString();
    const pendingFilePath = readText(formData, "filePathname", 500);
    const submittedFileName = safeFilename(
      readText(formData, "fileName", 160) || pendingFilePath.split("/").pop() || "drawing",
    );
    let drawing: Awaited<ReturnType<typeof rename>> | null = null;
    let drawingSize: number | null = null;

    if (pendingFilePath) {
      const extension = pendingFilePath.split(".").pop()?.toLowerCase() || "";
      if (!pendingFilePath.startsWith("quotes/pending/") || !ALLOWED_EXTENSIONS.has(extension)) {
        return Response.json({ error: "The uploaded drawing reference is invalid." }, { status: 400 });
      }

      const pendingBlob = await head(pendingFilePath);
      if (pendingBlob.size > MAX_FILE_SIZE) {
        await del(pendingFilePath);
        return Response.json({ error: "Please keep drawings and CAD files under 25 MB." }, { status: 413 });
      }

      drawingSize = pendingBlob.size;

      drawing = await rename(pendingFilePath, `quotes/${reference}/${submittedFileName}`, {
        access: "private",
        addRandomSuffix: false,
      });
    }

    const rawQuantity = readText(formData, "quantity", 10);
    const quantity = rawQuantity ? Number.parseInt(rawQuantity, 10) : null;
    const quoteRecord = {
      id: reference,
      createdAt,
      status: "new",
      company,
      contactName,
      email,
      phone: readText(formData, "phone", 60) || null,
      projectType,
      material: readText(formData, "material", 100) || null,
      profile: readText(formData, "profile", 200) || null,
      quantity: Number.isFinite(quantity) ? quantity : null,
      radius: readText(formData, "radius", 120) || null,
      timeline: readText(formData, "timeline", 80) || null,
      notes: readText(formData, "notes", 4000) || null,
      drawing: drawing
        ? {
            pathname: drawing.pathname,
            filename: submittedFileName,
            contentType: drawing.contentType,
            size: drawingSize,
          }
        : null,
    };

    try {
      await put(`quotes/${reference}/request.json`, JSON.stringify(quoteRecord, null, 2), {
        access: "private",
        addRandomSuffix: false,
        contentType: "application/json",
      });
    } catch (metadataError) {
      if (drawing) await del(drawing.pathname);
      throw metadataError;
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
