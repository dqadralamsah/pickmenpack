export const rupiah = (n: number) => "Rp" + n.toLocaleString("id-ID");

export const tanggal = (iso: string) =>
  new Date(iso).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
