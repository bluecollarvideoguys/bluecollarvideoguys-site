/**
 * Conversion tracking helpers for GA4, Google Ads, and Meta Pixel.
 * Everything is a no-op until the matching NEXT_PUBLIC_* ID is set.
 */

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;
/** Google Ads conversion labels, set once conversions exist in Google Ads. */
const GADS_LABELS: Record<string, string | undefined> = {
  generate_lead: process.env.NEXT_PUBLIC_GADS_LEAD_LABEL,
  calendly_booked: process.env.NEXT_PUBLIC_GADS_BOOKED_LABEL,
};
/** GA4 event name to Meta standard event. */
const META_EVENTS: Record<string, string> = {
  generate_lead: "Lead",
  calendly_booked: "Schedule",
  phone_click: "Contact",
  email_click: "Contact",
};

export function trackEvent(name: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const withSource = { ...params, ...getAttribution() };

  window.gtag?.("event", name, withSource);

  const label = GADS_LABELS[name];
  if (GADS_ID && label) {
    window.gtag?.("event", "conversion", { send_to: `${GADS_ID}/${label}` });
  }

  const metaEvent = META_EVENTS[name];
  if (metaEvent) window.fbq?.("track", metaEvent, params);
}

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;
const STORAGE_KEY = "bcvg_attribution";

/** Save ad and campaign parameters from the landing URL for the rest of the visit. */
export function captureAttribution() {
  try {
    const url = new URL(window.location.href);
    const found: Record<string, string> = {};
    for (const key of ATTRIBUTION_KEYS) {
      const v = url.searchParams.get(key);
      if (v) found[key] = v;
    }
    if (Object.keys(found).length) {
      found.landing_page = url.pathname;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    }
  } catch {
    // Storage blocked (private mode). Tracking still works without attribution.
  }
}

export function getAttribution(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

const GHL_EVENTS_URL = "https://backend.leadconnectorhq.com/external-tracking/events";

function readHighLevelSession(trackingId: string): string | null {
  const key = `lc_session_${trackingId}`;
  try {
    const fromCookie = document.cookie
      .split("; ")
      .find((part) => part.startsWith(`${key}=`))
      ?.slice(key.length + 1);
    if (fromCookie) return decodeURIComponent(fromCookie);
  } catch {
    // Cookie blocked. Fall through to session storage.
  }
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * GoHighLevel's script records only the first full page load. Next.js moves
 * between pages without a reload, so later pages need their own page view.
 * Returns false when the script has not created a session yet.
 */
export async function trackHighLevelPageView(
  trackingId: string,
  referrer: string,
): Promise<boolean> {
  const sessionId = readHighLevelSession(trackingId);
  if (!sessionId) return false;
  const agent = navigator.userAgent.toLowerCase();
  const deviceType =
    agent.includes("mobi") ||
    agent.includes("iphone") ||
    agent.includes("ipod") ||
    (agent.includes("android") && agent.includes("mobile"))
      ? "mobile"
      : "desktop";
  const event = {
    type: "external_script_page_view",
    timestamp: Date.now(),
    title: document.title,
    url: window.location.href,
    path: window.location.pathname,
    referrer,
    userAgent: navigator.userAgent,
    properties: { sessionId, deviceType },
    trackingId,
    sessionId,
  };
  try {
    const response = await fetch(GHL_EVENTS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
      keepalive: true,
    });
    return response.ok;
  } catch {
    return false;
  }
}
