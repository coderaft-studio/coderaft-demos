const reviews=[
  {name:"Budi Santoso",role:"Software Engineer",text:"Dalam 3 bulan berat badan turun 12kg dan massa otot naik signifikan. Trainer-nya luar biasa supportif!",rating:"★★★★★",lost:"-12kg"},
  {name:"Rini Handayani",role:"Marketing Manager",text:"Awalnya takut gym, tapi tim IronForge sangat welcoming. Sekarang udah rutin 4x seminggu dan badan jauh lebih fit!",rating:"★★★★★",lost:"-8kg"},
  {name:"Ahmad Rizky",role:"Pengusaha",text:"Personal training di sini worth it banget. Programnya terstruktur dan hasilnya nyata. Highly recommended!",rating:"★★★★★",lost:"+5kg muscle"},
];
export default function GymTestimoni(){
  return(
    <section className="py-24" style={{background:"#080808"}}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-black text-xs tracking-widest mb-3" style={{color:"#a3e635"}}>HASIL NYATA</p>
          <h2 className="font-black text-4xl mb-4" style={{color:"#fff"}}>TRANSFORMASI <span style={{color:"#a3e635"}}>MEMBER</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map(r=>(
            <div key={r.name} className="p-7 rounded-2xl" style={{background:"rgba(163,230,53,0.04)",border:"1px solid rgba(163,230,53,0.1)"}}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-yellow-400">{r.rating}</span>
                <span className="text-lg font-black px-3 py-1 rounded-full" style={{background:"rgba(163,230,53,0.15)",color:"#a3e635"}}>{r.lost}</span>
              </div>
              <p className="text-sm mb-6 italic" style={{color:"rgba(240,253,244,0.6)"}}>&ldquo;{r.text}&rdquo;</p>
              <div>
                <div className="font-black" style={{color:"#fff"}}>{r.name}</div>
                <div className="text-xs" style={{color:"rgba(240,253,244,0.3)"}}>{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
