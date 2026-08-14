"use client";

import Link from "next/link";
import { useState } from "react";
import { IconClose, IconMenu } from "./icons";

export type SiteVersion =
  | 1
  | 2
  | 3
  | "master"
  | "services"
  | "testimonials";

const VERSIONS: { version: SiteVersion; href: string; label: string }[] = [
  { version: "master", href: "/master", label: "Version 02 Master" },
  { version: 1, href: "/v01", label: "Version 01" },
  { version: 2, href: "/v02", label: "Version 02" },
  { version: "services", href: "/services", label: "Services" },
  { version: "testimonials", href: "/testimonials", label: "Testimonials" },
  { version: 3, href: "/v03", label: "Archive 03–07" },
];

type VersionNavProps = {
  active: SiteVersion;
  /** Optional CTA on the right (Version 01 contact, etc.) */
  cta?: { label: string; onClick: () => void };
};

export function VersionNav({ active, cta }: VersionNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        id="mainNav"
        className="fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 ease-in-out border-b border-white/10 backdrop-blur-md bg-denim-deep/75"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link
              href="/v01"
              className="group flex items-center text-left shrink-0"
            >
              <span className="font-display text-sm font-medium tracking-wide text-concrete uppercase">
                The Blue Collar Video Guys™
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {VERSIONS.map(({ version, href, label }) => {
                const isActive = version === active;
                return (
                  <Link
                    key={version}
                    href={href}
                    className={`text-xs font-light tracking-widest uppercase transition-colors duration-200 ${
                      isActive
                        ? "text-concrete border-b border-rust pb-0.5"
                        : "text-concrete/55 hover:text-concrete"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>

            {cta ? (
              <button
                type="button"
                onClick={cta.onClick}
                className="btn-stamp hidden md:inline-flex text-paper bg-rust hover:bg-rust-hover px-4 py-2 shrink-0"
              >
                {cta.label}
              </button>
            ) : (
              <span className="hidden md:block w-[9.5rem]" aria-hidden="true" />
            )}

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="md:hidden text-concrete/70 hover:text-concrete transition-colors flex items-center justify-center"
              aria-label="Open menu"
            >
              <IconMenu />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[110] bg-denim-deep transition-transform duration-500 ease-in-out flex flex-col items-center justify-center texture-grain ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-5 right-6 text-concrete/60 hover:text-concrete transition-colors flex items-center justify-center"
          aria-label="Close menu"
        >
          <IconClose />
        </button>
        <div className="flex flex-col gap-6 text-center">
          {VERSIONS.map(({ version, href, label }) => {
            const isActive = version === active;
            return (
              <Link
                key={version}
                href={href}
                onClick={() => setOpen(false)}
                className={`font-display text-3xl tracking-wide uppercase transition-colors ${
                  isActive
                    ? "text-concrete"
                    : "text-concrete/55 hover:text-concrete"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
          {cta ? (
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                cta.onClick();
              }}
              className="mt-4 font-display text-xl tracking-wide text-rust uppercase"
            >
              {cta.label}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
