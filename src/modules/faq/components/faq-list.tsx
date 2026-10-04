import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "../data";

/** Accordion satu-terbuka: buka satu pertanyaan, yang lain otomatis tertutup. */
export function FaqList({ items = faqs }: { items?: typeof faqs }) {
  return (
    <Accordion type="single" collapsible className="border-y border-zinc-200">
      {items.map((f, i) => (
        <AccordionItem key={f.q} value={`faq-${i}`} className="border-zinc-200">
          <AccordionTrigger className="min-h-14 items-center rounded-none py-3 text-[15px] font-medium hover:no-underline hover:text-zinc-600 [&_[data-slot=accordion-trigger-icon]]:text-zinc-500">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="max-w-3xl pb-5 leading-relaxed text-zinc-600">{f.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
