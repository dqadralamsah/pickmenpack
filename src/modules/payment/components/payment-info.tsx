import { connection } from "next/server";
import { QrCode, ShieldCheck } from "lucide-react";
import { CopyButton } from "@/components/shared/copy-button";
import { WhatsAppIcon } from "@/components/shared/icons";
import { getSettings } from "@/modules/admin/store";
import { nextStoreRun, runDay } from "@/modules/request/store-run";

// PRD 5.5: cek dulu → harga final → bayar penuh → baru dibeli. Tanpa DP.
// Belum ada payment gateway: rekening + gambar QRIS dikirim admin lewat WhatsApp
// bersama harga final. Halaman ini = panduan + daftar resmi untuk dicocokkan.

const policies = [
  ["Cancel before you transfer", "Free, no questions."],
  ["Missed the Saturday deadline", "Your order moves to next week's run, free."],
  ["Out of stock after you paid", "We offer a swap; if you'd rather not, full refund within 1 × 24 hours."],
  ["Price after you paid", "Never changes. What we quote is what you pay."],
];

/** Rekening & nomor WA dibaca dari Pengaturan admin — satu sumber (Implementation Status gap #2).
 *  Baris rekening berlabel "QRIS" = nama merchant QRIS (kolom "Atas nama"). */
export async function PaymentInfo() {
  await connection(); // tanggal store run dihitung per request
  const s = await getSettings();
  const isQris = (bank: string) => bank.trim().toUpperCase() === "QRIS";
  const banks = s.accounts.filter((a) => !isQris(a.bank) && a.nomor);
  const merchant = s.accounts.find((a) => isQris(a.bank))?.atasNama;
  const run = nextStoreRun();
  const chat = (text: string) => `https://wa.me/${s.waNumber}?text=${encodeURIComponent(text)}`;

  const steps = [
    { when: `Until ${runDay(run.cutoff)}, 23.59`, title: "Send your request", body: "Nothing to pay yet." },
    {
      when: `${runDay(run.quote)}, evening`,
      title: "Get your final total on WhatsApp",
      body: "We check stock and the exact price with the store, then send one message with the total (item + fee + shipping), our bank account and a QRIS image.",
    },
    {
      when: `By ${runDay(run.payBy)}, 09.00 WIB`,
      title: "Pay once, in full",
      body: "Transfer to the account in the chat, or save the QRIS image and scan it from your banking or e-wallet app.",
    },
    {
      when: runDay(run.shop),
      title: "Send the proof — we shop",
      body: "Reply with your receipt. We buy, check, photograph and pack your pair the same day.",
    },
  ];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12">
      <div className="min-w-0">
        <section aria-labelledby="alur">
          <h2 id="alur" className="text-lg font-bold">
            How paying works
          </h2>
          {/* Timeline: garis hijau menyambung bulatan nomor, urutannya terbaca sekali lihat. */}
          <ol className="mt-6">
            {steps.map((st, i) => (
              <li
                key={st.title}
                className="relative flex gap-4 pb-8 last:pb-0 before:absolute before:top-10 before:bottom-1 before:left-[17px] before:w-0.5 before:rounded-full before:bg-action/25 last:before:hidden"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-action text-sm font-bold text-paper ring-4 ring-action-soft">
                  {i + 1}
                </span>
                <div className="min-w-0 pt-1">
                  <p className="text-xs font-semibold tracking-wide text-action uppercase">{st.when}</p>
                  <h3 className="mt-0.5 font-sans text-base font-bold tracking-normal">{st.title}</h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-600">{st.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="contoh" className="mt-10">
          <h2 id="contoh" className="text-lg font-bold">
            What you&rsquo;ll get on WhatsApp
          </h2>
          <p className="mt-1 text-sm text-zinc-500">Example — numbers are for illustration.</p>
          {/* Mock chat: bukan data asli, cuma supaya customer tahu bentuk pesannya. */}
          {/* Satu-satunya blok berwarna di halaman: hijau = WhatsApp (token action). */}
          <figure className="mt-4 overflow-hidden rounded-3xl bg-action-soft">
            <div className="flex items-center gap-3 bg-action px-4 py-3 text-paper">
              <span className="flex size-9 items-center justify-center rounded-full bg-paper/15">
                <WhatsAppIcon className="size-5" />
              </span>
              <span className="text-sm leading-tight">
                <span className="block font-semibold">{s.brand}</span>
                <span className="text-xs text-paper/75">Official WhatsApp</span>
              </span>
            </div>
            <div className="p-4 sm:p-5">
              <div className="max-w-sm rounded-2xl rounded-tl-sm bg-paper p-4 text-sm leading-relaxed shadow-sm">
                <p>
                  Hi Rizky, final price for <strong>PMP-1009-004</strong>:
                </p>
                <dl className="mt-2 space-y-0.5 tabular-nums">
                  {[
                    ["Nike Revolution 7 · EU 42", "Rp539.000"],
                    ["Service fee", "Rp30.000"],
                    ["Shipping (J&T)", "Rp35.000"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 text-zinc-600">
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between gap-4 border-t border-zinc-200 pt-1 font-bold">
                    <dt>Total</dt>
                    <dd className="text-action">Rp604.000</dd>
                  </div>
                </dl>
                <p className="mt-2">
                  Please pay by <strong>{runDay(run.payBy)}, 09.00 WIB</strong> to {banks[0]?.bank ?? "our bank"} or scan the
                  QRIS below.
                </p>
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-zinc-100 p-2.5">
                  <span className="flex size-12 items-center justify-center rounded-lg bg-paper">
                    <QrCode aria-hidden className="size-7" />
                  </span>
                  <span className="text-xs text-zinc-500">
                    QRIS image
                    <br />
                    <span className="font-medium text-ink">Tap &amp; hold to save</span>
                  </span>
                </div>
              </div>
            </div>
            <figcaption className="sr-only">Example WhatsApp message with the final price and payment details</figcaption>
          </figure>
        </section>

        <dl className="mt-10 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 text-sm">
          {policies.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-0.5 px-4 py-3.5 sm:flex-row sm:justify-between sm:gap-4">
              <dt className="flex items-center gap-2 font-semibold">
                <span aria-hidden className="h-4 w-1 rounded-full bg-action" />
                {k}
              </dt>
              <dd className="text-zinc-500 sm:text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <aside aria-labelledby="cek" className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl border border-zinc-200 p-5 sm:p-6">
          <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-action uppercase">
            <ShieldCheck aria-hidden className="size-4" />
            Official details
          </p>
          <h2 id="cek" className="mt-2 text-xl font-bold">
            Check before you pay
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-zinc-500">
            The details in your chat must match this list.
          </p>

          <h3 className="mt-6 font-sans text-sm font-semibold tracking-normal">Bank accounts</h3>
          <ul className="mt-2 space-y-2">
            {banks.map((a) => (
              <li key={a.bank + a.nomor} className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-50 p-3.5">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-action">{a.bank}</p>
                  <p className="mt-0.5 truncate font-mono text-base font-semibold tracking-wide">{a.nomor}</p>
                  <p className="truncate text-xs text-zinc-500">a/n {a.atasNama}</p>
                </div>
                <CopyButton value={a.nomor} label={`${a.bank} account number`} />
              </li>
            ))}
          </ul>

          <h3 className="mt-6 font-sans text-sm font-semibold tracking-normal">QRIS</h3>
          <p className="mt-2 flex gap-3 rounded-2xl bg-info-soft p-3.5 text-sm leading-relaxed text-zinc-700">
            <QrCode aria-hidden className="mt-0.5 size-5 shrink-0 text-info" />
            <span>
              Sent as an image in your chat, never posted publicly.
              {merchant && (
                <>
                  {" "}
                  When you scan it, the merchant name shows <strong className="text-ink">{merchant}</strong> — that&rsquo;s us.
                </>
              )}
            </span>
          </p>

          <h3 className="mt-6 font-sans text-sm font-semibold tracking-normal">Our only WhatsApp</h3>
          <a
            href={chat(`Hi ${s.brand}, I have a question about paying for my order.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-full bg-action px-5 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-action-hover"
          >
            <WhatsAppIcon className="size-4" />
            +{s.waNumber}
          </a>

          <p className="mt-6 flex gap-3 rounded-2xl bg-info-soft p-3.5 text-sm leading-relaxed text-ink">
            <ShieldCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-info" />
            <span>
              We never ask for a deposit, and never for payment to an account that isn&rsquo;t listed here. If anything
              looks off, message us before you transfer.
            </span>
          </p>
        </div>
      </aside>
    </div>
  );
}
