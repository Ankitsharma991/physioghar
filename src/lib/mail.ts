import type { ContactInput } from "./contact";

export async function sendContactMessage(input: ContactInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Project type: ${input.projectType}`,
    "",
    input.message,
  ].join("\n");

  if (!apiKey || !to || !from) {
    console.warn(
      "[contact] RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is missing, so this message was not emailed:\n" +
        `Subject: ${input.subject}\n${text}`,
    );
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: input.email,
      subject: `[Website] ${input.subject}`,
      text,
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Email provider responded with ${response.status}`);
  }
}
