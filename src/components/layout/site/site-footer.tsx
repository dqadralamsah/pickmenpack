import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./site-header";

type FooterLink = { href: string; label: string; external?: boolean; soon?: boolean };

const ig = `https://instagram.com/${site.instagram.replace("@", "")}`;
const tt = `https://tiktok.com/${site.tiktok}`;

/* `soon: true` = halamannya belum dibuat; tampil sebagai teks + label "Soon"
   (bukan link mati). Hapus flag-nya begitu halamannya jadi. */
const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Products",
    links: [
      { href: "/katalog", label: "Shop all" },
      { href: "/katalog?c=running", label: "Running" },
      { href: "/katalog?c=lifestyle", label: "Lifestyle & Court" },
      { href: "/katalog?c=sandals", label: "Sandals & Slides" },
      { href: "/katalog?c=apparel", label: "Apparel" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "Our story", soon: true },
      { href: "/blog", label: "Blog & news", soon: true },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms & conditions", soon: true },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/cara-bayar", label: "How to pay" },
      { href: "/request", label: "Can’t find your pair? Request it" },
    ],
  },
];

const linkClass =
  "-mx-1 inline-flex min-h-9 items-center rounded px-1 text-[13px] text-zinc-600 transition-colors duration-200 hover:text-ink";

function FooterItem({ l }: { l: FooterLink }) {
  if (l.soon)
    return (
      <span className="inline-flex min-h-9 items-center gap-2 text-[13px] text-zinc-500">
        {l.label}
        <span className="rounded-full bg-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-zinc-600 uppercase">
          Soon
        </span>
      </span>
    );
  return (
    <Link href={l.href} className={linkClass}>
      {l.label}
    </Link>
  );
}

function Social({ href, label, handle, children }: { href: string; label: string; handle: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group -mx-1 flex min-h-11 items-center gap-3 rounded px-1 text-[13px] text-zinc-600 transition-colors duration-200 hover:text-ink"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-white transition-colors duration-200 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
          {children}
        </svg>
      </span>
      <span>
        <span className="sr-only">{label}: </span>
        {handle}
      </span>
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-zinc-50 sm:mt-24">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 pt-12 pb-24 sm:grid-cols-2 sm:px-6 sm:pt-16 lg:grid-cols-[1.3fr_0.9fr_1.1fr_1fr_1.5fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-zinc-600">
            Your friend at the mall. We pick the pair, check it by hand, and pack it
            for you.
          </p>
          <p className="mt-6 text-xs leading-relaxed text-zinc-500">
            © {new Date().getFullYear()} {site.brand}
            <br />
            Always bought at official stores.
          </p>
        </div>

        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title} className="text-sm">
            <p className="font-semibold">{c.title}</p>
            <ul className="mt-3 space-y-0.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <FooterItem l={l} />
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="text-sm">
          <p className="font-semibold">Follow us</p>
          <div className="mt-2">
            <Social href={ig} label="Instagram" handle={site.instagram}>
              <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0m0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9" />
            </Social>
            <Social href={tt} label="TikTok" handle={site.tiktok}>
              <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.6V9a7.4 7.4 0 0 0 4.3 1.4V7.3a4.3 4.3 0 0 1-3.2-1.5" />
            </Social>
          </div>

          {/* Ketentuan singkat — WhatsApp sendiri sudah ada di tombol melayang.
              Kolom ini paling lebar (1.5fr) supaya baris jam "… WIB" gak patah;
              text-balance bikin baris yang tetap panjang patahnya rata. */}
          <ul className="mt-4 space-y-1.5 rounded-2xl border border-zinc-200 bg-white p-4 text-[11px] leading-relaxed text-balance text-zinc-600">
            <li className="font-semibold text-accent-dark">{site.hours}</li>
            <li>Requests close Thursday 23.59 WIB</li>
            <li>No deposit — pay once the price is final</li>
            <li>COD {site.serviceArea}, tracked courier elsewhere</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
