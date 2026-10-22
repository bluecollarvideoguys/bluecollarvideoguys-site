import { notFound } from "next/navigation";
import { SiteBrandLink } from "@/components/BrandLogo";
import { LandingForm } from "@/components/LandingForm";
import { AREAS } from "@/content/areas";
import { INDUSTRIES } from "@/content/industries";
import { LANDING_PAGES, getLandingPage } from "@/content/landing-pages";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export function generateStaticParams() {
  return LANDING_PAGES.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const page = getLandingPage((await params).slug);
  if (!page) return {};
  return {
    title: { absolute: "Free Blueprint Call | Blue Collar Video Guys" },
    description: page.proofLine,
  };
}

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

const STEPS = [
  { title: "Free 30 minute call", body: "We look at your current website, reviews, and content in plain language." },
  { title: "Your Blueprint", body: "We map which videos, photos, and pages will earn trust fastest for your trade." },
  { title: "We film and launch", body: "We shoot around your schedule and put the finished work to use right away." },
];

const FAQS = [
  {
    q: "Is the call really free?",
    a: "Yes. It is a 30 minute conversation with no obligation, and you leave with a clear next step either way.",
  },
  {
    q: "Do I have to be on camera?",
    a: "No. We can build the story around your crew, your customers, and your finished work.",
  },
  {
    q: "Where do you work?",
    a: "We are based in Redding and film throughout Shasta, Tehama, and Siskiyou counties, plus bigger projects across Northern California and Southern Oregon.",
  },
];

export default async function LandingPage({ params, searchParams }: Props) {
  const page = getLandingPage((await params).slug);
  if (!page) notFound();
  const sp = await searchParams;

  // Message match: fill {trade} and {city} from the ad's URL parameters.
  const tradeSlug = first(sp.trade);
  const citySlug = first(sp.city);
  const industry = INDUSTRIES.find((i) => i.slug === tradeSlug);
  const area = AREAS.find((a) => a.slug === citySlug);
  const tradeWord = industry ? industry.trade.toLowerCase() : page.defaultTrade;
  const cityWord = area ? area.city : page.defaultCity;
  const fill = (s: string) => s.replaceAll("{trade}", tradeWord).replaceAll("{city}", cityWord);

  const source = `Ad landing page (${page.channel}): /lp/${page.slug}`;
  const trades = INDUSTRIES.map((i) => i.trade);

  return (
    <div className="min-h-screen bg-[var(--v02-navy-deep)] text-white antialiased">
      <header className="border-b border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <SiteBrandLink />
          <a href={PHONE_HREF} className="text-sm font-semibold text-[var(--v02-gold)] hover:text-[var(--v02-gold-hot)]">
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-5 py-10 sm:py-14 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">{page.proofLine}</p>
            <h1 className="mt-3 v02-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {fill(page.headline)}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">{fill(page.subhead)}</p>
            <ul className="mt-7 space-y-3">
              {page.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-base text-slate-200">
                  <span aria-hidden="true" className="mt-1 text-[var(--v02-gold)]">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <LandingForm
            id="lead-form"
            headline={page.formHeadline}
            source={source}
            trades={trades}
            defaultTrade={industry?.trade}
          />
        </section>

        <section className="border-t border-[var(--v02-line)] bg-[var(--v02-paper)] py-14 text-[var(--v02-ink)]">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="v02-display text-3xl font-bold tracking-tight">What happens next</h2>
            <ol className="mt-8 grid gap-5 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title} className="rounded-2xl border border-[var(--v02-line)] bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">Step {i + 1}</p>
                  <h3 className="mt-2 v02-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t border-[var(--v02-line)] bg-white py-14 text-[var(--v02-ink)]">
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="v02-display text-3xl font-bold tracking-tight">Quick questions</h2>
            <div className="mt-6 divide-y divide-[var(--v02-line)] border-y border-[var(--v02-line)]">
              {FAQS.map((f) => (
                <div key={f.q} className="py-5">
                  <h3 className="text-lg font-semibold">{f.q}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">{f.a}</p>
                </div>
              ))}
            </div>
            <a
              href="#lead-form"
              className="mt-8 inline-flex w-full justify-center rounded-full bg-[var(--v02-gold)] px-7 py-4 text-base font-semibold text-[var(--v02-ink)] transition hover:bg-[var(--v02-gold-hot)] sm:w-auto"
            >
              Get My Free Blueprint Call
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--v02-line-on-dark)] py-8 text-center text-xs text-slate-400">
        <p>
          The Blue Collar Video Guys · Redding, CA · <a href={PHONE_HREF} className="hover:text-white">{PHONE_DISPLAY}</a> ·{" "}
          <a href="/privacy" className="hover:text-white">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
}
