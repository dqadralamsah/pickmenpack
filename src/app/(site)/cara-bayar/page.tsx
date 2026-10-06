import type { Metadata } from "next";
import { PageHero, Section } from "@/components/layout/section";
import { PaymentInfo } from "@/modules/payment/components/payment-info";

export const metadata: Metadata = { title: "How to Pay" };

export default function CaraBayarPage() {
  return (
    <>
      <PageHero
        eyebrow="Bank transfer or QRIS · no deposit"
        title="How to pay"
        desc="Pay once, in full — only after we confirm the exact price on WhatsApp."
      />
      <Section className="!pt-6">
        <PaymentInfo />
      </Section>
    </>
  );
}
