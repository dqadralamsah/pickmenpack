import { card } from "@/lib/ui";

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
          tone === "accent" ? "text-accent-dark" : ""
        }`}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-xs leading-relaxed text-zinc-600">{hint}</p>}
    </div>
  );
}
