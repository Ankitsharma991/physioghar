import { departments } from "@/data/contact";
import { Card } from "@/components/ui/card";
import { IconChip } from "@/components/ui/icon-chip";
import { SectionHeading } from "@/components/ui/section-heading";

export function DirectLines() {
  return (
    <section className="section wrap">
      <SectionHeading
        eyebrow="Direct lines"
        title="Reach the right team"
        lede="Skip the queue and write straight to the people who will do the work."
      />
      <div className="card-grid mt-10 sm:grid-cols-2 lg:grid-cols-4">
        {departments.map(({ icon, name, text, email }, i) => (
          <Card key={name} index={i}>
            <IconChip icon={icon} index={i + 2} />
            <h3 className="mt-4">{name}</h3>
            <p className="text-muted mt-2 text-[15px]">{text}</p>
            <a
              href={`mailto:${email}`}
              className="text-primary-dark mt-4 block text-[14px] font-semibold break-all hover:underline"
            >
              {email}
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}
