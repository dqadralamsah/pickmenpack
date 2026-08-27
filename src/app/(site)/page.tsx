import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Hero, WhyUs } from "@/modules/home/hero";
import { HeroSlider } from "@/modules/home/slider";
import { Collections, BrandFocus } from "@/modules/home/collections";
import { HowItWorks } from "@/modules/home/how-it-works";
import { products } from "@/modules/catalog/data";
import { ProductGrid } from "@/modules/catalog/product-grid";
import { TestimonialList } from "@/modules/testimonial/testimonial-list";
import { FaqList } from "@/modules/faq/faq-list";
import { faqs } from "@/modules/faq/data";

const seeAll = (href: string, label = "See all →") => (
  <Link href={href} className="eyebrow shrink-0 border-b border-accent/40 pb-1 text-accent hover:border-accent">
    {label}
  </Link>
);

export default function Home() {
  return (
    <>
      <Hero />

      <Section>
        <HeroSlider />
      </Section>

      {/* Kategori & brand tanpa judul section — visualnya yang bicara. */}
      <Section className="!pb-4">
        <Collections />
      </Section>

      <Section title="Brand Focus" desc="The counters we walk into most often." className="!pt-6">
        <BrandFocus />
      </Section>

      <Section
        title="Most wanted sneakers"
        desc="The pairs people ask for the most, refreshed after every store run."
        action={seeAll("/katalog")}
      >
        <ProductGrid products={products.slice(0, 6)} />
      </Section>

      <Section title="Why it works both ways" desc="Four things that keep this fair for you and sustainable for us.">
        <WhyUs />
      </Section>

      <Section title="How it works" desc="Five steps, no back-and-forth chat just to find out the total.">
        <HowItWorks />
      </Section>

      <Section title="What people say">
        <TestimonialList />
      </Section>

      <Section title="Frequently asked" action={seeAll("/faq", "All FAQ →")}>
        <FaqList items={faqs.slice(0, 5)} />
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-accent-soft px-6 py-14 text-center sm:py-20">
          <div aria-hidden className="dotted pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative">
            <p className="eyebrow text-accent">Ready to order?</p>
            <h2 className="mx-auto mt-4 max-w-lg text-3xl font-semibold text-ink sm:text-[44px] sm:leading-[1.08]">
              Got a pair in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-zinc-600">
              Describe it, see the estimate right away, then decide.
            </p>
            <Link
              href="/request"
              className="mt-8 inline-block rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent-dark"
            >
              Start a request
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
