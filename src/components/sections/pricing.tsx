import { pricingTiers } from "@/data/services";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckList } from "@/components/ui/check-list";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

export function Pricing() {
  return (
    <section id="pricing" className="section wrap scroll-mt-20">
      <SectionHeading
        align="center"
        eyebrow="Pricing"
        title="Plans that grow with you"
        lede="Simple monthly packages for marketing and content. Software projects are quoted after a short discovery call."
      />
      <div className="card-grid mt-12 items-stretch lg:grid-cols-3">
        {pricingTiers.map((tier, i) => {
          const dark = tier.featured;
          return (
            <Card
              key={tier.name}
              index={i}
              tone={dark ? "dark" : "light"}
              flush
              className={cn("relative flex flex-col p-7", dark && "shadow-lift")}
            >
              {dark && (
                <span className="eyebrow rounded-pill bg-gold text-navy absolute top-0 right-6 -translate-y-1/2 px-3 py-1">
                  Most Popular
                </span>
              )}
              <h3 className={cn(dark && "text-white")}>{tier.name}</h3>
              <p className={cn("mt-1 text-[15px]", dark ? "text-white/70" : "text-muted")}>
                {tier.blurb}
              </p>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-extrabold">{tier.price}</span>
                {tier.unit && (
                  <span className={cn("text-[15px]", dark ? "text-white/70" : "text-muted")}>
                    {tier.unit}
                  </span>
                )}
              </p>
              <CheckList
                items={tier.features}
                tone={dark ? "dark" : "light"}
                className="mt-6 flex-1"
              />
              <ButtonLink
                href="/contact"
                variant={dark ? "primary" : "ghost"}
                className="mt-8 w-full"
              >
                {tier.cta}
              </ButtonLink>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
