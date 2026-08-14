"use client";

import { upload } from "@vercel/blob/client";
import { useState } from "react";

const ACCEPT = "video/mp4,video/quicktime,video/x-m4v,video/webm,.mp4,.mov,.m4v,.webm";
const ALLOWED_EXTENSIONS = /\.(mp4|mov|m4v|webm)$/i;
const MAX_BYTES = 500 * 1024 * 1024;

type UploadedItem = {
  url: string;
  pathname: string;
  name: string;
};

function safeFileName(name: string) {
  const cleaned = name.replace(/[^\w.\-]+/g, "-").replace(/^\.+/, "");
  return cleaned || "video.mp4";
}

export default function UploadPage() {
  const [busy, setBusy] = useState(false);
  const [percent, setPercent] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<UploadedItem[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  async function onFiles(fileList: FileList | File[] | null) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);

    setError(null);

    for (const file of files) {
      if (!ALLOWED_EXTENSIONS.test(file.name)) {
        setError(`Skipped ${file.name}: use an MP4 or MOV file.`);
        continue;
      }
      if (file.size > MAX_BYTES) {
        setError(`${file.name} is over 500 MB.`);
        continue;
      }

      setBusy(true);
      setPercent(0);
      setStatus(`Uploading ${file.name}…`);

      try {
        const blob = await upload(`videos/${safeFileName(file.name)}`, file, {
          access: "public",
          handleUploadUrl: "/api/blob/upload",
          multipart: true,
          onUploadProgress: ({ percentage }) => {
            setPercent(Math.round(percentage));
          },
        });
        setItems((prev) => [
          {
            url: blob.url,
            pathname: blob.pathname,
            name: file.name,
          },
          ...prev,
        ]);
        setStatus(`${file.name} uploaded.`);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        setStatus(null);
      }
    }

    setBusy(false);
    setPercent(null);
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(url);
    window.setTimeout(() => setCopied(null), 1500);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-denim/70">
        The Blue Collar Video Guys™
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-denim-deep">
        Send a video
      </h1>
      <p className="mt-3 max-w-lg text-base text-charcoal/80">
        Drop an MP4 or MOV here. It goes straight to our video library. You can
        send more than one file.
      </p>

      <label
        onDragEnter={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          void onFiles(e.dataTransfer.files);
        }}
        className={`mt-10 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-16 text-center transition ${
          dragOver
            ? "border-rust bg-rust/5"
            : "border-denim/25 bg-paper hover:border-rust hover:bg-rust/5"
        } ${busy ? "pointer-events-none opacity-70" : ""}`}
      >
        <span className="text-sm font-semibold text-denim-deep">
          {busy
            ? percent != null
              ? `Uploading… ${percent}%`
              : "Uploading…"
            : "Drop a video or click to choose"}
        </span>
        <span className="mt-2 text-xs text-charcoal/60">
          MP4 or MOV · up to 500 MB
        </span>
        <input
          type="file"
          accept={ACCEPT}
          multiple
          className="hidden"
          disabled={busy}
          onChange={(e) => {
            void onFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {busy && percent != null ? (
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-concrete-dark">
          <div
            className="h-full bg-rust transition-[width]"
            style={{ width: `${percent}%` }}
          />
        </div>
      ) : null}

      {status ? (
        <p className="mt-4 text-sm text-denim-deep">{status}</p>
      ) : null}
      {error ? <p className="mt-2 text-sm text-rust">{error}</p> : null}

      {items.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-lg font-semibold tracking-tight text-denim-deep">
            Uploaded this visit
          </h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li
                key={item.url}
                className="rounded-lg border border-denim/15 bg-paper p-4"
              >
                <p className="truncate text-sm font-medium text-denim-deep">
                  {item.name}
                </p>
                <p className="mt-1 truncate text-xs text-charcoal/55">
                  {item.url}
                </p>
                <div className="mt-3 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url)}
                    className="text-xs font-semibold uppercase tracking-wider text-rust"
                  >
                    {copied === item.url ? "Copied" : "Copy link"}
                  </button>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold uppercase tracking-wider text-denim"
                  >
                    Open
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
