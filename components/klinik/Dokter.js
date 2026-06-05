const dokter = [
  { nama: "dr. Ahmad Fauzi, Sp.JP", spesialis: "Spesialis Jantung", pengalaman: "15 tahun", jadwal: "Senin, Rabu, Jumat", avatar: "AF", color: "bg-teal-600" },
  { nama: "dr. Siti Rahayu, Sp.N", spesialis: "Spesialis Neurologi", pengalaman: "12 tahun", jadwal: "Selasa, Kamis", avatar: "SR", color: "bg-cyan-600" },
  { nama: "drg. Budi Santoso", spesialis: "Dokter Gigi", pengalaman: "10 tahun", jadwal: "Senin–Sabtu", avatar: "BS", color: "bg-emerald-600" },
  { nama: "dr. Lina Handayani, Sp.M", spesialis: "Spesialis Mata", pengalaman: "8 tahun", jadwal: "Rabu, Jumat, Sabtu", avatar: "LH", color: "bg-teal-700" },
];
export default function Dokter() {
  return (
    <section id="dokter" className="py-24 bg-teal-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-teal-600 font-semibold tracking-widest uppercase text-sm mb-3">Tim Medis</p>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Dokter <span className="text-teal-600">Berpengalaman</span></h2>
          <p className="text-slate-500 max-w-xl mx-auto">Ditangani oleh dokter spesialis terbaik dan berpengalaman di bidangnya</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dokter.map(d => (
            <div key={d.nama} className="bg-white rounded-2xl p-6 text-center border border-teal-100 hover:shadow-lg transition-shadow">
              <div className={`${d.color} w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4`}>{d.avatar}</div>
              <h3 className="font-bold text-slate-800 text-sm mb-1">{d.nama}</h3>
              <p className="text-teal-600 text-xs font-semibold mb-1">{d.spesialis}</p>
              <p className="text-slate-400 text-xs mb-2">Pengalaman: {d.pengalaman}</p>
              <div className="bg-teal-50 rounded-lg px-3 py-2 text-xs text-teal-700 font-medium mb-4">{d.jadwal}</div>
              <a href="#booking" className="block w-full bg-teal-600 hover:bg-teal-500 text-white py-2 rounded-xl text-xs font-bold transition-colors">Booking</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
