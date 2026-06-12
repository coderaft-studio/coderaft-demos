import Image from "next/image";
const photos=[
  {src:"/demo/coffee/ambiance1.jpg",alt:"Suasana kafe",span:"col-span-2 row-span-2"},
  {src:"/demo/coffee/ambiance2.jpg",alt:"Latte art",span:""},
  {src:"/demo/coffee/ambiance3.jpg",alt:"Cold brew",span:""},
  {src:"/demo/coffee/ambiance4.jpg",alt:"Barista",span:""},
  {src:"/demo/coffee/hero.jpg",alt:"Manual brew",span:"col-span-2"},
];
export default function CafeAmbiance(){
  return(
    <section id="galeri" className="py-24" style={{background:"#fdf6ee"}}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-semibold text-xs tracking-widest mb-3" style={{color:"#b45309",letterSpacing:"0.2em"}}>GALERI</p>
          <h2 className="font-black text-4xl" style={{color:"#3d2314",fontFamily:"serif"}}>Rasakan <span style={{color:"#7c5231"}}>Atmosfer</span> Kami</h2>
        </div>
        <div className="grid grid-cols-4 gap-4" style={{gridAutoRows:"180px"}}>
          {photos.map(p=>(
            <div key={p.alt} className={`relative rounded-2xl overflow-hidden group ${p.span}`}>
              <Image src={p.src} alt={p.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{background:"rgba(61,35,20,0.3)"}}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
