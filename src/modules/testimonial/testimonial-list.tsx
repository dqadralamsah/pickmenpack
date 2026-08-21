import { testimonials } from "./data";

/** Di mobile jadi carousel snap; di ≥sm balik ke grid 2 kolom. */
export function TestimonialList({ items = testimonials }: { items?: typeof testimonials }) {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0">
      {items.map((t) => (
        <figure
          key={t.nama}
          className="flex w-[82%] shrink-0 snap-start flex-col rounded-2xl border border-zinc-200 bg-white p-6 sm:w-auto"
        >
          <blockquote className="text-[15px] leading-relaxed text-zinc-700">
            “{t.pesan}”
          </blockquote>
          {t.highlight && (
            <p className="eyebrow mt-4 border-l-2 border-accent pl-3 text-accent">
              {t.highlight}
            </p>
          )}
          <figcaption className="mt-auto flex items-center gap-3 border-t border-zinc-200 pt-4 sm:mt-6">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-mono text-xs text-paper">
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
