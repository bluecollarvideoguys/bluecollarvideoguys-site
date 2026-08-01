"use client";

import { useEffect, useRef } from "react";

type YtPlayer = {
  mute: () => void;
  playVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
  unloadModule?: (module: string) => void;
  setOption?: (module: string, option: string, value: unknown) => void;
};

type YtPlayerEvent = { target: YtPlayer; data: number };

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement | string,
        opts: {
          videoId: string;
          width?: string | number;
          height?: string | number;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (e: YtPlayerEvent) => void;
            onStateChange?: (e: YtPlayerEvent) => void;
            onApiChange?: (e: YtPlayerEvent) => void;
          };
        },
      ) => YtPlayer;
      PlayerState: { ENDED: number; PLAYING: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function disableYtCaptions(player: YtPlayer) {
  try {
    player.unloadModule?.("captions");
    player.unloadModule?.("cc");
    player.setOption?.("captions", "track", {});
  } catch {
    /* YouTube caption API is best-effort */
  }
}

/** Muted looping YouTube background — starts at `startSec`, captions off. */
export function HeroYouTubeBackground({
  videoId,
  startSec = 0,
}: {
  videoId: string;
  startSec?: number;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let player: YtPlayer | null = null;
    let cancelled = false;
    const captionTimers: number[] = [];

    const mount = () => {
      if (cancelled || !hostRef.current || !window.YT?.Player) return;

      player = new window.YT.Player(hostRef.current, {
        videoId,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          start: startSec,
          cc_load_policy: 0,
          enablejsapi: 1,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.seekTo(startSec, true);
            e.target.playVideo();
            disableYtCaptions(e.target);
            for (const ms of [400, 1200, 2500, 5000]) {
              captionTimers.push(
                window.setTimeout(() => disableYtCaptions(e.target), ms),
              );
            }
          },
          onStateChange: (e) => {
            if (e.data === window.YT?.PlayerState.PLAYING) {
              disableYtCaptions(e.target);
            }
            if (e.data === window.YT?.PlayerState.ENDED) {
              e.target.seekTo(startSec, true);
              e.target.playVideo();
            }
          },
          onApiChange: (e) => {
            disableYtCaptions(e.target);
          },
        },
      });
    };

    const prevReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prevReady?.();
      mount();
    };

    if (window.YT?.Player) {
      mount();
    } else if (!document.getElementById("youtube-iframe-api")) {
      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      captionTimers.forEach((id) => window.clearTimeout(id));
      window.onYouTubeIframeAPIReady = prevReady;
      player?.destroy();
    };
  }, [videoId, startSec]);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2">
        <div ref={hostRef} className="h-full w-full" />
      </div>
    </div>
  );
}
