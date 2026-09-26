import { values } from "@/data/about";
import { Card } from "@/components/ui/card";
import { IconChip } from "@/components/ui/icon-chip";
import { SectionHeading } from "@/components/ui/section-heading";

export function Values() {
  return (
    <section className="section wrap pt-0">
      <SectionHeading eyebrow="Our values" title="What we hold ourselves to" />
      <div className="card-grid mt-10 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ icon, title, text }, i) => (
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
