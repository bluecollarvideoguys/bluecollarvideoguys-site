"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type SyntheticEvent,
} from "react";
import {
  FUNNEL_CALENDLY_URL,
  FUNNEL_FOLLOWUP_VIDEO,
  FUNNEL_INTRO_VIDEO,
  parseYouTubeId,
} from "@/lib/funnel";
import { IconArrowRight } from "@/components/icons";

type Phase = "intro" | "capture" | "followup";

export function FunnelPage() {
  const [phase, setPhase] = useState<Phase>("intro");

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[var(--v02-navy-deep)] text-white">
      <p className="pointer-events-none absolute left-5 top-5 z-20 v02-display text-sm font-bold tracking-tight sm:left-8 sm:text-base">
        BLUE COLLAR <span className="text-[var(--v02-gold)]">VIDEO GUYS™</span>
      </p>

      {phase === "intro" ? (
        <FunnelVideo
          src={FUNNEL_INTRO_VIDEO}
          onEnded={() => setPhase("capture")}
        />
      ) : null}

      {phase === "capture" ? (
        <CaptureForm onDone={() => setPhase("followup")} />
      ) : null}

      {phase === "followup" ? (
        <FunnelVideo
          src={FUNNEL_FOLLOWUP_VIDEO}
          onEnded={() => {
            window.location.assign(FUNNEL_CALENDLY_URL);
          }}
        />
      ) : null}
    </div>
  );
}

type FunnelYtPlayer = {
  mute: () => void;
  unMute: () => void;
  playVideo: () => void;
  destroy: () => void;
};

type FunnelYtPlayerEvent = { target: FunnelYtPlayer; data: number };

type WindowWithYt = Window & {
  YT?: {
    Player: new (
      el: HTMLElement | string,
      opts: {
        videoId: string;
        width?: string | number;
        height?: string | number;
        playerVars?: Record<string, string | number>;
        events?: {
          onReady?: (e: FunnelYtPlayerEvent) => void;
          onStateChange?: (e: FunnelYtPlayerEvent) => void;
        };
      },
    ) => FunnelYtPlayer;
    PlayerState: { ENDED: number; PLAYING: number };
  };
  onYouTubeIframeAPIReady?: () => void;
};

function getYtWindow() {
  return window as WindowWithYt;
}

function FunnelVideo({
  src,
  onEnded,
}: {
  src: string;
  onEnded: () => void;
}) {
  const youtubeId = parseYouTubeId(src);
  if (youtubeId) {
    return <FunnelYouTubeVideo videoId={youtubeId} onEnded={onEnded} />;
  }
  return <FunnelMp4Video src={src} onEnded={onEnded} />;
}

function FunnelYouTubeVideo({
  videoId,
  onEnded,
}: {
  videoId: string;
  onEnded: () => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<FunnelYtPlayer | null>(null);
  const endedRef = useRef(false);
  const [needsTap, setNeedsTap] = useState(true);

  useEffect(() => {
    endedRef.current = false;
    let player: FunnelYtPlayer | null = null;
    let cancelled = false;

    const finish = () => {
      if (endedRef.current) return;
      endedRef.current = true;
      onEnded();
    };

    const mount = () => {
      const win = getYtWindow();
      if (cancelled || !hostRef.current || !win.YT?.Player) return;

      player = new win.YT.Player(hostRef.current, {
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
          cc_load_policy: 0,
          enablejsapi: 1,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.playVideo();
            setNeedsTap(true);
          },
          onStateChange: (e) => {
            if (e.data === getYtWindow().YT?.PlayerState.ENDED) {
              finish();
            }
          },
        },
      }) as unknown as FunnelYtPlayer;
      playerRef.current = player;
    };

    const win = getYtWindow();
    const prevReady = win.onYouTubeIframeAPIReady;
    win.onYouTubeIframeAPIReady = () => {
      prevReady?.();
      mount();
    };

    if (win.YT?.Player) {
      mount();
    } else if (!document.getElementById("youtube-iframe-api")) {
      const script = document.createElement("script");
      script.id = "youtube-iframe-api";
      script.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;
      getYtWindow().onYouTubeIframeAPIReady = prevReady;
      player?.destroy();
      playerRef.current = null;
    };
  }, [videoId, onEnded]);

  const handleTap = () => {
    const player = playerRef.current;
    if (!player) return;
    player.unMute();
    player.playVideo();
    setNeedsTap(false);
  };

  return (
    <div className="absolute inset-0 bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2">
          <div ref={hostRef} className="h-full w-full" />
        </div>
      </div>
      {needsTap ? (
        <button
          type="button"
          onClick={handleTap}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/45 px-6 text-center"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--v02-gold)] text-[var(--v02-ink)]">
            <PlayIcon />
          </span>
          <span className="mt-5 v02-display text-2xl font-bold tracking-tight">
            TAP TO PLAY
          </span>
          <span className="mt-2 max-w-xs text-sm text-white/70">
            iPhone blocks sound until you tap once.
          </span>
        </button>
      ) : null}
    </div>
  );
}

function FunnelMp4Video({
  src,
  onEnded,
}: {
  src: string;
  onEnded: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsTap, setNeedsTap] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    let cancelled = false;
    const start = async () => {
      try {
        video.muted = false;
        await video.play();
        if (!cancelled) {
          setMuted(false);
          setNeedsTap(false);
        }
      } catch {
        try {
          video.muted = true;
          await video.play();
          if (!cancelled) {
            setMuted(true);
            setNeedsTap(true);
          }
        } catch {
          if (!cancelled) setNeedsTap(true);
        }
      }
    };

    start();
    return () => {
      cancelled = true;
    };
  }, [src]);

  const handleTap = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setMuted(false);
    try {
      await video.play();
      setNeedsTap(false);
    } catch {
      setNeedsTap(true);
    }
  };

  const handleEnded = (event: SyntheticEvent<HTMLVideoElement>) => {
    event.currentTarget.pause();
    onEnded();
  };

  return (
    <div className="absolute inset-0 bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        playsInline
        autoPlay
        muted={muted}
        controls={false}
        preload="auto"
        onEnded={handleEnded}
        onError={() => onEnded()}
      />
      {needsTap ? (
        <button
          type="button"
          onClick={handleTap}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/45 px-6 text-center"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--v02-gold)] text-[var(--v02-ink)]">
            <PlayIcon />
          </span>
          <span className="mt-5 v02-display text-2xl font-bold tracking-tight">
            TAP TO PLAY
          </span>
          <span className="mt-2 max-w-xs text-sm text-white/70">
            iPhone blocks sound until you tap once.
          </span>
        </button>
      ) : null}
    </div>
  );
}

function CaptureForm({ onDone }: { onDone: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  return (
    <div className="absolute inset-0 z-10 flex items-end justify-center overflow-y-auto bg-[var(--v02-navy-deep)] sm:items-center sm:px-6">
      <form
        onSubmit={async (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const form = event.currentTarget;
          setStatus("sending");
          try {
            const data = Object.fromEntries(new FormData(form).entries());
            const res = await fetch("/api/funnel", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
            });
            if (!res.ok) {
              throw new Error("Could not send");
            }
            onDone();
          } catch {
            setStatus("error");
          }
        }}
        className="v02-funnel-sheet w-full max-w-lg rounded-t-2xl border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] p-6 sm:rounded-2xl sm:p-8"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--v02-gold)]">
          One call. One Blueprint.
        </p>
        <h1 className="mt-3 v02-display text-3xl font-bold tracking-tight sm:text-4xl">
          TELL US WHO TO BUILD FOR.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          We&apos;ll email your pricing packet, then queue the next film and
          your discovery calendar.
        </p>

        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
        />

        <div className="mt-6 space-y-4">
          <Field
            id="funnel-name"
            name="name"
            label="Your name"
            required
            autoComplete="name"
            placeholder="First and last"
          />
          <Field
            id="funnel-company"
            name="company_name"
            label="Company"
            required
            autoComplete="organization"
            placeholder="Your company or brand"
          />
          <Field
            id="funnel-email"
            name="email"
            label="Email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
          />
          <Field
            id="funnel-phone"
            name="phone"
            label="Phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(555) 555-5555"
          />
          <Field
            id="funnel-trade"
            name="trade"
            label="Trade"
            placeholder="Electrical, HVAC, plumbing…"
          />
        </div>

        {status === "error" ? (
          <p className="mt-4 text-sm text-red-400">
            Could not send. Check your connection and try again.
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--v02-gold)] px-6 py-4 text-sm font-semibold text-[var(--v02-ink)] transition hover:bg-[var(--v02-gold-hot)] disabled:opacity-70"
        >
          {status === "sending" ? "Sending packet…" : "Send my Blueprint"}
          {status === "sending" ? null : <IconArrowRight />}
        </button>
      </form>
    </div>
  );
}

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required,
  autoComplete,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        {label}
        {required ? <span className="text-[var(--v02-gold)]"> *</span> : null}
      </span>
      <input
        id={id}
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy-deep)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-[var(--v02-gold)]"
      />
    </label>
  );
}

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5L8 5.5z" />
    </svg>
  );
}
