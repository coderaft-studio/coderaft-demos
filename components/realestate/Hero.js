import Image from "next/image";
export default function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <Image src="/demo/realestate/hero.jpg" alt="Luxury Property" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-slate-950/40" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <p className="text-amber-400 tracking-widest uppercase text-sm font-semibold mb-4">Premium Real Estate</p>
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 max-w-2xl">
          Temukan Rumah <span className="text-amber-400">Impian</span> Anda
        </h1>
        <p className="text-white/70 text-lg mb-10 max-w-xl">Ratusan pilihan properti premium di lokasi strategis. Beli, jual, atau sewa dengan bantuan agen terpercaya kami.</p>
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 max-w-2xl">
          <select className="flex-1 bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 text-sm outline-none">
            <option>Jenis Properti</option>
            {["Rumah", "Apartemen", "Ruko", "Tanah", "Villa"].map(o => <option key={o}>{o}</option>)}
          </select>
          <select className="flex-1 bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 text-sm outline-none">
            <option>Lokasi</option>
            {["Jakarta Selatan", "Jakarta Barat", "Tangerang", "Bekasi", "Depok", "Bogor"].map(o => <option key={o}>{o}</option>)}
          </select>
          <select className="flex-1 bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3 text-sm outline-none">
            <option>Harga</option>
            {["< 500 jt", "500 jt – 1 M", "1 M – 3 M", "3 M – 5 M", "> 5 M"].map(o => <option key={o}>{o}</option>)}
          </select>
          <a href="#listing" className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap">🔍 Cari</a>
        </div>
        <div className="mt-10 flex gap-8 text-white">
          {[{ num: "1.200+", label: "Properti Tersedia" }, { num: "850+", label: "Klien Puas" }, { num: "10+", label: "Tahun Pengalaman" }].map(s => (
            <div key={s.label}><div className="text-2xl font-bold text-amber-400">{s.num}</div><div className="text-white/60 text-xs mt-1">{s.label}</div></div>
          ))}
        </div>
      </div>
    </section>
  );
}
