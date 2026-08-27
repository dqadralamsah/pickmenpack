"use client";

import { useState } from "react";
import { rupiah } from "@/lib/format";
import { site, waLink } from "@/lib/site";
import { estimateFee, estimateTotal, dpAmount, ONGKIR, type Delivery } from "./fee";

// text-base (16px) wajib di mobile — di bawah itu Safari iOS auto-zoom saat input difokus.
const field =
  "w-full rounded-xl border border-zinc-300 px-3.5 py-3 text-base outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 sm:text-sm";
const label = "mb-1.5 block text-sm font-medium";

const sizePreset = ["38", "39", "40", "41", "42", "43", "44"];

const range = (r: { min: number; max: number }) =>
  r.min === r.max ? rupiah(r.min) : `${rupiah(r.min)} – ${rupiah(r.max)}`;

export function RequestForm({ defaultItem = "" }: { defaultItem?: string }) {
  const [item, setItem] = useState(defaultItem);
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [delivery, setDelivery] = useState<Delivery>("cod");
  const [sent, setSent] = useState<string | null>(null);

  const netPrice = Number(price) || 0;
  const fee = estimateFee(netPrice);
  const total = estimateTotal(netPrice, delivery);
  const dp = dpAmount(total);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const pesan = [
      `Hi ${site.brand}, I'd like you to buy this for me:`,
      `Name: ${f.get("nama")}`,
      `Item: ${f.get("item")}`,
      `Size: ${f.get("ukuran")}`,
      `Estimated price: ${rupiah(netPrice)}`,
      `Delivery: ${delivery === "cod" ? `COD ${site.serviceArea}` : "Courier, out of town"}`,
      f.get("referensi") ? `Reference: ${f.get("referensi")}` : "",
      f.get("catatan") ? `Notes: ${f.get("catatan")}` : "",
      `Estimated total: ${range(total)}`,
      `Deposit (50% of upper estimate): ${rupiah(dp)}`,
    ]
      .filter(Boolean)
      .join("\n");
    setSent(pesan);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <p className="eyebrow">Step 2 of 2</p>
        <h2 className="mt-3 text-2xl font-semibold">
          Your request is ready
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Last step: send this summary over WhatsApp so we can check stock and
          size at the store. Nothing is paid until availability is confirmed.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-zinc-200 bg-zinc-50 p-4 font-sans text-xs leading-relaxed whitespace-pre-wrap text-zinc-700">
          {sent}
        </pre>
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
          <a
            href={waLink(sent)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-emerald-700 px-5 py-3.5 text-center text-sm font-medium text-white active:scale-[.98] sm:py-2.5 sm:hover:bg-emerald-700"
          >
            Send via WhatsApp
          </a>
          <button
            onClick={() => setSent(null)}
            className="rounded-full border border-zinc-300 bg-white px-5 py-3.5 text-sm font-medium active:bg-zinc-50 sm:py-2.5"
          >
            Edit request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-[1fr_21rem] lg:gap-6">
      <div className="space-y-5 rounded-2xl border border-zinc-200 p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="nama">
              Name
            </label>
            <input
              id="nama"
              name="nama"
              required
              autoComplete="name"
              className={field}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className={label} htmlFor="wa">
              WhatsApp number
            </label>
            <input
              id="wa"
              name="wa"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              pattern="[0-9+ ]{9,16}"
              className={field}
              placeholder="08xxxxxxxxxx"
            />
          </div>
        </div>

        <div>
          <label className={label} htmlFor="item">
            What should we buy?
          </label>
          <input
            id="item"
            name="item"
            required
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className={field}
            placeholder="e.g. Nike Revolution 7"
          />
        </div>

        <div>
          <label className={label} htmlFor="ukuran">
            Size
          </label>
          <div className="no-scrollbar -mx-4 mb-2 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {sizePreset.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setSize(u)}
                className={`h-11 w-11 shrink-0 rounded-xl border text-sm font-medium transition-colors ${
                  size === u
                    ? "border-accent bg-accent text-paper"
                    : "border-zinc-200 text-zinc-600 active:bg-zinc-100"
                }`}
              >
                {u}
              </button>
            ))}
          </div>
          <input
            id="ukuran"
            name="ukuran"
            required
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className={field}
            placeholder="Or type another size (e.g. 37.5 / US 9)"
          />
        </div>

        <div>
          <label className={label} htmlFor="harga">
            Estimated item price
          </label>
          <div className="relative">
            <span className="absolute top-1/2 left-3.5 -translate-y-1/2 text-base text-zinc-400 sm:text-sm">
              Rp
            </span>
            <input
              id="harga"
              name="harga"
              type="number"
              inputMode="numeric"
              min={50_000}
              step={1000}
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`${field} pl-11`}
              placeholder="750000"
            />
          </div>
          <p className="mt-1.5 text-xs text-zinc-500">
            A rough store price is enough — the exact number is confirmed once
            we check it in person.
          </p>
        </div>

        <div>
          <label className={label} htmlFor="referensi">
            Reference link <span className="text-zinc-400">(optional)</span>
          </label>
          <input
            id="referensi"
            name="referensi"
            type="url"
            inputMode="url"
            className={field}
            placeholder="Product link or IG post"
          />
        </div>

        <fieldset>
          <legend className={label}>How do you want it delivered?</legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {(
              [
                ["cod", `COD ${site.serviceArea}`, "Free delivery, handed over in person"],
                ["kirim", "Courier, out of town", `Shipping ${range(ONGKIR.kirim)} · J&T`],
              ] as const
            ).map(([value, title, note]) => (
              <label
                key={value}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-colors ${
                  delivery === value
                    ? "border-brand bg-brand-soft"
                    : "border-zinc-200 active:bg-zinc-50"
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value={value}
                  checked={delivery === value}
                  onChange={() => setDelivery(value)}
                  className="sr-only"
                />
                <span
                  className={`mt-0.5 h-4 w-4 shrink-0 rounded-full border-[5px] transition-colors ${
                    delivery === value ? "border-brand" : "border-zinc-300"
                  }`}
                />
                <span>
                  <span className="block font-medium">{title}</span>
                  <span className="text-xs text-zinc-500">{note}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className={label} htmlFor="catatan">
            Notes <span className="text-zinc-400">(optional)</span>
          </label>
          <textarea
            id="catatan"
            name="catatan"
            rows={3}
            className={field}
            placeholder="Colour, backup size, anything else."
          />
        </div>
      </div>

      {/* Rincian: sidebar sticky di desktop, kartu biasa di mobile. */}
      <aside className="mb-24 h-fit space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 lg:sticky lg:top-24 lg:mb-0">
        <h2 className="font-semibold">Cost estimate</h2>

        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-zinc-500">Item price</dt>
            <dd>{rupiah(netPrice)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-zinc-500">Service fee</dt>
            <dd className="text-right">{netPrice ? range(fee) : "—"}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-zinc-500">Shipping + packing</dt>
            <dd className="text-right">
              {delivery === "cod" ? "Free" : range(ONGKIR.kirim)}
            </dd>
          </div>
          <div className="flex justify-between gap-3 border-t border-zinc-200 pt-2 font-semibold">
            <dt>Estimated total</dt>
            <dd className="text-right">{netPrice ? range(total) : "—"}</dd>
          </div>
          <div className="flex justify-between gap-3 text-brand">
            <dt className="font-medium">Deposit 50% (upper estimate)</dt>
            <dd className="font-semibold">{netPrice ? rupiah(dp) : "—"}</dd>
          </div>
        </dl>

        <p className="text-xs leading-relaxed text-zinc-500">
          The fee is based on the <strong>final net price</strong> after every
          store discount. The numbers above are still a range — the final invoice
          comes after the pair is actually bought, and anything cheaper is
          refunded.
        </p>

        <button
          type="submit"
          className="hidden w-full rounded-full bg-accent px-4 py-3 text-sm font-medium text-paper hover:bg-accent-dark lg:block"
        >
          Send request
        </button>
      </aside>

      {/* Mobile: bar aksi melayang di atas bottom nav, total selalu kelihatan. */}
      <div className="fixed inset-x-3 bottom-[4.75rem] z-40 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-paper/95 p-3 shadow-xl backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-zinc-500">Estimated total</p>
          <p className="truncate text-sm font-bold">
            {netPrice ? range(total) : "Add a price first"}
          </p>
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-full bg-accent px-5 py-3 text-sm font-medium text-paper transition-transform active:scale-[.98]"
        >
          Send request
        </button>
      </div>
    </form>
  );
}
