"use client";

import { useState } from "react";
import { Ruler } from "lucide-react";
import { Segmented } from "@/components/shared/segmented";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Gender } from "../data";
import {
  CHART_LABEL,
  chartFor,
  SIZE_CHARTS,
  SIZE_SYSTEMS,
  sizeLabel,
  sizeSummary,
  type SizeChart,
  type SizeSystem,
} from "../sizes";

/** Pilih ukuran: nilai yang disimpan selalu EU (Product.sizes), tampilan bisa
 *  EU/US/UK. Produk unisex bisa dibaca pakai tabel Men's atau Women's. */
export function SizePicker({
  sizes,
  gender = "unisex",
  value,
  onChange,
  disabled,
}: {
  sizes: string[];
  gender?: Gender;
  value: string;
  onChange: (eu: string) => void;
  disabled?: boolean;
}) {
  const [system, setSystem] = useState<SizeSystem>("EU");
  const [chart, setChart] = useState<SizeChart>(chartFor(gender));

  return (
    <fieldset disabled={disabled} className="disabled:opacity-50">
      <legend className="sr-only">Size</legend>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span aria-hidden className="text-sm font-semibold">
          Size
        </span>
        <SizeGuide sizes={sizes} chart={chart} />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Segmented
          label="Size system"
          value={system}
          onChange={setSystem}
          options={SIZE_SYSTEMS.map((s) => ({ value: s, label: s }))}
        />
        {gender === "unisex" ? (
          <Segmented
            label="Size chart"
            value={chart}
            onChange={setChart}
            options={(["men", "women"] as const).map((c) => ({ value: c, label: CHART_LABEL[c] }))}
          />
        ) : (
          <span className="text-sm text-zinc-500">{CHART_LABEL[chart]} sizing</span>
        )}
      </div>

      <ToggleGroup
        aria-label={`Size, ${system}`}
        value={value ? [value] : []}
        onValueChange={(v) => onChange(v[0] ?? "")}
        spacing={2}
        className="mt-4 grid w-full grid-cols-4 sm:grid-cols-5"
      >
        {sizes.map((eu) => (
          <ToggleGroupItem
            key={eu}
            value={eu}
            aria-label={sizeSummary(eu, chart)}
            className="h-12 w-full rounded-xl border border-zinc-200 bg-white text-[15px] font-semibold tabular-nums hover:border-ink hover:bg-white aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper"
          >
            {sizeLabel(eu, system, chart)}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <p className="mt-3 min-h-5 text-sm" aria-live="polite">
        {value ? (
          <span className="font-medium">{sizeSummary(value, chart)}</span>
        ) : (
          <span className="text-zinc-500">Optional — you can also pick your size later.</span>
        )}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500">
        Wrong-size items can&rsquo;t be returned. Not sure? Check the size guide or add your foot length in the request.
      </p>
    </fieldset>
  );
}

/** Tabel lengkap EU/US/UK/cm per gender + cara ukur kaki. Baris yang tersedia di
 *  produk ini ditandai, supaya customer langsung tahu ukurannya ada atau tidak. */
function SizeGuide({ sizes, chart }: { sizes: string[]; chart: SizeChart }) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" className="-mr-2 h-10 gap-1.5 rounded-full px-3 font-semibold underline underline-offset-4 hover:bg-zinc-100" />
        }
      >
        <Ruler aria-hidden />
        Size guide
      </SheetTrigger>
      <SheetContent side="right" className="w-full bg-paper sm:max-w-md">
        <SheetHeader className="border-b border-zinc-200 px-6 py-5">
          <SheetTitle className="text-lg font-bold">Size guide</SheetTitle>
          <SheetDescription>
            General chart. Brands can differ by half a size — we send the brand&rsquo;s official chart with your final
            price.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <Tabs defaultValue={chart}>
            <TabsList className="h-11 w-full bg-zinc-100">
              {(Object.keys(SIZE_CHARTS) as SizeChart[]).map((c) => (
                <TabsTrigger key={c} value={c} className="h-9 flex-1 rounded-full font-semibold data-active:bg-paper data-active:text-ink">
                  {CHART_LABEL[c]}
                </TabsTrigger>
              ))}
            </TabsList>
            {(Object.keys(SIZE_CHARTS) as SizeChart[]).map((c) => (
              <TabsContent key={c} value={c} className="mt-4">
                <table className="w-full text-sm tabular-nums">
                  <caption className="sr-only">{CHART_LABEL[c]} shoe sizes</caption>
                  <thead>
                    <tr className="border-b border-zinc-200 text-left text-zinc-500">
                      {["EU", "US", "UK", "Foot (cm)"].map((h) => (
                        <th key={h} scope="col" className="py-2.5 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_CHARTS[c].map((r) => {
                      const here = sizes.includes(r.eu);
                      return (
                        <tr key={r.eu} className={`border-b border-zinc-100 ${here ? "bg-zinc-50 font-semibold" : "text-zinc-600"}`}>
                          <th scope="row" className="py-2.5 text-left font-[inherit]">
                            {r.eu}
                            {here && <span className="sr-only"> (available)</span>}
                            {here && <span aria-hidden className="ml-1.5 inline-block size-1.5 rounded-full bg-emerald-500 align-middle" />}
                          </th>
                          <td>{r.us}</td>
                          <td>{r.uk}</td>
                          <td>{r.cm}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </TabsContent>
            ))}
          </Tabs>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
            <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" /> Available for this pair
          </p>

          <h3 className="mt-8 font-sans text-[15px] font-semibold tracking-normal">How to measure your foot</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-zinc-600">
            <li>Stand on a sheet of paper with your heel against a wall.</li>
            <li>Mark the tip of your longest toe, then measure from the wall to the mark.</li>
            <li>Measure both feet and use the longer one. Between two sizes? Go half a size up.</li>
          </ol>
        </div>
      </SheetContent>
    </Sheet>
  );
}
