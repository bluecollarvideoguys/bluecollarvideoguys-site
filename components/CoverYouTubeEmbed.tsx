"use client";

import { useEffect, useRef, useState } from "react";

type CoverYouTubeEmbedProps = {
  videoId: string;
  title: string;
  /** Mute + autoplay for background/gallery tiles */
  background?: boolean;
  /** Extra zoom beyond cover (default 1.28) */
  zoom?: number;
  className?: string;
};

/** 16:9 YouTube embed sized to cover its parent (no letterbox bars). */
export function CoverYouTubeEmbed({
  videoId,
  title,
  background = false,
  zoom = 1.28,
  className = "",
}: CoverYouTubeEmbedProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const update = () => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const ratio = 16 / 9;
  let frameW = 0;
  let frameH = 0;
  if (size.w > 0 && size.h > 0) {
    if (size.w / size.h > ratio) {
      frameW = size.w * zoom;
      frameH = (size.w / ratio) * zoom;
    } else {
      frameH = size.h * zoom;
      frameW = size.h * ratio * zoom;
    }
  }

  const origin =
    typeof window !== "undefined" ? window.location.origin : "";

  const params = new URLSearchParams({
    autoplay: "1",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    enablejsapi: "1",
    origin,
  });
  if (background) {
    params.set("mute", "1");
    params.set("controls", "0");
    params.set("loop", "1");
    params.set("playlist", videoId);
  }

  return (
    <div
      ref={hostRef}
      className={`absolute inset-0 overflow-hidden bg-stone-900 ${className}`}
    >
      {frameW > 0 ? (
        <iframe
          className="absolute left-1/2 top-1/2 border-0"
          style={{
            width: frameW,
            height: frameH,
            transform: "translate(-50%, -50%)",
          }}
          src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : null}
    </div>
  );
}
