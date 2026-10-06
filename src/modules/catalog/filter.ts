// Filter & urutan katalog. Semua state hidup di URL (?c=running,sandals&g=men&brand=Nike
// &min=&max=&sort=&instock=1&q=) supaya link dari home/footer & tombol back jalan.

import type { Category, Gender, Product } from "./data.ts";

export type Sort = "featured" | "price-asc" | "price-desc" | "discount";

export type Filters = {
  c: Category[];
  g: Gender[];
  brand: string[];
  min?: number;
  max?: number;
  sort: Sort;
  inStock: boolean;
  q: string;
};

export const SORT_LABEL: Record<Sort, string> = {
  featured: "Featured",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  discount: "Biggest discount",
};

/** Preset harga, mengikuti batas tier fee (PRD 5.4). */
export const PRICE_PRESETS: { label: string; min?: number; max?: number }[] = [
  { label: "Under Rp500k", max: 499_999 },
  { label: "Rp500k – 1M", min: 500_000, max: 1_000_000 },
  { label: "Rp1M – 1.5M", min: 1_000_001, max: 1_500_000 },
  { label: "Over Rp1.5M", min: 1_500_001 },
];

type Params = Record<string, string | string[] | undefined>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const list = (v: string | string[] | undefined) => one(v).split(",").map((s) => s.trim()).filter(Boolean);
const amount = (v: string | string[] | undefined) => {
  const n = Number(one(v));
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

export function parseFilters(sp: Params): Filters {
  const sort = one(sp.sort) as Sort;
  return {
    c: list(sp.c) as Category[],
    g: list(sp.g) as Gender[],
    brand: list(sp.brand),
    min: amount(sp.min),
    max: amount(sp.max),
    sort: sort in SORT_LABEL ? sort : "featured",
    inStock: one(sp.instock) === "1",
    q: one(sp.q).trim(),
  };
}

/** Kebalikan `parseFilters` — "" kalau tidak ada filter. */
export function toQuery(f: Filters): string {
  const p = new URLSearchParams();
  if (f.c.length) p.set("c", f.c.join(","));
  if (f.g.length) p.set("g", f.g.join(","));
  if (f.brand.length) p.set("brand", f.brand.join(","));
  if (f.min) p.set("min", String(f.min));
  if (f.max) p.set("max", String(f.max));
  if (f.sort !== "featured") p.set("sort", f.sort);
  if (f.inStock) p.set("instock", "1");
  if (f.q) p.set("q", f.q);
  const s = p.toString().replaceAll("%2C", ",");
  return s ? `?${s}` : "";
}

/** Unisex ikut tampil saat filter Men atau Women dipilih. */
const genderMatch = (want: Gender[], g: Gender = "unisex") =>
  !want.length || want.includes(g) || (g === "unisex" && want.some((w) => w !== "unisex"));

export function applyFilters(products: Product[], f: Filters): Product[] {
  const q = f.q.toLowerCase();
  const shown = products.filter(
    (p) =>
      (!f.c.length || (p.category && f.c.includes(p.category))) &&
      genderMatch(f.g, p.gender) &&
      (!f.brand.length || f.brand.includes(p.brand)) &&
      (!f.min || p.pricePromo >= f.min) &&
      (!f.max || p.pricePromo <= f.max) &&
      (!f.inStock || p.stock !== "habis") &&
      (!q || `${p.brand} ${p.name}`.toLowerCase().includes(q)),
  );
  const off = (p: Product) => 1 - p.pricePromo / p.priceOriginal;
  if (f.sort === "price-asc") return shown.toSorted((a, b) => a.pricePromo - b.pricePromo);
  if (f.sort === "price-desc") return shown.toSorted((a, b) => b.pricePromo - a.pricePromo);
  if (f.sort === "discount") return shown.toSorted((a, b) => off(b) - off(a));
  return shown;
}

/** Angka di samping opsi facet: jumlah hasil kalau cuma opsi itu yang dipilih di
 *  facet tersebut, filter lain tetap aktif. ponytail: O(opsi × produk), cukup
 *  untuk katalog ratusan item. */
export const countWith = (products: Product[], f: Filters, key: "c" | "g" | "brand", value: string) =>
  applyFilters(products, { ...f, [key]: [value] }).length;

export const activeCount = (f: Filters) =>
  f.c.length + f.g.length + f.brand.length + (f.min || f.max ? 1 : 0) + (f.inStock ? 1 : 0);
