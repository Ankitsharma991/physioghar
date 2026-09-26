import { storyTiles } from "@/data/about";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

const tones = {
  teal: "border-primary bg-primary text-navy",
  navy: "border-navy bg-navy text-white",
  white: "border-line bg-white text-ink",
  gold: "border-gold bg-gold text-navy",
} as const;

export function AboutStory() {
  return (
    <section className="section wrap">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="flex flex-col gap-6">
          <SectionHeading eyebrow="Our story" title="From a chautari to a digital powerhouse" />
          <div className="text-muted flex max-w-[560px] flex-col gap-4">
            <p>
              Digital Chautari started in 2025 with a simple idea: Nepali businesses deserve the
              same quality of digital work as global brands, without the distance. What began as a
              small marketing desk now runs three products across marketing, content and
              health-tech.
            </p>
            <p>
              We are still young, and we like it that way. Every project is handled by the people
              who will live with its results, and we would rather grow steadily and do the work
              properly.
            </p>
          </div>
        </Reveal>

        <dl className="card-grid grid-cols-2">
          {storyTiles.map(({ value, label, tone }, i) => (
            <Reveal
              key={label}
              index={i}
              className={cn(
                "rounded-card flex min-h-40 flex-col-reverse justify-between border p-5",
                tones[tone],
              )}
            >
              <dt className="text-[15px] font-semibold">{label}</dt>
              <dd className="font-heading text-2xl leading-tight font-extrabold sm:text-3xl">
                {value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
