import { site, waLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/shared/icons";

/** Tombol chat WhatsApp yang selalu melayang di pojok kanan bawah.
 *  Lingkaran ikon saja; di mobile duduk di atas bottom nav (utility `bottom-safe`). */
export function FloatingWhatsApp() {
  return (
    <a
      href={waLink(`Hi ${site.brand}, I have a question about your service.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="bottom-safe fixed right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-action text-paper shadow-lg shadow-action/30 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-action-hover active:translate-y-0 md:right-6 md:bottom-6"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
