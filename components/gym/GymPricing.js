const plans=[
  {name:"Basic",harga:"299.000",per:"/bulan",desc:"Cocok untuk yang baru mulai",fitur:["Akses gym 06.00–22.00","2x group class/minggu","Locker & shower","Guest pass 1x/bulan"],highlight:false},
  {name:"Premium",harga:"499.000",per:"/bulan",desc:"Paling populer untuk progres optimal",fitur:["Akses gym 24 jam","Group class unlimited","Locker pribadi","2x personal training/bulan","Nutrisi konsultasi"],highlight:true},
  {name:"Elite",harga:"899.000",per:"/bulan",desc:"Program intensif untuk hasil maksimal",fitur:["Akses gym 24 jam","Semua kelas unlimited","4x personal training/bulan","Meal plan","Body assessment bulanan","Priority booking"],highlight:false},
];
export default function GymPricing(){
  return(
    <section id="harga" className="py-24" style={{background:"#0d0d0d"}}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-black text-xs tracking-widest mb-3" style={{color:"#a3e635"}}>MEMBERSHIP</p>
          <h2 className="font-black text-4xl md:text-5xl mb-4" style={{color:"#fff"}}>PILIH <span style={{color:"#a3e635"}}>PAKET</span> ANDA</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-center">
          {plans.map(p=>(
            <div key={p.name} className={`rounded-2xl p-8 relative ${p.highlight?"scale-105":""}`}
              style={p.highlight?{background:"#a3e635",boxShadow:"0 0 60px rgba(163,230,53,0.3)"}:{background:"rgba(163,230,53,0.04)",border:"1px solid rgba(163,230,53,0.15)"}}>
              {p.highlight&&<div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-black px-4 py-1.5 rounded-full" style={{background:"#080808",color:"#a3e635",border:"2px solid #a3e635"}}>⭐ TERPOPULER</div>}
              <div className={`text-sm font-black mb-2 ${p.highlight?"text-black":"text-lime-400"}`}>{p.name}</div>
              <div className={`text-4xl font-black mb-1 ${p.highlight?"text-black":"text-white"}`}>Rp {p.harga}</div>
              <div className={`text-xs mb-5 ${p.highlight?"text-black/60":"text-white/30"}`}>{p.per}</div>
              <p className={`text-sm mb-6 ${p.highlight?"text-black/70":"text-white/40"}`}>{p.desc}</p>
              <ul className="space-y-2.5 mb-8">
                {p.fitur.map(f=>(
                  <li key={f} className={`flex items-start gap-2 text-sm ${p.highlight?"text-black":"text-white/70"}`}>
                    <span className={`mt-0.5 font-black flex-shrink-0 ${p.highlight?"text-black":"text-lime-400"}`}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#kontak" className={`block text-center py-3 rounded-xl font-black transition-all ${p.highlight?"text-lime-400 hover:text-black bg-black hover:bg-lime-300":"text-black bg-lime-400 hover:bg-lime-300"}`}>
                Mulai Sekarang
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
