const agen = [
  { nama: "Rina Handayani", spesialis: "Residensial Jakarta", deal: "120+ deal", avatar: "RH", color: "bg-amber-600" },
  { nama: "Budi Santoso", spesialis: "Properti Komersial", deal: "98+ deal", avatar: "BS", color: "bg-slate-600" },
  { nama: "Sinta Dewi", spesialis: "Apartemen & Kondominium", deal: "85+ deal", avatar: "SD", color: "bg-amber-700" },
];
export default function Agen() {
  return (
    <section id="agen" className="py-24 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-3">Tim Kami</p>
          <h2 className="text-4xl font-bold text-white mb-4">Agen <span className="text-amber-400">Terpercaya</span></h2>
          <p className="text-slate-400 max-w-xl mx-auto">Agen berpengalaman siap membantu Anda menemukan properti yang tepat</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {agen.map(a => (
            <div key={a.nama} className="bg-slate-900 rounded-2xl p-8 text-center border border-slate-800 hover:border-amber-500/30 transition-all group">
              <div className={`${a.color} w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-5`}>{a.avatar}</div>
              <h3 className="text-white font-bold text-lg mb-1 group-hover:text-amber-400 transition-colors">{a.nama}</h3>
              <p className="text-amber-400 text-sm font-semibold mb-1">{a.spesialis}</p>
              <p className="text-slate-400 text-sm mb-5">{a.deal} selesai</p>
              <a href="#kontak" className="block bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 hover:border-amber-500 py-2.5 rounded-xl text-sm font-bold transition-all">Hubungi Agen</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
