import { testimonials } from "./data";

/** Di mobile jadi carousel snap; di ≥sm balik ke grid 2 kolom. */
export function TestimonialList({ items = testimonials }: { items?: typeof testimonials }) {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0">
      {items.map((t) => (
        <figure
          key={t.nama}
          className="flex w-[82%] shrink-0 snap-start flex-col rounded-2xl border border-zinc-200 p-5 sm:w-auto"
        >
          <blockquote className="text-sm leading-relaxed text-zinc-700">
            “{t.pesan}”
          </blockquote>
          {t.highlight && (
            <p className="mt-3 inline-block self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              {t.highlight}
            </p>
          )}
          <figcaption className="mt-auto flex items-center gap-3 border-t border-zinc-100 pt-3 sm:mt-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand">
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
