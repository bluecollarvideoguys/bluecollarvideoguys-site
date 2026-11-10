import type { Metadata } from "next";
import { SITE } from "@/lib/site";

/** Explicit share image. The query keeps Facebook from reusing a cached logo. */
const shareImage = {
  url: `${SITE.image}?v=2`,
  width: 1200,
  height: 630,
  alt: "The Blue Collar Video Guys",
};

type BuildMetadataInput = {
  /** Page title. The root layout template appends "| Blue Collar Video Guys". */
  title: string;
  description?: string;
  /** Path starting with "/", used for the canonical URL. */
  path: string;
  /** Use the title exactly as given, without the site name template. */
  absoluteTitle?: boolean;
  /** Keep the page out of search results (test pages, placeholders). */
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  noindex = false,
}: BuildMetadataInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: absoluteTitle ? title : `${title} | Blue Collar Video Guys`,
      description,
      url: path,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? title : `${title} | Blue Collar Video Guys`,
      description,
      images: [shareImage.url],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Metadata for internal design archives and other non-public pages. */
export const NOINDEX: Metadata["robots"] = { index: false, follow: false };
