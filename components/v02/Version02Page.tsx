"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CoverYouTubeEmbed } from "@/components/CoverYouTubeEmbed";
import { VideoSlot } from "@/components/VideoSlot";
import { CALENDLY_URL } from "@/lib/calendly";

gsap.registerPlugin(ScrollTrigger);

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const VERSIONS = [
  { href: "/", label: "Home", active: true },
  { href: "/services", label: "Services", active: false },
  { href: "/contact", label: "Contact", active: false },
] as const;

/** Home type system — Inter eyebrows/body, Barlow titles, gold accents */
const type = {
  eyebrowLight:
    "text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]",
  eyebrowDark:
    "text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]",
  eyebrowMuted:
    "text-xs font-semibold uppercase tracking-[0.18em] text-slate-500",
  titleLight:
    "v02-display text-4xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-5xl",
  titleDark:
    "v02-display text-4xl font-bold tracking-tight text-white sm:text-5xl",
  titleHero:
    "v02-display text-5xl font-bold leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl",
  subtitleLight:
    "v02-display text-2xl font-semibold tracking-tight text-[var(--v02-ink)]",
  subtitleDark:
    "v02-display text-2xl font-semibold tracking-tight text-white",
  bodyLight: "text-base leading-relaxed text-slate-600",
  bodyDark: "text-base leading-relaxed text-slate-400",
  bodySmLight: "text-sm leading-relaxed text-slate-600",
  bodySmDark: "text-sm leading-relaxed text-slate-400",
  highlight: "text-[var(--v02-gold)]",
  labelLight:
    "text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]",
  labelOnDarkPanel:
    "text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]",
} as const;

function ytId(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace(/^\//, "");
    return u.searchParams.get("v");
  } catch {
    return null;
  }
}

const WORK_VIDEOS = {
  jobSite: "ss-3eS8oCTs",
  brandStories: "jzdRmbzji-A",
  craftEdit: "emhLh58qP94",
} as const;

function openCalendly() {
  window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
}

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

function IconPlay({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5.5v13l11-6.5L8 5.5z" />
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

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.8 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.8-3.8-9S9.5 5.5 12 3z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChart({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 17l6-6 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMegaphone({ className }: { className?: string }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 10v4a1 1 0 0 0 1 1h2l4 4V5L6 9H4a1 1 0 0 0-1 1z" strokeLinejoin="round" />
      <path d="M14 8a4 4 0 0 1 0 8M17 5a8 8 0 0 1 0 14" strokeLinecap="round" />
    </svg>
  );
}

export function Version02Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{
    videoId: string;
    title: string;
  } | null>(null);
  const pageLiftRef = useRef<HTMLDivElement>(null);
  const stickyFooterRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const setStickyMargin = () => {
      const footer = stickyFooterRef.current;
      const lift = pageLiftRef.current;
      if (!footer || !lift) return;
      const h = footer.scrollHeight;
      const vh = window.innerHeight || document.documentElement.clientHeight || 0;
      lift.style.marginBottom = `${Math.min(h, vh)}px`;
    };

    setStickyMargin();
    window.addEventListener("resize", setStickyMargin);
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(setStickyMargin)
        : null;
    if (stickyFooterRef.current && ro) ro.observe(stickyFooterRef.current);

    return () => {
      window.removeEventListener("resize", setStickyMargin);
      ro?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  useEffect(() => {
    let uspTween: gsap.core.Tween | null = null;
    const ST_ID = "v02-usp-scroll";

    const teardownUsp = () => {
      ScrollTrigger.getById(ST_ID)?.kill(true);
      uspTween?.scrollTrigger?.kill(true);
      uspTween?.kill();
      uspTween = null;
      gsap.set("#v02-usp-track", { clearProps: "transform" });
    };

    const setupUspScroll = () => {
      teardownUsp();

      if (window.innerWidth < 768) return;

      const wrap = document.getElementById("v02-usp-pin-wrap");
      const track = document.getElementById("v02-usp-track");
      if (!wrap || !track) return;

      const dots = wrap.querySelectorAll<HTMLElement>(".v02-usp-dot");
      const panels = wrap.querySelectorAll(".v02-usp-panel");
      const ghostNums = wrap.querySelectorAll<HTMLElement>(".v02-usp-ghost-num");
      if (panels.length === 0) return;

      const totalPanels = panels.length;
      uspTween = gsap.to(track, {
        x: () => -(window.innerWidth * (totalPanels - 1)),
        ease: "none",
        scrollTrigger: {
          id: ST_ID,
          trigger: wrap,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          start: "top top",
          end: () => "+=" + window.innerWidth * (totalPanels - 1) * 1.15,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const pos = self.progress * (totalPanels - 1);
            const active = Math.round(pos);
            dots.forEach((d, i) => {
              d.style.width = i === active ? "1.5rem" : "0.25rem";
              d.style.opacity = i === active ? "1" : "0.3";
            });
            ghostNums.forEach((n, i) => {
              const dist = Math.abs(pos - i);
              const t = Math.max(0, 1 - dist * 1.5);
              n.style.opacity = (t * 0.1).toString();
            });
          },
        },
      });
    };

    setupUspScroll();
    const onResizeUsp = () => {
      setupUspScroll();
      ScrollTrigger.refresh();
    };
    const onLoadRefresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResizeUsp);
    window.addEventListener("load", onLoadRefresh);
    requestAnimationFrame(() => {
      setupUspScroll();
      ScrollTrigger.refresh();
    });
    const refreshTimers = [400, 1000, 2000].map((ms) =>
      window.setTimeout(() => ScrollTrigger.refresh(), ms),
    );

    const scrollObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("opacity-0", "translate-y-10");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    document.querySelectorAll(".v02-scroll-reveal").forEach((el) =>
      scrollObserver.observe(el),
    );

    return () => {
      window.removeEventListener("resize", onResizeUsp);
      window.removeEventListener("load", onLoadRefresh);
      refreshTimers.forEach((id) => window.clearTimeout(id));
      teardownUsp();
      scrollObserver.disconnect();
    };
  }, []);

  return (
    <div className="v02-page-shell text-[var(--v02-ink)] antialiased">
      <div ref={pageLiftRef} className="v02-page-lift">
      {/* NAV */}
      <nav
        id="navigation"
        className="fixed inset-x-0 top-0 z-50 border-b border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)]/80 text-white backdrop-blur-md"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="v02-display text-xl font-bold tracking-tight sm:text-2xl">
            BLUE COLLAR{" "}
            <span className={type.highlight}>VIDEO GUYS™</span>
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
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded bg-[var(--v02-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)]"
            >
              Book a Discovery Call
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
          <div className="border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-5 py-5 lg:hidden">
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
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 font-semibold text-[var(--v02-gold)]"
                onClick={() => setMenuOpen(false)}
              >
                Book a Discovery Call
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
              <div
                className={`mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--v02-gold)]/40 bg-[var(--v02-ink)]/70 px-4 py-2 ${type.eyebrowDark}`}
              >
                <IconStar className="text-base" />
                Marketing for Contractors
              </div>

              <h1 className={type.titleHero}>
                BUILD TRUST.
                <br />
                STAND OUT.
                <br />
                <span className={type.highlight}>WIN MORE WORK.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                You&apos;ve spent years earning your reputation. Our job is to make
                sure more people see it through The Blue Collar Blueprint™ and
                our Trust Framework™.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded bg-[var(--v02-gold)] px-7 py-4 text-base font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)]"
                >
                  Schedule Your Discovery Call
                </a>
                <a
                  href="#blueprint"
                  className="flex items-center justify-center gap-2 rounded border border-white/30 px-7 py-4 text-base font-medium text-white transition hover:border-white hover:bg-white/10"
                >
                  See the Blueprint
                  <IconArrowRight className="text-lg" />
                </a>
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
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
          <div className="v02-marquee flex min-w-max items-center gap-7 text-xs font-semibold uppercase tracking-[0.18em] sm:text-sm">
            {[
              "ELECTRICIANS",
              "PLUMBERS",
              "HVAC",
              "ROOFERS",
              "PAINTERS",
              "WELDERS",
              "CONCRETE CREWS",
              "MECHANICS",
              "EXCAVATORS",
              "CONTRACTORS",
              "CARPENTERS",
              "LANDSCAPERS",
              "MASONS",
              "DRYWALL",
              "FLOORING",
              "INSULATION",
            ].flatMap((item, i) => [
              <span key={`${item}-${i}`} className={i === 0 ? "ml-7" : undefined}>
                {item}
              </span>,
              <span key={`d-${i}`} className={type.highlight}>
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
              <span key={`bd-${i}`} className={type.highlight}>
                ◆
              </span>,
            ])}
          </div>
        </section>

        {/* STATS */}
        <section
          id="purpose"
          className="border-b border-[var(--v02-line)] bg-[var(--v02-gold)] py-8"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-7 px-5 text-center sm:px-6 md:grid-cols-4 lg:px-8">
            {[
              ["01", "Build Trust"],
              ["02", "Stand Out"],
              ["03", "Win More Work"],
              ["™", "Trust Framework"],
            ].map(([stat, label]) => (
              <div key={label}>
                <p className="v02-display text-4xl font-bold tracking-tight text-[var(--v02-ink)]">
                  {stat}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-ink)]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* PURPOSE / ABOUT */}
        <section className="border-t border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 h-full w-full rounded bg-[var(--v02-gold)]/25" />
              {/* CLIENT ASSET: Replace with real crew / job-site photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/purpose-videographer.png"
                alt="Videographer filming with a camera gimbal on location"
                className="relative h-[26rem] w-full rounded object-cover grayscale-[20%] sm:h-[32rem]"
              />
            </div>

            <div>
              <p className={type.eyebrowLight}>Our Purpose</p>
              <h2 className={`mt-3 ${type.titleLight} leading-none`}>
                YOUR REPUTATION. YOUR STORY.
              </h2>
              <div className="mt-6 h-px w-16 bg-[var(--v02-line)]" />
              <p className={`mt-7 ${type.bodyLight}`}>
                Blue Collar Video Guys helps you build trust through cinematic
                video and photography, websites that convert, SEO, and social
                media. No more hiding behind outdated sites and word of mouth
                alone.
              </p>
              <p className={`mt-5 ${type.bodyLight}`}>
                We work with electricians, plumbers, HVAC techs, roofers,
                welders, and concrete crews across Southern Oregon and Northern
                California, from Medford to Sacramento. You&apos;re the backbone
                of America. It&apos;s time your marketing caught up to your
                craftsmanship.
              </p>
              <p className="mt-7 border-l-2 border-[var(--v02-gold-deep)] pl-4 text-base font-semibold italic leading-relaxed text-[var(--v02-ink)]">
                People don&apos;t hire the cheapest contractor.
                They hire the one they trust.
              </p>
            </div>
          </div>
        </section>

        {/* PROCESS / TRUST FRAMEWORK — desktop only (matches Blueprint scroll breakpoint) */}
        <section
          id="framework"
          className="hidden border-t border-[var(--v02-line)] bg-white py-20 sm:py-24 md:block"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className={type.eyebrowLight}>The Trust Framework™</p>
              <h2 className={`mt-3 ${type.titleLight}`}>
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
              ].map((step) => (
                <div
                  key={step.n}
                  className="border-t border-[var(--v02-line)] pt-5"
                >
                  <span className={`v02-display text-4xl font-bold ${type.highlight}`}>
                    {step.n}
                  </span>
                  <h3 className={`mt-3 ${type.subtitleLight}`}>{step.t}</h3>
                  <p className={`mt-2 ${type.bodySmLight}`}>{step.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BLUEPRINT: horizontal scroll (desktop) / stacked (mobile) */}
        <section
          id="blueprint"
          className="relative z-40 w-full border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)]"
        >
          <div
            id="v02-usp-pin-wrap"
            className="hidden h-screen w-full overflow-hidden md:block"
          >
            <div className="flex h-screen w-full flex-col overflow-hidden">
              <div className="mx-auto flex w-full max-w-7xl shrink-0 items-center justify-between px-5 pb-0 pt-24 sm:px-6 lg:px-8">
                <div>
                  <p className={type.eyebrowDark}>The Blue Collar Blueprint™</p>
                  <h2 className="mt-2 v02-display text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                    THREE STAGES. ONE PROMISE.
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="v02-usp-dot h-1 w-6 rounded-sm bg-[var(--v02-gold)] transition-all duration-500" />
                  <div className="v02-usp-dot h-1 w-1 rounded-sm bg-white/20 transition-all duration-500" />
                  <div className="v02-usp-dot h-1 w-1 rounded-sm bg-white/20 transition-all duration-500" />
                </div>
              </div>

              <div className="relative flex-1 overflow-hidden">
                <div
                  id="v02-usp-track"
                  className="flex h-full w-[300vw] will-change-transform"
                >
                  <BlueprintPanel
                    num="01"
                    label="Build Trust"
                    icon={<IconShield className="mb-6 text-4xl text-[var(--v02-gold)]" />}
                    title="Trust First. Sale Second."
                    body="Answer the questions every customer already asks: who you are, if you're experienced, if you care about quality. Brand stories, testimonials, crew films, education, culture. Trust you can see."
                    items={[
                      "Brand story films",
                      "Customer testimonials",
                      "Meet-the-crew videos",
                      "Educational & BTS content",
                    ]}
                  />
                  <BlueprintPanel
                    num="02"
                    label="Stand Out"
                    icon={<IconCamera className="mb-6 text-4xl text-[var(--v02-gold)]" />}
                    title="Get Noticed. Get Hired."
                    body="Most shops look the same online. We help you separate with a clear brand, sharp footage, and a site that looks as solid as your work."
                    items={[
                      "Cinematic project videos",
                      "Professional photography",
                      "Modern website design",
                      "Social & monthly content",
                    ]}
                  />
                  <BlueprintPanel
                    num="03"
                    label="Win More Work"
                    icon={<IconHammer className="mb-6 text-4xl text-[var(--v02-gold)]" />}
                    title="More Trust. More Work."
                    body="Stop competing on price alone. Attract better customers, earn referrals, and build brand value that compounds."
                    items={[
                      "Better leads & bigger projects",
                      "Referral systems",
                      "Recruiting campaigns",
                      "Long-term growth consulting",
                    ]}
                    cta
                    onCta={openCalendly}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:hidden">
            <MobileBlueprint
              num="01"
              label="Build Trust"
              title="Trust First. Sale Second."
              body="Brand stories, testimonials, crew films, education, culture. Trust you can see."
            />
            <MobileBlueprint
              num="02"
              label="Stand Out"
              title="Get Noticed. Get Hired."
              body="Project films, photo, web, branding, social, so you don't blend in with every other truck."
            />
            <MobileBlueprint
              num="03"
              label="Win More Work"
              title="More Trust. More Work."
              body="Growth built on reputation, not gimmicks."
              cta
              onCta={openCalendly}
            />
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="border-t border-[var(--v02-line)] bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className={type.eyebrowLight}>Full Scope</p>
                <h2 className={`mt-3 ${type.titleLight}`}>
                  ONE CREW. EVERY TRADE YOU NEED.
                </h2>
              </div>
              <p className={`max-w-md ${type.bodySmLight}`}>
                Every service ties back to one outcome: Build Trust, Stand Out,
                or Win More Work. Nothing on this list is filler.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ServiceCard
                icon={<IconCamera className="text-3xl text-[var(--v02-gold-deep)]" />}
                title="Cinematic Video and Photo"
                body="Brand story films, project showcases, crew profiles, and photography that show your craftsmanship, not stock photos."
              />
              <ServiceCard
                icon={<IconGlobe className="text-3xl text-[var(--v02-gold-deep)]" />}
                title="Website Design"
                body="A site that looks as solid as your work, built to turn visitors into discovery calls, not just page views."
              />
              <ServiceCard
                icon={<IconChart className="text-3xl text-[var(--v02-gold-deep)]" />}
                title="SEO"
                body="Show up when local homeowners search for the trade you do best, before they ever find your competitor."
              />
              <ServiceCard
                icon={<IconUsers className="text-3xl text-[var(--v02-gold-deep)]" />}
                title="Social Media"
                body="Monthly content that keeps your crew, culture, and craftsmanship in front of the right people, consistently."
              />
              <ServiceCard
                icon={<IconMegaphone className="text-3xl text-[var(--v02-gold-deep)]" />}
                title="Digital Marketing"
                body="Strategy, ad management, and content planning that turns your story into a steady pipeline of the right jobs."
              />
              <div className="flex flex-col justify-center rounded border border-dashed border-[var(--v02-line)] bg-[var(--v02-paper)] p-7">
                <p className={type.labelLight}>Not sure what you need?</p>
                <p className={`mt-3 ${type.bodySmLight}`}>
                  That&apos;s what the discovery call is for. We&apos;ll figure
                  out the right mix together.
                </p>
                  <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--v02-gold-deep)] transition hover:text-[var(--v02-ink)]"
                >
                  Schedule Your Discovery Call
                  <IconArrowRight />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PORTFOLIO — cover gallery from Version 06 */}
        <section
          id="work"
          className="border-t border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-28"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className={type.eyebrowLight}>Proven Results</p>
              <h2 className={`mt-3 ${type.titleLight}`}>
                REAL JOBS. REAL PROOF.
              </h2>
              <p className={`mt-3 ${type.eyebrowMuted}`}>
                Client films and testimonials
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-12 md:grid-rows-2">
              <WorkVideoTile
                className="min-h-80 md:col-span-7 md:row-span-2 md:min-h-[42rem]"
                videoId={WORK_VIDEOS.jobSite}
                label="Promo video"
                onOpen={setLightbox}
              />
              <WorkVideoTile
                className="min-h-64 md:col-span-5"
                videoId={WORK_VIDEOS.brandStories}
                label="Testimonial"
                onOpen={setLightbox}
              />
              <WorkVideoTile
                className="min-h-64 md:col-span-5"
                videoId={WORK_VIDEOS.craftEdit}
                label="Testimonials"
                onOpen={setLightbox}
              />
            </div>
          </div>
        </section>

        {/* WHY DIFFERENT */}
        <section className="border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-ink)] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl border-b border-[var(--v02-line-on-dark)] pb-12 text-center">
              <p className={type.eyebrowDark}>Clear Advantage</p>
              <h2 className={`mt-3 ${type.titleDark}`}>
                WE DON&apos;T SELL VIDEOS.
                <br />
                WE BUILD TRUST.
              </h2>
            </div>

            <div className="mt-0 grid md:grid-cols-2">
              {[
                {
                  icon: <IconShield className="shrink-0 text-4xl text-[var(--v02-gold)]" />,
                  t: "Most agencies sell attention",
                  d: "We build trust: content that earns confidence before anyone picks up the phone.",
                },
                {
                  icon: <IconCamera className="shrink-0 text-4xl text-[var(--v02-gold)]" />,
                  t: "Most video shops sell footage",
                  d: "We create business growth. Every piece is built to move you through the Blueprint.",
                },
                {
                  icon: <IconUsers className="shrink-0 text-4xl text-[var(--v02-gold)]" />,
                  t: "Built for established shops",
                  d: "Quality work. Strong reputation. Marketing as an investment, not a miracle for startups with no track record.",
                },
                {
                  icon: <IconStar className="shrink-0 text-4xl text-[var(--v02-gold)]" />,
                  t: "Strategic growth partner",
                  d: "We don't chase trends. We tell authentic stories, because stories create trust, and trust wins jobs.",
                },
              ].map((item, i) => (
                <div
                  key={item.t}
                  className={`flex gap-5 border-[var(--v02-line-on-dark)] py-10 ${
                    i % 2 === 0 ? "md:border-r md:pr-10" : "md:pl-10"
                  } ${i < 2 ? "border-b" : ""}`}
                >
                  {item.icon}
                  <div>
                    <h3 className={type.subtitleDark}>{item.t}</h3>
                    <p className={`mt-2 ${type.bodySmDark}`}>{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="border-t border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl border-b border-[var(--v02-line)] pb-12 text-center">
              <p className={type.eyebrowLight}>Let&apos;s Talk</p>
              <h2 className={`mt-3 ${type.titleLight}`}>
                ONE CALL. ONE BLUEPRINT.
              </h2>
              <p className={`mt-4 ${type.bodyLight}`}>
                Tell us about your business and we&apos;ll set up a free call to
                map out your Blueprint. No pressure, no obligation.
              </p>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <form
                action="https://formsubmit.co/hello@bluecollarvideoguys.com"
                method="POST"
                className="rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-ink)] p-6 sm:p-8"
              >
                {/* Submissions go to FormSubmit → hello@bluecollarvideoguys.com.
                    First submit may need a one-time activation link in that inbox. */}
                <input
                  type="hidden"
                  name="_subject"
                  value="Homepage — new inquiry"
                />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_next"
                  value="https://www.bluecollarvideoguys.com/#contact"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className={type.labelOnDarkPanel}>Name</span>
                    <input
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      className="mt-2 w-full rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
                      placeholder="Your name"
                    />
                  </label>
                  <label className="block">
                    <span className={type.labelOnDarkPanel}>Phone</span>
                    <input
                      type="tel"
                      name="phone"
                      required
                      autoComplete="tel"
                      className="mt-2 w-full rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
                      placeholder="000-000-0000"
                    />
                  </label>
                </div>

                <label className="mt-5 block">
                  <span className={type.labelOnDarkPanel}>Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="mt-2 w-full rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
                    placeholder="you@company.com"
                  />
                </label>

                <label className="mt-5 block">
                  <span className={type.labelOnDarkPanel}>
                    What are you building?
                  </span>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="mt-2 w-full resize-none rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
                    placeholder="Trade, company size, and what you want customers to trust you for..."
                  />
                </label>

                {/* FormSubmit honeypot */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                <button
                  type="submit"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-[var(--v02-gold)] px-6 py-4 text-base font-semibold text-[var(--v02-ink)] transition hover:bg-[var(--v02-gold-hot)]"
                >
                  Send Message
                  <IconSend className="text-xl" />
                </button>
                <p className="mt-4 text-center text-xs text-slate-500">
                  We respond within one business day.
                </p>
              </form>

              <div className="flex flex-col justify-center border border-[var(--v02-line)] bg-white p-7 sm:p-9">
                <h3 className={type.subtitleLight}>What to expect on the call</h3>

                <ul className={`mt-6 space-y-3 border-b border-[var(--v02-line)] pb-7 ${type.bodySmLight}`}>
                  <li className="flex gap-3">
                    <IconCheck className="mt-0.5 shrink-0 text-[var(--v02-gold-deep)]" />
                    We&apos;ll walk through your current brand, site, and
                    content. No jargon, just a plain look at where things stand.
                  </li>
                  <li className="flex gap-3">
                    <IconCheck className="mt-0.5 shrink-0 text-[var(--v02-gold-deep)]" />
                    We&apos;ll map which trust methods (video, testimonials,
                    photography, and more) fit your business and your goals.
                  </li>
                  <li className="flex gap-3">
                    <IconCheck className="mt-0.5 shrink-0 text-[var(--v02-gold-deep)]" />
                    You&apos;ll leave with a clear next step and a rough
                    Blueprint, whether or not we end up working together.
                  </li>
                </ul>

                {/* CLIENT ASSET: Replace placeholder phone */}
                <a
                  href="tel:+10000000000"
                  className="mt-7 flex items-center gap-4 border-b border-[var(--v02-line)] pb-6 transition hover:text-[var(--v02-gold-deep)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded bg-[var(--v02-gold)]/20 text-2xl text-[var(--v02-gold-deep)]">
                    <IconPhone />
                  </span>
                  <span>
                    <span className={type.eyebrowMuted}>Call us</span>
                    <span className={`mt-1 block ${type.subtitleLight}`}>
                      [Phone placeholder]
                    </span>
                  </span>
                </a>

                <a
                  href="mailto:hello@bluecollarvideoguys.com"
                  className="mt-6 flex items-center gap-4 transition hover:text-[var(--v02-gold-deep)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded bg-[var(--v02-gold)]/20 text-2xl text-[var(--v02-gold-deep)]">
                    <IconMail />
                  </span>
                  <span>
                    <span className={type.eyebrowMuted}>Email</span>
                    <span className="mt-1 block text-sm font-semibold text-[var(--v02-ink)]">
                      hello@bluecollarvideoguys.com
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      </div>

      <footer
        ref={stickyFooterRef}
        className="v02-sticky-footer"
        aria-label="Site footer"
      >
        <div className="v02-footer-reveal">
          <div className="v02-footer-reveal__inner">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="v02-footer-reveal__cta"
            >
              <span className="v02-footer-reveal__eyebrow">
                Ready to break ground?
              </span>
              <span className="v02-footer-reveal__title">Let&apos;s build</span>
              <div className="v02-footer-reveal__rule" aria-hidden="true" />
            </a>

            <div className="v02-footer-reveal__grid">
              <div>
                <Link href="/" className="v02-footer-reveal__brand">
                  BLUE COLLAR <span>VIDEO GUYS™</span>
                </Link>
              </div>
              <div>
                <span className="v02-footer-reveal__label">Let&apos;s chat</span>
                <div className="v02-footer-reveal__links">
                  <a href="mailto:hello@bluecollarvideoguys.com">
                    hello@bluecollarvideoguys.com
                  </a>
                  <a href={CALENDLY_URL} target="_blank" rel="noreferrer">
                    Book a discovery call
                  </a>
                </div>
              </div>
              <div>
                <span className="v02-footer-reveal__label">Explore</span>
                <div className="v02-footer-reveal__links">
                  <Link href="/">Home</Link>
                  <Link href="/services">Services</Link>
                  <Link href="/contact">Contact</Link>
                </div>
              </div>
              <div>
                <span className="v02-footer-reveal__label">The Blueprint</span>
                <p className="v02-footer-reveal__copy">
                  Build Trust. Stand Out. Win More Work. Authentic video
                  marketing for blue-collar businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="v02-footer-legal">
          <p>
            © {new Date().getFullYear()} The Blue Collar Video Guys™. All
            rights reserved.
          </p>
          <a href="mailto:hello@bluecollarvideoguys.com">
            hello@bluecollarvideoguys.com
          </a>
        </div>
      </footer>

      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Schedule a discovery call"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--v02-gold)] text-2xl text-[var(--v02-ink)] shadow-xl transition hover:scale-110"
      >
        <IconPhone />
      </a>

      {lightbox ? (
        <YouTubeLightbox
          videoId={lightbox.videoId}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </div>
  );
}

function WorkVideoTile({
  videoId,
  label,
  className = "",
  onOpen,
}: {
  videoId: string;
  label: string;
  className?: string;
  onOpen: (video: { videoId: string; title: string }) => void;
}) {
  return (
    <figure
      className={`relative overflow-hidden bg-[var(--v02-navy)] ${className}`}
    >
      <CoverYouTubeEmbed
        videoId={videoId}
        title={label}
        background
        zoom={1.45}
      />
      <button
        type="button"
        onClick={() => onOpen({ videoId, title: label })}
        className="absolute inset-0 z-20 flex cursor-pointer items-center justify-center bg-black/0 transition hover:bg-black/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--v02-gold)]"
        aria-label={`Play ${label}`}
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--v02-gold)] text-[var(--v02-ink)] shadow-lg transition group-hover:scale-105">
          <IconPlay className="ml-0.5 text-2xl" />
        </span>
      </button>
      <figcaption className="pointer-events-none absolute bottom-0 left-0 z-30 bg-[var(--v02-navy-deep)]/80 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
        {label}
      </figcaption>
    </figure>
  );
}

function YouTubeLightbox({
  videoId,
  title,
  onClose,
}: {
  videoId: string;
  title: string;
  onClose: () => void;
}) {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    controls: "1",
    enablejsapi: "1",
    origin,
  });

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
            {title}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white/20"
          >
            Close
          </button>
        </div>
        <div className="aspect-video overflow-hidden bg-black shadow-2xl">
          <iframe
            className="h-full w-full border-0"
            src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </div>
  );
}

function BlueprintPanel({
  num,
  label,
  icon,
  title,
  body,
  items,
  cta,
  onCta,
}: {
  num: string;
  label: string;
  icon: ReactNode;
  title: string;
  body: string;
  items: string[];
  cta?: boolean;
  onCta?: () => void;
}) {
  return (
    <div className="v02-usp-panel relative h-full w-[100vw] flex-shrink-0">
      <div
        className="v02-usp-ghost-num pointer-events-none absolute right-10 top-10 select-none v02-display text-9xl font-bold tracking-tight text-white/[0.06] transition-opacity duration-500"
        aria-hidden="true"
      >
        {num}
      </div>
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {icon}
          <span className={`mb-5 block ${type.eyebrowDark}`}>{label}</span>
          <h3 className="v02-display mb-6 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            {title}
          </h3>
          <p className={`${type.bodyDark} md:text-lg`}>{body}</p>
          <ul className="mt-8 space-y-3 border-t border-[var(--v02-line-on-dark)] pt-6 text-sm font-medium text-slate-200">
            {items.map((item) => (
              <li key={item} className="flex gap-2">
                <IconCheck className={`shrink-0 ${type.highlight}`} />
                {item}
              </li>
            ))}
          </ul>
          {cta && onCta ? (
            <button
              type="button"
              onClick={onCta}
              className={`group mt-10 inline-flex cursor-pointer items-center gap-2 ${type.eyebrowDark}`}
            >
              Schedule Your Discovery Call
              <IconArrowRight className="transition-transform group-hover:translate-x-1" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MobileBlueprint({
  num,
  label,
  title,
  body,
  cta,
  onCta,
}: {
  num: string;
  label: string;
  title: string;
  body: string;
  cta?: boolean;
  onCta?: () => void;
}) {
  return (
    <div className="flex w-full flex-col border-b border-[var(--v02-line-on-dark)] px-5 py-16 last:border-b-0 sm:px-6">
      <span className="v02-display mb-2 text-sm tracking-wide text-slate-500">
        {num}
      </span>
      <span className={`mb-5 ${type.eyebrowDark}`}>{label}</span>
      <h3 className="v02-display mb-5 text-3xl font-bold leading-tight tracking-tight text-white">
        {title}
      </h3>
      <p className={type.bodySmDark}>{body}</p>
      {cta && onCta ? (
        <button
          type="button"
          onClick={onCta}
          className={`group mt-8 inline-flex cursor-pointer items-center gap-2 ${type.eyebrowDark}`}
        >
          Schedule Your Discovery Call
          <IconArrowRight className="transition-transform group-hover:translate-x-1" />
        </button>
      ) : null}
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded border border-[var(--v02-line)] bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg">
      {icon}
      <p className={`mt-5 ${type.labelLight}`}>{title}</p>
      <p className={`mt-3 ${type.bodySmLight}`}>{body}</p>
    </div>
  );
}
