import { describeSmsConsent, type SmsConsent } from "@/lib/contact";

const API_URL = "https://services.leadconnectorhq.com";
const API_VERSION = "2021-07-28";

export type WebsiteLead = {
  source: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  message: string;
  trade: string;
  marketingGoal: string;
  targetAudience: string;
  businessOffer: string;
  monthlyBudget: string;
  landingPage: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  adClick: string;
  smsConsent: SmsConsent;
  consentedAt: string;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function splitName(full: string) {
  const parts = full.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { firstName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/** US 10-digit numbers become +1. Other values are sent as typed. */
function toE164(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (phone.startsWith("+") && digits.length >= 8) return `+${digits}`;
  return phone;
}

function sourceTag(source: string) {
  const value = source.toLowerCase();
  if (value.includes("qr")) return "QR scan";
  if (value.includes("contact")) return "Contact page";
  if (value.includes("homepage")) return "Homepage";
  if (value.includes("landing") || value.includes("/lp/")) return "Ad landing page";
  return source.slice(0, 60);
}

function leadTags(lead: WebsiteLead) {
  const tags = ["Website lead", sourceTag(lead.source)];
  if (lead.smsConsent.declined) tags.push("SMS declined");
  if (lead.smsConsent.customerCare) tags.push("SMS customer care");
  if (lead.smsConsent.marketing) tags.push("SMS marketing");
  if (lead.trade) tags.push(lead.trade.slice(0, 40));
  return [...new Set(tags)];
}

function noteBody(lead: WebsiteLead) {
  const lines = [
    ["Source", lead.source],
    ["Company", lead.company],
    ["Phone", lead.phone],
    ["Website", lead.website],
    ["Trade", lead.trade],
    ["Marketing goal", lead.marketingGoal],
    ["Target audience", lead.targetAudience],
    ["Offer", lead.businessOffer],
    ["Monthly budget", lead.monthlyBudget],
    ["Message", lead.message],
    ["SMS consent", describeSmsConsent(lead.smsConsent, lead.consentedAt)],
    ["Landing page", lead.landingPage],
    ["UTM source", lead.utmSource],
    ["UTM medium", lead.utmMedium],
    ["UTM campaign", lead.utmCampaign],
    ["UTM term", lead.utmTerm],
    ["Ad click", lead.adClick],
  ];
  return lines
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}

export function leadFromBody(
  body: Record<string, unknown>,
  smsConsent: SmsConsent,
  consentedAt: string,
  sourceFallback: string,
): WebsiteLead {
  return {
    source: text(body.source) || sourceFallback,
    name: text(body.name),
    company: text(body.company_name),
    email: text(body.email),
    phone: text(body.phone),
    website: text(body.website),
    message: text(body.message),
    trade: text(body.trade),
    marketingGoal: text(body.marketing_goal),
    targetAudience: text(body.target_audience),
    businessOffer: text(body.business_offer),
    monthlyBudget: text(body.monthly_budget),
    landingPage: text(body.landing_page),
    utmSource: text(body.utm_source),
    utmMedium: text(body.utm_medium),
    utmCampaign: text(body.utm_campaign),
    utmTerm: text(body.utm_term),
    adClick: text(body.gclid) ? "Google Ads" : text(body.fbclid) ? "Meta Ads" : "",
    smsConsent,
    consentedAt,
  };
}

type GhlPayload = {
  contact?: { id?: string };
  id?: string;
  message?: unknown;
};

async function ghl(token: string, path: string, body: unknown) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: API_VERSION,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => ({}))) as GhlPayload;
  if (!response.ok) {
    const message =
      typeof payload.message === "string" ? payload.message : response.statusText;
    throw new Error(`GoHighLevel ${response.status}: ${message}`);
  }
  return payload;
}

/**
 * Create or update a contact, then add tags and a note.
 * Tags are added on their own endpoint because the upsert tags field replaces every existing tag.
 * Missing credentials or an API error is logged and does not throw, so the inquiry email still sends.
 */
export async function syncLeadToGoHighLevel(lead: WebsiteLead) {
  const token = process.env.GOHIGHLEVEL_API_TOKEN?.trim();
  const locationId = process.env.GOHIGHLEVEL_LOCATION_ID?.trim();
  if (!token || !locationId) {
    console.warn("GoHighLevel is not configured. This lead was emailed only.");
    return;
  }

  try {
    const phone = lead.phone ? toE164(lead.phone) : undefined;
    const created = await ghl(token, "/contacts/upsert", {
      locationId,
      email: lead.email,
      ...splitName(lead.name),
      ...(lead.company ? { companyName: lead.company } : {}),
      ...(phone ? { phone } : {}),
      ...(lead.website ? { website: lead.website } : {}),
      source: lead.source.slice(0, 200),
      ...(lead.smsConsent.declined
        ? {
            inboundDndSettings: {
              SMS: {
                status: "active",
                message: "Declined text messages on the website",
              },
            },
          }
        : {}),
    });

    const contactId = created.contact?.id || created.id;
    if (!contactId) {
      throw new Error("GoHighLevel upsert did not return a contact id.");
    }

    await ghl(token, `/contacts/${contactId}/tags`, { tags: leadTags(lead) });
    await ghl(token, `/contacts/${contactId}/notes`, {
      body: noteBody(lead),
    });
  } catch (error) {
    console.error(
      "GoHighLevel sync failed:",
      error instanceof Error ? error.message : error,
    );
  }
}
