import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Barlow_Condensed, Inter } from "next/font/google";
import "../v02/v02.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-v02-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-v02-body",
});

// Noindexed until the placeholder quotes and sample clips are replaced with real client proof.
export const metadata: Metadata = buildMetadata({
  title: "Manifesto and Toolbox",
  description:
    "Why we exist: the Blue Collar Video Guys manifesto, toolbox, and proof from the job site.",
  path: "/testimonials",
  noindex: true,
});

export default function TestimonialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${display.variable} ${body.variable} v02-root min-h-screen`}
    >
      {children}
    </div>
  );
}
