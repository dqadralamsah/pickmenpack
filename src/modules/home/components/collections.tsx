import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/shared/icons";
import { Section } from "@/components/layout/section";
import { tones, type Tone } from "@/lib/tones";
import { products } from "@/modules/catalog/data";
import { Sneaker } from "@/modules/catalog/components/product-art";

/** Kategori: grid 4 × 2. `image` = gambar kartu jadi (path di /public) yang
 *  menutupi SELURUH kartu — teks kategori boleh sudah ada di dalam gambarnya.
 *  Ukuran desain yang disarankan: 800 × 320 px (5:2); di mobile kartu jadi
 *  persegi dan gambar di-crop ke tengah, jadi taruh teks/objek di tengah.
 *  Selama `image` kosong kartu tampil pastel + label + siluet. */
const collections: { label: string; href: string; tone: Tone; image?: string }[] = [
  { label: "Top 50", href: "/katalog?c=top-50", tone: "peach" },
  { label: "Under 1jt", href: "/katalog?c=under-1jt", tone: "lime" },
  { label: "Running", href: "/katalog?c=running", tone: "sky" },
  { label: "Sandals & Slides", href: "/katalog?c=sandals", tone: "yellow" },
  { label: "For Him", href: "/katalog?c=for-him", tone: "mint" },
  { label: "For Her", href: "/katalog?c=for-her", tone: "pink" },
  { label: "Apparel", href: "/katalog?c=apparel", tone: "violet" },
  { label: "Under Retail", href: "/katalog?c=under-retail", tone: "zinc" },
];

/** Kartu kecil yang seluruhnya gambar. Mobile: persegi 4 kolom. ≥sm: pendek 5:2. */
export function Collections() {
  return (
    <nav aria-label="Categories">
      <ul className="grid grid-cols-4 gap-2 sm:gap-3">
        {collections.map((c) => (
          <li key={c.label}>
            <Link
              href={c.href}
              aria-label={c.label}
              className={`group relative block aspect-square overflow-hidden rounded-2xl transition-transform duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 sm:aspect-[5/2] ${tones[c.tone]}`}
            >
              {c.image ? (
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 25vw, 290px"
                  className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-105"
                />
              ) : (
                <>
                  <Sneaker className="absolute -right-[8%] -bottom-[6%] w-[70%] -rotate-12 text-ink/70 transition-transform duration-300 group-hover:-rotate-[18deg] sm:w-[42%]" />
                  <span className="absolute top-2 left-2 max-w-[90%] text-[11px] leading-tight font-semibold sm:top-1/2 sm:left-4 sm:max-w-[55%] sm:-translate-y-1/2 sm:font-heading sm:text-base sm:font-bold">
                    {c.label}
                  </span>
                </>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const brands = [...new Set(products.map((p) => p.brand))];

/** Brand focus: lingkaran dengan wordmark — diganti logo begitu aset tersedia. */
export function BrandFocus() {
  return (
    <ul className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-8 sm:gap-4 sm:px-0">
      {brands.map((b) => (
        <li key={b} className="w-20 shrink-0 sm:w-auto">
          <Link href={`/katalog?brand=${encodeURIComponent(b)}`} className="group block rounded-full text-center">
            <span className="mx-auto flex aspect-square w-full max-w-24 items-center justify-center rounded-full border border-zinc-200 bg-white px-2 text-[11px] font-bold tracking-wide uppercase transition-colors duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
              {b}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* --- Showcase per kategori --------------------------------------------- */

type Showcase = {
  title: string;
  desc: string;
  href: string;
  tone: Tone;
  /** Kalimat besar di atas banner (pengganti teks di foto). */
  headline: string;
  /** Foto banner lebar di /public (rasio ±3:1 desktop, 4:3 mobile). Kosong = ilustrasi. */
  image?: string;
};

/* Kategori yang paling sering diminta — urutan = urutan tampil. */
const showcases: Showcase[] = [
  {
    title: "Running",
    desc: "Daily trainers to race-day shoes, from Nike, Adidas, Asics and New Balance.",
    href: "/katalog?c=running",
    tone: "sky",
    headline: "Built for your next 5K",
  },
  {
    title: "Lifestyle & Court",
    desc: "The everyday classics: Samba, Chuck 70, Old Skool, 530 and friends.",
    href: "/katalog?c=lifestyle",
    tone: "lime",
    headline: "Clean pairs for every day",
  },
  {
    title: "Sandals & Slides",
    desc: "Easy wins for weekends, the gym bag and every trip to the beach.",
    href: "/katalog?c=sandals",
    tone: "peach",
    headline: "Slide into the weekend",
  },
];

function ShowcaseBanner({ s }: { s: Showcase }) {
  return (
    <Link
      href={s.href}
      className={`group relative block aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[5/2] lg:aspect-[3/1] ${tones[s.tone]}`}
    >
      {s.image ? (
        <Image
          src={s.image}
          alt=""
          fill
          sizes="(max-width: 1200px) 100vw, 1200px"
          className="object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
        />
      ) : (
        <>
          <span aria-hidden className="absolute -right-[10%] -bottom-[30%] aspect-square w-[70%] rounded-full bg-white/50 sm:w-[45%]" />
          <Sneaker className="absolute right-[4%] bottom-[12%] w-[62%] -rotate-6 text-ink transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-2 group-hover:-rotate-10 sm:w-[40%]" />
        </>
      )}
      <span className="absolute top-6 left-6 max-w-[55%] font-heading text-2xl leading-tight font-bold text-balance sm:top-10 sm:left-10 sm:text-4xl">
        {s.headline}
      </span>
      <span className="absolute bottom-6 left-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-colors duration-200 group-hover:bg-zinc-800 sm:bottom-10 sm:left-10">
        Shop {s.title.toLowerCase()} <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

export function CategoryShowcase() {
  return (
    <>
      {showcases.map((s) => (
        <Section
          key={s.title}
          eyebrow="Category"
          title={s.title}
          desc={s.desc}
          className="!py-6 sm:!py-8"
          action={
            <Link
              href={s.href}
              className="inline-flex min-h-10 shrink-0 items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          }
        >
          <ShowcaseBanner s={s} />
        </Section>
      ))}
    </>
  );
}
