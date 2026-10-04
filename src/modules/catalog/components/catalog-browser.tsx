"use client";

import Link from "next/link";
import { useState } from "react";
import { chipOff, chipOn } from "@/lib/ui";
import { Empty } from "@/components/shared/empty-state";
import { products } from "../data";
import { ProductGrid } from "./product-grid";

const brands = ["All", ...new Set(products.map((p) => p.brand))];

export function CatalogBrowser({ initialBrand = "All", query = "" }: { initialBrand?: string; query?: string }) {
  const [brand, setBrand] = useState(brands.includes(initialBrand) ? initialBrand : "All");
  const q = query.trim().toLowerCase();
  const shown = products.filter(
    (p) =>
      (brand === "All" || p.brand === brand) &&
      (!q || `${p.brand} ${p.name}`.toLowerCase().includes(q)),
  );

  return (
    <>
      {/* Chip filter nempel di bawah header pas di-scroll — pola umum di app mobile.
          Offset-nya ikut tinggi header (14 di mobile, 18 di ≥md) biar gak ketutup.
          Latar glass (utility di globals.css): produk di belakang tetap samar kelihatan. */}
      <div
        role="group"
        aria-label="Filter brand"
        className="no-scrollbar sticky top-14 z-30 -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 py-3 glass sm:-mx-6 sm:px-6 md:top-18"
      >
        {brands.map((b) => (
          <button
            key={b}
            type="button"
            aria-pressed={brand === b}
            onClick={() => setBrand(b)}
            className={brand === b ? chipOn : chipOff}
          >
            {b}
          </button>
        ))}
      </div>

      {/* aria-live: jumlah hasil berubah tanpa pindah halaman, jadi harus diumumkan. */}
      <p className="mb-5 text-sm text-zinc-500" aria-live="polite">
        {shown.length} {shown.length === 1 ? "item" : "items"}
        {q && (
          <>
            {" "}for &ldquo;<span className="font-medium text-ink">{query.trim()}</span>&rdquo; ·{" "}
            <Link href="/katalog" className="underline underline-offset-2 hover:text-ink">
              clear search
            </Link>
          </>
        )}
      </p>

      {shown.length === 0 ? (
        <Empty
          action={
            <Link href={`/request${q ? `?q=${encodeURIComponent(query.trim())}` : ""}`} className="text-sm font-semibold underline underline-offset-4">
              Request it anyway
            </Link>
          }
        >
          Nothing matches yet. We can still look for it at the store — just send a request.
        </Empty>
      ) : (
        <ProductGrid products={shown} />
      )}
    </>
  );
}
