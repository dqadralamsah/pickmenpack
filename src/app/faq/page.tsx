import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { FaqList } from "@/modules/faq/faq-list";

export const metadata: Metadata = { title: "FAQ & Kebijakan" };

export default function FaqPage() {
  return (
    <Section
      title="FAQ & Kebijakan"
      desc="Aturan main jastip PickmenPack: fee, DP, refund, estimasi waktu, dan settlement selisih harga."
    >
      <FaqList />
    </Section>
  );
}
