import Script from "next/script";
import { FunnelChrome } from "@/components/funnel/FunnelChrome";
import { RestoreFunnelAttribution } from "@/components/funnel/FunnelTracking";
import { CALENDAR_PREFILL_KEYS, funnelConfig } from "@/lib/funnel-config";

const CHECKS = [
  "We'll look at how your business shows up online right now",
  "We'll map which trust methods fit your business and goals",
  "You'll leave with a rough Blueprint, whether or not we work together",
];

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function BookPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const src = new URL(funnelConfig.calendarUrl);
  for (const key of CALENDAR_PREFILL_KEYS) {
    const value = first(searchParams[key]);
    if (value) src.searchParams.set(key, value);
  }

  return (
    <FunnelChrome>
      <RestoreFunnelAttribution />
      <main className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--v02-gold-deep)]">
            Step 2 of 2
          </p>
          <h1 className="v02-display mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Almost done. Pick a time for your call.
          </h1>
          <p className="mt-3 text-lg text-[var(--v02-slate)]">
            20 minutes by phone. We&apos;ll call you at the number you entered.
          </p>
          <iframe
            src={src.toString()}
            title="Free Video Strategy Call"
            id="bcvg-funnel-calendar"
            scrolling="no"
            className="mt-6 min-h-[800px] w-full border-0"
          />
          <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
          <ul className="mt-6 space-y-3">
            {CHECKS.map((line) => (
              <li key={line} className="flex gap-3 text-base leading-relaxed">
                <span aria-hidden="true" className="mt-0.5 text-[var(--v02-gold-deep)]">
                  ✓
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </FunnelChrome>
  );
}
