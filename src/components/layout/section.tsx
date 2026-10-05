import Link from "next/link";

/** Container standar untuk satu blok halaman: lebar maksimum, padding responsif,
 *  dan kepala section (judul + deskripsi + aksi) yang seragam. */
export function Section({
  id,
  eyebrow,
  title,
  desc,
  action,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  desc?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12 ${className}`}
    >
      {(title || action) && (
        <div className="mb-5 flex items-end justify-between gap-x-6 gap-y-2 sm:mb-6">
          <div className="min-w-0">
            {eyebrow && <p className="mb-1 text-sm font-medium text-accent-dark">{eyebrow}</p>}
            {title && <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>}
            {desc && (
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-500">{desc}</p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

/** Kepala halaman dalam (Shop, Request, FAQ, dst.). */
export function PageHero({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mx-auto w-full max-w-[1200px] px-4 pt-8 pb-2 sm:px-6 sm:pt-12">
      {eyebrow && <p className="mb-1.5 text-sm font-medium text-accent-dark">{eyebrow}</p>}
      <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      {desc && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500 sm:text-[15px]">{desc}</p>}
      {children}
    </header>
  );
}

/** Link "Lihat semua" di kanan judul section. */
export function SeeAll({ href, label = "See all" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-10 shrink-0 items-center gap-1 text-sm font-semibold text-accent-dark underline-offset-4 hover:underline"
    >
      {label}
      <span aria-hidden>&rsaquo;</span>
    </Link>
  );
}
