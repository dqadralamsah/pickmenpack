import { faqs } from "./data";

export function FaqList({ items = faqs }: { items?: typeof faqs }) {
  return (
    <div className="divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200">
      {items.map((f) => (
        <details key={f.q} className="group bg-white p-4 open:bg-zinc-50">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
            {f.q}
            <span className="text-brand transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
