import { connection } from "next/server";
import { TagIcon, WalletIcon, ShieldIcon, StoreIcon } from "@/components/shared/icons";
import { tones, type Tone } from "@/lib/tones";
import { nextStoreRun, runDay, runTime } from "@/modules/request/store-run";

/** Tiap langkah dapat satu warna pop — titik timeline & label harinya. */
const stepTones = ["bg-pop-peach", "bg-pop-yellow", "bg-pop-lime", "bg-pop-sky", "bg-pop-violet"];

/** Jadwal store run berikutnya + cutoff (PRD 6.1), dihitung per request.
 *  Kartu gelap supaya jadi "jangkar" visual di tengah halaman yang terang. */
export async function StoreRunSchedule() {
  await connection(); // jadwal tergantung jam sekarang — jangan di-prerender
  const run = nextStoreRun();
  const steps = [
    { when: `${runDay(run.cutoff)}, ${runTime(run.cutoff)}`, what: "Request cutoff", note: "Later requests join next week’s run." },
    { when: `${runDay(run.quote)}, evening`, what: "Exact price on WhatsApp", note: "Checked with the store first." },
    { when: `${runDay(run.payBy)}, ${runTime(run.payBy)}`, what: "Pay in full", note: "Not ready? Move to next week, free." },
    { when: runDay(run.shop), what: "We shop, check & pack", note: "Paid orders only, photos before packing." },
    { when: runDay(run.ship), what: "Shipped or COD", note: "Monday at the latest." },
  ];

  return (
    <div className="on-dark overflow-hidden rounded-3xl bg-ink text-paper">
      <div className="flex flex-wrap items-end justify-between gap-4 px-6 pt-7 sm:px-10 sm:pt-10">
        <div>
          <p className="flex items-center gap-2 text-sm text-paper/70">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pop-lime opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pop-lime" />
            </span>
            Requests open now
          </p>
          <p className="mt-2 font-heading text-3xl font-bold sm:text-4xl">
            Next mall run: <span className="text-pop-lime">{runDay(run.shop)}</span>
          </p>
        </div>
        <p className="rounded-full border border-paper/20 px-3 py-1.5 text-xs text-paper/80">
          Cutoff {runDay(run.cutoff)}, {runTime(run.cutoff)} WIB
        </p>
      </div>

      {/* Timeline: vertikal di mobile, horizontal mulai lg. Garis penghubung
          digambar di belakang titik-titiknya. */}
      <ol className="relative grid gap-6 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-5 lg:gap-4">
        <span aria-hidden className="absolute top-[3.125rem] bottom-16 left-[2.625rem] w-px bg-paper/15 sm:top-[3.625rem] sm:left-[3.625rem] lg:right-10 lg:bottom-auto lg:left-10 lg:h-px lg:w-auto" />
        {steps.map((s, i) => (
          <li key={s.what} className="relative flex gap-4 lg:block">
            <span
              className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold text-ink ring-4 ring-ink ${stepTones[i]}`}
            >
              {i + 1}
            </span>
            <div className="lg:mt-4">
              <p className="text-xs font-medium text-paper/60">{s.when}</p>
              <p className="mt-1 font-semibold">{s.what}</p>
              <p className="mt-1 text-sm leading-relaxed text-paper/70">{s.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Kebijakan harga per-item & struk (PRD 5.8). */
const rules: { icon: typeof TagIcon; title: string; body: string; tone: Tone }[] = [
  {
    icon: TagIcon,
    title: "Your item, your price",
    body: "Each item is billed at the store discount that applies to that item — nothing is averaged across other orders.",
    tone: "peach",
  },
  {
    icon: WalletIcon,
    title: "Fee stays separate",
    body: "The service fee is added on top of the net price, from Rp25k per item. You see both before you pay.",
    tone: "yellow",
  },
  {
    icon: ShieldIcon,
    title: "No surprise top-ups",
    body: "The price we send on Friday is the price you pay. It never goes up after you transfer.",
    tone: "mint",
  },
  {
    icon: StoreIcon,
    title: "Why no original receipt",
    body: "One till receipt covers several customers. You get a written breakdown plus photos of your pair.",
    tone: "violet",
  },
];

export function StoreRunRules() {
  return (
    <ul className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      {rules.map((r) => (
        <li key={r.title} className="rounded-2xl border border-zinc-200 bg-white p-5">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tones[r.tone]}`}>
            <r.icon className="h-5 w-5" />
          </span>
          <h3 className="mt-4 text-sm font-semibold">{r.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-zinc-500">{r.body}</p>
        </li>
      ))}
    </ul>
  );
}
