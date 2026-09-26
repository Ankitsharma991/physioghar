import { industries } from "@/data/industries";
import { Card } from "@/components/ui/card";
import { IconChip } from "@/components/ui/icon-chip";
import { SectionHeading } from "@/components/ui/section-heading";

export function IndustriesGrid() {
  return (
    <section className="section wrap pt-0">
      <SectionHeading align="center" eyebrow="Industries" title="Who we work with" />
      <ul className="card-grid mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map(({ short, icon }, i) => (
          <li key={short} className="contents">
            <Card index={i} flush className="flex items-center gap-3 px-4 py-4 sm:gap-4 sm:px-5">
              <IconChip icon={icon} index={i} />
              <span className="font-heading text-[15px] font-semibold sm:text-base">{short}</span>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
