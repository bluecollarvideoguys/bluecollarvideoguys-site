import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

function assertUploadAccess(request: Request) {
  const secret = process.env.UPLOAD_SECRET;
  if (!secret) {
    throw new Error("UPLOAD_SECRET is not set");
  }
  const provided = request.headers.get("x-upload-secret")?.trim();
  if (provided !== secret.trim()) {
    throw new Error("Not authorized");
  }
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    assertUploadAccess(request);
    const { blobs } = await list({
      prefix: "videos/",
      limit: 100,
    });
    return NextResponse.json({
      blobs: blobs.map((b) => ({
        url: b.url,
        pathname: b.pathname,
        size: b.size,
        uploadedAt: b.uploadedAt,
      })),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const status = message === "Not authorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
