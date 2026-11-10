"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { funnelConfig, FUNNEL_ATTRIBUTION_KEYS } from "@/lib/funnel-config";
import { restoreAttributionToUrl } from "@/lib/track";

/** Survives React strict mode's extra effect run, so each route fires once. */
const sentMeta = new Set<string>();
const sentGoogle = new Set<string>();

export function RestoreFunnelAttribution() {
  useEffect(() => {
    restoreAttributionToUrl(FUNNEL_ATTRIBUTION_KEYS);
  }, []);
  return null;
}

/**
 * Funnel conversion events. The Meta Pixel itself loads once in the root layout.
 * /book fires Lead. /booked fires Schedule.
 * /book also fires generate_lead. /booked also fires book_appointment.
 */
export function FunnelTracking() {
  const pathname = usePathname();
  const pixel = funnelConfig.metaPixelId;

  useEffect(() => {
    const googleEvent =
      pathname === "/book"
        ? "generate_lead"
        : pathname === "/booked"
          ? "book_appointment"
          : null;
    let cancelled = false;
    let metaTries = 0;
    let googleTries = 0;
    let metaTimer = 0;
    let googleTimer = 0;

    const sendMeta = () => {
      if (cancelled || sentMeta.has(pathname)) return;
      if (pixel && typeof window.fbq !== "function") {
        if (metaTries++ > 24) return;
        metaTimer = window.setTimeout(sendMeta, 125);
        return;
      }
      sentMeta.add(pathname);
      if (pathname === "/book" && pixel) window.fbq?.("track", "Lead");
      if (pathname === "/booked" && pixel) window.fbq?.("track", "Schedule");
    };

    const sendGoogle = () => {
      if (!googleEvent || cancelled || sentGoogle.has(pathname)) return;
      if (typeof window.gtag !== "function") {
        if (googleTries++ > 24) return;
        googleTimer = window.setTimeout(sendGoogle, 125);
        return;
      }
      sentGoogle.add(pathname);
      window.gtag("event", googleEvent);
    };

    sendMeta();
    sendGoogle();
    return () => {
      cancelled = true;
      window.clearTimeout(metaTimer);
      window.clearTimeout(googleTimer);
    };
  }, [pathname, pixel]);

  return null;
}
