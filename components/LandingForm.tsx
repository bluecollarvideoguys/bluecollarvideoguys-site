"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { PrivacyConsent } from "@/components/PrivacyConsent";
import { CONTACT_CONFIRMATION_PATH, submitContactForm } from "@/lib/submit-contact";

const inputClass =
  "mt-2 w-full rounded-xl border border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[var(--v02-gold)]";
const labelClass = "text-xs font-semibold uppercase tracking-[0.12em] text-slate-300";

/** Short lead form for ad landing pages. Uses the same API, consent, and tracking as the site forms. */
export function LandingForm({
  id,
  headline,
  source,
  trades,
  defaultTrade,
}: {
  id: string;
  headline: string;
  source: string;
  trades: string[];
  defaultTrade?: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const trade = (form.elements.namedItem("trade") as HTMLSelectElement | null)?.value;
    const msg = form.elements.namedItem("message") as HTMLInputElement | null;
    if (msg) msg.value = `Trade: ${trade || "Not specified"}. Came from ad landing page: ${source}.`;
    setStatus("sending");
    try {
      await submitContactForm(form, source);
      router.replace(CONTACT_CONFIRMATION_PATH);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className="scroll-mt-24 rounded-2xl border border-[var(--v02-line-on-dark)] bg-[var(--v02-ink)] p-6 sm:p-7"
    >
      <h2 className="v02-display text-2xl font-bold tracking-tight text-white sm:text-3xl">{headline}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Name</span>
          <input name="name" required autoComplete="name" className={inputClass} placeholder="Your name" />
        </label>
        <label className="block">
          <span className={labelClass}>Company</span>
          <input name="company_name" required autoComplete="organization" className={inputClass} placeholder="Company name" />
        </label>
        <label className="block">
          <span className={labelClass}>Phone</span>
          <input type="tel" name="phone" required autoComplete="tel" className={inputClass} placeholder="000-000-0000" />
        </label>
        <label className="block">
          <span className={labelClass}>Email</span>
          <input type="email" name="email" required autoComplete="email" className={inputClass} placeholder="you@company.com" />
        </label>
      </div>
      <label className="mt-4 block">
        <span className={labelClass}>Your trade</span>
        <select name="trade" defaultValue={defaultTrade ?? ""} className={inputClass}>
          <option value="">Choose one</option>
          {trades.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </label>
      <input type="hidden" name="message" />
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />
      <PrivacyConsent id={`${id}-consent`} className="mt-5 border-t border-[var(--v02-line-on-dark)] pt-5" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 w-full rounded-full bg-[var(--v02-gold)] px-6 py-4 text-base font-semibold text-[var(--v02-ink)] transition hover:bg-[var(--v02-gold-hot)] disabled:opacity-70"
      >
        {status === "sending" ? "Sending..." : "Get My Free Blueprint Call"}
      </button>
      <p className="mt-3 text-center text-xs text-slate-400">
        {status === "error"
          ? "Could not send. Call us or email build@bluecollarvideoguys.com."
          : "We respond within one business day."}
      </p>
    </form>
  );
}
