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
          <Link href="/katalog" className="eyebrow shrink-0 border-b border-accent/40 pb-1 text-accent hover:border-accent">
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
          <Link href="/faq" className="eyebrow shrink-0 border-b border-accent/40 pb-1 text-accent hover:border-accent">
            Semua FAQ →
          </Link>
        }
      >
        <FaqList items={faqs.slice(0, 5)} />
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-accent-soft px-6 py-14 text-center sm:py-20">
          <div
            aria-hidden
            className="dotted pointer-events-none absolute inset-0 opacity-40"
          />
          <div className="relative">
            <p className="eyebrow text-accent">Siap titip?</p>
            <h2 className="mx-auto mt-4 max-w-lg text-3xl font-semibold text-ink sm:text-[44px] sm:leading-[1.08]">
              Ada sepatu incaran di JPO?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-600">
              Tulis itemnya, lihat estimasi biayanya langsung, baru putuskan.
            </p>
            <Link
              href="/request"
              className="mt-8 inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent-dark"
            >
              Mulai Request Jastip
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
