import { processSteps } from "@/data/home";
import { Card } from "@/components/ui/card";
import { DarkSection } from "@/components/ui/dark-section";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  return (
    <DarkSection>
      <SectionHeading
        tone="dark"
        eyebrow="How we work"
        title="Our 4-step process"
        lede="A simple sequence that keeps projects predictable, from the first call to the day you go live."
      />
      <ol className="card-grid mt-10 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="contents">
            <Card tone="dark" index={i}>
              <div className="flex items-center justify-between">
                <span className="rounded-chip bg-primary/15 text-primary inline-flex size-11 items-center justify-center transition-transform duration-200 group-hover:scale-[1.08]">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="font-heading text-gold text-2xl font-bold" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-white">
                <span className="sr-only">Step {i + 1}: </span>
                {title}
              </h3>
              <p className="mt-2 text-[15px] text-white/70">{text}</p>
            </Card>
          </li>
        ))}
      </ol>
    </DarkSection>
  );
}
