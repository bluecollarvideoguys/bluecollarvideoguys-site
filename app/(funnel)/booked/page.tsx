import type { Metadata } from "next";
import { BookedPage } from "@/components/funnel/BookedPage";
import { SITE_ORIGIN } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "You're Booked | Blue Collar Video Guys",
    description:
      "Your strategy call is booked. Check your email for the time, save our number, and come ready to talk about the jobs you want more of each week.",
    path: `${SITE_ORIGIN}/booked`,
    absoluteTitle: true,
    noindex: true,
  }),
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BookedPage />;
}
