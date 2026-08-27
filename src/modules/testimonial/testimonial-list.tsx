import { testimonials } from "./data";

/** Mobile: carousel snap. ≥sm: grid — kartu putih dengan glyph kutip besar. */
export function TestimonialList({ items = testimonials }: { items?: typeof testimonials }) {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4">
      {items.map((t) => (
        <figure
          key={t.nama}
          className="relative flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 transition-colors sm:w-auto sm:hover:border-zinc-400"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute top-1 right-4 font-serif text-[84px] leading-[.8] text-zinc-100 select-none"
          >
            &rdquo;
          </span>

          <blockquote className="relative text-[15px] leading-relaxed text-zinc-700">
            {t.pesan}
          </blockquote>

          {t.highlight && (
            <p className="mt-4 inline-flex w-fit rounded-full bg-accent-soft px-3 py-1.5 font-mono text-[10px] font-medium tracking-[0.12em] text-accent uppercase">
              {t.highlight}
            </p>
          )}

          <figcaption className="mt-auto flex items-center gap-3 pt-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-mono text-xs text-paper">
              {t.nama[0]}
            </span>
            <span className="text-sm">
              <span className="font-medium">{t.nama}</span>
              <span className="block text-xs text-zinc-500">
                {t.kota} · {t.item}
              </span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
