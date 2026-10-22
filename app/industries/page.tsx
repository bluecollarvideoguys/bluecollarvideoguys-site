import Link from "next/link";
import { PageShell, Section } from "@/components/PageShell";
import { IconArrowRight } from "@/components/icons";
import { INDUSTRIES } from "@/content/industries";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Marketing for the Trades | Blue Collar Video Guys",
  description:
    "Video and marketing built for roofers, HVAC, plumbers, electricians, concrete crews, landscapers, and builders in Redding and the North State. Book a call.",
  path: "/industries",
  absoluteTitle: true,
});

export default function IndustriesPage() {
  return (
    <PageShell
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Industries", path: "/industries" },
      ]}
      eyebrow="Industries we serve"
      h1="Marketing and Video Built for the Trades"
      intro="We only work with trades businesses. Every trade earns trust a little differently, so each page below covers the customer worries and the videos that work best for that kind of work."
    >
      <Section title="Choose your trade">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((i) => (
            <li key={i.slug}>
              <Link
                href={`/industries/${i.slug}`}
                className="block h-full rounded-2xl border border-[var(--v02-line)] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[var(--v02-gold)]"
              >
                <h3 className="v02-display text-2xl font-bold text-[var(--v02-ink)]">{i.trade} marketing</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{i.intro.split(". ")[0]}.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--v02-gold-deep)]">
                  See {i.trade.toLowerCase()} <IconArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </PageShell>
  );
}
