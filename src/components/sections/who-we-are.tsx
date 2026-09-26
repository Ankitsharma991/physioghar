import { serviceTeasers, strengths } from "@/data/home";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckList } from "@/components/ui/check-list";
import { IconChip } from "@/components/ui/icon-chip";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhoWeAre() {
  return (
    <section className="section wrap">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-6">
          <SectionHeading eyebrow="Who we are" title="A Chautari where ideas meet execution" />
          <div className="text-muted flex max-w-[560px] flex-col gap-4">
            <p>
              In Nepal, a chautari is the shaded resting place where neighbours meet, trade stories
              and settle plans. We wanted to bring that spirit to digital work: an open place where
              ideas are welcome and every conversation ends with something built.
            </p>
            <p>
              Our team blends marketers, storytellers and engineers under one roof. A campaign, the
              content behind it and the software that supports it are planned together and delivered
              by people who already know each other.
            </p>
          </div>
          <CheckList items={strengths} columns={2} />
          <div>
            <ButtonLink href="/about#team">Meet the Team →</ButtonLink>
          </div>
        </Reveal>

        <div className="card-grid sm:grid-cols-2">
          {serviceTeasers.map(({ icon, title, text }, i) => (
            <Card key={title} index={i}>
              <IconChip icon={icon} index={i + 1} />
              <h3 className="mt-4">{title}</h3>
              <p className="text-muted mt-2 text-[15px]">{text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
