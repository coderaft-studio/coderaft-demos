const pakets = [
  {
    nama: "Silver", harga: "25.000.000", highlight: false,
    desc: "Untuk pernikahan intimate dan sederhana namun berkesan",
    fitur: ["Koordinator hari H", "Dekorasi akad & resepsi", "Foto 8 jam (1 fotografer)", "MC profesional", "Koordinasi catering", "Vendor list rekomendasi"],
  },
  {
    nama: "Gold", harga: "55.000.000", highlight: true,
    desc: "Paket terpopuler untuk pernikahan lengkap dan berkesan",
    fitur: ["Full wedding organizer", "Dekorasi premium + florist", "Foto & video sinematik (2 fotografer)", "Live band / DJ", "Catering 300 tamu", "Transportasi pengantin", "Souvenir tamu"],
  },
  {
    nama: "Platinum", harga: "120.000.000", highlight: false,
    desc: "Pernikahan mewah tanpa batas dengan layanan eksklusif",
    fitur: ["All-inclusive luxury", "Dekorasi internasional", "Drone & film wedding", "Entertainment premium", "Catering 500+ tamu", "Honeymoon planning", "Dedicated coordinator"],
  },
];

export default function Paket() {
  return (
    <section id="paket" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-3">Investasi</p>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Paket <span className="text-rose-500">Pernikahan</span></h2>
          <p className="text-slate-500 max-w-xl mx-auto">Pilih paket yang sesuai dengan impian dan anggaran Anda</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {pakets.map(p => (
            <div key={p.nama} className={`rounded-2xl p-8 border relative ${p.highlight ? "bg-rose-600 border-rose-500 shadow-2xl shadow-rose-200 scale-105" : "bg-white border-rose-100"}`}>
              {p.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-rose-600 text-xs font-black px-4 py-1.5 rounded-full shadow">💍 TERPOPULER</div>}
              <div className={`text-sm font-bold mb-1 ${p.highlight ? "text-rose-100" : "text-rose-500"}`}>{p.nama}</div>
              <div className={`text-3xl font-black mb-1 ${p.highlight ? "text-white" : "text-slate-800"}`}>Rp {p.harga}</div>
              <div className={`text-xs mb-5 ${p.highlight ? "text-rose-200" : "text-slate-400"}`}>mulai dari</div>
              <p className={`text-sm mb-6 leading-relaxed ${p.highlight ? "text-rose-100" : "text-slate-500"}`}>{p.desc}</p>
              <ul className="space-y-2.5 mb-8">
                {p.fitur.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className={`mt-0.5 flex-shrink-0 ${p.highlight ? "text-white" : "text-rose-500"}`}>✓</span>
                    <span className={p.highlight ? "text-rose-50" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#kontak" className={`block text-center py-3 rounded-xl font-bold transition-all ${p.highlight ? "bg-white text-rose-600 hover:bg-rose-50" : "bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-500 hover:text-white hover:border-rose-500"}`}>
                Pilih Paket Ini
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
