import Link from "next/link";
import { site } from "@/lib/site";

const ringkas = [
  ["Fee jastip", "mulai Rp25rb"],
  ["Selisih harga", "100% balik"],
  ["Respon", "< 2 jam"],
  ["COD", "Tangerang–Jakarta"],
];

const trust = ["Counter resmi JPO", "Fee mulai Rp25rb", "COD Tangerang–Jakarta", "Kirim J&T + asuransi"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-paper">
      <div aria-hidden className="dotted pointer-events-none absolute inset-0" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-9 pb-8 sm:pt-24 sm:pb-20">
        <div className="lg:grid lg:grid-cols-[1fr_19rem] lg:items-center lg:gap-14">
        <div className="max-w-3xl">
          <p className="eyebrow flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Musim promo Desember · Harbolnas 12.12 &amp; EOSS
          </p>

          <h1 className="mt-5 text-[32px] leading-[1.05] font-semibold sm:mt-7 sm:text-[62px]">
            Titip beli sepatu diskon
            <span className="block text-zinc-400">dari counter resmi Mall JPO.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-600 sm:mt-7 sm:text-base">
            {site.brand} belanja langsung di tokonya — barang dicek fisiknya
            dulu, fee-nya jelas sejak awal, dan selisih harga selalu
            dikembalikan. Gak perlu chat panjang buat tahu totalnya berapa.
          </p>

          <div className="mt-7 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:gap-3">
            <Link
              href="/request"
              className="rounded-full bg-accent px-6 py-3.5 text-center text-sm font-medium text-paper transition-colors active:scale-[.98] sm:py-3 sm:hover:bg-accent-dark"
            >
              Hitung Estimasi &amp; Request
            </Link>
            <Link
              href="/katalog"
              className="rounded-full border border-zinc-300 px-6 py-3.5 text-center text-sm font-medium transition-colors active:bg-zinc-100 sm:py-3 sm:hover:border-accent"
            >
              Lihat Katalog Promo
            </Link>
          </div>
        </div>

          {/* Panel ringkas — cuma di desktop, biar sisi kanan hero gak kosong. */}
          <aside className="hidden rounded-2xl border border-zinc-200 bg-white p-6 lg:block">
            <p className="eyebrow text-accent">Ringkasnya</p>
            <dl className="mt-4 divide-y divide-zinc-200 text-sm">
              {ringkas.map(([k, v]) => (
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

const keunggulan = [
  {
    judul: "Dibeli di counter resmi",
    isi: "Bukan reseller, bukan marketplace. Struk toko selalu ikut dikirim ke kamu.",
  },
  {
    judul: "Fee tetap, bukan persentase",
    isi: "Mulai Rp25rb dan dihitung dari harga net setelah diskon — bukan harga sebelum coret.",
  },
  {
    judul: "Selisih harga dikembalikan",
    isi: "Kalau harga aslinya lebih murah dari estimasi, sisanya balik ke kamu. Otomatis.",
  },
];

export function WhyUs() {
  return (
    <div className="grid border-t border-zinc-200 sm:grid-cols-3">
      {keunggulan.map((k, i) => (
        <div
          key={k.judul}
          className="border-b border-zinc-200 py-6 sm:border-b-0 sm:px-6 sm:py-8 sm:first:pl-0 sm:last:pr-0 sm:border-l sm:first:border-l-0"
        >
          <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 font-medium">{k.judul}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{k.isi}</p>
        </div>
      ))}
    </div>
  );
}
