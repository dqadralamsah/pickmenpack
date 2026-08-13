// Dummy testimoni — nanti diisi dari order-order awal (PRD 6.1).

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
      "Estimasi awal Rp600rb-an, ternyata pas di toko lagi diskon tambahan. Selisihnya dibalikin tanpa disuruh. Ini yang bikin percaya.",
    highlight: "Selisih Rp72.000 dikembalikan",
  },
  {
    nama: "Dinda P.",
    kota: "Jakarta Selatan",
    item: "New Balance 530",
    pesan:
      "COD-an di stasiun, barang dicek bareng, box masih rapi lengkap struk dari counter. Prosesnya cuma 2 hari dari DP.",
  },
  {
    nama: "Bagas W.",
    kota: "Semarang",
    item: "Converse Chuck 70",
    pesan:
      "Dikirim luar kota, sebelum packing dikasih video unboxing dulu. Sampai aman, ongkirnya juga transparan dari awal.",
  },
  {
    nama: "Nadia S.",
    kota: "Tangerang Selatan",
    item: "Puma Suede Classic",
    pesan:
      "Ukuran 41 habis, langsung dikabarin dan ditawarin alternatif warna lain plus foto langsung dari raknya. Gak digantung.",
  },
];
