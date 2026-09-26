import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function DarkSection({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn("section bg-navy text-white", className)}>
      <div className="wrap">{children}</div>
    </section>
  );
}
