import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type CtaPanelProps = {
  title: string;
  lede?: string;
  children: ReactNode;
};

export function CtaPanel({ title, lede, children }: CtaPanelProps) {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="bg-cta relative overflow-hidden rounded-[20px] px-6 py-14 text-center text-white md:px-16">
          <div className="mx-auto flex max-w-[640px] flex-col items-center gap-4">
            <h2 className="text-white">{title}</h2>
            {lede && <p className="text-[17px] leading-relaxed text-white/85">{lede}</p>}
            <div className="mt-3 flex flex-wrap justify-center gap-3">{children}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
