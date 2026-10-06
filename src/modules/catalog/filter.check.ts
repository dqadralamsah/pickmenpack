// Tes manual filter katalog: node --experimental-strip-types src/modules/catalog/filter.check.ts
import assert from "node:assert/strict";
import type { Product } from "./data.ts";
import { applyFilters, countWith, parseFilters, toQuery } from "./filter.ts";

const p = (slug: string, extra: Partial<Product>): Product => ({
  slug, brand: "Nike", name: slug, priceOriginal: 1_000_000, pricePromo: 500_000,
  sizes: [], store: "", stock: "ready", accent: "", ...extra,
});
const items = [
  p("a", { category: "running", gender: "men", pricePromo: 400_000 }),
  p("b", { category: "running", gender: "women", brand: "Adidas", pricePromo: 900_000 }),
  p("c", { category: "sandals", pricePromo: 300_000, priceOriginal: 1_000_000 }), // unisex
  p("d", { category: "lifestyle", gender: "men", stock: "habis", pricePromo: 1_600_000, priceOriginal: 2_000_000 }),
];
const slugs = (q: Record<string, string>) => applyFilters(items, parseFilters(q)).map((x) => x.slug);

// Multi-value dipisah koma; unisex ikut di Men/Women.
assert.deepEqual(slugs({ c: "running,sandals" }), ["a", "b", "c"]);
assert.deepEqual(slugs({ g: "men" }), ["a", "c", "d"]);
assert.deepEqual(slugs({ g: "unisex" }), ["c"]);
assert.deepEqual(slugs({ brand: "Adidas" }), ["b"]);
// Harga pakai harga promo, batas inklusif.
assert.deepEqual(slugs({ min: "400000", max: "900000" }), ["a", "b"]);
assert.deepEqual(slugs({ instock: "1" }), ["a", "b", "c"]);
assert.deepEqual(slugs({ q: "NIKE c" }), ["c"]);
// Urutan.
assert.deepEqual(slugs({ sort: "price-asc" }), ["c", "a", "b", "d"]);
assert.deepEqual(slugs({ sort: "discount" }), ["c", "a", "d", "b"]);
// Nilai ngawur diabaikan.
assert.equal(parseFilters({ sort: "lol", min: "-5" }).sort, "featured");
assert.equal(parseFilters({ min: "-5" }).min, undefined);
// URL bolak-balik.
const f = parseFilters({ c: "running", g: "men,women", max: "1000000", sort: "price-desc", instock: "1" });
assert.equal(toQuery(f), "?c=running&g=men,women&max=1000000&sort=price-desc&instock=1");
assert.deepEqual(parseFilters(Object.fromEntries(new URLSearchParams(toQuery(f)))), f);
assert.equal(toQuery(parseFilters({})), "");
// Hitungan facet: Men = men + unisex.
assert.equal(countWith(items, parseFilters({}), "g", "men"), 3);
assert.equal(countWith(items, parseFilters({ c: "running" }), "brand", "Nike"), 1);

console.log("filter.check ok");
