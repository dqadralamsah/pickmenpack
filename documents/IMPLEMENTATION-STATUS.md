---
project: pickmenpack
division: my-projects
type: architecture
status: draft
tags: [pickmenpack, implementation, gap-analysis]
date: 2026-09-22
---

## Document Control

| Field | Value |
|---|---|
| Project Name | PickmenPack |
| Document Type | Implementation Status & Gap Analysis |
| Version | v1.2 |
| Status | Living Document — snapshot 21 Sep 2026, diperbarui 22 Sep 2026 (PRD v1.0) dan 6 Okt 2026 (audit ulang kode terhadap PRD v1.2) |
| Owner | Dicky Qadr Alamsah |
| Baseline | [PRD](PRD.md) v1.2 · Landing Page Content (vault) v0.2 |
| Code Snapshot | Repo `pickmenpack`, branch `development`, commit `f29d642` ("feat: landing sections from content spec, category shelves, design system doc") |
| Authoring Location | Repo (`documents/IMPLEMENTATION-STATUS.md`) — salinan ini di vault dibuat dari file repo, jangan diedit di sini |
| Primary Purpose | Mencatat apa yang sudah dibangun dibanding PRD, apa yang belum, dan ketidakselarasan yang harus dibereskan sebelum go-live |

> [!info] Implementation Status — PickmenPack
> *Peta antara requirement di PRD dan kode yang sudah jalan: mana yang selesai, mana yang sebagian, mana yang belum disentuh, plus daftar gap dan checklist go-live. v1.2 mengaudit ulang kode setelah tiga commit (`936ea6b`, `a873aac`, `f29d642`): request sekarang tersimpan ke database SQLite, alur pembayaran sudah tanpa DP, jadwal store run bertanggal sudah jalan, dan landing mengikuti Landing Page Content. Sisa pekerjaan besar tinggal data asli, deploy, dan tracking.*

---

## Table of Contents

- [1. As-Built Overview](#1-as-built-overview)
- [2. PRD Traceability](#2-prd-traceability)
- [3. Gaps & Tech Debt](#3-gaps--tech-debt)
- [4. Go-Live Checklist](#4-go-live-checklist)
- [5. Revision History](#5-revision-history)

---

# 1. As-Built Overview

## 1.1 Tech Stack: Rencana vs Kode

| Category | Rencana (PRD Section 7.1) | Yang ada di kode | Catatan |
|---|---|---|---|
| Framework | Next.js (App Router), TypeScript | Next.js 16.3.0, React 19.2.8, TypeScript 5 | Sesuai. `AGENTS.md` mengingatkan Next.js versi ini punya breaking changes |
| Styling / UI | Tailwind CSS, shadcn/ui | Tailwind CSS 4 + shadcn/ui (button, accordion, carousel; style `radix-nova`) | Sesuai. Token & aturan visual di [Design System](DESIGN-SYSTEM.md) |
| Data | Database untuk request/pesanan | SQLite via `node:sqlite` bawaan Node (`data/pickmenpack.db`, path dari `DB_PATH`). Tiap koleksi disimpan sebagai JSON per baris | Cukup untuk volume solo. Butuh Node 24 (dipakai di dev: v24.16). Pindah ke Prisma/Supabase kalau butuh query/relasi |
| Validasi | Zod | Validasi manual di server action (`request/actions.ts`) + atribut HTML | Zod belum dipakai — validasi server sudah ada, jadi bukan blocker |
| Payment | Manual Transfer/QRIS, dikonfirmasi setelah harga fix | Alur cek harga → kuotasi final → bayar penuh, tanpa DP. Rekening dibaca dari Pengaturan admin | Sesuai PRD 5.5. Rekening & QRIS masih dummy (gap #4) |
| Deploy | VPS + Docker Compose + Caddy + Cloudflare | Belum ada Dockerfile, compose, Caddyfile, `.env.example`, maupun `output: "standalone"` | Lihat gap #6. File DB perlu di-mount sebagai volume |

## 1.2 Struktur Modul

```
pickmenpack/
├── data/                    # file SQLite (diabaikan git)
├── src/
│   ├── app/
│   │   ├── (site)/          # /, /katalog, /request, /cara-bayar, /faq, /privacy
│   │   └── admin/           # login + panel (dashboard, pesanan, katalog, testimoni, faq, pengaturan)
│   ├── components/
│   │   ├── layout/          # site/ (header, nav, footer, bottom nav, announcement bar, WA melayang), admin/, section.tsx
│   │   ├── shared/          # slider, page header, stat card, empty state, ikon, dsb.
│   │   └── ui/              # primitive shadcn/ui
│   ├── lib/                 # site.ts (konstanta brand/WA), format, ui.ts (class recipe), tones.ts
│   └── modules/
│       ├── admin/           # auth, actions, store SQLite, types (status order), status badge
│       ├── catalog/         # data dummy, grid, card, browser (filter brand & pencarian)
│       ├── faq/             # data + accordion
│       ├── home/            # content.ts + hero, collections, why, how-it-works, pricing
│       ├── payment/         # alur bayar + rekening (dari Pengaturan)
│       ├── request/         # form, server action, fee.ts, store-run.ts + fee.check.ts
│       └── testimonial/     # data dummy + slider
└── documents/               # snapshot dokumen (lihat documents/README.md)
```

| Module | Tanggung jawab |
|---|---|
| `request` | Form pengajuan, server action yang menyimpan request ke DB (status `baru`), kalkulasi fee Opsi A (`fee.ts`), dan jadwal store run mingguan (`store-run.ts`, semua jam WIB). Tes di `fee.check.ts` |
| `admin` | Login single super admin (cookie HMAC), server action CRUD, store SQLite untuk pesanan/katalog/testimoni/FAQ/pengaturan, KPI dashboard. Tes di `store.check.ts` |
| `home` | Copy landing di `content.ts` (ditarik dari Landing Page Content), komponen section membaca `content.ts` + `nextStoreRun()` |
| `catalog`, `testimonial`, `faq` | Konten publik. Data awal = seed dummy, dikelola dari panel admin |
| `payment` | Alur pembayaran, kebijakan batal/stok habis, rekening dari `getSettings()` |

## 1.3 Navigation

| Menu Item | Location | Purpose |
|---|---|---|
| Shop (katalog) | Header (desktop) + bottom nav (mobile) | Daftar sepatu/sandal/apparel yang sedang promo |
| Request a Pair | Header (CTA) + bottom nav | Form pengajuan dengan estimasi biaya langsung |
| How to Pay | Header + bottom nav | Alur bayar dan rekening. Ada usulan ganti jadi "How it works" (PROGRESS-NOTES) |
| FAQ | Header + bottom nav | Kebijakan dan pertanyaan umum |
| WhatsApp | Tombol melayang (semua halaman) + footer | Tanya langsung ke admin |
| Privacy | Footer + checkbox di form | Kebijakan privasi (UU PDP) |
| Dashboard, Pesanan, Katalog, Testimoni, FAQ, Pengaturan | Sidebar admin (`/admin`) | Pengelolaan konten dan pesanan |

---

# 2. PRD Traceability

Status: **Done** = sesuai PRD, **Partial** = ada tapi belum lengkap, **Not started** = belum ada, **Beyond PRD** = ada di kode tapi belum tertulis di PRD.

| PRD Ref | Requirement | Status | Catatan |
|---|---|---|---|
| 6.1 | Landing page & katalog promo | Done | Tiga section Why / How it works / Pricing dari `home/content.ts`, copy dan urutan section sama dengan Landing Page Content v0.2. Data katalog masih dummy |
| 6.1 | Shop: filter & halaman detail produk | Done | Filter Category/Gender/Price/Brand/Availability + Sort di URL; detail `/katalog/[slug]` dengan galeri per warna (colorway), pilihan ukuran, CTA request (membawa warna & ukuran) dan WhatsApp. Foto asli belum ada — placeholder siluet diwarnai sesuai colorway. Sumber data belum dari admin (gap #21) |
| 6.1 | Form request jastip + checkbox Kebijakan Privasi | Done | Nama, WA, kota, item, ukuran, panjang kaki (opsional), perkiraan harga, referensi, COD/kirim, catatan, consent. Honeypot anti-bot |
| 6.1 | Request tersimpan ke database | Done | `submitRequestAction` → `createOrder` (status `baru`, ikut store run berdasarkan cutoff) |
| 6.1 | Halaman/pesan konfirmasi setelah submit | Done | Layar "Waiting for admin confirmation" + nomor request + jadwal cutoff/cek harga/bayar/belanja |
| 5.4, 6.1 | Kalkulasi estimasi fee (Opsi A) | Done | `fee.ts` + tes `fee.check.ts` lulus |
| 5.5 | Model pembayaran: cek dulu, baru bayar penuh (tanpa DP) | Done | Status order `baru → dikonfirmasi → dibayar → dibeli → dikirim → selesai / batal`. Halaman cara bayar, FAQ, form, panel admin sudah tanpa DP |
| 5.8 | Info jadwal store run (cutoff Kamis, cek Jumat, bayar & belanja Sabtu, kirim Minggu/Senin) | Done | `nextStoreRun()` + tes, dipakai di landing, form, dan konfirmasi. Banner buka/tutup sesuai Landing Page Content 4.1 |
| 5.8 | Harga per-item sesuai diskon toko | Partial | Dijelaskan di section Pricing & FAQ. Order menyimpan `storeRun` dan `netFinal`, belum ada tampilan pengelompokan per store run di admin |
| 6.1 | Info cara bayar & rekening/QRIS | Partial | Halaman lengkap dan rekening dibaca dari Pengaturan, tapi nilai rekening & QRIS masih dummy. Jadwal ditulis per hari, belum bertanggal (gap #20) |
| 6.1 | FAQ & kebijakan | Done | 11 FAQ: harga rentang, fee, store run, batal, stok habis, retur, struk, kirim luar kota. Isi tetap perlu dicek ulang sebelum go-live |
| 6.1 | Testimoni/portfolio | Done | Slider ulasan, data dummy, siap diganti testimoni asli |
| 5.4, 5.5 | Harga final ke customer berupa satu angka | Partial | Admin mengisi harga net pasti, tapi pesan WA "harga final" masih menampilkan rentang fee & ongkir (gap #18) |
| 6.1 | Template invoice final | Not started | Direncanakan manual via WhatsApp |
| 7.3 | Anti-spam Turnstile | Partial | Baru honeypot di form. Turnstile kalau spam lolos |
| 7.3 | Meta/TikTok Pixel, analytics, Resend, UptimeRobot | Not started | Belum ada di kode |
| 7.2 | Docker Compose + Caddy + Cloudflare | Not started | Belum ada artefak deploy |
| 8 | KPI konversi request → order terbayar | Done | `isPaid()` menghitung status `dibayar` atau lebih lanjut |
| BO 7.3 | Halaman Kebijakan Privasi | Done | `/privacy`, ringkasan sesuai Business Operations 7.3 |
| — | Panel admin (dashboard, pesanan, katalog, testimoni, FAQ, pengaturan) | Beyond PRD | PRD hanya menyebut "update manual oleh Admin". Panel sudah tersambung ke DB; pesanan berisi 16 data seed + request asli |
| 5.6 | Kategori Sneakers, Sandals/Slides, Apparel | Done | Grid kategori + showcase per kategori di home |
| — | Bahasa UI (Inggris) & brand PickmenPack | Done | Sesuai PRD v1.0 |

---

# 3. Gaps & Tech Debt

| # | Gap | Dampak | Saran tindakan |
|---|---|---|---|
| 1 | ~~Request dari form tidak masuk ke panel admin~~ | — | **Resolved (`936ea6b`)** — request disimpan ke DB lewat `submitRequestAction` |
| 2 | Pengaturan baru sebagian satu sumber: halaman cara bayar dan request membaca `getSettings()`, tapi header, footer, tombol WA melayang, announcement bar, privacy, dan metadata masih membaca `lib/site.ts` | Mengubah nomor WA di admin Pengaturan tidak mengubah semua tombol WA di halaman publik | Baca `getSettings()` juga di komponen layout, atau jadikan `lib/site.ts` hanya seed |
| 3 | ~~Store admin in-memory~~ | — | **Resolved (`936ea6b`)** — SQLite `node:sqlite` |
| 4 | Nilai placeholder: nomor WA dummy (`lib/site.ts`), rekening dummy, QRIS placeholder, katalog & testimoni dummy, 16 pesanan seed, password admin default `pickmenpack` dengan secret dev | Berbahaya kalau ikut ke production | Isi lewat env (`ADMIN_PASSWORD`, `ADMIN_SECRET`) dan data asli; DB production mulai tanpa seed pesanan |
| 5 | ~~Copy landing "Flat fee, never a percentage"~~ | — | **Resolved** — copy fee mengikuti Landing Page Content ("from Rp25k per item") |
| 6 | Belum ada artefak deploy: Dockerfile, docker-compose, Caddyfile, `.env.example`, `output: "standalone"` di `next.config.ts` | Deploy ke VPS belum bisa dilakukan | Siapkan sebelum M3 (November). Mount `data/` sebagai volume, base image Node 24 |
| 7 | ~~Definisi konversi beda~~ | — | **Resolved** — `isPaid()` di `admin/types.ts` |
| 8 | ~~Nama brand di website beda dengan PRD~~ | — | **Resolved 22 Sep 2026** |
| 9 | ~~Belum ada test runner~~ | — | **Resolved** — `npm test` menjalankan `fee.check.ts` dan `store.check.ts` |
| 10 | ~~Model pembayaran di kode masih DP~~ | — | **Resolved (`936ea6b`)** — alur tanpa DP sesuai PRD 5.5 |
| 11 | ~~Nama status `dp`~~ | — | **Resolved** — status diganti `dikonfirmasi` dan `dibayar` |
| 12 | ~~"Zero deposit" di hero & announcement bar melanggar "satu fakta, satu rumah"~~ | — | **Resolved 6 Okt 2026** — Landing Page Content v0.2 menambah pengecualian untuk permukaan promo (hero & announcement bar) |
| 13 | ~~Urutan section landing beda dengan spec~~ | — | **Resolved 6 Okt 2026** — Landing Page Content v0.2 Section 2 mengikuti urutan `page.tsx` |
| 14 | ~~Lokasi & nama `store-run.ts` beda dengan spec~~ | — | **Resolved 6 Okt 2026** — Landing Page Content v0.2 Section 6.1 mengikuti kode (`request/store-run.ts`, `nextStoreRun()`) |
| 15 | ~~Link kategori ke `/katalog?c=...` belum dibaca halaman katalog~~ | — | **Resolved 6 Okt 2026** — Shop punya filter Category, Gender, Price, Brand, Availability + Sort, semuanya di URL (`catalog/filter.ts`, tes `filter.check.ts`); tile home diarahkan ke parameter baru |
| 16 | **Baru.** Halaman footer About, Blog, Terms belum ada (ditandai "Soon") | Link mati di footer | Buat halaman atau sembunyikan sampai siap |
| 17 | **Baru.** Foto asli hero slider, kartu kategori, dan banner showcase belum diisi (field `image` kosong) | Landing tampil dengan placeholder | Isi `image` di `hero.tsx` dan `collections.tsx` |
| 18 | **Baru.** Pesan WA "Kirim harga final" di `/admin/pesanan` memakai `orderMoney()` yang masih mengembalikan rentang (fee min–max dari `estimateFee`, ongkir Rp30–55rb) walau harga net sudah pasti | Bertentangan dengan PRD 5.5 (customer menerima angka final, bukan rentang) — admin harus menghitung manual | Tambah input fee & ongkir pasti per order (atau pakai batas bawah/atas tetap), lalu kirim satu angka total |
| 19 | **Baru.** `allocateGroupDiscount()` di `request/fee.ts` sudah tidak punya pemakai sejak `group-buy.tsx` dihapus (`f29d642`) | Dead code yang bertentangan dengan PRD 5.8 (harga per-item, bukan proporsional) | Hapus fungsinya (tidak ada tes yang memakai) |
| 20 | **Baru.** Halaman Cara Bayar menulis jadwal per hari ("Friday", "by Saturday 09.00 WIB") tanpa tanggal, belum memakai `nextStoreRun()` | Belum memenuhi prinsip "Tanggal selalu asli" (Landing Page Content Section 1) — jadwalnya tetap benar | Opsional: tampilkan tanggal run berikutnya di `payment-info.tsx` |
| 21 | **Baru.** Halaman publik (Shop, detail produk, home) membaca katalog dari `catalog/data.ts`, bukan dari DB yang diedit di admin Katalog. Form admin juga belum punya field kategori, gender, dan warna/foto — dan `saveProductAction` menimpa seluruh baris, jadi field yang tidak ada di form (kategori, foto) hilang saat produk diedit | Produk yang ditambah/diubah admin tidak muncul di website; foto per warna baru bisa diisi lewat kode | Satukan sumber: halaman publik baca `productDb`, form admin tambah kategori/gender/warna (nama, hex, daftar URL foto), dan simpan dengan merge ke baris lama |

---

# 4. Go-Live Checklist

Target M4: awal Desember 2026.

- [ ] Ganti nomor WhatsApp, rekening, dan QRIS asli — pastikan semua halaman publik membaca dari Pengaturan (gap #2, #4)
- [ ] Set `ADMIN_PASSWORD` dan `ADMIN_SECRET` di environment production
- [ ] Ganti katalog, testimoni, dan foto landing dengan data asli; DB production tanpa pesanan seed (gap #4, #17)
- [x] Penyimpanan request ke database (gap #1, #3)
- [x] Rombak alur pembayaran tanpa DP (gap #10, #11)
- [x] Koreksi copy fee di landing + penjelasan store run mingguan & kebijakan struk di FAQ (gap #5)
- [ ] Kirim harga final sebagai satu angka, bukan rentang (gap #18)
- [ ] Siapkan Dockerfile, compose (volume `data/`), Caddyfile; set Cloudflare proxied + SSL Full (Strict) (gap #6)
- [ ] Pasang Turnstile kalau spam lolos honeypot, Meta/TikTok Pixel, analytics, dan UptimeRobot
- [ ] Jalankan `npm run build`, `npm run lint`, dan `npm test`

---

# 5. Revision History

| Version | Date | Changes |
|---|---|---|
| v1.0 | 21 Sep 2026 | Dokumen pertama: audit PRD (Notion v1.8 / draft v1.9) terhadap kode di commit `9ed0944`. Berisi tech stack rencana vs kode, struktur modul, navigasi, tabel traceability, 9 gap, dan checklist go-live. |
| v1.1 | 22 Sep 2026 | Diperbarui mengikuti PRD v1.0 (restrukturisasi total & keputusan bisnis 22 Sep 2026). Baseline diganti ke PRD v1.0. Traceability: baris kategori Sandals/Apparel dan Bahasa UI berubah dari "Beyond PRD" jadi "Done" (sudah diresmikan di PRD); baris nama brand jadi "Done"; baris model pembayaran DP berubah dari "Done" jadi "Needs rework" karena sekarang bertentangan dengan PRD. Gap #1, #3, #5 ditandai "sudah diputuskan, tinggal implementasi". Gap #8 (nama brand) ditandai resolved. Tambah 2 gap baru: #10 (model pembayaran kode masih pakai DP, perlu dirombak total) dan #11 (nama status `dp` perlu di-rename). Go-live checklist ditambah item rombak alur pembayaran. |
| v1.2 | 6 Okt 2026 | Audit ulang terhadap commit `f29d642` (branch `development`) dan baseline PRD v1.2 + Landing Page Content v0.1. Tech stack: shadcn/ui dan database SQLite sudah dipakai. Traceability: form request, penyimpanan DB, halaman konfirmasi, model pembayaran tanpa DP, jadwal store run, KPI konversi, FAQ, dan halaman Privacy jadi "Done"; baris Tipe Pengajuan Corporate/Bulk dihapus (dicabut di PRD v1.1). Gap #1, #3, #5, #7, #9, #10, #11 resolved; gap #2 sebagian. Tambah gap #12–#17 (guardrail "Zero deposit", urutan section landing, lokasi `store-run.ts`, filter kategori katalog, halaman footer "Soon", foto landing); #12–#14 langsung resolved hari yang sama karena Landing Page Content v0.2 disesuaikan dengan kode. Tambah gap #18 (harga final masih rentang), #19 (dead code `allocateGroupDiscount`), #20 (Cara Bayar belum bertanggal). Checklist go-live diperbarui. |
