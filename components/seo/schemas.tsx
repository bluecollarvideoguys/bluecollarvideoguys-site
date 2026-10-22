import { JsonLd } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

function filled<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) =>
      Array.isArray(v) ? v.length > 0 : v !== "" && v !== undefined && v !== null,
    ),
  );
}

/** Sitewide Organization + ProfessionalService schema. Rendered in the root layout. */
export function OrganizationSchema() {
  const address = filled(SITE.address);
  const hasAddress = Boolean(SITE.address.addressLocality);

  const data = filled({
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.alternateName,
    url: SITE.url,
    logo: SITE.logo,
    image: SITE.image,
    description: SITE.description,
    telephone: SITE.phoneE164,
    email: SITE.email,
    foundingDate: SITE.foundingDate,
    founder: SITE.founders.map((name) => ({ "@type": "Person", name })),
    address: hasAddress ? { "@type": "PostalAddress", ...address } : "",
    areaServed: [
      ...SITE.areaServed.cities.map((c) => ({
        "@type": "City",
        name: `${c.name}, ${c.state}`,
      })),
      ...SITE.areaServed.states.map((s) => ({ "@type": "State", name: s })),
    ],
    knowsAbout: [...SITE.knowsAbout],
    sameAs: [...SITE.sameAs],
  });

  return <JsonLd data={data} />;
}

/** WebSite schema for the homepage. */
export function WebSiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE.name,
        url: SITE.url,
        publisher: { "@id": ORG_ID },
      }}
    />
  );
}

type Crumb = { name: string; path: string };

/** BreadcrumbList schema. Pair with visible breadcrumbs on the page. */
export function BreadcrumbSchema({ items }: { items: Crumb[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: `${SITE.url}${item.path}`,
        })),
      }}
    />
  );
}

type ServiceSchemaProps = {
  name: string;
  serviceType: string;
  description: string;
  path: string;
};

/** Service schema for individual service pages. */
export function ServiceSchema({ name, serviceType, description, path }: ServiceSchemaProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        serviceType,
        description,
        url: `${SITE.url}${path}`,
        provider: { "@id": ORG_ID },
        areaServed: SITE.areaServed.cities.map((c) => ({
          "@type": "City",
          name: `${c.name}, ${c.state}`,
        })),
      }}
    />
  );
}

/** FAQPage schema. Only use where the same questions and answers are visible. */
export function FAQSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

type VideoSchemaProps = {
  name: string;
  description: string;
  youtubeId: string;
  /** ISO date, for example "2026-10-01". */
  uploadDate: string;
  /** ISO 8601 duration, for example "PT2M14S". */
  duration?: string;
};

/** VideoObject schema for a real, published video on the page. */
export function VideoSchema({ name, description, youtubeId, uploadDate, duration }: VideoSchemaProps) {
  return (
    <JsonLd
      data={filled({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name,
        description,
        thumbnailUrl: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
        uploadDate,
        duration: duration ?? "",
        embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
        publisher: { "@id": ORG_ID },
      })}
    />
  );
}
