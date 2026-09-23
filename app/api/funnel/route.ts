import { readFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CALENDLY_URL } from "@/lib/calendly";
import { PHONE_DISPLAY } from "@/lib/contact";
import { FUNNEL_PDF_FILENAME, FUNNEL_PDF_RELATIVE_PATH } from "@/lib/funnel";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO_EMAIL?.trim();
const FROM = "Blue Collar Video Guys <onboarding@resend.dev>";

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font:600 13px/1.4 Inter,system-ui,sans-serif;color:#64748b;width:180px">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font:14px/1.5 Inter,system-ui,sans-serif;color:#0f172a">${escapeHtml(value)}</td></tr>`;
}

async function loadPdf() {
  try {
    const content = await readFile(
      join(process.cwd(), FUNNEL_PDF_RELATIVE_PATH),
    );
    if (!content.length) return null;
    return {
      filename: FUNNEL_PDF_FILENAME,
      content,
      contentType: "application/pdf" as const,
    };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !TO) {
    return NextResponse.json(
      { error: "Funnel email is not configured." },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (text(body._honey)) {
    return NextResponse.json({ ok: true });
  }

  const email = text(body.email);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "A valid email is required." },
      { status: 400 },
    );
  }

  // Carrier rules require proof of express consent, so never accept a
  // submission that skipped the checkbox even if the client was bypassed.
  if (text(body.privacy_consent) !== "yes") {
    return NextResponse.json(
      { error: "Please accept the Privacy Policy to continue." },
      { status: 400 },
    );
  }

  const name = text(body.name);
  const company = text(body.company_name);
  const phone = text(body.phone);
  const trade = text(body.trade);
  const consentedAt = new Date().toISOString();
  const stamp = Date.now();
  const resend = new Resend(key);
  const pdf = await loadPdf();

  const internalHtml = `
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;max-width:640px">
      ${row("Source", "QR scan funnel")}
      ${row("Name", name)}
      ${row("Company", company)}
      ${row("Email", email)}
      ${row("Phone", phone)}
      ${row("Trade", trade)}
      ${row(
        "Consent",
        `Accepted calls, texts, and email + Privacy Policy on ${consentedAt}`,
      )}
    </table>
  `;

  const packetNote = pdf
    ? "Your pricing packet is attached."
    : "Your pricing packet is being finalized. Reply to this email if you need it sooner.";

  const clientHtml = `
    <div style="background:#0d1520;padding:32px 20px;font-family:Inter,system-ui,sans-serif;color:#f5f5f2">
      <img src="https://www.bluecollarvideoguys.com/brand/compact-horizontal.png" alt="The Blue Collar Video Guys" width="220" height="62" style="display:block;margin:0 0 20px;width:220px;height:auto;border:0" />
      <h1 style="margin:0 0 16px;font:700 28px/1.1 'Barlow Condensed',sans-serif;color:#ffffff">Your Blueprint packet is on the way.</h1>
      <p style="margin:0 0 20px;font:16px/1.5 Inter,system-ui,sans-serif;color:#94a3b8">${escapeHtml(packetNote)} Book the discovery call when you are ready.</p>
      <p style="margin:0 0 28px">
        <a href="${CALENDLY_URL}" style="display:inline-block;background:#f2ae26;color:#16202d;text-decoration:none;font:600 15px/1 Inter,system-ui,sans-serif;padding:14px 22px;border-radius:999px">Book a Discovery Call</a>
      </p>
      <p style="margin:0;font:14px/1.5 Inter,system-ui,sans-serif;color:#94a3b8">Questions? Call ${PHONE_DISPLAY} or reply to this email.</p>
    </div>
  `;

  const send = (
    to: string,
    subject: string,
    html: string,
    idempotencyKey: string,
    attachments?: { filename: string; content: Buffer; contentType: string }[],
  ) =>
    resend.emails.send(
      {
        from: FROM,
        to: [to],
        replyTo: to === TO ? email : TO,
        subject,
        html,
        ...(attachments?.length ? { attachments } : {}),
      },
      { idempotencyKey },
    );

  let { error: internalError } = await send(
    TO,
    `QR scan lead: ${company || name || email}`,
    internalHtml,
    `funnel-internal/${email}/${stamp}`,
  );

  if (internalError?.message?.includes("only send testing emails")) {
    const allowed = internalError.message.match(/\(([^)\s]+@[^)\s]+)\)/)?.[1];
    if (allowed && allowed.toLowerCase() !== TO.toLowerCase()) {
      ({ error: internalError } = await send(
        allowed,
        `QR scan lead: ${company || name || email}`,
        internalHtml,
        `funnel-internal-fallback/${email}/${stamp}`,
      ));
    }
  }

  if (internalError) {
    return NextResponse.json(
      { error: internalError.message },
      { status: 502 },
    );
  }

  const clientAttachments = pdf ? [pdf] : undefined;
  let { error: clientError } = await send(
    email,
    "Your Blue Collar Blueprint packet",
    clientHtml,
    `funnel-pdf/${email}/${stamp}`,
    clientAttachments,
  );

  if (clientError?.message?.includes("only send testing emails")) {
    clientError = null;
  }

  if (clientError) {
    console.error("Funnel client email failed:", clientError.message);
  }

  return NextResponse.json({ ok: true });
}
