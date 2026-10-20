import { CALENDLY_URL } from "@/lib/calendly";

/** Default intro + follow-up film (YouTube) */
export const FUNNEL_DEFAULT_VIDEO_URL =
  "https://youtu.be/sCWnuYjMkow?si=Eh4_tOE9YzCXZJgx";

export const FUNNEL_PATH = "/scan";
export const FUNNEL_PRINT_PATH = "/scan/print";

/** Homepage for printed QR scans until we point /scan somewhere else. */
export const SCAN_DEFAULT_REDIRECT_URL = "https://www.bluecollarvideoguys.com";

/**
 * The printed QR always goes to /scan. Default is the website.
 * Set SCAN_REDIRECT_URL to another https URL (YouTube, Calendly, etc.),
 * or to `funnel` to keep the Blueprint intro instead.
 */
export function getScanRedirectUrl(): string | null {
  const raw = process.env.SCAN_REDIRECT_URL?.trim();
  if (raw === "funnel" || raw === "off") return null;
  const target = raw || SCAN_DEFAULT_REDIRECT_URL;
  try {
    const url = new URL(target);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export const FUNNEL_INTRO_VIDEO =
  process.env.NEXT_PUBLIC_FUNNEL_INTRO_VIDEO_URL?.trim() ||
  FUNNEL_DEFAULT_VIDEO_URL;

export const FUNNEL_FOLLOWUP_VIDEO =
  process.env.NEXT_PUBLIC_FUNNEL_FOLLOWUP_VIDEO_URL?.trim() ||
  FUNNEL_DEFAULT_VIDEO_URL;

export const FUNNEL_CALENDLY_URL = CALENDLY_URL;

export const FUNNEL_PDF_FILENAME = "Blue-Collar-Blueprint.pdf";
export const FUNNEL_PDF_RELATIVE_PATH = "public/funnel/blueprint.pdf";

export function parseYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }
    if (u.hostname.includes("youtube.com")) {
      return u.searchParams.get("v");
    }
  } catch {
    return null;
  }
  return null;
}
