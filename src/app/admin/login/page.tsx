import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { loginAction } from "@/modules/admin/actions";
import { isLoggedIn } from "@/modules/admin/auth";
import { btnPrimary, field, label } from "@/modules/admin/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Masuk Panel Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: PageProps<"/admin/login">) {
  if (await isLoggedIn()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent font-mono text-xs font-medium text-paper">
            {site.short}
          </span>
          <span className="leading-tight text-paper">
            <span className="block font-semibold">{site.brand}</span>
            <span className="block font-mono text-[10px] tracking-[0.18em] text-zinc-400 uppercase">
              Super Admin
            </span>
          </span>
        </div>

        <form action={loginAction} className="rounded-2xl bg-paper p-6">
          <h1 className="text-lg font-semibold">Masuk panel</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Halaman internal. Hanya untuk jastiper/admin.
          </p>

          <div className="mt-5">
            <label className={label} htmlFor="password">
              Password admin
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className={field}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="mt-3 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              Password salah. Coba lagi.
            </p>
          )}

          <button type="submit" className={`${btnPrimary} mt-5 w-full py-2.5`}>
            Masuk
          </button>

          <p className="mt-4 text-xs leading-relaxed text-zinc-500">
            Password diambil dari <code className="font-mono">ADMIN_PASSWORD</code> di
            environment. Kalau belum diset, default development-nya{" "}
            <code className="font-mono">pickmenpack</code>.
          </p>
        </form>
      </div>
    </div>
  );
}
