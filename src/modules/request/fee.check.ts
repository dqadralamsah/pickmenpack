// node --experimental-strip-types src/modules/request/fee.check.ts
import assert from "node:assert/strict";
import { estimateFee, estimateTotal } from "./fee.ts";
import { nextStoreRun } from "./store-run.ts";

// batas tier
assert.deepEqual(estimateFee(499_000), { min: 25_000, max: 35_000 });
assert.deepEqual(estimateFee(500_000), { min: 40_000, max: 60_000 });
assert.deepEqual(estimateFee(1_000_000), { min: 40_000, max: 60_000 });
assert.deepEqual(estimateFee(1_000_001), { min: 75_000, max: 75_000 });
assert.deepEqual(estimateFee(2_000_000), { min: 100_000, max: 140_000 });

// total = net + fee + ongkir
assert.deepEqual(estimateTotal(800_000, "cod"), { min: 840_000, max: 860_000 });
assert.deepEqual(estimateTotal(800_000, "kirim"), { min: 870_000, max: 915_000 });

console.log("fee.check ok");

// store run: cutoff Kamis 23.59 WIB (= 16.59 UTC)
const iso = (d: Date) => d.toISOString();
{
  // Senin 5 Okt 2026 10.00 WIB → run minggu ini
  const r = nextStoreRun(new Date("2026-10-05T03:00:00Z"));
  assert.equal(iso(r.cutoff), "2026-10-08T16:59:00.000Z");
  assert.equal(iso(r.payBy), "2026-10-10T02:00:00.000Z"); // Sabtu 09.00 WIB
  assert.equal(iso(r.ship), "2026-10-11T03:00:00.000Z");

  // Kamis 23.30 WIB → masih masuk run minggu ini
  assert.equal(iso(nextStoreRun(new Date("2026-10-08T16:30:00Z")).cutoff), "2026-10-08T16:59:00.000Z");

  // Jumat 00.10 WIB (Kamis 17.10 UTC) → lewat cutoff, ikut minggu depan
  assert.equal(iso(nextStoreRun(new Date("2026-10-08T17:10:00Z")).cutoff), "2026-10-15T16:59:00.000Z");

  console.log("store run ok");
}
