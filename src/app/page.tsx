import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Hero, WhyUs } from "@/modules/home/hero";
import { HowItWorks } from "@/modules/home/how-it-works";
import { products } from "@/modules/catalog/data";
import { ProductGrid } from "@/modules/catalog/product-grid";
import { TestimonialList } from "@/modules/testimonial/testimonial-list";
import { FaqList } from "@/modules/faq/faq-list";
import { faqs } from "@/modules/faq/data";

export default function Home() {
  return (
    <>
      <Hero />

      <Section>
        <WhyUs />
      </Section>

      <Section
        title="Lagi promo di JPO"
        desc="Diupdate manual tiap kali jastiper survei ke mall. Stok bisa berubah sewaktu-waktu."
        action={
          <Link href="/katalog" className="text-sm font-semibold text-brand">
            Lihat semua →
          </Link>
        }
      >
        <ProductGrid products={products.slice(0, 4)} scroll />
      </Section>

      <Section title="Cara kerjanya" desc="Lima langkah, tanpa chat bolak-balik buat nanya total biaya.">
        <HowItWorks />
      </Section>

      <Section title="Kata mereka yang sudah titip">
        <TestimonialList />
      </Section>

      <Section
        title="Pertanyaan yang sering muncul"
        action={
          <Link href="/faq" className="text-sm font-semibold text-brand">
            Semua FAQ →
          </Link>
        }
      >
        <FaqList items={faqs.slice(0, 5)} />
      </Section>

      <Section>
        <div className="rounded-2xl bg-ink px-6 py-10 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ada sepatu incaran di JPO?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-300">
            Tulis itemnya, lihat estimasi biayanya langsung, baru putuskan.
          </p>
          <Link
            href="/request"
            className="mt-6 inline-block rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Mulai Request Jastip
          </Link>
        </div>
      </Section>
    </>
  );
}
