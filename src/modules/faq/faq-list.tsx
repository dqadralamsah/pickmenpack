import { faqs } from "./data";

export function FaqList({ items = faqs }: { items?: typeof faqs }) {
  return (
    <div className="divide-y divide-zinc-200 border-y border-zinc-200">
      {items.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium transition-colors hover:text-zinc-600">
            {f.q}
            <span className="text-lg leading-none text-accent transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="pb-4 text-sm leading-relaxed text-zinc-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
