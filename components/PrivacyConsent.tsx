import Link from "next/link";
import { PRIVACY_PATH } from "@/lib/contact";

/**
 * Required opt-in for calls, texts, and email.
 *
 * The checkbox is `required`, so the browser blocks submission until it is
 * ticked, and the value rides along in the FormData as proof of consent.
 */
export function PrivacyConsent({
  id,
  tone = "dark",
  className = "",
}: {
  id: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const isDark = tone === "dark";
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 ${className}`.trim()}
      htmlFor={id}
    >
      <input
        id={id}
        type="checkbox"
        name="privacy_consent"
        value="yes"
        required
        className={`mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border accent-[var(--v02-gold)] ${
          isDark
            ? "border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)]"
            : "border-[var(--v02-line)] bg-white"
        }`}
      />
      <span
        className={`text-xs leading-relaxed ${
          isDark ? "text-slate-400" : "text-slate-600"
        }`}
      >
        I agree to be contacted by The Blue Collar Video Guys at the phone
        number and email I provided, by call, text message, and email, for
        communication and marketing purposes. Message and data rates may apply.
        Message frequency varies. Reply STOP to opt out. I have read the{" "}
        <Link
          href={PRIVACY_PATH}
          target="_blank"
          className={`font-semibold underline underline-offset-2 transition ${
            isDark
              ? "text-[var(--v02-gold)] hover:text-[var(--v02-gold-hot)]"
              : "text-[var(--v02-gold-deep)] hover:text-[var(--v02-ink)]"
          }`}
        >
          Privacy Policy
        </Link>
        .
        <span className="text-[var(--v02-gold)]"> *</span>
      </span>
    </label>
  );
}
