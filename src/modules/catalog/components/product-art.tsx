import Image from "next/image";
import { coverImage, type Product } from "../data";

/** Siluet sneaker generik — pengganti foto selama katalog belum punya foto asli.
 *  `fill` = warna badan sepatu (mis. hex colorway). */
export function Sneaker({ className = "", fill = "#fff" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 200 100" className={className} aria-hidden>
      <path
        d="M14 78C14 60 20 49 34 45l36-8c10-2 16-10 22-18l12-2c4 14 14 24 30 30l42 12c12 4 14 13 10 19z"
        fill={fill}
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
 *  siluet berwarna sesuai colorway. Ukurannya dikunci (aspect-square) jadi tidak
 *  ada layout shift. `image`/`tint`/`alt` dipakai galeri detail per warna. */
export function ProductArt({
  product,
  sizes,
  dim = false,
  priority = false,
  image = coverImage(product),
  tint = product.colors?.[0]?.hex,
  alt = `${product.brand} ${product.name}`,
}: {
  product: Product;
  sizes: string;
  dim?: boolean;
  priority?: boolean;
  image?: string;
  tint?: string;
  alt?: string;
}) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100">
      {image ? (
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          // URL luar (ditempel admin) tidak lewat optimizer — butuh remotePatterns kalau mau dioptimasi.
          unoptimized={/^https?:/.test(image)}
          className={`object-contain p-4 mix-blend-multiply transition-transform duration-400 ease-[var(--ease-out-soft)] group-hover:scale-[1.04] ${
            dim ? "opacity-40 grayscale" : ""
          }`}
        />
      ) : (
        <Sneaker
          fill={tint}
          className={`absolute inset-x-[14%] top-1/2 w-[72%] -translate-y-1/2 -rotate-3 text-zinc-700 transition-transform duration-400 ease-[var(--ease-out-soft)] group-hover:scale-[1.04] ${
            dim ? "opacity-30" : ""
          }`}
        />
      )}
    </div>
  );
}
