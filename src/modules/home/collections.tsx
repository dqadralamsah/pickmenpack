import Image from "next/image";
import Link from "next/link";
import { products } from "@/modules/catalog/data";

/** Sengaja tanpa judul section — kartunya sendiri yang jadi headline begitu
 *  fotonya masuk. Isi `image` (path di /public) dan `tone` cuma jadi cadangan. */
const collections: {
  label: string;
  desc: string;
  href: string;
  tone: string;
  image?: string;
}[] = [
  { label: "Top 50", desc: "Most requested pairs", href: "/katalog?c=top-50", tone: "from-zinc-900 to-zinc-600" },
  { label: "For Him", desc: "Men's picks", href: "/katalog?c=for-him", tone: "from-zinc-700 to-zinc-400" },
  { label: "For Her", desc: "Women's picks", href: "/katalog?c=for-her", tone: "from-accent to-accent-dark" },
  { label: "For Running", desc: "Road & daily trainers", href: "/katalog?c=running", tone: "from-zinc-800 to-zinc-500" },
  { label: "Under 1jt", desc: "Everything below Rp1.000.000", href: "/katalog?c=under-1jt", tone: "from-zinc-500 to-zinc-800" },
  { label: "Under Retail", desc: "Below the official price tag", href: "/katalog?c=under-retail", tone: "from-zinc-600 to-zinc-900" },
  { label: "Sandals & Slides", desc: "Crocs, Birkenstock & friends", href: "/katalog?c=sandals", tone: "from-zinc-400 to-zinc-700" },
  { label: "Apparel", desc: "Tees, hoodies, caps", href: "/katalog?c=apparel", tone: "from-zinc-800 to-zinc-600" },
];

export function Collections() {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-4">
      {collections.map((c) => (
        <Link
          key={c.label}
          href={c.href}
          className="group relative flex aspect-[5/4] w-[62%] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl p-5 sm:w-auto"
        >
          <span
            className={`absolute inset-0 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105 ${c.tone}`}
          />
          {c.image && <Image src={c.image} alt="" fill className="object-cover" />}
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />
          <span className="relative text-base font-semibold text-paper">{c.label}</span>
          <span className="relative mt-0.5 text-xs leading-snug text-paper/75">{c.desc}</span>
        </Link>
      ))}
    </div>
  );
}

const brands = [...new Set(products.map((p) => p.brand))];

export function BrandFocus() {
  return (
    <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0 lg:grid-cols-8">
      {brands.map((b) => (
        <Link
          key={b}
          href={`/katalog?brand=${encodeURIComponent(b)}`}
          className="flex h-16 w-28 shrink-0 items-center justify-center rounded-xl border border-zinc-200 font-mono text-[11px] font-medium tracking-[0.16em] text-zinc-500 uppercase transition-colors hover:border-ink hover:text-ink sm:w-auto"
        >
          {b}
        </Link>
      ))}
    </div>
  );
}
