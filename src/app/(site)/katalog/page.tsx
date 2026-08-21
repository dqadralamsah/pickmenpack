import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { CatalogBrowser } from "@/modules/catalog/catalog-browser";

export const metadata: Metadata = { title: "Katalog Promo" };

export default function KatalogPage() {
  return (
    <Section
      title="Katalog Promo JPO"
      desc="Sepatu yang lagi diskon di Mall JPO, hasil survei terakhir jastiper. Harga di bawah adalah harga toko — fee jastip dihitung terpisah saat kamu request."
    >
      <CatalogBrowser />
      <p className="mt-6 text-xs leading-relaxed text-zinc-500">
        Stok & harga bisa berubah sewaktu-waktu tanpa pemberitahuan. Ketersediaan
        final selalu dikonfirmasi ulang sebelum invoice dikirim.
      </p>
    </Section>
  );
}
