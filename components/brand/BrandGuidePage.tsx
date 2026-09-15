"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { BrandLogo, type BrandLogoVariant } from "@/components/BrandLogo";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

/** Official palette from Blue_Collar_Video_Guys_Official_Brand_Guide.pdf */
const COLORS = [
  {
    name: "Off White",
    hex: "#F2F2F2",
    role: "Primary light / lettering",
    on: "dark" as const,
  },
  {
    name: "Gold",
    hex: "#F5B000",
    role: "Brand accent / emphasis",
    on: "dark" as const,
  },
  {
    name: "Charcoal",
    hex: "#1A1A1A",
    role: "Primary dark / backgrounds",
    on: "light" as const,
  },
];

const LOGO_VARIANTS: {
  variant: BrandLogoVariant;
  label: string;
  use: string;
}[] = [
  {
    variant: "primary",
    label: "Primary Logo",
    use: "Default lockup for websites, decks, proposals, and print headers",
  },
  {
    variant: "alternate",
    label: "Alternate Horizontal",
    use: "Secondary horizontal applications and flexible layouts",
  },
  {
    variant: "stacked",
    label: "Stacked Logo",
    use: "Centered placements, covers, and profile headers",
  },
  {
    variant: "crest",
    label: "Badge / Crest",
    use: "Certificates, leave-behinds, apparel, and formal stamps",
  },
  {
    variant: "circular",
    label: "Social Profile Mark",
    use: "Avatars, stickers, QR companions, and social seals",
  },
  {
    variant: "icon",
    label: "Icon / Submark",
    use: "Favicons, embroidery, watermarks, and small-format marks",
  },
];

const BLUEPRINT = [
  {
    title: "Build Trust",
    body: "Show the people, craftsmanship, values, process, proof, and customer experience behind the company.",
  },
  {
    title: "Stand Out",
    body: "Create a recognizable premium brand and consistent media presence that separates the client from look-alike competitors.",
  },
  {
    title: "Win More Work",
    body: "Turn trust and differentiation into stronger leads, better-fit customers, recruiting advantages, referrals, and long-term brand equity.",
  },
];

const VOICE_USE = [
  "Build trust. Stand out. Win more work.",
  "You've earned the reputation. We help people see it.",
  "Show the craftsmanship behind the company.",
  "Media Team for the Trades.",
];

const VOICE_AVOID = [
  "We make cool cinematic content.",
  "Marketing jargon and buzzwords.",
  "Overpromising leads, virality, or instant growth.",
  "Trying to sound like the contractor itself.",
];

const MESSAGING = [
  "Trust Wins Jobs.",
  "Build Trust. Stand Out. Win More Work.",
  "Media Team for the Trades.",
  "Built for the businesses that build America.",
  "You've spent years earning your reputation. Our job is to make sure more people see it.",
];

const DONT = [
  "Do not stretch, skew, recolor, rearrange, or add effects to the logo.",
  "Do not replace the monogram or alter the roof geometry.",
  "Do not introduce broken, distressed, dashed, or fragmented borders.",
  "Do not place presentation labels inside production logo files.",
  "Do not recreate the BC monogram by typing B and C in a substitute font.",
];

const DO = [
  "Keep the BC monogram, play symbol, roof form, and proportions consistent.",
  "Use clean, continuous solid borders on icon marks, submarks, and badges.",
  "Prefer charcoal or off-white grounds with gold as accent, not decoration.",
  "Lead with reputation and outcomes before cameras and gear.",
  "Ask: does this help BUILD TRUST, STAND OUT, or WIN MORE WORK?",
];

function SectionEyebrow({ children }: { children: string }) {
  return (
    <span className="brand-label mb-4 block text-[11px] text-[var(--gold)]">
      {children}
    </span>
  );
}

export function BrandGuidePage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll<HTMLElement>(".brand-reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => io.observe(node));
    const failSafe = window.setTimeout(() => {
      nodes.forEach((node) => node.classList.add("is-visible"));
    }, 1800);

    return () => {
      io.disconnect();
      window.clearTimeout(failSafe);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[var(--charcoal)]/85 text-[var(--off-white)] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center" aria-label="Home">
            <BrandLogo
              variant="compact"
              alt=""
              className="h-8 w-[7.06rem] sm:h-9 sm:w-[7.94rem]"
              loading="eager"
              fetchPriority="high"
              sizes="127px"
            />
          </Link>
          <nav className="brand-label hidden items-center gap-6 text-[10px] text-[var(--off-white)]/55 sm:flex">
            {(
              [
                ["#foundation", "Foundation"],
                ["#logos", "Logos"],
                ["#color", "Color"],
                ["#type", "Type"],
                ["#voice", "Voice"],
                ["#usage", "Usage"],
              ] as const
            ).map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="transition hover:text-[var(--gold)]"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--line)] pt-16">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 75% 55% at 72% 18%, color-mix(in srgb, var(--gold) 16%, transparent), transparent 58%), linear-gradient(165deg, var(--charcoal-soft) 0%, var(--charcoal) 52%, #111111 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          aria-hidden
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "180px 180px",
          }}
        />

        <div className="relative mx-auto grid min-h-[88vh] max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
          <div className="brand-hero-copy">
            <p className="brand-label text-[11px] text-[var(--gold)]">
              Official Brand Guide
            </p>
            <div className="brand-hero-rule mt-5 h-[3px] w-16 bg-[var(--gold)]" />
            <h1 className="brand-display mt-7 text-6xl leading-[0.9] text-[var(--off-white)] sm:text-7xl md:text-8xl">
              The Blue Collar
              <span className="mt-1 block text-[var(--gold)]">Video Guys™</span>
            </h1>
            <p className="brand-label mt-6 text-sm text-[var(--off-white)]/70">
              Build Trust. Stand Out. Win More Work.
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--off-white)]/55">
              Media Team for the Trades. Built for the businesses that build
              America.
            </p>
          </div>

          <div className="brand-hero-logo flex items-center justify-center lg:justify-end">
            <BrandLogo
              variant="circular"
              className="w-56 sm:w-72 lg:w-80"
              loading="eager"
              fetchPriority="high"
              sizes="320px"
            />
          </div>
        </div>
      </section>

      {/* Foundation */}
      <section
        id="foundation"
        className="scroll-mt-20 border-b border-[var(--line)] bg-[var(--charcoal)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-3xl">
            <SectionEyebrow>01 — Brand Foundation</SectionEyebrow>
            <h2 className="brand-display text-5xl text-[var(--off-white)] sm:text-6xl">
              Built for the businesses that build America.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[var(--off-white)]/60 sm:text-lg">
              The Blue Collar Video Guys is a video marketing and growth brand
              built specifically for the trades. We help established blue-collar
              businesses turn the reputation they have already earned into
              visible trust, stronger differentiation, and more opportunities.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3">
            {[
              {
                k: "Brand Promise",
                v: "We do not create content just to get views. We create video marketing that builds trust, strengthens reputations, and helps blue-collar businesses grow.",
              },
              {
                k: "Primary Tagline",
                v: "Build Trust. Stand Out. Win More Work.",
              },
              {
                k: "Descriptor",
                v: "Media Team for the Trades",
              },
            ].map((item, i) => (
              <div
                key={item.k}
                className="brand-reveal bg-[var(--charcoal-soft)] p-7 sm:p-8"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <p className="brand-label text-[10px] text-[var(--gold)]">
                  {item.k}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--off-white)]/75">
                  {item.v}
                </p>
              </div>
            ))}
          </div>

          <div className="brand-reveal mt-10 border border-[var(--line)] bg-[var(--charcoal-soft)] p-8 sm:p-10">
            <SectionEyebrow>02 — Positioning</SectionEyebrow>
            <h3 className="brand-display text-3xl text-[var(--off-white)] sm:text-4xl">
              We help blue-collar businesses become the company people trust
              before they ever call.
            </h3>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--off-white)]/55">
              Our position is not &quot;another video production company.&quot; We
              are the strategic media and marketing partner for companies whose
              reputation, craftsmanship, people, and proof deserve to be seen.
              The camera is a tool. Trust is the product.
            </p>
          </div>
        </div>
      </section>

      {/* Blueprint + Trust Framework */}
      <section className="border-b border-[var(--line-on-light)] bg-[var(--off-white)] py-20 text-[var(--charcoal)] sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-2xl">
            <span className="brand-label mb-4 block text-[11px] text-[var(--gold)]">
              03 — The Blue Collar Blueprint™
            </span>
            <h2 className="brand-display text-5xl text-[var(--charcoal)] sm:text-6xl">
              Build Trust. Stand Out. Win More Work.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {BLUEPRINT.map((item, i) => (
              <article
                key={item.title}
                className="brand-reveal border border-[var(--line-on-light)] bg-white p-7 sm:p-8"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="brand-label text-[10px] text-[var(--gold)]">
                  0{i + 1}
                </p>
                <h3 className="brand-display mt-3 text-3xl text-[var(--charcoal)]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--charcoal)]/65">
                  {item.body}
                </p>
              </article>
            ))}
          </div>

          <div className="brand-reveal mt-10 border border-[var(--charcoal)] bg-[var(--charcoal)] p-8 text-[var(--off-white)] sm:p-10">
            <span className="brand-label mb-4 block text-[11px] text-[var(--gold)]">
              04 — The Trust Framework™
            </span>
            <p className="brand-display text-3xl sm:text-4xl">
              Build Trust → Stand Out → Win More Work
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--off-white)]/60 sm:text-base">
              The Trust Framework™ is the core philosophy that powers the Blue
              Collar Blueprint™. Every video, testimonial, website, social post,
              photograph, campaign, and sales asset should help move the client
              through these three outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section
        id="logos"
        className="scroll-mt-20 border-b border-[var(--line)] bg-[var(--charcoal)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-2xl">
            <SectionEyebrow>05 — Logo System</SectionEyebrow>
            <h2 className="brand-display text-5xl text-[var(--off-white)] sm:text-6xl">
              Lockups that carry the crew
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--off-white)]/55">
              The BC monogram, play symbol, roof form, proportions, and
              solid-border treatment stay consistent across applications. Icon
              marks, submarks, and badges use clean, continuous solid borders.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LOGO_VARIANTS.map((item, i) => (
              <article
                key={item.variant}
                className="brand-reveal brand-logo-tile overflow-hidden border border-[var(--line)]"
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                <div className="flex min-h-[11rem] items-center justify-center bg-black px-8 py-10">
                  <BrandLogo
                    variant={item.variant}
                    className={
                      item.variant === "stacked" ||
                      item.variant === "circular" ||
                      item.variant === "crest" ||
                      item.variant === "icon"
                        ? "h-28 w-auto max-w-full"
                        : "h-12 w-auto max-w-full sm:h-14"
                    }
                    sizes="280px"
                  />
                </div>
                <div className="border-t border-[var(--line)] bg-[var(--charcoal-soft)] px-5 py-4">
                  <h3 className="brand-display text-xl text-[var(--off-white)]">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--off-white)]/50">
                    {item.use}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Color */}
      <section
        id="color"
        className="scroll-mt-20 border-b border-[var(--line)] bg-[var(--charcoal)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-2xl">
            <SectionEyebrow>06 — Color Palette</SectionEyebrow>
            <h2 className="brand-display text-5xl text-[var(--off-white)] sm:text-6xl">
              Three colors. Full force.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--off-white)]/55">
              Charcoal for authority. Off white for lettering. Gold for emphasis,
              never decoration.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {COLORS.map((c, i) => (
              <article
                key={c.hex}
                className="brand-reveal brand-swatch overflow-hidden border border-[var(--line)]"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <div
                  className="flex h-40 items-end px-5 pb-4"
                  style={{ background: c.hex }}
                >
                  <span
                    className={`font-mono text-sm font-medium tracking-wide ${
                      c.on === "light"
                        ? "text-[var(--off-white)]"
                        : "text-[var(--charcoal)]"
                    }`}
                  >
                    {c.hex}
                  </span>
                </div>
                <div className="bg-[var(--charcoal-soft)] px-5 py-5">
                  <h3 className="brand-display text-2xl text-[var(--off-white)]">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--off-white)]/50">
                    {c.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section
        id="type"
        className="scroll-mt-20 border-b border-[var(--line-on-light)] bg-[var(--off-white)] py-20 text-[var(--charcoal)] sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-2xl">
            <span className="brand-label mb-4 block text-[11px] text-[var(--gold)]">
              07 — Typography
            </span>
            <h2 className="brand-display text-5xl text-[var(--charcoal)] sm:text-6xl">
              Condensed. Direct. Industrial.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--charcoal)]/60">
              Primary display is Bebas Neue. Supporting labels use Bebas Neue
              with increased tracking. Long paragraphs use a clean neutral sans.
              The BC monogram is custom artwork, never typed text.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="brand-reveal border border-[var(--line-on-light)] bg-white p-8 sm:p-10">
              <p className="brand-label text-[10px] text-[var(--gold)]">
                Primary Display · Bebas Neue
              </p>
              <p className="brand-display mt-6 text-5xl leading-[0.92] text-[var(--charcoal)] sm:text-6xl">
                Build Trust.
                <br />
                Stand Out.
                <br />
                <span className="text-[var(--gold)]">Win More Work.</span>
              </p>
              <p className="mt-8 text-sm text-[var(--charcoal)]/55">
                Large headlines, campaign statements, key website headings,
                signage-style graphics
              </p>
            </div>

            <div className="brand-reveal border border-[var(--line-on-light)] bg-white p-8 sm:p-10">
              <p className="brand-label text-[10px] text-[var(--gold)]">
                Supporting · Bebas Neue · Tracked
              </p>
              <p className="brand-label mt-6 text-xl text-[var(--charcoal)] sm:text-2xl">
                Media Team for the Trades
              </p>
              <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--gold)]">
                Body · Neutral Sans
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--charcoal)]/70">
                You&apos;ve spent years earning your reputation. Our job is to
                make sure more people see it. Through the Blue Collar Blueprint™
                and our Trust Framework™, we create authentic video marketing
                that helps blue-collar businesses grow.
              </p>
              <p className="mt-8 text-sm text-[var(--charcoal)]/55">
                Bold, condensed, legible, confident, premium, hardworking. Avoid
                decorative scripts, playful rounded fonts, tech-startup futurism,
                or distressed novelty fonts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voice + Messaging */}
      <section
        id="voice"
        className="scroll-mt-20 border-b border-[var(--line)] bg-[var(--charcoal)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-2xl">
            <SectionEyebrow>08 — Brand Voice</SectionEyebrow>
            <h2 className="brand-display text-5xl text-[var(--off-white)] sm:text-6xl">
              A capable growth partner
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--off-white)]/55">
              Direct, confident, practical, grounded, and clear. Speak to
              business outcomes and reputation before cameras and gear.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="brand-reveal border border-[var(--line)] bg-[var(--charcoal-soft)] p-8">
              <h3 className="brand-display text-3xl text-[var(--gold)]">Use</h3>
              <ul className="mt-6 space-y-4">
                {VOICE_USE.map((line) => (
                  <li
                    key={line}
                    className="border-l-2 border-[var(--gold)] pl-4 text-sm leading-relaxed text-[var(--off-white)]/80"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="brand-reveal border border-[var(--line)] bg-[var(--charcoal-soft)] p-8">
              <h3 className="brand-display text-3xl text-[var(--off-white)]/70">
                Avoid
              </h3>
              <ul className="mt-6 space-y-4">
                {VOICE_AVOID.map((line) => (
                  <li
                    key={line}
                    className="border-l-2 border-[var(--off-white)]/20 pl-4 text-sm leading-relaxed text-[var(--off-white)]/45"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="brand-reveal mt-10 border border-[var(--line)] bg-black px-8 py-10 sm:px-12">
            <p className="brand-label text-[11px] text-[var(--gold)]">
              11 — Core Messaging
            </p>
            <ul className="mt-7 space-y-5">
              {MESSAGING.map((line) => (
                <li
                  key={line}
                  className="brand-display text-2xl text-[var(--off-white)] sm:text-3xl"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="brand-reveal mt-6 border border-[var(--gold)]/40 bg-[var(--charcoal-soft)] p-8 sm:p-10">
            <p className="brand-label text-[11px] text-[var(--gold)]">
              12 — Elevator Pitch
            </p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--off-white)]/75 sm:text-lg">
              You&apos;ve spent years earning your reputation. Our job is to make
              sure more people see it. Through the Blue Collar Blueprint™ and our
              Trust Framework™, we create authentic video marketing that helps
              blue-collar businesses build trust, stand out from the competition,
              and win more work.
            </p>
          </div>
        </div>
      </section>

      {/* Visual + Applications + Usage */}
      <section
        id="usage"
        className="scroll-mt-20 border-b border-[var(--line)] bg-[var(--charcoal)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-2xl">
            <SectionEyebrow>09 — Photography & Video</SectionEyebrow>
            <h2 className="brand-display text-5xl text-[var(--off-white)] sm:text-6xl">
              Real work. Real proof.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-[var(--off-white)]/55">
              Show real people, real environments, and real proof. Favor
              cinematic but believable imagery: job sites, crews, equipment,
              craftsmanship, owners, customers, before/after progress. Lighting
              may be dramatic, but the story should never feel fake.
            </p>
            <p className="brand-label mt-6 text-[11px] text-[var(--gold)]">
              Premium · Rugged · Honest · American · Modern · Intentional · Strong
              · Understated
            </p>
          </div>

          <div className="brand-reveal mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Website",
                d: "Clean dark backgrounds, large condensed headlines, strong proof, clear CTAs",
              },
              {
                t: "Social",
                d: "Recognizable BC icon, strong headline hierarchy, gold as accent",
              },
              {
                t: "Apparel",
                d: "Icon and badge marks that embroider cleanly; preserve solid borders",
              },
              {
                t: "Proposals",
                d: "Premium, clean, confident. Look like the company a successful contractor hires",
              },
            ].map((item) => (
              <div
                key={item.t}
                className="border border-[var(--line)] bg-[var(--charcoal-soft)] p-6"
              >
                <h3 className="brand-display text-xl text-[var(--off-white)]">
                  {item.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--off-white)]/50">
                  {item.d}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="brand-reveal">
              <h3 className="brand-display text-3xl text-[var(--gold)]">Do</h3>
              <ul className="mt-6 space-y-4">
                {DO.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-[var(--off-white)]/75"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="brand-reveal">
              <h3 className="brand-display text-3xl text-[var(--off-white)]/70">
                Don&apos;t
              </h3>
              <ul className="mt-6 space-y-4">
                {DONT.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-[var(--off-white)]/45"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--off-white)]/25"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* North Star close */}
      <section className="relative overflow-hidden bg-[var(--charcoal)] py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 100%, color-mix(in srgb, var(--gold) 20%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <div className="brand-reveal">
            <p className="brand-label text-[11px] text-[var(--gold)]">
              13 — North Star
            </p>
            <p className="brand-display mt-6 text-4xl text-[var(--off-white)] sm:text-5xl md:text-6xl">
              Does this help the client
              <span className="mt-2 block text-[var(--gold)]">
                Build Trust, Stand Out, or Win More Work?
              </span>
            </p>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[var(--off-white)]/50">
              If it does, it belongs in the Blue Collar system. If it only looks
              cool but does not strengthen trust, differentiation, or business
              outcomes, it is not enough.
            </p>
            <BrandLogo
              variant="primary"
              className="mx-auto mt-12 h-12 w-auto sm:h-14"
              sizes="280px"
            />
            <div className="mt-8 flex flex-col items-center gap-3 text-sm text-[var(--off-white)]/50 sm:flex-row sm:justify-center sm:gap-8">
              <a
                href="mailto:build@bluecollarvideoguys.com"
                className="transition hover:text-[var(--gold)]"
              >
                build@bluecollarvideoguys.com
              </a>
              <a
                href={PHONE_HREF}
                className="transition hover:text-[var(--gold)]"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
            <p className="brand-label mt-10 text-[10px] text-[var(--off-white)]/30">
              The Blue Collar Video Guys™ · Official Brand Guide
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
