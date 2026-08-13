// node --experimental-strip-types src/modules/request/fee.check.ts
import assert from "node:assert/strict";
import { estimateFee, estimateTotal, dpAmount } from "./fee.ts";

// batas tier
assert.deepEqual(estimateFee(499_000), { min: 25_000, max: 35_000 });
assert.deepEqual(estimateFee(500_000), { min: 40_000, max: 60_000 });
assert.deepEqual(estimateFee(1_000_000), { min: 40_000, max: 60_000 });

// > 1jt: persentase hanya menang kalau lebih besar dari Rp75rb
assert.deepEqual(estimateFee(1_100_000), { min: 75_000, max: 77_000 });
assert.deepEqual(estimateFee(3_000_000), { min: 150_000, max: 210_000 });

// total & DP
assert.deepEqual(estimateTotal(800_000, "cod"), { min: 840_000, max: 860_000 });
assert.deepEqual(estimateTotal(800_000, "kirim"), { min: 870_000, max: 915_000 });
assert.equal(dpAmount({ min: 840_000, max: 860_000 }), 430_000);

console.log("fee.check ok");
