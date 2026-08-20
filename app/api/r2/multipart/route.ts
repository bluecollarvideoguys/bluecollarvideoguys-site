import {
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import {
  ALLOWED_VIDEO_EXTENSIONS,
  ALLOWED_VIDEO_TYPES,
  getR2Client,
  getR2Config,
  publicObjectUrl,
} from "@/lib/r2";

type CreateBody = {
  action: "create";
  filename: string;
  contentType: string;
};

type SignPartBody = {
  action: "sign-part";
  key: string;
  uploadId: string;
  partNumber: number;
};

type CompleteBody = {
  action: "complete";
  key: string;
  uploadId: string;
  parts: { partNumber: number; etag: string }[];
};

type Body = CreateBody | SignPartBody | CompleteBody;

function safeFileName(name: string) {
  const cleaned = name.replace(/[^\w.\-]+/g, "-").replace(/^\.+/, "");
  return cleaned || "video.mp4";
}

function uniqueKey(filename: string) {
  const base = safeFileName(filename);
  const suffix = randomBytes(8).toString("hex");
  const dot = base.lastIndexOf(".");
  if (dot === -1) return `videos/${base}-${suffix}`;
  return `videos/${base.slice(0, dot)}-${suffix}${base.slice(dot)}`;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as Body;
    const client = getR2Client();
    const { bucket } = getR2Config();

    if (body.action === "create") {
      if (!ALLOWED_VIDEO_EXTENSIONS.test(body.filename)) {
        throw new Error("Only MP4 and MOV files are allowed");
      }
      if (body.contentType && !ALLOWED_VIDEO_TYPES.has(body.contentType)) {
        throw new Error("Unsupported video content type");
      }

      const key = uniqueKey(body.filename);
      const contentType = body.contentType || "video/mp4";
      const created = await client.send(
        new CreateMultipartUploadCommand({
          Bucket: bucket,
          Key: key,
          ContentType: contentType,
        }),
      );

      if (!created.UploadId) throw new Error("Could not start multipart upload");

      return NextResponse.json({
        key,
        uploadId: created.UploadId,
      });
    }

    if (body.action === "sign-part") {
      if (!body.key?.startsWith("videos/") || !body.uploadId || !body.partNumber) {
        throw new Error("Invalid part request");
      }
      if (body.partNumber < 1 || body.partNumber > 10000) {
        throw new Error("Invalid part number");
      }

      const url = await getSignedUrl(
        client,
        new UploadPartCommand({
          Bucket: bucket,
          Key: body.key,
          UploadId: body.uploadId,
          PartNumber: body.partNumber,
        }),
        { expiresIn: 60 * 60 },
      );

      return NextResponse.json({ url });
    }

    if (body.action === "complete") {
      if (!body.key?.startsWith("videos/") || !body.uploadId || !body.parts?.length) {
        throw new Error("Invalid complete request");
      }

      await client.send(
        new CompleteMultipartUploadCommand({
          Bucket: bucket,
          Key: body.key,
          UploadId: body.uploadId,
          MultipartUpload: {
            Parts: body.parts
              .slice()
              .sort((a, b) => a.partNumber - b.partNumber)
              .map((p) => ({
                ETag: p.etag,
                PartNumber: p.partNumber,
              })),
          },
        }),
      );

      return NextResponse.json({
        key: body.key,
        url: publicObjectUrl(body.key),
      });
    }

    throw new Error("Unknown action");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
