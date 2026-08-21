import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { PaymentInfo } from "@/modules/payment/payment-info";

export const metadata: Metadata = { title: "Cara Bayar" };

export default function CaraBayarPage() {
  return (
    <Section
      title="Cara Bayar"
      desc="Pembayaran masih manual (transfer / QRIS) dengan konfirmasi lewat WhatsApp. Sistem DP dipakai supaya barang yang sudah dibeli gak nyangkut tanpa pembeli."
    >
      <PaymentInfo />
    </Section>
  );
}
