// Dummy catalog — replaced by manual Admin updates later (PRD 6.1).

export type Product = {
  slug: string;
  brand: string;
  name: string;
  priceOriginal: number;
  pricePromo: number;
  sizes: string[];
  store: string;
  stock: "ready" | "limited" | "habis";
  accent: string;
  /** Path foto di /public; kalau kosong kartu pakai placeholder brand. */
  image?: string;
};

export const products: Product[] = [
  {
    slug: "nike-revolution-7",
    brand: "Nike",
    name: "Revolution 7",
    priceOriginal: 899_000,
    pricePromo: 539_000,
    sizes: ["39", "40", "41", "42", "43"],
    store: "Nike Store",
    stock: "ready",
    accent: "from-zinc-100 to-zinc-300",
  },
  {
    slug: "adidas-grand-court",
    brand: "Adidas",
    name: "Grand Court 2.0",
    priceOriginal: 1_100_000,
    pricePromo: 660_000,
    sizes: ["40", "41", "42", "44"],
    store: "Adidas Originals Store",
    stock: "ready",
    accent: "from-zinc-200 to-zinc-100",
  },
  {
    slug: "new-balance-530",
    brand: "New Balance",
    name: "530 Steel Grey",
    priceOriginal: 1_899_000,
    pricePromo: 1_329_000,
    sizes: ["40", "41", "42"],
    store: "New Balance Official",
    stock: "limited",
    accent: "from-zinc-100 to-zinc-200",
  },
  {
    slug: "converse-chuck-70",
    brand: "Converse",
    name: "Chuck 70 Hi",
    priceOriginal: 1_299_000,
    pricePromo: 909_000,
    sizes: ["38", "39", "40", "41", "42", "43"],
    store: "Converse Store",
    stock: "ready",
    accent: "from-zinc-200 to-zinc-300",
  },
  {
    slug: "vans-old-skool",
    brand: "Vans",
    name: "Old Skool Classic",
    priceOriginal: 1_099_000,
    pricePromo: 769_000,
    sizes: ["39", "40", "41", "42"],
    store: "Vans Store",
    stock: "limited",
    accent: "from-zinc-100 to-zinc-300",
  },
  {
    slug: "puma-suede-classic",
    brand: "Puma",
    name: "Suede Classic XXI",
    priceOriginal: 1_249_000,
    pricePromo: 749_000,
    sizes: ["40", "41", "42", "43", "44"],
    store: "Puma Store",
    stock: "ready",
    accent: "from-zinc-200 to-zinc-100",
  },
  {
    slug: "asics-gel-1130",
    brand: "Asics",
    name: "Gel-1130",
    priceOriginal: 2_199_000,
    pricePromo: 1_539_000,
    sizes: ["41", "42", "43"],
    store: "Asics Store",
    stock: "limited",
    accent: "from-zinc-100 to-zinc-200",
  },
  {
    slug: "skechers-go-walk",
    brand: "Skechers",
    name: "Go Walk 6",
    priceOriginal: 799_000,
    pricePromo: 479_000,
    sizes: ["38", "39", "40"],
    store: "Skechers Store",
    stock: "habis",
    accent: "from-zinc-200 to-zinc-300",
  },
];

export const discountPercent = (p: Product) =>
  Math.round((1 - p.pricePromo / p.priceOriginal) * 100);
