import Link from "next/link";
import { ArrowRight, ShieldIcon, StoreIcon, TagIcon, WalletIcon } from "@/components/shared/icons";
import { homeContent } from "../content";

const icons = { perItem: TagIcon, fee: WalletIcon, locked: ShieldIcon, receipt: StoreIcon };

/** Pricing — aturan uang (PRD 5.4, 5.8). Satu panel bergaris rambut (beda dari
 *  daftar Why), aksen hijau di ikon, nomor & baris link bawah. */
export function Pricing() {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200">
      <ul className="grid gap-px bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
        {homeContent.pricing.items.map((it, i) => {
          const Icon = icons[it.key];
          return (
            <li key={it.key} className="bg-paper p-6">
              <div className="flex items-center justify-between">
                <Icon className="h-5 w-5 text-accent" />
                <span aria-hidden className="font-heading text-xs font-bold text-accent-dark tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-sm font-semibold">{it.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-500">{it.body}</p>
            </li>
          );
        })}
      </ul>
      <Link
        href="/cara-bayar"
        className="flex min-h-12 items-center justify-between gap-4 border-t border-zinc-200 bg-accent-soft px-6 text-sm font-semibold text-accent-dark transition-colors duration-200 hover:text-accent-deep"
      >
        See how paying works
        <ArrowRight className="h-4 w-4 shrink-0" />
      </Link>
    </div>
  );
}
