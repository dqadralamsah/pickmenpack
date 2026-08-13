"use client";

import { useState } from "react";
import { products } from "./data";
import { ProductGrid } from "./product-grid";

const brands = ["Semua", ...new Set(products.map((p) => p.brand))];

export function CatalogBrowser() {
  const [brand, setBrand] = useState("Semua");
  const shown = brand === "Semua" ? products : products.filter((p) => p.brand === brand);

  return (
    <>
      {/* Chip filter nempel di bawah header pas di-scroll — pola umum di app mobile. */}
      <div className="no-scrollbar sticky top-14 -mx-4 mb-4 flex gap-2 overflow-x-auto border-b border-zinc-100 bg-white/95 px-4 py-3 backdrop-blur md:top-16 md:mx-0 md:border-none md:px-0">
        {brands.map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => setBrand(b)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              brand === b
                ? "border-brand bg-brand text-white"
                : "border-zinc-200 text-zinc-600 active:bg-zinc-100"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      <p className="mb-4 text-xs text-zinc-500">
        {shown.length} item {brand !== "Semua" && `· ${brand}`}
      </p>

      <ProductGrid products={shown} />
    </>
  );
}
