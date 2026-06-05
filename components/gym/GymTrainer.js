const trainers=[
  {name:"Reza Pratama",spec:"Strength & Conditioning",cert:"NSCA-CSCS, ACE",exp:"8 tahun",avatar:"RP",color:"#a3e635"},
  {name:"Sinta Dewi",spec:"Yoga & Pilates",cert:"RYT-500, STOTT",exp:"6 tahun",avatar:"SD",color:"#84cc16"},
  {name:"Ahmad Fauzi",spec:"Boxing & MMA",cert:"AIBA, ONE FC Coach",exp:"10 tahun",avatar:"AF",color:"#65a30d"},
  {name:"Maya Putri",spec:"HIIT & Cardio",cert:"NASM-CPT, Les Mills",exp:"5 tahun",avatar:"MP",color:"#4d7c0f"},
];
export default function GymTrainer(){
  return(
    <section id="trainer" className="py-24" style={{background:"#080808"}}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-black text-xs tracking-widest mb-3" style={{color:"#a3e635"}}>TIM AHLI</p>
          <h2 className="font-black text-4xl md:text-5xl mb-4" style={{color:"#fff"}}>TRAINER <span style={{color:"#a3e635"}}>PROFESIONAL</span></h2>
          <p style={{color:"rgba(240,253,244,0.4)"}}>Semua trainer tersertifikasi internasional dengan pengalaman bertahun-tahun</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map(t=>(
            <div key={t.name} className="rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all" style={{background:"rgba(163,230,53,0.04)",border:"1px solid rgba(163,230,53,0.1)"}}>
              <div className="h-48 flex items-center justify-center" style={{background:`linear-gradient(135deg,${t.color}20,${t.color}05)`}}>
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-black" style={{background:`${t.color}20`,border:`3px solid ${t.color}`,color:t.color}}>{t.avatar}</div>
              </div>
              <div className="p-5">
                <h3 className="font-black text-white mb-1">{t.name}</h3>
                <p className="text-sm font-semibold mb-2" style={{color:"#a3e635"}}>{t.spec}</p>
                <p className="text-xs mb-1" style={{color:"rgba(240,253,244,0.4)"}}>🏅 {t.cert}</p>
                <p className="text-xs" style={{color:"rgba(240,253,244,0.4)"}}>⏱ {t.exp} pengalaman</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
