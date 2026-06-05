const reviews=[
  {name:"Rini H.",role:"Food Blogger",text:"Latte art-nya cantik banget dan rasanya tidak mengecewakan. V60-nya adalah yang terbaik yang pernah saya coba di Jakarta!",rating:"★★★★★",avatar:"RH",color:"#d4a373"},
  {name:"Budi P.",role:"Remote Worker",text:"Tempat yang cozy banget buat WFH. WiFi kenceng, kursi nyaman, dan kopinya top. Bisa betah seharian di sini.",rating:"★★★★★",avatar:"BP",color:"#bc7c5e"},
  {name:"Sinta M.",role:"Mahasiswa",text:"Cold brew-nya enak banget! Tidak terlalu pahit dan naturally sweet. Harga juga masih terjangkau untuk specialty coffee.",rating:"★★★★★",avatar:"SM",color:"#a0522d"},
];
export default function CafeTestimoni(){
  return(
    <section className="py-24" style={{background:"#f5e6d3"}}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-semibold text-xs tracking-widest mb-3" style={{color:"#b45309",letterSpacing:"0.2em"}}>ULASAN</p>
          <h2 className="font-black text-4xl" style={{color:"#3d2314",fontFamily:"serif"}}>Yang Mereka <span style={{color:"#7c5231"}}>Rasakan</span></h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="text-yellow-600 text-2xl">★★★★★</span>
            <span className="font-black text-xl" style={{color:"#7c5231"}}>4.9</span>
            <span style={{color:"rgba(61,35,20,0.5)"}}>· 800+ ulasan</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map(r=>(
            <div key={r.name} className="p-7 rounded-2xl" style={{background:"#fff8f0",border:"1px solid rgba(124,82,49,0.12)"}}>
              <div className="text-yellow-500 mb-4">{r.rating}</div>
              <p className="text-sm mb-6 italic leading-relaxed" style={{color:"rgba(61,35,20,0.7)"}}>&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{background:r.color}}>{r.avatar}</div>
                <div>
                  <div className="font-bold text-sm" style={{color:"#3d2314"}}>{r.name}</div>
                  <div className="text-xs" style={{color:"rgba(61,35,20,0.4)"}}>{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
