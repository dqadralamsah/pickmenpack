# Progress Notes — Redesign Home (5 Okt 2026)

> Catatan kerja kalau laptop mati di tengah jalan. Centang = sudah selesai.
> Semua masih BELUM di-commit (branch `development`).

## Status per poin feedback

### Layout
- [ ] (1) Nav "How to pay" — DISKUSI, belum diubah. Rekomendasi: ganti jadi "How it works"
      (alur: request → harga final via WA → bayar transfer/QRIS → belanja). QRIS punya ibu
      aman dipakai asal nama merchant di QR dijelaskan di halaman bayar biar customer gak ragu.
- [x] (2) Search bar kotak saat fokus → `border-radius` di `:focus-visible` dihapus, rule fokus
      dipindah ke `@layer base`, search pakai `focus:ring-2 focus:ring-ink` (bulat)
- [x] (3) Filter chip Shop pakai utility `glass` (catalog-browser.tsx)
- [x] (4) Scrollbar tipis (globals.css: scrollbar-width thin + ::-webkit-scrollbar 6px)

### Home
- [x] (1) Image slider promo — hero.tsx, 4 slide, autoplay 6 dtk, pause/dots, field `image` per slide
- [x] (2) 4 keunggulan (WhyUs) dipindah ke sebelum FAQ, jadi kartu pastel
- [x] (3) Kategori tanpa header, grid 4 x 2, KARTU KECIL, gambar FULL menutupi kartu (object-cover).
      Mobile persegi, desktop 5:2. Desain gambar 800x320, objek/teks di tengah. Field `image` per tile
- [x] (4) CategoryShowcase (Running / Lifestyle & Court / Sandals & Slides): judul + desc + View all + banner
- [x] (5) Store run → kartu gelap + timeline berwarna; rules jadi kartu ikon. How it works → kartu pastel bernomor
- [x] (6) Ulasan: Bought / Size / Delivery, 6 data, slider 3 per tampilan (auto + manual)
- [x] (7) FAQ accordion shadcn `type="single" collapsible`
- [x] (8) Footer: Products / About (Our story, Blog, Privacy, Terms) / Help / Follow us + ketentuan singkat.
      Halaman yang belum ada ditandai "Soon" (flag `soon` di site-footer.tsx)
- [x] (9) FloatingWhatsApp (hijau `action`), WA di header mobile dihapus, © pindah ke bawah deskripsi footer

### shadcn/ui
- [x] init (radix-nova) → components.json, src/lib/utils.ts, ui/button.tsx
- [x] add carousel, accordion (+ embla-carousel-autoplay)
- [x] globals.css: token shadcn dipetakan ke palet kita; `accent` sengaja tidak ditimpa

## File baru
- src/lib/tones.ts — peta tone pastel → class
- src/components/shared/slider.tsx — carousel + autoplay + dots + pause (dipakai hero & ulasan)
- src/components/layout/site/floating-whatsapp.tsx
- src/components/ui/{button,accordion,carousel}.tsx (shadcn)

## Sisa / TODO
- [x] tsc + eslint bersih; dicek di browser desktop (1366px) + mobile (hero). Banner kategori diperpendek (lg 3:1).
- [x] Kartu kategori full-image dicek di browser (1034px) pakai gambar tes, lalu tes dihapus
- [ ] Foto: isi `image` di hero.tsx (slides), collections.tsx (tiles & showcases)
- [ ] Filter `?c=` (kategori) belum dibaca di katalog — link kategori baru sampai /katalog saja
- [ ] Halaman About/Blog/Terms belum ada
- [ ] Update design-system/pickmenpack/MASTER.md (sekarang multi-warna, bukan 1 aksen)
