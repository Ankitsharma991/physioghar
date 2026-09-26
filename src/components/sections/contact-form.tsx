"use client";

import { CircleCheck, TriangleAlert } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import type { ContactErrors, ContactInput } from "@/lib/contact";
import { projectTypes } from "@/lib/project-types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "sent" | "failed";

const loadValidation = () => import("@/lib/contact");

const controlClass =
  "w-full rounded-card border border-line bg-white px-3.5 py-3 text-[15px] text-ink placeholder:text-muted/70 transition-colors focus:border-primary focus:outline-2 focus:outline-primary/30 aria-[invalid=true]:border-red-600";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[14px] font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[13px] font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");

  const id = (name: string) => `${uid}-${name}`;
  const invalid = (name: keyof ContactInput) => (errors[name] ? true : undefined);
  const describedBy = (name: keyof ContactInput) =>
    errors[name] ? `${id(name)}-error` : undefined;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const { contactSchema, firstErrors } = await loadValidation();
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const found = firstErrors(parsed.error);
      setErrors(found);
      setStatus("idle");
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, company: data.company ?? "" }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
        errors?: ContactErrors;
      };

      if (result.ok) {
        form.reset();
        setStatus("sent");
        return;
      }

      if (result.errors) setErrors(result.errors);
      setNotice(result.message ?? "Please check the highlighted fields.");
      setStatus("failed");
    } catch {
      setNotice("We could not reach the server. Check your connection and try again.");
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-card border-line bg-chip-mint flex flex-col items-start gap-4 border p-8"
      >
        <CircleCheck className="text-primary-dark size-9" aria-hidden="true" />
        <h3>Thanks, your message is on its way</h3>
        <p className="text-muted">
          We read every message and usually reply within one working day. For anything urgent, call
          us and we will pick it up the same day.
        </p>
        <Button variant="ghost" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={loadValidation}
      noValidate
      className="flex flex-col gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={id("name")} label="Name" error={errors.name}>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={invalid("name")}
            aria-describedby={describedBy("name")}
            className={controlClass}
          />
        </Field>
        <Field id={id("email")} label="Email" error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={invalid("email")}
            aria-describedby={describedBy("email")}
            className={controlClass}
          />
        </Field>
      </div>

      <Field id={id("subject")} label="Subject" error={errors.subject}>
        <input
          id={id("subject")}
          name="subject"
          placeholder="What is this about?"
          aria-invalid={invalid("subject")}
          aria-describedby={describedBy("subject")}
          className={controlClass}
        />
      </Field>

      <fieldset
        aria-describedby={describedBy("projectType")}
        className="flex min-w-0 flex-col gap-2.5"
      >
        <legend className="mb-2.5 text-[14px] font-semibold">Project type</legend>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <label key={type} className="cursor-pointer">
              <input type="radio" name="projectType" value={type} className="peer sr-only" />
              <span
                className={cn(
                  "rounded-pill border-line inline-block border bg-white px-4 py-2 text-[14px] font-medium transition-colors",
                  "hover:border-primary peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white",
                  "peer-focus-visible:outline-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2",
                )}
              >
                {type}
              </span>
            </label>
          ))}
        </div>
        {errors.projectType && (
          <p id={`${id("projectType")}-error`} className="text-[13px] font-medium text-red-700">
            {errors.projectType}
          </p>
        )}
      </fieldset>

      <Field id={id("message")} label="Message" error={errors.message}>
        <textarea
          id={id("message")}
          name="message"
          rows={6}
          placeholder="Tell us about your goals, timeline and budget."
          aria-invalid={invalid("message")}
          aria-describedby={describedBy("message")}
          className={cn(controlClass, "resize-y")}
        />
      </Field>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor={id("company")}>Company</label>
        <input id={id("company")} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "failed" && (
        <p
          role="alert"
          className="rounded-card flex items-start gap-2 bg-red-50 px-4 py-3 text-[14px] font-medium text-red-800"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {notice}
        </p>
      )}

      <div>
        <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
          {status === "sending" ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
