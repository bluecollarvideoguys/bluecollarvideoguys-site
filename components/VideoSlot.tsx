"use client";

import { useState } from "react";
import { IconPlay } from "./icons";

/** Temporary stand-in until real job-site films are ready */
export const PLACEHOLDER_VIDEO =
  "https://youtu.be/EU7qo4Iev9k?si=BJ6GrYdE0BWntxEP";

type VideoSlotProps = {
  /** Short label shown on the placeholder / overlay */
  label: string;
  /** Trade or project type */
  trade?: string;
  /** YouTube or direct video URL — defaults to shared placeholder */
  src?: string;
  poster?: string;
  aspect?: "video" | "square" | "wide";
  className?: string;
  tone?: "dark" | "light";
};

const aspectClass = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
} as const;

function parseYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.replace(/^\//, "") || null;
    }
    if (u.hostname.includes("youtube.com")) {
      return u.searchParams.get("v");
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Portfolio video slot.
 * CLIENT ASSET: Swap `src` (and optional `poster`) for real job-site footage when ready.
 */
export function VideoSlot({
  label,
  trade,
  src = PLACEHOLDER_VIDEO,
  poster,
  aspect = "video",
  className = "",
  tone = "dark",
}: VideoSlotProps) {
  const [playing, setPlaying] = useState(false);
  const isDark = tone === "dark";
  const youtubeId = src ? parseYouTubeId(src) : null;
  const thumb =
    poster ||
    (youtubeId
      ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`
      : undefined);

  const start = () => {
    if (!src) return;
    setPlaying(true);
  };

  return (
    <figure
      className={`video-slot group relative overflow-hidden rounded-sm ${aspectClass[aspect]} ${className}`}
    >
      {playing && youtubeId ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : playing && src && !youtubeId ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={thumb}
          autoPlay
          controls
          playsInline
          onEnded={() => setPlaying(false)}
        />
      ) : (
        <>
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote YT thumbs; no next/image domain config yet
            <img
              src={thumb}
              alt=""
              className="absolute inset-0 h-full w-full object-cover scale-105"
            />
          ) : (
            <div
              className={`absolute inset-0 ${
                isDark
                  ? "bg-gradient-to-br from-denim-deep via-denim to-denim-mid"
                  : "bg-gradient-to-br from-concrete-dark via-concrete to-denim/20"
              }`}
              aria-hidden="true"
            >
              <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(ellipse_at_30%_20%,rgba(181,67,43,0.35),transparent_55%)]" />
              <div className="video-slot-grain absolute inset-0 opacity-[0.12]" />
            </div>
          )}

          <div
            className={`pointer-events-none absolute inset-0 ${
              isDark
                ? "bg-denim-deep/45 mix-blend-multiply"
                : "bg-denim/25 mix-blend-multiply"
            }`}
            aria-hidden="true"
          />

          <button
            type="button"
            onClick={start}
            disabled={!src}
            className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-6 text-center transition-colors ${
              src ? "cursor-pointer hover:bg-denim-deep/25" : "cursor-default"
            }`}
            aria-label={src ? `Play ${label}` : `${label} — footage coming soon`}
          >
            <span
              className={`flex h-14 w-14 items-center justify-center border-2 transition-transform duration-300 group-hover:scale-105 ${
                isDark
                  ? "border-concrete/80 text-concrete bg-denim-deep/40"
                  : "border-denim/70 text-denim bg-paper/50"
              }`}
            >
              <IconPlay className="ml-0.5" />
            </span>
            <span className="flex flex-col gap-1">
              {trade ? (
                <span className="text-[10px] uppercase tracking-[0.2em] text-rust">
                  {trade}
                </span>
              ) : null}
              <span
                className={`font-display text-sm md:text-base tracking-wide uppercase ${
                  isDark ? "text-concrete" : "text-denim"
                }`}
              >
                {label}
              </span>
            </span>
          </button>
        </>
      )}
    </figure>
  );
}
