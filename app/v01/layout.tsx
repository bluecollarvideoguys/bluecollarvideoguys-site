import type { Metadata } from "next";
import { NOINDEX } from "@/lib/seo";

// Internal design archive. Not for search results.
export const metadata: Metadata = {
  title: "Version 01 (archive)",
  robots: NOINDEX,
};

export default function Version01Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
