"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { funnelConfig, FUNNEL_ATTRIBUTION_KEYS } from "@/lib/funnel-config";
import { restoreAttributionToUrl } from "@/lib/track";

const sent = new Set<string>();
let entryPath: string | null = null;

function ready(pixel: string | undefined, tag: string | undefined) {
  const pixelReady = !pixel || typeof window.fbq === "function";
  const tagReady = !tag || typeof window.gtag === "function";
  return pixelReady && tagReady;
}

export function RestoreFunnelAttribution() {
  useEffect(() => {
    restoreAttributionToUrl(FUNNEL_ATTRIBUTION_KEYS);
  }, []);
  return null;
}

/** Pixel and Google tag events for the three funnel routes. No-ops until IDs exist. */
export function FunnelTracking() {
  const pathname = usePathname();
  const pixel = funnelConfig.metaPixelId;
  const tag = funnelConfig.googleTagId;
  const conversion = funnelConfig.googleAdsConversion;

  useEffect(() => {
    if (entryPath === null) entryPath = pathname;
    const includePageView = pathname !== entryPath;
    let cancelled = false;
    let tries = 0;
    let timer = 0;

    const send = () => {
      if (cancelled || sent.has(pathname)) return;
      if (!ready(pixel, tag)) {
        if (tries++ > 24) return;
        timer = window.setTimeout(send, 125);
        return;
      }
      sent.add(pathname);
      if (includePageView && pixel && window.__bcvgMetaPageView !== pathname) {
        window.fbq?.("track", "PageView");
        window.__bcvgMetaPageView = pathname;
      }
      if (includePageView && tag && window.__bcvgGooglePageView !== pathname) {
        window.gtag?.("event", "page_view", { page_path: pathname });
        window.__bcvgGooglePageView = pathname;
      }
      if (pathname === "/book") {
        if (pixel) window.fbq?.("track", "Lead");
        if (tag) window.gtag?.("event", "generate_lead");
      }
      if (pathname === "/booked") {
        if (pixel) window.fbq?.("track", "Schedule");
        if (tag && conversion) {
          window.gtag?.("event", "conversion", { send_to: conversion });
        }
      }
    };

    send();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [pathname, pixel, tag, conversion]);

  return (
    <>
      {tag ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${tag}`}
            strategy="afterInteractive"
          />
          <Script id="funnel-google-tag" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${tag}');
window.__bcvgGooglePageView = location.pathname;`}
          </Script>
        </>
      ) : null}
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
