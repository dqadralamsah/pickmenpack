// node --experimental-strip-types src/modules/admin/store.check.ts
import assert from "node:assert/strict";
import {
  faqDb,
  getStats,
  listOrders,
  orderMoney,
  productDb,
  updateOrder,
} from "./store.ts";

// filter status & pencarian
assert.equal((await listOrders({ status: "semua" })).length, 16);
assert.ok((await listOrders({ status: "baru" })).every((o) => o.status === "baru"));
assert.equal((await listOrders({ q: "semarang" })).length, 1);
assert.equal((await listOrders({ q: "PMP-0814" })).length, 2);

// urut terbaru duluan
const urut = await listOrders();
assert.ok(urut[0].createdAt >= urut.at(-1)!.createdAt);

// uang: sebelum dibeli pakai estimasi, sesudah dibeli pakai harga net aktual
const belum = (await listOrders({ q: "PMP-0821-016" }))[0];
assert.equal(orderMoney(belum).net, belum.estimasi);
assert.equal(orderMoney(belum).selisih, 0);

const sudah = (await listOrders({ q: "PMP-0819-012" }))[0];
assert.equal(orderMoney(sudah).net, 612_000);
assert.equal(orderMoney(sudah).selisih, -48_000); // lebih murah → balikin ke customer
// DP tetap dihitung dari estimasi awal, bukan harga net final
assert.equal(orderMoney(sudah).dp, orderMoney({ ...sudah, netFinal: null }).dp);

// update order kebaca di listing berikutnya
await updateOrder("PMP-0821-016", { status: "dp", netFinal: 520_000 });
const after = (await listOrders({ q: "PMP-0821-016" }))[0];
assert.equal(after.status, "dp");
assert.equal(orderMoney(after).selisih, -19_000);

// stats ikut berubah, dan sebaran status selalu berjumlah total
const s = await getStats();
assert.equal(
  Object.values(s.perStatus).reduce((a, b) => a + b, 0),
  s.total,
);
assert.equal(s.perStatus.dp, 3);
assert.equal(s.harian.length, 7);
assert.equal(s.konversi, Math.round((s.selesai / s.total) * 100));

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
