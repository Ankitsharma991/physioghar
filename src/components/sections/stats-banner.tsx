import { impact } from "@/data/home";
import { CountUp } from "@/components/ui/count-up";
import { DarkSection } from "@/components/ui/dark-section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function StatsBanner() {
  return (
    <DarkSection aria-label="Our impact in numbers">
      <SectionHeading tone="dark" eyebrow="Our impact" title="The numbers behind the work" />
      <dl className="mt-10 grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {impact.map(({ value, label }, i) => (
          <Reveal
            key={label}
            index={i}
            className="border-navy-border flex flex-col-reverse gap-2 lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
          >
            <dt className="text-[15px] text-white/70">{label}</dt>
            <dd className="font-heading text-5xl leading-none font-extrabold text-white">
              <CountUp value={value} />
            </dd>
          </Reveal>
        ))}
      </dl>
    </DarkSection>
  );
}
