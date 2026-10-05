// Dummy testimonials — replaced by real early orders later (PRD 6.1).

export type Testimonial = {
  nama: string;
  kota: string;
  item: string;
  pesan: string;
  highlight?: string;
  /** Ukuran EU yang dibeli, mis. "42". */
  ukuran?: string;
  /** Cara terima barang — "cod" atau "kirim" (kurir). */
  delivery?: "cod" | "kirim";
};

export const testimonials: Testimonial[] = [
  {
    nama: "Rizky A.",
    kota: "Tangerang",
    item: "Nike Revolution 7",
    ukuran: "42",
    delivery: "cod",
    pesan:
      "I got the exact price on Friday night, paid once on Saturday morning, and the pair arrived Sunday with photos of the box before packing. No chasing, no surprises.",
    highlight: "Price confirmed before paying",
  },
  {
    nama: "Dinda P.",
    kota: "Jakarta Selatan",
    item: "New Balance 530",
    ukuran: "38",
    delivery: "cod",
    pesan:
      "Met at the station, we checked the box together, everything sealed and complete. Two days from payment to hand-over.",
  },
  {
    nama: "Bagas W.",
    kota: "Semarang",
    item: "Converse Chuck 70 Hi",
    ukuran: "43",
    delivery: "kirim",
    pesan:
      "Shipped to another city, and I got an unboxing video before packing. Arrived safe, and the shipping cost was clear from the start.",
  },
  {
    nama: "Nadia S.",
    kota: "Tangerang Selatan",
    item: "Puma Suede Classic XXI",
    ukuran: "41",
    delivery: "cod",
    pesan:
      "Size 41 was sold out, and I was told immediately with another colourway plus a photo straight from the shelf. Never left hanging.",
  },
  {
    nama: "Kevin H.",
    kota: "Bandung",
    item: "Adidas Samba OG",
    ukuran: "42",
    delivery: "kirim",
    pesan:
      "Couldn't find my size anywhere online. They checked three stores in one run and found it at the last one. Way cheaper than resellers.",
    highlight: "Found a sold-out size",
  },
  {
    nama: "Salsa R.",
    kota: "Bekasi",
    item: "Asics Gel-1130",
    ukuran: "39",
    delivery: "kirim",
    pesan:
      "The breakdown showed the store price, the discount and the fee line by line. First jastip where I actually understood what I paid for.",
  },
];
