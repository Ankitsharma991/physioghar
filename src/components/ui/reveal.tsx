import type { ComponentProps, CSSProperties, ElementType } from "react";

export function revealProps(index = 0) {
  return {
    "data-reveal-item": "",
    style: { "--reveal-delay": `${Math.min(index, 6) * 70}ms` } as CSSProperties,
  };
}

type RevealProps<T extends ElementType> = { as?: T; index?: number } & Omit<
  ComponentProps<T>,
  "as" | "index"
>;

export function Reveal<T extends ElementType = "div">({
  as,
  index = 0,
  style,
  ...props
}: RevealProps<T>) {
  const Tag: ElementType = as ?? "div";
  const reveal = revealProps(index);
  return <Tag {...props} {...reveal} style={{ ...reveal.style, ...style }} />;
}
