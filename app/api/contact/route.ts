import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO_EMAIL?.trim();
const FROM =
  "Blue Collar Video Guys <onboarding@resend.dev>";

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
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font:600 13px/1.4 system-ui,sans-serif;color:#64748b;width:180px">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font:14px/1.5 system-ui,sans-serif;color:#0f172a">${escapeHtml(value).replaceAll("\n", "<br/>")}</td></tr>`;
}

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !TO) {
    return NextResponse.json(
      { error: "Contact email is not configured." },
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
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const source = text(body.source) || "Website";
  const html = `
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;max-width:640px">
      ${row("Source", source)}
      ${row("Name", text(body.name))}
      ${row("Company", text(body.company_name))}
      ${row("Email", email)}
      ${row("Phone", text(body.phone))}
      ${row("Website / social", text(body.website))}
      ${row("Marketing goal", text(body.marketing_goal))}
      ${row("Target audience", text(body.target_audience))}
      ${row("Offer", text(body.business_offer))}
      ${row("Monthly budget", text(body.monthly_budget))}
      ${row("Message", text(body.message))}
    </table>
  `;

  const resend = new Resend(key);
  const subject = `${source} — new inquiry from ${text(body.company_name) || text(body.name) || email}`;
  const stamp = Date.now();

  const send = (to: string, idempotencyKey: string) =>
    resend.emails.send(
      {
        from: FROM,
        to: [to],
        replyTo: email,
        subject,
        html,
      },
      { idempotencyKey },
    );

  let { error } = await send(TO, `contact/${email}/${stamp}`);

  if (error?.message?.includes("only send testing emails")) {
    const allowed = error.message.match(/\(([^)\s]+@[^)\s]+)\)/)?.[1];
    if (allowed && allowed.toLowerCase() !== TO.toLowerCase()) {
      ({ error } = await send(allowed, `contact-fallback/${email}/${stamp}`));
    }
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
