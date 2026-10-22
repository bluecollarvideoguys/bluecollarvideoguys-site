import Link from "next/link";
import type { ReactNode } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { IconArrowRight } from "@/components/icons";
import { CALENDLY_URL } from "@/lib/calendly";

type Crumb = { name: string; path: string };

/** Standard SEO page: nav, hero with breadcrumbs + H1, body sections, footer. */
export function PageShell({
  crumbs,
  eyebrow,
  h1,
  intro,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  h1: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <SiteFooter className="bg-[var(--v02-navy-deep)] text-[var(--v02-ink)] antialiased">
      <SiteNav />
      <main>
        <section className="border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] pt-28 pb-20 sm:pt-32 sm:pb-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <Breadcrumbs items={crumbs} />
            <div className="mt-8 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">
                {eyebrow}
              </p>
              <h1 className="mt-3 v02-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                {h1}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
                {intro}
              </p>
              <CallButton className="mt-8" />
            </div>
          </div>
        </section>
        <div className="v02-lift-cap">{children}</div>
      </main>
    </SiteFooter>
  );
}

export function CallButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-[var(--v02-gold)] px-7 py-4 text-base font-semibold text-[var(--v02-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--v02-gold-hot)] ${className}`}
    >
      Book a Discovery Call
      <IconArrowRight />
    </a>
  );
}

const TONES = {
  paper: "bg-[var(--v02-paper)]",
  white: "bg-white",
} as const;

/** Light content section with an H2. */
export function Section({
  title,
  tone = "paper",
  children,
  narrow = false,
}: {
  title: string;
  tone?: keyof typeof TONES;
  children: ReactNode;
  narrow?: boolean;
}) {
  return (
    <section className={`border-t border-[var(--v02-line)] py-16 sm:py-20 ${TONES[tone]}`}>
      <div className={`mx-auto px-5 sm:px-6 lg:px-8 ${narrow ? "max-w-3xl" : "max-w-7xl"}`}>
        <h2 className="v02-display text-3xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-4xl">
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="max-w-3xl space-y-4 text-base leading-relaxed text-slate-600">{children}</div>;
}

export function CardList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <li key={i.title} className="rounded-2xl border border-[var(--v02-line)] bg-white p-6">
          <h3 className="v02-display text-xl font-bold text-[var(--v02-ink)]">{i.title}</h3>
          <p className="mt-2 text-base leading-relaxed text-slate-600">{i.body}</p>
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-[var(--v02-line)] border-y border-[var(--v02-line)]">
      {faqs.map((f) => (
        <div key={f.q} className="py-6">
          <h3 className="text-lg font-semibold text-[var(--v02-ink)]">{f.q}</h3>
          <p className="mt-2 text-base leading-relaxed text-slate-600">{f.a}</p>
        </div>
      ))}
    </div>
  );
}

/** Dark band of related links with descriptive anchors. */
export function RelatedLinks({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <section className="border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <h2 className="v02-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
        <ul className="mt-8 flex flex-wrap gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-[var(--v02-gold)] hover:text-[var(--v02-gold)]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
