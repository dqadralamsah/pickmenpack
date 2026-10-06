"use client";

import Link from "next/link";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { rupiah } from "@/lib/format";
import { chipOff, chipOn } from "@/lib/ui";
import { Empty } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
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

/** Halaman Shop: sidebar filter 248px di desktop (≥lg), sheet bawah di mobile.
 *  State filter = URL (replaceState, tanpa round-trip server) — lihat `filter.ts`. */
export function CatalogBrowser({ products, initial }: { products: Product[]; initial: Filters }) {
  const [f, setF] = useState(initial);
  const [sheet, setSheet] = useState(false);
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
        <div className="no-scrollbar sticky top-24 max-h-[calc(100dvh-7rem)] overflow-y-auto pr-2 pb-10">
          <div className="mb-6 flex items-center justify-between px-1">
            <h2 className="text-lg font-bold">Filters</h2>
            {n > 0 && <ClearAll onClick={() => set(none(f))} />}
          </div>
          <CatalogFilters products={products} f={f} set={set} />
        </div>
      </aside>

      <div className="min-w-0">
        {/* Bar nempel di bawah header saat scroll (mobile). Latar solid — produk di
            belakangnya tidak boleh tembus, chip & teks harus tetap terbaca. */}
        <div className="sticky top-14 z-30 -mx-4 flex items-center gap-3 border-b border-zinc-200 bg-paper px-4 py-3 sm:-mx-6 sm:px-6 md:top-18 lg:static lg:mx-0 lg:border-0 lg:px-0 lg:pt-0">
          <Button
            variant="outline"
            onClick={() => setSheet(true)}
            className="h-11 gap-2 rounded-full border-zinc-200 px-4 font-semibold lg:hidden"
          >
            <SlidersHorizontal aria-hidden />
            Filters
            {n > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-ink text-[11px] text-paper">{n}</span>
            )}
          </Button>
          <p className="text-sm text-zinc-500" aria-live="polite">
            {count}
          </p>
          <Select
            items={SORT_LABEL}
            value={f.sort}
            onValueChange={(v) => v && set({ ...f, sort: v as Sort })}
          >
            <SelectTrigger
              aria-label="Sort by"
              className="ml-auto h-11 rounded-full border-zinc-200 bg-white pr-3 pl-4 font-medium data-[size=default]:h-11 hover:border-ink"
            >
              <span className="hidden text-zinc-500 sm:inline">Sort:</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-2xl">
              {(Object.keys(SORT_LABEL) as Sort[]).map((s) => (
                <SelectItem key={s} value={s} className="min-h-11 rounded-xl">
                  {SORT_LABEL[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            <ProductGrid products={shown} cols="sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" />
          )}
        </div>
      </div>

      {/* Sheet mobile (Base UI Dialog): fokus terkunci, Esc & klik latar menutup. */}
      <Sheet open={sheet} onOpenChange={setSheet}>
        <SheetContent side="bottom" className="max-h-[88dvh] rounded-t-3xl bg-paper lg:hidden">
          <SheetHeader className="border-b border-zinc-200 px-5 py-4">
            <SheetTitle className="text-lg font-bold">Filters</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-6">
            <CatalogFilters products={products} f={f} set={set} />
          </div>
          <SheetFooter className="flex-row gap-3 border-t border-zinc-200 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <Button
              variant="outline"
              onClick={() => set(none(f))}
              disabled={!n}
              className="h-12 flex-1 rounded-full border-zinc-200 font-semibold"
            >
              Clear all
            </Button>
            <Button onClick={() => setSheet(false)} className="h-12 flex-[2] rounded-full font-semibold">
              Show {count}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function ClearAll({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="min-h-11 text-sm font-semibold underline underline-offset-4 hover:text-accent-dark">
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
          <Button
            variant="secondary"
            onClick={() => set(next)}
            aria-label={`Remove filter ${label}`}
            className="h-9 gap-1.5 rounded-full bg-zinc-100 pr-3 pl-4 font-medium hover:bg-zinc-200"
          >
            {label}
            <X aria-hidden className="size-3.5" />
          </Button>
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
