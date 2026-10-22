import type { Metadata } from "next";

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
    },
    twitter: {
      title: absoluteTitle ? title : `${title} | Blue Collar Video Guys`,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Metadata for internal design archives and other non-public pages. */
export const NOINDEX: Metadata["robots"] = { index: false, follow: false };
