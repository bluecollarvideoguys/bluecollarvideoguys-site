export const PHONE_DISPLAY = "(530) 500-0201";
export const PHONE_HREF = "tel:+15305000201";

/** Address published in the privacy policy for HELP and privacy requests. */
export const SUPPORT_EMAIL = "bluecollarvideoguys@gmail.com";

export const SITE_ORIGIN = "https://www.bluecollarvideoguys.com";
export const PRIVACY_PATH = "/privacy";
export const PRIVACY_URL = `${SITE_ORIGIN}${PRIVACY_PATH}`;

export type SmsConsent = {
  customerCare: boolean;
  marketing: boolean;
  declined: boolean;
};

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

/** Parse the three SMS opt-in checkboxes. Returns null if the visitor skipped them. */
export function parseSmsConsent(body: Record<string, unknown>): SmsConsent | null {
  const customerCare = asText(body.sms_consent_care) === "yes";
  const marketing = asText(body.sms_consent_marketing) === "yes";
  const declined = asText(body.sms_consent_none) === "yes";

  if (!customerCare && !marketing && !declined) return null;
  if (declined) {
    return { customerCare: false, marketing: false, declined: true };
  }
  return { customerCare, marketing, declined: false };
}

export function describeSmsConsent(consent: SmsConsent, at: string) {
  if (consent.declined) {
    return `Declined all text messages on ${at}`;
  }
  const parts = [
    consent.customerCare ? "customer care" : null,
    consent.marketing ? "marketing" : null,
  ].filter(Boolean);
  return `Opted in to ${parts.join(" and ")} text messages on ${at}`;
}
