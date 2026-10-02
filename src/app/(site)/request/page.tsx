import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { getSettings } from "@/modules/admin/store";
import { products } from "@/modules/catalog/data";
import { RequestForm } from "@/modules/request/request-form";

export const metadata: Metadata = { title: "Request a Pair" };

export default async function RequestPage(props: PageProps<"/request">) {
  const { item } = await props.searchParams;
  const picked = products.find((p) => p.slug === item);
  const { waNumber } = await getSettings();

  return (
    <Section
      title="Request a Pair"
      desc="Fill in the details and the cost estimate updates as you type. Nothing is paid at this stage — we check stock and the exact price with the store first."
    >
      <RequestForm defaultItem={picked ? `${picked.brand} ${picked.name}` : ""} waNumber={waNumber} />
    </Section>
  );
}
