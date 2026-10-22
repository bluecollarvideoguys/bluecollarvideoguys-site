import type { Metadata } from "next";
import { Oswald, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { OrganizationSchema } from "@/components/seo/schemas";
import { Analytics } from "@/components/analytics/Analytics";
import { SITE } from "@/lib/site";

const display = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Video Marketing for Contractors | Blue Collar Video Guys",
    template: "%s | Blue Collar Video Guys",
  },
  description:
    "Cinematic video, websites, and local SEO for roofers, HVAC, plumbers, and electricians from Medford to Sacramento. Book a free Blueprint call.",
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
  },
  // Search Console / Bing ownership tags. Set the tokens as Vercel env vars.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-concrete text-charcoal">
        <OrganizationSchema />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
