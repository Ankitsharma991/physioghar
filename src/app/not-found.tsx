import { ButtonLink } from "@/components/ui/button";
import { Hero } from "@/components/ui/hero";

export default function NotFound() {
  return (
    <Hero
      eyebrow="Error 404"
      title="This page has wandered off"
      highlight="wandered off"
      lede="The page you are looking for does not exist or has moved. Try one of these instead."
    >
      <div className="mt-8 flex flex-wrap gap-3 pb-16">
        <ButtonLink href="/">Back to Home</ButtonLink>
        <ButtonLink href="/services" variant="ghost">
          Our Services
        </ButtonLink>
        <ButtonLink href="/contact" variant="ghost">
          Contact Us
        </ButtonLink>
      </div>
    </Hero>
  );
}
