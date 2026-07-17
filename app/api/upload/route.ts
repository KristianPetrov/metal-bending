import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

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

const ALLOWED_CONTENT_TYPES = [
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/octet-stream",
  "application/acad",
  "application/x-acad",
  "application/autocad_dwg",
  "application/dwg",
  "application/dxf",
  "image/vnd.dwg",
  "image/x-dwg",
  "model/step",
  "application/step",
  "model/iges",
  "application/iges",
  "image/jpeg",
  "image/png",
];

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const extension = pathname.split(".").pop()?.toLowerCase() || "";
        if (!pathname.startsWith("quotes/pending/") || !ALLOWED_EXTENSIONS.has(extension)) {
          throw new Error("This file type is not accepted for quote uploads.");
        }

        return {
          allowedContentTypes: ALLOWED_CONTENT_TYPES,
          maximumSizeInBytes: MAX_FILE_SIZE,
          addRandomSuffix: false,
          tokenPayload: pathname,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.info("Quote drawing uploaded", blob.pathname);
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Quote upload authorization failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "The drawing could not be uploaded." },
      { status: 400 },
    );
  }
}
