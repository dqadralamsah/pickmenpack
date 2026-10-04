import type { Metadata } from "next";
import { PageHero, Section } from "@/components/layout/section";
import { getSettings } from "@/modules/admin/store";
import { products } from "@/modules/catalog/data";
import { RequestForm } from "@/modules/request/components/request-form";

export const metadata: Metadata = { title: "Request a Pair" };

export default async function RequestPage(props: PageProps<"/request">) {
  const { item, q } = await props.searchParams;
  const picked = products.find((p) => p.slug === item);
  // `q` datang dari pencarian katalog yang kosong — isi otomatis kolom item.
  const defaultItem = picked ? `${picked.brand} ${picked.name}` : typeof q === "string" ? q.slice(0, 80) : "";
  const { waNumber } = await getSettings();

  return (
    <>
      <PageHero
        title="Request a pair"
        desc="Fill in the details and the estimate updates as you type. We check stock and the exact price with the store first."
      />
      <Section className="!pt-6">
        <RequestForm defaultItem={defaultItem} waNumber={waNumber} />
      </Section>
    </>
  );
}
