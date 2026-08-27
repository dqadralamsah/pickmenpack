import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { CatalogBrowser } from "@/modules/catalog/catalog-browser";

export const metadata: Metadata = { title: "Catalog" };

export default async function KatalogPage({ searchParams }: PageProps<"/katalog">) {
  const { brand } = await searchParams;
  return (
    <Section
      title="Catalog"
      desc="What is on sale right now, based on the latest store run. Prices below are store prices — the service fee is calculated separately when you request."
    >
      <CatalogBrowser initialBrand={typeof brand === "string" ? brand : undefined} />
      <p className="mt-6 text-xs leading-relaxed text-zinc-500">
        Stock and prices can change at any time without notice. Final availability
        is always reconfirmed before the invoice goes out.
      </p>
    </Section>
  );
}
