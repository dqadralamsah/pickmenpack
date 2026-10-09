import Link from "next/link";
import { Section, SeeAll } from "@/components/layout/section";
import { Hero } from "@/modules/home/components/hero";
import { Collections, BrandFocus, CategoryShowcase } from "@/modules/home/components/collections";
import { HowItWorks } from "@/modules/home/components/how-it-works";
import { Why } from "@/modules/home/components/why";
import { Pricing } from "@/modules/home/components/pricing";
import { homeContent } from "@/modules/home/content";
import { products } from "@/modules/catalog/data";
import { ProductGrid } from "@/modules/catalog/components/product-grid";
import { TestimonialList } from "@/modules/testimonial/components/testimonial-list";
import { FaqList } from "@/modules/faq/components/faq-list";
import { faqs } from "@/modules/faq/data";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Kategori langsung tanpa judul — grid 4 × 2. */}
      <Section className="!pt-8 !pb-4 sm:!pt-10">
        <Collections />
      </Section>

      <Section
        eyebrow="Trending"
        title="Everyone’s asking for these"
        desc="Fresh from our last mall run. Final price is always checked before you pay."
        action={<SeeAll href="/katalog" />}
      >
        <ProductGrid products={products.slice(0, 6)} />
      </Section>

      <Section eyebrow="Our regulars" title="Brands we shop every week">
        <BrandFocus />
      </Section>

      <CategoryShowcase />

      {/* Tiga section dari vault "Landing Page Content": kenapa percaya → prosesnya
          & kapan → uangnya dihitung bagaimana. Satu fakta cuma di satu section. */}
      <Section id="why" eyebrow="Why us" title={homeContent.why.title} desc={homeContent.why.subtitle}>
        <Why />
      </Section>

      <Section id="how-it-works" eyebrow="The weekly run" title={homeContent.howItWorks.title} desc={homeContent.howItWorks.subtitle}>
        <HowItWorks />
      </Section>

      <Section id="pricing" eyebrow="No surprises" title={homeContent.pricing.title} desc={homeContent.pricing.subtitle}>
        <Pricing />
      </Section>

      <Section eyebrow="Real orders" title="Happy feet, happy people">
        <TestimonialList />
      </Section>

      <Section eyebrow="FAQ" title="Good questions" action={<SeeAll href="/faq" />}>
        <FaqList items={faqs.slice(0, 5)} />
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-3xl bg-pop-yellow px-6 py-12 text-center sm:py-16">
          <span aria-hidden className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-pop-peach" />
          <span aria-hidden className="absolute -right-12 -bottom-20 h-56 w-56 rounded-full bg-pop-lime" />
          <div className="relative">
            <h2 className="text-3xl font-bold sm:text-4xl">Seen a pair you love?</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink/75">
              Drop us the details and see a rough estimate right away. You only pay
              once we&rsquo;ve confirmed the real price.
            </p>
            <Link
              href="/request"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-7 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-zinc-800"
            >
              Start my request
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
