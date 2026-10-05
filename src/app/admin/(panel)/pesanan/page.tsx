import type { Metadata } from "next";
import Link from "next/link";
import { rupiah, tanggal } from "@/lib/format";
import { saveOrderAction } from "@/modules/admin/actions";
import { listOrders, orderMoney } from "@/modules/admin/store";
import { runDay } from "@/modules/request/store-run";
import { STATUS, type OrderStatus } from "@/modules/admin/types";
import { Chevron } from "@/components/shared/chevron";
import { Empty } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/modules/admin/components/status-badge";
import {
  btnGhost,
  btnPrimary,
  card,
  chipOff,
  chipOn,
  disclosureBody,
  field,
  label,
  summaryRow,
} from "@/lib/ui";

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
  const wa = (text: string, to: string) =>
    `https://wa.me/${to.replace(/^0/, "62").replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

  return (
    <>
      <PageHeader
        title="Pesanan"
        desc="Request dari form web. Jumat: cek harga ke toko → isi harga net → kirim harga final → tandai Lunas setelah transfer masuk."
      />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <nav
          aria-label="Filter status"
          className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0"
        >
          {tabs.map((t) => (
            <Link
              key={t}
              href={`/admin/pesanan?status=${t}${q ? `&q=${encodeURIComponent(q)}` : ""}`}
              aria-current={status === t ? "page" : undefined}
              className={status === t ? chipOn : chipOff}
            >
              {tabLabel(t)}
            </Link>
          ))}
        </nav>

        <form className="flex gap-2" role="search">
          <input type="hidden" name="status" value={status} />
          <input
            name="q"
            type="search"
            defaultValue={q}
            aria-label="Cari pesanan"
            placeholder="Cari nama / ID / item…"
            className={`${field} lg:w-56`}
          />
          <button type="submit" className={btnGhost}>
            Cari
          </button>
        </form>
      </div>

      {/* Jumlah hasil: konfirmasi bahwa filter/pencarian benar-benar jalan. */}
      <p className="eyebrow mb-3">
        {orders.length} pesanan
        {status !== "semua" && ` · ${tabLabel(status)}`}
        {q && ` · "${q}"`}
      </p>

      {orders.length === 0 ? (
        <Empty
          action={
            (status !== "semua" || q) && (
              <Link href="/admin/pesanan" className={btnGhost}>
                Reset filter
              </Link>
            )
          }
        >
          Belum ada pesanan yang cocok dengan filter ini.
        </Empty>
      ) : (
        <div className="space-y-2">
          {orders.map((o) => {
            const m = orderMoney(o);
            return (
              <details key={o.id} className={`${card} group overflow-hidden`}>
                <summary className={`${summaryRow} flex-wrap`}>
                  <span className="font-mono text-xs text-zinc-600">{o.id}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{o.item}</span>
                    <span className="block truncate text-xs text-zinc-600">
                      {o.nama} · {o.kota} · ukuran {o.ukuran}
                    </span>
                  </span>
                  <span className="text-sm font-medium">
                    {m.confirmed ? rupiah(m.total.max) : <span className="text-zinc-500">~{rupiah(m.total.max)}</span>}
                  </span>
                  <StatusBadge status={o.status} />
                  <span className="text-xs text-zinc-600 group-open:hidden">
                    {tanggal(o.createdAt)}
                  </span>
                  <Chevron />
                </summary>

                <div className={`${disclosureBody} grid gap-5 lg:grid-cols-2`}>
                  <div>
                    <dl className="space-y-2 text-sm">
                      {[
                        ["Tanggal masuk", tanggal(o.createdAt)],
                        ["WhatsApp", o.wa],
                        ["Kota", o.kota],
                        ["Ukuran", o.kakiCm ? `${o.ukuran} (kaki ${o.kakiCm} cm)` : o.ukuran],
                        ["Store run", o.storeRun ? `cutoff ${runDay(new Date(o.storeRun))}` : "—"],
                        [
                          "Pengiriman",
                          o.delivery === "cod" ? "COD Tangerang/Jakarta" : "Kirim luar kota",
                        ],
                        ["Estimasi harga barang", rupiah(o.estimasi)],
                        ["Harga net pasti (toko)", o.netFinal ? rupiah(o.netFinal) : "Belum dicek"],
                        ["Fee jastip", rangeText(m.fee)],
                        [m.confirmed ? "Total ditagih (bayar penuh)" : "Estimasi total", rangeText(m.total)],
                      ].map(([k, v]) => (
                        <div
                          key={k}
                          className="flex justify-between gap-4 border-b border-zinc-200/70 pb-2 last:border-0"
                        >
                          <dt className="text-zinc-600">{k}</dt>
                          <dd className="text-right font-medium">{v}</dd>
                        </div>
                      ))}
                    </dl>

                    {o.referensi && (
                      <a
                        href={o.referensi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 block truncate text-xs text-accent-dark underline"
                      >
                        {o.referensi}
                      </a>
                    )}

                    <a
                      href={wa(
                        m.confirmed
                          ? `Halo ${o.nama}, harga final request ${o.id} (${o.item}, ukuran ${o.ukuran}): ${rangeText(m.total)}. Transfer penuh paling lambat Sabtu 09.00 WIB. Mohon cek ulang ukuran — salah ukuran tidak bisa retur.`
                          : `Halo ${o.nama}, update untuk request ${o.id} (${o.item}):`,
                        o.wa,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${btnGhost} mt-3 w-full`}
                    >
                      {m.confirmed ? "Kirim harga final via WhatsApp" : "Chat customer di WhatsApp"}
                    </a>
                  </div>

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
                        Harga net pasti dari toko
                      </label>
                      <input
                        id={`net-${o.id}`}
                        name="netFinal"
                        inputMode="numeric"
                        defaultValue={o.netFinal ?? ""}
                        placeholder="Isi setelah cek ke toko (Jumat)"
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
