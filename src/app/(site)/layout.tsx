import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BottomNav } from "@/components/layout/bottom-nav";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    /* pb-20 di mobile: ruang untuk bottom nav yang fixed */
    <div className="flex min-h-full flex-col pb-20 md:pb-0">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
