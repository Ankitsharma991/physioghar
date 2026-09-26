import { z } from "zod";
import { projectTypes } from "./project-types";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Name is too long."),
  email: z.email("Enter a valid email address.").max(120, "Email is too long."),
  subject: z
    .string()
    .trim()
    .min(3, "Add a short subject.")
    .max(120, "Subject is too long.")
    .refine((v) => !/[\r\n]/.test(v), "Subject must be a single line."),
  projectType: z.enum(projectTypes, { error: "Choose a project type." }),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more, at least 10 characters.")
    .max(2000, "Message is too long, please keep it under 2000 characters."),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export function firstErrors(error: z.ZodError<ContactInput>): ContactErrors {
  const flat = z.flattenError(error).fieldErrors;
  const out: ContactErrors = {};
  for (const key of Object.keys(flat) as (keyof ContactInput)[]) {
    const first = flat[key]?.[0];
    if (first) out[key] = first;
  }
  return out;
}
