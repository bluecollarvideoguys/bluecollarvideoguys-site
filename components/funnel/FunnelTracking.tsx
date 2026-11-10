"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { funnelConfig, FUNNEL_ATTRIBUTION_KEYS } from "@/lib/funnel-config";
import { restoreAttributionToUrl } from "@/lib/track";

/** Survives React strict mode's extra effect run, so each route fires once. */
const sentMeta = new Set<string>();
const sentGoogle = new Set<string>();
let entryPath: string | null = null;

export function RestoreFunnelAttribution() {
  useEffect(() => {
    restoreAttributionToUrl(FUNNEL_ATTRIBUTION_KEYS);
  }, []);
  return null;
}

/**
 * Meta Pixel on the funnel routes, plus site-wide gtag events.
 * /book fires generate_lead. /booked fires book_appointment.
 * Google Ads counts /booked from the site-wide AW- config, so this does not
 * send a conversion snippet or load gtag.js again.
 */
export function FunnelTracking() {
  const pathname = usePathname();
  const pixel = funnelConfig.metaPixelId;

  useEffect(() => {
    if (entryPath === null) entryPath = pathname;
    const includePageView = pathname !== entryPath;
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
      if (includePageView && pixel && window.__bcvgMetaPageView !== pathname) {
        window.fbq?.("track", "PageView");
        window.__bcvgMetaPageView = pathname;
      }
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

  return (
    <>
      {pixel ? (
        <Script id="funnel-meta-pixel" strategy="afterInteractive">
          {`if(!window.fbq){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixel}');
fbq('track', 'PageView');
window.__bcvgMetaPageView = location.pathname;}`}
        </Script>
      ) : null}
    </>
  );
}
