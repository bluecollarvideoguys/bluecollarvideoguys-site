"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { VideoSlot } from "@/components/VideoSlot";
import { IconArrowRight, IconPlus } from "@/components/icons";
import { CALENDLY_URL } from "@/lib/calendly";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
] as const;

const TOOLBOX = [
  {
    num: "01",
    title: "BUILD TRUST",
    body: "Content that proves who you are before the first handshake. Story films, testimonials, crew intros, education, BTS, culture, and community — the foundation of the Trust Framework™.",
    items: [
      "Brand story films",
      "Customer testimonials",
      "Meet-the-crew videos",
      "Educational / how-we-work content",
      "Behind-the-scenes & culture",
      "Community involvement pieces",
    ],
  },
  {
    num: "02",
    title: "STAND OUT",
    body: "Make your brand impossible to confuse with the next truck on the street. Cinematic project films, photography, web, identity, and a steady social cadence that keeps you top of mind.",
    items: [
      "Cinematic project videos",
      "Job-site photography",
      "Modern website design",
      "Brand identity systems",
      "Social strategy & monthly content",
    ],
  },
  {
    num: "03",
    title: "WIN MORE WORK",
    body: "The punch list that matters: leads that convert, projects that grow, referrals that compound, and a brand strong enough to attract better people and bigger work.",
    items: [
      "Lead-quality strategy",
      "Referral-ready content systems",
      "Hiring & culture films",
      "Long-term brand equity plays",
    ],
  },
] as const;

const QUOTES = [
  {
    quote:
      "They didn't just shoot pretty footage. They framed up how we talk about our work — and the phone started ringing differently.",
    name: "[Client Name]",
    trade: "[Trade / Company — placeholder]",
  },
  {
    quote:
      "Finally a crew that gets the trades. No fluff. Just a blueprint that made us look as solid as our installs.",
    name: "[Client Name]",
    trade: "[Trade / Company — placeholder]",
  },
  {
    quote:
      "We stopped sounding like every other contractor on Facebook. Now GCs know who we are before we bid.",
    name: "[Client Name]",
    trade: "[Trade / Company — placeholder]",
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

export function TestimonialsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("01");

  useEffect(() => {
    // Manifesto particle network
    const canvas = document.getElementById(
      "v02-phil-canvas",
    ) as HTMLCanvasElement | null;
    let canvasRaf = 0;
    let resizeObserver: ResizeObserver | null = null;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let W = 0;
      let H = 0;
      let pts: { x: number; y: number; vx: number; vy: number; r: number }[] =
        [];
      const N = 40;
      const DIST = 180;
      const COLOR = "17,26,38";

      const resize = () => {
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
      };
      const mkPts = () => {
        pts = Array.from({ length: N }, () => ({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: Math.random() * 1.5 + 0.5,
        }));
      };
      const frame = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, W, H);
        pts.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${COLOR},.22)`;
          ctx.fill();
        });
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const dx = pts[i].x - pts[j].x;
            const dy = pts[i].y - pts[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < DIST) {
              ctx.beginPath();
              ctx.moveTo(pts[i].x, pts[i].y);
              ctx.lineTo(pts[j].x, pts[j].y);
              ctx.strokeStyle = `rgba(${COLOR},${(1 - d / DIST) * 0.1})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
        canvasRaf = requestAnimationFrame(frame);
      };
      resize();
      mkPts();
      if (canvas.parentElement) {
        resizeObserver = new ResizeObserver(() => {
          resize();
          mkPts();
        });
        resizeObserver.observe(canvas.parentElement);
      }
      frame();
    }

    // Manifesto block + header reveals
    const philObservers: IntersectionObserver[] = [];
    document.querySelectorAll(".v02-phil-block").forEach((block) => {
      const lines = block.querySelectorAll(".v02-phil-line");
      const fades = block.querySelectorAll(".v02-phil-fade");
      const nums = block.querySelectorAll(".v02-phil-num");
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            lines.forEach((l) =>
              l.classList.remove("opacity-0", "translate-y-10"),
            );
            fades.forEach((f) => f.classList.remove("opacity-0"));
            nums.forEach((n) => n.classList.remove("opacity-0"));
          });
        },
        { threshold: 0.3 },
      );
      obs.observe(block);
      philObservers.push(obs);
    });

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
    document
      .querySelectorAll(".v02-scroll-reveal")
      .forEach((el) => scrollObserver.observe(el));
    return () => {
      cancelAnimationFrame(canvasRaf);
      resizeObserver?.disconnect();
      philObservers.forEach((o) => o.disconnect());
      scrollObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-[var(--v02-paper)] text-[var(--v02-ink)] antialiased">
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
        {/* MANIFESTO */}
        <section
          id="manifesto"
          className="relative z-40 overflow-hidden border-t border-[var(--v02-line)] bg-[var(--v02-paper)]"
        >
          <div
            className="pointer-events-none absolute inset-0 select-none overflow-hidden"
            aria-hidden="true"
          >
            <canvas
              id="v02-phil-canvas"
              className="absolute inset-0 h-full w-full opacity-50"
            />
          </div>

          <div className="relative z-10 border-b border-[var(--v02-line)]">
            <div className="mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-6 lg:px-8">
              <div className="v02-scroll-reveal translate-y-10 opacity-0 transition-all duration-1000 ease-out">
                <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">
                  Why we exist
                </span>
                <h2 className="v02-display text-5xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-6xl md:text-7xl">
                  MANIFESTO
                </h2>
              </div>
            </div>
          </div>

          <PhilBlock
            num="01"
            label="Belief"
            line1="Blue-collar businesses"
            line2="deserve to be seen."
            body="You've built something real: crews that show up, work that lasts, a name people trust. That story shouldn't sit buried under the same stock photos every competitor uses. We believe the trades deserve the same sharp storytelling the big brands get."
          />

          <div className="relative z-10 border-b border-[var(--v02-line)]">
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 md:py-16 lg:px-8">
              <div className="grid items-center gap-8 md:grid-cols-[1fr_1.2fr] md:gap-12">
                <div className="v02-scroll-reveal translate-y-10 opacity-0 transition-all duration-1000 ease-out">
                  <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">
                    See it land
                  </span>
                  <h3 className="v02-display mb-4 text-3xl font-bold leading-tight tracking-tight text-[var(--v02-ink)] md:text-4xl">
                    Trust on camera.
                    <br />
                    <span className="text-[var(--v02-ink)]/45">
                      Not just on a truck door.
                    </span>
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
                    A brand film that shows how you work (the crew, the craft,
                    the finish) does more than any slogan. Slot your best story
                    film here.
                  </p>
                </div>
                <VideoSlot
                  className="v02-scroll-reveal translate-y-10 opacity-0 transition-all delay-100 duration-1000 ease-out"
                  label="Featured Brand Film"
                  trade="Placeholder"
                  aspect="video"
                  tone="light"
                />
              </div>
            </div>
          </div>

          <PhilBlock
            num="02"
            label="Difference"
            line1="We don't sell cameras."
            line2="We sell trust."
            body="Plenty of vendors will shoot a video and walk away. We're a growth partner. Powered by the Trust Framework™, every piece of content is built to earn belief, then demand, then jobs, not just fill a feed."
          />
          <PhilBlock
            num="03"
            label="Right Fit"
            line1="Established shops."
            line2="Quality first."
            body="We work with contractors, electricians, plumbers, HVAC, roofers, welders, concrete crews: businesses that already care about reputation and treat marketing like an investment. Not a startup with no track record looking for a miracle."
            cta
            onCta={() => {
              window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
            }}
          />
        </section>

        <section
          id="toolbox"
          className="relative z-40 overflow-hidden border-t border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-24 md:py-32"
        >
          <div className="v02-scroll-reveal mx-auto w-full max-w-7xl translate-y-10 px-5 pb-16 opacity-0 transition-all duration-1000 ease-out sm:px-6 lg:px-8">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              What&apos;s in the kit
            </span>
            <h1 className="v02-display text-5xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-6xl md:text-7xl">
              TOOLBOX
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">
              Services framed under The Blue Collar Blueprint™, so every
              deliverable has a job on the job site.
            </p>
          </div>

          <div className="mx-auto w-full max-w-7xl border-t border-[var(--v02-line)] px-5 sm:px-6 lg:px-8">
            {TOOLBOX.map((item) => {
              const isOpen = openAccordion === item.num;
              return (
                <div
                  key={item.num}
                  className="v02-scroll-reveal border-b border-[var(--v02-line)] translate-y-10 opacity-0 transition-all duration-1000 ease-out"
                >
                  <button
                    type="button"
                    className="group flex w-full items-center justify-between py-10 text-left"
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenAccordion(isOpen ? null : item.num)
                    }
                  >
                    <div className="flex items-center gap-8 md:gap-16">
                      <span className="v02-display w-6 text-sm tracking-wide text-slate-400 transition group-hover:text-[var(--v02-gold-deep)]">
                        {item.num}
                      </span>
                      <h2 className="v02-display text-2xl font-bold tracking-tight text-slate-400 transition group-hover:text-[var(--v02-ink)] md:text-4xl">
                        {item.title}
                      </h2>
                    </div>
                    <span
                      className={`flex items-center justify-center text-slate-500 transition duration-300 group-hover:text-[var(--v02-ink)] ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <IconPlus />
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="flex flex-col gap-8 pb-12 pl-14 md:flex-row md:gap-16 md:pl-[5.5rem]">
                      <div className="md:w-1/2">
                        <p className="text-sm leading-relaxed text-slate-600">
                          {item.body}
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 border-l border-[var(--v02-line)] pl-6 md:w-1/2">
                        {item.items.map((line) => (
                          <span key={line} className="text-sm text-slate-700">
                            {line}
                          </span>
                        ))}
                        <Link
                          href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
                          className="group mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--v02-gold-deep)]"
                        >
                          Get a Blueprint
                          <IconArrowRight className="transition group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mx-auto w-full max-w-7xl px-5 pt-20 sm:px-6 lg:px-8">
            <div className="v02-scroll-reveal mb-8 flex translate-y-10 flex-col gap-4 opacity-0 transition-all duration-1000 ease-out sm:flex-row sm:items-end sm:justify-between">
              <h3 className="v02-display text-2xl font-bold tracking-tight text-[var(--v02-ink)] md:text-3xl">
                SAMPLE CUTS
              </h3>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                One clip per Blueprint stage. Swap with real work.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3 md:gap-5">
              <VideoSlot
                className="v02-scroll-reveal translate-y-10 opacity-0 transition-all duration-1000 ease-out"
                label="Build Trust cut"
                trade="Testimonials"
                tone="light"
              />
              <VideoSlot
                className="v02-scroll-reveal translate-y-10 opacity-0 transition-all delay-100 duration-1000 ease-out"
                label="Stand Out cut"
                trade="Project film"
                tone="light"
              />
              <VideoSlot
                className="v02-scroll-reveal translate-y-10 opacity-0 transition-all delay-200 duration-1000 ease-out"
                label="Win More Work cut"
                trade="Lead magnet"
                tone="light"
              />
            </div>
          </div>
        </section>

        <section
          id="proof"
          className="relative z-40 border-t border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-24 md:py-32"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="v02-scroll-reveal mb-16 translate-y-10 opacity-0 transition-all duration-1000 ease-out">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                From the job site
              </span>
              <h2 className="v02-display text-4xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-5xl md:text-6xl">
                PROOF
              </h2>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-[var(--v02-gold-deep)]">
                Placeholder quotes. Swap with real client stories.
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-3 md:gap-14">
              {QUOTES.map((item) => (
                <blockquote
                  key={item.quote}
                  className="v02-scroll-reveal translate-y-10 border-t-2 border-[var(--v02-gold)] pt-8 opacity-0 transition-all duration-1000 ease-out"
                >
                  <p className="mb-8 text-base leading-relaxed text-slate-700 md:text-lg">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer>
                    <cite className="v02-display not-italic text-sm font-semibold tracking-wide text-[var(--v02-ink)] uppercase">
                      {item.name}
                    </cite>
                    <p className="mt-1 text-xs text-slate-500">{item.trade}</p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section
          className="relative overflow-hidden border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] py-20 sm:py-24"
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
              href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
              className="mt-9 inline-flex items-center justify-center gap-3 rounded bg-[var(--v02-gold)] px-8 py-4 v02-display text-2xl font-bold tracking-tight text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)]"
            >
              Schedule Your Free Discovery Call
            </a>
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

function PhilBlock({
  num,
  label,
  line1,
  line2,
  body,
  cta,
  onCta,
}: {
  num: string;
  label: string;
  line1: string;
  line2: string;
  body: string;
  cta?: boolean;
  onCta?: () => void;
}) {
  return (
    <div className="v02-phil-block group/block relative z-10 border-b border-[var(--v02-line)] last:border-b-0">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid min-h-[40vh] md:grid-cols-[200px_1fr]">
          <div className="hidden flex-col justify-between border-r border-[var(--v02-line)] py-16 pr-10 md:flex">
            <div>
              <span className="v02-phil-num v02-display block text-3xl font-bold tracking-tight text-[var(--v02-ink)]/25 opacity-0 transition-colors duration-500 group-hover/block:text-[var(--v02-ink)]">
                {num}
              </span>
              <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">
                {label}
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center py-16 md:pl-16">
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)] md:hidden">
              {num} · {label}
            </span>
            <h3 className="v02-display mb-8 text-3xl font-bold leading-tight tracking-tight text-[var(--v02-ink)] md:text-5xl lg:text-6xl">
              <span className="v02-phil-line block translate-y-10 opacity-0 transition-all duration-700 ease-out">
                {line1}
              </span>
              <span className="v02-phil-line block translate-y-10 text-[var(--v02-ink)]/45 opacity-0 transition-all delay-100 duration-700 ease-out">
                {line2}
              </span>
            </h3>
            <p className="v02-phil-fade max-w-xl text-sm leading-relaxed text-slate-600 opacity-0 transition-opacity delay-300 duration-700 md:text-base">
              {body}
            </p>
            {cta && onCta ? (
              <button
                type="button"
                onClick={onCta}
                className="v02-phil-fade mt-10 inline-flex w-fit items-center gap-2 rounded bg-[var(--v02-gold)] px-6 py-3 text-sm font-semibold text-[var(--v02-ink)] opacity-0 transition-all delay-400 duration-700 hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)]"
              >
                Schedule a Discovery Call
                <IconArrowRight />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
