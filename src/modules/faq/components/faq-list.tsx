import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "../data";

/** Accordion satu-terbuka (default Base UI): buka satu pertanyaan, yang lain
 *  otomatis tertutup. Kartu membulat bawaan base-luma dimatikan — FAQ = daftar bergaris. */
export function FaqList({ items = faqs }: { items?: typeof faqs }) {
  return (
    <Accordion className="rounded-none border-x-0 border-y border-zinc-200">
      {items.map((f, i) => (
        <AccordionItem key={f.q} value={`faq-${i}`} className="border-zinc-200 data-open:bg-transparent">
          <AccordionTrigger className="min-h-14 items-center rounded-none py-3 text-[15px] font-medium hover:no-underline hover:text-zinc-600 [&_[data-slot=accordion-trigger-icon]]:text-zinc-500">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="max-w-3xl pb-5 leading-relaxed text-zinc-600">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
