export type Feature = { icon: React.ComponentType<{ className?: string }>; title: string; body: string };

/** Daftar poin kalem: garis tipis di atas tiap poin dengan potongan aksen hijau
 *  di ujung kirinya, ikon hijau tanpa latar. Dipakai "Why PickmenPack". */
export function FeatureList({ items, className = "" }: { items: Feature[]; className?: string }) {
  return (
    <ul className={`grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {items.map((f) => (
        <li key={f.title} className="relative flex gap-4 border-t border-zinc-200 py-5 lg:block">
          <span aria-hidden className="absolute -top-px left-0 h-0.5 w-10 bg-accent" />
          <f.icon className="h-5 w-5 shrink-0 text-accent" />
          <div className="lg:mt-4">
            <h3 className="text-sm font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-zinc-500">{f.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
