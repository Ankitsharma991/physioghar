import { industries } from "@/data/industries";
import { Card } from "@/components/ui/card";
import { IconChip } from "@/components/ui/icon-chip";
import { SectionHeading } from "@/components/ui/section-heading";

export function Sectors() {
  return (
    <section className="section wrap pt-0">
      <SectionHeading
        eyebrow="Sectors we serve"
        title="Experience across the industries Nepal runs on"
      />
      <div className="card-grid mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map(({ name, icon, description }, i) => (
          <Card key={name} index={i}>
            <IconChip icon={icon} index={i} />
            <h3 className="mt-4">{name}</h3>
            <p className="text-muted mt-2 text-[15px]">{description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
