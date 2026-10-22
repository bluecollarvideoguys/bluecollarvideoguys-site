import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Indexable routes only. When you add a public page, add it here with the date
 * its content last meaningfully changed (not today's date on every build).
 * Noindexed pages (archive versions, /testimonials while it has placeholders,
 * /privacy, /brand, /scan, /upload, /confirmation) stay out.
 */
const ROUTES: { path: string; lastModified: string; priority: number }[] = [
  { path: "/", lastModified: "2026-10-21", priority: 1 },
  { path: "/services", lastModified: "2026-10-21", priority: 0.9 },
  { path: "/contact", lastModified: "2026-10-21", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: r.path === "/" ? SITE.url : `${SITE.url}${r.path}`,
    lastModified: new Date(r.lastModified),
    priority: r.priority,
  }));
}
