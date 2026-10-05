# PickmenPack

Website jastip sepatu untuk brand **Soletip**: katalog promo, form request dengan estimasi fee otomatis, info cara bayar, FAQ, testimoni, dan panel admin. Closing dan pembayaran tetap lewat WhatsApp (MVP Simple). Target live awal Desember 2026.

## Getting Started

Butuh Node.js 22 atau lebih baru.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build
```

Cek logika fee dan store admin (belum ada test runner, jadi dijalankan manual):

```bash
node --experimental-strip-types src/modules/request/fee.check.ts
node --experimental-strip-types src/modules/admin/store.check.ts
```

## Environment

| Variable | Fungsi | Default (hanya untuk development) |
|---|---|---|
| `ADMIN_PASSWORD` | Password login panel `/admin` | `pickmenpack` |
| `ADMIN_SECRET` | Secret untuk menandatangani cookie sesi admin | `<password>-dev-secret` |

Set keduanya sebelum deploy.

## Project Structure

```
src/
├── app/
│   ├── (site)/            # halaman publik: /, /katalog, /request, /cara-bayar, /faq
│   └── admin/             # login + panel admin
├── components/
│   ├── layout/            # kerangka halaman
│   │   ├── site/          # header, footer, bottom nav
│   │   ├── admin/         # sidebar + top bar panel admin
│   │   └── section.tsx    # container section, dipakai dua-duanya
│   ├── shared/            # komponen reusable lintas modul (page header, stat card, empty)
│   └── ui/                # khusus primitive shadcn/ui (belum dipasang)
├── lib/                   # konstanta brand/WhatsApp, format rupiah & tanggal, class token UI
└── modules/               # admin, catalog, faq, home, payment, request, testimonial
    └── <modul>/
        ├── components/    # komponen milik modul itu sendiri
        └── *.ts           # data, tipe, server action, logika bisnis
```

Data katalog, testimoni, FAQ, dan pesanan masih dummy/in-memory. Rincian apa yang sudah dan belum ada: [documents/IMPLEMENTATION-STATUS.md](documents/IMPLEMENTATION-STATUS.md).

## Documentation

Dokumen bisnis dan requirement ada di [`documents/`](documents/README.md). Sumber utamanya Notion; alur penulisan dan publish dijelaskan di sana.

## Notes

Project ini memakai Next.js 16, yang punya breaking changes dibanding versi sebelumnya. Baca panduan di `node_modules/next/dist/docs/` sebelum menulis kode (lihat `AGENTS.md`).
