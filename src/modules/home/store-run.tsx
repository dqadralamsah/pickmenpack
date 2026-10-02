import { connection } from "next/server";
import { nextStoreRun, runDay, runTime } from "@/modules/request/store-run";

/** Jadwal store run berikutnya + cutoff (PRD 6.1), dihitung per request. */
export async function StoreRunSchedule() {
  await connection(); // jadwal tergantung jam sekarang — jangan di-prerender
  const run = nextStoreRun();
  const steps = [
    { when: `${runDay(run.cutoff)} · ${runTime(run.cutoff)}`, what: "Request cutoff", note: "Later requests join the next week's run." },
    { when: `${runDay(run.quote)} · evening`, what: "Exact price on WhatsApp", note: "We check stock and price with the store first." },
    { when: `${runDay(run.payBy)} · ${runTime(run.payBy)}`, what: "Transfer in full", note: "Not ready? You simply move to next week, free." },
    { when: runDay(run.shop), what: "We shop, check & pack", note: "Only paid orders. Photos before packing." },
    { when: runDay(run.ship), what: "Shipped or COD", note: "Monday at the latest, tracking number sent." },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-5 py-4 sm:px-6">
        <p className="flex items-center gap-2 text-sm font-medium">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Next store run: {runDay(run.shop)}
        </p>
        <p className="eyebrow">All times WIB</p>
      </div>

      <ol className="grid divide-y divide-zinc-100 sm:grid-cols-5 sm:divide-x sm:divide-y-0">
        {steps.map((s, i) => (
          <li key={s.what} className="flex gap-4 px-5 py-4 sm:block sm:px-5 sm:py-5">
            <span className="font-mono text-[11px] font-medium text-accent">{String(i + 1).padStart(2, "0")}</span>
            <div className="sm:mt-2">
              <p className="text-xs text-zinc-500">{s.when}</p>
              <p className="mt-0.5 text-sm font-medium">{s.what}</p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{s.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Kebijakan harga per-item & struk (PRD 5.8) — pengganti mekanik diskon proporsional. */
const rules = [
  {
    title: "Your item, your price",
    body: "Each item is billed at the store discount that applies to that item. Nothing is averaged across other people's orders.",
  },
  {
    title: "Fee stays separate",
    body: "The service fee is added on top of the net price, from Rp25k per item. You see both numbers before you pay.",
  },
  {
    title: "No surprise top-ups",
    body: "The price we send on Friday is the price you pay. It never goes up after you transfer.",
  },
  {
    title: "Why no original receipt",
    body: "One till receipt covers several customers. You get a written breakdown — label price, store discount, net, fee — plus photos of your pair.",
  },
];

export function StoreRunRules() {
  return (
    <div className="mt-4 grid gap-px overflow-hidden rounded-2xl bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
      {rules.map((r) => (
        <div key={r.title} className="bg-paper p-5 sm:p-6">
          <h3 className="font-medium">{r.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{r.body}</p>
        </div>
      ))}
    </div>
  );
}
