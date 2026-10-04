"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/katalog", label: "Shop" },
  { href: "/cara-bayar", label: "How to pay" },
  { href: "/faq", label: "FAQ" },
];

/** Nav desktop. Client component semata-mata buat menandai halaman aktif. */
export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="ml-auto hidden items-center gap-6 md:flex">
      {nav.map((n) => {
        const active = pathname === n.href;
        return (
          <Link
            key={n.href}
            href={n.href}
            aria-current={active ? "page" : undefined}
            className={`text-sm transition-colors duration-200 hover:text-ink ${
              active ? "font-semibold text-accent-dark" : "text-zinc-600"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
      <Link
        href="/request"
        className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-accent-dark"
      >
        Request a pair
      </Link>
    </nav>
  );
}
