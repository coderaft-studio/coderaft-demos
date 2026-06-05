const layanan = [
  { icon: "🫀", title: "Kardiologi", desc: "Pemeriksaan jantung lengkap dengan EKG, echocardiography, dan konsultasi dokter spesialis jantung." },
  { icon: "🧠", title: "Neurologi", desc: "Diagnosis dan penanganan gangguan saraf, otak, dan sumsum tulang belakang oleh spesialis neurologi." },
  { icon: "🦷", title: "Gigi & Mulut", desc: "Scaling, tambal, cabut gigi, behel, hingga implant gigi oleh dokter gigi profesional." },
  { icon: "👁", title: "Mata", desc: "Pemeriksaan mata, koreksi minus/plus, lasik, dan penanganan katarak oleh dokter spesialis." },
  { icon: "🩺", title: "Umum & MCU", desc: "Konsultasi dokter umum, medical check up lengkap, dan skrining kesehatan tahunan." },
  { icon: "👶", title: "Pediatri", desc: "Layanan kesehatan anak dari bayi hingga remaja, imunisasi, dan tumbuh kembang." },
];
export default function Layanan() {
  return (
    <section id="layanan" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-teal-600 font-semibold tracking-widest uppercase text-sm mb-3">Spesialisasi</p>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Layanan <span className="text-teal-600">Medis</span> Kami</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Dilayani oleh dokter spesialis berpengalaman dengan peralatan medis modern</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {layanan.map(l => (
            <div key={l.title} className="group p-6 rounded-2xl border border-teal-100 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-50 transition-all hover:-translate-y-1 bg-white">
              <div className="text-4xl mb-4">{l.icon}</div>
              <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-teal-600 transition-colors">{l.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{l.desc}</p>
              <a href="#booking" className="text-teal-600 text-sm font-semibold hover:text-teal-500 transition-colors">Booking →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
