type JsonLdProps = { data: Record<string, unknown> };

/** Renders a JSON-LD script tag. Escapes "<" so content cannot break out of the tag. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
