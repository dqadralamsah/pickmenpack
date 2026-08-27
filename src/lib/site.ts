export const site = {
  brand: "PickmenPack",
  short: "PMP",
  tagline: "Personal shopper for sneakers, straight from official stores",
  waNumber: "6281234567890", // dummy
  instagram: "@pickmenpack",
  hours: "Every day, 10.00–20.00 WIB",
  serviceArea: "Tangerang – Jakarta",
};

export const waLink = (text: string) =>
  `https://wa.me/${site.waNumber}?text=${encodeURIComponent(text)}`;
