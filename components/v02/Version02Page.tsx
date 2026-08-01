"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { PLACEHOLDER_VIDEO } from "@/components/VideoSlot";

const VERSIONS = [
  { href: "/v01", label: "Version 01", active: false },
  { href: "/v02", label: "Version 02", active: true },
  { href: "/v03", label: "Version 03", active: false },
  { href: "/v04", label: "Version 04", active: false },
  { href: "/v05", label: "Version 05", active: false },
  { href: "/v06", label: "Version 06", active: false },
  { href: "/v07", label: "Version 07", active: false },
] as const;

function ytId(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace(/^\//, "");
    return u.searchParams.get("v");
  } catch {
    return null;
  }
}

const YT = ytId(PLACEHOLDER_VIDEO) || "EU7qo4Iev9k";
const YT_THUMB = `https://i.ytimg.com/vi/${YT}/hqdefault.jpg`;

const HERO_VIDEO =
  "https://youtu.be/7gGRBMdAQ2k?si=TiP0zkxE69bXVT1F";
const HERO_YT = ytId(HERO_VIDEO) || "7gGRBMdAQ2k";
const HERO_START_SEC = 15;

type YtPlayer = {
  mute: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
  unloadModule?: (module: string) => void;
  setOption?: (module: string, option: string, value: unknown) => void;
};

type YtPlayerEvent = { target: YtPlayer; data: number };

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: {
          videoId: string;
          width?: string | number;
          height?: string | number;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (e: YtPlayerEvent) => void;
            onStateChange?: (e: YtPlayerEvent) => void;
            onApiChange?: (e: YtPlayerEvent) => void;
          };
        },
      ) => YtPlayer;
      PlayerState: { ENDED: number; PLAYING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function disableYtCaptions(player: YtPlayer) {
  try {
    player.unloadModule?.("captions");
    player.unloadModule?.("cc");
    player.setOption?.("captions", "track", {});
  } catch {
    /* YouTube caption API is best-effort */
  }
}

function HeroBackgroundVideo({
  videoId,
  startSec,
}: {
  videoId: string;
  startSec: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let player: YtPlayer | null = null;
    let cancelled = false;
    const captionTimers: number[] = [];

    const mount = () => {
      if (cancelled || !hostRef.current || !window.YT?.Player) return;

      player = new window.YT.Player(hostRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          start: startSec,
          cc_load_policy: 0,
          enablejsapi: 1,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.seekTo(startSec, true);
            e.target.playVideo();
            disableYtCaptions(e.target);
            for (const ms of [400, 1200, 2500, 5000]) {
              captionTimers.push(
                window.setTimeout(() => disableYtCaptions(e.target), ms),
              );
            }
          },
          onStateChange: (e) => {
            if (e.data === window.YT?.PlayerState.PLAYING) {
              disableYtCaptions(e.target);
            }
            if (e.data === window.YT?.PlayerState.ENDED) {
              e.target.seekTo(startSec, true);
              e.target.playVideo();
            }
          },
          onApiChange: (e) => {
            disableYtCaptions(e.target);
          },
        },
      });
    };

    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prevReady?.();
      mount();
    };

    if (window.YT?.Player) {
      mount();
    } else if (!document.getElementById("youtube-iframe-api")) {
      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      captionTimers.forEach((id) => window.clearTimeout(id));
      window.onYouTubeIframeAPIReady = prevReady;
      player?.destroy();
    };
  }, [videoId, startSec]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2">
        <div ref={hostRef} className="h-full w-full" />
      </div>
    </div>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8.5 4.5h-2A2.5 2.5 0 0 0 4 7v.5c0 7.18 5.82 13 13 13h.5a2.5 2.5 0 0 0 2.5-2.5v-2l-3.5-1.5-1.5 1.5a11 11 0 0 1-5-5l1.5-1.5L9 4.5z" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconArrowDown({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} width="1.25em" height="1.25em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function IconPlay({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5L8 5.5z" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="16" cy="9" r="2.5" />
      <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5M14 14c2.5.2 4.5 1.8 4.5 5" strokeLinecap="round" />
    </svg>
  );
}

function IconCamera({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <circle cx="12" cy="13.5" r="3.5" />
      <path d="M8 7l1.5-3h5L16 7" strokeLinejoin="round" />
    </svg>
  );
}

function IconHammer({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M14 4l6 6-3 1-4-4-1 3-6 6-2-2 6-6 3-1z" strokeLinejoin="round" />
    </svg>
  );
}

function IconStar({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3l2.4 5.5L20 9.5l-4 4.2.9 6.3L12 17l-4.9 2.9.9-6.3-4-4.2 5.6-1L12 3z" strokeLinejoin="round" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" strokeLinejoin="round" />
    </svg>
  );
}

function IconSend({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 12l16-8-6 16-2-6-8-2z" strokeLinejoin="round" />
    </svg>
  );
}

export function Version02Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[var(--v02-paper)] text-[var(--v02-ink)] antialiased">
      {/* NAV */}
      <nav
        id="navigation"
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[var(--v02-navy)]/80 text-white backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/v02" className="v02-display text-xl font-bold tracking-tight sm:text-2xl">
            BLUE COLLAR{" "}
            <span className="text-[var(--v02-gold)]">VIDEO GUYS™</span>
          </Link>

          <div className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {VERSIONS.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className={`transition hover:text-[var(--v02-gold)] ${
                  v.active ? "text-[var(--v02-gold)]" : ""
                }`}
                aria-current={v.active ? "page" : undefined}
              >
                {v.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href="#contact"
              className="rounded bg-[var(--v02-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)]"
            >
              Get Your Blueprint
            </a>
          </div>

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
          <div className="border-t border-white/10 bg-[var(--v02-navy)] px-5 py-5 lg:hidden">
            <div className="flex flex-col gap-4 text-sm font-medium">
              {VERSIONS.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  className={v.active ? "text-[var(--v02-gold)]" : ""}
                  onClick={() => setMenuOpen(false)}
                >
                  {v.label}
                </Link>
              ))}
              <a
                href="#contact"
                className="mt-2 font-semibold text-[var(--v02-gold)]"
                onClick={() => setMenuOpen(false)}
              >
                Get Your Blueprint
              </a>
            </div>
          </div>
        ) : null}
      </nav>

      <main>
        {/* HERO */}
        <section className="relative flex min-h-screen items-center overflow-hidden bg-[var(--v02-navy)]">
          <HeroBackgroundVideo videoId={HERO_YT} startSec={HERO_START_SEC} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg,rgba(17,26,38,.96) 0%,rgba(17,26,38,.8) 44%,rgba(17,26,38,.38) 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,.35) 1px,transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />

          <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-36 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--v02-gold)]/40 bg-[var(--v02-ink)]/70 px-4 py-2 text-xs font-semibold tracking-wide text-[#f7bd45]">
                <IconStar className="text-base" />
                AUTHENTIC VIDEO MARKETING FOR BLUE-COLLAR BUSINESSES
              </div>

              <h1 className="v02-display text-5xl font-bold leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                BUILD TRUST.
                <br />
                STAND OUT.
                <br />
                <span className="text-[var(--v02-gold)]">WIN MORE WORK.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                You&apos;ve spent years earning your reputation. Our job is to make
                sure more people see it — through The Blue Collar Blueprint™ and
                our Trust Framework™.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-2 rounded bg-[var(--v02-gold)] px-7 py-4 text-base font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)]"
                >
                  Get Your Blueprint
                </a>
                <a
                  href="#blueprint"
                  className="flex items-center justify-center gap-2 rounded border border-white/30 px-7 py-4 text-base font-medium text-white transition hover:border-white hover:bg-white/10"
                >
                  See the Blueprint
                  <IconArrowRight className="text-lg" />
                </a>
              </div>

              <p className="mt-5 text-xs font-medium text-slate-400">
                Trust Wins Jobs · Not just another video company · Strategic
                growth partner
              </p>
            </div>
          </div>

          <a
            href="#purpose"
            aria-label="Scroll down"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-2xl text-white/50 transition hover:text-[var(--v02-gold)]"
          >
            <IconArrowDown />
          </a>
        </section>

        {/* MARQUEE */}
        <section className="overflow-hidden bg-[var(--v02-navy-deep)] py-3 text-white">
          <div className="v02-marquee flex min-w-max items-center gap-7 text-xs font-medium tracking-wide sm:text-sm">
            {[
              "ELECTRICIANS",
              "PLUMBERS",
              "HVAC",
              "ROOFERS",
              "WELDERS",
              "CONCRETE CREWS",
              "MECHANICS",
              "EXCAVATORS",
              "CONTRACTORS",
              "BUILD TRUST",
              "STAND OUT",
              "WIN MORE WORK",
            ].flatMap((item, i) => [
              <span key={`${item}-${i}`} className={i === 0 ? "ml-7" : undefined}>
                {item}
              </span>,
              <span key={`d-${i}`} className="text-[var(--v02-gold)]">
                ◆
              </span>,
            ])}
            {/* duplicate for seamless loop feel */}
            {[
              "ELECTRICIANS",
              "PLUMBERS",
              "HVAC",
              "ROOFERS",
              "WELDERS",
              "CONCRETE CREWS",
            ].flatMap((item, i) => [
              <span key={`b-${item}-${i}`}>{item}</span>,
              <span key={`bd-${i}`} className="text-[var(--v02-gold)]">
                ◆
              </span>,
            ])}
          </div>
        </section>

        {/* STATS */}
        <section
          id="purpose"
          className="border-b-4 border-[var(--v02-ink)] bg-[var(--v02-gold)] py-8"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-7 px-5 text-center sm:px-6 md:grid-cols-4 lg:px-8">
            {[
              ["01", "Build Trust"],
              ["02", "Stand Out"],
              ["03", "Win More Work"],
              ["™", "Trust Framework"],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="v02-display text-4xl font-bold tracking-tight">
                  {stat}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PURPOSE / ABOUT */}
        <section className="bg-[var(--v02-paper)] py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded bg-[var(--v02-gold)]/25" />
              {/* CLIENT ASSET: Replace with real crew / job-site photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1600&q=85"
                alt="Trade crew on a job site"
                className="relative h-[26rem] w-full rounded object-cover grayscale-[20%] sm:h-[32rem]"
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">
                Our purpose
              </p>
              <h2 className="mt-3 v02-display text-4xl font-bold leading-none tracking-tight text-[var(--v02-ink)] sm:text-5xl">
                BLUE-COLLAR BUSINESSES DESERVE TO BE SEEN.
              </h2>
              <div className="mt-6 h-1 w-16 bg-[var(--v02-gold)]" />
              <p className="mt-7 text-base leading-relaxed text-slate-600">
                Not because they need flashy videos — because the crews that
                build our homes, keep the lights on, and maintain our communities
                are the backbone of America.
              </p>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                Too many of the best shops stay hidden behind outdated websites,
                inconsistent branding, and word-of-mouth alone. We&apos;re here to
                change that.
              </p>
              <p className="mt-7 border-l-4 border-[var(--v02-gold)] pl-4 text-base font-semibold italic leading-relaxed text-[var(--v02-ink)]">
                Trust Wins Jobs. People don&apos;t hire the cheapest contractor —
                they hire the one they trust.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICES / BLUEPRINT STAGES */}
        <section id="services" className="bg-[var(--v02-navy)] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">
                The Blue Collar Blueprint™
              </p>
              <h2 className="mt-3 v02-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                EVERYTHING WE DO FITS ONE FRAMEWORK
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-400">
                Three stages. One promise. Content that earns confidence — not
                just attention.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              <ServiceCard
                icon={<IconShield className="text-3xl" />}
                title="Build Trust"
                quote="People buy confidence before they buy your service."
                body="Answer the questions every customer already asks — who you are, if you're experienced, if you care about quality."
                items={[
                  "Brand story films",
                  "Customer testimonials",
                  "Meet-the-crew videos",
                  "Educational & BTS content",
                ]}
                outcome="Higher credibility before the first call"
              />
              <ServiceCard
                icon={<IconCamera className="text-3xl" />}
                title="Stand Out"
                quote="The most memorable contractor usually wins."
                body="Most shops look the same online. We help you separate — clear brand, sharp footage, a site that looks as solid as your work."
                items={[
                  "Cinematic project videos",
                  "Professional photography",
                  "Modern website design",
                  "Social & monthly content",
                ]}
                outcome="Become the premium, recognizable choice"
              />
              <ServiceCard
                icon={<IconHammer className="text-3xl" />}
                title="Win More Work"
                quote="Trust creates opportunity."
                body="Stop competing on price alone. Attract better customers, earn referrals, and build brand value that compounds."
                items={[
                  "Better leads & bigger projects",
                  "Referral systems",
                  "Recruiting campaigns",
                  "Long-term growth consulting",
                ]}
                outcome="More opportunities. Better customers. Growth."
              />
            </div>
          </div>
        </section>

        {/* PROCESS / TRUST FRAMEWORK */}
        <section id="blueprint" className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">
                The Trust Framework™
              </p>
              <h2 className="mt-3 v02-display text-4xl font-bold tracking-tight sm:text-5xl">
                OUR PROCESS. OUR PROMISE.
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                {
                  n: "01",
                  t: "Build Trust",
                  d: "Earn confidence before the first phone call.",
                },
                {
                  n: "02",
                  t: "Stand Out",
                  d: "Become the obvious choice in your market.",
                },
                {
                  n: "03",
                  t: "Win More Work",
                  d: "Turn trust into leads, customers, and long-term growth.",
                },
              ].map((step, i) => (
                <div
                  key={step.n}
                  className={`border-t-2 pt-5 ${
                    i === 0 ? "border-[var(--v02-ink)]" : "border-slate-200"
                  }`}
                >
                  <span className="v02-display text-4xl font-bold text-[var(--v02-gold)]">
                    {step.n}
                  </span>
                  <h3 className="mt-3 v02-display text-2xl font-semibold tracking-tight">
                    {step.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JOB SITES / PORTFOLIO */}
        <section id="jobsites" className="bg-[var(--v02-navy-deep)] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">
                  Field reports
                </p>
                <h2 className="mt-3 v02-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                  JOB SITES
                </h2>
                <p className="mt-3 text-base text-slate-400">
                  Real crews. Real footage. Results that move the pipeline.
                </p>
              </div>
              <a
                href="#contact"
                className="flex items-center gap-2 text-sm font-semibold text-[var(--v02-gold)] transition hover:text-white"
              >
                Break ground on yours
                <IconArrowRight />
              </a>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <FilmTile
                id="film-1"
                className="md:col-span-2 h-72"
                trade="Brand Story"
                title="Who you are — before the bid"
                playing={playing}
                setPlaying={setPlaying}
              />
              <FilmTile
                id="film-2"
                className="h-72"
                trade="Testimonials"
                title="Proof that wins trust"
                playing={playing}
                setPlaying={setPlaying}
              />
              <FilmTile
                id="film-3"
                className="h-72"
                trade="Project Film"
                title="Craftsmanship on camera"
                playing={playing}
                setPlaying={setPlaying}
              />
              <FilmTile
                id="film-4"
                className="md:col-span-2 h-72"
                trade="Meet the Crew"
                title="The people behind the work"
                playing={playing}
                setPlaying={setPlaying}
              />
            </div>
          </div>
        </section>

        {/* WHY DIFFERENT */}
        <section className="bg-[var(--v02-ink)] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">
                What makes us different
              </p>
              <h2 className="mt-3 v02-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                WE DON&apos;T SELL CAMERAS. WE SELL TRUST.
              </h2>
            </div>

            <div className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
              {[
                {
                  icon: <IconShield className="shrink-0 text-4xl text-[var(--v02-gold)]" />,
                  t: "Most agencies sell attention",
                  d: "We build trust — content that earns confidence before anyone picks up the phone.",
                },
                {
                  icon: <IconCamera className="shrink-0 text-4xl text-[var(--v02-gold)]" />,
                  t: "Most video shops sell footage",
                  d: "We create business growth. Every piece is built to move you through the Blueprint.",
                },
                {
                  icon: <IconUsers className="shrink-0 text-4xl text-[var(--v02-gold)]" />,
                  t: "Built for established shops",
                  d: "Quality work. Strong reputation. Marketing as an investment — not a miracle for startups with no track record.",
                },
                {
                  icon: <IconStar className="shrink-0 text-4xl text-[var(--v02-gold)]" />,
                  t: "Strategic growth partner",
                  d: "We don't chase trends. We tell authentic stories — because stories create trust, and trust wins jobs.",
                },
              ].map((item) => (
                <div key={item.t} className="flex gap-5">
                  {item.icon}
                  <div>
                    <h3 className="v02-display text-2xl font-semibold tracking-tight text-white">
                      {item.t}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {item.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MANIFESTO STRIP */}
        <section className="bg-[var(--v02-paper)] py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">
              Manifesto
            </p>
            <h2 className="mt-4 v02-display text-3xl font-bold leading-tight tracking-tight text-[var(--v02-ink)] sm:text-5xl">
              AMERICA WASN&apos;T BUILT BY INFLUENCERS.
              <br />
              <span className="text-slate-500">
                IT WAS BUILT BY PEOPLE WHO GET UP BEFORE SUNRISE.
              </span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-600">
              Electricians. Plumbers. Welders. Mechanics. HVAC techs. Roofers.
              Concrete crews. Small business owners who put their name on every
              job. Their work deserves to be seen. Their stories deserve to be
              told. That&apos;s why we exist.
            </p>
          </div>
        </section>

        {/* CTA BAND */}
        <section
          className="relative overflow-hidden bg-[var(--v02-navy)] py-20 sm:py-24"
          style={{
            backgroundImage:
              "linear-gradient(rgba(17,26,38,.9),rgba(17,26,38,.9)),url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=85')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">
              Our closing message
            </p>
            <h2 className="mt-3 v02-display text-5xl font-bold leading-none tracking-tight text-white sm:text-6xl">
              YOUR STORY
              <br />
              <span className="text-[var(--v02-gold)]">DESERVES TO BE TOLD.</span>
            </h2>
            <p className="mt-5 text-base text-slate-300 sm:text-lg">
              You built your business one project, one handshake, one reputation
              at a time. Let&apos;s make sure the world sees it.
            </p>
            <a
              href="#contact"
              className="mt-9 inline-flex items-center justify-center gap-3 rounded bg-[var(--v02-gold)] px-8 py-4 v02-display text-2xl font-bold tracking-tight text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)]"
            >
              Get Your Blueprint
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-[var(--v02-paper)] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">
                Contact
              </p>
              <h2 className="mt-3 v02-display text-4xl font-bold tracking-tight sm:text-5xl">
                LET&apos;S FRAME UP YOUR BLUEPRINT
              </h2>
              <p className="mt-4 text-base text-slate-600">
                Tell us about your shop. We&apos;ll map how trust turns into more of
                the right work.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <form
                onSubmit={onSubmit}
                className="rounded bg-[var(--v02-ink)] p-6 shadow-xl sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Name
                    </span>
                    <input
                      type="text"
                      required
                      className="mt-2 w-full rounded border border-slate-700 bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Phone
                    </span>
                    <input
                      type="tel"
                      required
                      className="mt-2 w-full rounded border border-slate-700 bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
                      placeholder="000-000-0000"
                    />
                  </label>
                </div>

                <label className="mt-5 block">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    What are you building?
                  </span>
                  <textarea
                    rows={5}
                    required
                    className="mt-2 w-full resize-none rounded border border-slate-700 bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
                    placeholder="Trade, company size, and what you want customers to trust you for..."
                  />
                </label>

                <button
                  type="submit"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-[var(--v02-gold)] px-6 py-4 text-base font-semibold text-[var(--v02-ink)] transition hover:bg-[var(--v02-gold-hot)]"
                >
                  Send inquiry
                  <IconSend className="text-xl" />
                </button>
                <p className="mt-4 text-center text-xs text-slate-500">
                  We respond within one business day.
                </p>
              </form>

              <div className="flex flex-col justify-center rounded border border-slate-200 bg-white p-7 sm:p-9">
                <h3 className="v02-display text-3xl font-semibold tracking-tight">
                  Direct line
                </h3>

                {/* CLIENT ASSET: Replace placeholder phone */}
                <a
                  href="tel:+10000000000"
                  className="mt-7 flex items-center gap-4 border-b border-slate-100 pb-6 transition hover:text-[var(--v02-gold-deep)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded bg-[var(--v02-gold)]/20 text-2xl text-[var(--v02-gold-deep)]">
                    <IconPhone />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Call us
                    </span>
                    <span className="mt-1 block v02-display text-2xl font-bold tracking-tight">
                      [Phone — placeholder]
                    </span>
                  </span>
                </a>

                <a
                  href="mailto:hello@bluecollarvideoguys.com"
                  className="mt-6 flex items-center gap-4 border-b border-slate-100 pb-6 transition hover:text-[var(--v02-gold-deep)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded bg-[var(--v02-gold)]/20 text-2xl text-[var(--v02-gold-deep)]">
                    <IconMail />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Email
                    </span>
                    <span className="mt-1 block text-sm font-semibold">
                      hello@bluecollarvideoguys.com
                    </span>
                  </span>
                </a>

                <div className="mt-7">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    North star
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    Every decision must help the client Build Trust, Stand Out,
                    or Win More Work. If it doesn&apos;t — it doesn&apos;t belong in the
                    Blueprint.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded bg-[var(--v02-ink)] px-3 py-2 text-xs font-semibold text-white">
                      Build Trust
                    </span>
                    <span className="rounded bg-[var(--v02-ink)] px-3 py-2 text-xs font-semibold text-white">
                      Stand Out
                    </span>
                    <span className="rounded bg-[var(--v02-ink)] px-3 py-2 text-xs font-semibold text-white">
                      Win More Work
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--v02-navy-deep)] py-12 text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 sm:px-6 md:flex-row md:items-end lg:px-8">
          <div>
            <Link
              href="/v02"
              className="v02-display text-2xl font-bold tracking-tight text-white"
            >
              BLUE COLLAR{" "}
              <span className="text-[var(--v02-gold)]">VIDEO GUYS™</span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed">
              Build Trust. Stand Out. Win More Work. Authentic video marketing
              for blue-collar businesses — powered by The Blue Collar Blueprint™
              and Trust Framework™.
            </p>
          </div>
          <div className="text-sm md:text-right">
            <a
              href="mailto:hello@bluecollarvideoguys.com"
              className="font-semibold text-white transition hover:text-[var(--v02-gold)]"
            >
              hello@bluecollarvideoguys.com
            </a>
            <p className="mt-2 text-xs">
              © {new Date().getFullYear()} The Blue Collar Video Guys™. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <a
        href="#contact"
        aria-label="Get your blueprint"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--v02-gold)] text-2xl text-[var(--v02-ink)] shadow-xl transition hover:scale-110"
      >
        <IconPhone />
      </a>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  quote,
  body,
  items,
  outcome,
}: {
  icon: ReactNode;
  title: string;
  quote: string;
  body: string;
  items: string[];
  outcome: string;
}) {
  return (
    <article className="group rounded bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex h-14 w-14 items-center justify-center rounded bg-[var(--v02-ink)] text-white transition group-hover:bg-[var(--v02-gold)] group-hover:text-[var(--v02-ink)]">
        {icon}
      </div>
      <h3 className="mt-6 v02-display text-3xl font-semibold tracking-tight">
        {title}
      </h3>
      <p className="mt-2 text-xs font-semibold italic text-[var(--v02-gold-deep)]">
        “{quote}”
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p>
      <ul className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm font-medium">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <IconCheck className="shrink-0 text-[var(--v02-gold-mid)]" />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--v02-ink)]">
        → {outcome}
      </p>
    </article>
  );
}

function FilmTile({
  id,
  className,
  trade,
  title,
  playing,
  setPlaying,
}: {
  id: string;
  className?: string;
  trade: string;
  title: string;
  playing: string | null;
  setPlaying: (id: string | null) => void;
}) {
  const isPlaying = playing === id;

  return (
    <div className={`group relative overflow-hidden rounded ${className}`}>
      {isPlaying ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${YT}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={YT_THUMB}
            alt=""
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--v02-navy-deep)] via-[var(--v02-navy-deep)]/50 to-transparent" />
          <button
            type="button"
            onClick={() => setPlaying(id)}
            className="absolute inset-0 flex flex-col justify-end p-6 text-left"
            aria-label={`Play ${title}`}
          >
            <span className="mb-auto mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--v02-gold)] text-[var(--v02-ink)]">
              <IconPlay />
            </span>
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--v02-gold)]">
              {trade}
            </p>
            <h3 className="mt-1 v02-display text-2xl font-semibold text-white">
              {title}
            </h3>
          </button>
        </>
      )}
    </div>
  );
}
