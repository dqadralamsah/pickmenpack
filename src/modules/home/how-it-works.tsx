const steps = [
  { title: "Pick & request", body: "Choose from the catalog or just describe the pair you want." },
  { title: "Get the exact price", body: "On Friday we check stock and price with the store, then send the final total on WhatsApp." },
  { title: "Pay once, in full", body: "Transfer by Saturday 09.00. No deposit — and if you change your mind before paying, it's free." },
  { title: "We shop & pack", body: "Saturday at the mall: checked in person, photographed, packed. Out of stock? Swap or full refund." },
  { title: "Get your pair", body: "COD around the service area, or insured courier for the rest of Indonesia." },
];

/** Timeline: garis vertikal + dot di mobile, garis horizontal di desktop. */
export function HowItWorks() {
  return (
    <ol className="relative grid gap-7 lg:grid-cols-5 lg:gap-8">
      <span
        aria-hidden
        className="absolute top-4 bottom-4 left-[15px] w-px bg-zinc-200 lg:top-[15px] lg:right-6 lg:bottom-auto lg:left-6 lg:h-px lg:w-auto"
      />

      {steps.map((s, i) => (
        <li key={s.title} className="relative flex gap-4 lg:block">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-paper font-mono text-[11px] font-medium text-zinc-500 transition-colors lg:h-8 lg:w-8">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="lg:mt-5">
            <h3 className="font-medium lg:text-[15px]">{s.title}</h3>
            <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-zinc-600">
              {s.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
