---
project: pickmenpack
division: my-projects
type: prd
status: draft
tags: [pickmenpack, jastip, prd]
date: 2026-09-22
---

## Document Control

| Field | Value |
|---|---|
| Project Name | PickmenPack |
| Brand Name | PickmenPack — satu nama untuk platform & yang tampil ke customer (nama ganda "Soletip" resmi digabung jadi satu di v1.0) |
| Document Type | Product Requirements Document (PRD) |
| Version | v1.2 |
| Status | Draft — v1.0 restrukturisasi total (22 Sep 2026), v1.1 menuangkan keputusan operasional 2 Okt 2026, v1.2 merujuk copy landing ke dokumen 03 (5 Okt 2026). v1.1 dipublish ke Notion 2 Okt 2026, v1.2 pada 9 Okt 2026 |
| Owner | Dicky Qadr Alamsah |
| Stakeholders | Dicky Qadr Alamsah (Owner & Operator solo — tidak ada reviewer/approver lain di Fase 1) |
| Target Release (MVP) | Awal Desember 2026 (sebelum puncak promo Natal & Tahun Baru) |
| Related Portfolio Project | Goposystem (KonserPO) — project terpisah, dicatat sebagai konteks kapasitas waktu solo di bulan Desember 2026 |
| Related Document | Business & Market Research (vault) v1.0 — riset kompetitor, persona, simulasi fee, dan strategi marketing. Operasional harian, kebijakan refund/retur & legal: [Business Operations](BUSINESS-OPERATIONS.md). Biaya: Unit Economics (vault). Status pengerjaan kode: [Implementation Status](IMPLEMENTATION-STATUS.md) |
| Source of Truth | Notion — [PRD v1.1](https://app.notion.com/p/3bb5b010daef81ce9dc7d76446453019) |
| Primary Purpose | Acuan bisnis dan pengembangan produk untuk jastip sepatu PickmenPack |

> [!info] Product Requirements Document (PRD) — PickmenPack
> *Versi v1.0 ini adalah restrukturisasi total dari v1.9: mengikuti format dokumentasi terbaru (Background, Goals & Non-Goals, Persona, User Stories, Non-Functional Requirements, tanpa Timeline terpisah) sekaligus menuangkan semua keputusan bisnis yang diambil di sesi 22 September 2026 — termasuk perubahan besar di model pembayaran (lihat Section 5.5).*

---

## Table of Contents

- [1. Background](#1-background)
- [2. Goals & Non-Goals](#2-goals--non-goals)
- [3. Target Users & Personas](#3-target-users--personas)
- [4. User Stories](#4-user-stories)
- [5. Business Model & Rules](#5-business-model--rules)
- [6. Functional Requirements](#6-functional-requirements)
- [7. Non-Functional Requirements](#7-non-functional-requirements)
- [8. Success Metrics](#8-success-metrics)
- [9. Risks & Dependencies](#9-risks--dependencies)
- [10. Open Questions](#10-open-questions)
- [11. Revision History](#11-revision-history)

---

# 1. Background

Ini bisnis pribadi pertama yang mau dijalankan Dicky: jastip (jasa titip beli) sepatu, dengan nama tunggal **PickmenPack**. Idenya berangkat dari momentum musim promo Desember — Harbolnas 12.12, *End of Season Sale* (EOSS), dan periode Natal & Tahun Baru — ditambah keuntungan lokasi, karena ada Mall JPO di dekat Dicky yang harga sepatunya cukup miring dibanding tempat lain.

Selama ini jastip pada umumnya dijalankan manual lewat chat WhatsApp: request masuk campur aduk dengan chat lain, estimasi biaya dihitung manual satu-satu, dan riwayat pesanan gampang tercecer kalau volume chat lagi ramai (apalagi pas musim promo begini). Karena Dicky juga terbiasa bikin web app untuk project-project sebelumnya, project ini sekaligus jadi kesempatan buat bikin platform sendiri yang lebih rapi dari WhatsApp manual.

## 1.1 Peluang & Momentum

- **Musim promo Desember** — kombinasi Harbolnas 12.12, EOSS, dan belanja Natal/Tahun Baru bikin traffic pencarian sepatu diskon naik signifikan di periode ini.
- **Keunggulan lokasi** — akses langsung ke Mall JPO yang harganya cukup miring jadi nilai jual utama dibanding jastiper lain yang gak punya akses serupa.
- **Barang "kelihatan langsung"** — karena belanja fisik di mall (bukan titip dari e-commerce), Dicky bisa cek kondisi barang, ukuran, dan keaslian sebelum diteruskan ke customer.
- **Store run mingguan** — pesanan dikumpulkan dalam satu window per minggu lalu dibelanjakan sekaligus, jadi lebih efisien dari sisi waktu dan berpeluang tembus promo minimum-belanja toko (Section 5.8).

---

# 2. Goals & Non-Goals

## 2.1 Goals

1. Memvalidasi model bisnis jastip sepatu solo dengan effort development minim, siap sebelum musim promo Desember 2026.
2. Memberi calon customer cara request yang lebih rapi & transparan dibanding chat WhatsApp manual, dengan histori yang tersimpan (bukan cuma pesan WA yang gampang hilang).
3. Menjalankan model pembayaran tanpa risiko talangan: harga dikonfirmasi dulu, customer bayar penuh, baru barang dibeli.
4. Menentukan skema fee yang jelas dan konsisten sejak awal, supaya gak dadakan mikir margin tiap ada order.
5. Membangun pondasi produk yang bisa berkembang jadi e-commerce penuh kalau model bisnisnya terbukti jalan.

## 2.2 Non-Goals (Fase 1)

- **Bukan** platform dengan cart & checkout otomatis — closing tetap lewat WhatsApp.
- **Bukan** payment gateway otomatis (Midtrans/Xendit) — pembayaran tetap transfer manual.
- **Bukan** model DP/talangan — PickmenPack sengaja tidak lagi menalangi pembelian barang sebelum customer bayar (lihat Section 5.5). Ini keputusan sadar, bukan gap yang belum dikerjakan.
- **Bukan** platform multi-jastiper — operasional Fase 1 solo oleh Dicky (Section 5.1).
- **Bukan** order tracking otomatis real-time atau akun customer dengan riwayat login.
- **Bukan** ekspansi kategori di luar sepatu/sandal-slides/apparel yang sudah masuk Fase 1 (Section 5.6) — kategori benar-benar baru tetap ranah Fase 2.

---

# 3. Target Users & Personas

| Persona | Profil | Kebutuhan Utama |
|---|---|---|
| Sneakerhead/Kolektor | Anak muda 18–30 tahun, aktif di komunitas sneakers, paham model & harga pasar | Kepastian keaslian, harga bersaing dibanding marketplace resale, respon cepat saat rilisan/promo |
| Budget Shopper | Mahasiswa/pekerja muda yang cari sepatu/sandal/apparel bagus dengan harga miring pas musim diskon | Transparansi harga & fee, gak ribet, proses jelas dari awal sampai barang sampai |
| Luar Kota / Sibuk | Calon pembeli di luar Jakarta-Tangerang atau yang gak sempat ke mall | Bisa titip dari jauh, opsi kirim paket terpercaya, dokumentasi barang sebelum dikirim |
| Pembeli Banyak | Teman, komunitas, atau reseller kecil yang titip beberapa pasang sekaligus | Proses sama seperti customer biasa — bayar penuh dulu, tanpa tempo atau invoice resmi (PickmenPack jasa jastip, bukan B2B) |

Riset kompetitor dan detail per-persona ada di Business & Market Research (vault) Section 3–4.

---

# 4. User Stories

| # | Sebagai | Saya ingin | Supaya |
|---|---|---|---|
| 1 | Customer | Mengajukan request lewat form terstruktur | Ada histori jelas, bukan cuma chat WA yang gampang tercecer |
| 2 | Customer | Melihat estimasi fee otomatis sebelum submit | Tahu kira-kira biayanya dari awal |
| 3 | Customer | Membayar penuh setelah harga fix dikonfirmasi admin | Tidak perlu mikirin DP dan pelunasan susulan |
| 4 | Customer | Melihat rentang harga di katalog lalu mendapat harga pasti sebelum transfer | Tahu kisaran biaya dari awal dan tidak kena tagihan susulan |
| 5 | Admin (Dicky) | Melihat semua request masuk di satu tempat (panel admin, bukan campur di WA) | Tidak ada request yang lupa direspons saat volume lagi ramai |
| 6 | Admin | Mengecek ketersediaan & harga barang di JPO sebelum minta customer bayar | Tidak ada kejutan harga buat customer maupun risiko modal nyangkut buat admin |
| 7 | Admin | Tahu jadwal store run berikutnya | Bisa kasih ekspektasi waktu yang jelas ke customer |
| 8 | Customer | Tahu jadwal store run mingguan di website | Bisa memperkirakan kapan barangnya akan diproses |

---

# 5. Business Model & Rules

## 5.1 Bentuk Bisnis

> [!note] Solo jastiper
> *Fase 1 dijalankan sebagai solo jastiper — Dicky sendiri yang megang mulai dari terima request, cek & beli barang di JPO, sampai kirim/COD ke customer. Ini keputusan final (dikonfirmasi 22 Sep 2026), bukan lagi asumsi terbuka. Belum dibuka jadi platform multi-jastiper; opsi ini bisa dipertimbangkan lagi kalau demand-nya sudah terbukti besar di musim-musim berikutnya.*

## 5.2 Target Pasar & Jangkauan

| Segmen | Metode | Catatan |
|---|---|---|
| Tangerang & Jakarta (lokal) | COD / ketemuan langsung | Gak ada ongkir, cocok buat validasi awal & bangun trust lewat ketemu langsung. Radius pasti "lokal" masih perlu ditentukan — Open Question #1 |
| Luar kota (nasional) | Kirim paket via ekspedisi — **J&T Express** jadi default utama (plafon ganti rugi asuransi hingga Rp20 juta, paling cocok untuk sepatu &gt; Rp1 juta), dengan **TIKI** sebagai alternatif kedua (plafon Rp2,5 juta) | Ongkir + packing tambahan ditanggung customer; barang wajib difoto/video sebelum dikirim sebagai bukti kondisi & syarat klaim asuransi. Detail perbandingan ekspedisi: Business & Market Research (vault) Section 5.6 |

## 5.3 Sumber Barang — Mall JPO

Semua barang dibeli langsung di gerai resmi/counter di Mall JPO, bukan reseller atau marketplace pihak ketiga — ini jadi salah satu nilai jual utama (barang bisa dicek fisiknya langsung sebelum dibeli). Kebijakan: jastiper hanya membeli dari counter/toko resmi di JPO untuk menjaga keaslian barang.

## 5.4 Skema Fee

| Opsi | Skema | Kelebihan | Kekurangan |
|---|---|---|---|
| A — Fee Tetap Bertingkat (dipakai) | &lt; Rp500rb: Rp25rb–35rb • Rp500rb–1jt: Rp40rb–60rb • &gt; Rp1jt: Rp75rb atau 5–7% (mana yang lebih besar) | Margin tetap terjaga meski harga barang lagi didiskon besar; gampang dikomunikasikan ke customer sejak awal | Perlu update tabel kalau ada perubahan rentang harga |
| B — Persentase Flat (tidak dipakai) | 8–10% dari harga barang, minimum Rp25rb | Simpel, satu angka buat semua harga | Fee ikut turun kalau barang lagi diskon besar — padahal effort jastiper sama saja, kurang cocok buat musim promo |

> [!note] Batas tier
> Harga net tepat Rp500.000 dan tepat Rp1.000.000 masuk tier tengah (Rp40rb–60rb). Fee "Rp75rb atau 5–7%, mana yang lebih besar" baru berlaku untuk harga di atas Rp1.000.000. Aturan batas ini yang dipakai kalkulator estimasi di web.

> [!note] Aturan penting: fee dihitung dari harga NET final
> *Fee selalu dihitung dari harga NET final yang sudah dikonfirmasi (bukan dari harga awal sebelum diskon) — karena diskon di toko sering berlapis dan "hingga X%" bukan angka pasti. Karena di model v1.0 harga dikonfirmasi dulu sebelum customer bayar (Section 5.5), fee yang ditagihkan ke customer sudah pasti sejak awal, bukan lagi estimasi yang bisa berubah di invoice final. Simulasi lengkap ada di Business & Market Research (vault) Section 5.2 dan 5.5.*

> [!note] Copy fee di landing
> Copy lama "Flat fee, never a percentage" sudah diganti (resolved, [Implementation Status](IMPLEMENTATION-STATUS.md) gap #5). Landing sekarang menulis "Service fee from Rp25k per item", tanpa menyebut flat/persentase — aturannya ada di Landing Page Content (vault) Section 8.

## 5.5 Alur Pembayaran — Cek Dulu, Baru Bayar Penuh

> [!info] Perubahan besar dari versi sebelumnya (v1.9 dan seterusnya)
> *Model pembayaran diganti total. Versi lama pakai DP 50% dari estimasi sisi atas lalu pelunasan setelah invoice final — artinya PickmenPack menalangi ±50% harga barang dulu sebelum benar-benar dibayar customer. Mulai v1.0, tidak ada lagi DP maupun talangan.*

Alurnya:

1. Request masuk (Section 6) dan disimpan ke database, masuk antrean store run mingguan (Section 5.8). Katalog menampilkan **rentang harga**, bukan angka pasti.
2. Admin **mengecek ketersediaan & harga pasti** ke kontak toko di Mall JPO (Jumat sore) — tahap ini cuma cek, **belum membeli**. Kontak toko didapat saat store run pertama yang wajib datang langsung.
3. Admin mengonfirmasi harga final (net + fee, Section 5.4) ke customer via WhatsApp.
4. Customer **transfer penuh** sesuai harga yang sudah dikonfirmasi — bukan lagi DP sebagian. Batal sebelum transfer tidak dikenai biaya apa pun.
5. Setelah transfer diterima, admin baru benar-benar **membeli barang & mengemasnya**.
6. Barang dikirim (ekspedisi) atau di-COD-kan.

Jadwal detail (cutoff Kamis, cek Jumat, belanja Sabtu, kirim Minggu/Senin) dan kebijakan stok habis/refund/retur ada di [Business Operations](BUSINESS-OPERATIONS.md) Section 2 dan 5.

Konsekuensinya: karena harga sudah dikonfirmasi *sebelum* customer bayar (bukan estimasi yang disesuaikan belakangan), tidak ada lagi mekanisme "selisih dikembalikan/dipotong dari pelunasan" seperti di versi lama — harga yang dibayar customer sudah harga final. Risiko yang tersisa cuma soal timing (harga berubah di rentang singkat antara pengecekan dan pembelian aktual) — lihat Section 9.

> [!note] Kenapa ini lebih baik
> *Model lama menanggung risiko talangan (PickmenPack keluar modal duluan) dan risiko selisih harga (customer bisa kaget kalau harga akhir beda dari estimasi). Model baru menghilangkan keduanya: admin gak keluar uang sampai customer sudah bayar, dan customer gak akan pernah dapat tagihan yang beda dari yang sudah dikonfirmasi.*

## 5.6 Kategori Produk (Fase 1)

Fase 1 mencakup tiga kategori, semuanya tersedia di Mall JPO:

| Kategori | Contoh | Catatan |
|---|---|---|
| Sepatu | Sneakers berbagai brand | Kategori utama, fokus awal produk |
| Sandals & Slides | Termasuk Crocs dan sejenisnya | Resmi masuk Fase 1 (22 Sep 2026) — sebelumnya sempat direncanakan ditunda ke Fase 2 |
| Apparel | Pakaian yang tersedia di gerai yang sama | Resmi masuk Fase 1 (22 Sep 2026) |

Skema fee (Section 5.4) berlaku sama untuk ketiga kategori karena basisnya harga barang, bukan jenis barang. Detail risiko per kategori (ukuran, custom print, dst.) ada di Business & Market Research (vault) Section 5.4.

## 5.7 Pesanan Banyak (Bukan Jalur Corporate)

> [!note] Diputuskan 2 Okt 2026
> *PickmenPack adalah jasa jastip yang dijalankan sendiri, bukan layanan corporate/B2B. Jalur khusus Corporate/Bulk (penawaran & invoice resmi, tipe pengajuan terpisah) **dihapus dari Fase 1**. Pesanan beberapa pasang sekaligus tetap diterima, dengan aturan yang sama: harga dikonfirmasi dulu, bayar penuh, tanpa tempo pembayaran.*

## 5.8 Belanja Kolektif — Store Run Mingguan

> [!info] Mekanik disederhanakan di v1.0
> *Model lama (v1.8–v1.9) menghitung potongan tambahan dari tier minimum-belanja toko dan membaginya **proporsional** ke tiap pesanan yang ikut nyumbang transaksi. Mulai v1.0, mekanik ini disederhanakan: setiap item ditagih sesuai **harga diskon toko yang memang berlaku untuk item itu sendiri** — bukan dibagi rata atau dihitung proporsional dari total belanja gabungan. Fee PickmenPack (Section 5.4) dihitung terpisah di atas harga net item tersebut.*

Kenapa tetap dikumpulkan jadi satu store run per minggu (bukan beli satuan tiap ada request): efisiensi waktu untuk operator solo — satu kali kunjungan ke JPO menyelesaikan beberapa pesanan sekaligus, dan kalaupun kebetulan tembus promo minimum-belanja toko, potongannya tetap diteruskan ke item yang memang kena diskon itu, bukan dipukul rata ke semua pesanan dalam transaksi.

| Aturan | Isi |
|---|---|
| Jadwal | Store run jalan **mingguan** |
| Window pengumpulan | **5–7 hari** sebelum store run berjalan |
| Harga ke customer | Harga diskon toko yang berlaku untuk item itu sendiri (Section 5.5) — dikonfirmasi sebelum customer bayar |
| Fee | Dihitung terpisah dari harga item, mengikuti skema tier Section 5.4 |
| Struk | Struk asli transaksi gabungan tidak dibagikan (satu struk bisa memuat item beberapa customer) — gantinya rincian tertulis di invoice final + foto barang sebelum packing |
| Kalau buru-buru | Customer yang gak mau nunggu store run berikutnya tetap bisa dilayani lebih dulu, di luar jadwal reguler |

---

# 6. Functional Requirements

## 6.1 In Scope (Fase 1 — Simple MVP)

- Landing Page & Katalog Promo (sepatu, sandals/slides, apparel — Section 5.6), diupdate manual oleh Admin.
- Form Request Jastip (nama, item, ukuran, budget, link/foto referensi, kontak WhatsApp) + checkbox persetujuan Kebijakan Privasi ([Business Operations](BUSINESS-OPERATIONS.md) Section 7.3).
- **Request tersimpan ke database** sejak masuk (bukan cuma dirangkai jadi pesan WhatsApp) — lihat [Implementation Status](IMPLEMENTATION-STATUS.md) gap #1 dan #3.
- Halaman/Pesan Konfirmasi Otomatis setelah submit (status "Menunggu Konfirmasi Admin" + estimasi waktu respons).
- Kalkulasi Estimasi Fee Otomatis (indikatif, mengikuti skema tier Section 5.4) — harga final tetap dikonfirmasi admin sebelum customer diminta bayar (Section 5.5).
- Info Cara Pembayaran & Rekening/QRIS Tujuan.
- Halaman FAQ & Kebijakan (refund, salah ukuran tidak bisa retur, estimasi waktu proses, kebijakan struk pada belanja kolektif). *(Kebijakan DP dihapus dari FAQ — sudah tidak relevan di model v1.0.)*
- Halaman Testimoni/Portfolio.
- Landing page tiga section inti — **Why PickmenPack**, **How it works** (proses + jadwal store run bertanggal otomatis), dan **Pricing** (harga per-item, fee, harga dikunci, kebijakan struk). Copy final, urutan section, dan logika tanggal ada di Landing Page Content (vault).
- Info jadwal store run berikutnya + cutoff request (landing page, halaman cara bayar, halaman konfirmasi) — semua memakai perhitungan tanggal yang sama (Landing Page Content Section 4.1).
- Template Invoice Final dengan rincian perhitungan (harga item → diskon toko → harga net → fee).

## 6.2 Out of Scope (Fase 1)

> [!danger] Ditunda ke Fase 2
> *Cart & Checkout otomatis, Payment Gateway (Midtrans/Xendit), Order Tracking real-time otomatis, Akun Customer/Login, dan dukungan multi-jastiper.*

## 6.3 Roadmap Fase 2 — Full E-Commerce (Kalau Sudah Tervalidasi)

- Cart & checkout online penuh.
- Payment gateway otomatis (Midtrans/Xendit).
- Order tracking otomatis + notifikasi status.
- Akun customer dengan riwayat order.
- Ekspansi kategori benar-benar baru di luar sepatu/sandal-slides/apparel (mis. tas, aksesoris).

---

# 7. Non-Functional Requirements

## 7.1 Tech Stack

| Category | Fase 1 (Simple MVP) | Fase 2 (Full E-Commerce) |
|---|---|---|
| Framework | Next.js (App Router), TypeScript | Sama, dilanjutkan |
| Styling / UI | Tailwind CSS, shadcn/ui | Sama, dilanjutkan |
| Data | Database untuk request/pesanan (bukan lagi "belum perlu database" — lihat Open Question lama #8, sudah resolved) | Prisma ORM + Supabase (PostgreSQL) |
| Validasi | Zod | Zod (dilanjutkan) |
| Payment | Manual Transfer/QRIS, dikonfirmasi setelah harga fix (Section 5.5) | Midtrans/Xendit |
| Deploy | VPS (Docker Compose) di belakang Cloudflare, proxied | Sama, dilanjutkan — VPS di-share bersama project Goposystem |

## 7.2 Arsitektur Repo & Deployment

| Keputusan | Pilihan | Alasan |
|---|---|---|
| FE & BE dipisah? | Tidak — satu Next.js app (App Router + Server Actions/Route Handlers sebagai backend) | Solo developer, scope MVP kecil; split FE/BE cuma nambah overhead tanpa benefit nyata di skala ini |
| Struktur Repo | 1 repo, 1 project | FE+BE satu aplikasi. Kalau Fase 2+ nambah app terpisah, tetap pakai **monorepo** (Turborepo/pnpm workspaces), bukan repo terpisah |
| Docker | Perlu — containerize 3 web (PickmenPack, Goposystem, portofolio) di 1 VPS yang sama | Deploy ke VPS murah (2 vCPU/2GB RAM/40GB SSD), bukan Vercel. Pakai **Docker Compose polos + Caddy** (bukan Coolify) karena overhead dashboard Coolify terlalu berat untuk RAM 2GB dibagi 3 app. Database tetap di Supabase eksternal |

## 7.3 Infrastruktur Tambahan (Domain, Keamanan, Analytics)

| Kebutuhan | Rekomendasi | Catatan |
|---|---|---|
| Domain & DNS | Beli domain & kelola DNS-nya di Cloudflare | Set record ke IP VPS sebagai **Proxied** (orange cloud) |
| Anti-Spam Form | Cloudflare Turnstile (gratis) | Form pengajuan publik rawan disepam bot, apalagi pas musim promo rame traffic-nya |
| Tracking Konversi | Meta Pixel & TikTok Pixel di landing page | Traffic utama direncanakan dari TikTok/IG (Business & Market Research (vault) Section 7) |
| Analytics | Google Analytics | Selaras sama KPI di Section 8 |
| Notifikasi Email (opsional) | Resend | Pelengkap notifikasi WA |
| Uptime Monitoring | UptimeRobot (gratis) | Alert simpel kalau web down |
| Storage Foto (Fase 2) | Supabase Storage (bawaan) | Karena Supabase sudah masuk stack Fase 2 |
| SSL/TLS Mode | Cloudflare SSL/TLS diset **Full (Strict)** | Full (Strict) + sertifikat dari Caddy (auto Let's Encrypt) bikin koneksi aman ujung ke ujung |
| Keamanan Server | Firewall `ufw` (port 22/80/443), SSH key-only, Fail2ban | Langkah dasar wajib karena VPS ini publicly exposed |
| Monitoring | UptimeRobot + `docker stats`/Netdata untuk RAM | RAM VPS cuma 2GB dibagi 3 web |

## 7.4 Design Guidelines

- **Layout:** Mobile-first, card-based untuk katalog, alur form request singkat (idealnya di bawah 5 langkah).
- **Warna:** Palet clean & trustworthy, warna status konsisten: hijau (Dikonfirmasi/Selesai), kuning (Menunggu/Diproses), merah (Ditolak/Batal).
- **Konten:** Testimoni dan foto barang asli dari pembelian sebelumnya ditampilkan jelas — penting untuk bangun trust sebagai jastiper baru.

---

# 8. Success Metrics

| Metric | Target Musim Desember 2026 |
|---|---|
| Jumlah request masuk per minggu (puncak promo) | Baseline awal — dicatat dulu, jadi acuan target musim berikutnya |
| Konversi request → order terbayar | ≥ 40% |
| Rata-rata waktu respons ke customer | &lt; 2 jam di jam operasional |
| Repeat customer rate | Dicatat sebagai indikator kepercayaan, belum ditarget angka pasti di Fase 1 |

> [!note] Definisi konversi di kode
> Dashboard admin menghitung "Konversi terbayar" = request berstatus `dibayar` atau lebih lanjut (`dibeli`, `dikirim`, `selesai`) dibagi total request — sama dengan target di atas (resolved, [Implementation Status](IMPLEMENTATION-STATUS.md) gap #7).

---

# 9. Risks & Dependencies

| Risk | Impact | Mitigation |
|---|---|---|
| Stok/ukuran habis saat admin sampai atau cek di JPO | Request gagal, customer kecewa | Cek ketersediaan dulu (Section 5.5) sebelum minta customer bayar — kalau habis, customer belum terlanjur transfer |
| Customer gak jadi transfer setelah admin cek ketersediaan & harga | Waktu admin kepakai sia-sia (bukan uang — tidak ada modal keluar duluan) | Batas transfer Sabtu 09.00; yang belum transfer ikut minggu depan tanpa biaya ([Business Operations](BUSINESS-OPERATIONS.md) Section 2) |
| Harga berubah di rentang singkat antara pengecekan dan pembelian aktual | Selisih kecil antara harga yang dikonfirmasi dan harga saat benar-benar dibeli | Katalog pakai rentang harga; harga pasti dicek Jumat dan dibeli Sabtu. Kalau stok habis setelah transfer → tawarkan ganti, atau refund penuh |
| Barang rusak/hilang saat pengiriman ke luar kota | Kerugian finansial & kepercayaan | Dokumentasi foto/video sebelum kirim; utamakan J&T Express untuk barang &gt; Rp1 juta (plafon ganti rugi hingga Rp20 juta), declare nilai barang sesuai harga aktual |
| Kapasitas waktu solo beririsan dengan Goposystem (sama-sama Desember 2026) | Salah satu atau kedua project telat/kurang maksimal | Prioritas project ini diset Medium (vs Goposystem Hight); pilih MVP Simple agar cepat selesai |
| RAM VPS (2GB) dipakai bersama 3 web, riskan pas trafik dua bisnis sama-sama puncak Desember 2026 | Web jadi lambat/down bersamaan pas momen paling butuh online | Pakai Docker Compose ringan, pantau RAM sejak awal development, siapkan opsi upgrade tier VPS |
| Customer minta bukti struk asli, padahal satu struk transaksi mingguan bisa memuat pesanan customer lain | Dianggap kurang transparan, trust turun | Kebijakan struk dijelaskan terbuka sejak FAQ & landing page; diganti rincian perhitungan tertulis di invoice final + foto barang sebelum packing |
| Menunggu jadwal store run mingguan bikin lead time lebih lama dari jastiper yang beli satuan | Customer buru-buru pindah ke jastiper lain | Jadwal store run berikutnya ditampilkan di web sejak awal; tersedia opsi dilayani di luar jadwal reguler untuk yang buru-buru |

---

# 10. Open Questions

| # | Topik | Pertanyaan Terbuka |
|---|---|---|
| 1 | Radius Lokal | Wilayah pasti mana saja yang dianggap "lokal" untuk opsi COD? |
| 2 | Kapasitas Waktu | ~~Pembagian waktu~~ — siklus mingguan sudah ditetapkan di Business Operations Section 2 (2 Okt 2026). Sisa pertanyaan: kapasitas maksimal pesanan per Sabtu, terutama saat Desember beririsan dengan Goposystem (Unit Economics (vault) E2) |
| 3 | Batas Waktu Konfirmasi Bayar | 🟡 Usulan: harga dikirim Jumat malam, batas transfer Sabtu 09.00 — menunggu konfirmasi Owner (Business Operations Section 8) |
| 4 | Kompensasi Waktu Admin | ✅ Resolved 2 Okt 2026 — tidak ada biaya apa pun kalau customer tidak jadi bayar |

---

# 11. Revision History

| Version | Date | Changes |
|---|---|---|
| v1.0 | 22 Sep 2026 | Restrukturisasi total dari v1.9, mulai dari nol atas permintaan Owner. (1) Format mengikuti checklist skill dokumentasi terbaru: Background, Goals & Non-Goals, Target Users & Personas, User Stories, Non-Functional Requirements ditambahkan; Timeline & Milestones dihapus (bukan bagian PRD); field Stakeholders ditambah di Document Control; tabel brainstorm nama alternatif (brand & aplikasi) dihapus karena keputusan sudah final. (2) Operator Fase 1 solo — final, bukan lagi asumsi terbuka. (3) Request resmi disimpan ke database sejak Fase 1 (Section 6.1). (4) Brand digabung jadi satu nama, PickmenPack, untuk platform maupun customer-facing (nama "Soletip" tidak dipakai lagi); UI tetap bahasa Inggris. (5) Model pembayaran diganti total dari DP 50%+talangan menjadi cek ketersediaan & harga dulu → customer transfer penuh → baru barang dibeli & dikemas (Section 5.5) — menghilangkan risiko talangan dan mekanisme selisih estimasi-vs-final. (6) Kategori Sandals/Slides (termasuk Crocs) dan Apparel resmi masuk Fase 1, tidak lagi ditunda ke Fase 2 (Section 5.6). (7) Copy "flat fee, never a percentage" ditandai untuk diperbaiki, bukan mengubah skema fee. (8) Belanja Kolektif disederhanakan: store run mingguan dengan window 5–7 hari, harga per-item mengikuti diskon toko untuk item itu sendiri (bukan lagi alokasi proporsional dari tier minimum-belanja gabungan). (9) Open Questions dirapikan: yang sudah terjawab (operator, penyimpanan request, nama & bahasa, jadwal store run, basis alokasi, ekspedisi) dihapus dari daftar; ditambah 2 pertanyaan baru soal batas waktu konfirmasi bayar dan kompensasi waktu admin. |
| v1.1 | 2 Okt 2026 | Keputusan operasional Owner: (1) jalur Corporate/Bulk dihapus dari Fase 1 — pesanan banyak ikut aturan biasa, bayar penuh tanpa tempo (Section 3, 4, 5.7, 6.1, 6.2); (2) katalog pakai rentang harga, harga pasti dicek Jumat via kontak toko yang didapat di store run pertama (Section 5.5); (3) tidak ada biaya kalau batal sebelum transfer — Open Question #4 resolved; (4) mitigasi risiko diperbarui mengikuti siklus mingguan & kebijakan refund; (5) checkbox Kebijakan Privasi di form; (6) referensi ke dokumen baru Business Operations & Unit Economics. |
| v1.2 | 5 Okt 2026 | Section 6.1: komponen "Belanja Kolektif" dan section jadwal mingguan terpisah diganti tiga section landing (Why, How it works bertanggal, Pricing) yang copy-nya diatur di dokumen baru Landing Page Content. Koreksi 6 Okt 2026 (sebelum publish ke Notion): callout copy fee (Section 5.4) dan definisi konversi (Section 8) diubah dari warning jadi catatan resolved, mengikuti kode commit `f29d642`. |
