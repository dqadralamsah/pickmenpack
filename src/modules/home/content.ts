// Copy landing page — ditarik apa adanya dari vault "03. Landing Page Content —
// PickmenPack" v0.1 (Section 3–5, 6.2). Mau ubah teks? Ubah dokumennya dulu.
// Placeholder {runDate} dkk. diisi dari nextStoreRun() (src/modules/request/store-run.ts).

export const homeContent = {
  why: {
    title: "Why PickmenPack",
    subtitle: "Your personal shopper at the mall",
    items: [
      { key: "official", title: "Straight from the store", body: "Official counters only — never resellers or grey stock." },
      { key: "prices", title: "Real mall prices", body: "Weekly in-store deals, passed on to you as they are." },
      { key: "checked", title: "Checked & photographed", body: "Every pair inspected in person, with photos before packing." },
      { key: "delivery", title: "Safe delivery", body: "COD around Tangerang – Jakarta, or tracked courier nationwide." },
    ],
  },
  howItWorks: {
    title: "How it works",
    subtitle: "Check first, pay once — one mall run every Saturday",
    banner: {
      open: "Requests open · Next run: {runDate} · Cutoff {cutoffDate}, 23.59 WIB",
      closed: "This week's cutoff has passed · Your request joins the run on {runDate}",
    },
    steps: [
      { key: "request", title: "Request", date: "until {cutoffDate}, 23.59", body: "Pick from the shop or describe the pair you want. Late requests join next week's run." },
      { key: "price", title: "Get the exact price", date: "{priceDate}, evening", body: "We check stock and price with the store, then send your final total on WhatsApp." },
      { key: "pay", title: "Pay once, in full", date: "by {runDate}, 09.00", body: "No deposit. Not ready? Skip to next week — free." },
      { key: "shop", title: "We shop & pack", date: "{runDate}", body: "Bought in person, checked, photographed, packed." },
      { key: "deliver", title: "Get your pair", date: "{shipDate} (or Mon)", body: "COD or courier — tracking sent on WhatsApp." },
    ],
  },
  pricing: {
    title: "Pricing",
    subtitle: "Exactly what you pay, and why",
    items: [
      { key: "perItem", title: "Your item, your price", body: "Each item is billed at the store discount that applies to it — nothing averaged across other orders." },
      { key: "fee", title: "Fee on top, shown upfront", body: "Service fee from Rp25k per item, added to the net price. You see both before paying." },
      { key: "locked", title: "Locked once you pay", body: "The total we send on Friday never goes up after you transfer." },
      { key: "receipt", title: "Why no original receipt", body: "One till receipt covers several customers, so you get a written per-item breakdown instead." },
    ],
  },
} as const;

/** Isi {runDate}, {cutoffDate}, dst. di string copy. */
export const fill = (text: string, dates: Record<string, string>) =>
  text.replace(/\{(\w+)\}/g, (m, k: string) => dates[k] ?? m);
