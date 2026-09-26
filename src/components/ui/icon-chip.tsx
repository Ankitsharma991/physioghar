import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const tones = [
  "bg-chip-mint",
  "bg-chip-teal",
  "bg-chip-gold",
  "bg-chip-lilac",
  "bg-chip-pink",
] as const;

type IconChipProps = {
  icon: LucideIcon;
  index?: number;
  size?: "md" | "lg";
  className?: string;
};

export function IconChip({ icon: Icon, index = 0, size = "md", className }: IconChipProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "rounded-chip text-primary-dark inline-flex shrink-0 items-center justify-center transition-transform duration-200 group-hover:scale-[1.08]",
        size === "md" ? "size-11" : "size-[52px]",
        tones[index % tones.length],
        className,
      )}
    >
      <Icon className={size === "md" ? "size-5" : "size-6"} strokeWidth={2} />
    </span>
  );
}
