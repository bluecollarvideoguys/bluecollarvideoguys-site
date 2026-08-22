"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { VideoSlot } from "@/components/VideoSlot";
import { IconArrowRight } from "@/components/icons";
import { CALENDLY_URL } from "@/lib/calendly";
import { SiteFooter } from "@/components/SiteFooter";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", active: true },
  { href: "/contact", label: "Contact" },
] as const;

const FULL_SCOPE = [
  {
    title: "Cinematic Video and Photo",
    outcome: "Build Trust",
    body: "Video is one of the strongest tools we use to earn trust, not the whole business. Brand stories, project films, testimonials, and photography show your craftsmanship the way it actually looks on site, so buyers feel your crew before they ever call.",
  },
  {
    title: "Website Design",
    outcome: "Stand Out",
    body: "Your website is often the first job site a buyer walks onto. We design it to prove quality fast: clear proof, easy contact paths, and a layout that matches the caliber of your trucks and installs. Built to turn visitors into discovery calls, not just page views.",
  },
  {
    title: "SEO",
    outcome: "Win More Work",
    body: "Getting found is half the battle. We tighten the pages, local signals, and content that help the right searches land on your business, so you show up when homeowners look for your trade before they ever find the competitor.",
  },
  {
    title: "Social Media",
    outcome: "Stand Out",
    body: "Social only works when it shows up like clockwork. We build a cadence of reels, stills, and behind-the-scenes posts that keep your crew, culture, and craftsmanship in front of the right people, without you living on your phone after hours.",
  },
  {
    title: "Digital Marketing",
    outcome: "Win More Work",
    body: "Attention without a plan is expensive noise. We put your trust assets to work in funnels and ads that pull in fit jobs, with strategy and spend management so every dollar earns the right calls, not vanity metrics.",
  },
] as const;

const PACKAGES = [
  {
    tier: "Foundation",
    duration: "3 Month",
    badge: null as string | null,
    featured: false,
    tone: "gold" as const,
    includes: [
      "Trust Strategy",
      "Client Onboarding",
      "Pre-production planning",
      "3 Strategy Sessions",
    ],
    plus: [
      "1 Brand Message Video",
      "1 Promotional Video",
      "3 Testimonial Videos",
      "15 Branding Photos",
      "15 Social Reels",
    ],
  },
  {
    tier: "Structure",
    duration: "6 Month",
    badge: "#BestDeal",
    featured: true,
    tone: "navy" as const,
    includes: [
      "6 Strategy Sessions",
      "1 Brand Message Video",
      "2 Promotional Videos",
      "4 Testimonial Videos",
      "30 Branding Photos",
      "30 Social Reels",
    ],
    plus: [
      "2 Sales Funnels",
      "Ad Management",
      "Ad Package (*$1,000 min ad spend required)",
    ],
  },
  {
    tier: "Turnkey",
    duration: "12 Month",
    badge: "#DoneForYou",
    featured: false,
    tone: "gold" as const,
    includes: [
      "12 Strategy Sessions",
      "1 Brand Message Video",
      "6 Promotional Videos",
      "4 Testimonial Videos",
      "3 Sales Funnels",
      "Ad Management",
      "Ad Package (*$4,000 min ad spend required)",
      "60 Branding Photos",
      "60 Social Reels",
    ],
    plus: [
      "Website + Hosting",
      "CRM Setup/Support",
      "CRM Manager",
      "Social Media Management",
    ],
  },
] as const;

function IconMenu({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="1.25em"
      height="1.25em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

export function ServicesPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const scrollObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove(
            "opacity-0",
            "translate-y-10",
            "translate-y-6",
          );
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    document
      .querySelectorAll(".v02-scroll-reveal")
      .forEach((el) => scrollObserver.observe(el));

    let counted = false;
    const cta = document.getElementById("cta");
    let ctaObs: IntersectionObserver | null = null;
    if (cta) {
      ctaObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            cta
              .querySelectorAll(".cta-anim")
              .forEach((el) =>
                el.classList.remove("opacity-0", "translate-y-6"),
              );
            if (counted) return;
            counted = true;
            setTimeout(() => {
              cta.querySelectorAll<HTMLElement>(".cta-stat").forEach((s) => {
                const target = parseFloat(s.dataset.target || "0");
                let step = 0;
                const steps = 60;
                const t = setInterval(() => {
                  step++;
                  const ease = 1 - Math.pow(1 - step / steps, 3);
                  const val = target * ease;
                  s.textContent =
                    step >= steps ? String(target) : String(Math.floor(val));
                  if (step >= steps) clearInterval(t);
                }, 1500 / steps);
              });
            }, 300);
          });
        },
        { threshold: 0.3 },
      );
      ctaObs.observe(cta);
    }

    return () => {
      scrollObserver.disconnect();
      ctaObs?.disconnect();
    };
  }, []);

  return (
    <SiteFooter className="bg-[var(--v02-navy-deep)] text-white antialiased">
      <nav
        className="fixed inset-x-0 top-0 z-50 border-b border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)]/80 text-white backdrop-blur-md"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="v02-display text-xl font-bold tracking-tight sm:text-2xl"
          >
            BLUE COLLAR{" "}
            <span className="text-[var(--v02-gold)]">VIDEO GUYS™</span>
          </Link>

          <div className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {NAV.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className={`transition hover:text-[var(--v02-gold)] ${
                  "active" in v && v.active ? "text-[var(--v02-gold)]" : ""
                }`}
                aria-current={"active" in v && v.active ? "page" : undefined}
              >
                {v.label}
              </Link>
            ))}
          </div>

          <Link
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded bg-[var(--v02-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)] lg:inline-flex"
          >
            Book a Discovery Call
          </Link>

          <button
            type="button"
            aria-label="Open menu"
            className="text-2xl text-white lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <IconMenu />
          </button>
        </div>

        {menuOpen ? (
          <div className="border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4 text-sm font-medium">
              {NAV.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  className={
                    "active" in v && v.active ? "text-[var(--v02-gold)]" : ""
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {v.label}
                </Link>
              ))}
              <Link
                href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
                className="mt-2 font-semibold text-[var(--v02-gold)]"
                onClick={() => setMenuOpen(false)}
              >
                Book a Discovery Call
              </Link>
            </div>
          </div>
        ) : null}
      </nav>

      <main className="pt-20">
        {/* TRUST GAP: education section */}
        <section
          id="why-trust"
          className="border-t border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">
                Why trust matters
              </p>
              <h2 className="mt-3 v02-display text-4xl font-bold leading-tight tracking-tight text-[var(--v02-ink)] sm:text-5xl">
                PEOPLE DECIDE BEFORE THEY EVER DIAL YOUR NUMBER.
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-600">
                By the time a homeowner picks up the phone, they&apos;ve already
                looked you up. They&apos;ve checked your site, your reviews, your
                photos, and quietly decided whether you&apos;re the shop they
                trust. If the answer isn&apos;t yes before the call, the phone
                never rings at all.
              </p>
            </div>
          </div>
        </section>

        {/* TRUST STRATEGY PACKAGES */}
        <section
          id="packages"
          className="border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy-deep)] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="v02-scroll-reveal mx-auto max-w-3xl translate-y-10 text-center opacity-0 transition-all duration-1000 ease-out">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">
                The Blue Collar Blueprint™
              </p>
              <h2 className="mt-3 v02-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                TRUST STRATEGY PACKAGES
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                Built for blue collar businesses.
              </p>
            </div>

            <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
              {PACKAGES.map((pkg) => (
                <PackageCard key={pkg.tier} {...pkg} />
              ))}
            </div>
          </div>
        </section>

        {/* FULL SCOPE */}
        <section
          id="full-scope"
          className="border-t border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="v02-scroll-reveal flex flex-col justify-between gap-6 translate-y-10 opacity-0 transition-all duration-1000 ease-out sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">
                  Full Scope
                </p>
                <h2 className="mt-3 v02-display text-4xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-5xl">
                  ONE CREW. EVERY TRADE YOU NEED.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-slate-600 sm:pb-1">
                These aren&apos;t à-la-carte add-ons. They&apos;re tools we use
                to earn trust and market your business, so more of the right
                leads find you and already believe you before they dial.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden border border-[var(--v02-line)] bg-[var(--v02-line)] lg:grid-cols-6">
              {FULL_SCOPE.map((service, i) => {
                const wide = i < 2;
                return (
                  <article
                    key={service.title}
                    className={`v02-scroll-reveal flex translate-y-6 flex-col bg-white p-7 opacity-0 transition-all duration-1000 ease-out sm:p-8 ${
                      wide ? "lg:col-span-3" : "lg:col-span-2"
                    }`}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--v02-gold-deep)]">
                      {service.outcome}
                    </p>
                    <h3 className="mt-3 v02-display text-xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">
                      {service.body}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[var(--v02-line)] pt-8 sm:flex-row sm:items-center">
              <p className="max-w-xl text-sm leading-relaxed text-slate-600">
                Not sure what you need? That&apos;s what the discovery call is
                for. We&apos;ll map the right mix for your business.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[var(--v02-gold-deep)] transition hover:text-[var(--v02-ink)]"
              >
                Schedule Your Discovery Call
                <IconArrowRight />
              </a>
            </div>
          </div>
        </section>

        <section
          id="jobsites"
          className="relative z-40 border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy-deep)] py-20 sm:py-24 md:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="v02-scroll-reveal mb-16 translate-y-10 opacity-0 transition-all duration-1000 ease-out md:mb-24">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">
                Video Trifecta
              </span>
              <h1 className="v02-display text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
                VIDEO THAT EARNS TRUST.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400">
                Brand video, promo video, and client testimonial. Together they
                earn trust before the phone rings, so buyers already believe
                you when they call.
              </p>
            </div>

            <div className="flex flex-col gap-20 md:gap-28">
              <JobSiteCase
                num="01"
                trade="Brand Video"
                client="Origin story"
                title="Your reputation, on film."
                build="A cinematic brand film with founder and crew on camera, real job-site footage, and a clear through-line about how the company works and what clients can count on."
                result="A trust anchor for the website, discovery calls, and every pitch that follows. Buyers meet the crew before they ever meet you in person."
              />
              <JobSiteCase
                num="02"
                trade="Promo Video"
                client="Offer spotlight"
                title="One offer that actually converts."
                build="A sharp promo cut focused on a single offer or project type. Problem, process, and payoff, sized for ads, landing pages, and social."
                result="Clearer inbound. Better-fit calls. A film that sells the work without sounding like a hard sell."
                reverse
              />
              <JobSiteCase
                num="03"
                trade="Client Testimonial"
                client="Proof on record"
                title="Proof from someone who already hired you."
                build="A client testimonial film with a real customer, a real project, and an honest look at the experience from first call to final walkthrough."
                result="Social proof that travels: site, proposals, ads, and follow-ups. Trust transferred from someone who's already hired you."
              />
            </div>
          </div>
        </section>

        <section
          id="cta"
          className="relative z-40 flex min-h-[70vh] w-full flex-col justify-between overflow-hidden border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] py-24"
        >
          <div className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col justify-between px-5 sm:px-6 lg:px-8">
            <div className="flex h-full flex-col items-start justify-center">
              <span className="cta-anim mb-8 translate-y-6 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 opacity-0 transition-all duration-1000 ease-out">
                Ready to break ground?
              </span>
              <h2 className="cta-anim v02-display mb-6 translate-y-6 text-5xl font-bold leading-tight tracking-tight text-white opacity-0 transition-all delay-100 duration-1000 ease-out md:text-7xl lg:text-8xl">
                YOUR STORY
                <br />
                <span className="text-white/40">DESERVES TO BE TOLD.</span>
              </h2>
              <p className="cta-anim mb-10 max-w-lg translate-y-6 text-sm leading-relaxed text-slate-400 opacity-0 transition-all delay-150 duration-1000 ease-out md:text-base">
                You&apos;ve spent years earning your reputation. Let&apos;s build
                the trust system that turns it into more of the right work.
              </p>
              <Link
                href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
                className="cta-anim group inline-flex translate-y-6 items-center gap-2 rounded bg-[var(--v02-gold)] px-8 py-4 text-sm font-semibold uppercase tracking-wide text-[var(--v02-ink)] opacity-0 transition-all delay-200 duration-1000 ease-out hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)]"
              >
                Get Your Blueprint
                <IconArrowRight className="transition group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="cta-anim mt-20 flex translate-y-6 flex-wrap items-end justify-start gap-16 border-t border-[var(--v02-line-on-dark)] pt-12 opacity-0 transition-all delay-300 duration-1000 ease-out md:gap-32">
              <div className="flex flex-col">
                <div className="v02-display flex items-end text-5xl font-bold tracking-tight text-white md:text-6xl">
                  <span className="cta-stat" data-target="3">
                    0
                  </span>
                </div>
                <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Blueprint stages
                </span>
              </div>
              <div className="flex flex-col">
                <div className="v02-display flex items-end text-5xl font-bold tracking-tight text-white md:text-6xl">
                  <span className="cta-stat" data-target="100">
                    0
                  </span>
                  <span className="ml-1 text-3xl text-white/40">%</span>
                </div>
                <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Built for the trades
                </span>
              </div>
              <div className="flex flex-col">
                <div className="v02-display flex items-end text-5xl font-bold tracking-tight text-white md:text-6xl">
                  <span className="text-[var(--v02-gold)]">∞</span>
                </div>
                <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Trust compounds
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteFooter>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PackageCard({
  tier,
  duration,
  badge,
  featured,
  tone,
  includes,
  plus,
}: {
  tier: string;
  duration: string;
  badge: string | null;
  featured: boolean;
  tone: "gold" | "navy";
  includes: readonly string[];
  plus: readonly string[];
}) {
  const isGold = tone === "gold";

  return (
    <article
      className={`v02-scroll-reveal relative flex translate-y-10 flex-col opacity-0 transition-all duration-1000 ease-out ${
        featured ? "lg:-mt-4 lg:mb-[-1rem]" : ""
      }`}
    >
      <div
        className={`relative flex h-full flex-col overflow-hidden border p-7 sm:p-8 ${
          isGold
            ? "border-[var(--v02-gold-deep)]/50 bg-gradient-to-b from-[var(--v02-gold-deep)] via-[#9a6a08] to-[var(--v02-ink)] text-white"
            : "border-[var(--v02-gold)] bg-[var(--v02-navy)] text-white"
        } ${featured ? "shadow-[0_0_0_1px_var(--v02-gold)]" : ""}`}
      >
        {badge ? (
          <span
            className={`absolute right-0 top-0 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] ${
              isGold
                ? "bg-[var(--v02-ink)] text-[var(--v02-gold)]"
                : "bg-[var(--v02-gold)] text-[var(--v02-ink)]"
            }`}
          >
            {badge}
          </span>
        ) : null}

        <header className="pr-16">
          <p
            className={`v02-display text-3xl font-bold tracking-tight sm:text-4xl ${
              isGold ? "text-white" : "text-[var(--v02-gold)]"
            }`}
          >
            {tier.toUpperCase()}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            {duration}
          </p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
            Trust Strategy Package
          </p>
        </header>

        <ul className="mt-8 space-y-2.5 border-t border-white/15 pt-6">
          {includes.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-snug">
              <IconCheck
                className={`mt-0.5 shrink-0 ${
                  isGold ? "text-white" : "text-[var(--v02-gold)]"
                }`}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p
          className={`mt-7 text-xs font-semibold uppercase tracking-[0.18em] ${
            isGold ? "text-white/80" : "text-[var(--v02-gold)]"
          }`}
        >
          Plus…
        </p>
        <ul className="mt-3 space-y-2.5">
          {plus.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm leading-snug">
              <IconCheck
                className={`mt-0.5 shrink-0 ${
                  isGold ? "text-white" : "text-[var(--v02-gold)]"
                }`}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className={`flex w-full items-center justify-center gap-2 rounded px-5 py-3.5 text-sm font-bold tracking-wide transition hover:-translate-y-0.5 ${
              isGold
                ? "bg-white text-[var(--v02-ink)] hover:bg-[var(--v02-paper)]"
                : "bg-[var(--v02-gold)] text-[var(--v02-ink)] hover:bg-[var(--v02-gold-hot)]"
            }`}
          >
            Schedule Discovery Call
          </a>
        </div>
      </div>
    </article>
  );
}

function JobSiteCase({
  num,
  trade,
  client,
  title,
  build,
  result,
  reverse,
}: {
  num: string;
  trade: string;
  client: string;
  title: string;
  build: string;
  result: string;
  reverse?: boolean;
}) {
  return (
    <article
      className={`v02-scroll-reveal grid translate-y-10 items-center gap-8 opacity-0 transition-all duration-1000 ease-out md:grid-cols-2 md:gap-14 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <VideoSlot
        label={trade}
        trade={client}
        aspect="video"
        tone="dark"
      />
      <div>
        <div className="mb-6 flex items-center gap-4">
          <span className="v02-display text-sm tracking-wide text-slate-500">
            {num}
          </span>
          <span className="border border-[var(--v02-gold)]/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--v02-gold)]">
            {trade}
          </span>
        </div>
        <h2 className="v02-display mb-8 text-2xl font-bold leading-tight tracking-tight text-white md:text-4xl">
          {title}
        </h2>
        <div className="flex flex-col gap-5 border-t border-[var(--v02-line-on-dark)] pt-6">
          <p className="text-sm leading-relaxed text-slate-400">{build}</p>
          <p className="text-sm leading-relaxed text-white">{result}</p>
        </div>
      </div>
    </article>
  );
}
