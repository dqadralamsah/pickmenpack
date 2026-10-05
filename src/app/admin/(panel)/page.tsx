import Link from "next/link";
import { rupiah, tanggal } from "@/lib/format";
import { getStats } from "@/modules/admin/store";
import { STATUS, type OrderStatus } from "@/modules/admin/types";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/modules/admin/components/status-badge";
import { btnAccent, card } from "@/lib/ui";

const hariIni = () =>
  new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function AdminDashboardPage() {
  const s = await getStats();
  const puncak = Math.max(...s.harian.map((h) => h.count), 1);
  const statuses = Object.entries(s.perStatus) as [OrderStatus, number][];
  const totalMasuk = s.harian.reduce((a, h) => a + h.count, 0);

  return (
    <>
      <PageHeader title="Dashboard" desc={hariIni()}>
        <Link href="/admin/pesanan?status=baru" className={`${btnAccent} rounded-full`}>
          {s.perStatus.baru} menunggu cek harga
        </Link>
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          eyebrow="Total request"
          value={String(s.total)}
          hint={`${s.aktif} masih jalan`}
        />
        <StatCard
          eyebrow="Konversi terbayar"
          value={`${s.konversi}%`}
          hint={`${s.dibayar} request sudah lunas · target PRD ≥40%`}
        />
        <StatCard
          eyebrow="Omzet order selesai"
          value={rupiah(s.omzet)}
          hint="Harga barang + fee + ongkir"
        />
        <StatCard
          eyebrow="Fee jastip"
          value={rupiah(s.fee)}
          hint="Pendapatan bersih dari order selesai"
          tone="accent"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className={`${card} p-4 sm:p-5`}>
          <div className="flex items-baseline justify-between gap-3">
            <p className="eyebrow">Request masuk · 7 hari terakhir</p>
            <p className="text-sm font-medium">{totalMasuk} total</p>
          </div>

          {/* Bar chart sederhana. Setiap batang punya label angka di atasnya dan
              `title` untuk hover — bentuknya saja tidak cukup buat dibaca. */}
          <div
            role="img"
            aria-label={`Grafik request masuk 7 hari terakhir: ${s.harian
              .map((h) => `${h.label} ${h.count}`)
              .join(", ")}`}
            className="mt-5 flex h-40 items-end gap-2"
          >
            {s.harian.map((h) => (
              <div
                key={h.key}
                title={`${h.label}: ${h.count} request`}
                className="group flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-xs font-medium text-zinc-600">{h.count}</span>
                <div
                  className="w-full rounded-t-md bg-accent/85 transition-colors duration-200 group-hover:bg-accent"
                  style={{ height: `${Math.max((h.count / puncak) * 100, 3)}%` }}
                />
                <span className="text-xs text-zinc-600">{h.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${card} p-4 sm:p-5`}>
          <p className="eyebrow">Sebaran status</p>
          <ul className="mt-4 space-y-2.5">
            {statuses.map(([key, count]) => (
              <li key={key} className="flex items-center gap-3 text-sm">
                <span
                  aria-hidden
                  className={`h-2 w-2 shrink-0 rounded-full ${STATUS[key].dot}`}
                />
                <span className="w-44 shrink-0 truncate text-zinc-600">{STATUS[key].label}</span>
                <span className="h-1.5 flex-1 rounded-full bg-zinc-100">
                  <span
                    className={`block h-full rounded-full ${STATUS[key].dot}`}
                    style={{ width: `${(count / Math.max(s.total, 1)) * 100}%` }}
                  />
                </span>
                <span className="w-6 text-right font-medium">{count}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-zinc-200 pt-3 text-xs leading-relaxed text-zinc-600">
            Kuning = menunggu, hijau = lunas & seterusnya, merah = batal (PRD 7.4).
          </p>
        </div>
      </div>

      <div className={`${card} mt-4 overflow-hidden`}>
        <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3.5 sm:px-5">
          <p className="eyebrow">Pesanan terbaru</p>
          <Link
            href="/admin/pesanan"
            className="inline-flex min-h-9 items-center gap-1.5 text-sm text-zinc-600 transition-colors duration-200 hover:text-ink"
          >
            Lihat semua <span aria-hidden>&rarr;</span>
          </Link>
        </div>
        <ul className="divide-y divide-zinc-200">
          {s.terbaru.map((o) => (
            <li key={o.id}>
              <Link
                href={`/admin/pesanan?q=${encodeURIComponent(o.id)}`}
                className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 transition-colors duration-200 hover:bg-zinc-50 sm:px-5"
              >
                <span className="font-mono text-xs text-zinc-600">{o.id}</span>
                <span className="min-w-0 flex-1 truncate text-sm">
                  <span className="font-medium">{o.nama}</span>
                  <span className="text-zinc-600"> · {o.item}</span>
                </span>
                <span className="text-xs text-zinc-600">{tanggal(o.createdAt)}</span>
                <StatusBadge status={o.status} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
