import { site, waLink } from "@/lib/site";
import { WhatsAppIcon } from "@/components/shared/icons";

/** Tombol chat WhatsApp yang selalu melayang di pojok kanan bawah.
 *  Mobile: duduk di atas bottom nav (utility `bottom-safe`), cuma ikon.
 *  Desktop: pil dengan label. */
export function FloatingWhatsApp() {
  return (
    <a
      href={waLink(`Hi ${site.brand}, I have a question about your service.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="bottom-safe fixed right-4 z-50 inline-flex h-14 min-w-14 items-center justify-center gap-2 rounded-full bg-action px-4 text-sm font-semibold text-paper shadow-lg shadow-action/30 transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-action-hover active:translate-y-0 md:right-6 md:bottom-6 md:px-5"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden md:inline">Chat with us</span>
    </a>
  );
}
