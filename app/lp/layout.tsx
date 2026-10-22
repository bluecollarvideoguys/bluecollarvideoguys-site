import type { Metadata } from "next";
import "../v02/v02.css";
import { v02Body, v02Display } from "@/lib/v02-fonts";

// Ad landing pages: keep out of search results so they never compete with SEO pages.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${v02Display.variable} ${v02Body.variable} v02-root min-h-screen`}>
      {children}
    </div>
  );
}
