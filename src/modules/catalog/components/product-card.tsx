import Link from "next/link";
import { rupiah } from "@/lib/format";
import { discountPercent, type Product } from "../data";
import { ProductArt } from "./product-art";

/** Kartu produk minimalis: foto di panel abu, nama 2 baris, titik warna, rentang
 *  harga (PRD 5.5 — angka pasti dikirim setelah dicek ke toko). Klik → detail. */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const habis = product.stock === "habis";
  const diskon = discountPercent(product);
  const colors = product.colors ?? [];

  return (
    <Link href={`/katalog/${product.slug}`} className={`group block rounded-2xl ${habis ? "text-zinc-500" : ""}`}>
      <div className="relative">
        <ProductArt
          product={product}
          dim={habis}
          priority={priority}
          sizes="(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 16vw"
        />
        {diskon > 0 && !habis && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-sale px-2 py-0.5 text-[11px] font-semibold text-white">
            -{diskon}%
          </span>
        )}
        {habis && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-ink px-2 py-0.5 text-[11px] font-semibold text-paper">
            Sold out
          </span>
        )}
      </div>

      {colors.length > 1 && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
          {colors.slice(0, 4).map((c) => (
            <span
              key={c.name}
              aria-hidden
              className="h-3 w-3 rounded-full ring-1 ring-zinc-300"
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span>{colors.length} colours</span>
        </p>
      )}

      {/* min-h dikunci supaya nama 1 vs 2 baris gak bikin grid bergeser. */}
      <h3
        className={`line-clamp-2 min-h-[2.5rem] font-sans text-sm leading-5 tracking-normal transition-colors duration-200 group-hover:text-accent-dark ${
          colors.length > 1 ? "mt-1.5" : "mt-3"
        }`}
      >
        {product.brand} {product.name}
      </h3>
      <p className="mt-1 text-sm font-bold">{rupiah(product.pricePromo)}</p>
      {product.priceOriginal > product.pricePromo && (
        <p className="text-xs text-zinc-500">
          <span className="sr-only">Price range </span>up to {rupiah(product.priceOriginal)}
        </p>
      )}
      {product.stock === "limited" && (
        <p className="mt-1 text-xs font-medium text-warning">Few sizes left</p>
      )}
    </Link>
  );
}
