import { STATUS, type OrderStatus } from "./types";

export const card = "rounded-2xl border border-zinc-200 bg-white";
export const field =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base outline-none transition-colors placeholder:text-zinc-400 focus:border-ink focus:ring-2 focus:ring-ink/10 sm:text-sm";
export const label = "eyebrow mb-1.5 block";
export const btn =
  "inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors disabled:opacity-50";
export const btnPrimary = `${btn} bg-ink text-paper hover:bg-zinc-700`;
export const btnGhost = `${btn} border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50`;
export const btnDanger = `${btn} border border-rose-200 bg-white text-rose-600 hover:bg-rose-50`;

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
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {desc && <p className="mt-1 text-sm text-zinc-500">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

export function StatusBadge({ status }: { status: OrderStatus }) {
  const s = STATUS[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${s.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  );
}

export function StatCard({
  eyebrow,
  value,
  hint,
  tone = "default",
}: {
  eyebrow: string;
  value: string;
  hint?: string;
  tone?: "default" | "accent";
}) {
  return (
    <div className={`${card} p-4 sm:p-5`}>
      <p className="eyebrow">{eyebrow}</p>
      <p
        className={`mt-2 text-2xl font-semibold tracking-tight ${
          tone === "accent" ? "text-accent" : ""
        }`}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500">
      {children}
    </div>
  );
}

export const tanggal = (iso: string) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
