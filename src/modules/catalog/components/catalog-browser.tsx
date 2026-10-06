"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { rupiah } from "@/lib/format";
import { btnGhost, btnPrimary, chipOff, chipOn } from "@/lib/ui";
import { Empty } from "@/components/shared/empty-state";
import { CATEGORY_LABEL, GENDER_LABEL, type Category, type Product } from "../data";
import {
  PRICE_PRESETS,
  SORT_LABEL,
  activeCount,
  applyFilters,
  toQuery,
  type Filters,
  type Sort,
} from "../filter";
import { CatalogFilters } from "./catalog-filters";
import { ProductGrid } from "./product-grid";

const none = (f: Filters): Filters => ({ ...f, c: [], g: [], brand: [], min: undefined, max: undefined, inStock: false });

/** Halaman Shop: sidebar filter di desktop (≥lg), bottom sheet di mobile.
 *  State filter = URL (replaceState, tanpa round-trip server) — lihat `filter.ts`. */
export function CatalogBrowser({ products, initial }: { products: Product[]; initial: Filters }) {
  const [f, setF] = useState(initial);
  const sheet = useRef<HTMLDialogElement>(null);
  const set = (next: Filters) => {
    setF(next);
    window.history.replaceState(null, "", `/katalog${toQuery(next)}`);
  };
  const shown = applyFilters(products, f);
  const n = activeCount(f);
  const count = `${shown.length} ${shown.length === 1 ? "item" : "items"}`;

  return (
    <div className="lg:grid lg:grid-cols-[248px_minmax(0,1fr)] lg:gap-10">
      <aside aria-label="Filters" className="hidden lg:block">
        <div className="no-scrollbar sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pb-8">
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="text-base font-bold">Filters</h2>
            {n > 0 && <ClearAll onClick={() => set(none(f))} />}
          </div>
          <CatalogFilters products={products} f={f} set={set} />
        </div>
      </aside>

      <div className="min-w-0">
        {/* Bar nempel di bawah header saat scroll (mobile). Latar solid — produk di
            belakangnya tidak boleh tembus, chip & teks harus tetap terbaca. */}
        <div className="sticky top-14 z-30 -mx-4 flex items-center gap-2 border-b border-zinc-200 bg-paper px-4 py-3 sm:-mx-6 sm:px-6 md:top-18 lg:static lg:mx-0 lg:border-0 lg:px-0 lg:pt-0">
          <button
            type="button"
            onClick={() => sheet.current?.showModal()}
            className={`${chipOff} gap-2 lg:hidden`}
            aria-haspopup="dialog"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filters
            {n > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[11px] font-semibold text-paper">
                {n}
              </span>
            )}
          </button>
          <p className="text-sm text-zinc-500" aria-live="polite">
            {count}
          </p>
          <label className="ml-auto flex items-center gap-2 text-sm">
            <span className="hidden text-zinc-500 sm:inline">Sort by</span>
            <select
              value={f.sort}
              onChange={(e) => set({ ...f, sort: e.target.value as Sort })}
              className="h-10 cursor-pointer rounded-full border border-zinc-200 bg-white pr-8 pl-4 text-sm font-medium outline-none hover:border-ink focus-visible:ring-2 focus-visible:ring-ink"
            >
              {(Object.keys(SORT_LABEL) as Sort[]).map((s) => (
                <option key={s} value={s}>
                  {SORT_LABEL[s]}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Kategori cepat di mobile — satu ketukan tanpa buka sheet. */}
        <div role="group" aria-label="Category" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pt-3 sm:-mx-6 sm:px-6 lg:hidden">
          <button type="button" aria-pressed={!f.c.length} onClick={() => set({ ...f, c: [] })} className={!f.c.length ? chipOn : chipOff}>
            All
          </button>
          {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={f.c.includes(c)}
              onClick={() => set({ ...f, c: f.c.includes(c) ? f.c.filter((x) => x !== c) : [...f.c, c] })}
              className={f.c.includes(c) ? chipOn : chipOff}
            >
              {CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>

        <ActiveChips f={f} set={set} />

        <div className="mt-6">
          {shown.length === 0 ? (
            <Empty
              action={
                <Link
                  href={`/request${f.q ? `?q=${encodeURIComponent(f.q)}` : ""}`}
                  className="text-sm font-semibold underline underline-offset-4"
                >
                  Request it anyway
                </Link>
              }
            >
              Nothing matches these filters. We can still look for it at the store — just send a request.
            </Empty>
          ) : (
            <ProductGrid products={shown} cols="sm:grid-cols-3 xl:grid-cols-4" />
          )}
        </div>
      </div>

      {/* Bottom sheet mobile. <dialog> native: fokus terkunci, Esc menutup, latar inert.
          Klik di luar panel (= elemen dialog-nya sendiri) juga menutup. */}
      <dialog
        ref={sheet}
        aria-label="Filters"
        onClick={(e) => e.target === e.currentTarget && sheet.current?.close()}
        className="fixed inset-x-0 top-auto bottom-0 m-0 max-h-[85dvh] w-full max-w-full flex-col rounded-t-3xl bg-paper p-0 text-ink backdrop:bg-ink/40 open:flex lg:hidden"
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <h2 className="text-base font-bold">Filters</h2>
          <button
            type="button"
            onClick={() => sheet.current?.close()}
            aria-label="Close filters"
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full hover:bg-zinc-100"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-4">
          <CatalogFilters products={products} f={f} set={set} />
        </div>
        <div className="flex gap-3 border-t border-zinc-200 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button type="button" onClick={() => set(none(f))} disabled={!n} className={`${btnGhost} flex-1`}>
            Clear all
          </button>
          <button type="button" onClick={() => sheet.current?.close()} className={`${btnPrimary} flex-[2]`}>
            Show {count}
          </button>
        </div>
      </dialog>
    </div>
  );
}

function ClearAll({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="text-sm font-medium underline underline-offset-4 hover:text-accent-dark">
      Clear all
    </button>
  );
}

function priceLabel({ min, max }: Filters) {
  const preset = PRICE_PRESETS.find((p) => p.min === min && p.max === max);
  if (preset) return preset.label;
  if (min && max) return `${rupiah(min)} – ${rupiah(max)}`;
  return min ? `From ${rupiah(min)}` : `Up to ${rupiah(max!)}`;
}

/** Filter yang sedang aktif sebagai chip yang bisa dihapus satu-satu. */
function ActiveChips({ f, set }: { f: Filters; set: (f: Filters) => void }) {
  const chips: [label: string, without: Filters][] = [];
  if (f.q) chips.push([`“${f.q}”`, { ...f, q: "" }]);
  for (const c of f.c) chips.push([CATEGORY_LABEL[c], { ...f, c: f.c.filter((x) => x !== c) }]);
  for (const g of f.g) chips.push([GENDER_LABEL[g], { ...f, g: f.g.filter((x) => x !== g) }]);
  for (const b of f.brand) chips.push([b, { ...f, brand: f.brand.filter((x) => x !== b) }]);
  if (f.min || f.max) chips.push([priceLabel(f), { ...f, min: undefined, max: undefined }]);
  if (f.inStock) chips.push(["In stock", { ...f, inStock: false }]);
  if (!chips.length) return null;

  return (
    <ul aria-label="Active filters" className="mt-4 flex flex-wrap items-center gap-2">
      {chips.map(([label, next]) => (
        <li key={label}>
          <button
            type="button"
            onClick={() => set(next)}
            aria-label={`Remove filter ${label}`}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-zinc-100 pr-2.5 pl-3.5 text-sm font-medium transition-colors duration-150 hover:bg-zinc-200"
          >
            {label}
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        </li>
      ))}
      {chips.length > 1 && (
        <li>
          <ClearAll onClick={() => set({ ...none(f), q: "" })} />
        </li>
      )}
    </ul>
  );
}
