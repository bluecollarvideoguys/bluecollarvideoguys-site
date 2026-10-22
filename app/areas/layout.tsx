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

export default function AreasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${display.variable} ${body.variable} v02-root min-h-screen`}>
      {children}
    </div>
  );
}
