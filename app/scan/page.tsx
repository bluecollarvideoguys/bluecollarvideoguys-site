import { connection } from "next/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FunnelPage } from "@/components/FunnelPage";
import { getScanRedirectUrl } from "@/lib/funnel";
import { recordQrScanFromHeaders } from "@/lib/qr-tracking";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  await connection();
  const requestHeaders = await headers();
  const dest = getScanRedirectUrl();
  await recordQrScanFromHeaders(requestHeaders, dest);
  if (dest) redirect(dest);
  return <FunnelPage />;
}
