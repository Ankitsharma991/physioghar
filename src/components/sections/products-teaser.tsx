import Link from "next/link";
import { products } from "@/data/products";
import { Card } from "@/components/ui/card";
import { IconChip } from "@/components/ui/icon-chip";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProductsTeaser() {
  return (
    <section className="section wrap">
      <SectionHeading
        eyebrow="Products"
        title="Three ventures, one vision"
        lede="Each venture solves a different problem, and all of them share the same standard of craft."
      />
      <div className="card-grid mt-10 md:grid-cols-3">
        {products.map(({ id, name, category, icon, summary }, i) => (
          <Card key={id} index={i} className="flex flex-col">
            <IconChip icon={icon} index={i} size="lg" />
            <p className="eyebrow text-primary-dark mt-5">{category}</p>
            <h3 className="mt-1.5">{name}</h3>
            <p className="text-muted mt-2 flex-1 text-[15px]">{summary}</p>
            <Link
              href={`/products#${id}`}
              aria-label={`Learn more about ${name}`}
              className="text-primary-dark mt-5 text-[15px] font-semibold hover:underline"
            >
              Learn more →
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
