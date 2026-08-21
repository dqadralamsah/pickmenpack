import type { Metadata } from "next";
import { deleteFaqAction, saveFaqAction } from "@/modules/admin/actions";
import { faqDb, type FaqItem } from "@/modules/admin/store";
import {
  PageHeader,
  btnDanger,
  btnPrimary,
  card,
  field,
  label,
} from "@/modules/admin/ui";

export const metadata: Metadata = { title: "FAQ" };

function FaqForm({ f }: { f?: FaqItem }) {
  const key = f?.id ?? "baru";
  return (
    <form action={saveFaqAction} className="space-y-3">
      <input type="hidden" name="id" value={f?.id ?? ""} />
      <div>
        <label className={label} htmlFor={`q-${key}`}>
          Pertanyaan
        </label>
        <input
          id={`q-${key}`}
          name="q"
          required
          defaultValue={f?.q}
          placeholder="Bayarnya gimana?"
          className={field}
        />
      </div>
      <div>
        <label className={label} htmlFor={`a-${key}`}>
          Jawaban
        </label>
        <textarea
          id={`a-${key}`}
          name="a"
          rows={4}
          required
          defaultValue={f?.a}
          placeholder="Jawaban singkat, bahasa sehari-hari."
          className={field}
        />
      </div>
      <button type="submit" className={btnPrimary}>
        {f ? "Simpan" : "Tambah pertanyaan"}
      </button>
    </form>
  );
}

export default async function AdminFaqPage() {
  const items = await faqDb.list();

  return (
    <>
      <PageHeader
        title="FAQ"
        desc={`${items.length} pertanyaan tampil di halaman FAQ publik.`}
      />

      <details className={`${card} mb-4 p-4 sm:p-5`}>
        <summary className="cursor-pointer text-sm font-medium list-none [&::-webkit-details-marker]:hidden">
          + Tambah pertanyaan
        </summary>
        <div className="mt-4">
          <FaqForm />
        </div>
      </details>

      <div className="space-y-2">
        {items.map((f, i) => (
          <details key={f.id} className={`${card} overflow-hidden`}>
            <summary className="flex cursor-pointer gap-3 px-4 py-3.5 list-none [&::-webkit-details-marker]:hidden sm:px-5">
              <span className="font-mono text-xs text-zinc-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{f.q}</span>
                <span className="mt-1 line-clamp-1 block text-sm text-zinc-500">
                  {f.a}
                </span>
              </span>
            </summary>
            <div className="border-t border-zinc-100 bg-zinc-50/60 px-4 py-4 sm:px-5">
              <FaqForm f={f} />
              <form action={deleteFaqAction} className="mt-3">
                <input type="hidden" name="id" value={f.id} />
                <button type="submit" className={btnDanger}>
                  Hapus pertanyaan
                </button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
