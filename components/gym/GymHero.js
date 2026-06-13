import Image from "next/image";
export default function GymHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Image src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80" alt="Gym" fill priority className="object-cover" />
      <div className="absolute inset-0" style={{background:"linear-gradient(to right,rgba(8,8,8,0.92) 50%,rgba(8,8,8,0.4))"}} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black mb-6" style={{background:"rgba(163,230,53,0.12)",border:"1px solid rgba(163,230,53,0.3)",color:"#a3e635"}}>
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            #1 GYM DI JAKARTA
          </div>
          <h1 className="font-black leading-none mb-6" style={{fontSize:"clamp(3rem,8vw,6rem)",color:"#fff",letterSpacing:"-0.03em"}}>
            TRAIN<br /><span style={{color:"#a3e635",textShadow:"0 0 40px rgba(163,230,53,0.5)"}}>HARD.</span><br />LIVE STRONG.
          </h1>
          <p className="text-lg mb-10 max-w-lg" style={{color:"rgba(240,253,244,0.6)"}}>
            Fasilitas kelas dunia, trainer bersertifikat internasional, dan komunitas yang mendukung perjalanan fitness Anda.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#kontak" className="px-8 py-4 rounded-full font-black text-lg transition-all hover:shadow-2xl" style={{background:"#a3e635",color:"#080808",boxShadow:"0 0 24px rgba(163,230,53,0.4)"}}>Coba Trial Gratis</a>
            <a href="#program" className="px-8 py-4 rounded-full font-bold text-lg transition-all" style={{border:"2px solid rgba(163,230,53,0.4)",color:"rgba(240,253,244,0.8)"}}>Lihat Program</a>
          </div>
          <div className="mt-14 grid grid-cols-3 gap-8 max-w-sm">
            {[{num:"5.000+",label:"Member Aktif"},{num:"50+",label:"Kelas/Minggu"},{num:"15+",label:"Trainer Pro"}].map(s=>(
              <div key={s.label}>
                <div className="text-2xl font-black" style={{color:"#a3e635"}}>{s.num}</div>
                <div className="text-xs" style={{color:"rgba(240,253,244,0.4)"}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
