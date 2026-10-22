import { notFound } from "next/navigation";
import { CardList, FaqList, PageShell, Prose, RelatedLinks, Section } from "@/components/PageShell";
import { FAQSchema, ServiceSchema } from "@/components/seo/schemas";
import { AREAS } from "@/content/areas";
import { INDUSTRIES } from "@/content/industries";
import { SERVICES, getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) return {};
  return buildMetadata({ title: s.title, description: s.metaDescription, path: `/services/${s.slug}`, absoluteTitle: true });
}

export default async function ServiceDetailPage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const path = `/services/${s.slug}`;

  const links = [
    ...s.relatedServices.map((slug) => {
      const r = SERVICES.find((x) => x.slug === slug)!;
      return { href: `/services/${r.slug}`, label: r.name };
    }),
    ...s.relatedIndustries.map((slug) => {
      const r = INDUSTRIES.find((x) => x.slug === slug)!;
      return { href: `/industries/${r.slug}`, label: `${r.trade} marketing` };
    }),
    { href: "/services#packages", label: "Blueprint packages" },
    { href: "/areas/redding-ca", label: "Video production in Redding" },
  ];

  return (
    <>
      <ServiceSchema name={s.name} serviceType={s.primaryKeyword} description={s.intro} path={path} />
      <FAQSchema faqs={s.faqs} />
      <PageShell
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: s.name, path },
        ]}
        eyebrow={`Blueprint stage: ${s.stage}`}
        h1={s.h1}
        intro={s.intro}
      >
        <Section title={`Why ${s.name.toLowerCase().replace(" for contractors", "")} matters for contractors`}>
          <Prose>
            {s.why.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </Prose>
        </Section>
        <Section title="What you get" tone="white">
          <CardList items={s.deliverables} />
        </Section>
        <Section title="How it works">
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {s.process.map((p, i) => (
              <li key={p.title} className="rounded-2xl border border-[var(--v02-line)] bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">Step 0{i + 1}</p>
                <h3 className="mt-2 v02-display text-xl font-bold text-[var(--v02-ink)]">{p.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-slate-600">{p.body}</p>
              </li>
            ))}
          </ol>
        </Section>
        <Section title="Who this is for" tone="white">
          <Prose>
            <p>{s.whoFor}</p>
            <p>
              We work with contractors across Redding and the North State, including{" "}
              {AREAS.map((a) => a.city).join(", ")}.
            </p>
          </Prose>
        </Section>
        <Section title={`${s.name} FAQ`} narrow>
          <FaqList faqs={s.faqs} />
        </Section>
        <RelatedLinks title="Related services and trades" links={links} />
      </PageShell>
    </>
  );
}
