import type { Metadata } from "next";
import { AdminNav } from "@/components/layout/admin/admin-nav";
import { SkipLink } from "@/components/shared/skip-link";
import { requireAdmin } from "@/modules/admin/auth";
import { getSettings } from "@/modules/admin/store";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s · Panel Admin" },
  robots: { index: false, follow: false },
};

export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  await requireAdmin();
  const settings = await getSettings();

  return (
    <div className="min-h-full bg-zinc-50 md:flex">
      <SkipLink />
      <AdminNav brand={settings.brand} />
      <main id="konten" className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto w-full max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
