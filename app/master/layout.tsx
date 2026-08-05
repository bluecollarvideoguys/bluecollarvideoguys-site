import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./master.css";

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

export const metadata: Metadata = {
  title: "Master | The Blue Collar Video Guys™",
  description:
    "Master copy of Version 02. Authentic video marketing for blue-collar businesses. Build Trust. Stand Out. Win More Work.",
};

export default function MasterLayout({
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
