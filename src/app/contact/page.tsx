import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import { ContactAside } from "@/components/sections/contact-aside";
import { ContactCards } from "@/components/sections/contact-cards";
import { ContactForm } from "@/components/sections/contact-form";
import { DirectLines } from "@/components/sections/direct-lines";
import { Hero } from "@/components/ui/hero";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us and Start a Project",
  description:
    "Tell us about your project. Reach Digital Chautari by form, email or phone. We reply within one working day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Contact", path: "/contact" }])} />
      <Hero
        eyebrow="Contact us"
        title="Let's start a conversation"
        highlight="conversation"
        lede="Tell us what you are working on. We will reply with honest advice, whether or not we are the right team for the job."
      />
      <ContactCards />
      <DirectLines />
      <section className="section wrap pt-0">
        <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
          <div className="rounded-card border-line relative border bg-white p-6 md:p-8">
            <SectionHeading
              title="Send us a message"
              lede="Share a few details and we will get back to you within one working day."
              className="mb-8"
            />
            <ContactForm />
          </div>
          <ContactAside />
        </div>
      </section>
    </>
  );
}
