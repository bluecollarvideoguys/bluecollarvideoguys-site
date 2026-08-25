import type { Metadata } from "next";
import QRCode from "qrcode";
import { BrandLogo } from "@/components/BrandLogo";
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
    color: { dark: "#0d1520", light: "#ffffff" },
    errorCorrectionLevel: "H",
  });

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-[var(--v02-paper)] px-6 py-16 text-[var(--v02-ink)] print:min-h-0 print:py-10">
      <h1 className="v02-display text-center text-4xl font-bold tracking-tight sm:text-5xl">
        SCAN TO WATCH
      </h1>
      <p className="mt-3 max-w-sm text-center text-sm text-slate-600">
        Print this QR. iPhone Camera opens the intro film, then the Blueprint
        form.
      </p>
      <div className="mt-10 grid w-full max-w-[46rem] grid-cols-2 items-center gap-4 sm:gap-8">
        <BrandLogo
          variant="circular"
          className="aspect-square h-auto w-full"
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 768px) 45vw, 352px"
        />
        <div
          className="aspect-square w-full bg-white outline outline-1 outline-[var(--v02-line)] [&_svg]:block [&_svg]:size-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
      <p className="mt-6 break-all text-center text-xs font-semibold tracking-wide text-slate-500">
        {SCAN_URL}
      </p>
    </main>
  );
}
