// Tabel konversi ukuran sepatu per gender. Ukuran produk disimpan dalam EU
// (Product.sizes); US/UK/cm diturunkan dari sini untuk tampilan & size guide.
// ponytail: satu tabel umum untuk semua brand — tiap brand bisa beda ±0,5. Kalau
// perlu presisi, tambah tabel per brand dan pilih berdasarkan Product.brand.

export type SizeSystem = "EU" | "US" | "UK";
export type SizeChart = "men" | "women" | "kids";
export type SizeRow = { eu: string; us: string; uk: string; cm: number };

export const SIZE_SYSTEMS: SizeSystem[] = ["EU", "US", "UK"];

export const SIZE_CHARTS: Record<SizeChart, SizeRow[]> = {
  men: [
    { eu: "38", us: "5.5", uk: "5", cm: 23.5 },
    { eu: "38.5", us: "6", uk: "5.5", cm: 24 },
    { eu: "39", us: "6.5", uk: "6", cm: 24.5 },
    { eu: "40", us: "7", uk: "6", cm: 25 },
    { eu: "40.5", us: "7.5", uk: "6.5", cm: 25.5 },
    { eu: "41", us: "8", uk: "7", cm: 26 },
    { eu: "42", us: "8.5", uk: "7.5", cm: 26.5 },
    { eu: "42.5", us: "9", uk: "8", cm: 27 },
    { eu: "43", us: "9.5", uk: "8.5", cm: 27.5 },
    { eu: "44", us: "10", uk: "9", cm: 28 },
    { eu: "44.5", us: "10.5", uk: "9.5", cm: 28.5 },
    { eu: "45", us: "11", uk: "10", cm: 29 },
    { eu: "46", us: "12", uk: "11", cm: 30 },
  ],
  women: [
    { eu: "35.5", us: "5", uk: "2.5", cm: 22 },
    { eu: "36", us: "5.5", uk: "3", cm: 22.5 },
    { eu: "36.5", us: "6", uk: "3.5", cm: 23 },
    { eu: "37.5", us: "6.5", uk: "4", cm: 23.5 },
    { eu: "38", us: "7", uk: "4.5", cm: 24 },
    { eu: "38.5", us: "7.5", uk: "5", cm: 24.5 },
    { eu: "39", us: "8", uk: "5.5", cm: 25 },
    { eu: "40", us: "8.5", uk: "6", cm: 25.5 },
    { eu: "40.5", us: "9", uk: "6.5", cm: 26 },
    { eu: "41", us: "9.5", uk: "7", cm: 26.5 },
    { eu: "42", us: "10", uk: "7.5", cm: 27 },
    { eu: "43", us: "10.5", uk: "8", cm: 27.5 },
    { eu: "44", us: "11", uk: "8.5", cm: 28 },
  ],
  // US anak: C = little kids (toddler/PS), Y = youth (GS).
  kids: [
    { eu: "27", us: "10C", uk: "9.5", cm: 16.5 },
    { eu: "28", us: "11C", uk: "10.5", cm: 17 },
    { eu: "29.5", us: "12C", uk: "11.5", cm: 18 },
    { eu: "31", us: "13C", uk: "12.5", cm: 19 },
    { eu: "32", us: "13.5C", uk: "13", cm: 19.5 },
    { eu: "33", us: "1Y", uk: "13.5", cm: 20 },
    { eu: "33.5", us: "1.5Y", uk: "1", cm: 20.5 },
    { eu: "34", us: "2Y", uk: "1.5", cm: 21 },
    { eu: "35", us: "3Y", uk: "2.5", cm: 22 },
    { eu: "36", us: "4Y", uk: "3.5", cm: 22.5 },
    { eu: "36.5", us: "4.5Y", uk: "4", cm: 23 },
    { eu: "37.5", us: "5Y", uk: "4.5", cm: 23.5 },
    { eu: "38", us: "5.5Y", uk: "5", cm: 24 },
  ],
};

export const CHART_LABEL: Record<SizeChart, string> = { men: "Men's", women: "Women's", kids: "Kids'" };

/** Tabel default untuk gender produk; unisex mulai dari Men's (bisa diganti di picker). */
export const chartFor = (g?: string): SizeChart => (g === "women" ? "women" : g === "kids" ? "kids" : "men");

/** Baris tabel untuk satu ukuran EU; undefined kalau di luar tabel. */
export const sizeRow = (eu: string, chart: SizeChart) => SIZE_CHARTS[chart].find((r) => r.eu === eu);

/** Label ukuran di sistem pilihan, mis. ("42","US","men") → "8.5". EU selalu apa adanya;
 *  sistem lain yang tidak ada di tabel jatuh ke "EU 45" supaya tidak ada tombol kosong. */
export function sizeLabel(eu: string, system: SizeSystem, chart: SizeChart): string {
  if (system === "EU") return eu;
  const row = sizeRow(eu, chart);
  return row ? (system === "US" ? row.us : row.uk) : `EU ${eu}`;
}

/** Ringkasan lengkap untuk teks bantuan & aria-label: "EU 42 · US 8.5 · UK 7.5 · 26.5 cm". */
export function sizeSummary(eu: string, chart: SizeChart): string {
  const row = sizeRow(eu, chart);
  return row ? `EU ${row.eu} · US ${row.us} · UK ${row.uk} · ${row.cm} cm` : `EU ${eu}`;
}
