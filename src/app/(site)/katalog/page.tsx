import type { Metadata } from "next";
import { PageHero, Section } from "@/components/layout/section";
import { CatalogBrowser } from "@/modules/catalog/components/catalog-browser";

export const metadata: Metadata = { title: "Shop" };

export default async function KatalogPage({ searchParams }: PageProps<"/katalog">) {
  const { brand, q } = await searchParams;
  return (
    <>
      <PageHero
        title="Shop"
        desc="On sale now at the official stores, from the latest store run. Prices are a range — the exact price and fee are confirmed before you pay."
      />
      <Section className="!pt-4">
        <CatalogBrowser
          // key: pencarian baru dari header me-reset filter brand.
          key={typeof q === "string" ? q : ""}
          initialBrand={typeof brand === "string" ? brand : undefined}
          query={typeof q === "string" ? q : ""}
        />
        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-zinc-500">
          Stock and prices can change at any time. Availability is always
          reconfirmed with the store before we send you the final price.
        </p>
      </Section>
    </>
  );
}
