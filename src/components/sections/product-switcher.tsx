"use client";

import { useRef, useSyncExternalStore, type KeyboardEvent } from "react";
import { products } from "@/data/products";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { productPreviews } from "./product-previews";

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

const readHash = () => window.location.hash.slice(1);
const serverHash = () => "";

export function ProductSwitcher() {
  const hash = useSyncExternalStore(subscribe, readHash, serverHash);
  const activeId = products.find((p) => p.id === hash)?.id ?? products[0].id;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(id: string) {
    window.history.replaceState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  function onKeyDown(e: KeyboardEvent, index: number) {
    const last = products.length - 1;
    const next =
      e.key === "ArrowRight"
        ? (index + 1) % products.length
        : e.key === "ArrowLeft"
          ? (index - 1 + products.length) % products.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    select(products[next].id);
    tabs.current[next]?.focus();
  }

  return (
    <section className="section-tight wrap">
      <div
        role="tablist"
        aria-label="Digital Chautari products"
        className="flex scroll-mt-28 flex-wrap gap-2"
      >
        {products.map((p, i) => {
          const selected = p.id === activeId;
          return (
            <button
              key={p.id}
              id={p.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${p.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(p.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "rounded-pill focus-visible:outline-primary scroll-mt-28 border px-5 py-2.5 text-[15px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                selected
                  ? "border-primary bg-primary text-white"
                  : "border-line text-ink hover:border-primary hover:text-primary-dark bg-white",
              )}
            >
              {p.tabLabel}
            </button>
          );
        })}
      </div>

      {products.map((p) => {
        const Preview = productPreviews[p.id];
        return (
          <div
            key={p.id}
            id={`panel-${p.id}`}
            role="tabpanel"
            aria-labelledby={p.id}
            hidden={p.id !== activeId}
            tabIndex={0}
            className="page-in rounded-card border-line focus-visible:outline-primary mt-6 border bg-white p-6 focus-visible:outline-2 md:p-10"
          >
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="flex flex-col items-start gap-4">
                <span className="eyebrow text-primary-dark">{p.category}</span>
                <h2>{p.name}</h2>
                <p className="lede">{p.description}</p>

                {p.details.kind === "stats" ? (
                  <dl className="border-line mt-2 grid w-full grid-cols-3 gap-4 border-y py-5">
                    {p.details.items.map(({ value, label }) => (
                      <div key={label} className="flex flex-col-reverse justify-end gap-1">
                        <dt className="caption">{label}</dt>
                        <dd className="font-heading text-2xl font-bold">{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {p.details.items.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-pill bg-chip-mint text-primary-dark px-3.5 py-1.5 text-[13px] font-semibold"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}

                <ButtonLink href="/contact" className="mt-2">
                  {p.cta} →
                </ButtonLink>
              </div>

              <div aria-hidden="true" className="rounded-card bg-chip-teal p-5 md:p-7">
                <Preview />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
