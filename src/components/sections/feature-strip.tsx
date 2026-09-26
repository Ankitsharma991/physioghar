import { features } from "@/data/home";
import { Card } from "@/components/ui/card";
import { IconChip } from "@/components/ui/icon-chip";

export function FeatureStrip() {
  return (
    <section className="section-tight wrap">
      <h2 className="sr-only">Why teams choose us</h2>
      <div className="card-grid sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon, title, text }, i) => (
          <Card key={title} index={i}>
            <IconChip icon={icon} index={i} />
            <h3 className="mt-4">{title}</h3>
            <p className="text-muted mt-2 text-[15px]">{text}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
