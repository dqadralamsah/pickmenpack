import { connection } from "next/server";
import { site } from "@/lib/site";
import { getSettings } from "@/modules/admin/store";

// PRD 5.5: cek dulu → harga final → bayar penuh → baru dibeli. Tanpa DP.
const steps = [
  "Send your request through the form. Nothing to pay yet.",
  "On Friday we check stock and the exact price with the store, then send you the final total (item + fee + shipping) on WhatsApp.",
  "Happy with it? Transfer the full amount to one of the accounts below by Saturday 09.00 WIB.",
  "Send the transfer proof over WhatsApp.",
  "Saturday we buy, check and photograph your pair, then pack it.",
  "It ships Sunday (Monday at the latest) by tracked courier, or we meet for COD.",
];

const policies = [
  ["Cancel before you transfer", "Free, no questions."],
  ["Missed the Saturday deadline", "Your order moves to next week's run, free."],
  ["Out of stock after you paid", "We offer a swap; if you'd rather not, full refund within 1 × 24 hours."],
  ["Price after you paid", "Never changes. What we quote is what you pay."],
];

/** Rekening & nomor WA dibaca dari Pengaturan admin — satu sumber (Implementation Status gap #2). */
export async function PaymentInfo() {
  await connection();
  const s = await getSettings();
  const proof = `https://wa.me/${s.waNumber}?text=${encodeURIComponent("Hi, here is the transfer proof for my order.")}`;

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
      <section aria-labelledby="alur">
        <h2 id="alur" className="text-lg font-bold">
          Payment flow
        </h2>
        {/* Garis vertikal menyambungkan langkah — urutannya jadi terbaca sekali lihat. */}
        <ol className="mt-5 space-y-4">
          {steps.map((step, i) => (
            <li
              key={step}
              className="flex gap-3 text-sm leading-relaxed text-zinc-700"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-paper">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <dl className="mt-8 divide-y divide-zinc-200 rounded-xl border border-zinc-200 text-sm">
          {policies.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="font-semibold">{k}</dt>
              <dd className="text-zinc-500 sm:text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="rekening">
        <h2 id="rekening" className="text-lg font-bold">
          Where to send it
        </h2>
        <ul className="mt-5 space-y-2.5">
          {s.accounts.map((a) => (
            <li
              key={a.bank}
              className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 p-4"
            >
              <div className="min-w-0">
                <p className="eyebrow">{a.bank}</p>
                <p className="mt-1 truncate font-mono text-base font-semibold tracking-wide">
                  {a.nomor}
                </p>
              </div>
              <p className="shrink-0 text-right text-xs leading-relaxed text-zinc-500">
                a/n
                <br />
                {a.atasNama}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-3 flex aspect-[4/3] max-h-56 items-center justify-center rounded-xl bg-zinc-100">
          <span className="text-sm text-zinc-600">QRIS {s.brand}</span>
        </div>

        <p className="mt-5 rounded-xl bg-zinc-100 px-4 py-3.5 text-sm leading-relaxed text-zinc-700">
          After transferring, send the proof to WhatsApp{" "}
          <a
            href={proof}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-ink underline underline-offset-2"
          >
            {s.waNumber}
          </a>
          . Only transfer after you&rsquo;ve received the final price, and only to the
          accounts above — payments elsewhere aren&rsquo;t covered by {site.brand}.
        </p>
      </section>
    </div>
  );
}
