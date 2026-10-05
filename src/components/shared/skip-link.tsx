/** Lompat ke konten — kelihatan hanya saat difokus keyboard. */
export function SkipLink({ href = "#konten" }: { href?: string }) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper"
    >
      Langsung ke konten
    </a>
  );
}
