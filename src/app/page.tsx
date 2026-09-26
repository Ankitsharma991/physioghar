import { BlogTeaser } from "@/components/sections/blog-teaser";
import { FeatureStrip } from "@/components/sections/feature-strip";
import { Process } from "@/components/sections/process";
import { ProductsTeaser } from "@/components/sections/products-teaser";
import { Sectors } from "@/components/sections/sectors";
import { StatsBanner } from "@/components/sections/stats-banner";
import { Testimonials } from "@/components/sections/testimonials";
import { WhoWeAre } from "@/components/sections/who-we-are";
import { ButtonLink } from "@/components/ui/button";
import { CtaPanel } from "@/components/ui/cta-panel";
import { Hero } from "@/components/ui/hero";
import { StatBar } from "@/components/ui/stat-bar";
import { heroStats } from "@/data/home";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="🚀 Welcome to Digital Chautari"
        title="We build digital bridges between ideas and impact"
        highlight="digital bridges"
        lede="Digital Chautari is a creative technology company in Kathmandu. We combine digital marketing, content creation and health-tech software to help Nepali businesses grow with confidence."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/services">Explore Services →</ButtonLink>
          <ButtonLink href="/products" variant="ghost">
            View Products
          </ButtonLink>
        </div>
        <StatBar stats={heroStats} />
      </Hero>
      <FeatureStrip />
      <WhoWeAre />
      <StatsBanner />
      <ProductsTeaser />
      <Sectors />
      <Process />
      <Testimonials />
      <BlogTeaser />
      <CtaPanel title="Ready to build something extraordinary together?">
        <ButtonLink href="/contact" variant="white">
          Start a Project →
        </ButtonLink>
        <ButtonLink href="/services" variant="outline-light">
          View Services
        </ButtonLink>
      </CtaPanel>
    </>
  );
}
