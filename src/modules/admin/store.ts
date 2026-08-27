// Sumber data panel admin. Sengaja in-memory dulu (PRD 6.1: MVP manual) —
// semua akses lewat fungsi async di bawah, jadi tinggal ganti isi fungsinya
// waktu pindah ke database beneran tanpa menyentuh komponen.
//
// ponytail: state di memori proses, hilang tiap restart & gak sinkron antar
// instance. Ganti isi `collection()` + fungsi order ke query Prisma/Supabase
// begitu datanya mulai nyata.

import { products as seedProducts, type Product } from "../catalog/data.ts";
import { faqs as seedFaqs } from "../faq/data.ts";
import {
  testimonials as seedTestimonials,
  type Testimonial,
} from "../testimonial/data.ts";
import { site } from "../../lib/site.ts";
import { estimateFee, estimateTotal, dpAmount } from "../request/fee.ts";
import { type Order, type OrderStatus, type Settings, isActive } from "./types.ts";

export type FaqItem = { id: string; q: string; a: string };
export type TestimonialItem = Testimonial & { id: string };
export type ProductItem = Product & { id: string };

function collection<T extends { id: string }>(seed: T[]) {
  let rows = [...seed];
  return {
    list: async () => rows,
    find: async (id: string) => rows.find((r) => r.id === id),
    save: async (row: T) => {
      const i = rows.findIndex((r) => r.id === row.id);
      rows = i < 0 ? [row, ...rows] : rows.with(i, row);
      return row;
    },
    remove: async (id: string) => {
      rows = rows.filter((r) => r.id !== id);
    },
  };
}

const daysAgo = (n: number) =>
  new Date(Date.now() - n * 86_400_000).toISOString();

const seedOrders: Order[] = [
  {
    id: "PMP-0821-016", createdAt: daysAgo(0), nama: "Rizky Aditya", wa: "081234567801",
    kota: "Tangerang", item: "Nike Revolution 7", ukuran: "42", store: "Nike Store",
    estimasi: 539_000, netFinal: null, delivery: "cod", status: "baru",
    catatan: "Kalau warna hitam habis, abu juga boleh.",
  },
  {
    id: "PMP-0821-015", createdAt: daysAgo(0), nama: "Dinda Pramesti", wa: "081234567802",
    kota: "Jakarta Selatan", item: "New Balance 530 Steel Grey", ukuran: "40",
    store: "New Balance Official", estimasi: 1_329_000, netFinal: null, delivery: "cod",
    status: "baru",
  },
  {
    id: "PMP-0820-014", createdAt: daysAgo(1), nama: "Bagas Wicaksono", wa: "081234567803",
    kota: "Semarang", item: "Converse Chuck 70 Hi", ukuran: "41", store: "Converse Store",
    estimasi: 909_000, netFinal: null, delivery: "kirim", status: "dp",
  },
  {
    id: "PMP-0820-013", createdAt: daysAgo(1), nama: "Nadia Safira", wa: "081234567804",
    kota: "Tangerang Selatan", item: "Puma Suede Classic XXI", ukuran: "41",
    store: "Puma Store", estimasi: 749_000, netFinal: null, delivery: "cod", status: "dp",
    catatan: "Minta dicek dulu stok ukuran 41 sebelum dibeli.",
  },
  {
    id: "PMP-0819-012", createdAt: daysAgo(2), nama: "Fikri Ramadhan", wa: "081234567805",
    kota: "Bekasi", item: "Adidas Grand Court 2.0", ukuran: "43", store: "Adidas Originals Store",
    estimasi: 660_000, netFinal: 612_000, delivery: "kirim", status: "dibeli",
  },
  {
    id: "PMP-0819-011", createdAt: daysAgo(2), nama: "Salsabila Nur", wa: "081234567806",
    kota: "Depok", item: "Vans Old Skool Classic", ukuran: "39", store: "Vans Store",
    estimasi: 769_000, netFinal: 769_000, delivery: "cod", status: "dibeli",
  },
  {
    id: "PMP-0818-010", createdAt: daysAgo(3), nama: "Yoga Pratama", wa: "081234567807",
    kota: "Surabaya", item: "Asics Gel-1130", ukuran: "42", store: "Asics Store",
    estimasi: 1_539_000, netFinal: 1_479_000, delivery: "kirim", status: "dikirim",
    catatan: "Resi J&T JP2208XXXX, dikirim sore.",
  },
  {
    id: "PMP-0818-009", createdAt: daysAgo(3), nama: "Kirana Ayu", wa: "081234567808",
    kota: "Jakarta Barat", item: "Nike Revolution 7", ukuran: "39", store: "Nike Store",
    estimasi: 539_000, netFinal: 519_000, delivery: "cod", status: "selesai",
  },
  {
    id: "PMP-0817-008", createdAt: daysAgo(4), nama: "Haris Nugroho", wa: "081234567809",
    kota: "Tangerang", item: "Skechers Go Walk 6", ukuran: "40", store: "Skechers Store",
    estimasi: 479_000, netFinal: null, delivery: "cod", status: "batal",
    catatan: "Stok ukuran 40 habis, customer gak mau alternatif. DP dikembalikan penuh.",
  },
  {
    id: "PMP-0817-007", createdAt: daysAgo(4), nama: "Melati Anggraini", wa: "081234567810",
    kota: "Bandung", item: "Converse Chuck 70 Hi", ukuran: "38", store: "Converse Store",
    estimasi: 909_000, netFinal: 837_000, delivery: "kirim", status: "selesai",
  },
  {
    id: "PMP-0816-006", createdAt: daysAgo(5), nama: "Rendi Saputra", wa: "081234567811",
    kota: "Jakarta Timur", item: "Puma Suede Classic XXI", ukuran: "43", store: "Puma Store",
    estimasi: 749_000, netFinal: 749_000, delivery: "cod", status: "selesai",
  },
  {
    id: "PMP-0816-005", createdAt: daysAgo(5), nama: "Tiara Maharani", wa: "081234567812",
    kota: "Tangerang", item: "New Balance 530 Steel Grey", ukuran: "41",
    store: "New Balance Official", estimasi: 1_329_000, netFinal: 1_259_000, delivery: "cod",
    status: "selesai",
  },
  {
    id: "PMP-0815-004", createdAt: daysAgo(6), nama: "Galih Prasetyo", wa: "081234567813",
    kota: "Yogyakarta", item: "Adidas Grand Court 2.0", ukuran: "42",
    store: "Adidas Originals Store", estimasi: 660_000, netFinal: 660_000, delivery: "kirim",
    status: "selesai",
  },
  {
    id: "PMP-0815-003", createdAt: daysAgo(6), nama: "Sinta Rahayu", wa: "081234567814",
    kota: "Jakarta Pusat", item: "Vans Old Skool Classic", ukuran: "40",
    store: "Vans Store", estimasi: 769_000, netFinal: null, delivery: "cod",
    status: "batal",
    catatan: "Customer gak balas setelah 2x follow up, belum sempat DP.",
  },
  {
    id: "PMP-0814-002", createdAt: daysAgo(7), nama: "Arif Maulana", wa: "081234567815",
    kota: "Serpong", item: "Asics Gel-1130", ukuran: "43", store: "Asics Store",
    estimasi: 1_539_000, netFinal: 1_539_000, delivery: "cod", status: "selesai",
  },
  {
    id: "PMP-0814-001", createdAt: daysAgo(7), nama: "Putri Ananda", wa: "081234567816",
    kota: "Malang", item: "Nike Revolution 7", ukuran: "38", store: "Nike Store",
    estimasi: 539_000, netFinal: 505_000, delivery: "kirim", status: "selesai",
  },
];

const orderDb = collection(seedOrders);
export const productDb = collection<ProductItem>(
  seedProducts.map((p) => ({ ...p, id: p.slug })),
);
export const testimonialDb = collection<TestimonialItem>(
  seedTestimonials.map((t, i) => ({ ...t, id: `tst-${i + 1}` })),
);
export const faqDb = collection<FaqItem>(
  seedFaqs.map((f, i) => ({ ...f, id: `faq-${i + 1}` })),
);

/* ---------- Orders ---------- */

export async function listOrders(filter?: { status?: string; q?: string }) {
  const rows = await orderDb.list();
  const q = filter?.q?.trim().toLowerCase();
  return rows
    .filter(
      (o) => !filter?.status || filter.status === "semua" || o.status === filter.status,
    )
    .filter(
      (o) =>
        !q ||
        [o.id, o.nama, o.item, o.kota, o.wa].some((v) => v.toLowerCase().includes(q)),
    )
    .toSorted((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export const getOrder = orderDb.find;

export async function updateOrder(id: string, patch: Partial<Order>) {
  const current = await orderDb.find(id);
  if (!current) throw new Error(`Order ${id} tidak ditemukan`);
  return orderDb.save({ ...current, ...patch, id });
}

/** Angka uang satu order: fee & total pakai harga net final kalau sudah dibeli. */
export function orderMoney(o: Order) {
  const net = o.netFinal ?? o.estimasi;
  return {
    net,
    fee: estimateFee(net),
    total: estimateTotal(net, o.delivery),
    dp: dpAmount(estimateTotal(o.estimasi, o.delivery)),
    /** + = customer nombok dari estimasi, − = ada selisih yang harus dibalikin. */
    selisih: o.netFinal === null ? 0 : o.netFinal - o.estimasi,
  };
}

export async function getStats() {
  const orders = await orderDb.list();
  const selesai = orders.filter((o) => o.status === "selesai");
  const omzet = selesai.reduce((s, o) => s + orderMoney(o).total.max, 0);
  const fee = selesai.reduce((s, o) => s + orderMoney(o).fee.max, 0);
  const refund = orders
    .map(orderMoney)
    .filter((m) => m.selisih < 0)
    .reduce((s, m) => s - m.selisih, 0);

  // Request masuk 7 hari terakhir, item pertama = 6 hari lalu.
  const harian = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(Date.now() - (6 - i) * 86_400_000);
    const key = day.toISOString().slice(0, 10);
    return {
      key,
      label: day.toLocaleDateString("id-ID", { weekday: "short" }),
      count: orders.filter((o) => o.createdAt.slice(0, 10) === key).length,
    };
  });

  const perStatus = Object.fromEntries(
    (["baru", "dp", "dibeli", "dikirim", "selesai", "batal"] as OrderStatus[]).map(
      (s) => [s, orders.filter((o) => o.status === s).length],
    ),
  ) as Record<OrderStatus, number>;

  return {
    total: orders.length,
    aktif: orders.filter(isActive).length,
    selesai: selesai.length,
    konversi: orders.length ? Math.round((selesai.length / orders.length) * 100) : 0,
    omzet,
    fee,
    refund,
    harian,
    perStatus,
    terbaru: (await listOrders()).slice(0, 6),
  };
}

/* ---------- Settings ---------- */

let settings: Settings = {
  brand: site.brand,
  waNumber: site.waNumber,
  instagram: site.instagram,
  jamOperasional: site.hours,
  accounts: [
    { bank: "BCA", nomor: "1234567890", atasNama: "Dicky Qadr Alamsah" },
    { bank: "Mandiri", nomor: "9876543210", atasNama: "Dicky Qadr Alamsah" },
    { bank: "QRIS", nomor: "Scan kode di halaman Cara Bayar", atasNama: "PickmenPack" },
  ],
};

export const getSettings = async () => settings;

export async function saveSettings(patch: Partial<Settings>) {
  settings = { ...settings, ...patch };
  return settings;
}
