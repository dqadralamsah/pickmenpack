import type { Metadata } from "next";
import { rupiah } from "@/lib/format";
import { deleteProductAction, saveProductAction } from "@/modules/admin/actions";
import { productDb, type ProductItem } from "@/modules/admin/store";
import {
  PageHeader,
  btnDanger,
  btnPrimary,
  card,
  field,
  label,
} from "@/modules/admin/ui";
import { discountPercent } from "@/modules/catalog/data";

export const metadata: Metadata = { title: "Katalog" };

const stockLabel: Record<ProductItem["stock"], string> = {
  ready: "Ready",
  limited: "Terbatas",
  habis: "Habis",
};

const stockBadge: Record<ProductItem["stock"], string> = {
  ready: "bg-emerald-50 text-emerald-700",
  limited: "bg-amber-50 text-amber-700",
  habis: "bg-rose-50 text-rose-700",
};

function ProductForm({ p }: { p?: ProductItem }) {
  const key = p?.id ?? "baru";
  return (
    <form action={saveProductAction} className="grid gap-3 sm:grid-cols-2">
      <input type="hidden" name="id" value={p?.id ?? ""} />
      <input type="hidden" name="accent" value={p?.accent ?? ""} />
      <div>
        <label className={label} htmlFor={`brand-${key}`}>
          Brand
        </label>
        <input
          id={`brand-${key}`}
          name="brand"
          required
          defaultValue={p?.brand}
          placeholder="Nike"
          className={field}
        />
      </div>
      <div>
        <label className={label} htmlFor={`name-${key}`}>
          Nama produk
        </label>
        <input
          id={`name-${key}`}
          name="name"
          required
          defaultValue={p?.name}
          placeholder="Revolution 7"
          className={field}
        />
      </div>
      <div>
        <label className={label} htmlFor={`po-${key}`}>
          Harga normal
        </label>
        <input
          id={`po-${key}`}
          name="priceOriginal"
          inputMode="numeric"
          required
          defaultValue={p?.priceOriginal}
          placeholder="899000"
          className={field}
        />
      </div>
      <div>
        <label className={label} htmlFor={`pp-${key}`}>
          Harga promo
        </label>
        <input
          id={`pp-${key}`}
          name="pricePromo"
          inputMode="numeric"
          required
          defaultValue={p?.pricePromo}
          placeholder="539000"
          className={field}
        />
      </div>
      <div>
        <label className={label} htmlFor={`sizes-${key}`}>
          Ukuran tersedia
        </label>
        <input
          id={`sizes-${key}`}
          name="sizes"
          defaultValue={p?.sizes.join(", ")}
          placeholder="39, 40, 41, 42"
          className={field}
        />
      </div>
      <div>
        <label className={label} htmlFor={`store-${key}`}>
          Counter/toko
        </label>
        <input
          id={`store-${key}`}
          name="store"
          defaultValue={p?.store}
          placeholder="Nike Official Store"
          className={field}
        />
      </div>
      <div>
        <label className={label} htmlFor={`stock-${key}`}>
          Stok
        </label>
        <select
          id={`stock-${key}`}
          name="stock"
          defaultValue={p?.stock ?? "ready"}
          className={field}
        >
          {Object.entries(stockLabel).map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-end">
        <button type="submit" className={`${btnPrimary} w-full`}>
          {p ? "Simpan" : "Tambah ke katalog"}
        </button>
      </div>
    </form>
  );
}

export default async function AdminKatalogPage() {
  const items = await productDb.list();

  return (
    <>
      <PageHeader
        title="Katalog promo"
        desc={`${items.length} item tampil di halaman katalog publik.`}
      />

      <details className={`${card} mb-4 p-4 sm:p-5`}>
        <summary className="cursor-pointer text-sm font-medium list-none [&::-webkit-details-marker]:hidden">
          + Tambah produk baru
        </summary>
        <div className="mt-4">
          <ProductForm />
        </div>
      </details>

      <div className="space-y-2">
        {items.map((p) => (
          <details key={p.id} className={`${card} overflow-hidden`}>
            <summary className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3.5 list-none [&::-webkit-details-marker]:hidden sm:px-5">
              <span
                className={`h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br ${p.accent}`}
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">
                  {p.brand} {p.name}
                </span>
                <span className="block truncate text-xs text-zinc-500">
                  {p.store} · ukuran {p.sizes.join("/") || "—"}
                </span>
              </span>
              <span className="text-right text-sm">
                <span className="block font-medium">{rupiah(p.pricePromo)}</span>
                <span className="block text-xs text-zinc-400 line-through">
                  {rupiah(p.priceOriginal)}
                </span>
              </span>
              <span className="rounded-full bg-accent-soft px-2 py-1 text-xs font-medium text-accent">
                -{discountPercent(p)}%
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${stockBadge[p.stock]}`}
              >
                {stockLabel[p.stock]}
              </span>
            </summary>

            <div className="border-t border-zinc-100 bg-zinc-50/60 px-4 py-4 sm:px-5">
              <ProductForm p={p} />
              <form action={deleteProductAction} className="mt-3">
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" className={btnDanger}>
                  Hapus dari katalog
                </button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
