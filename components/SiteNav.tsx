"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SiteBrandLink } from "@/components/BrandLogo";
import { CALENDLY_URL } from "@/lib/calendly";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** Shared top navigation for new pages (matches the v02 page navs). */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
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
              className={`transition hover:text-[var(--v02-gold)] ${isActive(v.href) ? "text-[var(--v02-gold)]" : ""}`}
              aria-current={isActive(v.href) ? "page" : undefined}
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
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="text-2xl text-white lg:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="1.25em" height="1.25em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {open ? (
        <div className="border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium">
            {NAV.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className={isActive(v.href) ? "text-[var(--v02-gold)]" : ""}
                onClick={() => setOpen(false)}
              >
                {v.label}
              </Link>
            ))}
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="mt-2 font-semibold text-[var(--v02-gold)]">
              Book a Discovery Call
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
