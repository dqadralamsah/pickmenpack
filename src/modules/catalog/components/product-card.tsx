import Link from "next/link";
import { rupiah } from "@/lib/format";
import { discountPercent, type Product } from "../data";
import { ProductArt } from "./product-art";

/** Kartu produk minimalis: foto di panel abu, nama 2 baris, rentang harga
 *  (PRD 5.5 — angka pasti dikirim setelah dicek ke toko). */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const habis = product.stock === "habis";
  const diskon = discountPercent(product);

  const isi = (
    <>
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

      {/* min-h dikunci supaya nama 1 vs 2 baris gak bikin grid bergeser. */}
      <h3 className="mt-3 line-clamp-2 min-h-[2.5rem] font-sans text-sm leading-5 tracking-normal transition-colors duration-200 group-hover:text-accent-dark">
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
    </>
  );

  if (habis) {
    return <div className="text-zinc-500">{isi}</div>;
  }

  return (
    <Link href={`/request?item=${product.slug}`} className="group block rounded-2xl">
      {isi}
    </Link>
  );
}
