"use client";

import Link from "next/link";
import { useState } from "react";
import { SiteBrandLink } from "@/components/BrandLogo";
import { SiteFooter } from "@/components/SiteFooter";
import { CALENDLY_URL } from "@/lib/calendly";
import { PHONE_DISPLAY, SUPPORT_EMAIL } from "@/lib/contact";

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

const heading =
  "v02-display text-2xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-3xl";
const paragraph = "mt-4 text-base leading-relaxed text-slate-600";
const bullets = "mt-4 space-y-2 text-base leading-relaxed text-slate-600";

function MailLink() {
  return (
    <a
      href={`mailto:${SUPPORT_EMAIL}`}
      className="font-medium text-[var(--v02-gold-deep)] underline underline-offset-2 transition hover:text-[var(--v02-ink)]"
    >
      {SUPPORT_EMAIL}
    </a>
  );
}

export function PrivacyPage() {
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
        <section className="border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">
              Legal
            </p>
            <h1 className="mt-3 v02-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              MESSAGING PRIVACY POLICY
            </h1>
            <p className="mt-6 text-base leading-relaxed text-slate-300">
              Blue Collar Video Guys (&quot;we,&quot; &quot;us,&quot;
              &quot;our&quot;) respects your privacy and is committed to
              protecting your personal information. This Privacy Policy explains
              how Blue Collar Video Guys collects and uses information about you
              when you opt-in to receive SMS messages from us.
            </p>
          </div>
        </section>

        <section className="v02-lift-cap border-t border-[var(--v02-line)] bg-[var(--v02-paper)] py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
            <h2 className={heading}>Data We Collect</h2>
            <p className={paragraph}>
              When you opt-in to receive SMS messages, we collect:
            </p>
            <ul className={`${bullets} list-disc pl-5`}>
              <li>Your name</li>
              <li>Your phone number</li>
              <li>Consent to send SMS messages</li>
            </ul>
            <p className={paragraph}>
              When you submit a form on this website, we also collect your email
              address and the business details you choose to share with us, such
              as your company name, website, marketing goals, and budget range.
            </p>

            <h2 className={`${heading} mt-12`}>How We Use Your Data</h2>
            <p className={paragraph}>We use your information to:</p>
            <ul className={`${bullets} list-disc pl-5`}>
              <li>Operate our business</li>
              <li>Send you the SMS messages you&apos;ve opted in to receive</li>
            </ul>
            <p className={paragraph}>
              On our website forms you can opt in to customer care messages,
              marketing text messages, both, or decline texts entirely. We only
              send the SMS content you explicitly choose. Consent is not a
              condition of purchase. You can withdraw SMS consent at any time by
              texting STOP, or contact us at <MailLink />.
            </p>

            <h2 className={`${heading} mt-12`}>Data Sharing</h2>
            <ul className={`${bullets} list-disc pl-5`}>
              <li>
                Customer data is not shared with 3rd parties for promotional or
                marketing purposes.
              </li>
              <li>
                Mobile opt-in and consent are never shared with anyone for any
                purpose. Any information sharing that may be mentioned elsewhere
                in this policy excludes mobile opt-in data.
              </li>
            </ul>

            <h2 className={`${heading} mt-12`}>
              Messaging Program Terms and Conditions
            </h2>
            <ol className="mt-4 list-decimal space-y-4 pl-5 text-base leading-relaxed text-slate-600">
              <li>
                The messaging program may consist of general customer care
                messaging to answer questions and provide support to customers,
                and/or marketing messaging that include discount codes, special
                deals or texts promoting our products/services, depending on
                which programs(s) you opt in to. We will only send content you
                have explicitly signed up to receive via our opt-in process.
                Messages will be sent from {PHONE_DISPLAY}.
              </li>
              <li>
                You can cancel the SMS service at any time. Just text
                &apos;STOP&apos; to the phone number from which you received
                messages. After you send the SMS message &apos;STOP&apos; to us,
                we will send you an SMS message to confirm that you have been
                unsubscribed. After this, you will no longer receive SMS
                messages from us. If you want to join again, just sign up as you
                did the first time and we will start sending SMS messages to you
                again.
              </li>
              <li>
                If you are experiencing issues with the messaging program you
                can reply with the keyword HELP for more assistance, or you can
                get help directly at <MailLink />.
              </li>
              <li>Carriers are not liable for delayed or undelivered messages.</li>
              <li>
                As always, message and data rates may apply for any messages sent
                to you from us and to us from you. Message frequency will vary
                based on communication needs. If you have any questions about
                your text plan or data plan, it is best to contact your wireless
                provider.
              </li>
              <li>
                If you have any questions regarding privacy, please read our
                privacy policy details contained in the rest of this page or
                contact us at <MailLink />
              </li>
            </ol>

            <div className="mt-14 border-t border-[var(--v02-line)] pt-8">
              <p className="text-sm leading-relaxed text-slate-500">
                Questions about this policy? Contact us at <MailLink /> or call{" "}
                {PHONE_DISPLAY}.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--v02-gold)] px-6 py-3 text-sm font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)]"
              >
                Back to Contact
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteFooter>
  );
}
