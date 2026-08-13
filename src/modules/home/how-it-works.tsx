const langkah = [
  { judul: "Pilih & request", isi: "Pilih dari katalog promo atau tulis sendiri item yang mau dititip." },
  { judul: "Lihat estimasi", isi: "Rentang fee & total muncul otomatis. Setuju? Bayar DP dari sisi atas estimasi." },
  { judul: "Jastiper belanja", isi: "Barang dicek langsung di JPO — stok, ukuran, kondisi. Harga net dikonfirmasi." },
  { judul: "Invoice final", isi: "Bayar sesuai harga aktual. Lebih murah? Selisihnya dikembalikan." },
  { judul: "Terima barang", isi: "COD area Tangerang–Jakarta, atau kirim via J&T untuk luar kota." },
];

/** Mobile: timeline vertikal biar ringkas. Desktop: 5 kartu sejajar. */
export function HowItWorks() {
  return (
    <ol className="grid gap-4 lg:grid-cols-5">
      {langkah.map((l, i) => (
        <li key={l.judul} className="flex gap-3.5 lg:block lg:rounded-2xl lg:bg-zinc-50 lg:p-5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand lg:hidden">
            {i + 1}
          </span>
          <div>
            <span className="hidden text-xs font-bold text-brand lg:block">
              LANGKAH {i + 1}
            </span>
            <h3 className="font-semibold lg:mt-1">{l.judul}</h3>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600">{l.isi}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
