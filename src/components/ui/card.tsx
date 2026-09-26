import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { revealProps } from "./reveal";

type CardProps = ComponentProps<"div"> & {
  index?: number;
  tone?: "light" | "dark";
  lift?: boolean;
  flush?: boolean;
};

export function Card({
  index,
  tone = "light",
  lift = true,
  flush = false,
  className,
  style,
  ...props
}: CardProps) {
  const reveal = index === undefined ? undefined : revealProps(index);
  return (
    <div
      {...props}
      {...reveal}
      style={{ ...reveal?.style, ...style }}
      className={cn(
        "group rounded-card border transition-[translate,box-shadow,border-color] duration-200",
        !flush && "p-[22px]",
        tone === "light" ? "border-line bg-white" : "border-navy-border bg-navy-card text-white",
        lift && "hover:shadow-lift hover:-translate-y-1 motion-reduce:hover:translate-y-0",
        className,
      )}
    />
  );
}
