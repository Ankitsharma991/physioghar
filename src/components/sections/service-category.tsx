import type { ServiceCategory } from "@/data/services";
import { Card } from "@/components/ui/card";
import { IconChip } from "@/components/ui/icon-chip";
import { Reveal } from "@/components/ui/reveal";

export function ServiceCategoryRow({
  category,
  index,
}: {
  category: ServiceCategory;
  index: number;
}) {
  const { id, icon, title, description, items } = category;
  return (
    <div
      id={id}
      className="border-line grid scroll-mt-28 gap-8 py-12 not-first:border-t first:pt-0 last:pb-0 lg:grid-cols-[5fr_7fr] lg:gap-14"
    >
      <Reveal className="flex flex-col items-start gap-4">
        <IconChip icon={icon} index={index} size="lg" />
        <h2>{title}</h2>
        <p className="text-muted text-[16px] leading-relaxed">{description}</p>
      </Reveal>
      <div className="card-grid sm:grid-cols-2">
        {items.map(({ icon: ItemIcon, title: itemTitle, text }, i) => (
          <Card key={itemTitle} index={i}>
            <IconChip icon={ItemIcon} index={index + i + 1} />
            <h3 className="mt-4">{itemTitle}</h3>
            <p className="text-muted mt-2 text-[15px]">{text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
