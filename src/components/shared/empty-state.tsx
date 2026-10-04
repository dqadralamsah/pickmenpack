/** Kosong bukan berarti rusak — kasih ikon + kalimat yang menjelaskan. */
export function Empty({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-zinc-50 px-6 py-12 text-center">
      <svg viewBox="0 0 24 24" aria-hidden className="mx-auto h-8 w-8 text-zinc-400">
        <path
          d="M4 8.5 12 4l8 4.5v7L12 20l-8-4.5z M4 8.5 12 13m0 0 8-4.5M12 13v7"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-zinc-600">
        {children}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
