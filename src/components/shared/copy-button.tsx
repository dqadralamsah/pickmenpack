"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/** Tombol salin teks (nomor rekening, ID pesanan, dsb.) dengan umpan balik "Copied". */
export function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [done, setDone] = useState(false);

  return (
    <Button
      variant="outline"
      onClick={() =>
        navigator.clipboard.writeText(value).then(() => {
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        })
      }
      aria-label={done ? `${label} copied` : `Copy ${label}`}
      className={cn("h-10 gap-1.5 rounded-full border-zinc-200 px-3.5 font-semibold", className)}
    >
      {done ? <Check aria-hidden className="text-action" /> : <Copy aria-hidden />}
      <span aria-live="polite">{done ? "Copied" : "Copy"}</span>
    </Button>
  );
}
