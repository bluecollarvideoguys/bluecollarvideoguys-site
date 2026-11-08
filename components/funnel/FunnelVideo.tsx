"use client";

import Image from "next/image";
import { useState } from "react";
import { funnelConfig, isPlayableVideo } from "@/lib/funnel-config";

export function FunnelVideo({
  src,
  label,
  loop = false,
}: {
  src: string;
  label: string;
  /** Muted autoplay loop for the hero. Click-to-play otherwise. */
  loop?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const playable = isPlayableVideo(src);

  if (loop) {
    return (
      <div className="relative aspect-video overflow-hidden bg-[var(--v02-navy)]">
        {playable ? (
          <video
            className="h-full w-full object-cover"
            src={src}
            poster={funnelConfig.poster}
            autoPlay
            muted
            loop
            playsInline
            aria-label={label}
          />
        ) : (
          <Image
            src={funnelConfig.poster}
            alt="Videographer filming with a camera gimbal on a job site"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        )}
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden bg-[var(--v02-navy)]">
      {playable && playing ? (
        <video
          className="h-full w-full bg-black object-contain"
          src={src}
          poster={funnelConfig.poster}
          controls
          autoPlay
          playsInline
          aria-label={label}
        />
      ) : (
        <>
          <Image
            src={funnelConfig.poster}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 768px) 768px, 100vw"
          />
          {playable ? (
            <button
              type="button"
              className="absolute inset-0 flex items-center justify-center bg-black/25"
              aria-label={`Play ${label}`}
              onClick={() => setPlaying(true)}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--v02-gold)] text-2xl text-[var(--v02-ink)]" aria-hidden="true">
                ▶
              </span>
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}
