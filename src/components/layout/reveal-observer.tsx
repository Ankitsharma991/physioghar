"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.dataset.ready = "";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = document.querySelectorAll<HTMLElement>(
      '[data-reveal-item]:not([data-reveal="shown"])',
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "shown";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const viewport = window.innerHeight;
    const rects = [...items].map((item) => [item, item.getBoundingClientRect().top] as const);

    for (const [item, top] of rects) {
      if (top >= viewport) {
        item.dataset.reveal = "hidden";
        observer.observe(item);
      } else if (item.dataset.reveal === "hidden") {
        item.dataset.reveal = "shown";
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
