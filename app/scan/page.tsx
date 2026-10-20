import { redirect } from "next/navigation";
import { FunnelPage } from "@/components/FunnelPage";
import { getScanRedirectUrl } from "@/lib/funnel";

export default function Page() {
  const dest = getScanRedirectUrl();
  if (dest) redirect(dest);
  return <FunnelPage />;
}
