import Link from "next/link";
import { site } from "@/lib/site";

const quick = [
  ["Service fee", "from Rp25k"],
  ["Deposit", "none — pay once"],
  ["Exact price", "every Friday"],
  ["Cancel before paying", "free"],
  ["COD area", site.serviceArea],
];

const trust = [
  "Bought at official stores",
  "Price confirmed before you pay",
  `COD ${site.serviceArea}`,
  "Insured nationwide shipping",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-paper">
      <div aria-hidden className="dotted pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 pt-9 pb-8 sm:px-6 sm:pt-20 sm:pb-20">
        <div className="lg:grid lg:grid-cols-[1fr_20rem] lg:items-center lg:gap-14">
          <div className="max-w-3xl">
            <p className="eyebrow flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Sale season · 12.12 &amp; end of season
            </p>

            <h1 className="mt-5 text-[32px] leading-[1.05] font-semibold sm:mt-7 sm:text-[62px]">
              Sneakers on sale,
              <span className="block text-zinc-400">bought at the official store.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-600 sm:mt-7 sm:text-base">
              {site.brand} walks into the store for you. We check stock and the
              exact price first, you pay once in full, and only then do we buy —
              checked in person, packed with photos. No deposit, no surprise
              top-ups.
            </p>

            <div className="mt-7 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:gap-3">
              <Link
                href="/request"
                className="rounded-full bg-accent px-6 py-3.5 text-center text-sm font-medium text-paper transition-colors active:scale-[.98] sm:py-3 sm:hover:bg-accent-dark"
              >
                Get an estimate
              </Link>
              <Link
                href="/katalog"
                className="rounded-full border border-zinc-300 px-6 py-3.5 text-center text-sm font-medium transition-colors active:bg-zinc-100 sm:py-3 sm:hover:border-accent"
              >
                Browse catalog
              </Link>
            </div>
          </div>

          {/* Panel ringkas — desktop only, biar sisi kanan hero gak kosong. */}
          <aside className="hidden rounded-2xl border border-zinc-200 bg-white p-6 lg:block">
            <p className="eyebrow text-accent">At a glance</p>
            <dl className="mt-4 divide-y divide-zinc-200 text-sm">
              {quick.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-zinc-500">{k}</dt>
                  <dd className="font-mono text-[13px] font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <ul className="no-scrollbar -mx-4 mt-8 flex gap-6 overflow-x-auto border-t border-zinc-200 px-4 pt-5 sm:mx-0 sm:mt-16 sm:gap-10 sm:px-0 sm:pt-6">
          {trust.map((t) => (
            <li key={t} className="eyebrow shrink-0 whitespace-nowrap">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Nilai jual (PRD 1.1, 5.3–5.5) — store run mingguan punya section sendiri. */
const winWin = [
  {
    title: "Bought at the official counter",
    body: "We walk into the brand's own store at the mall. Size, condition and authenticity are checked by hand before anything is packed.",
  },
  {
    title: "A clear, tiered fee",
    body: "From Rp25k per item, based on the net price after store discounts. You see the fee range up front and the exact amount before you pay.",
  },
  {
    title: "Check first, pay once",
    body: "No deposit. We confirm stock and the exact price with the store, you transfer once, then we buy. Cancel before paying and it costs nothing.",
  },
  {
    title: "Insured all the way to your door",
    body: "J&T Express with cover up to Rp20 million and shoe-specific packing, so a pair worth more than a million still travels safely.",
  },
];

export function WhyUs() {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
      {winWin.map((w, i) => (
        <div key={w.title} className="flex flex-col bg-paper p-6 sm:p-7">
          <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 font-medium">{w.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{w.body}</p>
        </div>
      ))}
    </div>
  );
}
