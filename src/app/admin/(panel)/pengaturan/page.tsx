import type { Metadata } from "next";
import { rupiah } from "@/lib/format";
import { saveSettingsAction } from "@/modules/admin/actions";
import { getSettings } from "@/modules/admin/store";
import { PageHeader } from "@/components/shared/page-header";
import { btnPrimary, card, field, label } from "@/lib/ui";
import { ONGKIR, estimateFee } from "@/modules/request/fee";

export const metadata: Metadata = { title: "Pengaturan" };

const tiers = [
  { batas: "Di bawah Rp500rb", contoh: 400_000 },
  { batas: "Rp500rb – Rp1jt", contoh: 800_000 },
  { batas: "Di atas Rp1jt", contoh: 1_500_000 },
];

export default async function AdminPengaturanPage() {
  const s = await getSettings();

  return (
    <>
      <PageHeader
        title="Pengaturan"
        desc="Identitas bisnis & rekening tujuan yang dipakai di halaman publik."
      />

      <form action={saveSettingsAction} className="space-y-4">
        <div className={`${card} p-4 sm:p-5`}>
          <p className="eyebrow">Identitas</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { name: "brand", label: "Nama brand", value: s.brand },
              {
                name: "waNumber",
                label: "Nomor WhatsApp (format 62…)",
                value: s.waNumber,
              },
              { name: "instagram", label: "Instagram", value: s.instagram },
              {
                name: "jamOperasional",
                label: "Jam operasional",
                value: s.jamOperasional,
              },
            ].map((f) => (
              <div key={f.name}>
                <label className={label} htmlFor={f.name}>
                  {f.label}
                </label>
                <input
                  id={f.name}
                  name={f.name}
                  defaultValue={f.value}
                  required
                  className={field}
                />
              </div>
            ))}
          </div>
        </div>

        <div className={`${card} p-4 sm:p-5`}>
          <p className="eyebrow">Rekening tujuan</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">
            Tampil di halaman How to Pay sebagai daftar resmi untuk dicocokkan customer. Untuk baris{" "}
            <strong>QRIS</strong>, isi <em>Atas nama</em> dengan nama merchant yang muncul saat QR di-scan — gambar QR-nya
            dikirim lewat WhatsApp, tidak dipasang di website.
          </p>
          <div className="mt-4 space-y-3">
            {s.accounts.map((a, i) => (
              <div key={i} className="grid gap-3 sm:grid-cols-3">
                <input
                  name="bank"
                  defaultValue={a.bank}
                  placeholder="Bank"
                  className={field}
                  aria-label={`Bank ${i + 1}`}
                />
                <input
                  name="nomor"
                  defaultValue={a.nomor}
                  placeholder="Nomor rekening"
                  className={`${field} font-mono`}
                  aria-label={`Nomor rekening ${i + 1}`}
                />
                <input
                  name="atasNama"
                  defaultValue={a.atasNama}
                  placeholder="Atas nama"
                  className={field}
                  aria-label={`Atas nama ${i + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className={btnPrimary}>
          Simpan pengaturan
        </button>
      </form>

      <div className={`${card} mt-6 p-4 sm:p-5`}>
        <p className="eyebrow">Skema fee (PRD 2.4)</p>
        <p className="mt-2 text-sm text-zinc-500">
          Masih hardcode di <code className="font-mono text-xs">modules/request/fee.ts</code>{" "}
          — dipakai bareng kalkulator di form request dan perhitungan di halaman pesanan.
        </p>
        <ul className="mt-4 space-y-2 text-sm">
          {tiers.map((t) => {
            const fee = estimateFee(t.contoh);
            return (
              <li
                key={t.batas}
                className="flex justify-between gap-4 border-b border-zinc-100 pb-2 last:border-0"
              >
                <span className="text-zinc-600">{t.batas}</span>
                <span className="font-medium">
                  {rupiah(fee.min)} – {rupiah(fee.max)}
                </span>
              </li>
            );
          })}
          <li className="flex justify-between gap-4">
            <span className="text-zinc-600">Ongkir luar kota (estimasi)</span>
            <span className="font-medium">
              {rupiah(ONGKIR.kirim.min)} – {rupiah(ONGKIR.kirim.max)}
            </span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-zinc-600">Pembayaran</span>
            <span className="text-right font-medium">Penuh setelah harga dikonfirmasi, tanpa DP</span>
          </li>
          <li className="flex justify-between gap-4">
            <span className="text-zinc-600">Jadwal</span>
            <span className="text-right font-medium">Cutoff Kam 23.59 · bayar Sab 09.00 · kirim Min/Sen</span>
          </li>
        </ul>
      </div>

      <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
        Data tersimpan di SQLite (<code className="font-mono">DB_PATH</code>, default{" "}
        <code className="font-mono">data/pickmenpack.db</code>). Di production, mount folder
        itu sebagai volume Docker supaya data gak hilang saat container dibuat ulang.
      </p>
    </>
  );
}
