import { trust } from "@/data/about";
import { Card } from "@/components/ui/card";
import { DarkSection } from "@/components/ui/dark-section";
import { SectionHeading } from "@/components/ui/section-heading";

export function Trust() {
  return (
    <DarkSection>
      <SectionHeading
        tone="dark"
        eyebrow="Trust"
        title="Committed to quality & trust"
        lede="Clear standards on how we work and how we look after your data."
      />
      <div className="card-grid mt-10 sm:grid-cols-2 lg:grid-cols-4">
        {trust.map(({ icon: Icon, title, text }, i) => (
          <Card key={title} tone="dark" index={i}>
            <span className="rounded-chip bg-primary/15 text-primary inline-flex size-11 items-center justify-center transition-transform duration-200 group-hover:scale-[1.08]">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-white">{title}</h3>
            <p className="mt-2 text-[15px] text-white/70">{text}</p>
          </Card>
        ))}
      </div>
    </DarkSection>
  );
}
