// Siklus mingguan (Business Operations Section 2, PRD 5.8): cutoff Kamis 23.59,
// cek harga Jumat sore, batas transfer Sabtu 09.00, belanja Sabtu, kirim Minggu/Senin.
// Semua jam dihitung di WIB (UTC+7, tanpa DST) supaya hasilnya sama di server mana pun.

const WIB = 7 * 3_600_000;
const DAY = 86_400_000;

export type StoreRun = {
  cutoff: Date; // Kamis 23.59 WIB
  quote: Date; // Jumat malam — harga final dikirim
  payBy: Date; // Sabtu 09.00 WIB
  shop: Date; // Sabtu
  ship: Date; // Minggu (fallback Senin)
};

/** Store run yang masih menerima request pada waktu `now`. */
export function nextStoreRun(now = new Date()): StoreRun {
  const wib = new Date(now.getTime() + WIB);
  const startOfDay = Date.UTC(wib.getUTCFullYear(), wib.getUTCMonth(), wib.getUTCDate()) - WIB;
  const daysToThu = (4 - wib.getUTCDay() + 7) % 7; // 4 = Kamis
  let thu = startOfDay + daysToThu * DAY;
  if (now.getTime() > thu + (23 * 60 + 59) * 60_000) thu += 7 * DAY; // Kamis 23.59 lewat
  const at = (dayOffset: number, h: number, m = 0) =>
    new Date(thu + dayOffset * DAY + (h * 60 + m) * 60_000);

  return {
    cutoff: at(0, 23, 59),
    quote: at(1, 19),
    payBy: at(2, 9),
    shop: at(2, 10),
    ship: at(3, 10),
  };
}

const fmt = (opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jakarta", ...opts });

export const runDay = (d: Date) => fmt({ weekday: "short", day: "numeric", month: "short" }).format(d);
export const runTime = (d: Date) => fmt({ hour: "2-digit", minute: "2-digit" }).format(d).replace(":", ".");
