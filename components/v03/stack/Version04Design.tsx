"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { HeroYouTubeBackground } from "@/components/HeroYouTubeBackground";

const VERSIONS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
] as const;

const VIDEOGRAPHER_IMAGE = "/images/purpose-videographer.png";

const HERO_YT = "7gGRBMdAQ2k";
const HERO_START_SEC = 15;
const TESTIMONIALS = [
  { id: "jzdRmbzji-A", label: "Client story" },
  { id: "emhLh58qP94", label: "Client story" },
  { id: "ss-3eS8oCTs", label: "Client story" },
] as const;

function IconArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
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

function IconPlay({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l6-3.5-6-3.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M8.5 4.5h-2A2.5 2.5 0 0 0 4 7v.5c0 7.18 5.82 13 13 13h.5a2.5 2.5 0 0 0 2.5-2.5v-2l-3.5-1.5-1.5 1.5a11 11 0 0 1-5-5l1.5-1.5L9 4.5z" strokeLinejoin="round" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" strokeLinejoin="round" />
    </svg>
  );
}

function IconChat({ className }: { className?: string }) {
  return (
    <svg className={className} width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5 18l-1 3 3.5-1.5A8.5 8.5 0 1 0 5 18z" strokeLinejoin="round" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function IconHardHat({ className }: { className?: string }) {
  return (
    <svg className={className} width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 14h16v2H4z" />
      <path d="M6 14a6 6 0 0 1 12 0" />
      <path d="M12 4v4" strokeLinecap="round" />
    </svg>
  );
}

/** 16:9 YouTube embed sized to cover its parent (no letterbox bars). */
function CoverYouTubeEmbed({
  videoId,
  title,
}: {
  videoId: string;
  title: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const update = () => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ratio = 16 / 9;
  const zoom = 1.28;
  let frameW = 0;
  let frameH = 0;
  if (size.w > 0 && size.h > 0) {
    if (size.w / size.h > ratio) {
      frameW = size.w * zoom;
      frameH = (size.w / ratio) * zoom;
    } else {
      frameH = size.h * zoom;
      frameW = size.h * ratio * zoom;
    }
  }

  const origin =
    typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div ref={hostRef} className="absolute inset-0 overflow-hidden bg-[var(--v04-card)]">
      {frameW > 0 ? (
        <iframe
          className="absolute left-1/2 top-1/2 border-0"
          style={{
            width: frameW,
            height: frameH,
            transform: "translate(-50%, -50%)",
          }}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(origin)}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : null}
    </div>
  );
}

function TestimonialVideoCard({
  videoId,
  label,
  playing,
  onPlay,
}: {
  videoId: string;
  label: string;
  playing: boolean;
  onPlay: () => void;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--v04-card)]">
      <div className="relative min-h-[14rem] flex-1 overflow-hidden bg-[var(--v04-card)]">
        {playing ? (
          <CoverYouTubeEmbed videoId={videoId} title={label} />
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <button
              type="button"
              onClick={onPlay}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 text-white transition hover:bg-black/20"
              aria-label={`Play ${label}`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/40 text-amber-300 backdrop-blur-sm">
                <IconPlay />
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-white/90">
                Watch testimonial
              </span>
            </button>
          </>
        )}
      </div>
      <div className="border-t border-white/10 p-7">
        <p className="text-sm font-medium text-amber-300">{label}</p>
        <p className="mt-1 text-xs text-stone-500">From the field · Video</p>
      </div>
    </article>
  );
}

function IconCamera({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <circle cx="12" cy="13.5" r="3.5" />
      <path d="M8 7l1.5-3h5L16 7" strokeLinejoin="round" />
    </svg>
  );
}

function Pill({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${
        light
          ? "border-stone-300/80 bg-stone-900/5"
          : "border-white/10 bg-white/5"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
      <span
        className={`text-xs font-medium uppercase tracking-[0.14em] ${
          light ? "text-stone-700" : "text-stone-200"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

export function Version04Design() {
  const [formSent, setFormSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [playingTestimonial, setPlayingTestimonial] = useState<string | null>(
    null,
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="bg-[var(--v04-ink)] text-stone-300 antialiased selection:bg-amber-300 selection:text-stone-950">
      <main>
        {/* HERO */}
        <header className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0">
            {/* CLIENT ASSET: Branded production / job-site hero reel */}
            <HeroYouTubeBackground
              videoId={HERO_YT}
              startSec={HERO_START_SEC}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/20 to-[var(--v04-ink)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
          </div>

          <nav className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
            <Link
              href="/v03#v04"
              className="v04-script text-2xl leading-none text-white sm:text-3xl"
            >
              Blue Collar Video Guys™
            </Link>

            <div className="hidden items-center gap-6 rounded-full border border-white/10 bg-black/20 px-6 py-3 text-xs font-medium text-white backdrop-blur-md md:flex lg:gap-8">
              {VERSIONS.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  className={`transition hover:text-amber-300 ${
                    "active" in v && v.active ? "text-amber-300" : ""
                  }`}
                  aria-current={"active" in v && v.active ? "page" : undefined}
                >
                  {v.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/10 px-3 py-2.5 text-xs font-medium text-white backdrop-blur-md md:hidden"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Open menu"
              >
                Menu
              </button>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-stone-950"
              >
                <span className="hidden sm:inline">Get a Blueprint</span>
                <IconArrowUpRight />
              </a>
            </div>
          </nav>

          {menuOpen ? (
            <div className="absolute inset-x-0 top-[4.5rem] z-30 mx-6 rounded-2xl border border-white/10 bg-black/90 p-5 backdrop-blur-md md:hidden">
              <div className="flex flex-col gap-3 text-sm text-white">
                {VERSIONS.map((v) => (
                  <Link
                    key={v.href}
                    href={v.href}
                    onClick={() => setMenuOpen(false)}
                    className={"active" in v && v.active ? "text-amber-300" : ""}
                  >
                    {v.label}
                  </Link>
                ))}
                <a href="#about" onClick={() => setMenuOpen(false)}>
                  About
                </a>
                <a href="#services" onClick={() => setMenuOpen(false)}>
                  Blueprint
                </a>
                <a href="#contact" onClick={() => setMenuOpen(false)}>
                  Contact
                </a>
              </div>
            </div>
          ) : null}

          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-14 pt-36 lg:px-10 lg:pb-16">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span className="text-xs font-medium uppercase tracking-[0.14em] text-stone-100">
                  Authentic video marketing for blue-collar businesses
                </span>
              </div>

              <h1 className="max-w-4xl text-5xl font-medium leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-8xl">
                Build Trust.
                <br />
                Stand Out.
                <br />
                <span className="v04-script font-normal text-amber-300">
                  Win More Work.
                </span>
              </h1>
            </div>

            <div className="mt-12 flex flex-col gap-8 border-t border-white/15 pt-6 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-3 text-sm font-medium text-stone-950 transition hover:bg-amber-200"
                >
                  Get Your Blueprint
                  <IconArrowRight />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
                >
                  See the Blueprint
                  <IconPlay />
                </a>
              </div>

              <p className="max-w-sm text-sm leading-6 text-stone-200 md:text-right">
                You&apos;ve spent years earning your reputation. Our job is to make
                sure more people see it — through The Blue Collar Blueprint™.
              </p>
            </div>
          </div>
        </header>

        {/* PURPOSE / BELIEF */}
        <section
          id="about"
          className="border-b border-stone-200/80 bg-[var(--v04-paper)] py-24 text-stone-800 lg:py-32"
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12 lg:px-10">
            <div className="lg:col-span-3">
              <Pill tone="light">Our belief</Pill>
            </div>

            <div className="lg:col-span-9">
              <p className="max-w-4xl text-2xl font-normal leading-relaxed tracking-tight text-stone-600 sm:text-3xl">
                Trust Wins Jobs. People don&apos;t hire the cheapest contractor —
                they hire the one they trust. We make sure the answer is{" "}
                <span className="text-stone-950">yes</span> before they ever pick up
                the phone.
              </p>

              <div className="mt-12 grid grid-cols-1 gap-6 border-t border-stone-300 pt-7 sm:grid-cols-3">
                <div>
                  <p className="text-3xl font-medium tracking-tight text-stone-950">
                    Build Trust
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.13em] text-stone-500">
                    Confidence before the call
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-medium tracking-tight text-stone-950">
                    Stand Out
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.13em] text-stone-500">
                    The memorable shop
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-medium tracking-tight text-stone-950">
                    Win More Work
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.13em] text-stone-500">
                    Trust into growth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLUEPRINT / SERVICES */}
        <section
          id="services"
          className="relative overflow-hidden bg-[var(--v04-ink)] py-24 lg:py-32"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />

          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-14 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-5">
                  <Pill>The Blue Collar Blueprint™</Pill>
                </div>
                <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl">
                  Everything we do fits
                  <br />
                  <span className="v04-script font-normal text-amber-300">
                    one framework.
                  </span>
                </h2>
              </div>

              <a
                href="#contact"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-white/10"
              >
                Break ground
                <IconArrowRight />
              </a>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <ServiceCard
                badge="Stage 01"
                title="Build Trust"
                meta="Stories · Testimonials · Crew films"
                image={VIDEOGRAPHER_IMAGE}
              />
              <ServiceCard
                badge="Stage 02"
                title="Stand Out"
                meta="Project films · Web · Branding"
                image={VIDEOGRAPHER_IMAGE}
              />
              <ServiceCard
                badge="Stage 03"
                title="Win More Work"
                meta="Leads · Referrals · Growth"
                image={VIDEOGRAPHER_IMAGE}
              />
              <ServiceCard
                badge="Partner"
                title="Growth partner"
                meta="Strategy · Not just footage"
                image={VIDEOGRAPHER_IMAGE}
              />
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section
          id="projects"
          className="bg-[var(--v04-paper)] py-24 text-stone-800 lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
              <div>
                <div className="mb-5">
                  <Pill tone="light">What makes us different</Pill>
                </div>
                <h2 className="text-4xl font-medium tracking-tight text-stone-950 sm:text-5xl">
                  We don&apos;t sell videos.
                  <br />
                  <span className="v04-script font-normal text-amber-300">
                    We sell trust.
                  </span>
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-stone-600 lg:justify-self-end">
                Most agencies chase attention. We create content that earns
                confidence — every video, website, and strategy moves you through
                The Blue Collar Blueprint™.
              </p>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <IconChat className="text-amber-300" />,
                  t: "Trust before the call",
                  d: "Stories and proof that answer “Can I trust this crew?” first.",
                },
                {
                  icon: <IconCheck className="text-amber-300" />,
                  t: "Craft that lasts",
                  d: "Authentic films and digital work built for reputation, not views.",
                },
                {
                  icon: <IconCalendar className="text-amber-300" />,
                  t: "A clear process",
                  d: "Build Trust → Stand Out → Win More Work. Our promise, not a slogan.",
                },
                {
                  icon: <IconHardHat className="text-amber-300" />,
                  t: "Built for the trades",
                  d: "Established shops that care about quality — we help more people see it.",
                },
              ].map((item) => (
                <div key={item.t} className="bg-[var(--v04-paper-card)] p-7">
                  <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-300/20">
                    {item.icon}
                  </div>
                  <h3 className="text-base font-medium text-stone-950">{item.t}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-[var(--v04-ink)] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-12">
              <div className="mb-5">
                <Pill>Testimonials</Pill>
              </div>
              <h2 className="text-4xl font-medium tracking-tight text-white sm:text-5xl">
                From the{" "}
                <span className="v04-script font-normal text-amber-300">
                  Field.
                </span>
              </h2>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-stone-500">
                Placeholder quotes — swap with real client stories
              </p>
            </div>

            <div className="grid items-stretch gap-5 lg:grid-cols-3">
              {TESTIMONIALS.map((clip) => (
                <TestimonialVideoCard
                  key={clip.id}
                  videoId={clip.id}
                  label={clip.label}
                  playing={playingTestimonial === clip.id}
                  onPlay={() => setPlayingTestimonial(clip.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          className="border-t border-stone-200 bg-[var(--v04-paper)] py-24 text-stone-800 lg:py-32"
        >
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:px-10">
            <div>
              <div className="mb-5">
                <Pill tone="light">Let&apos;s talk</Pill>
              </div>
              <h2 className="text-4xl font-medium tracking-tight text-stone-950 sm:text-5xl">
                Your story
                <br />
                <span className="v04-script font-normal text-amber-300">
                  deserves to be told.
                </span>
              </h2>
              <p className="mt-7 max-w-md text-base leading-7 text-stone-600">
                Tell us about your shop. We&apos;ll frame up how The Blue Collar
                Blueprint™ turns trust into more of the right work.
              </p>

              <div className="mt-12 space-y-5 text-sm">
                {/* CLIENT ASSET: Replace placeholder phone */}
                <a
                  href="tel:+10000000000"
                  className="flex items-center gap-3 text-stone-700 transition hover:text-amber-300"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-amber-300">
                    <IconPhone />
                  </span>
                  [Phone — placeholder]
                </a>
                <a
                  href="mailto:hello@bluecollarvideoguys.com"
                  className="flex items-center gap-3 text-stone-700 transition hover:text-amber-300"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-300 bg-white text-amber-300">
                    <IconMail />
                  </span>
                  hello@bluecollarvideoguys.com
                </a>
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-stone-600">
                    First name
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Your first name"
                    className="w-full rounded-xl border border-stone-200 bg-[var(--v04-paper)] px-4 py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-amber-300"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-stone-600">
                    Last name
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Your last name"
                    className="w-full rounded-xl border border-stone-200 bg-[var(--v04-paper)] px-4 py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-amber-300"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-stone-600">
                    Email
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-stone-200 bg-[var(--v04-paper)] px-4 py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-amber-300"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-medium text-stone-600">
                    Phone
                  </span>
                  <input
                    type="tel"
                    placeholder="(000) 000-0000"
                    className="w-full rounded-xl border border-stone-200 bg-[var(--v04-paper)] px-4 py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-amber-300"
                  />
                </label>
              </div>

              <label className="mt-5 block">
                <span className="mb-2 block text-xs font-medium text-stone-600">
                  What are you building?
                </span>
                <textarea
                  rows={5}
                  required
                  placeholder="Trade, company size, and what you want customers to trust you for..."
                  className="w-full resize-none rounded-xl border border-stone-200 bg-[var(--v04-paper)] px-4 py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400 focus:border-amber-300"
                />
              </label>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-amber-300 px-5 py-3.5 text-sm font-medium text-stone-950 transition hover:bg-amber-200"
              >
                {formSent
                  ? "Thank you — we'll be in touch"
                  : "Request my Blueprint"}
                <IconArrowRight />
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[var(--v04-ink)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <Link
            href="/v03#v04"
            className="v04-script text-2xl leading-none text-white sm:text-3xl"
          >
            Blue Collar Video Guys™
          </Link>
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} The Blue Collar Video Guys™. Build
            Trust. Stand Out. Win More Work.
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="text-stone-500 transition hover:text-amber-300"
            >
              <IconCamera />
            </a>
            <a
              href="mailto:hello@bluecollarvideoguys.com"
              aria-label="Email"
              className="text-stone-500 transition hover:text-amber-300"
            >
              <IconMail />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({
  badge,
  title,
  meta,
  image,
}: {
  badge: string;
  title: string;
  meta: string;
  image: string;
}) {
  return (
    <article className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-stone-950">
        {badge}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="text-xl font-medium tracking-tight text-white">{title}</h3>
        <p className="mt-2 text-xs text-stone-300">{meta}</p>
      </div>
    </article>
  );
}
