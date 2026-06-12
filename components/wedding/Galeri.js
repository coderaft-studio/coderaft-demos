import Image from "next/image";
const photos = [
  { src: "/demo/wedding/hero.jpg", alt: "Pernikahan Garden", span: "col-span-2 row-span-2" },
  { src: "/demo/wedding/galeri2.jpg", alt: "Dekorasi Pelaminan", span: "" },
  { src: "/demo/wedding/galeri3.jpg", alt: "Meja Perjamuan", span: "" },
  { src: "/demo/wedding/galeri4.jpg", alt: "Momen Bahagia", span: "" },
  { src: "/demo/wedding/galeri5.jpg", alt: "Detail Bunga", span: "" },
  { src: "/demo/wedding/galeri6.jpg", alt: "Resepsi Outdoor", span: "col-span-2" },
];
export default function Galeri() {
  return (
    <section id="galeri" className="py-24 bg-rose-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-3">Karya Kami</p>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Galeri <span className="text-rose-500">Pernikahan</span></h2>
          <p className="text-slate-500 max-w-xl mx-auto">Setiap momen diabadikan dengan penuh cinta</p>
        </div>
        <div className="grid grid-cols-4 gap-4 auto-rows-48">
          {photos.map(p => (
            <div key={p.alt} className={`relative rounded-2xl overflow-hidden group ${p.span}`} style={{ height: p.span.includes("row-span-2") ? "390px" : "185px" }}>
              <Image src={p.src} alt={p.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
