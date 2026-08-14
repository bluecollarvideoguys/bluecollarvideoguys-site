import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono, DM_Sans, Inter, Manrope, Satisfy } from "next/font/google";
import localFont from "next/font/local";
import "./v03.css";
import "./styles/v04.css";
import "./styles/v05.css";
import "./styles/v06.css";
import "./styles/v07.css";

const v03Sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-v03-sans",
});

const v03Mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-v03-mono",
});

const v04Sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-v04-sans",
});

const v04Script = Satisfy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-v04-script",
});

const v05Sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-v05-sans",
});

const v05Display = localFont({
  src: "../fonts/sketchup/Sketchup.woff2",
  variable: "--font-v05-display",
  display: "swap",
  weight: "400",
});

const v06Sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-v06-sans",
});

const v06Display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-v06-display",
});

const v06Mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-v06-mono",
});

const v07Sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-v07-sans",
});

export const metadata: Metadata = {
  title: "Versions 03–07 archive | The Blue Collar Video Guys™",
  description:
    "Stacked archive of design explorations 03–07 for element reference.",
};

export default function Version03Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        v03Sans.variable,
        v03Mono.variable,
        v04Sans.variable,
        v04Script.variable,
        v05Sans.variable,
        v05Display.variable,
        v06Sans.variable,
        v06Display.variable,
        v06Mono.variable,
        v07Sans.variable,
        "min-h-screen",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
