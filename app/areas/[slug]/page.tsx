import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FAQSchema, ServiceSchema } from "@/components/seo/schemas";
import { IconArrowRight } from "@/components/icons";
import { AREAS, AREA_TRADES, getArea } from "@/content/areas";
import { CALENDLY_URL } from "@/lib/calendly";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) return {};
  return buildMetadata({
    title: area.title,
    description: area.metaDescription,
    path: `/areas/${area.slug}`,
    absoluteTitle: true,
  });
}

const STEPS = [
  {
    stage: "Build Trust",
    body: "Brand story films, customer testimonials, and meet the crew videos that answer the questions every customer asks before they call.",
  },
  {
    stage: "Stand Out",
    body: "Cinematic project films, job site photography, and a website that looks as solid as your work.",
  },
  {
    stage: "Win More Work",
    body: "Local SEO, social content, and ads that put that proof in front of the right customers in your market.",
  },
];

export default async function AreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getArea(slug);
  if (!area) notFound();

  const path = `/areas/${area.slug}`;
  const others = AREAS.filter((a) => a.slug !== area.slug);

  return (
    <SiteFooter className="bg-[var(--v02-navy-deep)] text-[var(--v02-ink)] antialiased">
      <ServiceSchema
        name={`Contractor video production in ${area.city}, ${area.state}`}
        serviceType="Video production and marketing for contractors"
        description={area.intro}
        path={path}
        cities={[{ name: area.city, state: area.state }]}
      />
      <FAQSchema faqs={area.faqs} />
      <SiteNav />

      <main>
        <section className="border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] pt-28 pb-20 sm:pt-32 sm:pb-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Service Area", path: "/areas" },
                { name: `${area.city}, ${area.state}`, path },
              ]}
            />
            <div className="mt-8 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">
                {area.county} · {area.driveTime}
              </p>
              <h1 className="mt-3 v02-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                {area.h1}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
                {area.intro}
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
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="v02-display text-3xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-4xl">
                Why {area.city} contractors invest in video
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                {area.market}
              </p>
              {area.localProof.length > 0 ? (
                <>
                  <h3 className="mt-10 v02-display text-2xl font-bold tracking-tight text-[var(--v02-ink)]">
                    Recent work in {area.city}
                  </h3>
                  <ul className="mt-4 space-y-3 text-base text-slate-600">
                    {area.localProof.map((p) => (
                      <li key={p.text}>
                        {p.href ? (
                          <Link href={p.href} className="font-medium text-[var(--v02-gold-deep)] hover:underline">
                            {p.text}
                          </Link>
                        ) : (
                          p.text
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
            <div className="space-y-10">
              <div>
                <h2 className="v02-display text-3xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-4xl">
                  Trades we work with in {area.city}
                </h2>
                <ul className="mt-5 grid grid-cols-2 gap-3 text-base text-slate-700">
                  {AREA_TRADES.map((t) => (
                    <li key={t} className="rounded-xl border border-[var(--v02-line)] bg-white px-4 py-3">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="v02-display text-3xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-4xl">
                  Where we film around {area.city}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  {area.nearbyTowns.join(", ")}, and the rest of {area.county}.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--v02-line)] bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <h2 className="v02-display text-3xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-4xl">
              How the Blue Collar Blueprint works in {area.city}
            </h2>
            <ol className="mt-10 grid gap-6 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.stage} className="rounded-2xl border border-[var(--v02-line)] bg-[var(--v02-paper)] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">
                    Stage 0{i + 1}
                  </p>
                  <h3 className="mt-2 v02-display text-2xl font-bold text-[var(--v02-ink)]">{s.stage}</h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">{s.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-base text-slate-600">
              See everything we offer on our{" "}
              <Link href="/services" className="font-semibold text-[var(--v02-gold-deep)] hover:underline">
                contractor marketing services
              </Link>{" "}
              page, or compare the{" "}
              <Link href="/services#packages" className="font-semibold text-[var(--v02-gold-deep)] hover:underline">
                Blueprint packages
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="border-t border-[var(--v02-line)] bg-[var(--v02-paper)] py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
            <h2 className="v02-display text-3xl font-bold tracking-tight text-[var(--v02-ink)] sm:text-4xl">
              {area.city} video production FAQ
            </h2>
            <div className="mt-8 divide-y divide-[var(--v02-line)] border-y border-[var(--v02-line)]">
              {area.faqs.map((f) => (
                <div key={f.q} className="py-6">
                  <h3 className="text-lg font-semibold text-[var(--v02-ink)]">{f.q}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <h2 className="v02-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Also serving contractors near {area.city}
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/areas/${o.slug}`}
                    className="inline-flex rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-[var(--v02-gold)] hover:text-[var(--v02-gold)]"
                  >
                    Video production in {o.city}
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
