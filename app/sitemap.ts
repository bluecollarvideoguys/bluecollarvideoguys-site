import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { AREAS } from "@/content/areas";
import { INDUSTRIES } from "@/content/industries";
import { SERVICES } from "@/content/services";

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
  { path: "/about", lastModified: "2026-10-21", priority: 0.6 },
  { path: "/faq", lastModified: "2026-10-21", priority: 0.6 },
  ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, lastModified: s.updated, priority: 0.8 })),
  { path: "/industries", lastModified: "2026-10-21", priority: 0.7 },
  ...INDUSTRIES.map((i) => ({ path: `/industries/${i.slug}`, lastModified: i.updated, priority: 0.8 })),
  { path: "/areas", lastModified: "2026-10-21", priority: 0.7 },
  ...AREAS.map((a) => ({
    path: `/areas/${a.slug}`,
    lastModified: a.updated,
    priority: a.slug === "redding-ca" ? 0.9 : 0.7,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({
    url: r.path === "/" ? SITE.url : `${SITE.url}${r.path}`,
    lastModified: new Date(r.lastModified),
    priority: r.priority,
  }));
}
