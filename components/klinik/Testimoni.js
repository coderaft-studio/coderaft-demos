const reviews = [
  { name: "Rini Handayani", avatar: "RH", color: "bg-teal-600", text: "Pelayanan sangat ramah dan profesional. Dokter spesialisnya menjelaskan kondisi saya dengan sangat jelas. Fasilitas klinik bersih dan modern. Highly recommended!" },
  { name: "Budi Prasetyo", avatar: "BP", color: "bg-cyan-600", text: "Booking online sangat mudah. Tidak perlu antri lama, dokter tepat waktu. Biaya juga transparan dan sesuai. Akan jadi klinik langganan keluarga kami." },
  { name: "Sinta Maharani", avatar: "SM", color: "bg-emerald-600", text: "MCU-nya lengkap dan hasilnya cepat. Dokternya sangat informatif menjelaskan hasil pemeriksaan. Tempatnya nyaman, tidak terasa seperti di klinik biasa." },
];
export default function Testimoni() {
  return (
    <section className="py-24 bg-teal-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-teal-600 font-semibold tracking-widest uppercase text-sm mb-3">Testimoni</p>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Kata <span className="text-teal-600">Pasien</span> Kami</h2>
          <div className="flex items-center justify-center gap-2 mt-2"><span className="text-yellow-400 text-2xl">★★★★★</span><span className="text-slate-700 font-bold text-xl">4.9</span><span className="text-slate-400 text-sm">(2.000+ ulasan)</span></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map(r => (
            <div key={r.name} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow border border-teal-100">
              <div className="text-yellow-400 text-lg mb-4">★★★★★</div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`${r.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>{r.avatar}</div>
                <div className="font-semibold text-slate-800 text-sm">{r.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
