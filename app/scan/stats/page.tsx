import type { Metadata } from "next";
import { cookies } from "next/headers";
import { unlockScanStats } from "@/app/scan/stats/actions";
import { BrandLogo } from "@/components/BrandLogo";
import { getR2WriteContext } from "@/lib/r2";
import {
  SCAN_STATS_COOKIE,
  formatScanTime,
  getQrScanStats,
  hasValidStatsCookie,
  placeLabel,
  statsPassword,
  type QrScanStats,
} from "@/lib/qr-tracking";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "QR scan stats | The Blue Collar Video Guys™",
  robots: { index: false, follow: false },
};

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--v02-line)] bg-white px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 v02-display text-4xl font-bold tracking-tight text-[var(--v02-ink)]">
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

function RankList({
  title,
  rows,
}: {
  title: string;
  rows: { name: string; count: number }[];
}) {
  const max = Math.max(1, ...rows.map((row) => row.count));
  return (
    <section className="rounded-2xl border border-[var(--v02-line)] bg-white p-5">
      <h2 className="v02-display text-xl font-bold tracking-tight">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No scans yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {rows.map((row) => (
            <li key={row.name}>
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-medium text-[var(--v02-ink)]">
                  {row.name}
                </span>
                <span className="tabular-nums text-slate-500">{row.count}</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--v02-line)]">
                <div
                  className="h-full rounded-full bg-[var(--v02-gold)]"
                  style={{ width: `${Math.round((row.count / max) * 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function DayChart({ days }: { days: QrScanStats["byDay"] }) {
  const max = Math.max(1, ...days.map((day) => day.count));
  return (
    <section className="rounded-2xl border border-[var(--v02-line)] bg-white p-5">
      <h2 className="v02-display text-xl font-bold tracking-tight">
        Last 14 days
      </h2>
      <div className="mt-6 flex h-40 items-end gap-1.5">
        {days.map((day) => (
          <div
            key={day.date}
            className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2"
          >
            <div
              className="w-full rounded-t bg-[var(--v02-gold)]"
              style={{ height: `${Math.max(4, (day.count / max) * 100)}%` }}
              title={`${day.label}: ${day.count}`}
            />
            <span className="hidden text-[10px] text-slate-400 sm:block">
              {day.label.replace(/^[A-Za-z]+ /, "")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function LoginForm({ error }: { error: boolean }) {
  const configured = Boolean(statsPassword());
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-[var(--v02-paper)] px-6 py-16 text-[var(--v02-ink)]">
      <BrandLogo variant="circular" className="w-24" sizes="96px" />
      <h1 className="mt-8 v02-display text-4xl font-bold tracking-tight">
        QR scan stats
      </h1>
      <p className="mt-3 max-w-sm text-center text-sm text-slate-600">
        Password-protected counts, locations, and devices for the printed
        business-card QR.
      </p>
      <p className="mt-2 text-xs text-slate-500">
        Tracking storage: {getR2WriteContext() ? "connected" : "not connected"}
      </p>
      {configured ? (
        <form action={unlockScanStats} className="mt-8 w-full max-w-xs">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Password
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-[var(--v02-line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--v02-gold-deep)]"
            />
          </label>
          {error ? (
            <p className="mt-2 text-sm text-red-600">That password is wrong.</p>
          ) : null}
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-[var(--v02-gold)] px-5 py-3 text-sm font-semibold text-[var(--v02-ink)]"
          >
            Open dashboard
          </button>
        </form>
      ) : (
        <p className="mt-8 max-w-sm text-center text-sm text-slate-600">
          Set SCAN_STATS_SECRET or UPLOAD_SECRET to unlock this page.
        </p>
      )}
    </main>
  );
}

export default async function ScanStatsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const jar = await cookies();
  const unlocked = hasValidStatsCookie(jar.get(SCAN_STATS_COOKIE)?.value);
  if (!unlocked) {
    return <LoginForm error={params.error === "1"} />;
  }

  const stats = await getQrScanStats();

  return (
    <main className="min-h-dvh bg-[var(--v02-paper)] px-5 py-10 text-[var(--v02-ink)] sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Printed QR · /scan
        </p>
        <h1 className="mt-2 v02-display text-4xl font-bold tracking-tight sm:text-5xl">
          Scan tracking
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Each camera scan hits this site first, then forwards to the website.
          Location is city-level from IP (same as typical QR dashboards), not
          GPS. Bots and page prefetches are skipped.
        </p>
        {!getR2WriteContext() ? (
          <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Tracking storage is not connected on the live server. Add
            R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and
            R2_BUCKET_NAME in Vercel (same keys as video uploads), then
            Redeploy. Until that is set, phone scans cannot be saved.
          </p>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Total scans" value={stats.total} />
          <StatCard label="Unique people" value={stats.unique} />
          <StatCard label="Today" value={stats.today} />
          <StatCard label="This week" value={stats.week} />
          <StatCard
            label="Last scan"
            value={stats.lastScanAt ? formatScanTime(stats.lastScanAt) : "—"}
            hint={stats.month ? `${stats.month} this month` : undefined}
          />
        </div>

        <div className="mt-6">
          <DayChart days={stats.byDay} />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <RankList title="Cities" rows={stats.byCity} />
          <RankList title="Countries" rows={stats.byCountry} />
          <RankList title="Devices" rows={stats.byDevice} />
          <RankList title="Operating systems" rows={stats.byOs} />
        </div>

        <section className="mt-6 overflow-hidden rounded-2xl border border-[var(--v02-line)] bg-white">
          <div className="px-5 py-4">
            <h2 className="v02-display text-xl font-bold tracking-tight">
              Recent scans
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-y border-[var(--v02-line)] bg-[var(--v02-paper)] text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">When</th>
                  <th className="px-5 py-3 font-semibold">Location</th>
                  <th className="px-5 py-3 font-semibold">Device</th>
                  <th className="px-5 py-3 font-semibold">OS</th>
                  <th className="px-5 py-3 font-semibold">Browser</th>
                </tr>
              </thead>
              <tbody>
                {stats.recent.length === 0 ? (
                  <tr>
                    <td
                      className="px-5 py-8 text-slate-500"
                      colSpan={5}
                    >
                      No scans recorded yet. Scan the printed QR or open /scan
                      once to test.
                    </td>
                  </tr>
                ) : (
                  stats.recent.map((event) => (
                    <tr
                      key={event.id}
                      className="border-b border-[var(--v02-line)] last:border-0"
                    >
                      <td className="px-5 py-3 whitespace-nowrap">
                        {formatScanTime(event.at)}
                      </td>
                      <td className="px-5 py-3">{placeLabel(event)}</td>
                      <td className="px-5 py-3">{event.device}</td>
                      <td className="px-5 py-3">{event.os}</td>
                      <td className="px-5 py-3">{event.browser}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
