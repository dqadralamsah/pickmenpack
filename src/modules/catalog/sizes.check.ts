// Tes manual konversi ukuran: node --experimental-strip-types src/modules/catalog/sizes.check.ts
import assert from "node:assert/strict";
import { SIZE_CHARTS, chartFor, sizeLabel, sizeSummary } from "./sizes.ts";

assert.equal(sizeLabel("42", "EU", "men"), "42");
assert.equal(sizeLabel("42", "US", "men"), "8.5");
assert.equal(sizeLabel("42", "UK", "men"), "7.5");
assert.equal(sizeLabel("42", "US", "women"), "10");
// Di luar tabel → tetap ada label, bukan string kosong.
assert.equal(sizeLabel("47", "US", "men"), "EU 47");
assert.equal(sizeSummary("40", "women"), "EU 40 · US 8.5 · UK 6 · 25.5 cm");
assert.equal(sizeSummary("47", "men"), "EU 47");

assert.equal(sizeLabel("33", "US", "kids"), "1Y");
assert.equal(chartFor("kids"), "kids");
assert.equal(chartFor("unisex"), "men");

// Tabel harus naik terus (EU, cm; US untuk dewasa — US anak pakai C/Y) — salah
// ketik satu baris langsung ketahuan.
for (const [chart, rows] of Object.entries(SIZE_CHARTS)) {
  for (let i = 1; i < rows.length; i++) {
    assert.ok(Number(rows[i].eu) > Number(rows[i - 1].eu), `${chart} EU ${rows[i].eu}`);
    assert.ok(rows[i].cm > rows[i - 1].cm, `${chart} cm ${rows[i].cm}`);
    if (chart !== "kids") assert.ok(Number(rows[i].us) > Number(rows[i - 1].us), `${chart} US ${rows[i].us}`);
  }
}

console.log("sizes.check ok");
