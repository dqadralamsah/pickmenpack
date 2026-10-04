import { ArrowRight } from "@/components/shared/icons";
import { tones, type Tone } from "@/lib/tones";

const steps: { title: string; body: string; tone: Tone }[] = [
  { title: "Pick & request", body: "Choose from the shop or just describe the pair you want.", tone: "peach" },
  { title: "Get the exact price", body: "On Friday we check stock and price with the store, then send the final total on WhatsApp.", tone: "yellow" },
  { title: "Pay once, in full", body: "Pay by Saturday 09.00. No deposit — change your mind before paying and it’s free.", tone: "lime" },
  { title: "We shop & pack", body: "Saturday at the mall: checked in person, photographed, packed.", tone: "sky" },
  { title: "Get your pair", body: "COD around the service area, or insured courier for the rest of Indonesia.", tone: "pink" },
];

/** Kartu langkah warna-warni dengan nomor besar. Mobile: geser horizontal. */
export function HowItWorks() {
  return (
    <ol className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-5">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className={`relative flex w-[72%] shrink-0 snap-start flex-col rounded-3xl p-5 sm:w-auto sm:p-6 ${tones[s.tone]}`}
        >
          <span aria-hidden className="font-heading text-5xl leading-none font-bold text-ink/15 sm:text-6xl">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="sr-only">Step {i + 1}: </span>
          <h3 className="mt-6 font-semibold">{s.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink/70">{s.body}</p>
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute top-1/2 -right-3.5 z-10 hidden h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-sm lg:flex"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
