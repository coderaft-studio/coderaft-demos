import Image from "next/image";
const photos = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", alt: "Pernikahan Garden", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80", alt: "Dekorasi Pelaminan", span: "" },
  { src: "https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=400&q=80", alt: "Meja Perjamuan", span: "" },
  { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&q=80", alt: "Momen Bahagia", span: "" },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&q=80", alt: "Detail Bunga", span: "" },
  { src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600&q=80", alt: "Resepsi Outdoor", span: "col-span-2" },
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
