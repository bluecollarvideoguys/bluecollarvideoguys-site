"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { HeroYouTubeBackground } from "@/components/HeroYouTubeBackground";

/** Full-bleed still — avoid YouTube thumbs (often letterboxed) */
const MEDIA_POSTER = "/images/purpose-videographer.png";
/** Direct MP4 so we can object-fit: cover (YouTube iframes letterbox) */
const PLACEHOLDER_MP4 =
  "https://res.cloudinary.com/dq9aym4ad/video/upload/v1778758779/mp__qhpetb.mp4";

const HERO_YT = "7gGRBMdAQ2k";
const HERO_START_SEC = 15;

const VERSIONS = [
  { href: "/master", label: "Version 02 Master" },
  { href: "/v01", label: "Version 01" },
  { href: "/v02", label: "Version 02" },
  { href: "/v03", label: "Archive 03–07", active: true },
] as const;

function IconArrowDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" strokeLinejoin="round" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8.5 4.5h-2A2.5 2.5 0 0 0 4 7v.5c0 7.18 5.82 13 13 13h.5a2.5 2.5 0 0 0 2.5-2.5v-2l-3.5-1.5-1.5 1.5a11 11 0 0 1-5-5l1.5-1.5L9 4.5z" strokeLinejoin="round" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg className={className} width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3l2.4 5.5L20 9.5l-4 4.2.9 6.3L12 17l-4.9 2.9.9-6.3-4-4.2 5.6-1L12 3z" strokeLinejoin="round" />
    </svg>
  );
}

function IconWrench({ className }: { className?: string }) {
  return (
    <svg className={className} width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5 2.5-2.5z" strokeLinejoin="round" />
    </svg>
  );
}

function IconCamera({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <circle cx="12" cy="13.5" r="3.5" />
      <path d="M8 7l1.5-3h5L16 7" strokeLinejoin="round" />
    </svg>
  );
}

function IconLink({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8M12 8v8" strokeLinecap="round" />
    </svg>
  );
}

const STANDARDS = [
  {
    id: "trust",
    label: "Build Trust",
    title: "Earn confidence before the call",
    body: "Brand stories, testimonials, crew films, and culture content that answer every customer’s question: Can I trust this company?",
  },
  {
    id: "standout",
    label: "Stand Out",
    title: "Become the memorable shop",
    body: "Cinematic project films, photography, modern web, and consistent branding — so you don’t blend in with every other truck.",
  },
  {
    id: "win",
    label: "Win More Work",
    title: "Turn trust into growth",
    body: "Better leads, bigger projects, more referrals, stronger hires, and brand equity that compounds.",
  },
  {
    id: "partner",
    label: "Growth partner",
    title: "Not just another video vendor",
    body: "Every video, website, and strategy moves you through The Blue Collar Blueprint™ — powered by the Trust Framework™.",
  },
] as const;

export function Version03Design() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStandard, setActiveStandard] = useState<(typeof STANDARDS)[number]["id"]>("trust");
  const [formSent, setFormSent] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  const active = STANDARDS.find((s) => s.id === activeStandard) ?? STANDARDS[0];

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="bg-[var(--v03-ink)] text-white antialiased">
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <button
            type="button"
            className="group flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:text-[var(--v03-copper-hot)]"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
          >
            <span className="relative block h-px w-7 bg-current">
              <span className="absolute right-0 top-1 block h-px w-4 bg-current transition-all group-hover:w-7" />
            </span>
            <span className="hidden sm:inline">Menu</span>
          </button>

          <Link
            href="/v03"
            className="absolute left-1/2 -translate-x-1/2 text-center text-[10px] font-semibold tracking-[0.18em] text-white sm:text-xs sm:tracking-[0.22em]"
          >
            BLUE COLLAR VIDEO GUYS™
          </Link>

          <a
            href="#contact"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-white backdrop-blur-md transition hover:border-white hover:bg-white hover:text-[var(--v03-ink)] sm:px-5"
          >
            Enquire
          </a>
        </div>
      </header>

      {/* Menu overlay */}
      <div
        className={`fixed inset-0 z-[60] flex bg-[var(--v03-ink)]/98 transition duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          onClick={() => setMenuOpen(false)}
          className="absolute right-5 top-5 text-xs font-medium uppercase tracking-[0.16em] text-white/60 transition hover:text-white sm:right-8 sm:top-6"
        >
          Close
        </button>
        <div className="m-auto flex flex-col items-center gap-4 px-6 text-center">
          <span className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            Versions
          </span>
          {VERSIONS.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              onClick={() => setMenuOpen(false)}
              className={`text-3xl font-semibold uppercase tracking-tight transition hover:text-[var(--v03-copper-hot)] sm:text-5xl ${
                "active" in v && v.active ? "text-[var(--v03-copper-hot)]" : "text-white"
              }`}
              aria-current={"active" in v && v.active ? "page" : undefined}
            >
              {v.label}
            </Link>
          ))}
          <span className="mb-1 mt-8 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            On this page
          </span>
          {[
            ["#philosophy", "Belief"],
            ["#blueprint", "Blueprint"],
            ["#work", "Job Sites"],
            ["#contact", "Contact"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-medium uppercase tracking-tight text-white/70 transition hover:text-white sm:text-4xl"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <main>
        {/* HERO — full-viewport media */}
        <section className="relative flex min-h-screen items-end overflow-hidden px-5 pb-10 pt-28 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
          <div className="absolute inset-0">
            {/* CLIENT ASSET: Branded production reel */}
            <HeroYouTubeBackground
              videoId={HERO_YT}
              startSec={HERO_START_SEC}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-[var(--v03-ink)]" />
            <div className="absolute inset-0 bg-black/10" />
          </div>

          <div className="relative mx-auto flex w-full max-w-screen-2xl flex-col justify-between gap-12 lg:flex-row lg:items-end">
            <div className="max-w-5xl">
              <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-white/65">
                <span className="h-px w-8 bg-[var(--v03-copper-hot)]" />
                Authentic video marketing for blue-collar businesses
              </p>
              <h1 className="max-w-4xl font-semibold text-5xl uppercase leading-[0.88] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                Build Trust.
                <br />
                Stand Out.
                <br />
                <span className="text-[var(--v03-copper-hot)]">Win More Work.</span>
              </h1>
            </div>

            <div className="flex w-full items-end justify-between gap-8 lg:w-auto">
              <p className="max-w-xs text-sm font-normal leading-6 text-white/75">
                You&apos;ve spent years earning your reputation. Our job is to make
                sure more people see it — through The Blue Collar Blueprint™.
              </p>
              <a
                href="#philosophy"
                className="group flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--v03-copper-hot)] text-white transition duration-300 hover:scale-110 hover:bg-[var(--v03-copper-hover)] sm:h-16 sm:w-16"
                aria-label="Explore the Blueprint"
              >
                <IconArrowDown className="transition-transform duration-300 group-hover:translate-y-1" />
              </a>
            </div>
          </div>

          <div className="absolute bottom-10 right-5 hidden items-center gap-3 text-xs text-white/60 sm:flex sm:right-8 lg:right-12">
            <span className="v03-mono">01</span>
            <span className="h-px w-12 bg-white/40" />
            <span className="v03-mono">03</span>
          </div>
        </section>

        {/* BELIEF / PHILOSOPHY */}
        <section
          id="philosophy"
          className="bg-[var(--v03-cream)] px-5 py-20 text-[var(--v03-ink-soft)] sm:px-8 sm:py-28 lg:px-12 lg:py-36"
        >
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--v03-copper-deep)]">
              Our belief
            </p>
            <h2 className="font-medium text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              “Trust Wins Jobs. People don&apos;t hire the cheapest contractor —
              they hire the one they trust.”
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
              Every homeowner asks the same question before they call:{" "}
              <em>Can I trust this company?</em> Our job is to make sure the
              answer is yes — before they ever pick up the phone.
            </p>
            <div className="mt-11 flex items-center justify-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--v03-ink-soft)] text-[10px] font-semibold uppercase tracking-wider text-white">
                BCVG
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">The Blue Collar Video Guys™</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.13em] text-neutral-500">
                  Trust Framework™
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BLUEPRINT STANDARD */}
        <section
          id="blueprint"
          className="bg-[var(--v03-cream)] px-5 pb-20 text-[var(--v03-ink-soft)] sm:px-8 sm:pb-28 lg:px-12 lg:pb-36"
        >
          <div className="mx-auto grid max-w-screen-2xl gap-10 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="mb-8 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--v03-copper-deep)]">
                The Blue Collar Blueprint™
              </p>
              <div className="border-t border-neutral-300">
                {STANDARDS.map((item) => {
                  const isActive = item.id === activeStandard;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveStandard(item.id);
                        setPlaying(false);
                      }}
                      className={`group flex w-full items-center justify-between border-b border-neutral-300 py-5 text-left text-sm font-medium uppercase tracking-wide transition ${
                        isActive
                          ? "bg-white px-3 font-semibold text-[var(--v03-ink-soft)] shadow-sm"
                          : "text-neutral-400 hover:px-3 hover:text-[var(--v03-ink-soft)]"
                      }`}
                    >
                      {item.label}
                      <IconArrowRight
                        className={
                          isActive
                            ? "text-[var(--v03-copper-deep)]"
                            : "opacity-0 transition group-hover:opacity-100"
                        }
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explicit height so absolute media can fill 100% */}
            <div className="group relative h-[28rem] overflow-hidden bg-black lg:col-span-8 lg:h-[38rem]">
              <div className="absolute inset-0">
                {playing ? (
                  <video
                    className="h-full w-full"
                    style={{ objectFit: "cover" }}
                    src={PLACEHOLDER_MP4}
                    poster={MEDIA_POSTER}
                    autoPlay
                    controls
                    playsInline
                  />
                ) : (
                  <>
                    {/* CLIENT ASSET: Stage-specific footage */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={MEDIA_POSTER}
                      alt="Videographer filming with a camera gimbal on location"
                      className="h-full w-full transition duration-700 group-hover:scale-105"
                      style={{ objectFit: "cover", objectPosition: "center top" }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      className="absolute inset-0 z-10"
                      aria-label="Play sample film"
                    />
                  </>
                )}
              </div>
              {!playing ? (
                <>
                  <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] flex items-start justify-between p-6 sm:p-10">
                    <h3 className="max-w-md font-semibold text-3xl uppercase leading-[0.95] tracking-tight text-white sm:text-4xl lg:text-5xl">
                      {active.title}
                    </h3>
                    <span className="v03-mono text-xs text-white/85">
                      {String(
                        STANDARDS.findIndex((s) => s.id === active.id) + 1,
                      ).padStart(2, "0")}{" "}
                      — 04
                    </span>
                  </div>
                  <div className="pointer-events-none absolute bottom-6 left-6 right-6 z-[1] max-w-md border border-white/30 bg-black/20 px-4 py-3 text-xs uppercase tracking-[0.12em] leading-5 text-white backdrop-blur-sm sm:bottom-10 sm:left-10">
                    {active.body}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </section>

        {/* TRUST FRAMEWORK 3 COL */}
        <section className="bg-[var(--v03-panel)] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-10 flex flex-col gap-5 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--v03-copper-hot)]">
                  The Trust Framework™
                </p>
                <h2 className="max-w-xl font-semibold text-3xl uppercase leading-none tracking-tight sm:text-4xl lg:text-5xl">
                  Our process.
                  <br />
                  Our promise.
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-6 text-white/55">
                This isn&apos;t just a tagline. Every project moves through three
                stages — Build Trust → Stand Out → Win More Work.
              </p>
            </div>

            <div className="grid border-y border-white/15 lg:grid-cols-6">
              <article className="group border-b border-white/15 p-6 transition hover:bg-white/[0.04] sm:p-8 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-10">
                <span className="v03-mono text-xs text-white/40">01</span>
                <div className="mt-16">
                  <IconShield className="text-[var(--v03-copper-hot)]" />
                  <h3 className="mt-5 text-xl font-medium tracking-tight">
                    Build Trust
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
                    Higher credibility. Stronger reputation. More confidence
                    before the first phone call.
                  </p>
                </div>
              </article>

              <article className="group border-b border-white/15 p-6 transition hover:bg-white/[0.04] sm:p-8 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-10">
                <span className="v03-mono text-xs text-white/40">02</span>
                <div className="mt-16">
                  <IconStar className="text-[var(--v03-copper-hot)]" />
                  <h3 className="mt-5 text-xl font-medium tracking-tight">
                    Stand Out
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
                    Become recognizable. Differentiate from competitors. Position
                    as the premium choice.
                  </p>
                </div>
              </article>

              <article className="group p-6 transition hover:bg-white/[0.04] sm:p-8 lg:col-span-2 lg:p-10">
                <span className="v03-mono text-xs text-white/40">03</span>
                <div className="mt-16">
                  <IconWrench className="text-[var(--v03-copper-hot)]" />
                  <h3 className="mt-5 text-xl font-medium tracking-tight">
                    Win More Work
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
                    More opportunities. Better customers. Long-term business
                    growth that lasts.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* JOB SITES / WORK */}
        <section
          id="work"
          className="bg-[var(--v03-cream)] px-5 py-20 text-[var(--v03-ink-soft)] sm:px-8 sm:py-28 lg:px-12 lg:py-36"
        >
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-12 flex items-end justify-between border-b border-neutral-300 pb-7 sm:mb-16">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--v03-copper-deep)]">
                  Selected work
                </p>
                <h2 className="font-medium text-4xl uppercase tracking-tight sm:text-5xl lg:text-6xl">
                  Stories with presence
                </h2>
              </div>
              <a
                href="#contact"
                className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] transition hover:text-[var(--v03-copper-deep)] sm:flex"
              >
                Start a project
                <IconArrowRight />
              </a>
            </div>

            <div className="grid gap-5 md:grid-cols-12 md:gap-6">
              <article className="group md:col-span-7">
                <a href="#contact" className="block overflow-hidden">
                  <div className="relative h-80 overflow-hidden sm:h-[30rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={MEDIA_POSTER}
                      alt=""
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-5 top-5 bg-white/90 px-3 py-2 v03-mono text-xs backdrop-blur-sm">
                      01
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-5 pt-5">
                    <div>
                      <h3 className="text-2xl font-medium tracking-tight">
                        Brand Story Film
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        Build Trust · Who you are before the bid
                      </p>
                    </div>
                    <IconArrowUpRight className="mt-1 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </a>
              </article>

              <article className="group md:col-span-5 md:mt-20">
                <a href="#contact" className="block overflow-hidden">
                  <div className="relative h-80 overflow-hidden sm:h-[24rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1100&q=90"
                      alt="Trade crew at work"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-5 top-5 bg-white/90 px-3 py-2 v03-mono text-xs backdrop-blur-sm">
                      02
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-5 pt-5">
                    <div>
                      <h3 className="text-2xl font-medium tracking-tight">
                        Testimonial Cut
                      </h3>
                      <p className="mt-1 text-sm text-neutral-500">
                        Stand Out · Proof that wins trust
                      </p>
                    </div>
                    <IconArrowUpRight className="mt-1 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </a>
              </article>
            </div>

            <a
              href="#contact"
              className="mt-10 flex items-center justify-between border-b border-neutral-300 pb-4 text-xs font-semibold uppercase tracking-[0.14em] sm:hidden"
            >
              Start a project
              <IconArrowRight />
            </a>
          </div>
        </section>

        {/* MANIFESTO STRIP */}
        <section className="bg-[var(--v03-ink)] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--v03-copper-hot)]">
              Manifesto
            </p>
            <h2 className="font-semibold text-3xl uppercase leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              America wasn&apos;t built by influencers.
              <br />
              <span className="text-white/45">
                It was built by people who get up before sunrise.
              </span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-sm leading-6 text-white/55">
              Electricians. Plumbers. Welders. Roofers. Concrete crews. Their
              work deserves to be seen. Their stories deserve to be told.
              That&apos;s why we exist.
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="bg-[var(--v03-copper-cta)] px-5 py-20 text-white sm:px-8 sm:py-28 lg:px-12 lg:py-32"
        >
          <div className="mx-auto grid max-w-screen-2xl gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-6">
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                Start a conversation
              </p>
              <h2 className="max-w-xl font-semibold text-4xl uppercase leading-[0.9] tracking-tight sm:text-5xl lg:text-7xl">
                Your story
                <br />
                deserves to
                <br />
                be told.
              </h2>
              <p className="mt-8 max-w-sm text-sm leading-6 text-white/80">
                Tell us about your shop. We&apos;ll frame up how The Blue Collar
                Blueprint™ turns trust into more of the right work.
              </p>

              <div className="mt-12 space-y-5">
                <a
                  href="mailto:hello@bluecollarvideoguys.com"
                  className="flex items-center gap-4 text-sm transition hover:text-[var(--v03-ink-soft)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40">
                    <IconMail />
                  </span>
                  hello@bluecollarvideoguys.com
                </a>
                {/* CLIENT ASSET: Replace placeholder phone */}
                <a
                  href="tel:+10000000000"
                  className="flex items-center gap-4 text-sm transition hover:text-[var(--v03-ink-soft)]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40">
                    <IconPhone />
                  </span>
                  [Phone — placeholder]
                </a>
              </div>
            </div>

            <form className="lg:col-span-6" onSubmit={onSubmit}>
              <div className="border-t border-white/45">
                <label htmlFor="v03-name" className="block border-b border-white/45 py-5">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
                    Your name
                  </span>
                  <input
                    id="v03-name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full bg-transparent text-lg font-normal outline-none placeholder:text-white/50"
                  />
                </label>
                <label htmlFor="v03-email" className="block border-b border-white/45 py-5">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
                    Email address
                  </span>
                  <input
                    id="v03-email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full bg-transparent text-lg font-normal outline-none placeholder:text-white/50"
                  />
                </label>
                <label htmlFor="v03-message" className="block border-b border-white/45 py-5">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
                    What are you building?
                  </span>
                  <textarea
                    id="v03-message"
                    rows={3}
                    required
                    placeholder="Trade, company, and what you want customers to trust you for..."
                    className="w-full resize-none bg-transparent text-lg font-normal outline-none placeholder:text-white/50"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="group mt-8 flex w-full items-center justify-between rounded-full bg-[var(--v03-ink-soft)] px-6 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[var(--v03-ink-soft)]"
              >
                <span>
                  {formSent
                    ? "Thank you — we'll be in touch"
                    : "Send enquiry"}
                </span>
                <IconArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--v03-ink)] px-5 pb-7 pt-14 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-12 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/v03"
              className="font-semibold text-sm tracking-[0.22em] sm:text-lg sm:tracking-[0.28em]"
            >
              BCVG™
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/45">
              Build Trust. Stand Out. Win More Work. Authentic video marketing
              for blue-collar businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-xs font-medium uppercase tracking-[0.13em] text-white/55 sm:flex sm:gap-8">
            <a href="#blueprint" className="transition hover:text-white">
              Blueprint
            </a>
            <a href="#work" className="transition hover:text-white">
              Work
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
            <Link href="/v01" className="transition hover:text-white">
              V01
            </Link>
            <Link href="/v02" className="transition hover:text-white">
              V02
            </Link>
            <Link href="/v03#v04" className="transition hover:text-white">
              V04
            </Link>
            <Link href="/v03#v05" className="transition hover:text-white">
              V05
            </Link>
            <Link href="/v03#v06" className="transition hover:text-white">
              V06
            </Link>
            <Link href="/v03#v07" className="transition hover:text-white">
              V07
            </Link>
          </div>

          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/65 transition hover:border-white hover:bg-white hover:text-[var(--v03-ink)]"
            >
              <IconCamera />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/65 transition hover:border-white hover:bg-white hover:text-[var(--v03-ink)]"
            >
              <IconLink />
            </a>
          </div>
        </div>

        <div className="mx-auto flex max-w-screen-2xl flex-col gap-3 pt-6 text-xs uppercase tracking-[0.12em] text-white/35 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} The Blue Collar Video Guys™</p>
          <div className="flex gap-5">
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
