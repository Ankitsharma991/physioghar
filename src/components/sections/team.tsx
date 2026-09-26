import { team } from "@/data/about";
import { Card } from "@/components/ui/card";
import { IconChip } from "@/components/ui/icon-chip";
import { SectionHeading } from "@/components/ui/section-heading";

export function Team() {
  return (
    <section id="team" className="section wrap scroll-mt-20">
      <SectionHeading
        eyebrow="The team"
        title="Meet the team"
        lede="A compact team where every role has a clear owner."
      />
      <ul className="mt-10 flex flex-wrap justify-center gap-5">
        {team.map(({ icon, role, text }, i) => (
          <li key={role} className="w-full sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)]">
            <Card index={i} className="h-full">
              <IconChip icon={icon} index={i} />
              <h3 className="mt-4">{role}</h3>
              <p className="text-muted mt-2 text-[15px]">{text}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
