import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type CheckListProps = {
  items: readonly string[];
  tone?: "light" | "dark";
  columns?: 1 | 2;
  className?: string;
};

export function CheckList({ items, tone = "light", columns = 1, className }: CheckListProps) {
  return (
    <ul className={cn("grid gap-x-6 gap-y-3", columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] font-medium">
          <span className="bg-primary mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-white">
            <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className={tone === "dark" ? "text-white/90" : undefined}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
