"use client";

import Link from "next/link";
import { useEffect, useRef, type ChangeEvent } from "react";
import { PHONE_DISPLAY, PRIVACY_PATH, PRIVACY_URL } from "@/lib/contact";

const OPTIONS = [
  {
    name: "sms_consent_care",
    label:
      "Yes, I consent to receive customer care messages from Blue Collar Video Guys",
  },
  {
    name: "sms_consent_marketing",
    label:
      "Yes, I consent to receive marketing text messages from Blue Collar Video Guys",
  },
  {
    name: "sms_consent_none",
    label:
      "No, I do not want to receive any text messages from Blue Collar Video Guys",
  },
] as const;

const MISSING_CHOICE = "Please choose a texting option.";

/**
 * Carrier-required SMS opt-in: three unchecked boxes plus the required
 * program language. The visitor can accept care, marketing, both, or decline.
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
  const firstBox = useRef<HTMLInputElement>(null);
  const isDark = tone === "dark";
  const boxClass = `mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border accent-[var(--v02-gold)] ${
    isDark
      ? "border-[var(--v02-line-on-dark)] bg-[var(--v02-navy)]"
      : "border-[var(--v02-line)] bg-white"
  }`;
  const labelClass = `text-xs leading-relaxed ${
    isDark ? "text-slate-300" : "text-slate-700"
  }`;
  const noticeClass = `text-xs leading-relaxed ${
    isDark ? "text-slate-400" : "text-slate-600"
  }`;
  const linkClass = `font-semibold underline underline-offset-2 transition ${
    isDark
      ? "text-[var(--v02-gold)] hover:text-[var(--v02-gold-hot)]"
      : "text-[var(--v02-gold-deep)] hover:text-[var(--v02-ink)]"
  }`;

  function syncValidity(form: HTMLFormElement) {
    const care = form.elements.namedItem(
      "sms_consent_care",
    ) as HTMLInputElement | null;
    const marketing = form.elements.namedItem(
      "sms_consent_marketing",
    ) as HTMLInputElement | null;
    const none = form.elements.namedItem(
      "sms_consent_none",
    ) as HTMLInputElement | null;
    if (!care || !marketing || !none) return;
    const any = care.checked || marketing.checked || none.checked;
    care.setCustomValidity(any ? "" : MISSING_CHOICE);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const form = event.currentTarget.form;
    if (!form) return;
    const care = form.elements.namedItem(
      "sms_consent_care",
    ) as HTMLInputElement | null;
    const marketing = form.elements.namedItem(
      "sms_consent_marketing",
    ) as HTMLInputElement | null;
    const none = form.elements.namedItem(
      "sms_consent_none",
    ) as HTMLInputElement | null;
    if (!care || !marketing || !none) return;

    if (event.currentTarget === none && none.checked) {
      care.checked = false;
      marketing.checked = false;
    }
    if (
      (event.currentTarget === care || event.currentTarget === marketing) &&
      event.currentTarget.checked
    ) {
      none.checked = false;
    }
    syncValidity(form);
  }

  useEffect(() => {
    const form = firstBox.current?.form;
    if (form) syncValidity(form);
  }, []);

  return (
    <div className={className.trim()}>
      <fieldset>
        <legend className={`mb-3 ${labelClass}`}>
          Text message consent<span className="text-[var(--v02-gold)]"> *</span>
        </legend>
        <div className="space-y-3">
          {OPTIONS.map((option, index) => (
            <label
              key={option.name}
              htmlFor={`${id}-${option.name}`}
              className="flex cursor-pointer items-start gap-3"
            >
              <input
                ref={index === 0 ? firstBox : undefined}
                id={`${id}-${option.name}`}
                type="checkbox"
                name={option.name}
                value="yes"
                className={boxClass}
                onChange={onChange}
              />
              <span className={labelClass}>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className={`mt-5 space-y-3 ${noticeClass}`}>
        <p>
          Blue Collar Video Guys would like your consent to send customer care
          and/or marketing text message communications from {PHONE_DISPLAY} to
          your mobile number listed above. Customer care messages may include
          responses to messages you send us, as well as information relevant to
          your relationship with us. Marketing messages may include discount
          codes, special deals or texts promoting our products/services.
        </p>
        <p>
          Consent is not a condition of purchase. Message frequency varies.
          Message and data rates may apply. Reply &apos;STOP&apos; to
          unsubscribe at any time. Reply &apos;HELP&apos; for assistance or more
          information.
        </p>
        <p>
          We do not share your mobile opt-in information with anyone. Our
          combined Privacy Policy and Messaging Terms and Conditions are
          available at{" "}
          <Link href={PRIVACY_PATH} target="_blank" className={linkClass}>
            {PRIVACY_URL}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
