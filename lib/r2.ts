import { S3Client } from "@aws-sdk/client-s3";

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not set`);
  return value;
}

export function getR2Config() {
  const accountId = required("R2_ACCOUNT_ID");
  return {
    accountId,
    accessKeyId: required("R2_ACCESS_KEY_ID"),
    secretAccessKey: required("R2_SECRET_ACCESS_KEY"),
    bucket: required("R2_BUCKET_NAME"),
    publicBaseUrl: required("R2_PUBLIC_URL").replace(/\/$/, ""),
  };
}

export function getR2Client() {
  const { accountId, accessKeyId, secretAccessKey } = getR2Config();
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
}

export function publicObjectUrl(key: string) {
  const { publicBaseUrl } = getR2Config();
  return `${publicBaseUrl}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

export const ALLOWED_VIDEO_EXTENSIONS = /\.(mp4|mov|m4v|webm)$/i;

export const ALLOWED_VIDEO_TYPES = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/x-m4v",
  "video/x-quicktime",
  "application/octet-stream",
]);
