"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { CheckboxRow, RadioRow } from "@/components/shared/option-row";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { rupiah } from "@/lib/format";
import { CATEGORY_LABEL, FILTER_GENDERS, GENDER_LABEL, type Category, type Gender, type Product } from "../data";
import { PRICE_PRESETS, countWith, type Filters } from "../filter";

const BRANDS_FOLDED = 8;

const GROUPS = ["Category", "Gender", "Price", "Brand", "Availability"];

/** Isi panel filter — dipakai sidebar desktop dan sheet mobile. Tiap grup bisa
 *  dilipat (Accordion Base UI, banyak terbuka sekaligus); default semua terbuka. */
export function CatalogFilters({
  products,
  f,
  set,
}: {
  products: Product[];
  f: Filters;
  set: (f: Filters) => void;
}) {
  const toggle = <K extends "c" | "brand">(key: K, v: string) => {
    const cur = f[key] as string[];
    set({ ...f, [key]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] });
  };

  return (
    <Accordion multiple defaultValue={GROUPS} className="rounded-none border-0">
      <Group title="Category">
        {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => {
          const n = countWith(products, f, "c", c);
          return (
            <CheckboxRow
              key={c}
              label={CATEGORY_LABEL[c]}
              count={n}
              muted={!n && !f.c.includes(c)}
              checked={f.c.includes(c)}
              onCheckedChange={() => toggle("c", c)}
            />
          );
        })}
      </Group>

      <Group title="Gender" hint="Unisex pairs show under both Men and Women. Kids is kids' sizes only.">
        <ToggleGroup
          multiple
          aria-label="Gender"
          value={f.g}
          onValueChange={(g) => set({ ...f, g: g as Gender[] })}
          spacing={2}
          className="flex-wrap px-1"
        >
          {FILTER_GENDERS.map((g) => (
            <ToggleGroupItem
              key={g}
              value={g}
              className="h-10 rounded-full border border-zinc-200 bg-white px-3.5 text-sm hover:border-ink hover:bg-white aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
            >
              {GENDER_LABEL[g]}
              <span className="text-xs font-normal opacity-60 tabular-nums">{countWith(products, f, "g", g)}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Group>

      <Group title="Price" hint="Based on the lowest promo price.">
        {/* key: isi input min/max ikut reset kalau harga diubah dari luar (chip, Clear all). */}
        <PriceFilter key={`${f.min}-${f.max}`} f={f} set={set} />
      </Group>

      <Group title="Brand">
        <BrandList products={products} f={f} toggle={(b) => toggle("brand", b)} />
      </Group>

      <Group title="Availability">
        <CheckboxRow label="Hide sold out" checked={f.inStock} onCheckedChange={(v) => set({ ...f, inStock: v })} />
      </Group>
    </Accordion>
  );
}

function Group({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <AccordionItem value={title} className="border-zinc-200 data-open:bg-transparent">
      <AccordionTrigger className="min-h-12 items-center rounded-none px-1 py-3 text-[15px] font-semibold hover:no-underline hover:text-zinc-600">
        {title}
      </AccordionTrigger>
      <AccordionContent className="space-y-0.5 px-0 pb-4">
        {children}
        {hint && <p className="mt-2 px-1 text-xs leading-relaxed text-zinc-500">{hint}</p>}
      </AccordionContent>
    </AccordionItem>
  );
}

function BrandList({ products, f, toggle }: { products: Product[]; f: Filters; toggle: (b: string) => void }) {
  const [all, setAll] = useState(false);
  const [q, setQ] = useState("");
  const brands = [...new Set(products.map((p) => p.brand))].sort();
  const found = brands.filter((b) => b.toLowerCase().includes(q.trim().toLowerCase()));
  // Saat mencari, tampilkan semua hasil; brand yang dicentang selalu kelihatan.
  const shown = all || q ? found : found.filter((b, i) => i < BRANDS_FOLDED || f.brand.includes(b));

  return (
    <>
      {brands.length > BRANDS_FOLDED && (
        <div className="relative mb-2 px-1">
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-zinc-400" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search brand"
            aria-label="Search brand"
            className="h-10 rounded-full border-zinc-200 bg-white pl-9 text-sm"
          />
        </div>
      )}
      {shown.map((b) => (
        <CheckboxRow
          key={b}
          label={b}
          count={countWith(products, f, "brand", b)}
          checked={f.brand.includes(b)}
          onCheckedChange={() => toggle(b)}
        />
      ))}
      {!shown.length && <p className="px-3 py-2 text-sm text-zinc-500">No brand matches &ldquo;{q}&rdquo;.</p>}
      {!q && brands.length > BRANDS_FOLDED && (
        <button
          type="button"
          onClick={() => setAll(!all)}
          className="mt-1 min-h-11 px-3 text-sm font-semibold underline underline-offset-4 hover:text-accent-dark"
        >
          {all ? "Show fewer" : `Show all ${brands.length} brands`}
        </button>
      )}
    </>
  );
}

const ANY = "any";

function PriceFilter({ f, set }: { f: Filters; set: (f: Filters) => void }) {
  // Input min/max baru diterapkan saat blur/Enter, bukan tiap ketikan.
  const [min, setMin] = useState(f.min ? String(f.min) : "");
  const [max, setMax] = useState(f.max ? String(f.max) : "");
  const apply = () => set({ ...f, min: Number(min) || undefined, max: Number(max) || undefined });
  const preset = PRICE_PRESETS.find((p) => p.min === f.min && p.max === f.max);
  // Rentang custom (tidak cocok preset) → tidak ada radio yang terpilih.
  const value = preset?.label ?? (f.min || f.max ? "" : ANY);

  const field = (l: string, v: string, setV: (s: string) => void) => (
    <label className="relative flex-1">
      <span className="sr-only">{l} price in rupiah</span>
      <span aria-hidden className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-zinc-400">
        Rp
      </span>
      <Input
        inputMode="numeric"
        placeholder={l}
        value={v ? Number(v).toLocaleString("id-ID") : ""}
        onChange={(e) => setV(e.target.value.replace(/\D/g, "").slice(0, 9))}
        onBlur={apply}
        onKeyDown={(e) => e.key === "Enter" && apply()}
        className="h-11 rounded-xl border-zinc-200 bg-white pl-9 text-sm tabular-nums"
      />
    </label>
  );

  return (
    <>
      <RadioGroup
        aria-label="Price range"
        value={value}
        onValueChange={(v) => {
          const p = PRICE_PRESETS.find((x) => x.label === v);
          set({ ...f, min: p?.min, max: p?.max });
        }}
        className="gap-0.5"
      >
        <RadioRow value={ANY} label="Any price" />
        {PRICE_PRESETS.map((p) => (
          <RadioRow key={p.label} value={p.label} label={p.label} />
        ))}
      </RadioGroup>
      <div className="mt-3 flex items-center gap-2 px-1">
        {field("Min", min, setMin)}
        <span aria-hidden className="text-zinc-400">–</span>
        {field("Max", max, setMax)}
      </div>
      {!preset && (f.min || f.max) && (
        <p className="mt-2 px-1 text-xs text-zinc-600">
          Showing {f.min ? rupiah(f.min) : "Rp0"} – {f.max ? rupiah(f.max) : "any"}
        </p>
      )}
    </>
  );
}
