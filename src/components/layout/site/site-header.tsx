import Link from "next/link";
import { site } from "@/lib/site";
import { SiteNav } from "./site-nav";
import { SearchIcon } from "@/components/shared/icons";

export function Logo() {
  return (
    <span className="font-heading text-xl font-bold tracking-tight sm:text-[22px]">
      {site.brand.toLowerCase()}
      <span className="text-accent">.</span>
    </span>
  );
}

/** Cari = GET ke /katalog?q=… — tanpa JS, bisa di-bookmark & dibagikan. */
function Search({ className = "" }: { className?: string }) {
  return (
    <form action="/katalog" role="search" className={`relative ${className}`}>
      <label htmlFor="cari" className="sr-only">
        Search sneakers, slides, apparel
      </label>
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      <input
        id="cari"
        name="q"
        type="search"
        placeholder="Search"
        className="h-11 w-full rounded-full bg-zinc-100 pr-3 pl-10 text-base text-ink outline-none transition-[background-color,box-shadow] duration-200 placeholder:text-zinc-600 hover:bg-zinc-200/70 focus:bg-white focus:ring-2 focus:ring-ink sm:text-sm"
      />
    </form>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center gap-3 px-4 sm:px-6 md:h-18 md:gap-8">
        <Link href="/" aria-label={`${site.brand} home`} className="shrink-0 rounded">
          <Logo />
        </Link>

        <Search className="min-w-0 flex-1 md:max-w-md" />

        <SiteNav />
      </div>
    </header>
  );
}
