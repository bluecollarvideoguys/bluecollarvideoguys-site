"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

const VERSIONS = [
  { href: "/v01", label: "Version 01" },
  { href: "/v02", label: "Version 02" },
  { href: "/v03", label: "Version 03" },
  { href: "/v04", label: "Version 04" },
  { href: "/v05", label: "Version 05" },
  { href: "/v06", label: "Version 06", active: true },
  { href: "/v07", label: "Version 07" },
] as const;

const MEDIA_POSTER =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=90";
const PLACEHOLDER_MP4 =
  "https://res.cloudinary.com/dq9aym4ad/video/upload/v1778758779/mp__qhpetb.mp4";
const GALLERY = {
  main: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=90",
  interior:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=90",
  detail:
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=90",
  turnkey:
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=90",
} as const;

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
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

function IconArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
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

function IconMap({
  className,
  size = 16,
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
        d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconShield({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
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
      width="22"
      height="22"
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

function IconWrench({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-2.5 2.5-2.5z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChart({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4 19V5M4 19h16" strokeLinecap="round" />
      <path d="M8 15v-4M12 15V8M16 15v-7" strokeLinecap="round" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M8.5 4.5h-2A2.5 2.5 0 0 0 4 7v.5c0 7.18 5.82 13 13 13h.5a2.5 2.5 0 0 0 2.5-2.5v-2l-3.5-1.5-1.5 1.5a11 11 0 0 1-5-5l1.5-1.5L9 4.5z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" strokeLinejoin="round" />
    </svg>
  );
}

export function Version06Page() {
  const [formSent, setFormSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="bg-stone-50 text-stone-900 antialiased">
      <nav className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/v06"
            className="flex items-center gap-3 text-white"
            aria-label="The Blue Collar Video Guys home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border border-white/35 bg-white/10 backdrop-blur-sm">
              <span className="h-3 w-3 rounded-full bg-white" />
            </span>
            <span className="text-sm font-medium uppercase tracking-[0.16em]">
              Blue Collar Video Guys™
            </span>
          </Link>

          <div className="hidden items-center gap-6 xl:flex">
            {VERSIONS.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className={`text-xs font-medium uppercase tracking-[0.14em] transition hover:text-white ${
                  "active" in v && v.active
                    ? "text-white"
                    : "text-white/75"
                }`}
                aria-current={"active" in v && v.active ? "page" : undefined}
              >
                {v.label.replace("Version ", "V")}
              </Link>
            ))}
            <a
              href="#blueprint"
              className="text-xs font-medium uppercase tracking-[0.14em] text-white/75 transition hover:text-white"
            >
              Blueprint
            </a>
            <a
              href="#work"
              className="text-xs font-medium uppercase tracking-[0.14em] text-white/75 transition hover:text-white"
            >
              Work
            </a>
            <a
              href="#contact"
              className="rounded-full bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-stone-900 transition hover:bg-stone-100"
            >
              Get a Blueprint
            </a>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="rounded-full border border-white/30 bg-white/10 px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm"
            >
              Menu
            </button>
            <a
              href="#contact"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm"
              aria-label="Contact"
            >
              <IconArrowRight />
            </a>
          </div>
        </div>

        {menuOpen ? (
          <div className="mx-auto mt-2 max-w-7xl rounded-2xl border border-white/20 bg-stone-950/90 px-5 py-4 backdrop-blur-md xl:hidden">
            <div className="flex flex-col gap-3 text-sm text-white">
              {VERSIONS.map((v) => (
                <Link
                  key={v.href}
                  href={v.href}
                  onClick={() => setMenuOpen(false)}
                  className={
                    "active" in v && v.active ? "font-semibold" : "text-white/80"
                  }
                >
                  {v.label}
                </Link>
              ))}
              <a href="#blueprint" onClick={() => setMenuOpen(false)}>
                Blueprint
              </a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </div>
          </div>
        ) : null}
      </nav>

      <main id="top">
        <header className="relative min-h-screen overflow-hidden bg-stone-900">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={PLACEHOLDER_MP4}
            poster={MEDIA_POSTER}
            autoPlay
            muted
            loop
            playsInline
            aria-label="Brand film background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/5 to-black/65" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/40 to-transparent" />

          <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-5 pb-10 pt-32 sm:px-8 sm:pb-12">
            <div className="max-w-4xl">
              <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                  The Blue Collar Blueprint™
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-white/80">
                  <IconMap />
                  Authentic video for the trades
                </span>
              </div>
              <h1 className="max-w-3xl text-5xl font-medium leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
                Build Trust.
                <br />
                Stand Out.
                <br />
                Win More Work.
              </h1>
              <p className="mt-7 max-w-xl text-base font-normal leading-7 text-white/80 sm:text-lg">
                You&apos;ve spent years earning your reputation. We frame it up
                through one clear growth system — so more of the right customers
                find you.
              </p>
            </div>

            <div className="mt-14 grid max-w-5xl grid-cols-2 border-t border-white/20 pt-6 sm:grid-cols-4 sm:gap-8">
              <div className="border-r border-white/20 pr-4 sm:border-0">
                <p className="v06-mono text-xs uppercase tracking-[0.14em] text-white/55">
                  Stage 01
                </p>
                <p className="mt-2 text-xl font-medium tracking-tight text-white sm:text-2xl">
                  Build Trust
                </p>
              </div>
              <div className="pl-5 sm:border-l sm:border-white/20 sm:pl-8">
                <p className="v06-mono text-xs uppercase tracking-[0.14em] text-white/55">
                  Stage 02
                </p>
                <p className="mt-2 text-xl font-medium tracking-tight text-white sm:text-2xl">
                  Stand Out
                </p>
              </div>
              <div className="mt-6 border-r border-white/20 pr-4 sm:mt-0 sm:border-l sm:border-white/20 sm:px-8">
                <p className="v06-mono text-xs uppercase tracking-[0.14em] text-white/55">
                  Stage 03
                </p>
                <p className="mt-2 text-xl font-medium tracking-tight text-white sm:text-2xl">
                  Win Work
                </p>
              </div>
              <div className="mt-6 pl-5 sm:mt-0 sm:border-l sm:border-white/20 sm:pl-8">
                <p className="v06-mono text-xs uppercase tracking-[0.14em] text-white/55">
                  System
                </p>
                <p className="mt-2 text-xl font-medium tracking-tight text-white sm:text-2xl">
                  Trust Framework™
                </p>
              </div>
            </div>
          </div>
        </header>

        <section
          id="blueprint"
          className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28"
        >
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-800">
                A clear plan
              </p>
              <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight text-stone-900 sm:text-4xl">
                Content that earns
                <br />
                confidence.
              </h2>
            </div>

            <div className="lg:col-span-8">
              <p className="max-w-3xl text-xl font-normal leading-9 tracking-tight text-stone-700 sm:text-2xl">
                The Blue Collar Blueprint™ is our proven system for blue-collar
                growth — powered by the Trust Framework™. We don&apos;t sell
                cameras. We sell trust.
              </p>
              <div className="mt-10 grid gap-7 border-t border-stone-200 pt-8 sm:grid-cols-2">
                <p className="text-sm leading-7 text-stone-600">
                  Brand stories, testimonials, and crew films answer the
                  question every buyer asks: “Can I trust this company?” Before
                  the first call is ever made.
                </p>
                <p className="text-sm leading-7 text-stone-600">
                  Project films, photography, web, and branding make you the
                  shop people remember — so better leads and bigger jobs follow.
                </p>
              </div>

              <div className="mt-12 grid border-y border-stone-200 sm:grid-cols-2">
                <div className="flex gap-4 border-b border-stone-200 py-5 sm:mr-8 sm:border-b-0">
                  <IconShield className="mt-0.5 shrink-0 text-emerald-800" />
                  <div>
                    <p className="text-sm font-medium text-stone-900">
                      Build Trust
                    </p>
                    <p className="mt-1 text-xs leading-5 text-stone-500">
                      Stories and proof that earn confidence early.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 border-b border-stone-200 py-5 sm:border-b-0 sm:border-l sm:border-stone-200 sm:pl-8">
                  <IconStar className="mt-0.5 shrink-0 text-emerald-800" />
                  <div>
                    <p className="text-sm font-medium text-stone-900">
                      Stand Out
                    </p>
                    <p className="mt-1 text-xs leading-5 text-stone-500">
                      Films, photo, web, and brand that set you apart.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 border-b border-stone-200 py-5 sm:mr-8 sm:border-b-0">
                  <IconWrench className="mt-0.5 shrink-0 text-emerald-800" />
                  <div>
                    <p className="text-sm font-medium text-stone-900">
                      Win More Work
                    </p>
                    <p className="mt-1 text-xs leading-5 text-stone-500">
                      Better leads, bigger projects, lasting referrals.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 py-5 sm:border-l sm:border-stone-200 sm:pl-8">
                  <IconChart className="mt-0.5 shrink-0 text-emerald-800" />
                  <div>
                    <p className="text-sm font-medium text-stone-900">
                      Built for the trades
                    </p>
                    <p className="mt-1 text-xs leading-5 text-stone-500">
                      HVAC, electrical, roofing, concrete — shops that care.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="bg-stone-200/60 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-800">
                  Job Sites
                </p>
                <h2 className="mt-4 text-3xl font-medium tracking-tight text-stone-900 sm:text-4xl">
                  Work that looks like the job.
                </h2>
                <p className="mt-2 text-xs uppercase tracking-widest text-stone-500">
                  Placeholder stills — swap with client films
                </p>
              </div>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 border-b border-stone-500 pb-1 text-sm font-medium text-stone-800 transition hover:border-stone-900"
              >
                Request the full reel
                <IconArrowUpRight className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="grid gap-3 md:grid-cols-12 md:grid-rows-2">
              <figure className="relative min-h-80 overflow-hidden bg-stone-300 md:col-span-7 md:row-span-2 md:min-h-[42rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={GALLERY.main}
                  alt="Crew on a job site"
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute bottom-0 left-0 bg-stone-950/70 px-4 py-3 text-xs uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  Job-site films
                </figcaption>
              </figure>
              <figure className="relative min-h-64 overflow-hidden bg-stone-300 md:col-span-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={GALLERY.interior}
                  alt="Camera on set"
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute bottom-0 left-0 bg-stone-950/70 px-4 py-3 text-xs uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  Brand stories
                </figcaption>
              </figure>
              <figure className="relative min-h-64 overflow-hidden bg-stone-300 md:col-span-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={GALLERY.detail}
                  alt="Editing detail"
                  className="h-full w-full object-cover"
                />
                <figcaption className="absolute bottom-0 left-0 bg-stone-950/70 px-4 py-3 text-xs uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                  Craft &amp; edit
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28">
          <div className="grid overflow-hidden bg-emerald-950 lg:grid-cols-2">
            <div className="relative min-h-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={GALLERY.turnkey}
                alt="Strategy conversation"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-200">
                The partner advantage
              </p>
              <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
                Prepared for lasting growth.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-emerald-50/75">
                Not a one-off edit. A growth partner who maps every film,
                website, and strategy to the Blueprint — so reputation turns
                into jobs.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-emerald-950 transition hover:bg-emerald-100"
              >
                Frame up your Blueprint
                <IconArrowRight />
              </a>
            </div>
          </div>
        </section>

        <section id="trades" className="relative overflow-hidden bg-stone-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MEDIA_POSTER}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-25 grayscale"
          />
          <div className="absolute inset-0 bg-emerald-950/50" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-200">
                Who we serve
              </p>
              <h2 className="mt-5 text-4xl font-medium tracking-tight text-white sm:text-5xl">
                Built for
                <br />
                blue-collar shops.
              </h2>
            </div>
            <div className="self-end">
              <p className="max-w-md text-base leading-7 text-white/75">
                Contractors, HVAC, electricians, roofers, concrete crews — trades
                that already care about quality and need marketing that matches.
              </p>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-stone-900"
              >
                <IconMap size={19} />
                Start the conversation
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-stone-50 py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-800">
                Private inquiries
              </p>
              <h2 className="mt-5 text-3xl font-medium leading-tight tracking-tight text-stone-900 sm:text-4xl">
                Your story deserves
                <br />
                to be told.
              </h2>
              <div className="mt-10 flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={MEDIA_POSTER}
                  alt="The Blue Collar Video Guys"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-stone-900">
                    The Blue Collar Video Guys™
                  </p>
                  <p className="mt-1 text-xs text-stone-500">
                    Growth partners for the trades
                  </p>
                </div>
              </div>
              <div className="mt-7 space-y-3">
                <a
                  href="tel:+10000000000"
                  className="flex w-fit items-center gap-2 text-sm text-stone-600 transition hover:text-emerald-800"
                >
                  <IconPhone />
                  [Phone — placeholder]
                </a>
                <a
                  href="mailto:hello@bluecollarvideoguys.com"
                  className="flex w-fit items-center gap-2 text-sm text-stone-600 transition hover:text-emerald-800"
                >
                  <IconMail />
                  hello@bluecollarvideoguys.com
                </a>
              </div>
            </div>

            <form onSubmit={onSubmit} className="lg:col-span-7">
              <div className="grid gap-x-6 sm:grid-cols-2">
                <label className="border-b border-stone-300 py-4">
                  <span className="block text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                    Your name
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    className="mt-3 w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
                  />
                </label>
                <label className="border-b border-stone-300 py-4">
                  <span className="block text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                    Email address
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="mt-3 w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
                  />
                </label>
                <label className="border-b border-stone-300 py-4 sm:col-span-2">
                  <span className="block text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                    Phone number
                  </span>
                  <input
                    type="tel"
                    placeholder="+1 000 000 0000"
                    className="mt-3 w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
                  />
                </label>
                <label className="border-b border-stone-300 py-4 sm:col-span-2">
                  <span className="block text-xs font-medium uppercase tracking-[0.12em] text-stone-500">
                    What are you building?
                  </span>
                  <textarea
                    rows={3}
                    required
                    placeholder="Trade, company, and what you want customers to trust you for..."
                    className="mt-3 w-full resize-none bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-950 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                {formSent ? "Thank you — we'll be in touch" : "Send inquiry"}
                <IconArrowRight />
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 py-8 text-xs text-stone-500 sm:flex-row sm:items-center sm:px-8">
          <p>
            © {new Date().getFullYear()} The Blue Collar Video Guys™. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/v01" className="transition hover:text-stone-900">
              V01
            </Link>
            <Link href="/v02" className="transition hover:text-stone-900">
              V02
            </Link>
            <Link href="/v03" className="transition hover:text-stone-900">
              V03
            </Link>
            <Link href="/v04" className="transition hover:text-stone-900">
              V04
            </Link>
            <Link href="/v05" className="transition hover:text-stone-900">
              V05
            </Link>
            <span className="text-stone-900">V06</span>
            <Link href="/v07" className="transition hover:text-stone-900">
              V07
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
