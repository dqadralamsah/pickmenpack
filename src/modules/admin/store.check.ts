// DB_PATH=:memory: node --experimental-strip-types src/modules/admin/store.check.ts
import assert from "node:assert/strict";
process.env.DB_PATH ??= ":memory:";
const {
  faqDb,
  getStats,
  listOrders,
  orderMoney,
  productDb,
  updateOrder,
  createOrder,
  getSettings,
  saveSettings,
} = await import("./store.ts");

// filter status & pencarian
assert.equal((await listOrders({ status: "semua" })).length, 16);
assert.ok((await listOrders({ status: "baru" })).every((o) => o.status === "baru"));
assert.equal((await listOrders({ q: "semarang" })).length, 1);
assert.equal((await listOrders({ q: "PMP-0814" })).length, 2);

// urut terbaru duluan
const urut = await listOrders();
assert.ok(urut[0].createdAt >= urut.at(-1)!.createdAt);

// uang: sebelum dicek pakai estimasi, sesudah dicek pakai harga net pasti
const belum = (await listOrders({ q: "PMP-0821-016" }))[0];
assert.equal(orderMoney(belum).net, belum.estimasi);
assert.equal(orderMoney(belum).confirmed, false);

const sudah = (await listOrders({ q: "PMP-0819-012" }))[0];
assert.equal(orderMoney(sudah).net, 612_000);
assert.equal(orderMoney(sudah).confirmed, true);

// update order kebaca di listing berikutnya
await updateOrder("PMP-0821-016", { status: "dikonfirmasi", netFinal: 520_000 });
const after = (await listOrders({ q: "PMP-0821-016" }))[0];
assert.equal(after.status, "dikonfirmasi");
assert.equal(orderMoney(after).net, 520_000);

// stats: sebaran status selalu berjumlah total, konversi = terbayar / total (PRD 8)
const s = await getStats();
assert.equal(Object.values(s.perStatus).reduce((a, b) => a + b, 0), s.total);
assert.equal(s.perStatus.dikonfirmasi, 2);
assert.equal(s.harian.length, 7);
assert.equal(s.konversi, Math.round((s.dibayar / s.total) * 100));

// request dari form publik masuk sebagai "baru", tampil paling atas, ID urut per hari
const a = await createOrder({ nama: "Tes", wa: "0812", kota: "Tangerang", item: "Nike", ukuran: "42", store: "-", estimasi: 600_000, delivery: "cod" });
const b = await createOrder({ nama: "Tes 2", wa: "0813", kota: "Bandung", item: "Vans", ukuran: "40", store: "-", estimasi: 700_000, delivery: "kirim" });
assert.equal(a.status, "baru");
assert.equal(a.netFinal, null);
assert.match(a.id, /^PMP-\d{4}-\d{3}$/);
assert.notEqual(a.id, b.id);
assert.equal((await listOrders())[0].id, b.id);
assert.equal((await listOrders({ status: "semua" })).length, 18);

// settings tersimpan
await saveSettings({ waNumber: "6280000000000" });
assert.equal((await getSettings()).waNumber, "6280000000000");
assert.equal((await getSettings()).accounts.length, 3);

// collection: save = upsert, remove = hapus
const jumlahAwal = (await productDb.list()).length;
await productDb.save({
  id: "test-sepatu",
  slug: "test-sepatu",
  brand: "Test",
  name: "Sepatu",
  priceOriginal: 100_000,
  pricePromo: 80_000,
  sizes: ["40"],
  store: "Test Store",
  stock: "ready",
  accent: "from-zinc-100 to-zinc-300",
});
assert.equal((await productDb.list()).length, jumlahAwal + 1);
await productDb.save({ ...(await productDb.find("test-sepatu"))!, name: "Sepatu v2" });
assert.equal((await productDb.list()).length, jumlahAwal + 1); // update, bukan duplikat
assert.equal((await productDb.find("test-sepatu"))!.name, "Sepatu v2");
await productDb.remove("test-sepatu");
assert.equal((await productDb.list()).length, jumlahAwal);
assert.equal(await productDb.find("test-sepatu"), undefined);

// id seed FAQ stabil
assert.equal((await faqDb.list())[0].id, "faq-1");

console.log("store.check ok");
