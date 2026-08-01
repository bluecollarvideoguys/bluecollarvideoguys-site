"use client";

import Link from "next/link";
import { VersionNav, type SiteVersion } from "./VersionNav";

export function VersionPlaceholder({ version }: { version: SiteVersion }) {
  const label = `Version 0${version}`;

  return (
    <div className="min-h-screen bg-denim-deep text-concrete font-sans antialiased">
      <VersionNav active={version} />
      <main className="relative z-40 flex min-h-screen flex-col items-center justify-center px-6 text-center texture-grain">
        <p className="stamp-badge text-rust mb-8">{label}</p>
        <h1 className="font-display text-4xl md:text-6xl font-semibold tracking-wide uppercase mb-6">
          Coming up next
        </h1>
        <p className="text-concrete/60 font-light text-sm md:text-base max-w-md leading-relaxed mb-10">
          This layout is framed up but not built yet. Version 01 is live — we
          break ground on {label} next.
        </p>
        <Link
          href="/v01"
          className="btn-stamp text-paper bg-rust hover:bg-rust-hover px-6 py-3"
        >
          Back to Version 01
        </Link>
      </main>
    </div>
  );
}
