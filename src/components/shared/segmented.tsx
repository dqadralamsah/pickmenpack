"use client";

import { cn } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

/** Segmented control (pilih satu dari 2–4): EU/US/UK, Men/Women, dsb.
 *  ToggleGroup Base UI → keyboard panah & aria-pressed sudah gratis. */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
  className,
}: {
  value: T;
  onChange: (value: T) => void;
  options: readonly { value: T; label: React.ReactNode }[];
  /** Nama grup untuk screen reader. */
  label: string;
  className?: string;
}) {
  return (
    <ToggleGroup
      aria-label={label}
      value={[value]}
      // Klik opsi yang sudah aktif mengirim [] — abaikan supaya selalu ada satu pilihan.
      onValueChange={(v) => v[0] && onChange(v[0] as T)}
      spacing={0.5}
      className={cn("rounded-full bg-zinc-100 p-1", className)}
    >
      {options.map((o) => (
        <ToggleGroupItem
          key={o.value}
          value={o.value}
          className="h-8 min-w-11 rounded-full px-3 text-[13px] font-semibold text-zinc-600 hover:bg-transparent hover:text-ink aria-pressed:bg-paper aria-pressed:text-ink aria-pressed:shadow-sm"
        >
          {o.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
