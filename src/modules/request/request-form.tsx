"use client";

import { useState } from "react";
import { rupiah } from "@/lib/format";
import { site, waLink } from "@/lib/site";
import { estimateFee, estimateTotal, dpAmount, ONGKIR, type Delivery } from "./fee";

// text-base (16px) wajib di mobile — di bawah itu Safari iOS auto-zoom saat input difokus.
const field =
  "w-full rounded-xl border border-zinc-300 px-3.5 py-3 text-base outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 sm:text-sm";
const label = "mb-1.5 block text-sm font-medium";

const ukuranPreset = ["38", "39", "40", "41", "42", "43", "44"];

const range = (r: { min: number; max: number }) =>
  r.min === r.max ? rupiah(r.min) : `${rupiah(r.min)} – ${rupiah(r.max)}`;

export function RequestForm({ defaultItem = "" }: { defaultItem?: string }) {
  const [item, setItem] = useState(defaultItem);
  const [ukuran, setUkuran] = useState("");
  const [harga, setHarga] = useState("");
  const [delivery, setDelivery] = useState<Delivery>("cod");
  const [sent, setSent] = useState<string | null>(null);

  const netPrice = Number(harga) || 0;
  const fee = estimateFee(netPrice);
  const total = estimateTotal(netPrice, delivery);
  const dp = dpAmount(total);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const pesan = [
      `Halo ${site.brand}, mau titip beli sepatu:`,
      `Nama: ${f.get("nama")}`,
      `Item: ${f.get("item")}`,
      `Ukuran: ${f.get("ukuran")}`,
      `Estimasi harga: ${rupiah(netPrice)}`,
      `Pengiriman: ${delivery === "cod" ? "COD Tangerang/Jakarta" : "Kirim luar kota"}`,
      f.get("referensi") ? `Referensi: ${f.get("referensi")}` : "",
      f.get("catatan") ? `Catatan: ${f.get("catatan")}` : "",
      `Estimasi total: ${range(total)}`,
      `DP (50% dari sisi atas): ${rupiah(dp)}`,
    ]
      .filter(Boolean)
      .join("\n");
    setSent(pesan);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-xl">
          ✅
        </span>
        <h2 className="mt-3 text-lg font-semibold text-emerald-900">
          Request kamu sudah dirangkum
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-emerald-800">
          Langkah terakhir: kirim rangkuman ini ke WhatsApp jastiper untuk dicek
          ketersediaan stok & ukurannya di JPO. Belum ada pembayaran sampai stok
          dikonfirmasi.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-white p-4 font-sans text-xs leading-relaxed whitespace-pre-wrap text-zinc-700">
          {sent}
        </pre>
        <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
          <a
            href={waLink(sent)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-emerald-600 px-4 py-3.5 text-center text-sm font-semibold text-white active:scale-[.98] sm:py-2.5 sm:hover:bg-emerald-700"
          >
            Kirim via WhatsApp
          </a>
          <button
            onClick={() => setSent(null)}
            className="rounded-xl border border-zinc-300 bg-white px-4 py-3.5 text-sm font-semibold active:bg-zinc-50 sm:py-2.5"
          >
            Ubah request
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
              Nama
            </label>
            <input
              id="nama"
              name="nama"
              required
              autoComplete="name"
              className={field}
              placeholder="Nama kamu"
            />
          </div>
          <div>
            <label className={label} htmlFor="wa">
              No. WhatsApp
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
            Item yang dititip
          </label>
          <input
            id="item"
            name="item"
            required
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className={field}
            placeholder="Contoh: Nike Revolution 7"
          />
        </div>

        <div>
          <label className={label} htmlFor="ukuran">
            Ukuran
          </label>
          <div className="no-scrollbar -mx-4 mb-2 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {ukuranPreset.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUkuran(u)}
                className={`h-11 w-11 shrink-0 rounded-xl border text-sm font-medium transition-colors ${
                  ukuran === u
                    ? "border-brand bg-brand text-white"
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
            value={ukuran}
            onChange={(e) => setUkuran(e.target.value)}
            className={field}
            placeholder="Atau ketik ukuran lain (mis. 37.5 / US 9)"
          />
        </div>

        <div>
          <label className={label} htmlFor="harga">
            Estimasi harga barang
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
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              className={`${field} pl-11`}
              placeholder="750000"
            />
          </div>
          <p className="mt-1.5 text-xs text-zinc-500">
            Perkiraan harga di toko saja — angka pastinya dikonfirmasi jastiper
            setelah cek langsung di JPO.
          </p>
        </div>

        <div>
          <label className={label} htmlFor="referensi">
            Link / foto referensi <span className="text-zinc-400">(opsional)</span>
          </label>
          <input
            id="referensi"
            name="referensi"
            type="url"
            inputMode="url"
            className={field}
            placeholder="Link produk atau IG post"
          />
        </div>

        <fieldset>
          <legend className={label}>Cara terima barang</legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {(
              [
                ["cod", "COD Tangerang / Jakarta", "Gratis ongkir, ketemu langsung"],
                ["kirim", "Kirim luar kota", `Ongkir ${range(ONGKIR.kirim)} · J&T`],
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
            Catatan <span className="text-zinc-400">(opsional)</span>
          </label>
          <textarea
            id="catatan"
            name="catatan"
            rows={3}
            className={field}
            placeholder="Warna, alternatif ukuran, dll."
          />
        </div>
      </div>

      {/* Rincian lengkap: sidebar sticky di desktop, kartu biasa di mobile. */}
      <aside className="mb-24 h-fit space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 lg:sticky lg:top-24 lg:mb-0">
        <h2 className="font-semibold">Estimasi biaya</h2>

        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-zinc-500">Harga barang</dt>
            <dd>{rupiah(netPrice)}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-zinc-500">Fee jastip</dt>
            <dd className="text-right">{netPrice ? range(fee) : "—"}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-zinc-500">Ongkir + packing</dt>
            <dd className="text-right">
              {delivery === "cod" ? "Gratis" : range(ONGKIR.kirim)}
            </dd>
          </div>
          <div className="flex justify-between gap-3 border-t border-zinc-200 pt-2 font-semibold">
            <dt>Total estimasi</dt>
            <dd className="text-right">{netPrice ? range(total) : "—"}</dd>
          </div>
          <div className="flex justify-between gap-3 text-brand">
            <dt className="font-medium">DP 50% (dari sisi atas)</dt>
            <dd className="font-semibold">{netPrice ? rupiah(dp) : "—"}</dd>
          </div>
        </dl>

        <p className="text-xs leading-relaxed text-zinc-500">
          Fee dihitung dari harga <strong>net final</strong> setelah semua diskon
          toko. Angka di atas masih rentang — invoice final dikirim setelah
          barang benar-benar dibeli di JPO, dan selisih lebih murah selalu
          dikembalikan.
        </p>

        <button
          type="submit"
          className="hidden w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-dark lg:block"
        >
          Kirim Request
        </button>
      </aside>

      {/* Mobile: bar aksi melayang di atas bottom nav, total selalu kelihatan. */}
      <div className="fixed inset-x-3 bottom-[4.75rem] z-40 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white/95 p-3 shadow-xl backdrop-blur lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-zinc-500">Total estimasi</p>
          <p className="truncate text-sm font-bold">
            {netPrice ? range(total) : "Isi harga dulu"}
          </p>
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white transition-transform active:scale-[.98]"
        >
          Kirim Request
        </button>
      </div>
    </form>
  );
}
