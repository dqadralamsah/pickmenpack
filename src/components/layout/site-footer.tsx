import Link from "next/link";
import { site, waLink } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-zinc-200 bg-zinc-50 sm:mt-20">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:grid-cols-3 sm:py-10">
        <div>
          <p className="font-bold">{site.brand}</p>
          <p className="mt-2 text-sm text-zinc-600">{site.tagline}</p>
        </div>

        <div className="text-sm">
          <p className="font-semibold">Halaman</p>
          <ul className="mt-2 space-y-1.5 text-zinc-600">
            <li><Link href="/katalog">Katalog Promo</Link></li>
            <li><Link href="/request">Request Jastip</Link></li>
            <li><Link href="/cara-bayar">Cara Bayar</Link></li>
            <li><Link href="/faq">FAQ & Kebijakan</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-semibold">Kontak</p>
          <ul className="mt-2 space-y-1.5 text-zinc-600">
            <li>
              <a href={waLink("Halo PickmenPack, mau tanya soal jastip sepatu.")}>
                WhatsApp {site.waNumber}
              </a>
            </li>
            <li>Instagram {site.instagram}</li>
            <li>{site.jamOperasional}</li>
          </ul>
        </div>
      </div>

      <p className="border-t border-zinc-200 px-4 py-4 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} {site.brand} · {site.tagline}
      </p>
    </footer>
  );
}
