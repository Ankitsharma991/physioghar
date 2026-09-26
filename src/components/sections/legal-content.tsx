import type { LegalSection } from "@/data/legal";

export function LegalContent({
  sections,
  updated,
}: {
  sections: readonly LegalSection[];
  updated: string;
}) {
  return (
    <section className="section wrap">
      <div className="mx-auto max-w-[720px]">
        <p className="caption">Last updated: {updated}</p>
        <div className="mt-8 flex flex-col gap-8">
          {sections.map(({ heading, paragraphs }) => (
            <div key={heading}>
              <h2>{heading}</h2>
              <div className="text-muted mt-3 flex flex-col gap-3 leading-relaxed">
                {paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
