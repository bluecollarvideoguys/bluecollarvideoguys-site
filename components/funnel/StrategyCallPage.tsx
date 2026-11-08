import Image from "next/image";
import { funnelConfig } from "@/lib/funnel-config";
import { FunnelChrome } from "@/components/funnel/FunnelChrome";
import { FunnelVideo } from "@/components/funnel/FunnelVideo";
import {
  FormModalProvider,
  OpenFormButton,
  StickyCallBar,
} from "@/components/funnel/PopupForm";

const STEPS = [
  {
    n: "01",
    title: "Build Trust",
    body: "Brand story films, customer testimonials, and meet-the-crew videos that answer every question a customer already has.",
  },
  {
    n: "02",
    title: "Stand Out",
    body: "Cinematic project videos, professional photography, and a site that looks as solid as your work.",
  },
  {
    n: "03",
    title: "Win More Work",
    body: "Better leads, bigger projects, and marketing that stops you from competing on price.",
  },
];

const FAQS = [
  {
    q: "Is the call really free?",
    a: "Yes. 20 minutes, no obligation.",
  },
  {
    q: "Who is this for?",
    a: "Established trades businesses with quality work and a strong reputation that want more of the right jobs.",
  },
  {
    q: "What packages do you offer?",
    a: "Foundation (3 months), Structure (6 months), and Turnkey (12 months). We'll help you pick the right one on the call.",
  },
  {
    q: "Is ad spend included?",
    a: "No. Ad management is included in Structure and Turnkey, but ad spend is paid separately.",
  },
  {
    q: "Will filming slow down my crew?",
    a: "No. We plan everything ahead and shoot around your work.",
  },
  {
    q: "Do I have to be on camera?",
    a: "Not if you don't want to. Your crew and your work can carry it.",
  },
  {
    q: "What if a shoot doesn't get enough footage?",
    a: "We come back and shoot again at no extra cost. That's our Content Guarantee.",
  },
  {
    q: "What areas do you serve?",
    a: "Southern Oregon and Northern California, from Medford to Sacramento.",
  },
];

export function StrategyCallPage() {
  const { bonusEnabled, showStackValues, bonus, monthlyClientLimit } = funnelConfig;

  return (
    <FormModalProvider>
      <FunnelChrome>
        <main className="pb-24 md:pb-0">
          <section id="funnel-hero" className="funnel-rise px-5 pb-14 sm:px-8">
            <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--v02-gold-deep)]">
                  For contractors in Redding, Red Bluff, Anderson, Corning, and the towns in between
                </p>
                <h1 className="v02-display mt-3 text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl">
                  People decide who to hire before they ever call. Make sure it&apos;s you.
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-[var(--v02-slate)]">
                  The Blue Collar Blueprint™ builds trust before the phone rings, with cinematic video, real customer testimonials, and marketing that brings in the right jobs. 10 years of experience. Built only for the trades.
                </p>
                <div className="mt-6">
                  <OpenFormButton />
                </div>
                <p className="mt-3 text-sm text-[var(--v02-slate)]">
                  {bonusEnabled ? `${bonus.hero} ` : null}
                  Free 20 minute call.
                </p>
              </div>
              <FunnelVideo src={funnelConfig.videos.heroLoop} label="Job site footage" loop />
            </div>
          </section>

          <section className="bg-[var(--v02-navy)] px-5 py-14 text-white sm:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="v02-display text-3xl font-bold tracking-tight sm:text-5xl">
                People don&apos;t hire the cheapest contractor. They hire the one they trust.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                By the time a homeowner picks up the phone, they&apos;ve already looked you up. They&apos;ve checked your site, your reviews, and your photos, and quietly decided whether you&apos;re the shop they trust. If the answer isn&apos;t yes before the call, the phone never rings.
              </p>
            </div>
          </section>

          <section className="px-5 py-14 sm:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="v02-display text-3xl font-bold tracking-tight sm:text-5xl">
                We don&apos;t sell videos. We build trust.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[var(--v02-slate)]">
                We&apos;ve spent 10 years telling stories on camera, and we work only with the trades: electricians, plumbers, HVAC, roofers, concrete crews, and more across Northern California and Southern Oregon. We know job sites, and we know what makes a homeowner trust you.
              </p>
              <div className="mt-6">
                <FunnelVideo src={funnelConfig.videos.brandMessage} label="Who we are" />
              </div>
              {funnelConfig.proofClips.length > 0 ? (
                <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                  {funnelConfig.proofClips.map((clip) => (
                    <li key={`${clip.name}-${clip.town}`}>
                      <span className="relative block aspect-video">
                        <Image src={clip.src} alt={clip.alt} fill className="object-cover" sizes="240px" />
                      </span>
                      <p className="mt-2 text-sm font-semibold">
                        {clip.name}, {clip.town}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>

          <section className="border-y border-[var(--v02-line)] px-5 py-14 sm:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="v02-display text-3xl font-bold tracking-tight sm:text-5xl">
                Three stages. One promise.
              </h2>
              <ol className="mt-8 grid gap-6 md:grid-cols-3">
                {STEPS.map((step) => (
                  <li key={step.n}>
                    <p className="v02-display text-sm font-bold tracking-[0.14em] text-[var(--v02-gold-deep)]">
                      {step.n}
                    </p>
                    <h3 className="v02-display mt-2 text-2xl font-bold">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-[var(--v02-slate)]">{step.body}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed">
                You run your jobs. We plan the shoot, build the shot list, and handle the rest. You just show up and do what you do best.
              </p>
            </div>
          </section>

          <section className="px-5 py-14 sm:px-8">
            <div className="mx-auto max-w-6xl">
              <h2 className="v02-display text-3xl font-bold tracking-tight sm:text-5xl">
                Start with the Foundation. Grow from there.
              </h2>
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                <article className="border border-[var(--v02-ink)] bg-white p-5 lg:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--v02-gold-deep)]">
                    Foundation, 3 months
                  </p>
                  <h3 className="v02-display mt-2 text-3xl font-bold">Build your credibility.</h3>
                  <ul className="mt-5 divide-y divide-[var(--v02-line)]">
                    {funnelConfig.foundationItems.map((item) => (
                      <li key={item.label} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                        <span>{item.label}</span>
                        {showStackValues ? <span className="shrink-0 font-semibold">{item.value}</span> : null}
                      </li>
                    ))}
                    {bonusEnabled ? (
                      <li className="flex items-baseline justify-between gap-4 bg-[var(--v02-gold)]/25 px-2 py-3 text-sm font-semibold">
                        <span>{bonus.stack}</span>
                        {showStackValues ? <span className="shrink-0">{bonus.stackValue}</span> : null}
                      </li>
                    ) : null}
                    {showStackValues ? (
                      <li className="flex items-baseline justify-between gap-4 py-3 text-sm font-bold">
                        <span>Total value</span>
                        <span>{funnelConfig.foundationTotal}</span>
                      </li>
                    ) : null}
                  </ul>
                </article>
                <div className="grid gap-4">
                  <article className="border border-[var(--v02-line)] bg-white p-5">
                    <p className="inline-block bg-[var(--v02-ink)] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--v02-gold)]">
                      Most popular
                    </p>
                    <h3 className="v02-display mt-3 text-2xl font-bold">Structure, 6 months</h3>
                    <p className="mt-2 leading-relaxed text-[var(--v02-slate)]">
                      Turn your content into a growth system. Adds a website, CRM, sales funnels, ad management, and social media management.
                    </p>
                  </article>
                  <article className="border border-[var(--v02-line)] bg-white p-5">
                    <h3 className="v02-display text-2xl font-bold">Turnkey, 12 months</h3>
                    <p className="mt-2 leading-relaxed text-[var(--v02-slate)]">
                      Your complete outsourced video marketing department.
                    </p>
                  </article>
                </div>
              </div>
              <p className="mt-6 max-w-3xl text-[var(--v02-slate)]">
                Your investment depends on your business and goals. We&apos;ll go over it on the call. Ad spend is not included.
              </p>
            </div>
          </section>

          <section className="px-5 pb-4 sm:px-8">
            <div className="mx-auto max-w-3xl">
              <FunnelVideo src={funnelConfig.videos.testimonial} label="Client result" />
            </div>
          </section>

          <section className="px-5 py-14 sm:px-8">
            <div className="mx-auto max-w-3xl border-2 border-[var(--v02-ink)] bg-white p-6 text-center shadow-[6px_6px_0_0_var(--v02-gold)]">
              <h2 className="v02-display text-3xl font-bold tracking-tight sm:text-4xl">
                The Content Guarantee
              </h2>
              <p className="mt-3 text-lg leading-relaxed">
                We capture everything we need to deliver every video in your package. If we&apos;re ever short on footage, we come back and shoot again at no extra cost. No wasted days, no half-finished videos.
              </p>
            </div>
          </section>

          <section className="bg-[var(--v02-navy)] px-5 py-14 text-white sm:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="v02-display text-3xl font-bold tracking-tight sm:text-5xl">
                We only take on {monthlyClientLimit} new clients a month
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/80">
                Every shoot gets our full crew, so we cap how many new Blueprint clients we take each month.
                {bonusEnabled ? ` ${bonus.scarcity}` : null}
              </p>
              <div className="mt-6">
                <OpenFormButton />
              </div>
              <p className="mt-3 text-sm text-white/70">
                Free 20 minute call by phone. No pressure, no obligation.
              </p>
            </div>
          </section>

          <section className="px-5 py-14 sm:px-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="sr-only">FAQ</h2>
              <div className="divide-y divide-[var(--v02-line)] border-y border-[var(--v02-line)]">
                {FAQS.map((item) => (
                  <details key={item.q} className="group py-4">
                    <summary className="cursor-pointer list-none pr-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                      {item.q}
                    </summary>
                    <p className="mt-2 leading-relaxed text-[var(--v02-slate)]">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>
        <StickyCallBar />
      </FunnelChrome>
    </FormModalProvider>
  );
}
