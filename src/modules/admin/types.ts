import type { Delivery } from "../request/fee.ts";

/**
 * Alur order PRD 5.5 (tanpa DP): request → admin cek harga → harga dikonfirmasi
 * → customer transfer penuh → dibeli & dikemas → kirim → selesai.
 */
export type OrderStatus =
  | "baru"
  | "dikonfirmasi"
  | "dibayar"
  | "dibeli"
  | "dikirim"
  | "selesai"
  | "batal";

export type Order = {
  id: string;
  createdAt: string;
  nama: string;
  wa: string;
  kota: string;
  item: string;
  ukuran: string;
  /** Panjang kaki (cm), opsional — mitigasi salah ukuran (Business Ops 5.2). */
  kakiCm?: number;
  store: string;
  referensi?: string;
  /** Perkiraan harga barang yang diisi customer di form request. */
  estimasi: number;
  /** Harga net pasti hasil cek ke toko (Jumat). null = belum dicek. */
  netFinal: number | null;
  delivery: Delivery;
  status: OrderStatus;
  /** Cutoff store run yang diikuti (ISO), PRD 5.8. */
  storeRun?: string;
  catatan?: string;
};

export type Settings = {
  brand: string;
  waNumber: string;
  instagram: string;
  jamOperasional: string;
  accounts: { bank: string; nomor: string; atasNama: string }[];
};

// PRD 7.4: kuning = menunggu/diproses, hijau = dikonfirmasi/selesai, merah = batal.
const wait = { badge: "bg-amber-50 text-amber-800 border-amber-200", dot: "bg-amber-500" };
const ok = { badge: "bg-emerald-50 text-emerald-800 border-emerald-200", dot: "bg-emerald-500" };

export const STATUS: Record<OrderStatus, { label: string; badge: string; dot: string }> = {
  baru: { label: "Menunggu cek harga", ...wait },
  dikonfirmasi: { label: "Harga dikirim, tunggu transfer", ...wait },
  dibayar: { label: "Lunas", ...ok },
  dibeli: { label: "Dibeli & dikemas", ...ok },
  dikirim: { label: "Dikirim / COD", ...ok },
  selesai: { label: "Selesai", badge: "bg-emerald-600 text-white border-emerald-600", dot: "bg-emerald-700" },
  batal: { label: "Batal", badge: "bg-rose-50 text-rose-800 border-rose-200", dot: "bg-rose-500" },
};

/** Order yang masih jalan — dipakai buat KPI "order aktif". */
export const isActive = (o: Order) => o.status !== "selesai" && o.status !== "batal";

/** PRD 8: konversi = request yang sudah dibayar (atau lebih lanjut). */
export const isPaid = (o: Order) =>
  o.status === "dibayar" || o.status === "dibeli" || o.status === "dikirim" || o.status === "selesai";
