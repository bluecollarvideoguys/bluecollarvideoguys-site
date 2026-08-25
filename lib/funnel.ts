import { CALENDLY_URL } from "@/lib/calendly";

/** Default intro + follow-up film (YouTube) */
export const FUNNEL_DEFAULT_VIDEO_URL =
  "https://youtu.be/sCWnuYjMkow?si=Eh4_tOE9YzCXZJgx";

export const FUNNEL_PATH = "/scan";
export const FUNNEL_PRINT_PATH = "/scan/print";

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
