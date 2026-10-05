// Dummy catalog — replaced by manual Admin updates later (PRD 6.1).

export type Category = "running" | "lifestyle" | "sandals";

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
  /** Rak kategori di Home (CategoryShowcase). Opsional: produk dari admin belum punya. */
  category?: Category;
  /** Path foto di /public; kalau kosong kartu pakai placeholder brand. */
  image?: string;
};

export const products: Product[] = [
  {
    slug: "nike-revolution-7",
    category: "running",
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
    category: "lifestyle",
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
    category: "lifestyle",
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
    category: "lifestyle",
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
    category: "lifestyle",
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
    category: "lifestyle",
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
    category: "running",
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
    category: "running",
    brand: "Skechers",
    name: "Go Walk 6",
    priceOriginal: 799_000,
    pricePromo: 479_000,
    sizes: ["38", "39", "40"],
    store: "Skechers Store",
    stock: "habis",
    accent: "from-zinc-200 to-zinc-300",
  },
  ...dummy([
    // [kategori, brand, nama, harga normal, harga promo, stok]
    ["running", "Nike", "Downshifter 13", 899_000, 629_000],
    ["running", "Nike", "Pegasus 41", 1_999_000, 1_399_000, "limited"],
    ["running", "Adidas", "Duramo SL", 999_000, 699_000],
    ["running", "Adidas", "Runfalcon 5", 849_000, 599_000],
    ["running", "Asics", "Gel-Contend 9", 999_000, 699_000],
    ["running", "Asics", "Novablast 4", 2_199_000, 1_649_000, "limited"],
    ["running", "New Balance", "Fresh Foam 680", 1_299_000, 909_000],
    ["running", "Puma", "Velocity Nitro 3", 1_899_000, 1_329_000],
    ["running", "Skechers", "Max Cushioning", 1_399_000, 979_000],
    ["lifestyle", "Adidas", "Samba OG", 2_200_000, 1_869_000, "limited"],
    ["lifestyle", "Adidas", "Campus 00s", 1_900_000, 1_519_000],
    ["lifestyle", "Nike", "Court Vision Low", 1_099_000, 769_000],
    ["lifestyle", "Converse", "Run Star Hike", 1_599_000, 1_119_000],
    ["lifestyle", "Vans", "Knu Skool", 1_299_000, 909_000],
    ["lifestyle", "Puma", "Palermo", 1_499_000, 1_049_000],
    ["lifestyle", "New Balance", "CT302", 1_599_000, 1_119_000],
    ["sandals", "Adidas", "Adilette Comfort", 599_000, 419_000],
    ["sandals", "Adidas", "Adilette Aqua", 399_000, 279_000],
    ["sandals", "Nike", "Victori One Slide", 449_000, 319_000],
    ["sandals", "Nike", "Calm Slide", 799_000, 559_000, "limited"],
    ["sandals", "Puma", "Leadcat 2.0", 499_000, 349_000],
    ["sandals", "Crocs", "Classic Clog", 799_000, 559_000],
    ["sandals", "Crocs", "Classic Sandal", 549_000, 389_000],
    ["sandals", "Birkenstock", "Arizona EVA", 799_000, 639_000],
    ["sandals", "Havaianas", "Top Flip Flop", 249_000, 179_000],
    ["sandals", "Skechers", "Go Walk Arch Fit Sandal", 899_000, 629_000],
    ["sandals", "New Balance", "Sport Slide 200", 399_000, 279_000],
    ["sandals", "Vans", "La Costa Slide-On", 449_000, 319_000],
  ]),
];

/** Pengisi rak kategori Home selama katalog asli belum diisi dari admin. Hapus
 *  begitu produk nyata cukup (Landing Page Content — gap katalog). */
function dummy(rows: [Category, string, string, number, number, Product["stock"]?][]): Product[] {
  return rows.map(([category, brand, name, priceOriginal, pricePromo, stock = "ready"], i) => ({
    slug: `${brand}-${name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    brand,
    name,
    priceOriginal,
    pricePromo,
    sizes: category === "sandals" ? ["38", "39", "40", "41", "42", "43"] : ["39", "40", "41", "42", "43"],
    store: `${brand} Store`,
    stock,
    accent: i % 2 ? "from-zinc-100 to-zinc-300" : "from-zinc-200 to-zinc-100",
    category,
  }));
}

export const discountPercent = (p: Product) =>
  Math.round((1 - p.pricePromo / p.priceOriginal) * 100);
