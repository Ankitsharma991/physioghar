import { contactCards } from "@/data/contact";
import { Card } from "@/components/ui/card";
import { IconChip } from "@/components/ui/icon-chip";

export function ContactCards() {
  return (
    <section className="section-tight wrap">
      <h2 className="sr-only">Contact details</h2>
      <div className="card-grid sm:grid-cols-2 lg:grid-cols-4">
        {contactCards.map((item, i) => (
          <Card key={item.title} index={i}>
            <IconChip icon={item.icon} index={i} />
            <h3 className="mt-4">{item.title}</h3>
            <div className="text-muted mt-2 text-[15px] break-words">
              {"href" in item ? (
                <a href={item.href} className="text-primary-dark font-medium hover:underline">
                  {item.lines[0]}
                </a>
              ) : (
                item.lines.map((line) => <p key={line}>{line}</p>)
              )}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
