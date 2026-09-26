import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import { AboutStory } from "@/components/sections/about-story";
import { MissionVision } from "@/components/sections/mission-vision";
import { Roadmap } from "@/components/sections/roadmap";
import { Team } from "@/components/sections/team";
import { Trust } from "@/components/sections/trust";
import { Values } from "@/components/sections/values";
import { ButtonLink } from "@/components/ui/button";
import { CtaPanel } from "@/components/ui/cta-panel";
import { Hero } from "@/components/ui/hero";

export const metadata: Metadata = pageMetadata({
  title: "About Our Team and Story",
  description:
    "Digital Chautari is a small team of marketers, storytellers and engineers in Kathmandu. Read our story, values, team and roadmap.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "About", path: "/about" }])} />
      <Hero
        eyebrow="About us"
        title="The people behind Digital Chautari"
        highlight="people"
        lede="A small team of marketers, storytellers and engineers in Kathmandu, working on one shared goal: making Nepali businesses better known and better served."
      />
      <AboutStory />
      <MissionVision />
      <Values />
      <Trust />
      <Team />
      <Roadmap />
      <CtaPanel title="Want to join our journey?">
        <ButtonLink href="/contact" variant="white">
          Get in Touch →
        </ButtonLink>
      </CtaPanel>
    </>
  );
}
