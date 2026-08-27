import { site, waLink } from "@/lib/site";

// Dummy accounts — swap for the real ones before go-live.
const accounts = [
  { bank: "BCA", number: "1234567890", holder: "Dicky Qadr Alamsah" },
  { bank: "Mandiri", number: "9876543210", holder: "Dicky Qadr Alamsah" },
  { bank: "QRIS", number: "Scan the code below", holder: "PickmenPack" },
];

const steps = [
  "Send the request through the form; we confirm availability at the store.",
  "Pay a 50% deposit of the upper estimate to one of the accounts below.",
  "Send the transfer proof over WhatsApp.",
  "We buy the item and send the final invoice at the actual net price.",
  "Settle the rest — or get a refund if the net price came in lower.",
  "The pair ships by courier, or we meet for COD. Your call.",
];

export function PaymentInfo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <h2 className="text-lg font-semibold">Payment flow</h2>
        <ol className="mt-4 space-y-3">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-3 text-sm text-zinc-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-[10px] text-accent">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Where to send it</h2>
        <div className="mt-4 space-y-3">
          {accounts.map((a) => (
            <div
              key={a.bank}
              className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 p-4"
            >
              <div>
                <p className="text-xs text-zinc-500">{a.bank}</p>
                <p className="font-mono font-semibold">{a.number}</p>
              </div>
              <p className="text-right text-xs text-zinc-500">a/n {a.holder}</p>
            </div>
          ))}
          <div className="flex h-44 items-center justify-center rounded-xl border border-dashed border-zinc-300 text-sm text-zinc-400">
            [ QRIS PickmenPack ]
          </div>
        </div>

        <p className="mt-4 border-l-2 border-accent bg-accent-soft py-3.5 pr-4 pl-4 text-sm leading-relaxed text-zinc-700">
          After transferring, send the proof to WhatsApp{" "}
          <a href={waLink("Hi, here is the transfer proof for my deposit.")} className="font-semibold underline">
            {site.waNumber}
          </a>
          . Payments to any account other than these are not covered by {site.brand}.
        </p>
      </div>
    </div>
  );
}
