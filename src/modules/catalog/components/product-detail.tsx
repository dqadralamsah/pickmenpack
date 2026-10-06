"use client";

import Link from "next/link";
import { useState } from "react";
import { rupiah } from "@/lib/format";
import { waLink } from "@/lib/site";
import { btnPrimary } from "@/lib/ui";
import { WhatsAppIcon } from "@/components/shared/icons";
import { CATEGORY_LABEL, GENDER_LABEL, discountPercent, type Colorway, type Product } from "../data";
import { ProductArt } from "./product-art";

const STOCK: Record<Product["stock"], [string, string]> = {
  ready: ["In stock at the store", "bg-emerald-500"],
  limited: ["Few sizes left", "bg-amber-500"],
  habis: ["Sold out at the store right now", "bg-zinc-400"],
};

/** Bagian atas halaman detail: galeri per warna + info + CTA request.
 *  Ganti warna → galeri ganti ke foto warna itu (model sama, warna beda). */
export function ProductDetail({
  product,
  fee,
  quoteDay,
}: {
  product: Product;
  fee: { min: number; max: number };
  /** Hari harga pasti dikirim, mis. "Fri 9 Oct" (nextStoreRun().quote). */
  quoteDay: string;
}) {
  const colors: Colorway[] = product.colors?.length
    ? product.colors
    : [{ name: "", hex: "#fff", images: product.image ? [product.image] : [] }];
  const [ci, setCi] = useState(0);
  const [ii, setIi] = useState(0);
  const [size, setSize] = useState("");
  const color = colors[ci];
  // Belum ada foto → satu slot placeholder siluet berwarna.
  const images: (string | undefined)[] = color.images?.length ? color.images : [undefined];
  const habis = product.stock === "habis";
  const title = `${product.brand} ${product.name}`;
  const variant = [color.name, size && `size ${size}`].filter(Boolean).join(", ");
  const diskon = discountPercent(product);

  const requestHref = habis
    ? `/request?q=${encodeURIComponent(title)}`
    : `/request?${new URLSearchParams({
        item: product.slug,
        ...(color.name && { color: color.name }),
        ...(size && { size }),
      })}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
      {/* Galeri: thumbnail di kiri (desktop) / bawah (mobile). */}
      <div className="flex flex-col gap-3 lg:flex-row-reverse lg:items-start">
        <div className="relative flex-1">
          <ProductArt
            product={product}
            image={images[ii]}
            tint={color.hex}
            dim={habis}
            priority
            alt={`${title}${color.name ? ` in ${color.name}` : ""}, photo ${ii + 1} of ${images.length}`}
            sizes="(max-width: 1024px) 100vw, 640px"
          />
          {diskon > 0 && !habis && (
            <span className="absolute top-4 left-4 rounded-full bg-sale px-2.5 py-1 text-xs font-semibold text-white">
              -{diskon}%
            </span>
          )}
        </div>
        {images.length > 1 && (
          <ul aria-label="Photos" className="no-scrollbar flex gap-2 overflow-x-auto lg:w-20 lg:flex-col">
            {images.map((src, i) => (
              <li key={i} className="w-16 shrink-0 lg:w-full">
                <button
                  type="button"
                  onClick={() => setIi(i)}
                  aria-label={`Photo ${i + 1}`}
                  aria-current={i === ii}
                  className={`block w-full rounded-2xl ring-2 ring-offset-2 transition-shadow duration-150 ${
                    i === ii ? "ring-ink" : "ring-transparent hover:ring-zinc-300"
                  }`}
                >
                  <ProductArt product={product} image={src} tint={color.hex} alt="" sizes="80px" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-medium tracking-wide text-zinc-500 uppercase">{product.brand}</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{product.name}</h1>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="text-2xl font-bold">{rupiah(product.pricePromo)}</p>
          {product.priceOriginal > product.pricePromo && (
            <p className="text-sm text-zinc-500">
              up to <span className="line-through">{rupiah(product.priceOriginal)}</span>
            </p>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600">
          Price range from the store promo. We send the exact price on <strong className="text-ink">{quoteDay}</strong>{" "}
          before you pay anything.
        </p>
        <p className="mt-3 flex items-center gap-2 text-sm font-medium">
          <span aria-hidden className={`h-2 w-2 rounded-full ${STOCK[product.stock][1]}`} />
          {STOCK[product.stock][0]}
        </p>

        {color.name && (
          <fieldset className="mt-7">
            <legend className="text-sm font-semibold">
              Colour: <span className="font-normal text-zinc-600">{color.name}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    setCi(i);
                    setIi(0);
                  }}
                  aria-label={c.name}
                  aria-pressed={i === ci}
                  title={c.name}
                  className={`w-16 rounded-2xl ring-2 ring-offset-2 transition-shadow duration-150 sm:w-20 ${
                    i === ci ? "ring-ink" : "ring-transparent hover:ring-zinc-300"
                  }`}
                >
                  <ProductArt product={product} image={c.images?.[0]} tint={c.hex} alt="" sizes="80px" />
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {product.sizes.length > 0 && (
          <fieldset className="mt-7" disabled={habis}>
            <legend className="flex w-full items-baseline justify-between text-sm font-semibold">
              Size (EU)
              <span className="text-xs font-normal text-zinc-500">Optional — you can pick later</span>
            </legend>
            <div className="mt-3 grid grid-cols-5 gap-2 sm:grid-cols-6">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(size === s ? "" : s)}
                  aria-pressed={size === s}
                  className={`h-11 rounded-lg border text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${
                    size === s ? "border-ink bg-ink text-paper" : "border-zinc-200 bg-white hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Wrong-size items can&rsquo;t be returned — add your foot length in the request if unsure.
            </p>
          </fieldset>
        )}

        <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
          <Link href={requestHref} className={`${btnPrimary} min-h-12 flex-1 rounded-full text-base`}>
            {habis ? "Request a similar pair" : "Request this pair"}
          </Link>
          <a
            href={waLink(`Hi, I'm interested in ${title}${variant ? ` (${variant})` : ""}. Is it still available?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 px-5 text-sm font-semibold transition-colors duration-200 hover:border-action hover:text-action"
          >
            <WhatsAppIcon className="h-4 w-4 text-action" />
            Ask on WhatsApp
          </a>
        </div>

        <dl className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200 text-sm">
          {[
            ["Service fee (est.)", fee.min === fee.max ? rupiah(fee.min) : `${rupiah(fee.min)} – ${rupiah(fee.max)}`],
            ["Bought at", product.store],
            ["Category", product.category ? CATEGORY_LABEL[product.category] : "—"],
            ["Gender", GENDER_LABEL[product.gender ?? "unisex"]],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 py-3">
              <dt className="text-zinc-500">{k}</dt>
              <dd className="text-right font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm text-zinc-600">
          Check first, pay once — no deposit.{" "}
          <Link href="/#how-it-works" className="font-medium text-ink underline underline-offset-4">
            How it works
          </Link>
        </p>
      </div>
    </div>
  );
}
