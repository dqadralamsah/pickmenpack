import { ProductCard } from "./product-card";
import type { Product } from "./data";

/** scroll: di mobile jadi carousel snap ala app, di ≥sm balik jadi grid biasa. */
export function ProductGrid({
  products,
  scroll = false,
}: {
  products: Product[];
  scroll?: boolean;
}) {
  const wrapper = scroll
    ? "no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4"
    : "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4";

  return (
    <div className={wrapper}>
      {products.map((p) => (
        <div key={p.slug} className={scroll ? "w-[72%] shrink-0 snap-start sm:w-auto" : ""}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}
