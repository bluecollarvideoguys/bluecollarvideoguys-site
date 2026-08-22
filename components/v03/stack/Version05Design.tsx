"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { HeroYouTubeBackground } from "@/components/HeroYouTubeBackground";

const VERSIONS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
] as const;

const MEDIA_POSTER =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=90";

const HERO_YT = "7gGRBMdAQ2k";
const HERO_START_SEC = 15;

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="1.1rem" height="1.1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBlueprint({ className }: { className?: string }) {
  return (
    <svg className={className} width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} width="1.4rem" height="1.4rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg className={className} width="1.4rem" height="1.4rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3l2.4 5.5L20 9.5l-4 4.2.9 6.3L12 17l-4.9 2.9.9-6.3-4-4.2 5.6-1L12 3z" strokeLinejoin="round" />
    </svg>
  );
}

function IconWrench({ className }: { className?: string }) {
  return (
    <svg className={className} width="1.4rem" height="1.4rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5 2.5-2.5z" strokeLinejoin="round" />
    </svg>
  );
}

function IconMap({ className }: { className?: string }) {
  return (
    <svg className={className} width="1.35rem" height="1.35rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconHandshake({ className }: { className?: string }) {
  return (
    <svg className={className} width="1.35rem" height="1.35rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8 12l3 3 8-8M4 14l4 4 2-1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 18l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} width="1.1rem" height="1.1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8.5 4.5h-2A2.5 2.5 0 0 0 4 7v.5c0 7.18 5.82 13 13 13h.5a2.5 2.5 0 0 0 2.5-2.5v-2l-3.5-1.5-1.5 1.5a11 11 0 0 1-5-5l1.5-1.5L9 4.5z" strokeLinejoin="round" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} width="1.1rem" height="1.1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" strokeLinejoin="round" />
    </svg>
  );
}

function IconStarBold({ className }: { className?: string }) {
  return (
    <svg className={className} width="1rem" height="1rem" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3l2.4 5.5L20 9.5l-4 4.2.9 6.3L12 17l-4.9 2.9.9-6.3-4-4.2 5.6-1L12 3z" />
    </svg>
  );
}

function SheetLabel({
  children,
  light = false,
}: {
  children: string;
  light?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] ${
        light ? "text-white/70" : "text-[var(--v05-blueprint)]"
      }`}
    >
      <span
        className={`h-px w-5 ${light ? "bg-white/50" : "bg-[var(--v05-blueprint)]"}`}
      />
      {children}
    </span>
  );
}

export function Version05Design() {
  const [formSent, setFormSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="overflow-x-hidden bg-stone-50 text-stone-900 antialiased">
      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-white/70 bg-white/85 px-3 py-3 shadow-[0_0.25rem_2rem_rgba(28,25,23,0.08)] backdrop-blur-xl sm:px-4">
          <Link
            href="/v03#v05"
            className="flex items-center gap-3"
            aria-label="The Blue Collar Video Guys home"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-[var(--v05-blueprint)] text-white">
              <IconBlueprint />
            </span>
            <span className="text-sm font-semibold tracking-tight sm:text-base">
              Blue Collar Video Guys™
            </span>
          </Link>

          <div className="hidden items-center gap-5 text-sm text-stone-500 lg:flex lg:gap-7">
            {VERSIONS.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className={`transition hover:text-stone-950 ${
                  "active" in v && v.active ? "text-stone-950 font-medium" : ""
                }`}
                aria-current={"active" in v && v.active ? "page" : undefined}
              >
                {v.label.replace("Version ", "V")}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-xl border border-stone-200 px-3 py-2 text-xs font-medium lg:hidden"
              onClick={() => setMenuOpen((o) => !o)}
            >
              Menu
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
            >
              <span className="hidden sm:inline">Get a Blueprint</span>
              <IconArrowRight />
            </a>
          </div>
        </div>

        {menuOpen ? (
          <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-stone-200 bg-white p-4 shadow-lg lg:hidden">
            <div className="flex flex-col gap-3 text-sm">
              {VERSIONS.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  onClick={() => setMenuOpen(false)}
                  className={"active" in v && v.active ? "font-semibold" : ""}
                >
                  {v.label}
                </Link>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </div>
          </div>
        ) : null}
      </nav>

      <main id="top">
        {/* HERO */}
        <section className="relative min-h-screen overflow-hidden px-4 pb-12 pt-28 sm:px-6 sm:pt-32">
          <div className="absolute inset-0">
            <HeroYouTubeBackground
              videoId={HERO_YT}
              startSec={HERO_START_SEC}
            />
            <div className="absolute inset-0 bg-black/35" />
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 via-stone-950/15 to-stone-950/70" />
            {/* Blueprint grid overlay */}
            <div
              className="absolute inset-0 opacity-25 mix-blend-overlay"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col justify-end">
            <div className="max-w-4xl text-white">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-xs font-medium uppercase tracking-widest backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                The Blue Collar Blueprint™
              </div>

              <p className="v05-stamp mb-5 text-white/90">Trust Framework™</p>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-stone-200">
                Authentic video marketing for blue-collar businesses
              </p>
              <h1 className="v05-display max-w-4xl text-5xl leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl">
                Build Trust.
                <br />
                Stand Out.
                <br />
                <span>Win More Work.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-stone-200 sm:text-lg">
                You&apos;ve spent years earning your reputation. Our job is to make
                sure more people see it — framed up through one clear growth
                system.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-medium text-stone-950 transition hover:bg-stone-100"
                >
                  Get Your Blueprint
                  <IconArrowRight />
                </a>
                <a
                  href="#blueprint"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Explore the Blueprint
                  <IconBlueprint />
                </a>
              </div>
            </div>

            <div className="mt-12 grid max-w-3xl grid-cols-3 divide-x divide-white/25 border-t border-white/25 pt-5 text-white">
              <div className="pr-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                  Sheet 01
                </p>
                <p className="text-2xl font-medium tracking-tight sm:text-3xl">
                  Trust
                </p>
                <p className="mt-1 text-xs leading-relaxed text-stone-300 sm:text-sm">
                  Before the first call
                </p>
              </div>
              <div className="px-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                  Sheet 02
                </p>
                <p className="text-2xl font-medium tracking-tight sm:text-3xl">
                  Stand Out
                </p>
                <p className="mt-1 text-xs leading-relaxed text-stone-300 sm:text-sm">
                  The memorable shop
                </p>
              </div>
              <div className="pl-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                  Sheet 03
                </p>
                <p className="text-2xl font-medium tracking-tight sm:text-3xl">
                  Win Work
                </p>
                <p className="mt-1 text-xs leading-relaxed text-stone-300 sm:text-sm">
                  Growth that lasts
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BLUEPRINT STAGES */}
        <section
          id="blueprint"
          className="mx-auto max-w-7xl bg-[var(--v05-paper)] px-4 py-20 sm:px-6 lg:py-28"
        >
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SheetLabel>Drawing A — Process</SheetLabel>
              <h2 className="v05-display mt-4 text-4xl leading-[1.04] tracking-tight text-stone-900 sm:text-5xl">
                Every project follows a clear plan.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-stone-600">
                The Blue Collar Blueprint™ is our proven system — powered by the
                Trust Framework™. Content built to earn confidence, not just
                attention.
              </p>
              <p className="v05-stamp mt-8 text-[var(--v05-blueprint)]">
                Built to code
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <a
                href="#contact"
                className="v05-frame group rounded-2xl border border-stone-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[var(--v05-blueprint)]/40 hover:shadow-[0_1rem_2.5rem_rgba(28,25,23,0.08)]"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-[var(--v05-blueprint)]/10 text-[var(--v05-blueprint)]">
                  <IconShield />
                </span>
                <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-stone-400">
                  01 / 03
                </p>
                <h3 className="mt-2 text-lg font-medium tracking-tight">
                  Build Trust
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-500">
                  Brand stories, testimonials, and crew films that answer “Can I
                  trust this company?”
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-stone-900">
                  Stage one <IconArrowRight />
                </span>
              </a>

              <a
                href="#contact"
                className="v05-frame v05-frame-light group rounded-2xl bg-[var(--v05-blueprint)] p-6 text-white transition hover:-translate-y-1 hover:shadow-[0_1rem_2.5rem_rgba(27,58,92,0.35)]"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-white">
                  <IconStar />
                </span>
                <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-white/50">
                  02 / 03
                </p>
                <h3 className="mt-2 text-lg font-medium tracking-tight">
                  Stand Out
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-300">
                  Project films, photography, web, and branding — so you don&apos;t
                  look like every other truck.
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                  Stage two <IconArrowRight />
                </span>
              </a>

              <a
                href="#contact"
                className="v05-frame group rounded-2xl border border-stone-200 bg-[var(--v05-cream)] p-6 transition hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_1rem_2.5rem_rgba(28,25,23,0.08)]"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-white/70 text-[var(--v05-blueprint)]">
                  <IconWrench />
                </span>
                <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-stone-500">
                  03 / 03
                </p>
                <h3 className="mt-2 text-lg font-medium tracking-tight">
                  Win More Work
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  Better leads, bigger projects, more referrals, and brand equity
                  that compounds.
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-stone-900">
                  Stage three <IconArrowRight />
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT / DIFFERENCE */}
        <section
          id="about"
          className="bg-[var(--v05-blueprint)] px-4 py-16 text-white sm:px-6 lg:py-24"
        >
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
            <div className="v05-frame v05-frame-light relative overflow-hidden rounded-2xl border border-white/15">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MEDIA_POSTER}
                alt="Production crew on set"
                className="aspect-[4/3] w-full object-cover opacity-90"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-xl border border-white/15 bg-stone-950/55 p-4 backdrop-blur-md">
                <p className="text-sm font-medium">
                  “We don&apos;t sell cameras. We sell trust.”
                </p>
                <p className="mt-1 text-xs text-stone-300">
                  — The Blue Collar Video Guys™
                </p>
              </div>
              <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-widest text-white/80">
                Spec note · Diff.
              </span>
            </div>

            <div className="lg:pl-12">
              <SheetLabel light>Drawing B — Positioning</SheetLabel>
              <h2 className="v05-display mt-4 text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl">
                Experience the trades can feel good about.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-300">
                Most marketing companies sell attention. We build trust. Every
                film, website, and strategy is drawn to move established
                blue-collar businesses through the Blueprint.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <IconMap className="text-stone-300" />
                  <p className="mt-4 text-sm font-medium">Built for the trades</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">
                    Contractors, HVAC, electricians, roofers, concrete crews —
                    shops that already care about quality.
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <IconHandshake className="text-stone-300" />
                  <p className="mt-4 text-sm font-medium">Growth partner</p>
                  <p className="mt-2 text-sm leading-relaxed text-stone-400">
                    Not a one-off edit. A strategic partner for reputation that
                    turns into jobs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section
          id="reviews"
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28"
        >
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <SheetLabel>Field notes</SheetLabel>
              <h2 className="v05-display mt-4 text-4xl tracking-tight sm:text-5xl">
                Trusted through every chapter.
              </h2>
              <p className="mt-2 text-xs uppercase tracking-widest text-stone-400">
                Placeholder quotes — swap with real client stories
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-stone-900 transition hover:text-stone-500"
            >
              Frame up your Blueprint
              <IconArrowRight />
            </a>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <article className="flex min-h-64 flex-col justify-between rounded-2xl border border-stone-200 bg-white p-7">
              <div>
                <div className="flex gap-1 text-[var(--v05-rust)]" aria-label="Five stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStarBold key={i} />
                  ))}
                </div>
                <blockquote className="mt-6 text-lg font-medium leading-relaxed tracking-tight text-stone-800">
                  “They didn&apos;t just shoot pretty footage. They helped us look
                  like the company people already trust.”
                </blockquote>
              </div>
              <p className="mt-8 text-sm text-stone-500">
                <span className="font-medium text-stone-800">[Client Name]</span>{" "}
                · Electrical — placeholder
              </p>
            </article>

            <article className="flex min-h-64 flex-col justify-between rounded-2xl bg-[var(--v05-cream)] p-7">
              <div>
                <div className="flex gap-1 text-[var(--v05-rust)]" aria-label="Five stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStarBold key={i} />
                  ))}
                </div>
                <blockquote className="mt-6 text-lg font-medium leading-relaxed tracking-tight text-stone-800">
                  “No fluff. Just a blueprint that made us look as solid as our
                  installs.”
                </blockquote>
              </div>
              <p className="mt-8 text-sm text-stone-600">
                <span className="font-medium text-stone-800">[Client Name]</span>{" "}
                · HVAC — placeholder
              </p>
            </article>

            <article className="flex min-h-64 flex-col justify-between rounded-2xl bg-[var(--v05-blueprint)] p-7 text-white">
              <div>
                <div className="flex gap-1 text-amber-400" aria-label="Five stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStarBold key={i} />
                  ))}
                </div>
                <blockquote className="mt-6 text-lg font-medium leading-relaxed tracking-tight text-stone-100">
                  “GCs know who we are before we bid. That&apos;s the difference.”
                </blockquote>
              </div>
              <p className="mt-8 text-sm text-stone-400">
                <span className="font-medium text-white">[Client Name]</span> ·
                Roofing — placeholder
              </p>
            </article>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="px-4 pb-4 sm:px-6">
          <div className="v05-frame v05-frame-light relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-stone-900 px-6 py-14 text-white sm:px-10 lg:px-16 lg:py-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
              aria-hidden
            />
            <div className="relative grid gap-12 lg:grid-cols-[1fr_0.85fr]">
              <div>
                <SheetLabel light>Punch list — Contact</SheetLabel>
                <h2 className="v05-display mt-4 max-w-xl text-4xl leading-[1.04] tracking-tight text-white sm:text-5xl">
                  Your story deserves to be told.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-stone-300">
                  Share what you&apos;re building. We&apos;ll map the next step on The
                  Blue Collar Blueprint™.
                </p>

                <div className="mt-9 space-y-4 text-sm text-stone-300">
                  <a
                    href="tel:+10000000000"
                    className="flex items-center gap-3 transition hover:text-white"
                  >
                    <span className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                      <IconPhone />
                    </span>
                    [Phone — placeholder]
                  </a>
                  <a
                    href="mailto:build@bluecollarvideoguys.com"
                    className="flex items-center gap-3 transition hover:text-white"
                  >
                    <span className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                      <IconMail />
                    </span>
                    build@bluecollarvideoguys.com
                  </a>
                </div>
              </div>

              <form
                onSubmit={onSubmit}
                className="rounded-2xl bg-white p-5 text-stone-900 sm:p-7"
              >
                <div className="grid gap-4">
                  <label className="grid gap-2 text-sm font-medium">
                    Your name
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-normal outline-none transition placeholder:text-stone-400 focus:border-[var(--v05-blueprint)]"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-medium">
                    Email address
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-normal outline-none transition placeholder:text-stone-400 focus:border-[var(--v05-blueprint)]"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-medium">
                    What are you building?
                    <textarea
                      rows={4}
                      required
                      placeholder="Trade, company, and what you want customers to trust you for..."
                      className="resize-none rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-normal outline-none transition placeholder:text-stone-400 focus:border-[var(--v05-blueprint)]"
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--v05-blueprint)] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[var(--v05-blueprint-mid)]"
                  >
                    {formSent
                      ? "Thank you — we'll be in touch"
                      : "Send message"}
                    <IconArrowRight />
                  </button>
                </div>
              </form>
            </div>

            <div className="relative mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
              <p>
                © {new Date().getFullYear()} The Blue Collar Video Guys™. All
                rights reserved.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link href="/v01" className="transition hover:text-white">
                  V01
                </Link>
                <Link href="/" className="transition hover:text-white">
                  V02
                </Link>
                <Link href="/v03" className="transition hover:text-white">
                  V03
                </Link>
                <Link href="/v03#v04" className="transition hover:text-white">
                  V04
                </Link>
                <Link href="/v03#v06" className="transition hover:text-white">
                  V06
                </Link>
                <Link href="/v03#v07" className="transition hover:text-white">
                  V07
                </Link>
                <a href="#" className="transition hover:text-white">
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
