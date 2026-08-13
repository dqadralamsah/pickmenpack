export function Section({
  title,
  desc,
  action,
  children,
  className = "",
}: {
  title?: string;
  desc?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto w-full max-w-6xl px-4 py-8 sm:py-14 ${className}`}>
      {(title || action) && (
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6">
          <div>
            {title && (
              <h2 className="text-xl font-bold tracking-tight sm:text-3xl">{title}</h2>
            )}
            {desc && (
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:mt-2">
                {desc}
              </p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
