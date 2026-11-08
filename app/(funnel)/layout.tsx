import type { Metadata } from "next";
import "../v02/v02.css";
import "@/components/funnel/funnel.css";
import { FunnelTracking } from "@/components/funnel/FunnelTracking";
import { v02Body, v02Display } from "@/lib/v02-fonts";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${v02Display.variable} ${v02Body.variable} v02-root funnel-root min-h-screen`}>
      <FunnelTracking />
      {children}
    </div>
  );
}
