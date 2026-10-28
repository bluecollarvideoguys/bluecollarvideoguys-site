"use client";

import Link from "next/link";
import Script from "next/script";
import { useState } from "react";
import { IconArrowRight } from "@/components/icons";
import { CALENDLY_URL } from "@/lib/calendly";
import { SiteBrandLink } from "@/components/BrandLogo";
import { SiteFooter } from "@/components/SiteFooter";

const CONTACT_FORM_ID = "BsHdWsCK3at42ohrxrlK";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact", active: true },
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

export function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SiteFooter className="bg-[var(--v02-navy-deep)] text-[var(--v02-ink)] antialiased">
      <nav
        className="fixed inset-x-0 top-0 z-50 border-b border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)]/80 text-white backdrop-blur-md"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6 lg:px-8">
          <SiteBrandLink />

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

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-[var(--v02-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)] lg:inline-flex"
          >
            Book a Discovery Call
          </a>

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
        <section
          id="about"
          className="border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] pt-28 pb-20 sm:pt-32 sm:pb-24"
        >
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">
                About us
              </p>
              <h1 className="mt-3 v02-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                BUILT FOR THE TRADES.
              </h1>
              <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
                Blue Collar Video Guys was founded by Anthony Fowler and Kathy
                Coker, two filmmakers with nearly a decade of hands on experience
                telling brands&apos; stories on camera. That experience runs deep
                in brand messaging videos and the digital marketing strategy to
                get them seen.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                The name says it all: we bring a blue collar work ethic to video
                production. Show up, do the job right, and treat every
                client&apos;s business like our own. No jargon, no smoke and
                mirrors. Just honest work and a finished product that actually
                sounds like you.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                Ready to tell your story? Let&apos;s get to work.
              </p>
            </div>
          </div>
        </section>

        <section className="v02-lift-cap border-t border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl border-b border-[var(--v02-line)] pb-12 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">
                Let&apos;s talk
              </p>
              <h2 className="mt-3 v02-display text-4xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-5xl md:text-6xl">
                ONE CALL. ONE BLUEPRINT.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Tell us about your business and we&apos;ll set up a free call to map
                out your Blueprint. No pressure, no obligation.
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--v02-gold)] px-7 py-4 text-base font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)]"
              >
                Book a Discovery Call
                <IconArrowRight />
              </a>
            </div>

            <div className="mx-auto mt-12 max-w-2xl">
              <h3 className="v02-display text-2xl font-bold tracking-tight text-[var(--v02-ink)]">
                Tell us about your business
              </h3>
              <iframe
                src={`https://api.leadconnectorhq.com/widget/form/${CONTACT_FORM_ID}`}
                id={`inline-${CONTACT_FORM_ID}`}
                title="Tell us about your business"
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Contact"
                data-height="1680"
                data-layout-iframe-id={`inline-${CONTACT_FORM_ID}`}
                data-form-id={CONTACT_FORM_ID}
                className="mt-6 w-full border-0"
                style={{ height: 1680 }}
              />
              <Script
                src="https://link.msgsndr.com/js/form_embed.js"
                strategy="afterInteractive"
              />
            </div>
          </div>
        </section>
      </main>
    </SiteFooter>
  );
}
