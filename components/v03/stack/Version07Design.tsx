"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CoverYouTubeEmbed } from "@/components/CoverYouTubeEmbed";
import { HeroYouTubeBackground } from "@/components/HeroYouTubeBackground";

const VERSIONS = [
  { href: "/master", label: "Version 02 Master" },
  { href: "/v01", label: "Version 01" },
  { href: "/v02", label: "Version 02" },
  { href: "/v03", label: "Archive 03–07", active: true },
] as const;

const HERO_YT = "7gGRBMdAQ2k";
const HERO_START_SEC = 15;

const WORK = [
  {
    title: "Job-site films",
    subtitle: "Crew stories that earn trust before the bid",
    year: "Blueprint",
    videoId: "ss-3eS8oCTs",
    span: "lg:col-span-7",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Brand stories",
    subtitle: "Why your shop exists — told like it matters",
    year: "Trust",
    videoId: "jzdRmbzji-A",
    span: "lg:col-span-5 lg:pt-24",
    aspect: "aspect-square",
    selfEnd: true,
  },
  {
    title: "Project films",
    subtitle: "Installs and builds that make you memorable",
    year: "Stand Out",
    videoId: "emhLh58qP94",
    span: "lg:col-span-5",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Web & brand",
    subtitle: "Sites and systems that convert reputation into jobs",
    year: "Win Work",
    videoId: "jzdRmbzji-A",
    span: "lg:col-span-7 lg:pl-16",
    aspect: "aspect-[16/10]",
    selfCenter: true,
  },
] as const;

const PROCESS = [
  {
    title: "Build Trust",
    body: "Brand stories, testimonials, and crew films that answer “Can I trust this company?” before the first call.",
    output: "Output: trust content that opens doors",
  },
  {
    title: "Stand Out",
    body: "Project films, photography, web, and branding — so you don’t look like every other truck on the street.",
    output: "Output: a distinctive visual and digital system",
  },
  {
    title: "Win More Work",
    body: "Better leads, bigger projects, more referrals, and brand equity that compounds over time.",
    output: "Output: growth that lasts beyond one campaign",
  },
] as const;

const JOURNAL = [
  {
    tag: "Blueprint · 4 min",
    title: "Why trust comes before attention for trade brands",
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "Practice · 5 min",
    title: "How job-site films outperform stock footage every time",
    src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
  },
  {
    tag: "Growth · 6 min",
    title: "Standing out without looking like a marketing company",
    src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  },
] as const;

function IconArrowUpRight({
  className,
  size = 17,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M7 17L17 7M8 7h9v9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrowRight({
  className,
  size = 22,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrowDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M12 5v14M6 13l6 6 6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrowDownRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M7 7l10 10M17 9v8H9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="21"
      height="21"
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

function IconClose({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function IconMinus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function IconPlus({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" strokeLinecap="round" />
    </svg>
  );
}

function IconQuote({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="42"
      height="42"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7.5 11.5c1.4 0 2.5 1.2 2.5 2.6S8.9 16.7 7.5 16.7 5 15.5 5 14.1c0-3.2 2-5.7 5-7.1l.8 1.3C8.6 9.2 7.5 10.4 7.5 11.5zm9 0c1.4 0 2.5 1.2 2.5 2.6s-1.1 2.6-2.5 2.6-2.5-1.2-2.5-2.6c0-3.2 2-5.7 5-7.1l.8 1.3c-2.2.9-3.3 2.1-3.3 3.2z" />
    </svg>
  );
}

function IconNotes({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="29"
      height="29"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M8 4h9a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2z" />
      <path d="M10 9h6M10 13h4" strokeLinecap="round" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="29"
      height="29"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="29"
      height="29"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M12 3l2.4 5.5L20 9.5l-4 4.2.9 6.3L12 17l-4.9 2.9.9-6.3-4-4.2 5.6-1L12 3z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClapper({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="29"
      height="29"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M3 8h18v11H3zM3 8l4-4 3.5 4L14 4l3.5 4H21" strokeLinejoin="round" />
      <path d="M10 13l5 3-5 3v-6z" strokeLinejoin="round" />
    </svg>
  );
}

export function Version07Design() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openStep, setOpenStep] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111213] text-[#f5f3ee] antialiased">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-white px-4 py-3 text-sm font-medium text-black transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "border-white/15 bg-[#111213]/90 backdrop-blur-md"
            : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/v03#v07"
            aria-label="The Blue Collar Video Guys home"
            className="inline-flex items-center gap-2.5 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#fa6b20]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-[0.2rem] border border-current">
              <span className="text-sm font-semibold leading-none">BC</span>
            </span>
            <span className="hidden text-lg font-medium tracking-tight sm:inline">
              Blue Collar Video Guys™
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-5 xl:flex"
          >
            {VERSIONS.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className={`text-sm transition hover:text-white ${
                  "active" in v && v.active ? "text-white" : "text-white/65"
                }`}
                aria-current={"active" in v && v.active ? "page" : undefined}
              >
                {v.label.replace("Version ", "V")}
              </Link>
            ))}
            <a
              href="#capabilities"
              className="text-sm text-white/65 transition hover:text-white"
            >
              Blueprint
            </a>
            <a
              href="#work"
              className="text-sm text-white/65 transition hover:text-white"
            >
              Work
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden min-h-11 items-center gap-2 rounded-md bg-[#fa6b20] px-5 text-sm font-medium text-black transition hover:bg-[#ff854a] sm:inline-flex"
            >
              Get a Blueprint
              <IconArrowUpRight />
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/20 transition hover:border-white/60 hover:bg-white/10 xl:hidden"
            >
              {menuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-40 bg-[#111213]/95 px-5 pb-8 pt-24 backdrop-blur-xl xl:hidden">
          <nav className="flex h-full flex-col" aria-label="Mobile navigation">
            <div className="border-t border-white/15">
              {VERSIONS.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  onClick={closeMenu}
                  className="flex min-h-14 items-center justify-between border-b border-white/15 text-xl tracking-tight"
                >
                  {v.label}
                  <IconArrowRight />
                </Link>
              ))}
              <a
                href="#capabilities"
                onClick={closeMenu}
                className="flex min-h-14 items-center justify-between border-b border-white/15 text-xl tracking-tight"
              >
                Blueprint
                <IconArrowRight />
              </a>
              <a
                href="#work"
                onClick={closeMenu}
                className="flex min-h-14 items-center justify-between border-b border-white/15 text-xl tracking-tight"
              >
                Work
                <IconArrowRight />
              </a>
            </div>
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-auto flex min-h-14 items-center justify-center gap-2 rounded-md bg-[#fa6b20] text-base font-medium text-black"
            >
              Get a Blueprint
              <IconArrowUpRight />
            </a>
          </nav>
        </div>
      ) : null}

      <main id="main-content">
        <section
          id="home"
          className="relative flex min-h-screen items-end overflow-hidden bg-[#111213]"
        >
          <div className="absolute inset-0">
            <HeroYouTubeBackground
              videoId={HERO_YT}
              startSec={HERO_START_SEC}
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/55" />
          </div>

          <div className="relative mx-auto w-full max-w-screen-2xl px-4 pb-8 pt-28 sm:px-6 sm:pb-10 lg:px-8">
            <p className="mb-5 text-sm font-medium text-white/80">
              The Blue Collar Blueprint™ · Video marketing for the trades
            </p>
            <h1 className="max-w-6xl text-5xl font-medium leading-[0.91] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Build Trust. Stand Out.
              <br />
              Win More Work.
            </h1>

            <div className="mt-8 grid gap-7 border-t border-white/35 pt-6 md:grid-cols-12 md:items-end">
              <p className="text-lg leading-relaxed text-white/90 md:col-span-6 lg:col-span-5">
                You&apos;ve spent years earning your reputation. We frame it up
                through one clear growth system — so more of the right customers
                find you.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row md:col-span-6 md:justify-end">
                <a
                  href="#work"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-white px-6 text-sm font-medium text-black transition hover:bg-black hover:text-white"
                >
                  Explore selected work
                  <IconArrowDownRight />
                </a>
                <a
                  href="#contact"
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/50 px-6 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Discuss a Blueprint
                </a>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between text-xs text-white/70">
              <span>Trust Framework™. Built for blue-collar shops.</span>
              <a
                href="#capabilities"
                className="inline-flex items-center gap-2 transition hover:text-white"
              >
                Scroll to discover
                <IconArrowDown />
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-white/15 bg-[#111213]">
          <div className="mx-auto grid max-w-screen-2xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            <div>
              <p className="text-xs text-white/45">Stage 01</p>
              <p className="mt-2 text-3xl font-medium tracking-tight">
                Build Trust
              </p>
            </div>
            <div>
              <p className="text-xs text-white/45">Stage 02</p>
              <p className="mt-2 text-3xl font-medium tracking-tight">
                Stand Out
              </p>
            </div>
            <div>
              <p className="text-xs text-white/45">Stage 03</p>
              <p className="mt-2 text-3xl font-medium tracking-tight">
                Win More Work
              </p>
            </div>
            <div>
              <p className="text-xs text-white/45">System</p>
              <p className="mt-2 text-3xl font-medium tracking-tight">
                Trust Framework™
              </p>
            </div>
          </div>
        </section>

        <section id="capabilities" className="bg-[#111213] py-20 sm:py-28">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 border-b border-white/15 pb-12 lg:grid-cols-12">
              <p className="text-sm text-[#fa6b20] lg:col-span-4">
                What we build
              </p>
              <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight sm:text-6xl lg:col-span-8">
                One Blueprint — from the first useful question to the final
                polished frame.
              </h2>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <article className="relative min-h-72 overflow-hidden rounded-md border border-white/15 bg-[#191a1b] p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-white/45">01</span>
                  <IconShield className="text-[#fa6b20]" />
                </div>
                <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                  <h3 className="text-3xl font-medium tracking-tight">
                    Build Trust
                  </h3>
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/60">
                    Brand stories, testimonials, and crew films that earn
                    confidence before the first call.
                  </p>
                  <p className="mt-5 text-sm text-white/40">
                    Stories · Proof · Reputation
                  </p>
                </div>
              </article>

              <article className="relative min-h-72 overflow-hidden rounded-md bg-[#efede7] p-6 text-black sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-black/45">02</span>
                  <IconStar className="text-[#db5414]" />
                </div>
                <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                  <h3 className="text-3xl font-medium tracking-tight">
                    Stand Out
                  </h3>
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-black/60">
                    Project films, photography, web, and branding that set your
                    shop apart from every other truck.
                  </p>
                  <p className="mt-5 text-sm text-black/45">
                    Film · Photo · Web · Brand
                  </p>
                </div>
              </article>

              <article className="relative min-h-72 overflow-hidden rounded-md bg-[#1b3558] p-6 sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-white/45">03</span>
                  <IconNotes className="text-[#93c5fd]" />
                </div>
                <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                  <h3 className="text-3xl font-medium tracking-tight">
                    Digital presence
                  </h3>
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-white/65">
                    Sites and systems that make your reputation tangible —
                    accessible the moment someone searches.
                  </p>
                  <p className="mt-5 text-sm text-white/45">
                    Web · UX · Conversion
                  </p>
                </div>
              </article>

              <article className="relative min-h-72 overflow-hidden rounded-md bg-[#fa6b20] p-6 text-black sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="text-sm text-black/50">04</span>
                  <IconClapper className="text-black/80" />
                </div>
                <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
                  <h3 className="text-3xl font-medium tracking-tight">
                    Win More Work
                  </h3>
                  <p className="mt-3 max-w-xl text-lg leading-relaxed text-black/70">
                    Better leads, bigger projects, more referrals — growth that
                    compounds with every frame.
                  </p>
                  <p className="mt-5 text-sm text-black/50">
                    Leads · Referrals · Equity
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="work" className="bg-[#e9e7e1] py-20 text-[#111213] sm:py-28">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-7 border-b border-black/20 pb-10 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm text-black/50">Job Sites</p>
                <h2 className="mt-3 text-5xl font-medium tracking-tight sm:text-7xl">
                  Work with evidence.
                </h2>
                <p className="mt-2 text-xs uppercase tracking-widest text-black/40">
                  Placeholder stills — swap with client films
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 self-start text-sm font-medium underline decoration-black/30 underline-offset-8 transition hover:decoration-black sm:self-auto"
              >
                Request the full reel
                <IconArrowRight size={17} />
              </a>
            </div>

            <div className="mt-10 grid gap-x-5 gap-y-14 lg:grid-cols-12">
              {WORK.map((item) => (
                <div
                  key={item.title}
                  className={`group block ${item.span} ${
                    "selfEnd" in item && item.selfEnd ? "self-end" : ""
                  } ${
                    "selfCenter" in item && item.selfCenter ? "self-center" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden rounded-md bg-[#c9c8c3] ${item.aspect}`}
                  >
                    {"videoId" in item && item.videoId ? (
                      <CoverYouTubeEmbed
                        videoId={item.videoId}
                        title={item.title}
                        background
                        zoom={1.45}
                      />
                    ) : null}
                  </div>
                  <div className="mt-4 flex justify-between gap-5">
                    <div>
                      <h3 className="text-xl font-medium">{item.title}</h3>
                      <p className="mt-1 text-sm text-black/50">
                        {item.subtitle}
                      </p>
                    </div>
                    <span className="text-sm text-black/45">{item.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="bg-[#111213] py-20 sm:py-28">
          <div className="mx-auto grid max-w-screen-2xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <p className="text-sm text-[#fa6b20]">How we work</p>
                <h2 className="mt-4 text-5xl font-medium tracking-tight sm:text-6xl">
                  Clear stages.
                  <br />
                  Fewer surprises.
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-white/60">
                  The Blue Collar Blueprint™ is powered by the Trust Framework™.
                  Every film, site, and strategy moves you through Build Trust →
                  Stand Out → Win More Work.
                </p>
                <a
                  href="#contact"
                  className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-md border border-white/25 px-5 text-sm font-medium transition hover:border-white hover:bg-white hover:text-black"
                >
                  Ask about the Blueprint
                  <IconArrowUpRight />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border-t border-white/20">
                {PROCESS.map((step, i) => {
                  const open = openStep === i;
                  return (
                    <button
                      key={step.title}
                      type="button"
                      className={`flex w-full items-start justify-between gap-5 py-8 text-left ${
                        i > 0 ? "border-t border-white/20" : ""
                      } ${i === PROCESS.length - 1 ? "border-b border-white/20" : ""}`}
                      aria-expanded={open}
                      onClick={() => setOpenStep(i)}
                    >
                      <div className="grid gap-4 sm:grid-cols-[3.5rem_1fr]">
                        <span
                          className={`text-sm ${open ? "text-[#fa6b20]" : "text-white/35"}`}
                        >
                          0{i + 1}
                        </span>
                        <span>
                          <span className="block text-3xl font-medium tracking-tight">
                            {step.title}
                          </span>
                          {open ? (
                            <>
                              <span className="mt-4 block max-w-xl text-lg leading-relaxed text-white/55">
                                {step.body}
                              </span>
                              <span className="mt-5 block text-sm text-white/35">
                                {step.output}
                              </span>
                            </>
                          ) : null}
                        </span>
                      </div>
                      {open ? (
                        <IconMinus className="mt-1 shrink-0" />
                      ) : (
                        <IconPlus className="mt-1 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#fa6b20] py-20 text-black sm:py-28">
          <div className="mx-auto grid max-w-screen-2xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
            <IconQuote className="lg:col-span-2" />
            <blockquote className="lg:col-span-9">
              <p className="text-4xl font-medium leading-tight tracking-tight sm:text-6xl">
                “They didn&apos;t just shoot pretty footage. They helped us look
                like the company people already trust.”
              </p>
              <footer className="mt-10 border-t border-black/25 pt-5">
                <p className="text-base font-medium">[Client Name]</p>
                <p className="mt-1 text-sm text-black/60">
                  Trade partner — placeholder quote
                </p>
              </footer>
            </blockquote>
          </div>
        </section>

        <section id="journal" className="bg-[#111213] py-20 sm:py-28">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between border-b border-white/15 pb-8">
              <div>
                <p className="text-sm text-white/45">Ideas from the shop</p>
                <h2 className="mt-3 text-5xl font-medium tracking-tight">
                  Field notes
                </h2>
              </div>
              <span className="text-lg text-white/45">(03)</span>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {JOURNAL.map((item) => (
                <a key={item.title} href="#contact" className="group">
                  <div className="aspect-[4/3] overflow-hidden rounded-md bg-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt=""
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                    />
                  </div>
                  <p className="mt-4 text-xs text-white/40">{item.tag}</p>
                  <h3 className="mt-2 text-lg font-medium leading-snug">
                    {item.title}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#fa6b20] py-20 text-black sm:py-28">
          <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
            <p className="text-sm text-black/55">
              Ready to frame up your Blueprint?
            </p>
            <div className="mt-5 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-5xl text-5xl font-medium leading-[0.94] tracking-tight sm:text-7xl lg:text-8xl">
                Your story deserves to be told.
              </h2>
              <a
                href="mailto:hello@bluecollarvideoguys.com"
                className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 self-start rounded-md bg-black px-7 text-base font-medium text-white transition hover:bg-white hover:text-black lg:self-auto"
              >
                hello@bluecollarvideoguys.com
                <IconArrowUpRight size={20} />
              </a>
            </div>
            <div className="mt-14 flex flex-col gap-3 border-t border-black/25 pt-6 text-sm text-black/60 sm:flex-row sm:justify-between">
              <span>
                New collaborations begin with a short, candid conversation.
              </span>
              <span>We&apos;ll map the next step on the Blueprint.</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#111213]">
        <div className="mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 border-b border-white/15 pb-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-medium">
                The Blue Collar Video Guys™
              </p>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
                Authentic video marketing for blue-collar businesses. Build
                Trust. Stand Out. Win More Work.
              </p>
            </div>
            <div>
              <p className="text-xs text-white/35">Explore</p>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                <a
                  href="#work"
                  className="transition hover:text-[#fa6b20]"
                >
                  Selected work
                </a>
                <a
                  href="#capabilities"
                  className="transition hover:text-[#fa6b20]"
                >
                  Blueprint
                </a>
                <a
                  href="#approach"
                  className="transition hover:text-[#fa6b20]"
                >
                  Approach
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs text-white/35">Studio</p>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                <a
                  href="#journal"
                  className="transition hover:text-[#fa6b20]"
                >
                  Field notes
                </a>
                <a
                  href="#contact"
                  className="transition hover:text-[#fa6b20]"
                >
                  New business
                </a>
                <a
                  href="mailto:hello@bluecollarvideoguys.com"
                  className="transition hover:text-[#fa6b20]"
                >
                  Contact
                </a>
              </div>
            </div>
            <div>
              <p className="text-xs text-white/35">Versions</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                {VERSIONS.map((v) => (
                  <Link
                    key={v.href}
                    href={v.href}
                    className="transition hover:text-[#fa6b20]"
                  >
                    {v.label.replace("Version ", "V")}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8">
            <div className="flex flex-col gap-3 text-xs text-white/35 sm:flex-row sm:justify-between">
              <p>
                © {new Date().getFullYear()} The Blue Collar Video Guys™. All
                rights reserved.
              </p>
              <div className="flex gap-5">
                <a href="#contact" className="hover:text-white">
                  Privacy
                </a>
                <a href="#contact" className="hover:text-white">
                  Accessibility
                </a>
              </div>
            </div>
            <p className="mt-10 break-words text-4xl font-medium leading-none tracking-tight sm:text-6xl lg:text-7xl">
              Blue Collar Video Guys™
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
