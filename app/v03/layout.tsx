import type { Metadata } from "next";
import { DM_Mono, Manrope } from "next/font/google";
import "./v03.css";

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-v03-sans",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-v03-mono",
});

export const metadata: Metadata = {
  title: "Version 03 | The Blue Collar Video Guys™",
  description:
    "Authentic video marketing for blue-collar businesses. Build Trust. Stand Out. Win More Work. Powered by The Blue Collar Blueprint™.",
};

export default function Version03Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${sans.variable} ${mono.variable} v03-root min-h-screen`}>
      {children}
    </div>
  );
}
