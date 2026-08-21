import Link from "next/link";
import { rupiah } from "@/lib/format";
import { discountPercent, type Product } from "./data";

/** Badge stok sengaja monokrom — cuma "Habis" yang dibedain lewat outline. */
const stockStyle = {
  ready: "border-zinc-300 text-zinc-600",
  limited: "border-zinc-400 text-ink",
  habis: "border-zinc-300 text-zinc-400",
} as const;

const stockLabel = {
  ready: "Ready",
  limited: "Stok tipis",
  habis: "Habis",
} as const;

export function ProductCard({ product }: { product: Product }) {
  const habis = product.stock === "habis";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors sm:hover:border-zinc-400">
      <div className={`relative flex h-40 items-end bg-gradient-to-br p-4 sm:h-44 ${product.accent}`}>
        <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-zinc-600 uppercase">
          {product.brand}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-accent px-2.5 py-1 font-mono text-[11px] font-medium text-paper">
          −{discountPercent(product)}%
        </span>
        <span
          className={`absolute top-3 left-3 rounded-full border bg-white px-2.5 py-1 text-[11px] font-medium ${stockStyle[product.stock]}`}
        >
          {stockLabel[product.stock]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <h3 className="leading-tight font-medium">{product.name}</h3>
          <p className="eyebrow mt-1">{product.store}</p>
        </div>

        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-lg font-semibold">{rupiah(product.pricePromo)}</span>
          <span className="text-xs text-zinc-400 line-through">
            {rupiah(product.priceOriginal)}
          </span>
        </div>

        <p className="text-xs text-zinc-500">Ukuran {product.sizes.join(" · ")}</p>

        <div className="mt-auto pt-4">
          {habis ? (
            <span className="block rounded-full border border-zinc-200 py-3 text-center text-sm font-medium text-zinc-400">
              Tidak tersedia
            </span>
          ) : (
            <Link
              href={`/request?item=${product.slug}`}
              className="block rounded-full bg-accent py-3 text-center text-sm font-medium text-paper transition-transform active:scale-[.98] sm:hover:bg-accent-dark"
            >
              Titip Beli
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
