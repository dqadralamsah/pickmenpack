import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { PaymentInfo } from "@/modules/payment/payment-info";

export const metadata: Metadata = { title: "How to Pay" };

export default function CaraBayarPage() {
  return (
    <Section
      title="How to Pay"
      desc="Payment is still manual — bank transfer or QRIS, confirmed over WhatsApp. The deposit exists so a pair that has already been bought never ends up without a buyer."
    >
      <PaymentInfo />
    </Section>
  );
}
