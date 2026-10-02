"use server";

import { revalidatePath } from "next/cache";
import { createOrder } from "../admin/store";
import { nextStoreRun } from "./store-run";

export type RequestState =
  | { ok: true; id: string; cutoff: string }
  | { ok: false; errors: Partial<Record<string, string>> }
  | null;

const str = (f: FormData, k: string, max = 200) => String(f.get(k) ?? "").trim().slice(0, max);

/** Form publik → request tersimpan ke DB dengan status "baru" (PRD 6.1). */
export async function submitRequestAction(_: RequestState, f: FormData): Promise<RequestState> {
  // Honeypot: bot ngisi semua field. ponytail: ganti Cloudflare Turnstile (PRD 7.3) kalau spam lolos.
  if (str(f, "website")) return { ok: true, id: "—", cutoff: nextStoreRun().cutoff.toISOString() };

  const input = {
    nama: str(f, "nama", 80),
    wa: str(f, "wa", 20).replace(/[^\d+]/g, ""),
    kota: str(f, "kota", 80),
    item: str(f, "item"),
    ukuran: str(f, "ukuran", 20),
    kakiCm: Number(str(f, "kakiCm", 5)) || undefined,
    referensi: str(f, "referensi", 500) || undefined,
    catatan: str(f, "catatan", 1000) || undefined,
    estimasi: Number(str(f, "harga", 12)) || 0,
    delivery: str(f, "delivery") === "kirim" ? ("kirim" as const) : ("cod" as const),
  };

  const errors: Record<string, string> = {};
  if (!input.nama) errors.nama = "Tell us your name.";
  if (!/^\+?\d{9,15}$/.test(input.wa)) errors.wa = "Use a valid WhatsApp number, e.g. 0812xxxxxxx.";
  if (!input.kota) errors.kota = "We need your city to plan delivery.";
  if (!input.item) errors.item = "Which pair should we look for?";
  if (!input.ukuran) errors.ukuran = "Pick or type a size.";
  if (input.estimasi < 50_000 || input.estimasi > 100_000_000) errors.harga = "Enter a rough price from Rp50,000.";
  if (f.get("consent") !== "on") errors.consent = "Please agree to the privacy policy so we can store your request.";
  if (Object.keys(errors).length) return { ok: false, errors };

  const run = nextStoreRun();
  const order = await createOrder({ ...input, store: "-", storeRun: run.cutoff.toISOString() });
  revalidatePath("/admin", "layout");
  return { ok: true, id: order.id, cutoff: run.cutoff.toISOString() };
}
