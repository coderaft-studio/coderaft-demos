const layanan = [
  { icon: "💒", title: "Full Wedding Organizer", desc: "Kami tangani semua detail dari awal hingga akhir — venue, catering, dekorasi, dokumentasi, entertainment." },
  { icon: "🎨", title: "Dekorasi & Florist", desc: "Tim dekorator berpengalaman dengan ribuan pilihan bunga segar dan konsep dekorasi yang bisa dikustomisasi." },
  { icon: "📸", title: "Foto & Video", desc: "Tim fotografer & videografer profesional yang menangkap setiap momen berharga dengan kualitas sinematik." },
  { icon: "🍽", title: "Catering Premium", desc: "Pilihan menu dari masakan Indonesia hingga internasional dengan penyajian buffet atau plated service." },
  { icon: "🎵", title: "Entertainment", desc: "Live band, DJ, MC profesional, tari tradisional — lengkapi momen dengan hiburan yang berkesan." },
  { icon: "🚌", title: "Transportasi", desc: "Armada kendaraan pengantin premium, shuttle tamu, dan koordinasi transportasi hari H." },
];

export default function Layanan() {
  return (
    <section id="layanan" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-3">Yang Kami Lakukan</p>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Layanan <span className="text-rose-500">Lengkap</span> Kami</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Satu stop solution untuk pernikahan impian Anda</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {layanan.map(l => (
            <div key={l.title} className="group p-7 rounded-2xl border border-rose-100 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-100 transition-all hover:-translate-y-1">
              <div className="text-4xl mb-4">{l.icon}</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-rose-600 transition-colors">{l.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
