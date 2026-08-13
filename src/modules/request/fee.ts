// Skema fee Opsi A (PRD 2.4) — fee tetap bertingkat, dihitung dari harga NET
// setelah semua diskon toko. Hasilnya rentang, bukan angka pasti (PRD 4).

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

/** DP dihitung dari sisi atas estimasi (PRD 4: "Bayar DP Berdasar Estimasi Sisi Atas"). */
export const DP_RATE = 0.5;
export const dpAmount = (total: Range) => Math.ceil((total.max * DP_RATE) / 1000) * 1000;
