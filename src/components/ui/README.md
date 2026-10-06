# components/ui

Khusus untuk primitive shadcn/ui hasil `npx shadcn@latest add <component>`
(style `base-luma`, dibangun di atas **Base UI** — bukan Radix: pakai prop `render`
alih-alih `asChild`, `onCheckedChange` / `onValueChange`, ToggleGroup `value` berupa array).

Jangan taruh komponen buatan tangan di sini:

| Folder | Isi |
|---|---|
| `components/ui` | Primitive shadcn apa adanya. Boleh disesuaikan gayanya (warna, tinggi, radius) — strukturnya tetap ikut shadcn |
| `components/shared` | Gabungan beberapa primitive jadi pola reusable lintas modul, mis. `OptionRow` (Checkbox/Radio + Label + angka), `Segmented` (ToggleGroup gaya segmented) |
| `modules/<modul>/components` | Komponen yang tahu domain (produk, pesanan), mis. `SizePicker`, `CatalogFilters` |

Setelah `shadcn add`/`init`, cek `src/app/globals.css`: jangan biarkan ia menambah
`--color-accent` (di proyek ini `accent` = aksen hijau brand) atau `--font-sans`, dan ganti
`bg-accent`/`text-accent-foreground` di komponen baru ke `bg-muted`/`text-foreground`.
