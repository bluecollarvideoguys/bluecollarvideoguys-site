"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { VideoSlot } from "@/components/VideoSlot";
import { IconArrowRight } from "@/components/icons";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services", active: true },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/v03", label: "Archive" },
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
    <div className="bg-[var(--v02-navy-deep)] text-white antialiased">
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
            href="/#contact"
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
                href="/#contact"
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
        <section
          id="jobsites"
          className="relative z-40 border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy-deep)] py-20 sm:py-24 md:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="v02-scroll-reveal mb-16 translate-y-10 opacity-0 transition-all duration-1000 ease-out md:mb-24">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">
                Field reports
              </span>
              <h1 className="v02-display text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
                JOB SITES
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400">
                Case studies, blue-collar style. What we built with each crew,
                and what it did for their pipeline.
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[var(--v02-gold)]">
                Placeholder builds. Swap with live client stories.
              </p>
            </div>

            <div className="flex flex-col gap-20 md:gap-28">
              <JobSiteCase
                num="01"
                trade="Electrical"
                client="[Company Name]"
                title="From word-of-mouth only to the shop GCs call first."
                challenge="Great work. Almost no proof online. Bids landed cold."
                build="Brand story film, crew intros, project reels, and a site that looked as sharp as their installs."
                result="Stronger inbound. Shorter sales cycles. Crews that recruit themselves."
              />
              <JobSiteCase
                num="02"
                trade="Roofing"
                client="[Company Name]"
                title="Looked like every other truck until they didn't."
                challenge="Same Facebook ads. Same stock photos. Same ignore rate."
                build="Cinematic project films, consistent brand kit, monthly content on a Blueprint cadence."
                result="Homeowners recognized the brand before the estimate. Referrals climbed."
                reverse
              />
              <JobSiteCase
                num="03"
                trade="HVAC"
                client="[Company Name]"
                title="Trust on file. Bigger commercial work on the books."
                challenge="Residential was steady. Commercial buyers needed more proof."
                build="Testimonial system, meet-the-crew series, and a Trust Framework™ content plan."
                result="Better-fit leads. Bigger tickets. A brand that hired easier."
              />
            </div>
          </div>
        </section>

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

            <div className="mt-14 grid gap-px overflow-hidden rounded border border-[var(--v02-line)] bg-[var(--v02-line)] sm:grid-cols-2 lg:grid-cols-5">
              {[
                "Who are these people?",
                "Can I trust them?",
                "Are they experienced?",
                "Do they care about quality?",
                "What do their customers say?",
              ].map((q) => (
                <div key={q} className="bg-white p-6">
                  <p className="v02-display text-lg font-semibold leading-snug text-[var(--v02-ink)]">
                    {q}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-col items-center gap-6 rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] p-8 text-center sm:p-12">
              <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Video. Testimonials. Behind-the-scenes footage. Reviews. Every
                one of those questions has a specific answer, and on your
                discovery call, we&apos;ll map out exactly which methods fit
                your shop and how we&apos;ll put them to work.
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 rounded bg-[var(--v02-gold)] px-7 py-4 text-base font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)]"
              >
                Schedule Your Discovery Call
                <IconArrowRight />
              </a>
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
                href="/#contact"
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

      <footer className="border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] py-10 text-center text-sm text-slate-500">
        <Link href="/" className="text-[var(--v02-gold)] hover:underline">
          ← Back to Home
        </Link>
      </footer>
    </div>
  );
}

function JobSiteCase({
  num,
  trade,
  client,
  title,
  challenge,
  build,
  result,
  reverse,
}: {
  num: string;
  trade: string;
  client: string;
  title: string;
  challenge: string;
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
        label={`${trade} case film`}
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
        <dl className="flex flex-col gap-5 border-t border-[var(--v02-line-on-dark)] pt-6">
          <div>
            <dt className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              The job
            </dt>
            <dd className="text-sm leading-relaxed text-slate-400">
              {challenge}
            </dd>
          </div>
          <div>
            <dt className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              The build
            </dt>
            <dd className="text-sm leading-relaxed text-slate-400">{build}</dd>
          </div>
          <div>
            <dt className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--v02-gold)]">
              The punch list
            </dt>
            <dd className="text-sm leading-relaxed text-white">{result}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
