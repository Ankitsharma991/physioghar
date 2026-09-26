import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./eyebrow";
import { revealProps } from "./reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      {...revealProps()}
      className={cn(
        "flex max-w-[680px] flex-col gap-3",
        align === "center" ? "mx-auto items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2 className={tone === "dark" ? "text-white" : undefined}>{title}</h2>
      {lede && <p className={cn("lede", tone === "dark" && "text-white/70")}>{lede}</p>}
    </div>
  );
}
