import { ProductCard } from "./product-card";
import type { Product } from "../data";

/* Sembunyikan kartu setelah baris ke-2 sesuai jumlah kolom tiap breakpoint
   (2 / 3 / 4 / 6 kolom → 4 / 6 / 8 / 12 kartu). */
const twoRows =
  "max-sm:nth-[n+5]:hidden sm:max-lg:nth-[n+7]:hidden lg:max-xl:nth-[n+9]:hidden xl:nth-[n+13]:hidden";

/** 2 kolom di mobile, naik bertahap sampai 6 di layar lebar. `rows={2}` = potong
 *  jadi 2 baris di semua ukuran layar. `cols` = ganti jumlah kolom (mis. di samping
 *  sidebar filter) — jangan digabung dengan `rows`. */
export function ProductGrid({
  products,
  rows,
  cols = "sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
}: {
  products: Product[];
  rows?: 2;
  cols?: string;
}) {
  return (
    <ul className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 ${cols}`}>
      {products.map((p, i) => (
        <li key={p.slug} className={rows ? twoRows : undefined}>
          <ProductCard product={p} priority={!rows && i < 2} />
        </li>
      ))}
    </ul>
  );
}
