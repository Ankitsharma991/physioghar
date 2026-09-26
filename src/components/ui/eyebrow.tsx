import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

export function Eyebrow({ children, tone = "light", className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "eyebrow rounded-pill inline-flex items-center border px-3 py-1",
        tone === "light"
          ? "border-primary/25 text-primary-dark bg-white/80"
          : "border-gold/30 bg-gold/10 text-gold",
        className,
      )}
    >
      {children}
    </span>
  );
}
