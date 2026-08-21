import Link from "next/link";
import { rupiah } from "@/lib/format";
import { getStats } from "@/modules/admin/store";
import { STATUS, type OrderStatus } from "@/modules/admin/types";
import { PageHeader, StatCard, StatusBadge, card, tanggal } from "@/modules/admin/ui";

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

  return (
    <>
      <PageHeader title="Dashboard" desc={hariIni()}>
        <Link
          href="/admin/pesanan?status=baru"
          className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-paper hover:bg-accent-dark"
        >
          {s.perStatus.baru} request baru
        </Link>
      </PageHeader>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          eyebrow="Total request"
          value={String(s.total)}
          hint={`${s.aktif} masih jalan`}
        />
        <StatCard
          eyebrow="Konversi selesai"
          value={`${s.konversi}%`}
          hint={`${s.selesai} order selesai · target PRD ≥40%`}
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
          <p className="eyebrow">Request masuk · 7 hari terakhir</p>
          <div className="mt-5 flex h-40 items-end gap-2">
            {s.harian.map((h) => (
              <div key={h.key} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-medium text-zinc-500">{h.count}</span>
                <div
                  className="w-full rounded-t-md bg-accent/85"
                  style={{ height: `${Math.max((h.count / puncak) * 100, 3)}%` }}
                />
                <span className="text-xs text-zinc-500">{h.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${card} p-4 sm:p-5`}>
          <p className="eyebrow">Sebaran status</p>
          <ul className="mt-4 space-y-2.5">
            {statuses.map(([key, count]) => (
              <li key={key} className="flex items-center gap-3 text-sm">
                <span className={`h-2 w-2 shrink-0 rounded-full ${STATUS[key].dot}`} />
                <span className="w-28 shrink-0 text-zinc-600">{STATUS[key].label}</span>
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
          <p className="mt-4 border-t border-zinc-100 pt-3 text-xs leading-relaxed text-zinc-500">
            Selisih harga yang dikembalikan ke customer:{" "}
            <span className="font-medium text-ink">{rupiah(s.refund)}</span>
          </p>
        </div>
      </div>

      <div className={`${card} mt-4 overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3.5 sm:px-5">
          <p className="eyebrow">Pesanan terbaru</p>
          <Link href="/admin/pesanan" className="text-sm text-zinc-600 hover:text-ink">
            Lihat semua →
          </Link>
        </div>
        <ul className="divide-y divide-zinc-100">
          {s.terbaru.map((o) => (
            <li
              key={o.id}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-5"
            >
              <span className="font-mono text-xs text-zinc-500">{o.id}</span>
              <span className="min-w-0 flex-1 truncate text-sm">
                <span className="font-medium">{o.nama}</span>
                <span className="text-zinc-500"> · {o.item}</span>
              </span>
              <span className="text-xs text-zinc-500">{tanggal(o.createdAt)}</span>
              <StatusBadge status={o.status} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
