import type { Metadata } from "next";
import { BookPage } from "@/components/funnel/BookPage";
import { SITE_ORIGIN } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Pick Your Call Time | Blue Collar Video Guys",
    description:
      "Pick a time for your free 20 minute strategy call. We phone you at the number you entered and map the trust methods that fit your trade business.",
    path: `${SITE_ORIGIN}/book`,
    absoluteTitle: true,
    noindex: true,
  }),
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: Props) {
  return <BookPage searchParams={await searchParams} />;
}
