export async function submitContactForm(
  form: HTMLFormElement,
  source: string,
) {
  const data = Object.fromEntries(new FormData(form).entries());
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, source }),
  });
  if (!res.ok) {
    const payload = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(payload?.error || "Could not send the message.");
  }
}
