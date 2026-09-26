import { NextResponse } from "next/server";
import { contactSchema, firstErrors } from "@/lib/contact";
import { sendContactMessage } from "@/lib/mail";
import { rateLimit } from "@/lib/rate-limit";

const MAX_BODY = 10_000;
const headers = { "Cache-Control": "no-store" };

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

function reply(body: Record<string, unknown>, status: number, extra?: HeadersInit) {
  return NextResponse.json(body, { status, headers: { ...headers, ...extra } });
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return reply({ ok: false, message: "Request not allowed." }, 403);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return reply({ ok: false, message: "Unsupported content type." }, 415);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const limit = rateLimit(ip, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return reply(
      { ok: false, message: "Too many messages. Please try again in a few minutes." },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) {
    return reply({ ok: false, message: "Message is too large." }, 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return reply({ ok: false, message: "Invalid request." }, 400);
  }

  if (typeof payload === "object" && payload !== null && "company" in payload && payload.company) {
    return reply({ ok: true }, 200);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return reply({ ok: false, errors: firstErrors(parsed.error) }, 422);
  }

  try {
    await sendContactMessage(parsed.data);
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return reply(
      { ok: false, message: "We could not send your message. Please email us directly." },
      502,
    );
  }

  return reply({ ok: true }, 200);
}
