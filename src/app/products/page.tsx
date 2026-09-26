import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import { ProductSpotlight } from "@/components/sections/product-spotlight";
import { ProductSwitcher } from "@/components/sections/product-switcher";
import { Hero } from "@/components/ui/hero";

export const metadata: Metadata = pageMetadata({
  title: "Products & Ventures",
  description:
    "Meet Eco Creative Marketing Agency, One Content Creation Studio and Physio@Home, three ventures built by Digital Chautari in Kathmandu.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbs([{ name: "Products", path: "/products" }])} />
      <Hero
        eyebrow="Our products"
        title="Three ventures, one vision"
        highlight="one vision"
        lede="A marketing agency, a content studio and a health-tech app. Each one stands on its own, and together they show how we work."
      />
      <ProductSwitcher />
      <ProductSpotlight />
    </>
  );
}
