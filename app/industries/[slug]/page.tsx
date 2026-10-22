import Link from "next/link";
import { notFound } from "next/navigation";
import { CardList, FaqList, PageShell, Prose, RelatedLinks, Section } from "@/components/PageShell";
import { FAQSchema, ServiceSchema } from "@/components/seo/schemas";
import { AREAS } from "@/content/areas";
import { INDUSTRIES, getIndustry } from "@/content/industries";
import { SERVICES } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props) {
  const i = getIndustry((await params).slug);
  if (!i) return {};
  return buildMetadata({ title: i.title, description: i.metaDescription, path: `/industries/${i.slug}`, absoluteTitle: true });
}

export default async function IndustryPage({ params }: Props) {
  const ind = getIndustry((await params).slug);
  if (!ind) notFound();
  const path = `/industries/${ind.slug}`;

  const links = [
    ...ind.relatedServices.map((slug) => {
      const r = SERVICES.find((x) => x.slug === slug)!;
      return { href: `/services/${r.slug}`, label: r.name };
    }),
    ...INDUSTRIES.filter((x) => x.slug !== ind.slug).map((x) => ({
      href: `/industries/${x.slug}`,
      label: `${x.trade} marketing`,
    })),
  ];

  return (
    <>
      <ServiceSchema
        name={`Marketing and video production for ${ind.people}`}
        serviceType={ind.primaryKeyword}
        description={ind.intro}
        path={path}
      />
      <FAQSchema faqs={ind.faqs} />
      <PageShell
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
          { name: ind.trade, path },
        ]}
        eyebrow={`Marketing for ${ind.people}`}
        h1={ind.h1}
        intro={ind.intro}
      >
        <Section title={`Why ${ind.trade.toLowerCase()} customers hesitate`}>
          <CardList items={ind.hesitations} />
        </Section>
        <Section title={`The videos that work for ${ind.people}`} tone="white">
          <CardList items={ind.videos} />
        </Section>
        <Section title={`Recruiting with video`}>
          <Prose>
            <p>{ind.recruiting}</p>
          </Prose>
        </Section>
        <Section title={`${ind.trade} marketing in Redding and the North State`} tone="white">
          <Prose>
            <p>
              We are based in Redding and work with {ind.people} throughout Shasta, Tehama, and Siskiyou counties.
            </p>
          </Prose>
          <ul className="mt-6 flex flex-wrap gap-3">
            {AREAS.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/areas/${a.slug}`}
                  className="inline-flex rounded-full border border-[var(--v02-line)] bg-[var(--v02-paper)] px-4 py-2 text-sm font-medium text-[var(--v02-ink)] transition hover:border-[var(--v02-gold)]"
                >
                  {a.city}, {a.state}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
        <Section title={`${ind.trade} marketing FAQ`} narrow>
          <FaqList faqs={ind.faqs} />
        </Section>
        <RelatedLinks title="Services and other trades" links={links} />
      </PageShell>
    </>
  );
}
