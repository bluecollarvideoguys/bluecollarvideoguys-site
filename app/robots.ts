import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Search engines and AI search crawlers we want to be found and cited by.
        userAgent: [
          "*",
          "Googlebot",
          "Bingbot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
        ],
        allow: "/",
        // Private tools. Archive design pages are noindexed instead of blocked
        // so Google can see the noindex and drop them.
        disallow: ["/api/", "/scan", "/upload", "/confirmation"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
