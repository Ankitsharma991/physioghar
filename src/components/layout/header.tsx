"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/data/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "./logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="border-line sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md">
      <div className="wrap flex h-[72px] items-center justify-between gap-4 lg:gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "rounded-button focus-visible:outline-primary px-2.5 py-2 text-[14px] font-medium transition-colors focus-visible:outline-2 lg:px-3.5 lg:text-[15px]",
                    isActive(href)
                      ? "text-primary-dark"
                      : "text-ink/80 hover:bg-chip-teal hover:text-ink",
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="/contact"
            className="max-md:hidden md:max-lg:px-4 md:max-lg:py-[11px] md:max-lg:text-[14px]"
          >
            Contact Us
          </ButtonLink>
          <button
            type="button"
            className="rounded-button border-line inline-flex size-11 items-center justify-center border bg-white md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="menu-in border-line shadow-lift absolute inset-x-0 top-full border-b bg-white md:hidden"
        >
          <ul className="wrap flex flex-col gap-1 py-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={cn(
                    "rounded-button block px-3 py-3 text-base font-medium",
                    isActive(href) ? "bg-chip-teal text-primary-dark" : "text-ink",
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <ButtonLink href="/contact" onClick={() => setOpen(false)} className="w-full">
                Contact Us
              </ButtonLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
