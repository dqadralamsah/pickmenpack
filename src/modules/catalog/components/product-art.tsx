import Image from "next/image";
import type { Product } from "../data";

/** Siluet sneaker generik — pengganti foto selama katalog belum punya foto asli. */
export function Sneaker({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 100" className={className} aria-hidden>
      <path
        d="M14 78C14 60 20 49 34 45l36-8c10-2 16-10 22-18l12-2c4 14 14 24 30 30l42 12c12 4 14 13 10 19z"
        fill="#fff"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path d="M10 78h176a6 6 0 0 1 0 12H16a6 6 0 0 1-6-6z" fill="currentColor" />
      <path
        d="M96 27l14 6M100 35l14 6M104 43l14 6M38 68c42-2 82-8 124-16"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Media produk persegi di atas panel abu muda: foto asli kalau ada, kalau belum
 *  siluet netral. Ukurannya dikunci (aspect-square) jadi tidak ada layout shift. */
export function ProductArt({
  product,
  sizes,
  dim = false,
  priority = false,
}: {
  product: Product;
  sizes: string;
  dim?: boolean;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100">
      {product.image ? (
        <Image
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-contain p-4 mix-blend-multiply transition-transform duration-400 ease-[var(--ease-out-soft)] group-hover:scale-[1.04] ${
            dim ? "opacity-40 grayscale" : ""
          }`}
        />
      ) : (
        <Sneaker
          className={`absolute inset-x-[14%] top-1/2 w-[72%] -translate-y-1/2 -rotate-3 text-zinc-700 transition-transform duration-400 ease-[var(--ease-out-soft)] group-hover:scale-[1.04] ${
            dim ? "opacity-30" : ""
          }`}
        />
      )}
    </div>
  );
}
