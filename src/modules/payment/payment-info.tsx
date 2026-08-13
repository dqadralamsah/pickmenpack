import { site, waLink } from "@/lib/site";

// Dummy rekening — ganti dengan data asli sebelum go-live.
const accounts = [
  { bank: "BCA", nomor: "1234567890", atasNama: "Dicky Qadr Alamsah" },
  { bank: "Mandiri", nomor: "9876543210", atasNama: "Dicky Qadr Alamsah" },
  { bank: "QRIS", nomor: "Scan kode di bawah", atasNama: "PickmenPack" },
];

const steps = [
  "Kirim request lewat form, jastiper konfirmasi ketersediaan barang di JPO.",
  "Bayar DP 50% dari sisi atas estimasi ke salah satu rekening di bawah.",
  "Kirim bukti transfer ke WhatsApp jastiper.",
  "Barang dibeli, invoice final dikirim sesuai harga net aktual.",
  "Lunasi sisanya (atau terima pengembalian kalau harga net lebih murah).",
  "Barang dikirim via J&T / COD sesuai pilihan kamu.",
];

export function PaymentInfo() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <h2 className="text-lg font-semibold">Alur pembayaran</h2>
        <ol className="mt-4 space-y-3">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-3 text-sm text-zinc-700">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
                {i + 1}
              </span>
              {s}
            </li>
          ))}
        </ol>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Rekening tujuan</h2>
        <div className="mt-4 space-y-3">
          {accounts.map((a) => (
            <div
              key={a.bank}
              className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 p-4"
            >
              <div>
                <p className="text-xs text-zinc-500">{a.bank}</p>
                <p className="font-mono font-semibold">{a.nomor}</p>
              </div>
              <p className="text-right text-xs text-zinc-500">a.n. {a.atasNama}</p>
            </div>
          ))}
          <div className="flex h-44 items-center justify-center rounded-xl border border-dashed border-zinc-300 text-sm text-zinc-400">
            [ QRIS PickmenPack ]
          </div>
        </div>

        <p className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
          Setelah transfer, kirim bukti bayarnya ke WhatsApp{" "}
          <a href={waLink("Halo, ini bukti transfer DP request jastip saya.")} className="font-semibold underline">
            {site.waNumber}
          </a>
          . Pembayaran di luar rekening ini bukan tanggung jawab {site.brand}.
        </p>
      </div>
    </div>
  );
}
