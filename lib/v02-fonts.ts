import { Barlow_Condensed, Inter } from "next/font/google";

/** Shared v02 fonts for new page layouts (same as the home and services layouts). */
export const v02Display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-v02-display",
});

export const v02Body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-v02-body",
});
