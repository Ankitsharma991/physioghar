import { roadmap } from "@/data/about";
import { Card } from "@/components/ui/card";
import { DarkSection } from "@/components/ui/dark-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

export function Roadmap() {
  return (
    <DarkSection>
      <SectionHeading tone="dark" eyebrow="Roadmap" title="How we got here" />
      <ol className="relative mt-12 flex flex-col gap-8">
        <span
          aria-hidden="true"
          className="bg-navy-border absolute inset-y-0 left-2 w-px md:left-1/2"
        />
        {roadmap.map(({ year, title, text }, i) => {
          const left = i % 2 === 0;
          return (
            <li key={title} className="relative pl-10 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
              <span
                aria-hidden="true"
                className="bg-leaf ring-navy absolute top-7 left-2 size-4 -translate-x-1/2 rounded-full ring-4 md:left-1/2"
              />
              <Card
                tone="dark"
                index={i}
                className={cn(left ? "md:col-start-1 md:text-right" : "md:col-start-2")}
              >
                <span className="eyebrow rounded-pill bg-gold text-navy inline-block px-3 py-1">
                  {year}
                </span>
                <h3 className="mt-3 text-white">{title}</h3>
                <p className="mt-2 text-[15px] text-white/70">{text}</p>
              </Card>
            </li>
          );
        })}
      </ol>
    </DarkSection>
  );
}
