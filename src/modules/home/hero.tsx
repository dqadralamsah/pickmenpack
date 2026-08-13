import Link from "next/link";
import { site } from "@/lib/site";

const trust = ["Counter resmi JPO", "Fee mulai Rp25rb", "COD Tangerang–Jakarta", "Kirim J&T + asuransi"];

export function Hero() {
  return (
    <section className="border-b border-zinc-100 bg-gradient-to-b from-brand-soft via-brand-soft/40 to-white">
      <div className="mx-auto w-full max-w-6xl px-4 pt-8 pb-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-brand shadow-sm sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Musim promo Desember · Harbolnas 12.12 & EOSS
          </p>
          <h1 className="mt-4 text-[28px] leading-[1.15] font-black tracking-tight sm:text-5xl">
            Titip beli sepatu diskon langsung dari{" "}
            <span className="text-brand">counter resmi Mall JPO</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 sm:mt-4 sm:text-base">
            {site.brand} belanja langsung di tokonya — barang dicek fisiknya
            dulu, fee-nya jelas sejak awal, dan selisih harga selalu
            dikembalikan. Gak perlu chat panjang buat tahu totalnya berapa.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:gap-3">
            <Link
              href="/request"
              className="rounded-xl bg-brand px-5 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-transform active:scale-[.98] sm:py-3 sm:hover:bg-brand-dark"
            >
              Hitung Estimasi & Request
            </Link>
            <Link
              href="/katalog"
              className="rounded-xl border border-zinc-300 bg-white px-5 py-3.5 text-center text-sm font-semibold transition-colors active:bg-zinc-50 sm:py-3 sm:hover:border-brand"
            >
              Lihat Katalog Promo
            </Link>
          </div>
        </div>

        <ul className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:mt-10 sm:px-0">
          {trust.map((t) => (
            <li
              key={t}
              className="shrink-0 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-600"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const keunggulan = [
  {
    judul: "Dibeli di counter resmi",
    isi: "Bukan reseller, bukan marketplace. Struk toko selalu ikut dikirim ke kamu.",
    icon: "🏬",
  },
  {
    judul: "Fee tetap, bukan persentase",
    isi: "Mulai Rp25rb dan dihitung dari harga net setelah diskon — bukan harga sebelum coret.",
    icon: "🧾",
  },
  {
    judul: "Selisih harga dikembalikan",
    isi: "Kalau harga aslinya lebih murah dari estimasi, sisanya balik ke kamu. Otomatis.",
    icon: "↩️",
  },
];

export function WhyUs() {
  return (
    <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
      {keunggulan.map((k) => (
        <div
          key={k.judul}
          className="flex gap-3 rounded-2xl border border-zinc-200 p-4 sm:flex-col sm:p-5"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-lg">
            {k.icon}
          </span>
          <div>
            <h3 className="font-semibold">{k.judul}</h3>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600">{k.isi}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
