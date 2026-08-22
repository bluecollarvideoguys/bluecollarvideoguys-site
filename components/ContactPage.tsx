"use client";

import Link from "next/link";
import { useState } from "react";
import { IconArrowRight } from "@/components/icons";
import { CALENDLY_URL } from "@/lib/calendly";
import { SiteFooter } from "@/components/SiteFooter";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
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

function IconSend({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M4 12l16-8-6 16-2-6-8-2z" strokeLinejoin="round" />
    </svg>
  );
}

export function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SiteFooter className="bg-[var(--v02-navy)] text-[var(--v02-ink)] antialiased">
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

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded bg-[var(--v02-gold)] px-5 py-2.5 text-sm font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)] lg:inline-flex"
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
                Coker, two filmmakers with nearly a decade of hands-on experience
                telling brands&apos; stories on camera. That experience runs deep
                in brand messaging videos and the digital marketing strategy to
                get them seen.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                The name says it all: we bring a blue-collar work ethic to video
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

        <section className="border-t border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-24">
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
                className="mt-8 inline-flex items-center gap-2 rounded bg-[var(--v02-gold)] px-7 py-4 text-base font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)]"
              >
                Book a Discovery Call
                <IconArrowRight />
              </a>
            </div>

            <div className="mx-auto mt-12 max-w-2xl">
              <form
                id="form"
                action="https://formsubmit.co/build@bluecollarvideoguys.com"
                method="POST"
                className="rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-ink)] p-6 sm:p-8"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value="Contact page — new inquiry"
                />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input
                  type="hidden"
                  name="_next"
                  value="https://www.bluecollarvideoguys.com/contact"
                />

                <h3 className="v02-display text-2xl font-bold tracking-tight text-white">
                  Tell us about your business
                </h3>

                <div className="mt-8 space-y-5">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Company name<span className="text-[var(--v02-gold)]"> *</span>
                    </span>
                    <input
                      id="company_name"
                      type="text"
                      name="company_name"
                      required
                      autoComplete="organization"
                      className="mt-2 w-full rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
                      placeholder="Your company or brand"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Email address<span className="text-[var(--v02-gold)]"> *</span>
                    </span>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="mt-2 w-full rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
                      placeholder="you@company.com"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Phone number<span className="text-[var(--v02-gold)]"> *</span>
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      required
                      autoComplete="tel"
                      className="mt-2 w-full rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
                      placeholder="(555) 555-5555"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Website or social URL
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      Company site, Instagram, LinkedIn, or other profile link
                    </span>
                    <input
                      id="website_or_social"
                      type="text"
                      name="website"
                      inputMode="url"
                      autoComplete="url"
                      className="mt-2 w-full rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
                      placeholder="https://… or social profile URL"
                    />
                  </label>
                </div>

                <div className="mt-8 space-y-5">
                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      What is your primary marketing goal?
                    </span>
                    <textarea
                      id="primary_marketing_goal"
                      name="marketing_goal"
                      rows={3}
                      className="mt-2 w-full resize-none rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
                      placeholder="e.g. more qualified leads, launch a new offer, grow local awareness…"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      Who is your target audience?
                    </span>
                    <textarea
                      id="target_audience"
                      name="target_audience"
                      rows={3}
                      className="mt-2 w-full resize-none rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
                      placeholder="Demographics, geography, interests, or ideal customer…"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      What does your business sell or offer?
                    </span>
                    <textarea
                      id="business_offer"
                      name="business_offer"
                      rows={3}
                      className="mt-2 w-full resize-none rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
                      placeholder="Electrical, HVAC, plumbing, roofing, or other trade work…"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                      What is your monthly marketing budget?
                    </span>
                    <select
                      id="marketing_budget"
                      name="monthly_budget"
                      defaultValue=""
                      className="mt-2 w-full rounded border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--v02-gold)]"
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      <option value="Under $5,000 / month">
                        Under $5,000 / month
                      </option>
                      <option value="$5,000 – $10,000 / month">
                        $5,000 – $10,000 / month
                      </option>
                      <option value="$10,000 – $15,000 / month">
                        $10,000 – $15,000 / month
                      </option>
                      <option value="$15,000 – $25,000 / month">
                        $15,000 – $25,000 / month
                      </option>
                      <option value="$25,000+ / month">$25,000+ / month</option>
                      <option value="Prefer to discuss">Prefer to discuss</option>
                    </select>
                  </label>
                </div>

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
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded bg-[var(--v02-gold)] px-6 py-4 text-base font-semibold text-[var(--v02-ink)] transition hover:bg-[var(--v02-gold-hot)]"
                >
                  Let&apos;s connect
                  <IconSend className="text-xl" />
                </button>
                <p className="mt-4 text-center text-xs text-slate-500">
                  We respond within one business day.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
    </SiteFooter>
  );
}
