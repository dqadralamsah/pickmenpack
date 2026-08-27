import Link from "next/link";
import { site, waLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-zinc-200 bg-zinc-50 text-zinc-600 sm:mt-24">
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 py-12 sm:px-6 sm:grid-cols-3 sm:py-16">
        <div>
          <p className="text-lg font-semibold text-ink">{site.brand}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed">{site.tagline}</p>
        </div>

        <div className="text-sm">
          <p className="eyebrow">Pages</p>
          <ul className="mt-3 space-y-2">
            <li><Link href="/katalog" className="hover:text-accent">Catalog</Link></li>
            <li><Link href="/request" className="hover:text-accent">Request a Pair</Link></li>
            <li><Link href="/cara-bayar" className="hover:text-accent">How to Pay</Link></li>
            <li><Link href="/faq" className="hover:text-accent">FAQ &amp; Policy</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="eyebrow">Contact</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a
                href={waLink(`Hi ${site.brand}, I have a question about your service.`)}
                className="hover:text-accent"
              >
                WhatsApp {site.waNumber}
              </a>
            </li>
            <li>Instagram {site.instagram}</li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>

      <p className="eyebrow border-t border-zinc-200 px-4 py-5 text-center">
        © {new Date().getFullYear()} {site.brand}
      </p>
    </footer>
  );
}
