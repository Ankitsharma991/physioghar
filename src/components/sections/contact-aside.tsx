import { ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { responseTimes } from "@/data/contact";
import { site } from "@/data/site";
import { Card } from "@/components/ui/card";

export function ContactAside() {
  return (
    <div className="flex flex-col gap-5">
      <Card lift={false} flush className="overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-chip-teal relative h-44 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:32px_32px]"
        >
          <span className="bg-primary shadow-lift absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-full items-center justify-center rounded-full text-white">
            <MapPin className="size-5" />
          </span>
          <span className="bg-ink/15 absolute top-1/2 left-1/2 mt-1 h-1.5 w-6 -translate-x-1/2 rounded-full" />
        </div>
        <div className="flex items-center justify-between gap-3 p-5">
          <div>
            <p className="font-heading text-[15px] font-semibold">{site.name}</p>
            <p className="caption">{site.address}</p>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Kathmandu%2C+Nepal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-dark inline-flex items-center gap-1.5 text-[14px] font-semibold hover:underline"
          >
            Open map <ExternalLink className="size-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </Card>

      <Card tone="dark" lift={false} className="p-6">
        <p className="eyebrow text-gold">Quick answers</p>
        <h3 className="mt-2 text-white">Need quick answers?</h3>
        <Link
          href="/faq"
          className="mt-3 inline-block text-[15px] font-semibold text-white underline-offset-4 hover:underline"
        >
          Visit FAQ page →
        </Link>
      </Card>

      <Card lift={false}>
        <h3>Response time</h3>
        <dl className="divide-line mt-3 divide-y">
          {responseTimes.map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between gap-4 py-2.5 text-[15px]">
              <dt className="text-muted">{label}</dt>
              <dd className="font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  );
}
