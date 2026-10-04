import type { Metadata, Viewport } from "next";
import { Geist_Mono, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Design system "Clean Commerce": Outfit untuk judul, Plus Jakarta Sans untuk teks.
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

// Mono cuma untuk ID pesanan & nomor rekening.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.brand} — ${site.tagline}`,
    template: `%s · ${site.brand}`,
  },
  description:
    "We buy your sneakers, slides and apparel at the official store and hand them over. Exact price confirmed before you pay, no deposit, weekly store run.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
