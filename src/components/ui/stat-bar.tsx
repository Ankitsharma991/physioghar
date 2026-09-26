import type { LucideIcon } from "lucide-react";
import { IconChip } from "./icon-chip";
import { Reveal } from "./reveal";

type Stat = { icon: LucideIcon; value: string; label: string };

export function StatBar({ stats }: { stats: readonly Stat[] }) {
  return (
    <Reveal className="rounded-card border-line mt-10 grid overflow-hidden border bg-white md:auto-cols-fr md:grid-flow-col">
      {stats.map(({ icon, value, label }, i) => (
        <div
          key={label}
          className="border-line flex items-center gap-4 px-6 py-5 not-first:border-t md:not-first:border-t-0 md:not-first:border-l"
        >
          <IconChip icon={icon} index={i} />
          <div>
            <p className="font-heading text-2xl leading-none font-bold">{value}</p>
            <p className="caption mt-1">{label}</p>
          </div>
        </div>
      ))}
    </Reveal>
  );
}
