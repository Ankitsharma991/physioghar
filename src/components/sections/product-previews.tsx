import { CalendarDays, Clock, MapPin } from "lucide-react";

const bars = [38, 52, 44, 68, 60, 82, 74];
const days = ["M", "T", "W", "T", "F", "S", "S"];

function EcoPreview() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-ink text-[13px] font-semibold">Campaign overview</p>
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Reach", "84.2K"],
          ["Leads", "1,240"],
          ["ROAS", "3.6x"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-chip border-line border bg-white px-3 py-2.5">
            <p className="text-muted text-[11px]">{label}</p>
            <p className="font-heading text-lg font-bold">{value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-chip border-line border bg-white p-4">
        <div className="flex h-32 items-end gap-2">
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center justify-end gap-1.5">
              <div
                className={i === 5 ? "bg-gold w-full rounded-t" : "bg-primary/70 w-full rounded-t"}
                style={{ height: h }}
              />
              <span className="text-muted text-[10px]">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const posts = [
  [0, "bg-primary/80"],
  [1, "bg-gold"],
  [2, "bg-leaf"],
  [4, "bg-primary/80"],
  [5, "bg-gold"],
] as const;

function StudioPreview() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-ink text-[13px] font-semibold">Content calendar</p>
      <div className="rounded-chip border-line grid grid-cols-7 gap-2 border bg-white p-4">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <span className="text-muted text-[10px]">{d}</span>
            <div className="bg-paper flex h-24 w-full flex-col gap-1.5 rounded p-1">
              {posts
                .filter(([day]) => day === i)
                .map(([, tone]) => (
                  <div key={tone} className={`h-8 rounded-sm ${tone}`} />
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {["Script", "Shoot", "Edit", "Live"].map((step, i) => (
          <span
            key={step}
            className={
              i === 2
                ? "rounded-pill bg-primary px-3 py-1 text-[12px] font-semibold text-white"
                : "rounded-pill border-line text-muted border bg-white px-3 py-1 text-[12px] font-medium"
            }
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

function PhysioPreview() {
  return (
    <div className="border-line shadow-lift mx-auto flex w-full max-w-[300px] flex-col gap-3 rounded-[24px] border bg-white p-4">
      <p className="text-ink text-[13px] font-semibold">Today&rsquo;s session</p>
      <div className="rounded-chip bg-chip-mint flex items-center gap-3 p-3">
        <span className="bg-primary font-heading flex size-10 items-center justify-center rounded-full text-sm font-bold text-white">
          SK
        </span>
        <div>
          <p className="text-[14px] font-semibold">Dr. Sabina K.</p>
          <p className="text-muted text-[12px]">Knee rehabilitation</p>
        </div>
      </div>
      <ul className="text-muted flex flex-col gap-2 text-[13px]">
        <li className="flex items-center gap-2">
          <Clock className="text-primary-dark size-4" /> 4:30 PM, 45 min
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="text-primary-dark size-4" /> Your home, Baneshwor
        </li>
        <li className="flex items-center gap-2">
          <CalendarDays className="text-primary-dark size-4" /> Session 4 of 8
        </li>
      </ul>
      <div className="bg-chip-teal h-2 rounded-full">
        <div className="bg-primary h-full w-1/2 rounded-full" />
      </div>
      <div className="mt-1 grid grid-cols-2 gap-2">
        <span className="rounded-button border-line border py-2 text-center text-[13px] font-semibold">
          Reschedule
        </span>
        <span className="rounded-button bg-primary py-2 text-center text-[13px] font-semibold text-white">
          Check in
        </span>
      </div>
    </div>
  );
}

export const productPreviews: Record<string, () => React.JSX.Element> = {
  "eco-creative": EcoPreview,
  "one-content-studio": StudioPreview,
  "physio-at-home": PhysioPreview,
};
