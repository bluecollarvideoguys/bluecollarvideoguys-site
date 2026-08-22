"use client";

import Link from "next/link";
import { useState } from "react";
import { IconArrowRight } from "@/components/icons";
import { CALENDLY_URL } from "@/lib/calendly";
import { SiteFooter } from "@/components/SiteFooter";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
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

export function ConfirmationPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SiteFooter className="bg-[var(--v02-navy-deep)] text-[var(--v02-ink)] antialiased">
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
                className="transition hover:text-[var(--v02-gold)]"
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
        <section className="v02-lift-cap min-h-[70vh] border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] pt-32 pb-24 sm:pt-40 sm:pb-32">
          <div className="mx-auto max-w-2xl px-5 text-center sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">
              Confirmation
            </p>
            <h1 className="mt-3 v02-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              THANK YOU FOR SUBMITTING
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
              We received your message and will reply within one business day.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--v02-gold)] px-7 py-4 text-base font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)]"
              >
                Back to Home
                <IconArrowRight />
              </Link>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--v02-line-on-dark)] px-7 py-4 text-base font-semibold text-white transition hover:border-[var(--v02-gold)] hover:text-[var(--v02-gold)]"
              >
                Book a Discovery Call
              </a>
            </div>
          </div>
        </section>
      </main>
    </SiteFooter>
  );
}
