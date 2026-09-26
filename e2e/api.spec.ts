import { expect, test } from "@playwright/test";

const valid = {
  name: "Asha Gurung",
  email: "asha@example.com",
  subject: "Website rebuild",
  projectType: "Software Development",
  message: "We need a new booking website for our clinic.",
};

let counter = 0;
const ip = () => ({ "x-forwarded-for": `10.20.30.${++counter}` });

test.describe("POST /api/contact", () => {
  test("accepts a valid message", async ({ request }) => {
    const res = await request.post("/api/contact", { data: valid, headers: ip() });
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(res.headers()["cache-control"]).toBe("no-store");
  });

  test("rejects invalid fields with per-field errors", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { ...valid, name: "A", email: "nope", projectType: "Bad", message: "short" },
      headers: ip(),
    });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(Object.keys(body.errors).sort()).toEqual(["email", "message", "name", "projectType"]);
  });

  test("rejects a subject with a line break", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { ...valid, subject: "Hi\nBcc: x@y.z" },
      headers: ip(),
    });
    expect(res.status()).toBe(422);
  });

  test("rejects malformed JSON, wrong content type and oversized bodies", async ({ request }) => {
    const bad = await request.post("/api/contact", {
      data: Buffer.from("{oops"),
      headers: { ...ip(), "content-type": "application/json" },
    });
    expect(bad.status()).toBe(400);
    const wrong = await request.post("/api/contact", {
      data: "hello",
      headers: { ...ip(), "content-type": "text/plain" },
    });
    expect(wrong.status()).toBe(415);
    const huge = await request.post("/api/contact", {
      data: { ...valid, message: "a".repeat(11_000) },
      headers: ip(),
    });
    expect(huge.status()).toBe(413);
  });

  test("rejects cross-origin requests", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: valid,
      headers: { ...ip(), origin: "https://evil.example" },
    });
    expect(res.status()).toBe(403);
    const nullOrigin = await request.post("/api/contact", {
      data: valid,
      headers: { ...ip(), origin: "null" },
    });
    expect(nullOrigin.status()).toBe(403);
  });

  test("silently discards honeypot submissions", async ({ request }) => {
    const res = await request.post("/api/contact", {
      data: { ...valid, company: "Spam Ltd" },
      headers: ip(),
    });
    expect(res.status()).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });

  test("only allows POST", async ({ request }) => {
    expect((await request.get("/api/contact")).status()).toBe(405);
  });

  test("rate limits after five messages from one address", async ({ request }) => {
    const headers = { "x-forwarded-for": "172.16.99.99" };
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) {
      statuses.push((await request.post("/api/contact", { data: valid, headers })).status());
    }
    expect(statuses).toEqual([200, 200, 200, 200, 200, 429, 429]);
  });
});
