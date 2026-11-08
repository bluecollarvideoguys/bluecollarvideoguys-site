import { FunnelChrome } from "@/components/funnel/FunnelChrome";
import { FunnelVideo } from "@/components/funnel/FunnelVideo";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";
import { funnelConfig } from "@/lib/funnel-config";

export function BookedPage() {
  return (
    <FunnelChrome>
      <main className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="funnel-rise v02-display text-4xl font-bold tracking-tight sm:text-6xl">
            You&apos;re booked. Talk soon.
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-[var(--v02-slate)]">
            Check your email. We just sent your call time and a link to reschedule if you need it.
          </p>
          <div className="mt-6">
            <FunnelVideo src={funnelConfig.videos.thankYou} label="What to expect on the call" />
          </div>
          <ol className="mt-8 space-y-5">
            <li className="flex gap-4">
              <span className="v02-display text-xl font-bold text-[var(--v02-gold-deep)]">1</span>
              <p>Add the call to your calendar (use the add-to-calendar link from the confirmation email; no button needed on this page)</p>
            </li>
            <li className="flex gap-4">
              <span className="v02-display text-xl font-bold text-[var(--v02-gold-deep)]">2</span>
              <p>
                Save our number so you know it&apos;s us calling:{" "}
                <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
              </p>
            </li>
            <li className="flex gap-4">
              <span className="v02-display text-xl font-bold text-[var(--v02-gold-deep)]">3</span>
              <p>Think about the one type of job you&apos;d take every week if you could</p>
            </li>
          </ol>
        </div>
      </main>
    </FunnelChrome>
  );
}
