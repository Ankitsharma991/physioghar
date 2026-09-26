import { Star } from "lucide-react";
import { testimonials } from "@/data/home";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  return (
    <section className="section wrap">
      <SectionHeading
        eyebrow="Testimonials"
        title="What our clients say"
        lede="Plain feedback from teams we have worked with."
      />
      <div className="card-grid mt-10 md:grid-cols-3">
        {testimonials.map(({ quote, name, role }, i) => (
          <Card key={name} index={i} className="flex flex-col">
            <figure className="flex flex-1 flex-col">
              <div role="img" aria-label="5 out of 5 stars" className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, s) => (
                  <Star key={s} className="fill-gold text-gold size-[18px]" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="border-line mt-5 border-t pt-4">
                <p className="font-heading text-[15px] font-semibold">{name}</p>
                <p className="caption">{role}</p>
              </figcaption>
            </figure>
          </Card>
        ))}
      </div>
    </section>
  );
}
