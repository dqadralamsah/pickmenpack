"use client";

import { useId, useState } from "react";
import { Chevron } from "@/components/shared/chevron";
import { CATEGORY_LABEL, GENDER_LABEL, type Category, type Gender, type Product } from "../data";
import { PRICE_PRESETS, countWith, type Filters } from "../filter";

const BRANDS_FOLDED = 8;

/** Isi panel filter — dipakai sidebar desktop dan bottom sheet mobile.
 *  Native checkbox/radio di dalam <fieldset> + <details>: keyboard & screen reader gratis. */
export function CatalogFilters({
  products,
  f,
  set,
}: {
  products: Product[];
  f: Filters;
  set: (f: Filters) => void;
}) {
  const brands = [...new Set(products.map((p) => p.brand))].sort();
  const toggle = <K extends "c" | "g" | "brand">(key: K, v: Filters[K][number]) => {
    const cur = f[key] as string[];
    set({ ...f, [key]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] });
  };

  return (
    <div className="divide-y divide-zinc-200">
      <Group title="Category" open>
        {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
          <Check
            key={c}
            label={CATEGORY_LABEL[c]}
            count={countWith(products, f, "c", c)}
            checked={f.c.includes(c)}
            onChange={() => toggle("c", c)}
          />
        ))}
      </Group>

      <Group title="Gender" open>
        {(Object.keys(GENDER_LABEL) as Gender[]).map((g) => (
          <Check
            key={g}
            label={GENDER_LABEL[g]}
            count={countWith(products, f, "g", g)}
            checked={f.g.includes(g)}
            onChange={() => toggle("g", g)}
          />
        ))}
        <p className="pt-1 text-xs text-zinc-500">Unisex pairs show up under Men and Women too.</p>
      </Group>

      <Group title="Price" open>
        <PriceFilter key={`${f.min}-${f.max}`} f={f} set={set} />
      </Group>

      <Group title="Brand" open>
        <BrandList brands={brands} products={products} f={f} toggle={(b) => toggle("brand", b)} />
      </Group>

      <Group title="Availability" open>
        <Check label="Hide sold out" checked={f.inStock} onChange={() => set({ ...f, inStock: !f.inStock })} />
      </Group>
    </div>
  );
}

function Group({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group py-4 first:pt-0">
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <Chevron />
      </summary>
      <fieldset className="mt-3 space-y-1">
        <legend className="sr-only">{title}</legend>
        {children}
      </fieldset>
    </details>
  );
}

function Check({
  label,
  count,
  checked,
  onChange,
  type = "checkbox",
  name,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
  type?: "checkbox" | "radio";
  name?: string;
}) {
  const empty = count === 0 && !checked;
  return (
    <label
      className={`flex min-h-10 cursor-pointer items-center gap-3 rounded-lg px-2 text-sm transition-colors duration-150 hover:bg-zinc-100 ${
        empty ? "text-zinc-400" : "text-zinc-700"
      }`}
    >
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 cursor-pointer accent-ink"
      />
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="text-xs tabular-nums text-zinc-400">{count}</span>}
    </label>
  );
}

function BrandList({
  brands,
  products,
  f,
  toggle,
}: {
  brands: string[];
  products: Product[];
  f: Filters;
  toggle: (b: string) => void;
}) {
  const [all, setAll] = useState(false);
  // Brand yang dicentang selalu kelihatan walau daftarnya dilipat.
  const shown = all ? brands : brands.filter((b, i) => i < BRANDS_FOLDED || f.brand.includes(b));
  return (
    <>
      {shown.map((b) => (
        <Check
          key={b}
          label={b}
          count={countWith(products, f, "brand", b)}
          checked={f.brand.includes(b)}
          onChange={() => toggle(b)}
        />
      ))}
      {brands.length > BRANDS_FOLDED && (
        <button
          type="button"
          onClick={() => setAll(!all)}
          className="mt-1 px-2 text-sm font-medium underline underline-offset-4 hover:text-accent-dark"
        >
          {all ? "Show fewer" : `Show all ${brands.length} brands`}
        </button>
      )}
    </>
  );
}

/** Di-render dengan `key` dari min/max, jadi isi input ikut reset kalau harga
 *  diubah dari luar (preset, chip aktif, Clear all). */
function PriceFilter({ f, set }: { f: Filters; set: (f: Filters) => void }) {
  // Input min/max baru diterapkan saat blur/Enter, bukan tiap ketikan.
  const [min, setMin] = useState(f.min ? String(f.min) : "");
  const [max, setMax] = useState(f.max ? String(f.max) : "");
  const apply = () => set({ ...f, min: Number(min) || undefined, max: Number(max) || undefined });
  const preset = PRICE_PRESETS.find((p) => p.min === f.min && p.max === f.max);
  const name = useId(); // sidebar & sheet sama-sama render panel ini
  const input = (l: string, v: string, setV: (s: string) => void) => (
    <label className="flex-1">
      <span className="sr-only">{l} price in rupiah</span>
      <input
        inputMode="numeric"
        placeholder={`${l} Rp`}
        value={v}
        onChange={(e) => setV(e.target.value.replace(/\D/g, ""))}
        onBlur={apply}
        onKeyDown={(e) => e.key === "Enter" && apply()}
        className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-ink"
      />
    </label>
  );

  return (
    <>
      {PRICE_PRESETS.map((p) => (
        <Check
          key={p.label}
          type="radio"
          name={name}
          label={p.label}
          checked={preset === p}
          onChange={() => set({ ...f, min: p.min, max: p.max })}
        />
      ))}
      <div className="flex items-center gap-2 px-2 pt-2">
        {input("Min", min, setMin)}
        <span aria-hidden className="text-zinc-400">–</span>
        {input("Max", max, setMax)}
      </div>
      <p className="px-2 pt-1 text-xs text-zinc-500">Based on the lowest promo price.</p>
      {(f.min || f.max) && (
        <button
          type="button"
          onClick={() => set({ ...f, min: undefined, max: undefined })}
          className="px-2 pt-1 text-sm font-medium underline underline-offset-4 hover:text-accent-dark"
        >
          Any price
        </button>
      )}
    </>
  );
}
