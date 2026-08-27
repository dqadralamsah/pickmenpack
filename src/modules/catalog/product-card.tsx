import Image from "next/image";
import Link from "next/link";
import { rupiah } from "@/lib/format";
import type { Product } from "./data";

/** Tanpa border & tanpa kotak — latar gambar ikut latar web. Field-nya cuma
 *  brand + nama dan dua harga; sisanya baru muncul di halaman detail/request. */
export function ProductCard({ product }: { product: Product }) {
  const habis = product.stock === "habis";

  const isi = (
    <>
      <div className="relative aspect-square overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="flex h-full items-center justify-center font-mono text-[11px] tracking-[0.18em] text-zinc-300 uppercase">
            {product.brand}
          </span>
        )}
        {habis && (
          <span className="eyebrow absolute inset-x-0 bottom-0 bg-paper/85 py-1.5 text-center">
            Habis
          </span>
        )}
      </div>

      <h3 className="mt-3 truncate text-[13px] font-medium">
        {product.brand} — {product.name}
      </h3>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-sm font-semibold">{rupiah(product.pricePromo)}</span>
        <span className="text-xs text-zinc-400 line-through">
          {rupiah(product.priceOriginal)}
        </span>
      </div>
    </>
  );

  if (habis) return <div className="opacity-45">{isi}</div>;

  return (
    <Link href={`/request?item=${product.slug}`} className="group block">
      {isi}
    </Link>
  );
}
