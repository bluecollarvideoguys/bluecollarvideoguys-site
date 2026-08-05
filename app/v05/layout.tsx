import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./v05.css";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-v05-sans",
});

const display = localFont({
  src: "../fonts/sketchup/Sketchup.woff2",
  variable: "--font-v05-display",
  display: "swap",
  weight: "400",
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
