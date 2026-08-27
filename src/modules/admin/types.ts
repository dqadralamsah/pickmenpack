import type { Delivery } from "../request/fee.ts";

/** Alur order mengikuti PRD 4 (request → DP → dibeli → kirim → selesai). */
export type OrderStatus =
  | "baru"
  | "dp"
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
  store: string;
  /** Harga net perkiraan yang diisi customer di form request. */
  estimasi: number;
  /** Harga net aktual setelah barang dibeli di toko. null = belum dibeli. */
  netFinal: number | null;
  delivery: Delivery;
  status: OrderStatus;
  catatan?: string;
};

export type Settings = {
  brand: string;
  waNumber: string;
  instagram: string;
  jamOperasional: string;
  accounts: { bank: string; nomor: string; atasNama: string }[];
};

/** Warna status konsisten dengan PRD 8: hijau selesai, kuning proses, merah batal. */
export const STATUS: Record<
  OrderStatus,
  { label: string; badge: string; dot: string }
> = {
  baru: {
    label: "Request baru",
    badge: "bg-sky-50 text-sky-700 border-sky-200",
    dot: "bg-sky-500",
  },
  dp: {
    label: "DP masuk",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  dibeli: {
    label: "Dibeli di toko",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
    dot: "bg-violet-500",
  },
  dikirim: {
    label: "Dikirim / COD",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    dot: "bg-indigo-500",
  },
  selesai: {
    label: "Selesai",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  batal: {
    label: "Batal",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
  },
};

export const STATUS_FLOW: OrderStatus[] = [
  "baru",
  "dp",
  "dibeli",
  "dikirim",
  "selesai",
];

/** Order yang masih jalan — dipakai buat KPI "order aktif". */
export const isActive = (o: Order) =>
  o.status !== "selesai" && o.status !== "batal";
