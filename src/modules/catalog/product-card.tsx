import Link from "next/link";
import { rupiah } from "@/lib/format";
import { discountPercent, type Product } from "./data";

const stockStyle = {
  ready: "bg-emerald-50 text-emerald-700",
  limited: "bg-amber-50 text-amber-700",
  habis: "bg-red-50 text-red-700",
} as const;

const stockLabel = {
  ready: "Ready",
  limited: "Stok tipis",
  habis: "Habis",
} as const;

export function ProductCard({ product }: { product: Product }) {
  const habis = product.stock === "habis";

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow sm:hover:shadow-md">
      <div className={`relative flex h-36 items-end bg-gradient-to-br p-4 sm:h-40 ${product.accent}`}>
        <span className="text-lg font-semibold tracking-tight text-white/95">
          {product.brand}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-white px-2 py-1 text-xs font-bold text-brand">
          -{discountPercent(product)}%
        </span>
        <span
          className={`absolute top-3 left-3 rounded-full px-2 py-1 text-[11px] font-medium ${stockStyle[product.stock]}`}
        >
          {stockLabel[product.stock]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <h3 className="leading-tight font-semibold">{product.name}</h3>
          <p className="mt-0.5 text-xs text-zinc-500">{product.store}</p>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-lg font-bold">{rupiah(product.pricePromo)}</span>
          <span className="text-xs text-zinc-400 line-through">
            {rupiah(product.priceOriginal)}
          </span>
        </div>

        <p className="text-xs text-zinc-500">Ukuran {product.sizes.join(" · ")}</p>

        <div className="mt-auto pt-3">
          {habis ? (
            <span className="block rounded-xl bg-zinc-100 py-3 text-center text-sm font-medium text-zinc-400">
              Tidak tersedia
            </span>
          ) : (
            <Link
              href={`/request?item=${product.slug}`}
              className="block rounded-xl bg-brand py-3 text-center text-sm font-semibold text-white transition-transform active:scale-[.98] sm:hover:bg-brand-dark"
            >
              Titip Beli
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
