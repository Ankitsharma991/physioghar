import { Check } from "lucide-react";
import { reasons } from "@/data/services";
import { Card } from "@/components/ui/card";
import { DarkSection } from "@/components/ui/dark-section";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyWorkWithUs() {
  return (
    <DarkSection>
      <SectionHeading
        tone="dark"
        eyebrow="Why work with us"
        title="What you can count on from day one"
      />
      <ul className="card-grid mt-10 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map(({ title, text }, i) => (
          <li key={title} className="contents">
            <Card tone="dark" index={i} className="flex gap-4">
              <span className="bg-primary mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-white">
                <Check className="size-4" strokeWidth={3} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-white">{title}</h3>
                <p className="mt-1.5 text-[15px] text-white/70">{text}</p>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </DarkSection>
  );
}
