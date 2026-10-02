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
| Version | v1.1 |
| Status | Living Document — snapshot 21 Sep 2026, diperbarui 22 Sep 2026 mengikuti PRD v1.0 |
| Owner | Dicky Qadr Alamsah |
| Baseline | [PRD](PRD.md) v1.0 |
| Code Snapshot | Repo `pickmenpack`, branch `master`, commit `9ed0944` ("updata: update the ui home page for costumer") — kode belum berubah sejak snapshot ini |
| Authoring Location | Repo (`documents/IMPLEMENTATION-STATUS.md`) — salinan ini di vault dibuat dari file repo, jangan diedit di sini |
| Primary Purpose | Mencatat apa yang sudah dibangun dibanding PRD, apa yang belum, dan ketidakselarasan yang harus dibereskan sebelum go-live |

> [!info] Implementation Status — PickmenPack
> *Peta antara requirement di PRD dan kode yang sudah jalan: mana yang selesai, mana yang sebagian, mana yang belum disentuh, plus daftar gap dan checklist go-live. v1.1 memperbarui traceability dan gap mengikuti keputusan bisnis di PRD v1.0 (22 Sep 2026) — beberapa gap yang tadinya cuma "belum diputuskan" sekarang jadi "sudah diputuskan, tinggal implementasi", dan ada satu gap besar baru soal model pembayaran.*

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
| Styling / UI | Tailwind CSS, shadcn/ui | Tailwind CSS 4, komponen buatan sendiri | shadcn/ui belum dipakai |
| Data | Database untuk request/pesanan | Tidak ada database; store in-memory untuk panel admin | Lihat gap #1 dan #3 — sudah diputuskan (22 Sep 2026) untuk pakai database |
| Validasi | Zod | Validasi bawaan HTML (`required`, `pattern`) | Zod belum dipakai |
| Payment | Manual Transfer/QRIS, dikonfirmasi setelah harga fix | Halaman informasi transfer/QRIS, tapi alurnya masih berbasis DP | Lihat gap #10 (baru) — model pembayaran kode belum mengikuti PRD v1.0 |
| Deploy | VPS + Docker Compose + Caddy + Cloudflare | Belum ada Dockerfile, compose, Caddyfile, maupun `.env.example` | Lihat gap #6 |

## 1.2 Struktur Modul

```
pickmenpack/
├── src/
│   ├── app/
│   │   ├── (site)/          # halaman publik: /, /katalog, /request, /cara-bayar, /faq
│   │   └── admin/           # login + panel (dashboard, pesanan, katalog, testimoni, faq, pengaturan)
│   ├── components/layout/   # header, footer, bottom nav (mobile), section
│   ├── lib/                 # site.ts (konstanta brand/WA), format.ts (rupiah)
│   └── modules/
│       ├── admin/           # auth, actions, store in-memory, types, nav
│       ├── catalog/         # data dummy, grid, card, browser
│       ├── faq/             # data + list
│       ├── home/            # hero, slider, collections, how-it-works
│       ├── payment/         # info cara bayar + rekening
│       ├── request/         # form, kalkulator fee (fee.ts) + tes (fee.check.ts)
│       └── testimonial/     # data dummy + list
└── documents/               # snapshot dokumen (lihat documents/README.md)
```

| Module | Tanggung jawab |
|---|---|
| `request` | Form pengajuan, kalkulasi fee Opsi A, total, ongkir, dan DP. Logika fee dipisah di `fee.ts` supaya bisa dites tanpa UI. **DP di sini perlu dihapus mengikuti PRD v1.0** |
| `admin` | Login single super admin (cookie HMAC), server action, dan store in-memory untuk pesanan, katalog, testimoni, FAQ, pengaturan |
| `catalog`, `testimonial`, `faq` | Konten publik. Sekarang data dummy, dikelola dari panel admin (in-memory) |
| `payment` | Alur pembayaran dan daftar rekening/QRIS |
| `home` | Komponen landing page |

## 1.3 Navigation

| Menu Item | Location | Purpose |
|---|---|---|
| Catalog | Header (desktop) + bottom nav (mobile) | Daftar sepatu/sandal/apparel yang sedang promo |
| Request a Pair | Header (CTA) + bottom nav | Form pengajuan dengan estimasi biaya langsung |
| How to Pay | Header + bottom nav ("Pay") | Alur bayar dan rekening |
| FAQ | Header + bottom nav | Kebijakan dan pertanyaan umum |
| WhatsApp | Header (ikon, mobile) + footer | Tanya langsung ke admin |
| Dashboard, Pesanan, Katalog, Testimoni, FAQ, Pengaturan | Sidebar admin (`/admin`) | Pengelolaan konten dan pesanan |

---

# 2. PRD Traceability

Status: **Done** = sesuai PRD, **Partial** = ada tapi belum lengkap, **Not started** = belum ada, **Needs rework** = ada tapi bertentangan dengan keputusan PRD terbaru, **Beyond PRD** = ada di kode tapi belum tertulis di PRD.

| PRD Ref | Requirement | Status | Catatan |
|---|---|---|---|
| 6.1 | Landing page & katalog promo | Done | Data katalog masih dummy (`catalog/data.ts`) |
| 6.1 | Form request jastip | Partial | Ada nama, WA, item, ukuran, harga estimasi, referensi, COD/kirim, catatan. Belum ada pilihan Tipe Pengajuan (Individu vs Corporate/Bulk) |
| 6.1 | Halaman/pesan konfirmasi setelah submit | Partial | Ada layar "Step 2 of 2" berisi ringkasan dan tombol kirim WhatsApp. Belum ada status "Menunggu Konfirmasi Admin" dan estimasi waktu respons |
| 5.4, 6.1 | Kalkulasi estimasi fee (Opsi A) | Done | `fee.ts` + tes `fee.check.ts` lulus, termasuk batas tier |
| 5.5 | Model pembayaran: cek dulu, baru bayar penuh (tanpa DP) | **Needs rework** | Kode masih pakai DP 50% dari estimasi sisi atas. Ini sekarang bertentangan langsung dengan PRD v1.0 — bukan lagi soal "belum diputuskan", tapi harus diubah. Lihat gap #10 |
| 6.1 | Info cara bayar & rekening/QRIS | Partial | Halaman ada, tapi rekening dummy dan QRIS masih placeholder |
| 6.1 | FAQ & kebijakan | Partial | 10 FAQ (fee, DP, refund, kirim, stok) — FAQ soal DP perlu dihapus/diganti. Belum ada kebijakan struk dan penjelasan store run mingguan |
| 6.1 | Testimoni/portfolio | Done | Data dummy, siap diganti testimoni asli |
| 5.8, 6.1 | Komponen "Belanja Kolektif" / store run di landing | Partial | Hanya satu kartu "One store run, many orders". Belum ada penjelasan model harga per-item & jadwal mingguan |
| 5.8 | Info jadwal store run (mingguan, window 5–7 hari) | Not started | Hanya ada kalimat "refreshed after every store run", belum ada jadwal konkret |
| 6.1 | Template invoice final & penawaran Corporate | Not started | Direncanakan manual |
| 5.8 | Harga per-item sesuai diskon toko (bukan alokasi proporsional) | Not started | Belum ada konsep batch/store run di data pesanan sama sekali |
| 7.3 | Anti-spam Turnstile, Meta/TikTok Pixel, analytics, Resend, UptimeRobot | Not started | Belum ada di kode |
| 7.2 | Docker Compose + Caddy + Cloudflare | Not started | Belum ada artefak deploy |
| — | Panel admin (dashboard, pesanan, katalog, testimoni, FAQ, pengaturan) | Beyond PRD | PRD hanya menyebut "update manual oleh Admin". Panel sudah ada, tapi pesanan yang tampil adalah data seed |
| 5.6 | Kategori Sandals/Slides dan Apparel di halaman utama | Done | Resmi masuk Fase 1 di PRD v1.0 — kode sudah menampilkannya duluan, sekarang sudah sesuai PRD |
| — | Bahasa UI (Inggris) | Done | Sudah final di PRD v1.0 (Open Question lama #10 resolved) — kode sudah sesuai |
| — | Nama brand (PickmenPack) | Done | Brand digabung jadi satu nama di PRD v1.0 — kode sudah sesuai, gap #8 lama sudah resolved |

---

# 3. Gaps & Tech Debt

| # | Gap | Dampak | Saran tindakan |
|---|---|---|---|
| 1 | Request dari form tidak masuk ke panel admin: form hanya merangkai pesan lalu membuka `wa.me`. Panel `Pesanan` menampilkan 16 data seed, dan `actions.ts` hanya punya aksi update — tidak ada aksi membuat pesanan | Panel admin belum berguna untuk order nyata | **Sudah diputuskan (22 Sep 2026):** request disimpan ke database. Tambahkan aksi "buat pesanan" saat form dikirim |
| 2 | Pengaturan tersebar di tiga tempat: `lib/site.ts`, daftar rekening yang ditulis langsung di `payment-info.tsx`, dan `settings` di `admin/store.ts`. Halaman publik tidak membaca `getSettings()` | Mengubah nomor WA/rekening di admin Pengaturan tidak mengubah halaman publik | Jadikan satu sumber (settings), baca dari sana di halaman publik |
| 3 | Store admin in-memory (`collection()` di `store.ts`) | Data hilang tiap restart dan tidak sinkron antar instance | **Sudah diputuskan (22 Sep 2026):** ganti ke database begitu request/pesanan dipersistenkan |
| 4 | Nilai placeholder: nomor WA dummy, rekening dummy, QRIS placeholder, katalog & testimoni dummy, password admin default `pickmenpack` dengan secret dev | Berbahaya kalau ikut ke production | Isi lewat env (`ADMIN_PASSWORD`, `ADMIN_SECRET`) dan data asli sebelum go-live |
| 5 | Copy landing bertentangan dengan skema fee: kartu "Flat fee, never a percentage" dan hero "the fee is fixed before we buy" | Ekspektasi customer meleset | **Sudah diputuskan (22 Sep 2026):** perbaiki copy, bukan ubah skema fee. Ganti di `home/hero.tsx` |
| 6 | Belum ada artefak deploy: Dockerfile, docker-compose, Caddyfile, `.env.example`, `output: "standalone"` di `next.config.ts` | Deploy ke VPS belum bisa dilakukan | Siapkan sebelum M3 (November) |
| 7 | Definisi konversi beda: dashboard menghitung `selesai / total`, sedangkan PRD Section 8 mengukur "request → order terbayar" | KPI di dashboard tidak bisa dibandingkan dengan target ≥ 40% | Samakan definisi (mis. status "dibayar" atau lebih lanjut, tidak termasuk batal sebelum bayar) |
| 8 | ~~Nama brand di website beda dengan PRD~~ | — | **Resolved 22 Sep 2026** — brand digabung jadi PickmenPack di PRD v1.0, kode sudah sesuai |
| 9 | Belum ada test runner. Tes berupa skrip manual: `node --experimental-strip-types src/modules/request/fee.check.ts` dan `src/modules/admin/store.check.ts` (keduanya lulus per 21 Sep 2026) | Regresi gampang terlewat | Tambahkan script `test` di `package.json` yang menjalankan kedua skrip |
| 10 | **Baru.** Model pembayaran di kode (DP 50% dari estimasi sisi atas, pelunasan setelah invoice final) bertentangan langsung dengan PRD v1.0 Section 5.5 (cek dulu → bayar penuh → beli & kemas, tanpa DP) | Kalau tidak diubah, alur produksi menalangi pembelian dan menyimpan risiko selisih harga yang justru sudah sengaja dihilangkan di keputusan bisnis 22 Sep 2026 | Hapus logika DP di `request/fee.ts` dan alur konfirmasi; ganti dengan alur cek-harga → kuotasi final → pembayaran penuh. Rincian delta di [Order Journey](ORDER-JOURNEY.md) Section 3 |
| 11 | **Baru.** Nama status `dp` di `admin/types.ts` tidak lagi sesuai makna aslinya kalau model pembayaran baru diimplementasikan | Membingungkan buat maintenance jangka panjang | Pertimbangkan rename status (mis. `harga_dikonfirmasi` dan `dibayar`) saat mengerjakan gap #10 — lihat [Order Journey](ORDER-JOURNEY.md) Section 4 |

---

# 4. Go-Live Checklist

Target M4: awal Desember 2026.

- [ ] Ganti nomor WhatsApp, rekening, dan QRIS asli (dan pastikan halaman publik membaca dari satu sumber — gap #2)
- [ ] Set `ADMIN_PASSWORD` dan `ADMIN_SECRET` di environment production
- [ ] Ganti katalog dan testimoni dummy dengan data asli
- [ ] Implementasikan penyimpanan request ke database (gap #1, #3)
- [ ] **Rombak alur pembayaran: hapus DP, ganti dengan cek-harga → kuotasi final → bayar penuh (gap #10, #11)**
- [ ] Koreksi copy fee di landing (gap #5) dan tambahkan penjelasan store run mingguan + kebijakan struk di FAQ
- [ ] Siapkan Dockerfile, compose, Caddyfile; set Cloudflare proxied + SSL Full (Strict)
- [ ] Pasang Turnstile di form, Meta/TikTok Pixel, analytics, dan UptimeRobot
- [ ] Jalankan `npm run build`, `npm run lint`, dan kedua skrip `*.check.ts`

---

# 5. Revision History

| Version | Date | Changes |
|---|---|---|
| v1.0 | 21 Sep 2026 | Dokumen pertama: audit PRD (Notion v1.8 / draft v1.9) terhadap kode di commit `9ed0944`. Berisi tech stack rencana vs kode, struktur modul, navigasi, tabel traceability, 9 gap, dan checklist go-live. |
| v1.1 | 22 Sep 2026 | Diperbarui mengikuti PRD v1.0 (restrukturisasi total & keputusan bisnis 22 Sep 2026). Baseline diganti ke PRD v1.0. Traceability: baris kategori Sandals/Apparel dan Bahasa UI berubah dari "Beyond PRD" jadi "Done" (sudah diresmikan di PRD); baris nama brand jadi "Done"; baris model pembayaran DP berubah dari "Done" jadi "Needs rework" karena sekarang bertentangan dengan PRD. Gap #1, #3, #5 ditandai "sudah diputuskan, tinggal implementasi". Gap #8 (nama brand) ditandai resolved. Tambah 2 gap baru: #10 (model pembayaran kode masih pakai DP, perlu dirombak total) dan #11 (nama status `dp` perlu di-rename). Go-live checklist ditambah item rombak alur pembayaran. |
