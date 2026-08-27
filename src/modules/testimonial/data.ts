// Dummy testimonials — replaced by real early orders later (PRD 6.1).

export type Testimonial = {
  nama: string;
  kota: string;
  item: string;
  pesan: string;
  highlight?: string;
};

export const testimonials: Testimonial[] = [
  {
    nama: "Rizky A.",
    kota: "Tangerang",
    item: "Nike Revolution 7",
    pesan:
      "The estimate was around Rp600k, and the store happened to run an extra discount. The difference came back without me asking. That is what earns trust.",
    highlight: "Rp72,000 difference refunded",
  },
  {
    nama: "Dinda P.",
    kota: "Jakarta Selatan",
    item: "New Balance 530",
    pesan:
      "Met at the station, we checked the box together, everything sealed and complete. Two days from deposit to hand-over.",
  },
  {
    nama: "Bagas W.",
    kota: "Semarang",
    item: "Converse Chuck 70",
    pesan:
      "Shipped to another city, and I got an unboxing video before packing. Arrived safe, and the shipping cost was clear from the start.",
  },
  {
    nama: "Nadia S.",
    kota: "Tangerang Selatan",
    item: "Puma Suede Classic",
    pesan:
      "Size 41 was sold out, and I was told immediately with another colourway plus a photo straight from the shelf. Never left hanging.",
  },
];
