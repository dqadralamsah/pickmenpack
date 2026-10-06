import type { Metadata } from "next";
import { PageHero, Section } from "@/components/layout/section";
import { CatalogBrowser } from "@/modules/catalog/components/catalog-browser";
import { products } from "@/modules/catalog/data";
import { parseFilters } from "@/modules/catalog/filter";

export const metadata: Metadata = { title: "Shop" };

export default async function KatalogPage({ searchParams }: PageProps<"/katalog">) {
  const initial = parseFilters(await searchParams);
  return (
    <>
      <PageHero
        title="Shop"
        desc="On sale now at the official stores, from the latest store run. Prices are a range — the exact price and fee are confirmed before you pay."
      />
      <Section className="!pt-4">
        <CatalogBrowser
          // key: pencarian baru dari header me-reset state filter di client.
          key={initial.q}
          products={products}
          initial={initial}
        />
        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-zinc-500">
          Stock and prices can change at any time. Availability is always
          reconfirmed with the store before we send you the final price.
        </p>
      </Section>
    </>
  );
}
