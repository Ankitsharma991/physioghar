import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import { ChevronDown } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CtaPanel } from "@/components/ui/cta-panel";
import { Hero } from "@/components/ui/hero";
import { faqs } from "@/data/faq";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about Digital Chautari's services, pricing, timelines, support and data handling.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "FAQ", path: "/faq" }])} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }}
      />
      <Hero
        eyebrow="FAQ"
        title="Answers to common questions"
        highlight="common questions"
        lede="Short answers about our services, pricing and how we work. If yours is not here, ask us directly."
      />
      <section className="section wrap">
        <div className="mx-auto flex max-w-[760px] flex-col gap-3">
          {faqs.map(({ question, answer }) => (
            <details
              key={question}
              className="group rounded-card border-line open:shadow-lift border bg-white"
            >
              <summary className="rounded-card font-heading focus-visible:outline-primary flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-[16px] font-semibold marker:hidden focus-visible:outline-2 [&::-webkit-details-marker]:hidden">
                {question}
                <ChevronDown
                  className="text-primary-dark size-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="text-muted px-5 pb-5 leading-relaxed">{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <CtaPanel title="Still have a question?" lede="We reply within one working day.">
        <ButtonLink href="/contact" variant="white">
          Contact Us →
        </ButtonLink>
      </CtaPanel>
    </>
  );
}
