import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./v05.css";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-v05-sans",
});

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-v05-display",
});

export const metadata: Metadata = {
  title: "Version 05 | The Blue Collar Video Guys™",
  description:
    "Authentic video marketing for blue-collar businesses. Build Trust. Stand Out. Win More Work. Powered by The Blue Collar Blueprint™.",
};

export default function Version05Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${sans.variable} ${display.variable} v05-root min-h-screen`}
    >
      {children}
    </div>
  );
}
