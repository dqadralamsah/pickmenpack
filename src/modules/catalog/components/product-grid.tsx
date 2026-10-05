import { ProductCard } from "./product-card";
import type { Product } from "../data";

/** 2 kolom di mobile, naik bertahap sampai 6 di layar lebar. */
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 xl:grid-cols-6">
      {products.map((p, i) => (
        <li key={p.slug}>
          <ProductCard product={p} priority={i < 2} />
        </li>
      ))}
    </ul>
  );
}
