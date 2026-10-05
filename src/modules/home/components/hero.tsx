import Image from "next/image";
import Link from "next/link";
import { tones, type Tone } from "@/lib/tones";
import { pillAccent, pillOutline } from "@/lib/ui";
import { Slider } from "@/components/shared/slider";
import { discountPercent, products } from "@/modules/catalog/data";
import { ProductArt, Sneaker } from "@/modules/catalog/components/product-art";

/** Pasangan dengan diskon terbesar jadi visual slide pertama. */
const featured = [...products]
  .filter((p) => p.stock !== "habis")
  .sort((a, b) => discountPercent(b) - discountPercent(a))[0];

type Slide = {
  tone: Tone;
  tag: string;
  title: React.ReactNode;
  body: string;
  cta: { href: string; label: string };
  cta2?: { href: string; label: string };
  /** Foto promo di /public (mis. "/banners/1212.jpg", rasio ±4:3). Kosong = ilustrasi. */
  image?: string;
};

/* Slide pemasaran. Ganti teks/`image` di sini — urutan = urutan tampil. */
const slides: Slide[] = [
  {
    tone: "peach",
    tag: "12.12 sale season is here",
    title: (
      <>
        Your next pair, <span className="underline decoration-accent decoration-4 underline-offset-6">picked</span> straight
        from the store.
      </>
    ),
    body: "Tell us what you’re after. We check the real price at the official store, you pay once, and we do the shopping.",
    cta: { href: "/katalog", label: "Browse the drops" },
    cta2: { href: "/request", label: "Ask for any pair" },
  },
  {
    tone: "lime",
    tag: "Every Saturday",
    title: "One mall run. Every request, shopped in one go.",
    body: "Send your request by Thursday night, get the exact price on Friday, and your pair ships on Sunday.",
    cta: { href: "/request", label: "Join this week’s run" },
  },
  {
    tone: "sky",
    tag: "Zero deposit",
    title: "Pay once — only after the price is locked in.",
    body: "No down payment, no guesswork. Changed your mind before paying? That’s completely free.",
    cta: { href: "/cara-bayar", label: "See how paying works" },
  },
  {
    tone: "violet",
    tag: "Can’t find it?",
    title: "Not in our shop? We’ll still look for it.",
    body: "Drop a link or a photo of the pair you want and we’ll check it at the store for you.",
    cta: { href: "/request", label: "Request any pair" },
  },
];

function SlideCard({ s, first }: { s: Slide; first: boolean }) {
  return (
    <div
      className={`grid min-h-[30rem] items-center gap-6 overflow-hidden rounded-3xl px-6 pt-10 pb-20 sm:min-h-[26rem] sm:px-12 sm:pb-16 lg:grid-cols-[1.15fr_1fr] ${tones[s.tone]}`}
    >
      <div>
        <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
          {s.tag}
        </p>
        {/* Cuma slide pertama yang jadi h1 halaman. */}
        {first ? (
          <h1 className="mt-4 text-[32px] leading-[1.08] font-bold sm:text-[50px]">{s.title}</h1>
        ) : (
          <p className="mt-4 font-heading text-[32px] leading-[1.08] font-bold text-balance sm:text-[50px]">{s.title}</p>
        )}
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/75">{s.body}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link href={s.cta.href} className={pillAccent}>
            {s.cta.label}
          </Link>
          {s.cta2 && (
            <Link href={s.cta2.href} className={`${pillOutline} border-ink/15 bg-white/70`}>
              {s.cta2.label}
            </Link>
          )}
        </div>
      </div>

      <div className="relative mx-auto hidden w-full max-w-sm sm:block">
        {s.image ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image src={s.image} alt="" fill sizes="(max-width: 1024px) 80vw, 420px" priority={first} className="object-cover" />
          </div>
        ) : first && featured ? (
          <Link href={`/request?item=${featured.slug}`} className="group relative block">
            <ProductArt product={featured} sizes="(max-width: 1024px) 80vw, 384px" priority />
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold whitespace-nowrap shadow-sm">
              {featured.brand} {featured.name} · <span className="text-accent-dark">up to -{discountPercent(featured)}%</span>
            </span>
          </Link>
        ) : (
          /* Ilustrasi sementara: lingkaran putih + siluet sepatu. */
          <div className="relative flex aspect-square items-center justify-center">
            <span aria-hidden className="absolute inset-[8%] rounded-full bg-white/60" />
            <Sneaker className="relative w-[78%] -rotate-6 text-ink" />
          </div>
        )}
      </div>
    </div>
  );
}

/** Banner utama: slider promo (autoplay 6 detik, bullet + geser). */
export function Hero() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 pt-4 sm:px-6 sm:pt-6">
      <Slider label="Promotions" delay={6000} overlayControls>
        {slides.map((s, i) => (
          <SlideCard key={s.tag} s={s} first={i === 0} />
        ))}
      </Slider>
    </section>
  );
}
