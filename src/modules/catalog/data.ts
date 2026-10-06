// Dummy catalog — replaced by manual Admin updates later (PRD 6.1).

export type Category = "running" | "lifestyle" | "sandals" | "apparel";
export type Gender = "men" | "women" | "unisex";

export const CATEGORY_LABEL: Record<Category, string> = {
  running: "Running",
  lifestyle: "Lifestyle & Court",
  sandals: "Sandals & Slides",
  apparel: "Apparel",
};

export const GENDER_LABEL: Record<Gender, string> = { men: "Men", women: "Women", unisex: "Unisex" };

/** Satu warna dari model yang sama. `images` = foto asli (path /public atau URL),
 *  urutan = urutan galeri. Kosong → placeholder siluet diwarnai `hex`. */
export type Colorway = { name: string; hex: string; images?: string[] };

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
  /** Tanpa gender = unisex. */
  gender?: Gender;
  /** Warna yang tersedia; warna pertama = tampilan default di kartu. */
  colors?: Colorway[];
  /** Foto tunggal lama (sebelum ada `colors`); kalau kosong kartu pakai placeholder. */
  image?: string;
};

/** Foto sampul kartu: foto pertama warna pertama, lalu `image` lama. */
export const coverImage = (p: Product) => p.colors?.[0]?.images?.[0] ?? p.image;

export const products: Product[] = [
  {
    slug: "nike-revolution-7",
    gender: "men",
    colors: [
      { name: "Black / White", hex: "#18181b" },
      { name: "White / Pure Platinum", hex: "#f4f4f5" },
      { name: "Midnight Navy", hex: "#1e3a8a" },
    ],
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
    gender: "unisex",
    colors: [
      { name: "Cloud White / Green", hex: "#fafafa" },
      { name: "Core Black", hex: "#18181b" },
    ],
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
    gender: "unisex",
    colors: [
      { name: "Steel Grey", hex: "#a1a1aa" },
      { name: "White / Silver", hex: "#e4e4e7" },
      { name: "Natural Indigo", hex: "#3730a3" },
    ],
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
    gender: "unisex",
    colors: [
      { name: "Black", hex: "#18181b" },
      { name: "Parchment", hex: "#f5f0e1" },
      { name: "Egret", hex: "#ede6d6" },
    ],
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
    gender: "unisex",
    colors: [
      { name: "Black / White", hex: "#18181b" },
      { name: "Navy", hex: "#1e293b" },
      { name: "Checkerboard", hex: "#d4d4d8" },
    ],
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
    gender: "men",
    colors: [
      { name: "Peacoat Navy", hex: "#1e293b" },
      { name: "Red", hex: "#b91c1c" },
      { name: "Black", hex: "#18181b" },
    ],
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
    gender: "women",
    colors: [
      { name: "White / Pure Silver", hex: "#f4f4f5" },
      { name: "Cream / Clay", hex: "#e7d8c4" },
    ],
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
    gender: "women",
    colors: [
      { name: "Grey", hex: "#9ca3af" },
      { name: "Navy", hex: "#1e3a8a" },
    ],
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
    // [kategori, brand, nama, harga normal, harga promo, stok, gender (kosong = unisex)]
    ["running", "Nike", "Downshifter 13", 899_000, 629_000, "ready", "men"],
    ["running", "Nike", "Pegasus 41", 1_999_000, 1_399_000, "limited", "men"],
    ["running", "Adidas", "Duramo SL", 999_000, 699_000, "ready", "men"],
    ["running", "Adidas", "Runfalcon 5", 849_000, 599_000, "ready", "women"],
    ["running", "Asics", "Gel-Contend 9", 999_000, 699_000, "ready", "women"],
    ["running", "Asics", "Novablast 4", 2_199_000, 1_649_000, "limited", "men"],
    ["running", "New Balance", "Fresh Foam 680", 1_299_000, 909_000, "ready", "women"],
    ["running", "Puma", "Velocity Nitro 3", 1_899_000, 1_329_000, "ready", "men"],
    ["running", "Skechers", "Max Cushioning", 1_399_000, 979_000, "ready", "women"],
    ["lifestyle", "Adidas", "Samba OG", 2_200_000, 1_869_000, "limited"],
    ["lifestyle", "Adidas", "Campus 00s", 1_900_000, 1_519_000],
    ["lifestyle", "Nike", "Court Vision Low", 1_099_000, 769_000, "ready", "men"],
    ["lifestyle", "Converse", "Run Star Hike", 1_599_000, 1_119_000],
    ["lifestyle", "Vans", "Knu Skool", 1_299_000, 909_000],
    ["lifestyle", "Puma", "Palermo", 1_499_000, 1_049_000, "ready", "women"],
    ["lifestyle", "New Balance", "CT302", 1_599_000, 1_119_000],
    ["sandals", "Adidas", "Adilette Comfort", 599_000, 419_000],
    ["sandals", "Adidas", "Adilette Aqua", 399_000, 279_000],
    ["sandals", "Nike", "Victori One Slide", 449_000, 319_000],
    ["sandals", "Nike", "Calm Slide", 799_000, 559_000, "limited", "women"],
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
function dummy(rows: [Category, string, string, number, number, Product["stock"]?, Gender?][]): Product[] {
  return rows.map(([category, brand, name, priceOriginal, pricePromo, stock = "ready", gender], i) => ({
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
    gender,
  }));
}

export const discountPercent = (p: Product) =>
  Math.round((1 - p.pricePromo / p.priceOriginal) * 100);
