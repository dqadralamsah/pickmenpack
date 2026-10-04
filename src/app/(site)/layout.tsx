import { SiteHeader } from "@/components/layout/site/site-header";
import { SiteFooter } from "@/components/layout/site/site-footer";
import { BottomNav } from "@/components/layout/site/bottom-nav";
import { SkipLink } from "@/components/shared/skip-link";
import { AnnouncementBar } from "@/components/layout/site/announcement-bar";
import { FloatingWhatsApp } from "@/components/layout/site/floating-whatsapp";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    /* pb-20 di mobile: ruang untuk bottom nav yang fixed */
    <div className="flex min-h-full flex-col pb-20 md:pb-0">
      <SkipLink />
      <AnnouncementBar />
      <SiteHeader />
      <main id="konten" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <BottomNav />
      <FloatingWhatsApp />
    </div>
  );
}
