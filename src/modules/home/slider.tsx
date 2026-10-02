"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** Isi `image` kalau banner-nya sudah ada (taruh di /public). Selama kosong,
 *  `tone` yang jadi latar sementara — layout-nya sudah final. */
type Slide = {
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  tone: string;
  image?: string;
};

const slides: Slide[] = [
  {
    eyebrow: "12.12 sale",
    title: "Up to 60% off at the official stores",
    desc: "Nike, Adidas, New Balance — store price, not reseller price.",
    cta: "See what's on sale",
    href: "/katalog",
    tone: "from-zinc-900 via-zinc-800 to-zinc-700",
  },
  {
    eyebrow: "End of season",
    title: "Running shoes from Rp479k",
    desc: "Straight from the latest store run, updated after every trip.",
    cta: "Request a pair",
    href: "/katalog",
    tone: "from-accent-dark via-accent to-zinc-800",
  },
  {
    eyebrow: "No deposit",
    title: "Check first, pay once",
    desc: "Fee from Rp25k. We confirm the exact price before you pay anything.",
    cta: "Get an estimate",
    href: "/request",
    tone: "from-zinc-700 via-zinc-800 to-zinc-900",
  },
];

export function HeroSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  // Pakai offsetLeft slide-nya, bukan n * clientWidth — clientWidth dibulatkan
  // ke bawah, jadi slide berikutnya nyembul beberapa piksel di tepi kanan.
  const go = (n: number) => {
    const el = ref.current;
    const slide = el?.children[n] as HTMLElement | undefined;
    if (el && slide) el.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
  };

  // Autoplay; berhenti sementara kalau tab-nya gak aktif (interval-nya nge-pause sendiri).
  useEffect(() => {
    const id = setInterval(() => go((i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [i]);

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={(e) => {
          const el = e.currentTarget;
          setI(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-3xl"
      >
        {slides.map((s) => (
          <div key={s.title} className="w-full shrink-0 snap-start">
            <div
              className={`relative flex h-[300px] flex-col justify-end overflow-hidden bg-gradient-to-br p-6 sm:h-[420px] sm:p-12 ${s.tone}`}
            >
              {s.image && (
                <Image src={s.image} alt="" fill priority className="object-cover" />
              )}
              <div className="relative max-w-lg text-paper">
                <p className="eyebrow text-paper/70">{s.eyebrow}</p>
                <h2 className="mt-3 text-2xl leading-tight font-semibold sm:text-[40px]">
                  {s.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-paper/80">{s.desc}</p>
                <Link
                  href={s.href}
                  className="mt-6 inline-block rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-white"
                >
                  {s.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 right-6 flex gap-2 sm:bottom-10 sm:right-12">
        {slides.map((s, n) => (
          <button
            key={s.title}
            type="button"
            aria-label={`Slide ${n + 1}`}
            onClick={() => go(n)}
            className={`h-1.5 rounded-full transition-all ${
              n === i ? "w-7 bg-paper" : "w-1.5 bg-paper/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
