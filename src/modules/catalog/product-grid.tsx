import { ProductCard } from "./product-card";
import type { Product } from "./data";

/** Kartu kecil: 6 kolom di desktop, 2 di mobile. */
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-6">
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
