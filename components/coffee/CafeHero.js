import Image from "next/image";
export default function CafeHero(){
  return(
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <Image src="/demo/coffee/hero.jpg" alt="Kopiday Café" fill priority className="object-cover"/>
      <div className="absolute inset-0" style={{background:"linear-gradient(to right,rgba(61,35,20,0.85) 45%,rgba(61,35,20,0.3))"}}/>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 w-full">
        <div className="max-w-xl">
          <p className="text-sm font-semibold tracking-widest mb-5" style={{color:"#f59e0b",letterSpacing:"0.2em"}}>SPECIALTY COFFEE · JAKARTA</p>
          <h1 className="font-black leading-tight mb-6" style={{fontSize:"clamp(2.5rem,6vw,4.5rem)",color:"#fdf6ee",fontFamily:"serif"}}>
            Secangkir Kopi,<br />Seribu <span style={{color:"#f59e0b"}}>Cerita.</span>
          </h1>
          <p className="text-lg mb-10" style={{color:"rgba(253,246,238,0.7)"}}>
            Kami meracik kopi dengan biji pilihan dari petani lokal terbaik. Setiap tegukan adalah perjalanan rasa yang tak terlupakan.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#menu" className="px-8 py-4 rounded-full font-bold text-lg transition-all" style={{background:"#f59e0b",color:"#3d2314"}}>Lihat Menu</a>
            <a href="#kontak" className="px-8 py-4 rounded-full font-semibold text-lg transition-all" style={{border:"2px solid rgba(245,158,11,0.5)",color:"#fdf6ee"}}>Pre-Order</a>
          </div>
          <div className="mt-12 flex gap-8">
            {[{num:"5+",label:"Tahun Berdiri"},{num:"50+",label:"Varian Kopi"},{num:"4.9★",label:"Rating"},{num:"1.000+",label:"Pelanggan/Bulan"}].map(s=>(
              <div key={s.label}>
                <div className="text-xl font-black" style={{color:"#f59e0b"}}>{s.num}</div>
                <div className="text-xs" style={{color:"rgba(253,246,238,0.4)"}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
