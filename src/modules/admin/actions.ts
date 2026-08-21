"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, signIn, signOut } from "./auth";
import {
  faqDb,
  productDb,
  saveSettings,
  testimonialDb,
  updateOrder,
  type FaqItem,
  type ProductItem,
  type TestimonialItem,
} from "./store";
import type { OrderStatus } from "./types";

const str = (f: FormData, k: string) => String(f.get(k) ?? "").trim();
const num = (f: FormData, k: string) => Number(str(f, k).replace(/\D/g, "")) || 0;
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Setiap mutasi lewat sini: cek sesi dulu, baru refresh halaman admin. */
async function mutate(run: () => Promise<unknown>, path = "/admin") {
  await requireAdmin();
  await run();
  revalidatePath(path);
}

/* ---------- Auth ---------- */

export async function loginAction(formData: FormData) {
  const ok = await signIn(str(formData, "password"));
  redirect(ok ? "/admin" : "/admin/login?error=1");
}

export async function logoutAction() {
  await signOut();
  redirect("/admin/login");
}

/* ---------- Orders ---------- */

export async function setOrderStatusAction(formData: FormData) {
  const status = str(formData, "status") as OrderStatus;
  await mutate(
    () => updateOrder(str(formData, "id"), { status }),
    "/admin/pesanan",
  );
}

export async function saveOrderAction(formData: FormData) {
  const netFinal = num(formData, "netFinal");
  await mutate(
    () =>
      updateOrder(str(formData, "id"), {
        status: str(formData, "status") as OrderStatus,
        netFinal: netFinal || null,
        catatan: str(formData, "catatan") || undefined,
      }),
    "/admin/pesanan",
  );
}

/* ---------- Katalog ---------- */

export async function saveProductAction(formData: FormData) {
  const brand = str(formData, "brand");
  const name = str(formData, "name");
  const id = str(formData, "id") || slugify(`${brand}-${name}`);
  const row: ProductItem = {
    id,
    slug: id,
    brand,
    name,
    priceOriginal: num(formData, "priceOriginal"),
    pricePromo: num(formData, "pricePromo"),
    sizes: str(formData, "sizes").split(/[,\s]+/).filter(Boolean),
    store: str(formData, "store"),
    stock: str(formData, "stock") as ProductItem["stock"],
    accent: str(formData, "accent") || "from-zinc-100 to-zinc-300",
  };
  await mutate(() => productDb.save(row), "/admin/katalog");
}

export async function deleteProductAction(formData: FormData) {
  await mutate(() => productDb.remove(str(formData, "id")), "/admin/katalog");
}

/* ---------- Testimoni ---------- */

export async function saveTestimonialAction(formData: FormData) {
  const row: TestimonialItem = {
    id: str(formData, "id") || `tst-${Date.now()}`,
    nama: str(formData, "nama"),
    kota: str(formData, "kota"),
    item: str(formData, "item"),
    pesan: str(formData, "pesan"),
    highlight: str(formData, "highlight") || undefined,
  };
  await mutate(() => testimonialDb.save(row), "/admin/testimoni");
}

export async function deleteTestimonialAction(formData: FormData) {
  await mutate(() => testimonialDb.remove(str(formData, "id")), "/admin/testimoni");
}

/* ---------- FAQ ---------- */

export async function saveFaqAction(formData: FormData) {
  const row: FaqItem = {
    id: str(formData, "id") || `faq-${Date.now()}`,
    q: str(formData, "q"),
    a: str(formData, "a"),
  };
  await mutate(() => faqDb.save(row), "/admin/faq");
}

export async function deleteFaqAction(formData: FormData) {
  await mutate(() => faqDb.remove(str(formData, "id")), "/admin/faq");
}

/* ---------- Pengaturan ---------- */

export async function saveSettingsAction(formData: FormData) {
  const banks = formData.getAll("bank").map(String);
  await mutate(
    () =>
      saveSettings({
        brand: str(formData, "brand"),
        waNumber: str(formData, "waNumber"),
        instagram: str(formData, "instagram"),
        jamOperasional: str(formData, "jamOperasional"),
        accounts: banks.map((bank, i) => ({
          bank: bank.trim(),
          nomor: String(formData.getAll("nomor")[i] ?? "").trim(),
          atasNama: String(formData.getAll("atasNama")[i] ?? "").trim(),
        })),
      }),
    "/admin/pengaturan",
  );
}
