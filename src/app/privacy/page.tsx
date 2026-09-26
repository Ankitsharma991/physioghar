import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import { LegalContent } from "@/components/sections/legal-content";
import { Hero } from "@/components/ui/hero";
import { privacy } from "@/data/legal";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "What Digital Chautari collects when you contact us, why, and how you can ask us to correct or delete it.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Privacy Policy", path: "/privacy" }])} />
      <Hero
        eyebrow="Legal"
        title="Privacy Policy"
        highlight="Privacy"
        lede="What we collect when you contact us, why we collect it and how you can ask us to remove it."
      />
      <LegalContent sections={privacy} updated="26 September 2026" />
    </>
  );
}
