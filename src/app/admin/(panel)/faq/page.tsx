import type { Metadata } from "next";
import { deleteFaqAction, saveFaqAction } from "@/modules/admin/actions";
import { faqDb, type FaqItem } from "@/modules/admin/store";
import { PageHeader } from "@/components/shared/page-header";
import { Chevron } from "@/components/shared/chevron";
import {
  btnDanger,
  btnPrimary,
  card,
  disclosureBody,
  field,
  label,
  summaryRow,
} from "@/lib/ui";

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

      <details className={`${card} group mb-4 p-4 sm:p-5`}>
        <summary className="flex list-none items-center justify-between gap-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2">
            <span
              aria-hidden
              className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-paper"
            >
              +
            </span>
            Tambah pertanyaan
          </span>
          <Chevron />
        </summary>
        <div className="mt-4">
          <FaqForm />
        </div>
      </details>

      <div className="space-y-2">
        {items.map((f, i) => (
          <details key={f.id} className={`${card} overflow-hidden`}>
            <summary className={summaryRow}>
              <span className="font-mono text-xs text-zinc-600">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{f.q}</span>
                <span className="mt-1 line-clamp-1 block text-sm text-zinc-600">
                  {f.a}
                </span>
              </span>
              <Chevron />
            </summary>
            <div className={disclosureBody}>
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
