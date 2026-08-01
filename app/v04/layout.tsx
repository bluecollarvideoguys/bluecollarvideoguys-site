import type { Metadata } from "next";
import { DM_Sans, Satisfy } from "next/font/google";
import "./v04.css";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-v04-sans",
});

const script = Satisfy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-v04-script",
});

export const metadata: Metadata = {
  title: "Version 04 | The Blue Collar Video Guys™",
  description:
    "Authentic video marketing for blue-collar businesses. Build Trust. Stand Out. Win More Work.",
};

export default function Version04Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${sans.variable} ${script.variable} v04-root min-h-screen`}>
      {children}
    </div>
  );
}
