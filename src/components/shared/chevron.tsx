/** Afordansi buka/tutup untuk `<details>`. Taruh di dalam `<summary>` yang
 *  punya class `group` di elemen `<details>`-nya. */
export function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-180 ${className}`}
    >
      <path
        d="m6 9.5 6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
