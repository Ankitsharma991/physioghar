import { Stethoscope } from "lucide-react";
import { DarkSection } from "@/components/ui/dark-section";
import { buttonClass } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";

export function ProductSpotlight() {
  return (
    <DarkSection aria-labelledby="spotlight-title">
      <Reveal className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
        <span className="rounded-chip bg-primary/15 text-primary inline-flex size-14 items-center justify-center">
          <Stethoscope className="size-7" aria-hidden="true" />
        </span>
        <Eyebrow tone="dark">Spotlight</Eyebrow>
        <h2 id="spotlight-title" className="text-white">
          Physio@Home &mdash; healthcare reimagined
        </h2>
        <p className="text-[17px] leading-relaxed text-white/70">
          Recovery works best when it fits into daily life. Physio@Home brings qualified
          physiotherapists to the patient, so care starts sooner and continues without the commute.
        </p>
        <a href="#physio-at-home" className={buttonClass("primary", "mt-2")}>
          Explore Physio@Home →
        </a>
      </Reveal>
    </DarkSection>
  );
}
