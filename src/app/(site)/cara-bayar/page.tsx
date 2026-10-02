import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { StoreRunSchedule } from "@/modules/home/store-run";
import { PaymentInfo } from "@/modules/payment/payment-info";

export const metadata: Metadata = { title: "How to Pay" };

export default function CaraBayarPage() {
  return (
    <Section
      title="How to Pay"
      desc="Bank transfer or QRIS, once and in full — but only after we've confirmed stock and the exact price with you. No deposit."
    >
      <PaymentInfo />
      <h2 className="mt-12 mb-4 text-lg font-semibold">This week&rsquo;s schedule</h2>
      <StoreRunSchedule />
    </Section>
  );
}
