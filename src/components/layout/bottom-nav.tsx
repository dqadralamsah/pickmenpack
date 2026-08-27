"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const icon = "h-6 w-6";
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const items = [
  {
    href: "/",
    label: "Home",
    svg: <path d="M3.5 10.7 12 3.5l8.5 7.2V20a1 1 0 0 1-1 1h-4.7v-5.6H9.2V21H4.5a1 1 0 0 1-1-1z" {...stroke} />,
  },
  {
    href: "/katalog",
    label: "Catalog",
    svg: (
      <>
        <path d="M5.5 7.5h13l1 12.5h-15z" {...stroke} />
        <path d="M9 7.5a3 3 0 0 1 6 0" {...stroke} />
      </>
    ),
  },
  {
    href: "/request",
    label: "Request",
    primary: true,
    svg: (
      <>
        <circle cx="12" cy="12" r="8.5" {...stroke} />
        <path d="M12 8.5v7M8.5 12h7" {...stroke} />
      </>
    ),
  },
  {
    href: "/cara-bayar",
    label: "Pay",
    svg: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2.5" {...stroke} />
        <path d="M3 10.5h18M6.5 14.5h3" {...stroke} />
      </>
    ),
  },
  {
    href: "/faq",
    label: "FAQ",
    svg: (
      <>
        <circle cx="12" cy="12" r="8.5" {...stroke} />
        <path d="M9.8 9.6a2.3 2.3 0 1 1 2.9 2.2c-.5.2-.7.6-.7 1.1v.5" {...stroke} />
        <path d="M12 16.4h.01" {...stroke} />
      </>
    ),
  },
];

export function BottomNav() {
  const path = usePathname();

  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-paper/95 backdrop-blur md:hidden">
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-1 pt-1.5">
        {items.map((it) => {
          const active = path === it.href;
          return (
            <li key={it.href} className="flex-1">
              <Link
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-12 flex-col items-center gap-0.5 rounded-xl py-1 text-[10px] font-medium transition-colors active:bg-zinc-100 ${
                  active ? "text-accent" : "text-zinc-500"
                }`}
              >
                <span
                  className={
                    it.primary
                      ? `-mt-4 flex h-11 w-11 items-center justify-center rounded-full text-paper shadow-lg shadow-accent/30 ${
                          active ? "bg-accent-dark" : "bg-accent"
                        }`
                      : ""
                  }
                >
                  <svg viewBox="0 0 24 24" className={icon} aria-hidden>
                    {it.svg}
                  </svg>
                </span>
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
