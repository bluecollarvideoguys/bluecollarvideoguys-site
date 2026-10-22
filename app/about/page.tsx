import Link from "next/link";
import { PageShell, Prose, RelatedLinks, Section } from "@/components/PageShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { ORG_ID } from "@/components/seo/schemas";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Anthony Fowler and Kathy Coker | BCVG",
  description:
    "Meet the founders of The Blue Collar Video Guys, a Redding video production and marketing company built only for contractors and trades businesses.",
  path: "/about",
  absoluteTitle: true,
});

const FOUNDERS = [
  {
    id: "anthony-fowler",
    name: "Anthony Fowler",
    role: "Co-founder",
    bio: "Anthony is a filmmaker who has spent years telling brands' stories on camera, with deep experience in brand messaging videos and the strategy that gets them seen. On a Blue Collar Video Guys shoot, he is focused on capturing the work the way it actually looks on the job site.",
  },
  {
    id: "kathy-coker",
    name: "Kathy Coker",
    role: "Co-founder",
    bio: "Kathy is a filmmaker and marketer with years of experience in video production, websites, SEO, and digital marketing for local businesses. She also spent seven years working inside a construction company, assembling bid documents and running the office, so she knows how contractors win work from the inside.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: `${SITE.url}/about`,
          about: { "@id": ORG_ID },
          mainEntity: FOUNDERS.map((f) => ({
            "@type": "Person",
            "@id": `${SITE.url}/about#${f.id}`,
            name: f.name,
            jobTitle: f.role,
            worksFor: { "@id": ORG_ID },
          })),
        }}
      />
      <PageShell
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
        eyebrow="About us"
        h1="Built for the Trades: Meet the Blue Collar Video Guys"
        intro="The Blue Collar Video Guys was founded by Anthony Fowler and Kathy Coker, two filmmakers with nearly a decade of hands on experience telling brands' stories on camera. We are based in Redding, California, and we only work with contractors and trades businesses."
      >
        <Section title="Why we only work with the trades">
          <Prose>
            <p>
              The name says it all: we bring a blue collar work ethic to video production. Show up, do the job right,
              and treat every client&apos;s business like our own. No jargon, no smoke and mirrors. Just honest work and a
              finished product that actually sounds like you.
            </p>
            <p>
              Contractors build the homes, roofs, and systems everyone depends on, yet their marketing rarely matches
              the quality of their work. Too many great shops still rely on word of mouth and an outdated website. We
              exist to close that gap with real video, real photos, and marketing that earns trust before the first
              phone call.
            </p>
          </Prose>
        </Section>
        <Section title="Meet the founders" tone="white">
          <ul className="grid gap-6 md:grid-cols-2">
            {FOUNDERS.map((f) => (
              <li key={f.id} id={f.id} className="scroll-mt-28 rounded-2xl border border-[var(--v02-line)] bg-[var(--v02-paper)] p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold-deep)]">{f.role}</p>
                <h3 className="mt-2 v02-display text-3xl font-bold text-[var(--v02-ink)]">{f.name}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{f.bio}</p>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Where we work">
          <Prose>
            <p>
              We are based in Redding and film for contractors throughout Shasta, Tehama, and Siskiyou counties, with
              bigger projects across Northern California and Southern Oregon. See our{" "}
              <Link href="/areas" className="font-semibold text-[var(--v02-gold-deep)] hover:underline">
                service area
              </Link>{" "}
              for the towns we cover most.
            </p>
          </Prose>
        </Section>
        <RelatedLinks
          title="Get to know our work"
          links={[
            { href: "/services", label: "Contractor marketing services" },
            { href: "/industries", label: "Trades we serve" },
            { href: "/faq", label: "Common questions" },
            { href: "/contact", label: "Book a discovery call" },
          ]}
        />
      </PageShell>
    </>
  );
}
