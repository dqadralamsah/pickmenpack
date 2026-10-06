"use client";

import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

/** Baris opsi 44px: kontrol + teks + angka opsional, seluruh baris bisa diklik
 *  (dibungkus <label>, cara Base UI menghubungkan label ke kontrol). Untuk daftar
 *  filter, pengaturan, dsb. Radio harus berada di dalam <RadioGroup>. */
function OptionRow({
  control,
  label,
  count,
  muted,
  className,
}: {
  control: React.ReactNode;
  label: React.ReactNode;
  count?: number;
  muted?: boolean;
  className?: string;
}) {
  return (
    <Label
      className={cn(
        "min-h-11 cursor-pointer gap-3 rounded-xl px-3 text-[15px] font-normal text-zinc-700 transition-colors duration-150 hover:bg-zinc-100",
        muted && "text-zinc-400",
        className,
      )}
    >
      {control}
      <span className="flex-1 leading-snug">{label}</span>
      {count !== undefined && <span className="text-sm text-zinc-400 tabular-nums">{count}</span>}
    </Label>
  );
}

const box = "size-5 border-zinc-300 bg-white";

export function CheckboxRow({
  checked,
  onCheckedChange,
  ...row
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: React.ReactNode;
  count?: number;
  muted?: boolean;
}) {
  return (
    <OptionRow
      {...row}
      control={<Checkbox checked={checked} onCheckedChange={onCheckedChange} className={cn(box, "rounded-[6px]")} />}
    />
  );
}

export function RadioRow({ value, ...row }: { value: string; label: React.ReactNode; count?: number; muted?: boolean }) {
  return <OptionRow {...row} control={<RadioGroupItem value={value} className={box} />} />;
}
