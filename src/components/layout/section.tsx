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
    <section className={`mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-6 sm:py-16 ${className}`}>
      {(title || action) && (
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-8">
          <div>
            {title && (
              <h2 className="text-2xl font-semibold sm:text-[34px]">{title}</h2>
            )}
            {desc && (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
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
