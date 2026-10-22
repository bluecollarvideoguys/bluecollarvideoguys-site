import { FaqList, PageShell, RelatedLinks, Section } from "@/components/PageShell";
import { FAQSchema } from "@/components/seo/schemas";
import { getService } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contractor Marketing FAQ | Blue Collar Video Guys",
  description:
    "Answers to common questions about contractor video production, websites, SEO, social media, ads, cost, and working with The Blue Collar Video Guys in Redding.",
  path: "/faq",
  absoluteTitle: true,
});

const pick = (slug: string, n: number[]) => {
  const s = getService(slug)!;
  return n.map((i) => s.faqs[i]);
};

const GROUPS = [
  {
    title: "Cost and packages",
    faqs: [
      pick("video-production", [0])[0],
      pick("ads", [0])[0],
      {
        q: "What are the Blueprint packages?",
        a: "We offer three Blueprint packages that run 3, 6, or 12 months: Foundation, Structure, and Turnkey. Each bundles strategy, video, photos, and marketing support at a different level. You can compare them on our services page.",
      },
    ],
  },
  {
    title: "The shoot day",
    faqs: [...pick("video-production", [1, 2, 3]), pick("photography", [0])[0]],
  },
  { title: "Websites and SEO", faqs: [...pick("website-design", [0, 1]), ...pick("seo", [0, 1, 2])] },
  { title: "Social media and ads", faqs: [...pick("social-media", [0, 3]), ...pick("ads", [2, 3])] },
  {
    title: "Working together",
    faqs: [
      {
        q: "Where are you based?",
        a: "We are based in Redding, California, and work with contractors throughout Shasta, Tehama, and Siskiyou counties, plus bigger projects across Northern California and Southern Oregon.",
      },
      {
        q: "What happens on the discovery call?",
        a: "We walk through your current brand, website, and content in plain language, map which trust tools fit your business and goals, and you leave with a clear next step whether or not we end up working together.",
      },
      {
        q: "Do you work with new businesses?",
        a: "We work best with established shops that already have quality work and a reputation worth showing. Marketing amplifies a good reputation; it cannot replace one.",
      },
    ],
  },
];

export default function FaqPage() {
  const all = GROUPS.flatMap((g) => g.faqs);
  return (
    <>
      <FAQSchema faqs={all} />
      <PageShell
        crumbs={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
        eyebrow="Questions and answers"
        h1="Contractor Marketing FAQ"
        intro="Straight answers to the questions contractors ask us most about video, websites, SEO, social media, ads, and what it is like to work together."
      >
        {GROUPS.map((g, i) => (
          <Section key={g.title} title={g.title} tone={i % 2 ? "white" : "paper"} narrow>
            <FaqList faqs={g.faqs} />
          </Section>
        ))}
        <RelatedLinks
          title="Keep exploring"
          links={[
            { href: "/services", label: "Contractor marketing services" },
            { href: "/services#packages", label: "Blueprint packages" },
            { href: "/industries", label: "Trades we serve" },
            { href: "/areas", label: "Service area" },
          ]}
        />
      </PageShell>
    </>
  );
}
