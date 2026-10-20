import { NextResponse } from "next/server";
import { getScanRedirectUrl } from "@/lib/funnel";
import { recordQrScanFromHeaders } from "@/lib/qr-tracking";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const dest = getScanRedirectUrl();
  await recordQrScanFromHeaders(request.headers, dest);
  if (dest) {
    return NextResponse.redirect(dest, 307);
  }
  return NextResponse.rewrite(new URL("/scan/open", request.url));
}
