import type { Metadata } from "next";
import QRCode from "qrcode";
import { FUNNEL_PATH } from "@/lib/funnel";

export const metadata: Metadata = {
  title: "Print QR | The Blue Collar Video Guys™",
};

const SCAN_URL = `https://www.bluecollarvideoguys.com${FUNNEL_PATH}`;

export default async function ScanPrintPage() {
  const svg = await QRCode.toString(SCAN_URL, {
    type: "svg",
    margin: 2,
    width: 720,
    color: { dark: "#0d1520", light: "#f5f5f2" },
    errorCorrectionLevel: "H",
  });

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-[var(--v02-paper)] px-6 py-16 text-[var(--v02-ink)]">
      <p className="v02-display text-2xl font-bold tracking-tight">
        BLUE COLLAR{" "}
        <span className="text-[var(--v02-gold-deep)]">VIDEO GUYS™</span>
      </p>
      <h1 className="mt-6 v02-display text-center text-4xl font-bold tracking-tight sm:text-5xl">
        SCAN TO WATCH
      </h1>
      <p className="mt-3 max-w-sm text-center text-sm text-slate-600">
        Print this QR. iPhone Camera opens the intro film, then the Blueprint
        form.
      </p>
      <div
        className="mt-10 w-full max-w-xs border border-[var(--v02-line)] bg-[var(--v02-paper)] p-3 [&_svg]:h-auto [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <p className="mt-6 break-all text-center text-xs font-semibold tracking-wide text-slate-500">
        {SCAN_URL}
      </p>
    </main>
  );
}
