/**
 * Paid ad landing pages at /lp/[slug]. These are noindexed and kept out of the
 * sitemap because they duplicate the SEO pages. Copy can use {trade} and {city}
 * tokens; they are filled from ?trade= and ?city= in the ad's final URL
 * (for example /lp/contractor-video?trade=roofing&city=redding-ca), with the
 * fallbacks below when a parameter is missing.
 */

export type LandingPage = {
  slug: string;
  channel: "Google" | "Facebook";
  headline: string;
  subhead: string;
  proofLine: string;
  bullets: string[];
  formHeadline: string;
  defaultTrade: string;
  defaultCity: string;
};

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "contractor-video",
    channel: "Facebook",
    headline: "Your {trade} crew does great work. Does anyone know it?",
    subhead:
      "We film your crew, your projects, and your happy customers, then turn it into marketing that brings {city} customers to you already trusting your work.",
    proofLine: "Video, photos, websites, and SEO built only for the trades.",
    bullets: [
      "Brand films and customer testimonials shot on your real job sites",
      "Photos and short videos for your website, Google profile, and social",
      "A clear Blueprint for turning your reputation into better jobs",
    ],
    formHeadline: "Get your free Blueprint call",
    defaultTrade: "contracting",
    defaultCity: "North State",
  },
  {
    slug: "roofing-marketing",
    channel: "Google",
    headline: "Roofing Marketing That Wins the Bigger Jobs in {city}",
    subhead:
      "Homeowners pick the roofer they trust before they ever call. We help you prove it with real project films, testimonials, and local SEO.",
    proofLine: "Local video and marketing for roofing companies, based in Redding.",
    bullets: [
      "Drone and time lapse project films that show your quality from every angle",
      "Homeowner testimonials that beat storm chasers on trust",
      "A Google profile and website that turn searches into estimates",
    ],
    formHeadline: "Book a free roofing marketing call",
    defaultTrade: "roofing",
    defaultCity: "the North State",
  },
  {
    slug: "video-production-redding",
    channel: "Google",
    headline: "Video Production for {city} Contractors",
    subhead:
      "Brand films, testimonials, job site photos, and websites for {trade} businesses. Local crew, based in Redding, ready to film this month.",
    proofLine: "Serving Redding, Anderson, Shasta Lake, Red Bluff, Corning, and Mount Shasta.",
    bullets: [
      "Half day and full day shoots planned around your crew's schedule",
      "Finished videos sized for your website, Google profile, and ads",
      "Straightforward packages with no long sales process",
    ],
    formHeadline: "Get a free shoot plan",
    defaultTrade: "trades",
    defaultCity: "Redding",
  },
];

export function getLandingPage(slug: string) {
  return LANDING_PAGES.find((p) => p.slug === slug);
}
