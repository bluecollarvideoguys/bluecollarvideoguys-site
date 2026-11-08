import type { Metadata } from "next";
import { StrategyCallPage } from "@/components/funnel/StrategyCallPage";
import { SITE_ORIGIN } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Free Video Strategy Call for Contractors | Blue Collar Video Guys",
    description:
      "Book a free 20 minute strategy call. The Blue Collar Blueprint builds trust for contractors from Red Bluff and Redding through Chico and nearby towns.",
    path: `${SITE_ORIGIN}/strategy-call`,
    absoluteTitle: true,
    noindex: true,
  }),
  robots: { index: false, follow: false },
};

export default function Page() {
  return <StrategyCallPage />;
}
