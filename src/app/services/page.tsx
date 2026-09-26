import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import { IndustriesGrid } from "@/components/sections/industries-grid";
import { Pricing } from "@/components/sections/pricing";
import { ServiceCategoryRow } from "@/components/sections/service-category";
import { WhyWorkWithUs } from "@/components/sections/why-work-with-us";
import { ButtonLink } from "@/components/ui/button";
import { CtaPanel } from "@/components/ui/cta-panel";
import { Hero } from "@/components/ui/hero";
import { serviceCategories } from "@/data/services";

export const metadata: Metadata = pageMetadata({
  title: "Marketing, Content & Software Services",
  description:
    "Digital marketing, content creation and software development from one Kathmandu team, with transparent monthly plans starting at Rs 15,000.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Services", path: "/services" }])} />
      <Hero
        eyebrow="Our services"
        title="Services that drive growth"
        highlight="drive growth"
        lede="Marketing, content and software from one team. Pick a single service or combine them into a plan that fits your goals and your budget."
      />
      <section className="section wrap">
        {serviceCategories.map((category, i) => (
          <ServiceCategoryRow key={category.id} category={category} index={i} />
        ))}
      </section>
      <Pricing />
      <IndustriesGrid />
      <WhyWorkWithUs />
      <CtaPanel title="Let's find the right service for you">
        <ButtonLink href="/contact" variant="white">
          Book a Consultation →
        </ButtonLink>
      </CtaPanel>
    </>
  );
}
