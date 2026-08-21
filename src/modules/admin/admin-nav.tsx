"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "./actions";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const items = [
  {
    href: "/admin",
    label: "Dashboard",
    svg: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" {...stroke} />
        <rect x="13.5" y="3.5" width="7" height="4.5" rx="1.5" {...stroke} />
        <rect x="13.5" y="11" width="7" height="9.5" rx="1.5" {...stroke} />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" {...stroke} />
      </>
    ),
  },
  {
    href: "/admin/pesanan",
    label: "Pesanan",
    svg: (
      <>
        <path d="M5 7.5h14l-1 12.5H6z" {...stroke} />
        <path d="M9 7.5a3 3 0 0 1 6 0" {...stroke} />
      </>
    ),
  },
  {
    href: "/admin/katalog",
    label: "Katalog",
    svg: (
      <>
        <rect x="3.5" y="4.5" width="17" height="15" rx="2" {...stroke} />
        <path d="M3.5 9.5h17M9 9.5v10" {...stroke} />
      </>
    ),
  },
  {
    href: "/admin/testimoni",
    label: "Testimoni",
    svg: (
      <path d="M4.5 5.5h15v10h-8l-4 3.5v-3.5h-3z" {...stroke} />
    ),
  },
  {
    href: "/admin/faq",
    label: "FAQ",
    svg: (
      <>
        <circle cx="12" cy="12" r="8.5" {...stroke} />
        <path d="M9.7 9.6a2.3 2.3 0 1 1 3 2.2v1.4" {...stroke} />
        <path d="M12.7 16.4h-1.4v.2h1.4z" {...stroke} />
      </>
    ),
  },
  {
    href: "/admin/pengaturan",
    label: "Pengaturan",
    svg: (
      <>
        <circle cx="12" cy="12" r="3" {...stroke} />
        <path
          d="M12 3.5l1.4 2.1 2.5-.4 1 2.3 2.3 1-.4 2.5 2.1 1.4-2.1 1.4.4 2.5-2.3 1-1 2.3-2.5-.4L12 20.5l-1.4-2.1-2.5.4-1-2.3-2.3-1 .4-2.5L3.1 11.6l2.1-1.4-.4-2.5 2.3-1 1-2.3 2.5.4z"
          {...stroke}
        />
      </>
    ),
  },
];

export function AdminNav({ brand }: { brand: string }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Desktop: sidebar gelap biar jelas beda dengan situs publik. */}
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col bg-ink p-4 text-paper md:flex">
        <div className="flex items-center gap-2.5 px-2 py-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-mono text-[10px] font-medium text-paper">
            PMP
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">{brand}</span>
            <span className="block font-mono text-[10px] tracking-[0.18em] text-zinc-400 uppercase">
              Super Admin
            </span>
          </span>
        </div>

        <nav className="mt-4 flex flex-1 flex-col gap-1">
          {items.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                isActive(n.href)
                  ? "bg-white/10 font-medium text-paper"
                  : "text-zinc-400 hover:bg-white/5 hover:text-paper"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
                {n.svg}
              </svg>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-1 border-t border-white/10 pt-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 hover:bg-white/5 hover:text-paper"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
              <path d="M14 5h5v5M19 5l-7 7M18 13.5V19H5V6h5.5" {...stroke} />
            </svg>
            Lihat situs
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 hover:bg-white/5 hover:text-paper"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden>
                <path d="M14 8V5.5h-8v13h8V16M11 12h9m0 0-2.5-2.5M20 12l-2.5 2.5" {...stroke} />
              </svg>
              Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile: bar atas + baris nav yang bisa digeser. */}
      <header className="sticky top-0 z-40 bg-ink text-paper md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm font-semibold">{brand} · Admin</span>
          <form action={logoutAction}>
            <button type="submit" className="text-xs text-zinc-400">
              Keluar
            </button>
          </form>
        </div>
        <nav className="no-scrollbar flex gap-1.5 overflow-x-auto px-4 pb-3">
          {items.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm ${
                isActive(n.href)
                  ? "bg-paper font-medium text-ink"
                  : "bg-white/10 text-zinc-300"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
