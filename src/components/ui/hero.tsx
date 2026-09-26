import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./eyebrow";

type HeroProps = {
  eyebrow: string;
  title: string;
  highlight: string;
  lede: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export function Hero({ eyebrow, title, highlight, lede, align = "left", children }: HeroProps) {
  const at = title.indexOf(highlight);
  const before = at === -1 ? title : title.slice(0, at);
  const after = at === -1 ? "" : title.slice(at + highlight.length);
  const centered = align === "center";

  return (
    <header className="bg-hero section-hero">
      <div className="wrap">
        <div
          className={cn(
            "flex max-w-[720px] flex-col gap-5",
            centered ? "mx-auto items-center text-center" : "items-start",
          )}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>
            {before}
            {at !== -1 && <span className="text-gradient">{highlight}</span>}
            {after}
          </h1>
          <p className="lede max-w-[660px]">{lede}</p>
        </div>
        {children}
      </div>
    </header>
  );
}
