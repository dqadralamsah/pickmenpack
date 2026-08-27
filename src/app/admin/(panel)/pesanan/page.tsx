import type { Metadata } from "next";
import Link from "next/link";
import { rupiah } from "@/lib/format";
import { waLink } from "@/lib/site";
import { saveOrderAction } from "@/modules/admin/actions";
import { listOrders, orderMoney } from "@/modules/admin/store";
import { STATUS, type OrderStatus } from "@/modules/admin/types";
import {
  Empty,
  PageHeader,
  StatusBadge,
  btnGhost,
  btnPrimary,
  card,
  field,
  label,
  tanggal,
} from "@/modules/admin/ui";

export const metadata: Metadata = { title: "Pesanan" };

const tabs = ["semua", ...(Object.keys(STATUS) as OrderStatus[])];
const tabLabel = (t: string) => (t === "semua" ? "Semua" : STATUS[t as OrderStatus].label);
const rangeText = (r: { min: number; max: number }) =>
  r.min === r.max ? rupiah(r.min) : `${rupiah(r.min)} – ${rupiah(r.max)}`;

export default async function AdminOrdersPage({
  searchParams,
}: PageProps<"/admin/pesanan">) {
  const sp = await searchParams;
  const status = typeof sp.status === "string" ? sp.status : "semua";
  const q = typeof sp.q === "string" ? sp.q : "";
  const orders = await listOrders({ status, q });

  return (
    <>
      <PageHeader
        title="Pesanan"
        desc="Request jastip yang masuk. Update status & harga net aktual di sini."
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {tabs.map((t) => (
            <Link
              key={t}
              href={`/admin/pesanan?status=${t}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                status === t
                  ? "border-ink bg-ink text-paper"
                  : "border-zinc-300 bg-white text-zinc-600 hover:bg-zinc-50"
              }`}
            >
              {tabLabel(t)}
            </Link>
          ))}
        </div>

        <form className="flex gap-2">
          <input type="hidden" name="status" value={status} />
          <input
            name="q"
            defaultValue={q}
            placeholder="Cari nama / ID / item…"
            className={`${field} sm:w-56`}
          />
          <button type="submit" className={btnGhost}>
            Cari
          </button>
        </form>
      </div>

      {orders.length === 0 ? (
        <Empty>Belum ada pesanan yang cocok dengan filter ini.</Empty>
      ) : (
        <div className="space-y-2">
          {orders.map((o) => {
            const m = orderMoney(o);
            return (
              <details key={o.id} className={`${card} group overflow-hidden`}>
                <summary className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5 list-none [&::-webkit-details-marker]:hidden sm:px-5">
                  <span className="font-mono text-xs text-zinc-500">{o.id}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{o.item}</span>
                    <span className="block truncate text-xs text-zinc-500">
                      {o.nama} · {o.kota} · ukuran {o.ukuran}
                    </span>
                  </span>
                  <span className="text-sm font-medium">{rupiah(m.total.max)}</span>
                  <StatusBadge status={o.status} />
                  <span className="text-xs text-zinc-400 group-open:hidden">
                    {tanggal(o.createdAt)}
                  </span>
                </summary>

                <div className="grid gap-5 border-t border-zinc-100 bg-zinc-50/60 px-4 py-4 sm:px-5 lg:grid-cols-2">
                  <dl className="space-y-2 text-sm">
                    {[
                      ["Tanggal masuk", tanggal(o.createdAt)],
                      ["WhatsApp", o.wa],
                      ["Toko", o.store],
                      [
                        "Pengiriman",
                        o.delivery === "cod" ? "COD Tangerang/Jakarta" : "Kirim luar kota",
                      ],
                      ["Estimasi harga barang", rupiah(o.estimasi)],
                      ["Harga net aktual", o.netFinal ? rupiah(o.netFinal) : "—"],
                      ["Fee jastip", rangeText(m.fee)],
                      ["Estimasi total", rangeText(m.total)],
                      ["DP 50% (sisi atas)", rupiah(m.dp)],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-4">
                        <dt className="text-zinc-500">{k}</dt>
                        <dd className="text-right font-medium">{v}</dd>
                      </div>
                    ))}
                    {m.selisih !== 0 && (
                      <div
                        className={`rounded-lg px-3 py-2 text-xs ${
                          m.selisih < 0
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {m.selisih < 0
                          ? `Lebih murah ${rupiah(-m.selisih)} dari estimasi — kembalikan ke customer atau potong pelunasan.`
                          : `Lebih mahal ${rupiah(m.selisih)} dari estimasi — konfirmasi ulang sebelum lanjut.`}
                      </div>
                    )}
                    <a
                      href={waLink(
                        `Halo ${o.nama}, update untuk request ${o.id} (${o.item}):`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${btnGhost} mt-1 w-full`}
                    >
                      Chat customer di WhatsApp
                    </a>
                  </dl>

                  <form action={saveOrderAction} className="space-y-3">
                    <input type="hidden" name="id" value={o.id} />
                    <div>
                      <label className={label} htmlFor={`status-${o.id}`}>
                        Status
                      </label>
                      <select
                        id={`status-${o.id}`}
                        name="status"
                        defaultValue={o.status}
                        className={field}
                      >
                        {(Object.keys(STATUS) as OrderStatus[]).map((s) => (
                          <option key={s} value={s}>
                            {STATUS[s].label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={label} htmlFor={`net-${o.id}`}>
                        Harga net aktual di toko
                      </label>
                      <input
                        id={`net-${o.id}`}
                        name="netFinal"
                        inputMode="numeric"
                        defaultValue={o.netFinal ?? ""}
                        placeholder="Isi setelah barang dibeli"
                        className={field}
                      />
                    </div>
                    <div>
                      <label className={label} htmlFor={`catatan-${o.id}`}>
                        Catatan internal
                      </label>
                      <textarea
                        id={`catatan-${o.id}`}
                        name="catatan"
                        rows={3}
                        defaultValue={o.catatan ?? ""}
                        placeholder="Resi, alternatif ukuran, hasil follow up…"
                        className={field}
                      />
                    </div>
                    <button type="submit" className={`${btnPrimary} w-full`}>
                      Simpan perubahan
                    </button>
                  </form>
                </div>
              </details>
            );
          })}
        </div>
      )}
    </>
  );
}
