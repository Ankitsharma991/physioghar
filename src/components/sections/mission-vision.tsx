import { Eye, Target } from "lucide-react";
import { missionVision } from "@/data/about";
import { Card } from "@/components/ui/card";
import { IconChip } from "@/components/ui/icon-chip";

const icons = [Target, Eye];

export function MissionVision() {
  return (
    <section className="section wrap pt-0">
      <div className="card-grid md:grid-cols-2">
        {missionVision.map(({ title, text }, i) => (
          <Card key={title} index={i} flush className="p-8">
            <IconChip icon={icons[i]} index={i * 2} size="lg" />
            <h2 className="mt-5">{title}</h2>
            <p className="text-muted mt-3 text-[16px] leading-relaxed">{text}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
