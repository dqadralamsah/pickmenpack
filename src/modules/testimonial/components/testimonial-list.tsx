import { Slider } from "@/components/shared/slider";
import { tones, type Tone } from "@/lib/tones";
import { testimonials } from "../data";

const avatarTones: Tone[] = ["peach", "lime", "sky", "pink", "violet", "yellow"];

function Stars() {
  return (
    <span className="flex gap-0.5 text-accent" role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.6L10 14.7l-5.1 2.7 1-5.6-4.1-4 5.7-.8z" />
        </svg>
      ))}
    </span>
  );
}

/** Ulasan: 3 kartu per tampilan di desktop, geser manual atau otomatis. */
export function TestimonialList({ items = testimonials }: { items?: typeof testimonials }) {
  return (
    <Slider label="Customer reviews" itemClassName="basis-[88%] sm:basis-1/2 lg:basis-1/3" delay={5000}>
      {items.map((t, i) => (
        <figure key={t.nama} className="flex h-full flex-col rounded-3xl border border-zinc-200 bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Stars />
            {t.highlight && (
              <span className="rounded-full bg-action-soft px-2.5 py-1 text-[11px] font-semibold text-action">{t.highlight}</span>
            )}
          </div>
          <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-zinc-700">&ldquo;{t.pesan}&rdquo;</blockquote>

          {/* Detail pembelian — apa, ukuran berapa, diterima gimana. */}
          <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 rounded-2xl bg-zinc-50 p-4 text-[13px]">
            <dt className="text-zinc-500">Bought</dt>
            <dd className="font-semibold">{t.item}</dd>
            {t.ukuran && (
              <>
                <dt className="text-zinc-500">Size</dt>
                <dd className="font-medium">EU {t.ukuran}</dd>
              </>
            )}
            {t.delivery && (
              <>
                <dt className="text-zinc-500">Delivery</dt>
                <dd className="font-medium">{t.delivery === "cod" ? `COD in ${t.kota}` : `Shipped to ${t.kota}`}</dd>
              </>
            )}
          </dl>

          <figcaption className="mt-5 flex items-center gap-3">
            <span
              aria-hidden
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold ${tones[avatarTones[i % avatarTones.length]]}`}
            >
              {t.nama[0]}
            </span>
            <span className="min-w-0 text-sm">
              <span className="block truncate font-semibold">{t.nama}</span>
              <span className="block truncate text-xs text-zinc-500">{t.kota} · Verified order</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </Slider>
  );
}
