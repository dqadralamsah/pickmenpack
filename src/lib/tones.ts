/**
 * Palet "pop" (token `--color-pop-*` di globals.css) sebagai class siap pakai.
 * Ditulis lengkap — Tailwind cuma membaca class yang muncul utuh di source,
 * jadi jangan dirakit dari string (`bg-pop-${x}`).
 * Teks di atas semua tone ini pakai ink.
 */
export const tones = {
  lime: "bg-pop-lime",
  sky: "bg-pop-sky",
  pink: "bg-pop-pink",
  violet: "bg-pop-violet",
  yellow: "bg-pop-yellow",
  mint: "bg-pop-mint",
  peach: "bg-pop-peach",
  zinc: "bg-zinc-100",
} as const;

export type Tone = keyof typeof tones;
