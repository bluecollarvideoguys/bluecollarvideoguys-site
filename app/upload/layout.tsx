import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Send a video | The Blue Collar Video Guys™",
  robots: { index: false, follow: false },
};

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
