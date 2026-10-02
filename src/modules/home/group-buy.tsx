import { rupiah } from "@/lib/format";
import { allocateGroupDiscount, estimateFee, estimateTotal } from "@/modules/request/fee";

// Contoh yang sama persis dengan PRD Section 2.6 — angkanya diturunkan dari
// fee.ts, bukan diketik ulang, biar gak pernah beda sama kalkulator di /request.
const TIER = 3_000_000; // minimum belanja buat dapat extra 10%
const EXTRA = 0.1;

const orders = [
  { id: "A", label: "Another customer", net: 1_200_000 },
  { id: "B", label: "You", net: 800_000, you: true },
  { id: "C", label: "Another customer", net: 1_000_000 },
];

const nets = orders.map((o) => o.net);
const pooled = nets.reduce((a, b) => a + b, 0);
const discount = Math.round(pooled * EXTRA);
const shares = allocateGroupDiscount(nets, discount);

const rows = orders.map((o, i) => ({
  ...o,
  share: shares[i],
  final: o.net - shares[i],
  portion: o.net / pooled,
}));

const you = rows[1];
const LABEL_PRICE = 1_000_000; // harga sebelum diskon toko untuk pesanan B
const storeDiscount = LABEL_PRICE - you.net;

const before = estimateTotal(you.net, "cod");
const after = estimateTotal(you.final, "cod");
const fee = estimateFee(you.final);

const pct = (n: number) => `${(n * 100).toFixed(1).replace(".0", "")}%`;
const range = (r: { min: number; max: number }) => `${rupiah(r.min)} – ${rupiah(r.max)}`;

export function GroupBuy() {
  return (
    <div className="space-y-4">
      <div className="grid gap-px overflow-hidden rounded-2xl bg-zinc-200 lg:grid-cols-2">
        {/* Kiri: kenapa digabung — satu bar yang kebuka karena patungan. */}
        <div className="bg-paper p-6 sm:p-8">
          <p className="eyebrow text-accent">Step 1 · The pool</p>
          <h3 className="mt-3 text-lg font-medium">
            Your order rides along with the others in the same store run
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Store promos are usually tiered by spend. One pair rarely reaches the
            bar. Three orders at the same till do.
          </p>

          {/* Bar = target minimum belanja; tiap segmen porsi satu pesanan. */}
          <div className="mt-7">
            <div className="flex h-11 gap-px overflow-hidden rounded-xl bg-zinc-200">
              {rows.map((r) => (
                <div
                  key={r.id}
                  style={{ flexGrow: r.portion }}
                  className={`flex basis-0 items-center justify-center overflow-hidden text-[11px] font-medium ${
                    r.you ? "bg-accent text-paper" : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {r.you ? "You" : r.id}
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-baseline justify-between text-xs text-zinc-500">
              <span>
                You fill <span className="font-medium text-accent">{pct(you.portion)}</span> of the bar
              </span>
              <span>
                Tier at <span className="font-mono text-zinc-700">{rupiah(TIER)}</span>
              </span>
            </div>
          </div>

          <dl className="mt-6 space-y-2.5 border-t border-zinc-200 pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Total at the till</dt>
              <dd className="font-mono">{rupiah(pooled)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Extra {EXTRA * 100}% unlocked</dt>
              <dd className="font-mono font-medium text-accent">−{rupiah(discount)}</dd>
            </div>
          </dl>

          <p className="mt-5 text-sm leading-relaxed text-zinc-600">
            That {rupiah(discount)} is not ours to keep. It goes back to the
            three orders that earned it, split by what each one contributed:
          </p>

          <ul className="mt-4 space-y-1.5">
            {rows.map((r) => (
              <li
                key={r.id}
                className={`flex items-baseline justify-between gap-3 rounded-lg px-3 py-2 text-sm ${
                  r.you ? "bg-accent-soft" : "bg-zinc-50"
                }`}
              >
                <span className={r.you ? "font-medium" : "text-zinc-500"}>
                  {r.you ? "Your order" : `Order ${r.id}`}
                  <span className="ml-2 font-mono text-xs text-zinc-400">{pct(r.portion)}</span>
                </span>
                <span className="font-mono text-[13px]">
                  <span className={r.you ? "text-accent" : "text-zinc-500"}>−{rupiah(r.share)}</span>
                  <span className="ml-2 text-zinc-400">→ {rupiah(r.final)}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Kanan: rincian perhitungan — pengganti struk. */}
        <div className="bg-paper p-6 sm:p-8">
          <p className="eyebrow text-accent">Step 2 · Your invoice</p>
          <h3 className="mt-3 text-lg font-medium">Every line, all the way down</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            The final invoice shows the whole chain, so you can check the fee
            against the price yourself.
          </p>

          <dl className="mt-7 space-y-3 rounded-xl border border-zinc-200 bg-white p-5 text-sm">
            {[
              ["Label price", rupiah(LABEL_PRICE), ""],
              ["Store discount", `−${rupiah(storeDiscount)}`, ""],
              ["Net after store discount", rupiah(you.net), "rule"],
              ["Your share of the group discount", `−${rupiah(you.share)}`, "accent"],
              ["Net price", rupiah(you.final), "rule strong"],
              ["Service fee — flat, tiered", `+${range(fee)}`, ""],
            ].map(([term, value, mod]) => (
              <div
                key={term}
                className={`flex items-baseline justify-between gap-4 ${
                  mod.includes("rule") ? "border-t border-zinc-200 pt-3" : ""
                }`}
              >
                <dt className={mod.includes("strong") ? "font-medium" : "text-zinc-500"}>{term}</dt>
                <dd
                  className={`font-mono text-[13px] whitespace-nowrap ${
                    mod.includes("accent") ? "font-medium text-accent" : ""
                  } ${mod.includes("strong") ? "font-medium" : ""}`}
                >
                  {value}
                </dd>
              </div>
            ))}

            <div className="flex items-baseline justify-between gap-4 border-t-2 border-ink pt-3">
              <dt className="font-medium">You pay</dt>
              <dd className="font-mono text-[13px] font-semibold whitespace-nowrap">{range(after)}</dd>
            </div>
          </dl>

          <div className="mt-4 rounded-xl bg-accent-soft px-5 py-4 text-sm">
            <div className="flex items-baseline justify-between gap-4 text-zinc-600">
              <span>Your estimate at request time</span>
              <span className="font-mono text-[13px] whitespace-nowrap">{range(before)}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between gap-4 font-medium">
              <span>Refunded to you</span>
              <span className="font-mono text-[13px] whitespace-nowrap text-accent">
                {rupiah(you.net - you.final)}
              </span>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            The service fee is the only thing we keep — and because it is
            calculated on the net price <em>after</em> every discount, a deeper
            group discount lowers our fee too.
          </p>
        </div>
      </div>

      {/* Dua janji yang bikin mekanik ini gak merugikan customer. */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 p-6">
          <p className="eyebrow">The estimate never assumes it</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            We quote you as if you were shopping alone. If the run misses the
            tier, you simply pay the estimate. Group buying can only push the
            final number down, never up.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 p-6">
          <p className="eyebrow">Why there is no original receipt</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            One till transaction covers several customers, so the paper receipt
            carries other people&rsquo;s orders on it. You get the full
            arithmetic above instead, plus photos of your pair before it is
            packed.
          </p>
        </div>
      </div>
    </div>
  );
}
