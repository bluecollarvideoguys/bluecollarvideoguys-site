"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { captureAttribution, trackEvent, trackHighLevelPageView } from "@/lib/track";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
/** Public id from GoHighLevel Settings → External Tracking. Safe to ship in the page. */
const GHL_TRACKING_ID = "tk_33a1c715e4e242d0b463561c484e7e79";

/**
 * Loads GoHighLevel external tracking on every page, plus GA4, Google Ads,
 * and Meta Pixel when their IDs are set. Also tracks calls, emails,
 * discovery-call clicks, and Calendly bookings with one delegated listener.
 */
export function Analytics() {
  const pathname = usePathname();
  const reportedUrl = useRef<string | null>(null);

  useEffect(() => {
    const current = window.location.href;
    const previous = reportedUrl.current;
    if (previous === current) return;

    let cancelled = false;
    let attempts = 0;
    let timer = 0;
    const send = () => {
      if (cancelled) return;
      // The GoHighLevel script already records the first full page load.
      if (!previous) {
        reportedUrl.current = current;
        return;
      }
      void trackHighLevelPageView(GHL_TRACKING_ID, previous).then((sent) => {
        if (cancelled) return;
        if (sent) {
          reportedUrl.current = current;
          return;
        }
        if (attempts >= 8) return;
        attempts += 1;
        timer = window.setTimeout(send, 250);
      });
    };
    send();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    captureAttribution();

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const location = link.closest("[id]")?.id || window.location.pathname;
      if (href.startsWith("tel:")) trackEvent("phone_click", { link_location: location });
      else if (href.startsWith("mailto:")) trackEvent("email_click", { link_location: location });
      else if (href.includes("calendly.com"))
        trackEvent("book_call_click", {
          link_location: location,
          link_text: link.textContent?.trim().slice(0, 60),
        });
    };

    const onMessage = (e: MessageEvent) => {
      if (typeof e.origin !== "string" || !e.origin.includes("calendly.com")) return;
      const data = e.data as { event?: string } | undefined;
      if (data?.event === "calendly.event_scheduled") trackEvent("calendly_booked");
    };

    document.addEventListener("click", onClick);
    window.addEventListener("message", onMessage);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  const googleId = GA_ID || GADS_ID;

  return (
    <>
      <Script
        src="https://link.msgsndr.com/js/external-tracking.js"
        strategy="afterInteractive"
        data-tracking-id={GHL_TRACKING_ID}
      />
      {googleId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleId}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  analytics_storage: 'granted',
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted'
});
gtag('js', new Date());
${GA_ID ? `gtag('config', '${GA_ID}');` : ""}
${GADS_ID ? `gtag('config', '${GADS_ID}');` : ""}`}
          </Script>
        </>
      ) : null}
      {META_PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
        </Script>
      ) : null}
    </>
  );
}
