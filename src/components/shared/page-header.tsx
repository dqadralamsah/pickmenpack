export function PageHeader({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {desc && (
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-600">
            {desc}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
