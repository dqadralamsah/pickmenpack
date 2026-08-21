import Link from "next/link";
import { site, waLink } from "@/lib/site";

const nav = [
  { href: "/katalog", label: "Katalog Promo" },
  { href: "/request", label: "Request Jastip" },
  { href: "/cara-bayar", label: "Cara Bayar" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 md:h-[68px]">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-mono text-[10px] font-medium tracking-tight text-paper">
            {site.short}
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight">{site.brand}</span>
            <span className="eyebrow block">Jastip sepatu · Mall JPO</span>
          </span>
        </Link>

        <nav className="hidden gap-8 text-sm md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-zinc-600 transition-colors hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Desktop: CTA teks. Mobile: ikon WA saja — navigasi utama ada di bottom nav. */}
        <Link
          href="/request"
          className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-accent-dark md:block"
        >
          Titip Beli
        </Link>
        <a
          href={waLink(`Halo ${site.brand}, mau tanya soal jastip sepatu.`)}
          aria-label="Chat WhatsApp"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 active:bg-zinc-100 md:hidden"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8m-3.6 4c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.7 2.7 4.2 3.7 2.1.8 2.5.7 3 .6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.6-.3-1.5-.7c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.4-.5.3-.5v-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4z" />
          </svg>
        </a>
      </div>
    </header>
  );
}
