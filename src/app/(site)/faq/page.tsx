import type { Metadata } from "next";
import { PageHero, Section } from "@/components/layout/section";
import { FaqList } from "@/modules/faq/components/faq-list";

export const metadata: Metadata = { title: "FAQ & Policy" };

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Fees · store run · payment · refunds"
        title="FAQ & policy"
        desc="How PickmenPack works, from the weekly store run to refunds and returns."
      />
      <Section className="!pt-6">
        <FaqList />
      </Section>
    </>
  );
}
