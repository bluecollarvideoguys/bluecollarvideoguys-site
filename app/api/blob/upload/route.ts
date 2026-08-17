import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

const ALLOWED_EXTENSIONS = /\.(mp4|mov|m4v|webm)$/i;

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!ALLOWED_EXTENSIONS.test(pathname)) {
          throw new Error("Only MP4 and MOV files are allowed");
        }

        return {
          allowedContentTypes: [
            "video/mp4",
            "video/webm",
            "video/quicktime",
            "video/x-m4v",
            "video/x-quicktime",
          ],
          addRandomSuffix: true,
          // Blob client-upload ceiling (5 TB) — no smaller app cap
          maximumSizeInBytes: 5 * 1024 * 1024 * 1024 * 1024,
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Blob upload completed:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
