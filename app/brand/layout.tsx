import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./brand.css";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-brand-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-brand-body",
});

export const metadata: Metadata = {
  title: "Brand Guide | The Blue Collar Video Guys™",
  description:
    "Official brand identity for The Blue Collar Video Guys™ — logos, color, type, and voice.",
  robots: { index: false, follow: false },
};

export default function BrandLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${display.variable} ${body.variable} brand-guide min-h-screen`}
    >
      {children}
    </div>
  );
}
