import type { Metadata } from "next";
import Link from "next/link";
import { CALENDLY_URL } from "@/lib/calendly";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Contractor marketing services" },
  { href: "/services#packages", label: "Blueprint packages" },
  { href: "/contact", label: "Contact us" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--denim-deep)] px-6 py-24 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold uppercase tracking-wide sm:text-6xl">
        This page went off the job site
      </h1>
      <p className="mt-6 max-w-xl text-base text-white/75 sm:text-lg">
        The page you were looking for moved or never existed. Here is where to
        go next.
      </p>
      <nav aria-label="Helpful links" className="mt-10 flex flex-wrap justify-center gap-3">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-medium transition hover:border-white hover:bg-white/10"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-8 rounded-full bg-[var(--rust)] px-7 py-4 text-base font-semibold text-white transition hover:bg-[var(--rust-hover)]"
      >
        Book a Discovery Call
      </a>
    </main>
  );
}
