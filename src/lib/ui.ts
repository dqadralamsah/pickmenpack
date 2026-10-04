/**
 * Class recipe design system "Clean Commerce" (design-system/pickmenpack/MASTER.md).
 * Dipakai bareng situs publik & panel admin supaya tombol/input gak diracik
 * ulang per halaman. Sementara sampai shadcn/ui dipasang di `src/components/ui`.
 */

export const card = "rounded-xl border border-zinc-200 bg-white";

/** Permukaan yang bisa diklik: kasih feedback hover, bukan diam saja. */
export const cardInteractive = `${card} transition-colors duration-200 hover:border-zinc-400`;

/* --- Form -------------------------------------------------------------- */

/** text-base (16px) wajib di mobile — di bawah itu Safari iOS auto-zoom saat
 *  input difokus. Tingginya 44px biar lolos target sentuh. */
export const field =
  "w-full min-h-11 rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-base text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-zinc-500 hover:border-zinc-400 focus:border-ink focus:ring-3 focus:ring-ink/10 aria-[invalid=true]:border-danger sm:text-sm";

export const fieldError = "border-danger focus:border-danger focus:ring-danger/15";

export const label = "mb-1.5 block text-sm font-medium text-ink";

/** Label gaya eyebrow — dipakai di panel admin yang padat. */
export const labelMuted = "eyebrow mb-1.5 block";

export const hint = "mt-1.5 text-xs leading-relaxed text-zinc-500";

/* --- Tombol ------------------------------------------------------------ */

const btnBase =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

/** Tinggi 44px di mobile (target sentuh), 40px mulai sm. */
export const btn = `${btnBase} min-h-11 px-4 py-2.5 sm:min-h-10 sm:py-2`;

export const btnPrimary = `${btn} bg-ink text-paper hover:bg-zinc-800 active:bg-zinc-700`;
export const btnAccent = `${btn} bg-accent-dark text-paper hover:bg-accent-deep active:bg-accent-deep`;
export const btnGhost = `${btn} border border-zinc-200 bg-white text-ink hover:border-ink active:bg-zinc-50`;
export const btnDanger = `${btn} border border-danger/30 bg-white text-danger hover:bg-danger-soft active:bg-danger-soft`;

/** Tombol kecil di dalam baris padat (toolbar, header kartu). */
export const btnSmall = `${btnBase} min-h-9 px-3 py-1.5 text-[13px]`;

/* --- CTA besar situs publik --------------------------------------------- */

export const pill = `${btnBase} min-h-12 rounded-full px-6`;

export const pillAccent = `${pill} bg-ink text-paper hover:bg-zinc-800 active:bg-zinc-700`;
export const pillOutline = `${pill} border border-zinc-300 bg-white text-ink hover:border-ink`;

/* --- Pil / chip / badge ------------------------------------------------ */

/** Chip filter — 44px di mobile supaya gampang ditekan. */
export const chip =
  "inline-flex min-h-11 shrink-0 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition-colors duration-200 sm:min-h-9";

export const chipOn = `${chip} border-ink bg-ink text-paper`;
export const chipOff = `${chip} border-zinc-200 bg-white text-zinc-700 hover:border-ink hover:text-ink`;

export const badge =
  "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium";

/* --- Disclosure -------------------------------------------------------- */

/** Baris `<summary>`: matikan marker bawaan, sisakan afordansi sendiri. */
export const summaryRow =
  "flex cursor-pointer list-none items-center gap-x-4 gap-y-2 px-4 py-3.5 transition-colors duration-200 hover:bg-zinc-50 [&::-webkit-details-marker]:hidden sm:px-5";

export const disclosureBody =
  "border-t border-zinc-200 bg-zinc-50 px-4 py-4 sm:px-5";
