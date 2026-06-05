export default function CafeAbout(){
  return(
    <section id="tentang" className="py-24" style={{background:"#f5e6d3"}}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="font-semibold text-xs tracking-widest mb-4" style={{color:"#b45309",letterSpacing:"0.2em"}}>KISAH KAMI</p>
          <h2 className="font-black text-4xl mb-6" style={{color:"#3d2314",fontFamily:"serif"}}>Dari Kebun ke <span style={{color:"#7c5231"}}>Cangkir</span> Anda</h2>
          <p className="text-lg mb-4 leading-relaxed" style={{color:"rgba(61,35,20,0.7)"}}>Kopiday lahir dari kecintaan mendalam terhadap kopi nusantara. Sejak 2019, kami bekerja langsung dengan petani kopi di Aceh, Flores, Toraja, dan Papua.</p>
          <p className="leading-relaxed mb-8" style={{color:"rgba(61,35,20,0.6)"}}>Setiap biji dipilih dengan cermat, dipanggang dengan presisi, dan disajikan oleh barista bersertifikat SCA. Bukan sekadar kopi — ini adalah apresiasi terhadap kerja keras petani Indonesia.</p>
          <div className="grid grid-cols-2 gap-5">
            {[{icon:"🌱",t:"Direct Trade",d:"100% dari petani lokal"},{icon:"🔥",t:"Fresh Roast",d:"Dipanggang setiap minggu"},{icon:"👨‍🍳",t:"SCA Barista",d:"Tersertifikasi internasional"},{icon:"🌏",t:"Single Origin",d:"5 daerah kopi terbaik"}].map(f=>(
              <div key={f.t} className="flex items-start gap-3">
                <span className="text-2xl">{f.icon}</span>
                <div><div className="font-bold text-sm" style={{color:"#3d2314"}}>{f.t}</div><div className="text-xs" style={{color:"rgba(61,35,20,0.5)"}}>{f.d}</div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[{bg:"#d4a373"},{bg:"#c8956c"},{bg:"#bc7c5e"},{bg:"#a0522d"}].map((c,i)=>(
            <div key={i} className="rounded-2xl aspect-square flex items-center justify-center text-5xl" style={{background:c.bg}}>
              {["☕","🫘","🌿","🍵"][i]}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
