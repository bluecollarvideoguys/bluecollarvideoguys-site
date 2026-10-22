import { PHONE_DISPLAY, PHONE_HREF, SITE_ORIGIN } from "@/lib/contact";

/**
 * Single source of truth for business facts used in metadata and schema.
 * Keep name, phone, and email identical everywhere (NAP consistency).
 * Values left as empty strings are skipped in structured data until filled in.
 */
export const SITE = {
  name: "The Blue Collar Video Guys",
  shortName: "Blue Collar Video Guys",
  alternateName: "BCVG",
  url: SITE_ORIGIN,
  email: "build@bluecollarvideoguys.com",
  phoneDisplay: PHONE_DISPLAY,
  /** E.164 format for schema, derived from the tel: link. */
  phoneE164: PHONE_HREF.replace("tel:", ""),
  description:
    "Video marketing for contractors and trades businesses in Southern Oregon and Northern California: cinematic video, photography, websites, SEO, social media, and ads.",
  logo: `${SITE_ORIGIN}/brand/primary-stacked.png`,
  image: `${SITE_ORIGIN}/opengraph-image.png`,
  /** TODO: fill in the base city and ZIP used for the Google Business Profile. */
  address: {
    addressLocality: "",
    addressRegion: "",
    postalCode: "",
    addressCountry: "US",
  },
  /** TODO: founding year (for example "2026"). */
  foundingDate: "",
  founders: ["Anthony Fowler", "Kathy Coker"],
  areaServed: {
    cities: [
      { name: "Redding", state: "CA" },
      { name: "Chico", state: "CA" },
      { name: "Red Bluff", state: "CA" },
      { name: "Sacramento", state: "CA" },
      { name: "Medford", state: "OR" },
      { name: "Grants Pass", state: "OR" },
    ],
    states: ["California", "Oregon"],
  },
  knowsAbout: [
    "Video production",
    "Contractor marketing",
    "Local SEO",
    "Website design",
    "Construction photography",
    "Social media marketing",
  ],
  /** TODO: add profile URLs as they go live (Google Business Profile, YouTube, Instagram, Facebook, LinkedIn). */
  sameAs: [] as string[],
} as const;
