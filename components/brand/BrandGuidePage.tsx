"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BrandLogo,
  SiteBrandLink,
  type BrandLogoVariant,
} from "@/components/BrandLogo";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/contact";

/** Live site / home page palette (v02) */
const COLORS = [
  {
    name: "Navy Deep",
    hex: "#0D1520",
    role: "Page shell, footer, darkest ground",
    on: "light" as const,
  },
  {
    name: "Navy",
    hex: "#111A26",
    role: "Primary dark surfaces and headers",
    on: "light" as const,
  },
  {
    name: "Ink",
    hex: "#16202D",
    role: "Body text on paper, headlines",
    on: "light" as const,
  },
  {
    name: "Paper",
    hex: "#F5F5F2",
    role: "Light sections, reading surfaces",
    on: "dark" as const,
  },
  {
    name: "Gold",
    hex: "#F2AE26",
    role: "Primary accent, CTAs, VIDEO GUYS",
    on: "dark" as const,
  },
  {
    name: "Gold Hot",
    hex: "#FFC64D",
    role: "Hover states, highlight lift",
    on: "dark" as const,
  },
  {
    name: "Gold Deep",
    hex: "#BD7C00",
    role: "Eyebrows and secondary accent text",
    on: "light" as const,
  },
  {
    name: "Slate",
    hex: "#64748B",
    role: "Supporting copy, metadata",
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
    variant: "compact",
    label: "Compact Horizontal",
    use: "Navigation bars and tight horizontal spaces",
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
  "Prefer navy or paper grounds with gold as accent, not decoration.",
  "Lead with reputation and outcomes before cameras and gear.",
  "Ask: does this help BUILD TRUST, STAND OUT, or WIN MORE WORK?",
];

const MOCKUPS: {
  src: string;
  label: string;
  use: string;
}[] = [
  {
    src: "/brand/mockups/apparel-hat-photo.png",
    label: "Apparel",
    use: "BC house mark embroidered on a black trucker hat — clean at small size, solid borders intact.",
  },
  {
    src: "/brand/mockups/vehicle-truck-photo.png",
    label: "Vehicle Decal",
    use: "Primary horizontal lockup on a black pickup tailgate — high contrast for distance legibility.",
  },
  {
    src: "/brand/mockups/social-profile-photo.png",
    label: "Social Profile",
    use: "Circular gold-ring profile mark for avatars, stickers, and platform seals.",
  },
  {
    src: "/brand/mockups/social-banner-photo.png",
    label: "Social Banner",
    use: "Cover treatment with lockup, job-site photography, and Real People. Real Work. Real Results.",
  },
];

/** Matches home page type system */
const type = {
  eyebrowLight:
    "text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]",
  eyebrowDark:
    "text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]",
  titleLight:
    "v02-display text-4xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-5xl",
  titleDark:
    "v02-display text-4xl font-bold tracking-tight text-white sm:text-5xl",
  titleHero:
    "v02-display text-5xl font-bold leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl",
  bodyLight: "text-base leading-relaxed text-slate-600",
  bodyDark: "text-base leading-relaxed text-slate-400",
  bodySmLight: "text-sm leading-relaxed text-slate-600",
  bodySmDark: "text-sm leading-relaxed text-slate-400",
} as const;

export function BrandGuidePage() {
  return (
    <div className="relative">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)]/80 text-white backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <SiteBrandLink />
          <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.14em] text-white/60 sm:flex">
            {(
              [
                ["#foundation", "Foundation"],
                ["#logos", "Logos"],
                ["#mockups", "Mockups"],
                ["#color", "Color"],
                ["#type", "Type"],
                ["#voice", "Voice"],
                ["#usage", "Usage"],
              ] as const
            ).map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="transition hover:text-[var(--v02-gold)]"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="/brand/BCVG-Official-Brand-Guide.pdf"
              download
              className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-white/60 transition hover:text-[var(--v02-gold)] sm:inline"
            >
              Download PDF
            </a>
            <Link
              href="/"
              className="rounded-full bg-[var(--v02-gold)] px-4 py-2 text-xs font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)] sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      {/* Hero — home page language */}
      <section className="relative overflow-hidden border-b border-[var(--v02-line-on-dark)] pt-16">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 20%, color-mix(in srgb, var(--v02-gold) 18%, transparent), transparent 55%), linear-gradient(165deg, var(--v02-navy) 0%, var(--v02-navy-deep) 55%, #0a1018 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04] texture-grain"
          aria-hidden
        />

        <div className="relative mx-auto grid min-h-[88vh] max-w-6xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-24">
          <div className="brand-hero-copy">
            <p className={type.eyebrowDark}>Official Brand Guide</p>
            <div className="brand-hero-rule mt-5 h-1 w-16 bg-[var(--v02-gold)]" />
            <h1 className={`${type.titleHero} mt-7`}>
              THE BLUE COLLAR
              <span className="mt-1 block text-[var(--v02-gold)]">
                VIDEO GUYS™
              </span>
            </h1>
            <p className="mt-6 max-w-md text-base font-semibold tracking-wide text-white/80 sm:text-lg">
              Build Trust. Stand Out. Win More Work.
            </p>
            <p className={`mt-4 max-w-md ${type.bodyDark}`}>
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
        className="scroll-mt-24 border-b border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-3xl">
            <p className={type.eyebrowDark}>01 — Brand Foundation</p>
            <h2 className={`${type.titleDark} mt-4`}>
              Built for the businesses that build America.
            </h2>
            <p className={`mt-6 ${type.bodyDark}`}>
              The Blue Collar Video Guys is a video marketing and growth brand
              built specifically for the trades. We help established blue-collar
              businesses turn the reputation they have already earned into
              visible trust, stronger differentiation, and more opportunities.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden border border-[var(--v02-line-on-dark)] bg-[var(--v02-line-on-dark)] sm:grid-cols-3">
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
                className="brand-reveal bg-[var(--v02-navy-deep)] p-7 sm:p-8"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <p className={type.eyebrowDark}>{item.k}</p>
                <p className={`mt-3 ${type.bodySmDark}`}>{item.v}</p>
              </div>
            ))}
          </div>

          <div className="brand-reveal mt-10 border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy-deep)] p-8 sm:p-10">
            <p className={type.eyebrowDark}>02 — Positioning</p>
            <h3 className="v02-display mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
              We help blue-collar businesses become the company people trust
              before they ever call.
            </h3>
            <p className={`mt-5 max-w-3xl ${type.bodyDark}`}>
              Our position is not &quot;another video production company.&quot; We
              are the strategic media and marketing partner for companies whose
              reputation, craftsmanship, people, and proof deserve to be seen.
              The camera is a tool. Trust is the product.
            </p>
          </div>
        </div>
      </section>

      {/* Blueprint on paper like home */}
      <section className="border-b border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-2xl">
            <p className={type.eyebrowLight}>
              03 — The Blue Collar Blueprint™
            </p>
            <h2 className={`${type.titleLight} mt-4`}>
              Build Trust. Stand Out. Win More Work.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {BLUEPRINT.map((item, i) => (
              <article
                key={item.title}
                className="brand-reveal border-t-2 border-[var(--v02-gold)] bg-white/60 pt-8"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="v02-display text-4xl font-bold tracking-tight text-[var(--v02-gold)]">
                  0{i + 1}
                </p>
                <h3 className="v02-display mt-3 text-2xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-3xl">
                  {item.title}
                </h3>
                <p className={`mt-4 ${type.bodySmLight}`}>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="brand-reveal mt-12 border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] p-8 text-white sm:p-10">
            <p className={type.eyebrowDark}>04 — The Trust Framework™</p>
            <p className="v02-display mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
              Build Trust{" "}
              <span className="text-[var(--v02-gold)]">→</span> Stand Out{" "}
              <span className="text-[var(--v02-gold)]">→</span> Win More Work
            </p>
            <p className={`mt-5 max-w-3xl ${type.bodyDark}`}>
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
        className="scroll-mt-24 border-b border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-2xl">
            <p className={type.eyebrowDark}>05 — Logo System</p>
            <h2 className={`${type.titleDark} mt-4`}>
              Lockups that carry the crew
            </h2>
            <p className={`mt-5 ${type.bodyDark}`}>
              The BC monogram, play symbol, roof form, proportions, and
              solid-border treatment stay consistent across applications. Icon
              marks, submarks, and badges use clean, continuous solid borders.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LOGO_VARIANTS.map((item, i) => (
              <article
                key={item.variant}
                className="brand-reveal brand-logo-tile overflow-hidden border border-[var(--v02-line-on-dark)]"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="flex min-h-[11rem] items-center justify-center bg-[var(--v02-navy-deep)] px-8 py-10">
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
                <div className="border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-5 py-4">
                  <h3 className="v02-display text-lg font-bold tracking-tight text-white">
                    {item.label}
                  </h3>
                  <p className={`mt-1 ${type.bodySmDark}`}>{item.use}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mockups — from original brand board */}
      <section
        id="mockups"
        className="scroll-mt-24 border-b border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-2xl">
            <p className={type.eyebrowLight}>14 — Logo Mockups</p>
            <h2 className={`${type.titleLight} mt-4`}>
              How the mark shows up in the wild
            </h2>
            <p className={`mt-5 ${type.bodyLight}`}>
              Application stills from the original brand board — apparel,
              vehicle, and social — using the current logo system.
            </p>
          </div>

          <div className="brand-reveal mt-14 overflow-hidden border border-[var(--v02-line)] bg-[var(--v02-navy-deep)]">
            <Image
              src="/brand/mockups/applications-strip.png"
              alt="Blue Collar Video Guys logo applications: hat, truck decal, social profile, and social banner"
              width={1535}
              height={230}
              className="h-auto w-full"
              sizes="(max-width: 1152px) 100vw, 1152px"
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {MOCKUPS.map((item, i) => (
              <article
                key={item.src}
                className="brand-reveal brand-logo-tile overflow-hidden border border-[var(--v02-line)] bg-white"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="relative aspect-[16/10] bg-[var(--v02-navy-deep)]">
                  <Image
                    src={item.src}
                    alt={`${item.label} mockup — The Blue Collar Video Guys`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 560px"
                  />
                </div>
                <div className="border-t border-[var(--v02-line)] px-5 py-4">
                  <h3 className="v02-display text-lg font-bold tracking-tight text-[var(--v02-ink)]">
                    {item.label}
                  </h3>
                  <p className={`mt-1 ${type.bodySmLight}`}>{item.use}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Color — home tokens */}
      <section
        id="color"
        className="scroll-mt-24 border-b border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-2xl">
            <p className={type.eyebrowLight}>06 — Color Palette</p>
            <h2 className={`${type.titleLight} mt-4`}>
              Navy grit. Gold signal.
            </h2>
            <p className={`mt-5 ${type.bodyLight}`}>
              Live site tokens. Dark grounds carry authority. Paper carries
              reading. Gold is the job-won moment, never wallpaper.
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COLORS.map((c, i) => (
              <article
                key={c.hex}
                className="brand-reveal brand-swatch overflow-hidden border border-[var(--v02-line)]"
                style={{ transitionDelay: `${i * 45}ms` }}
              >
                <div
                  className="flex h-28 items-end px-4 pb-3"
                  style={{ background: c.hex }}
                >
                  <span
                    className={`font-mono text-xs font-medium tracking-wide ${
                      c.on === "light" ? "text-white/90" : "text-[var(--v02-ink)]"
                    }`}
                  >
                    {c.hex}
                  </span>
                </div>
                <div className="bg-white px-4 py-4">
                  <h3 className="v02-display text-base font-bold tracking-tight text-[var(--v02-ink)]">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {c.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Typography — Barlow + Inter like home */}
      <section
        id="type"
        className="scroll-mt-24 border-b border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-2xl">
            <p className={type.eyebrowDark}>07 — Typography</p>
            <h2 className={`${type.titleDark} mt-4`}>
              Condensed power. Clean body.
            </h2>
            <p className={`mt-5 ${type.bodyDark}`}>
              Display headlines use Barlow Condensed. Body and UI use Inter.
              Pair them. Do not mix in a third family. The BC monogram is custom
              artwork, never typed text.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="brand-reveal border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy-deep)] p-8 sm:p-10">
              <p className={type.eyebrowDark}>Display · Barlow Condensed</p>
              <p className="v02-display mt-6 text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl">
                BUILD TRUST.
                <br />
                STAND OUT.
                <br />
                <span className="text-[var(--v02-gold)]">WIN MORE WORK.</span>
              </p>
              <p className={`mt-8 ${type.bodySmDark}`}>
                Weights 500–800 · All-caps headlines · Tight tracking on large
                sizes
              </p>
            </div>

            <div className="brand-reveal border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy-deep)] p-8 sm:p-10">
              <p className={type.eyebrowDark}>Body · Inter</p>
              <p className="mt-6 text-xl font-medium leading-snug text-white sm:text-2xl">
                You&apos;ve spent years earning your reputation. Our job is to
                make sure more people see it.
              </p>
              <p className={`mt-6 ${type.bodyDark}`}>
                Use Inter for paragraphs, forms, navigation, and supporting
                sentences. Keep line length readable. Prefer sentence case for
                body, Title Case for CTAs.
              </p>
              <p className={`mt-8 ${type.bodySmDark}`}>
                Weights 400–600 · Comfortable line height · No decorative italics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voice */}
      <section
        id="voice"
        className="scroll-mt-24 border-b border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-2xl">
            <p className={type.eyebrowLight}>08 — Brand Voice</p>
            <h2 className={`${type.titleLight} mt-4`}>
              A capable growth partner
            </h2>
            <p className={`mt-5 ${type.bodyLight}`}>
              Direct, confident, practical, grounded, and clear. Speak to
              business outcomes and reputation before cameras and gear.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <div className="brand-reveal border border-[var(--v02-line)] bg-white p-8">
              <h3 className="v02-display text-2xl font-bold tracking-tight text-[var(--v02-gold-deep)]">
                Use
              </h3>
              <ul className="mt-6 space-y-4">
                {VOICE_USE.map((line) => (
                  <li
                    key={line}
                    className="border-l-2 border-[var(--v02-gold)] pl-4 text-sm leading-relaxed text-slate-600"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="brand-reveal border border-[var(--v02-line)] bg-white p-8">
              <h3 className="v02-display text-2xl font-bold tracking-tight text-slate-400">
                Avoid
              </h3>
              <ul className="mt-6 space-y-4">
                {VOICE_AVOID.map((line) => (
                  <li
                    key={line}
                    className="border-l-2 border-slate-200 pl-4 text-sm leading-relaxed text-slate-400"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="brand-reveal mt-10 border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy-deep)] px-8 py-10 sm:px-12">
            <p className={type.eyebrowDark}>11 — Core Messaging</p>
            <ul className="mt-7 space-y-5">
              {MESSAGING.map((line) => (
                <li
                  key={line}
                  className="v02-display text-2xl font-bold tracking-tight text-white sm:text-3xl"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="brand-reveal mt-6 border border-[var(--v02-gold)]/35 bg-[var(--v02-navy)] p-8 sm:p-10">
            <p className={type.eyebrowDark}>12 — Elevator Pitch</p>
            <p className={`mt-5 max-w-3xl ${type.bodyDark}`}>
              You&apos;ve spent years earning your reputation. Our job is to make
              sure more people see it. Through the Blue Collar Blueprint™ and our
              Trust Framework™, we create authentic video marketing that helps
              blue-collar businesses build trust, stand out from the competition,
              and win more work.
            </p>
          </div>
        </div>
      </section>

      {/* Usage */}
      <section
        id="usage"
        className="scroll-mt-24 border-b border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="brand-reveal max-w-2xl">
            <p className={type.eyebrowDark}>09 — Photography & Video</p>
            <h2 className={`${type.titleDark} mt-4`}>Real work. Real proof.</h2>
            <p className={`mt-5 ${type.bodyDark}`}>
              Show real people, real environments, and real proof. Favor
              cinematic but believable imagery: job sites, crews, equipment,
              craftsmanship, owners, customers, before/after progress. Lighting
              may be dramatic, but the story should never feel fake.
            </p>
            <p className={`mt-6 ${type.eyebrowDark}`}>
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
                className="border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy-deep)] p-6"
              >
                <h3 className="v02-display text-xl font-bold tracking-tight text-white">
                  {item.t}
                </h3>
                <p className={`mt-2 ${type.bodySmDark}`}>{item.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <div className="brand-reveal">
              <h3 className="v02-display text-2xl font-bold tracking-tight text-[var(--v02-gold)]">
                Do
              </h3>
              <ul className="mt-6 space-y-4">
                {DO.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-slate-300"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--v02-gold)]"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="brand-reveal">
              <h3 className="v02-display text-2xl font-bold tracking-tight text-white/70">
                Don&apos;t
              </h3>
              <ul className="mt-6 space-y-4">
                {DONT.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-slate-500"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-white/25"
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

      {/* North Star — home closing cadence */}
      <section className="relative overflow-hidden bg-[var(--v02-navy-deep)] py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 100%, color-mix(in srgb, var(--v02-gold) 22%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <div className="brand-reveal">
            <p className={type.eyebrowDark}>13 — North Star</p>
            <p className="v02-display mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Does this help the client
              <span className="mt-2 block text-[var(--v02-gold)]">
                Build Trust, Stand Out, or Win More Work?
              </span>
            </p>
            <p className={`mx-auto mt-6 max-w-xl ${type.bodyDark}`}>
              If it does, it belongs in the Blue Collar system. If it only looks
              cool but does not strengthen trust, differentiation, or business
              outcomes, it is not enough.
            </p>
            <BrandLogo
              variant="primary"
              className="mx-auto mt-12 h-12 w-auto sm:h-14"
              sizes="280px"
            />
            <div className="mt-8 flex flex-col items-center gap-3 text-sm text-slate-400 sm:flex-row sm:justify-center sm:gap-8">
              <a
                href="mailto:build@bluecollarvideoguys.com"
                className="transition hover:text-[var(--v02-gold)]"
              >
                build@bluecollarvideoguys.com
              </a>
              <a
                href={PHONE_HREF}
                className="transition hover:text-[var(--v02-gold)]"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
            <Link
              href="/"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-[var(--v02-gold)] px-7 py-3.5 text-sm font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)]"
            >
              Back to Home
            </Link>
            <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
              The Blue Collar Video Guys™ · Brand Guide
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
