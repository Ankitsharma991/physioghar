import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import { LegalContent } from "@/components/sections/legal-content";
import { Hero } from "@/components/ui/hero";
import { terms } from "@/data/legal";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms for using the Digital Chautari website: acceptable use, our content, how services are agreed and the governing law.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Terms of Service", path: "/terms" }])} />
      <Hero
        eyebrow="Legal"
        title="Terms of Service"
        highlight="Terms"
        lede="The ground rules for using this website. Client work is covered by a separate written agreement."
      />
      <LegalContent sections={terms} updated="26 September 2026" />
    </>
  );
}
