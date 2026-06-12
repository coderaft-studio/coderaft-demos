import Image from "next/image";
export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image src="/demo/wedding/hero.jpg" alt="Wedding" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-rose-300 tracking-widest uppercase text-sm font-semibold mb-4">Premium Wedding Organizer</p>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
          Wujudkan<br /><span className="text-rose-300">Pernikahan Impian</span><br />Anda
        </h1>
        <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">Setiap momen berharga layak dirayakan dengan sempurna. Kami hadir untuk mewujudkan hari terbahagia dalam hidup Anda.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#paket" className="bg-rose-500 hover:bg-rose-400 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">Lihat Paket</a>
          <a href="#kontak" className="border-2 border-white hover:bg-white hover:text-rose-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all">Konsultasi Gratis</a>
        </div>
        <div className="mt-16 grid grid-cols-3 gap-6 text-white">
          {[{ num: "500+", label: "Pasangan Bahagia" }, { num: "8+", label: "Tahun Pengalaman" }, { num: "4.9★", label: "Rating Google" }].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-rose-300">{s.num}</div>
              <div className="text-sm text-white/70 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
