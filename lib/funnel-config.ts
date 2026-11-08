/**
 * Strategy-call funnel settings. Swap videos, form, calendar, and the
 * bracketed offer lines here. Do not put package prices in this file.
 */
export const funnelConfig = {
  popupFormId: "LeSafpjBGshdr1H94oyB", // GHL "BCVG Popup Form"
  calendarId: "XsWGjZKCObXLVh3K5mU9", // GHL "Free Video Strategy Call"
  calendarUrl:
    "https://api.leadconnectorhq.com/widget/booking/XsWGjZKCObXLVh3K5mU9",
  videos: {
    heroLoop: "FILLER_VIDEO_URL", // short muted loop of job site footage
    brandMessage: "FILLER_VIDEO_URL", // 60 to 90 sec, who we are
    testimonial: "FILLER_VIDEO_URL", // 30 to 60 sec, client result + guarantee
    thankYou: "FILLER_VIDEO_URL", // 30 to 60 sec, Kathy explaining the call
  },
  /** Poster used until a real video URL replaces FILLER_VIDEO_URL. */
  poster: "/images/purpose-videographer.png",
  /** Still empty on purpose. The proof slot hides when this list is empty. */
  proofClips: [] as { name: string; town: string; src: string; alt: string }[],
  /** Per-item Foundation values. [brackets] stay until Kathy fills them in. */
  showStackValues: true,
  foundationItems: [
    { label: "Trust strategy and 3 strategy sessions", value: "[value]" },
    { label: "Brand message video", value: "[value]" },
    { label: "Promotional video", value: "[value]" },
    { label: "3 testimonial videos", value: "[value]" },
    { label: "15 branding photos", value: "[value]" },
    { label: "10 social reels", value: "[value]" },
    {
      label: "Pre production guide, checklist, and shot list planning",
      value: "[value]",
    },
  ],
  foundationTotal: "[total]",
  bonusEnabled: true,
  monthlyClientLimit: 3,
  bonus: {
    hero: "Book this month and get a bonus client testimonial video, free.",
    stack:
      "Bonus when you book this month: an extra client testimonial video",
    stackValue: "[value]",
    scarcity:
      "Book your strategy call this month and get a bonus client testimonial video added to any package, free. That's one more customer on camera telling homeowners why they hired you.",
  },
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID, // add later
  googleTagId: process.env.NEXT_PUBLIC_GOOGLE_TAG_ID, // add later
  googleAdsConversion: process.env.NEXT_PUBLIC_GADS_CONVERSION, // add later, format AW-XXXX/YYYY
};

export const FUNNEL_ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "fbclid",
  "gclid",
] as const;

export const CALENDAR_PREFILL_KEYS = [
  "first_name",
  "last_name",
  "email",
  "phone",
] as const;

export function isPlayableVideo(url: string) {
  return Boolean(url) && !url.startsWith("FILLER_");
}
