// Skema fee Opsi A (PRD 5.4) — fee bertingkat, dihitung dari harga NET setelah
// semua diskon toko. Di form hasilnya rentang indikatif; harga final dikonfirmasi
// admin sebelum customer transfer penuh (PRD 5.5, tanpa DP).

export type Range = { min: number; max: number };

export type Delivery = "cod" | "kirim";

/** Ongkir + packing estimasi untuk kirim luar kota (J&T). COD lokal gratis. */
export const ONGKIR: Record<Delivery, Range> = {
  cod: { min: 0, max: 0 },
  kirim: { min: 30_000, max: 55_000 },
};

export function estimateFee(netPrice: number): Range {
  if (netPrice < 500_000) return { min: 25_000, max: 35_000 };
  if (netPrice <= 1_000_000) return { min: 40_000, max: 60_000 };
  return {
    min: Math.max(75_000, Math.round(netPrice * 0.05)),
    max: Math.max(75_000, Math.round(netPrice * 0.07)),
  };
}

export function estimateTotal(netPrice: number, delivery: Delivery): Range {
  const fee = estimateFee(netPrice);
  const ongkir = ONGKIR[delivery];
  return {
    min: netPrice + fee.min + ongkir.min,
    max: netPrice + fee.max + ongkir.max,
  };
}

/**
 * @deprecated PRD v1.0 5.8: harga per-item sesuai diskon toko, bukan proporsional.
 * Cuma dipakai `home/group-buy.tsx` (tidak lagi dipasang di halaman) — hapus bareng file itu.
 *
 * Diskon kolektif (PRD 2.6): potongan tier "minimum belanja" yang didapat dari
 * satu transaksi gabungan, dibagi proporsional ke tiap pesanan yang ikut.
 * Sisa pembulatan dibebankan ke pesanan terbesar supaya total alokasi persis
 * sama dengan potongan yang didapat di kasir.
 */
export function allocateGroupDiscount(netPrices: number[], discount: number): number[] {
  const total = netPrices.reduce((a, b) => a + b, 0);
  if (total <= 0 || discount <= 0) return netPrices.map(() => 0);

  const shares = netPrices.map((n) => Math.round((n / total) * discount));
  const drift = discount - shares.reduce((a, b) => a + b, 0);
  shares[netPrices.indexOf(Math.max(...netPrices))] += drift;
  return shares;
}
