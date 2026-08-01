import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./v07.css";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-v07-sans",
});

export const metadata: Metadata = {
  title: "Version 07 | The Blue Collar Video Guys™",
  description:
    "Authentic video marketing for blue-collar businesses. Build Trust. Stand Out. Win More Work. Powered by The Blue Collar Blueprint™.",
};

export default function Version07Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${sans.variable} v07-root min-h-screen overflow-x-hidden`}>
      {children}
    </div>
  );
}
