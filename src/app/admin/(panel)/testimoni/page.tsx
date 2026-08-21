import type { Metadata } from "next";
import {
  deleteTestimonialAction,
  saveTestimonialAction,
} from "@/modules/admin/actions";
import { testimonialDb, type TestimonialItem } from "@/modules/admin/store";
import {
  PageHeader,
  btnDanger,
  btnPrimary,
  card,
  field,
  label,
} from "@/modules/admin/ui";

export const metadata: Metadata = { title: "Testimoni" };

function TestimonialForm({ t }: { t?: TestimonialItem }) {
  const key = t?.id ?? "baru";
  const fields = [
    { name: "nama", label: "Nama customer", placeholder: "Rizky A.", value: t?.nama },
    { name: "kota", label: "Kota", placeholder: "Tangerang", value: t?.kota },
    { name: "item", label: "Item", placeholder: "Nike Revolution 7", value: t?.item },
    {
      name: "highlight",
      label: "Highlight (opsional)",
      placeholder: "Selisih Rp72.000 dikembalikan",
      value: t?.highlight,
    },
  ];

  return (
    <form action={saveTestimonialAction} className="space-y-3">
      <input type="hidden" name="id" value={t?.id ?? ""} />
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name}>
            <label className={label} htmlFor={`${f.name}-${key}`}>
              {f.label}
            </label>
            <input
              id={`${f.name}-${key}`}
              name={f.name}
              required={f.name !== "highlight"}
              defaultValue={f.value}
              placeholder={f.placeholder}
              className={field}
            />
          </div>
        ))}
      </div>
      <div>
        <label className={label} htmlFor={`pesan-${key}`}>
          Isi testimoni
        </label>
        <textarea
          id={`pesan-${key}`}
          name="pesan"
          rows={3}
          required
          defaultValue={t?.pesan}
          placeholder="Cerita singkat customer soal pengalaman jastipnya…"
          className={field}
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className={btnPrimary}>
          {t ? "Simpan" : "Tambah testimoni"}
        </button>
      </div>
    </form>
  );
}

export default async function AdminTestimoniPage() {
  const items = await testimonialDb.list();

  return (
    <>
      <PageHeader
        title="Testimoni"
        desc={`${items.length} testimoni tampil di halaman depan.`}
      />

      <details className={`${card} mb-4 p-4 sm:p-5`}>
        <summary className="cursor-pointer text-sm font-medium list-none [&::-webkit-details-marker]:hidden">
          + Tambah testimoni
        </summary>
        <div className="mt-4">
          <TestimonialForm />
        </div>
      </details>

      <div className="space-y-2">
        {items.map((t) => (
          <details key={t.id} className={`${card} overflow-hidden`}>
            <summary className="cursor-pointer px-4 py-3.5 list-none [&::-webkit-details-marker]:hidden sm:px-5">
              <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-sm font-medium">{t.nama}</span>
                <span className="text-xs text-zinc-500">
                  {t.kota} · {t.item}
                </span>
                {t.highlight && (
                  <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">
                    {t.highlight}
                  </span>
                )}
              </span>
              <span className="mt-1.5 line-clamp-1 block text-sm text-zinc-600">
                {t.pesan}
              </span>
            </summary>
            <div className="border-t border-zinc-100 bg-zinc-50/60 px-4 py-4 sm:px-5">
              <TestimonialForm t={t} />
              <form action={deleteTestimonialAction} className="mt-3">
                <input type="hidden" name="id" value={t.id} />
                <button type="submit" className={btnDanger}>
                  Hapus testimoni
                </button>
              </form>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
