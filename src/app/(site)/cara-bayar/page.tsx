import type { Metadata } from "next";
import { PageHero, Section } from "@/components/layout/section";
import { HowItWorks } from "@/modules/home/components/how-it-works";
import { PaymentInfo } from "@/modules/payment/components/payment-info";

export const metadata: Metadata = { title: "How to Pay" };

export default function CaraBayarPage() {
  return (
    <>
      <PageHero
        eyebrow="Bank transfer or QRIS · no deposit"
        title="How to pay"
        desc="Once and in full — but only after we've confirmed stock and the exact price with you."
      />
      <Section className="!pt-6">
        <PaymentInfo />
      </Section>
      <Section eyebrow="This week" title="Schedule" className="!pt-0">
        <HowItWorks />
      </Section>
    </>
  );
}
