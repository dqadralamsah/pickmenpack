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
  "It ships Sunday (Monday at the latest) by insured courier, or we meet for COD.",
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
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="text-lg font-semibold">Payment flow</h2>
        <ol className="mt-4 space-y-3">
          {steps.map((step, i) => (
            <li key={step} className="flex gap-3 text-sm leading-relaxed text-zinc-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-[11px] text-accent">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <dl className="mt-6 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white text-sm">
          {policies.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="font-medium">{k}</dt>
              <dd className="text-zinc-600 sm:text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Where to send it</h2>
        <div className="mt-4 space-y-3">
          {s.accounts.map((a) => (
            <div
              key={a.bank}
              className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4"
            >
              <div>
                <p className="text-xs text-zinc-500">{a.bank}</p>
                <p className="font-mono font-semibold">{a.nomor}</p>
              </div>
              <p className="text-right text-xs text-zinc-500">a/n {a.atasNama}</p>
            </div>
          ))}
          <div className="flex h-44 items-center justify-center rounded-xl border border-dashed border-zinc-300 text-sm text-zinc-500">
            [ QRIS {s.brand} ]
          </div>
        </div>

        <p className="mt-4 border-l-2 border-accent bg-accent-soft py-3.5 pr-4 pl-4 text-sm leading-relaxed text-zinc-700">
          After transferring, send the proof to WhatsApp{" "}
          <a href={proof} className="font-semibold underline">
            {s.waNumber}
          </a>
          . Only transfer after you&rsquo;ve received the final price, and only to the
          accounts above — payments elsewhere aren&rsquo;t covered by {site.brand}.
        </p>
      </div>
    </div>
  );
}
