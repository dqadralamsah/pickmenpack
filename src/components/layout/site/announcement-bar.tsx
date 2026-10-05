import Link from "next/link";
import { site } from "@/lib/site";

/** Satu baris info di atas header — pesan terpenting saja (PRD 5.5, 5.8). */
export function AnnouncementBar() {
  return (
    <div className="bg-ink text-paper">
      <div className="mx-auto flex h-9 w-full max-w-[1200px] items-center justify-center gap-6 px-4 text-xs sm:justify-between sm:px-6">
        <p className="min-w-0 truncate">
          Zero deposit — you only pay once the price is locked in.{" "}
          <Link href="/cara-bayar" className="font-semibold text-accent underline underline-offset-2">
            See how
          </Link>
        </p>
        <p className="hidden shrink-0 text-paper/70 sm:block">COD around {site.serviceArea} · Insured delivery everywhere else</p>
      </div>
    </div>
  );
}
