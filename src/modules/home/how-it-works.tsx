const langkah = [
  { judul: "Pilih & request", isi: "Pilih dari katalog promo atau tulis sendiri item yang mau dititip." },
  { judul: "Lihat estimasi", isi: "Rentang fee & total muncul otomatis. Setuju? Bayar DP dari sisi atas estimasi." },
  { judul: "Jastiper belanja", isi: "Barang dicek langsung di JPO — stok, ukuran, kondisi. Harga net dikonfirmasi." },
  { judul: "Invoice final", isi: "Bayar sesuai harga aktual. Lebih murah? Selisihnya dikembalikan." },
  { judul: "Terima barang", isi: "COD area Tangerang–Jakarta, atau kirim via J&T untuk luar kota." },
];

/** Mobile: timeline vertikal biar ringkas. Desktop: 5 kolom dipisah garis rambut. */
export function HowItWorks() {
  return (
    <ol className="grid border-t border-zinc-200 lg:grid-cols-5">
      {langkah.map((l, i) => (
        <li
          key={l.judul}
          className="border-b border-zinc-200 py-5 lg:border-b-0 lg:px-5 lg:py-7 lg:first:pl-0 lg:last:pr-0 lg:border-l lg:first:border-l-0"
        >
          <span className="eyebrow text-accent">Langkah {String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-2.5 font-medium">{l.judul}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{l.isi}</p>
        </li>
      ))}
    </ol>
  );
}
