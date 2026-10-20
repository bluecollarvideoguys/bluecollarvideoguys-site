import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { createHash, randomUUID, timingSafeEqual } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { userAgentFromString } from "next/server";
import { getR2WriteContext } from "@/lib/r2";

export const QR_SCAN_PREFIX = "videos/qr-scans/";
export const SCAN_STATS_COOKIE = "bcvg_scan_stats";

export type QrScanEvent = {
  id: string;
  at: string;
  environment: string;
  destination: string | null;
  city: string;
  region: string;
  country: string;
  latitude: string;
  longitude: string;
  timezone: string;
  device: string;
  os: string;
  browser: string;
  language: string;
  referer: string;
  visitorKey: string;
};

export type QrScanStats = {
  total: number;
  unique: number;
  today: number;
  week: number;
  month: number;
  lastScanAt: string | null;
  byDay: { date: string; label: string; count: number }[];
  byCountry: { name: string; count: number }[];
  byCity: { name: string; count: number }[];
  byDevice: { name: string; count: number }[];
  byOs: { name: string; count: number }[];
  recent: QrScanEvent[];
};

const LOCAL_STORE = path.join(process.cwd(), ".data", "qr-scans.json");
const DAY_MS = 24 * 60 * 60 * 1000;

function decodeHeader(value: string | null): string {
  if (!value) return "";
  try {
    return decodeURIComponent(value.replace(/\+/g, " ")).trim();
  } catch {
    return value.trim();
  }
}

function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "";
  return (
    headers.get("x-real-ip")?.trim() ||
    headers.get("x-vercel-forwarded-for")?.trim() ||
    ""
  );
}

function hashVisitor(ip: string, ua: string): string {
  const salt =
    process.env.SCAN_STATS_SECRET?.trim() ||
    process.env.UPLOAD_SECRET?.trim() ||
    "bcvg-scan";
  return createHash("sha256")
    .update(`${salt}|${ip}|${ua}`)
    .digest("hex")
    .slice(0, 16);
}

function titleCase(value: string): string {
  if (!value) return "Unknown";
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function countryName(code: string): string {
  if (!code) return "Unknown";
  try {
    return (
      new Intl.DisplayNames(["en"], { type: "region" }).of(code.toUpperCase()) ||
      code.toUpperCase()
    );
  } catch {
    return code.toUpperCase();
  }
}

function isPrefetch(headers: Headers): boolean {
  return (
    headers.get("next-router-prefetch") === "1" ||
    headers.get("x-middleware-prefetch") === "1"
  );
}

function isCrawler(uaString: string, isBot: boolean): boolean {
  if (/iphone|ipad|android|mobile/i.test(uaString)) return false;
  return (
    isBot ||
    /(googlebot|bingbot|slurp|duckduckbot|baiduspider|yandex|bytespider|semrush|ahrefs|facebookexternalhit|twitterbot)/i.test(
      uaString,
    )
  );
}

export function buildQrScanEvent(
  headers: Headers,
  destination: string | null,
): QrScanEvent | null {
  if (isPrefetch(headers)) return null;
  const uaString = headers.get("user-agent") || "";
  const ua = userAgentFromString(uaString);
  if (isCrawler(uaString, ua.isBot)) return null;

  const device =
    ua.device.type === "mobile"
      ? "Phone"
      : ua.device.type === "tablet"
        ? "Tablet"
        : ua.device.type
          ? titleCase(ua.device.type)
          : "Desktop";

  return {
    id: randomUUID(),
    at: new Date().toISOString(),
    environment: process.env.VERCEL_ENV?.trim() || "local",
    destination,
    city: titleCase(decodeHeader(headers.get("x-vercel-ip-city"))),
    region: decodeHeader(headers.get("x-vercel-ip-country-region")).toUpperCase(),
    country: decodeHeader(headers.get("x-vercel-ip-country")).toUpperCase(),
    latitude: decodeHeader(headers.get("x-vercel-ip-latitude")),
    longitude: decodeHeader(headers.get("x-vercel-ip-longitude")),
    timezone: decodeHeader(headers.get("x-vercel-ip-timezone")),
    device,
    os: ua.os.name || "Unknown",
    browser: ua.browser.name || "Unknown",
    language: (headers.get("accept-language") || "").split(",")[0]?.trim() || "",
    referer: headers.get("referer") || "",
    visitorKey: hashVisitor(clientIp(headers), uaString),
  };
}

async function readLocalEvents(): Promise<QrScanEvent[]> {
  try {
    const raw = await readFile(LOCAL_STORE, "utf8");
    const parsed = JSON.parse(raw) as QrScanEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLocalEvent(event: QrScanEvent): Promise<void> {
  await mkdir(path.dirname(LOCAL_STORE), { recursive: true });
  const events = await readLocalEvents();
  events.push(event);
  await writeFile(LOCAL_STORE, JSON.stringify(events, null, 2));
}

export async function recordQrScan(event: QrScanEvent): Promise<void> {
  const body = JSON.stringify(event);
  const key = `${QR_SCAN_PREFIX}${event.at.slice(0, 10)}/${event.id}.json`;
  const r2 = getR2WriteContext();
  if (r2) {
    await r2.client.send(
      new PutObjectCommand({
        Bucket: r2.bucket,
        Key: key,
        Body: body,
        ContentType: "application/json",
      }),
    );
    return;
  }
  if (process.env.VERCEL) {
    throw new Error("R2 is not configured; cannot store QR scans on Vercel");
  }
  await writeLocalEvent(event);
}

export async function recordQrScanFromHeaders(
  headers: Headers,
  destination: string | null,
): Promise<void> {
  try {
    const event = buildQrScanEvent(headers, destination);
    if (!event) return;
    await recordQrScan(event);
  } catch (error) {
    console.error("QR scan tracking failed:", error);
  }
}

async function listR2Events(): Promise<QrScanEvent[]> {
  const r2 = getR2WriteContext();
  if (!r2) return [];
  const events: QrScanEvent[] = [];
  let token: string | undefined;
  do {
    const page = await r2.client.send(
      new ListObjectsV2Command({
        Bucket: r2.bucket,
        Prefix: QR_SCAN_PREFIX,
        ContinuationToken: token,
      }),
    );
    for (const object of page.Contents ?? []) {
      if (!object.Key) continue;
      try {
        const file = await r2.client.send(
          new GetObjectCommand({ Bucket: r2.bucket, Key: object.Key }),
        );
        const text = await file.Body?.transformToString();
        if (!text) continue;
        const parsed = JSON.parse(text) as QrScanEvent;
        if (parsed?.id && parsed.at) events.push(parsed);
      } catch {
        // Skip a broken event file and keep reading the rest.
      }
    }
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (token);
  return events;
}

export async function loadQrScanEvents(): Promise<QrScanEvent[]> {
  if (getR2WriteContext()) {
    try {
      return await listR2Events();
    } catch (error) {
      console.error("QR scan list failed:", error);
      return [];
    }
  }
  if (process.env.VERCEL) return [];
  return readLocalEvents();
}

function startOfLocalDay(now: Date): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function countBy(items: string[]): { name: string; count: number }[] {
  const map = new Map<string, number>();
  for (const item of items) {
    const name = item || "Unknown";
    map.set(name, (map.get(name) || 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getQrScanStats(): Promise<QrScanStats> {
  const events = (await loadQrScanEvents()).sort(
    (a, b) => Date.parse(b.at) - Date.parse(a.at),
  );
  const now = new Date();
  const todayStart = startOfLocalDay(now).getTime();
  const weekStart = todayStart - 6 * DAY_MS;
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  const byDay: QrScanStats["byDay"] = [];
  for (let i = 13; i >= 0; i -= 1) {
    const day = new Date(todayStart - i * DAY_MS);
    const key = day.toISOString().slice(0, 10);
    byDay.push({
      date: key,
      label: day.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      count: 0,
    });
  }
  const dayIndex = new Map(byDay.map((row, index) => [row.date, index]));
  const unique = new Set<string>();

  for (const event of events) {
    unique.add(event.visitorKey);
    const idx = dayIndex.get(event.at.slice(0, 10));
    if (idx !== undefined) byDay[idx].count += 1;
  }

  return {
    total: events.length,
    unique: unique.size,
    today: events.filter((event) => Date.parse(event.at) >= todayStart).length,
    week: events.filter((event) => Date.parse(event.at) >= weekStart).length,
    month: events.filter((event) => Date.parse(event.at) >= monthStart).length,
    lastScanAt: events[0]?.at ?? null,
    byDay,
    byCountry: countBy(
      events.map((event) => countryName(event.country)),
    ).slice(0, 8),
    byCity: countBy(
      events.map((event) => {
        const city = event.city && event.city !== "Unknown" ? event.city : "Unknown";
        const country = event.country ? ` (${event.country})` : "";
        return `${city}${country}`;
      }),
    ).slice(0, 8),
    byDevice: countBy(events.map((event) => event.device)),
    byOs: countBy(events.map((event) => event.os)),
    recent: events.slice(0, 25),
  };
}

export function statsPassword(): string {
  return (
    process.env.SCAN_STATS_SECRET?.trim() ||
    process.env.UPLOAD_SECRET?.trim() ||
    ""
  );
}

export function statsCookieValue(): string {
  const secret = statsPassword();
  if (!secret) return "";
  return createHash("sha256").update(`bcvg-scan-stats|${secret}`).digest("hex");
}

export function isValidStatsPassword(password: string): boolean {
  const expected = statsPassword();
  if (!expected || !password) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function hasValidStatsCookie(value: string | undefined): boolean {
  const expected = statsCookieValue();
  if (!expected || !value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function formatScanTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function placeLabel(event: QrScanEvent): string {
  const city = event.city && event.city !== "Unknown" ? event.city : "";
  const country = countryName(event.country);
  if (city && country !== "Unknown") return `${city}, ${country}`;
  if (city) return city;
  if (country !== "Unknown") return country;
  return "Unknown location";
}
