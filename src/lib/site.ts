export const site = {
  brand: "PickmenPack",
  short: "PMP",
  tagline: "Jastip sepatu langsung dari counter resmi Mall JPO",
  waNumber: "6281234567890", // dummy
  instagram: "@pickmenpack",
  jamOperasional: "Setiap hari, 10.00–20.00 WIB",
};

export const waLink = (text: string) =>
  `https://wa.me/${site.waNumber}?text=${encodeURIComponent(text)}`;
