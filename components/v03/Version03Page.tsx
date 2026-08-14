"use client";

import { Version03Design } from "@/components/v03/stack/Version03Design";
import { Version04Design } from "@/components/v03/stack/Version04Design";
import { Version05Design } from "@/components/v03/stack/Version05Design";
import { Version06Design } from "@/components/v03/stack/Version06Design";
import { Version07Design } from "@/components/v03/stack/Version07Design";

const ARCHIVE_LINKS = [
  { id: "master", label: "Version 02 Master", href: "/master" },
  { id: "v01", label: "Version 01", href: "/v01" },
  { id: "v03", label: "Version 03", href: "#v03" },
  { id: "v04", label: "Version 04", href: "#v04" },
  { id: "v05", label: "Version 05", href: "#v05" },
  { id: "v06", label: "Version 06", href: "#v06" },
  { id: "v07", label: "Version 07", href: "#v07" },
] as const;

const STACK = [
  {
    id: "v03",
    label: "Version 03",
    rootClass: "v03-root",
    Component: Version03Design,
  },
  {
    id: "v04",
    label: "Version 04",
    rootClass: "v04-root",
    Component: Version04Design,
  },
  {
    id: "v05",
    label: "Version 05",
    rootClass: "v05-root",
    Component: Version05Design,
  },
  {
    id: "v06",
    label: "Version 06",
    rootClass: "v06-root",
    Component: Version06Design,
  },
  {
    id: "v07",
    label: "Version 07",
    rootClass: "v07-root min-h-screen overflow-x-hidden",
    Component: Version07Design,
  },
] as const;

/**
 * Reference scrapbook: Version 01, Version 02 Master, and designs 03–07.
 * Not a unified brand page.
 */
export function Version03Page() {
  return (
    <div className="bg-neutral-950 text-white">
      <header className="sticky top-0 z-[300] border-b border-white/20 bg-black/95 px-4 py-3 backdrop-blur">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400">
          Archive · pick elements · not a live design
        </p>
        <nav
          className="mt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-medium"
          aria-label="Archive versions"
        >
          {ARCHIVE_LINKS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="rounded border border-white/25 px-2.5 py-1 transition hover:border-amber-400 hover:text-amber-400"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/"
            className="rounded border border-amber-400/50 px-2.5 py-1 text-amber-400 transition hover:bg-amber-400 hover:text-black"
          >
            ← Home
          </a>
        </nav>
      </header>

      {STACK.map(({ id, label, rootClass, Component }) => (
        <section key={id} id={id} className="relative scroll-mt-24">
          <div className="sticky top-[4.5rem] z-[250] border-y border-amber-400/40 bg-amber-400 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.18em] text-black">
            {label}
          </div>
          <div className={rootClass}>
            <Component />
          </div>
        </section>
      ))}
    </div>
  );
}
