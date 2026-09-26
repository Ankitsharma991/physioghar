import Link from "next/link";
import { footerGroups, site } from "@/data/site";
import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="wrap pt-16 pb-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex max-w-[340px] flex-col gap-4">
            <Logo tone="dark" />
            <p className="text-sm leading-relaxed text-white/70">
              We are a creative technology company in Kathmandu, building digital marketing, content
              and health-tech products for teams that want to grow.
            </p>
            <address className="text-sm text-white/70 not-italic">
              <a href={`mailto:${site.email}`} className="hover:text-white">
                {site.email}
              </a>
              <br />
              {site.address}
            </address>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-semibold tracking-wide text-white uppercase">
                {group.title}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-navy-border mt-12 border-t pt-6 text-center text-[13px] text-white/60">
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
