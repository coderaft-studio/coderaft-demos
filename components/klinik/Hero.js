import Image from "next/image";
export default function Hero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <Image src="/demo/klinik/hero.jpg" alt="Klinik" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-teal-900/65" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        <div>
          <span className="inline-block bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold px-4 py-2 rounded-full mb-6">Klinik Kesehatan Terpercaya</span>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">Kesehatan Anda, <span className="text-teal-300">Prioritas Utama</span> Kami</h1>
          <p className="text-white/80 text-lg leading-relaxed mb-8">Layanan medis profesional dengan dokter spesialis berpengalaman. Periksa kesehatan Anda dengan mudah dan nyaman.</p>
          <div className="flex gap-4">
            <a href="#booking" className="bg-teal-500 hover:bg-teal-400 text-white px-7 py-4 rounded-full font-bold transition-colors">Booking Online</a>
            <a href="#dokter" className="border-2 border-white/50 hover:border-white text-white px-7 py-4 rounded-full font-semibold transition-all">Lihat Dokter</a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[{ num: "50+", label: "Dokter Spesialis" }, { num: "20rb+", label: "Pasien Dilayani" }, { num: "15+", label: "Tahun Berdiri" }].map(s => (
              <div key={s.label}><div className="text-2xl font-bold text-teal-300">{s.num}</div><div className="text-white/70 text-xs mt-1">{s.label}</div></div>
            ))}
          </div>
        </div>
        <div className="hidden md:block bg-white/10 backdrop-blur rounded-3xl p-6 border border-white/20">
          <h3 className="text-white font-bold text-lg mb-4">Jam Operasional</h3>
          {[{ hari: "Senin–Jumat", jam: "07.00–21.00" }, { hari: "Sabtu", jam: "07.00–17.00" }, { hari: "Minggu", jam: "08.00–14.00" }, { hari: "Hari Libur", jam: "08.00–14.00" }].map(h => (
            <div key={h.hari} className="flex justify-between py-2 border-b border-white/10 text-sm">
              <span className="text-white/80">{h.hari}</span>
              <span className="text-teal-300 font-semibold">{h.jam}</span>
            </div>
          ))}
          <a href="#booking" className="mt-5 block text-center bg-teal-500 hover:bg-teal-400 text-white py-3 rounded-xl font-bold transition-colors">Booking Sekarang</a>
        </div>
      </div>
    </section>
  );
}
