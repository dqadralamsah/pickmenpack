import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { products } from "@/modules/catalog/data";
import { RequestForm } from "@/modules/request/request-form";

export const metadata: Metadata = { title: "Request Jastip" };

export default async function RequestPage(props: PageProps<"/request">) {
  const { item } = await props.searchParams;
  const picked = products.find((p) => p.slug === item);

  return (
    <Section
      title="Request Jastip"
      desc="Isi detail barangnya, estimasi biaya langsung kehitung di sebelah. Belum ada pembayaran di tahap ini — jastiper cek stok dulu ke JPO."
    >
      <RequestForm defaultItem={picked ? `${picked.brand} ${picked.name}` : ""} />
    </Section>
  );
}
