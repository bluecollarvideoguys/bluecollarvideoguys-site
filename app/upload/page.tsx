"use client";

import { useState } from "react";

const ACCEPT =
  "video/mp4,video/quicktime,video/x-m4v,video/webm,.mp4,.mov,.m4v,.webm";
const ALLOWED_EXTENSIONS = /\.(mp4|mov|m4v|webm)$/i;
/** 10 MB parts — works well for multi-GB R2 multipart uploads */
const PART_SIZE = 10 * 1024 * 1024;

type UploadedItem = {
  url: string;
  pathname: string;
  name: string;
};

async function readJson(res: Response) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload request failed");
  return data;
}

async function uploadFileToR2(
  file: File,
  onProgress: (percent: number) => void,
): Promise<UploadedItem> {
  const create = await readJson(
    await fetch("/api/r2/multipart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create",
        filename: file.name,
        contentType: file.type || "video/mp4",
      }),
    }),
  );

  const { key, uploadId } = create as { key: string; uploadId: string };
  const totalParts = Math.max(1, Math.ceil(file.size / PART_SIZE));
  const parts: { partNumber: number; etag: string }[] = [];

  for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
    const start = (partNumber - 1) * PART_SIZE;
    const end = Math.min(start + PART_SIZE, file.size);
    const chunk = file.slice(start, end);

    const { url } = (await readJson(
      await fetch("/api/r2/multipart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "sign-part",
          key,
          uploadId,
          partNumber,
        }),
      }),
    )) as { url: string };

    const put = await fetch(url, {
      method: "PUT",
      body: chunk,
    });
    if (!put.ok) {
      throw new Error(`Failed uploading part ${partNumber} of ${totalParts}`);
    }

    const etag = put.headers.get("etag") || put.headers.get("ETag");
    if (!etag) throw new Error(`Missing ETag for part ${partNumber}`);

    parts.push({ partNumber, etag });
    onProgress(Math.round((partNumber / totalParts) * 100));
  }

  const done = (await readJson(
    await fetch("/api/r2/multipart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "complete",
        key,
        uploadId,
        parts,
      }),
    }),
  )) as { url: string; key: string };

  return {
    url: done.url,
    pathname: done.key,
    name: file.name,
  };
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

      setBusy(true);
      setPercent(0);
      setStatus(`Uploading ${file.name}…`);

      try {
        const uploaded = await uploadFileToR2(file, setPercent);
        setItems((prev) => [uploaded, ...prev]);
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
        Worth the Ride
      </h1>
      <p className="mt-3 max-w-lg text-base text-charcoal/80">
        I&apos;m just over here providing 💁‍♀️... solving problems one battle at
        a time ❤️‍🔥
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
          MP4 or MOV · Cloudflare R2
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
