const programs=[
  {icon:"🏋️",name:"Weight Training",desc:"Program angkat beban untuk membangun massa otot dan kekuatan. Tersedia untuk pemula hingga advanced.",schedule:"Setiap hari 06.00–22.00"},
  {icon:"🥊",name:"Boxing & MMA",desc:"Latihan tinju dan seni bela diri campuran dengan pelatih berpengalaman internasional.",schedule:"Sen, Rab, Jum 07.00–09.00"},
  {icon:"🧘",name:"Yoga & Pilates",desc:"Meningkatkan fleksibilitas, keseimbangan, dan ketenangan pikiran melalui gerakan terstruktur.",schedule:"Sel, Kam, Sab 08.00–09.30"},
  {icon:"🏃",name:"HIIT Cardio",desc:"High Intensity Interval Training untuk membakar kalori maksimal dalam waktu singkat.",schedule:"Setiap hari 17.00–18.00"},
  {icon:"🚴",name:"Spinning Class",desc:"Kelas sepeda statis indoor berenergi tinggi dengan musik motivasi dan instruktur energetik.",schedule:"Sel, Kam, Sab 06.30–07.30"},
  {icon:"💪",name:"Personal Training",desc:"Sesi 1-on-1 dengan personal trainer untuk program yang disesuaikan dengan target Anda.",schedule:"Fleksibel, sesuai jadwal"},
];
export default function GymProgram(){
  return(
    <section id="program" className="py-24" style={{background:"#0d0d0d"}}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-black text-xs tracking-widest mb-3" style={{color:"#a3e635"}}>PROGRAM KAMI</p>
          <h2 className="font-black text-4xl md:text-5xl mb-4" style={{color:"#fff"}}>PILIH <span style={{color:"#a3e635"}}>PROGRAM</span> ANDA</h2>
          <p style={{color:"rgba(240,253,244,0.4)"}}>Program dirancang oleh trainer bersertifikat untuk semua level</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map(p=>(
            <div key={p.name} className="p-6 rounded-2xl group hover:-translate-y-1 transition-all hover:shadow-2xl"
              style={{background:"rgba(163,230,53,0.03)",border:"1px solid rgba(163,230,53,0.1)",borderLeft:"3px solid #a3e635"}}>
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="font-black text-lg mb-2 group-hover:text-lime-400 transition-colors" style={{color:"#fff"}}>{p.name}</h3>
              <p className="text-sm mb-4" style={{color:"rgba(240,253,244,0.5)"}}>{p.desc}</p>
              <div className="text-xs font-semibold px-3 py-1.5 rounded-full w-fit" style={{background:"rgba(163,230,53,0.1)",color:"#a3e635"}}>🕐 {p.schedule}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
