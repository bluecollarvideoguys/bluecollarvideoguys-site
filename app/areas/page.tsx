import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { IconArrowRight } from "@/components/icons";
import { AREAS } from "@/content/areas";
import { CALENDLY_URL } from "@/lib/calendly";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Service Area: Redding and the North State | BCVG",
  description:
    "Video production and marketing for contractors in Redding, Anderson, Shasta Lake, Red Bluff, Corning, and Mount Shasta. Book a free Blueprint call.",
  path: "/areas",
  absoluteTitle: true,
});

export default function AreasPage() {
  return (
    <SiteFooter className="bg-[var(--v02-navy-deep)] text-[var(--v02-ink)] antialiased">
      <SiteNav />
      <main>
        <section className="border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] pt-28 pb-20 sm:pt-32 sm:pb-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Service Area", path: "/areas" },
              ]}
            />
            <div className="mt-8 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">
                Based in Redding, CA
              </p>
              <h1 className="mt-3 v02-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Contractor Video Production in Redding and the North State
              </h1>
              <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
                We are based in Redding and film for contractors and trades
                businesses within about an hour in every direction, from Mount
                Shasta down to Corning. Larger projects across Northern
                California and Southern Oregon are welcome too.
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
          </div>
        </section>

        <section className="v02-lift-cap border-t border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <h2 className="v02-display text-3xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-4xl">
              Cities we serve
            </h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {AREAS.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}`}
                    className="group block h-full rounded-2xl border border-[var(--v02-line)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[var(--v02-gold)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">
                      {a.county} · {a.driveTime}
                    </p>
                    <h3 className="mt-2 v02-display text-2xl font-bold text-[var(--v02-ink)]">
                      Video production in {a.city}, {a.state}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-slate-600">
                      {a.intro.split(". ")[0]}.
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--v02-gold-deep)]">
                      See {a.city} <IconArrowRight />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </SiteFooter>
  );
}
