# PickmenPack

Website jastip sepatu, sandal/slides, dan apparel **PickmenPack**: katalog promo, form request dengan estimasi fee otomatis, info cara bayar, FAQ, testimoni, dan panel admin. Request tersimpan ke database; konfirmasi harga dan pembayaran (penuh, tanpa DP) lewat WhatsApp (MVP Simple). Target live awal Desember 2026.

## Getting Started

Butuh Node.js 24 (database memakai `node:sqlite` bawaan Node).

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build
npm test           # cek logika fee, jadwal store run, dan store admin
```

## Environment

| Variable | Fungsi | Default (hanya untuk development) |
|---|---|---|
| `ADMIN_PASSWORD` | Password login panel `/admin` | `pickmenpack` |
| `ADMIN_SECRET` | Secret untuk menandatangani cookie sesi admin | `<password>-dev-secret` |
| `DB_PATH` | Lokasi file SQLite | `data/pickmenpack.db` |

Set `ADMIN_PASSWORD` dan `ADMIN_SECRET` sebelum deploy.

## Project Structure

```
src/
├── app/
│   ├── (site)/            # halaman publik: /, /katalog, /request, /cara-bayar, /faq, /privacy
│   └── admin/             # login + panel admin
├── components/
│   ├── layout/            # kerangka halaman
│   │   ├── site/          # header, footer, bottom nav, announcement bar, WA melayang
│   │   ├── admin/         # sidebar + top bar panel admin
│   │   └── section.tsx    # container section, dipakai dua-duanya
│   ├── shared/            # komponen reusable lintas modul (slider, page header, stat card, empty)
│   └── ui/                # khusus primitive shadcn/ui (button, accordion, carousel)
├── lib/                   # konstanta brand/WhatsApp, format rupiah & tanggal, class token UI
└── modules/               # admin, catalog, faq, home, payment, request, testimonial
    └── <modul>/
        ├── components/    # komponen milik modul itu sendiri
        └── *.ts           # data, tipe, server action, logika bisnis
```

Data tersimpan di SQLite (`data/`, diabaikan git). Katalog, testimoni, FAQ, dan pesanan awal masih seed dummy. Rincian apa yang sudah dan belum ada: [documents/IMPLEMENTATION-STATUS.md](documents/IMPLEMENTATION-STATUS.md).

## Documentation

Dokumen bisnis dan requirement ada di [`documents/`](documents/README.md). Sumber utamanya Notion; alur penulisan dan publish dijelaskan di sana.

## Notes

Project ini memakai Next.js 16, yang punya breaking changes dibanding versi sebelumnya. Baca panduan di `node_modules/next/dist/docs/` sebelum menulis kode (lihat `AGENTS.md`).
