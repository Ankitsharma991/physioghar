import Link from "next/link";
import { site } from "@/data/site";

export function Logo({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      className="rounded-button focus-visible:outline-primary flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <span
        aria-hidden="true"
        className="from-primary to-primary-dark font-heading flex size-10 items-center justify-center rounded-xl bg-linear-to-br text-[15px] font-extrabold text-white"
      >
        DC
      </span>
      <span className="flex flex-col leading-tight">
        <span
          className={`font-heading text-base font-bold ${tone === "dark" ? "text-white" : "text-ink"}`}
        >
          {site.name}
        </span>
        <span
          className={`text-xs ${tone === "dark" ? "text-white/60" : "text-muted md:max-lg:hidden"}`}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
