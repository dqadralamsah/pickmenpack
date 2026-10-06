import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Section } from "@/components/layout/section";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CATEGORY_LABEL, products } from "@/modules/catalog/data";
import { ProductDetail } from "@/modules/catalog/components/product-detail";
import { ProductGrid } from "@/modules/catalog/components/product-grid";
import { estimateFee } from "@/modules/request/fee";
import { nextStoreRun, runDay } from "@/modules/request/store-run";

const find = (slug: string) => products.find((p) => p.slug === slug);

export async function generateMetadata({ params }: PageProps<"/katalog/[slug]">): Promise<Metadata> {
  const p = find((await params).slug);
  return { title: p ? `${p.brand} ${p.name}` : "Not found" };
}

export default async function ProductPage({ params }: PageProps<"/katalog/[slug]">) {
  const product = find((await params).slug);
  if (!product) notFound();
  await connection(); // tanggal store run dihitung per request, bukan saat build

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category && p.stock !== "habis")
    .slice(0, 6);
  const category = product.category;

  return (
    <>
      <Section className="!pt-6">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/katalog" />}>Shop</BreadcrumbLink>
            </BreadcrumbItem>
            {category && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href={`/katalog?c=${category}`} />}>{CATEGORY_LABEL[category]}</BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem className="min-w-0">
              <BreadcrumbPage className="truncate">
                {product.brand} {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <ProductDetail product={product} fee={estimateFee(product.pricePromo)} quoteDay={runDay(nextStoreRun().quote)} />
      </Section>

      {related.length > 0 && (
        <Section title={`More ${category ? CATEGORY_LABEL[category] : "picks"}`}>
          <ProductGrid products={related} rows={2} />
        </Section>
      )}
    </>
  );
}
