import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { FaqList } from "@/modules/faq/faq-list";

export const metadata: Metadata = { title: "FAQ & Policy" };

export default function FaqPage() {
  return (
    <Section
      title="FAQ & Policy"
      desc="How PickmenPack works: fees, deposits, refunds, timing, and how the price difference is settled."
    >
      <FaqList />
    </Section>
  );
}
