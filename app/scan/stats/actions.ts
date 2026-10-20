"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SCAN_STATS_COOKIE,
  isValidStatsPassword,
  statsCookieValue,
} from "@/lib/qr-tracking";

export async function unlockScanStats(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!isValidStatsPassword(password)) {
    redirect("/scan/stats?error=1");
  }

  const jar = await cookies();
  jar.set(SCAN_STATS_COOKIE, statsCookieValue(), {
    httpOnly: true,
    secure: process.env.VERCEL === "1",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/scan/stats",
  });
  redirect("/scan/stats");
}
