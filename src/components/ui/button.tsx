import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "white" | "outline-light";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button border px-6 py-[13px] text-[15px] font-semibold leading-none transition-[background-color,border-color,color,translate,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "border-primary bg-primary text-white hover:border-primary-dark hover:bg-primary-dark",
  ghost: "border-line bg-white text-ink hover:border-primary hover:text-primary-dark",
  white: "border-white bg-white text-primary-dark hover:bg-chip-mint",
  "outline-light": "border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant, className, ...props }: ButtonLinkProps) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />;
}
