const menu=[
  {cat:"Espresso Based",items:[{name:"Signature Latte",desc:"Espresso + susu segar + sirup vanilla lokal",harga:"42.000",best:true},{name:"Flat White",desc:"Double shot espresso ringan dengan tekstur susu yang lembut",harga:"38.000",best:false},{name:"Caramel Macchiato",desc:"Espresso + caramel + susu steamed",harga:"45.000",best:false}]},
  {cat:"Manual Brew",items:[{name:"V60 Pour Over",desc:"Biji single origin Ethiopia, citrus & floral notes",harga:"50.000",best:true},{name:"Cold Brew",desc:"Kopi cold brew 18 jam, smooth & naturally sweet",harga:"48.000",best:false},{name:"Aeropress",desc:"Biji Flores Bajawa, nutty & chocolatey",harga:"45.000",best:false}]},
  {cat:"Non-Coffee",items:[{name:"Matcha Latte",desc:"Matcha ceremonial grade premium Jepang",harga:"45.000",best:false},{name:"Coklat Panas",desc:"Coklat dark premium dengan susu full cream",harga:"38.000",best:false},{name:"Teh Herbal",desc:"Koleksi teh organik pilihan, panas atau dingin",harga:"32.000",best:false}]},
];
export default function CafeMenu(){
  return(
    <section id="menu" className="py-24" style={{background:"#fdf6ee"}}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-semibold text-xs tracking-widest mb-3" style={{color:"#b45309",letterSpacing:"0.2em"}}>MENU PILIHAN</p>
          <h2 className="font-black text-4xl mb-4" style={{color:"#3d2314",fontFamily:"serif"}}>Racikan <span style={{color:"#7c5231"}}>Istimewa</span> Kami</h2>
          <p style={{color:"rgba(61,35,20,0.5)"}}>Semua biji kopi direct trade dari petani lokal Indonesia</p>
        </div>
        {menu.map(cat=>(
          <div key={cat.cat} className="mb-12">
            <h3 className="font-black text-lg mb-5 pb-3" style={{color:"#7c5231",borderBottom:"2px solid rgba(124,82,49,0.15)"}}>{cat.cat}</h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {cat.items.map(item=>(
                <div key={item.name} className="p-5 rounded-2xl relative hover:-translate-y-1 transition-all hover:shadow-lg"
                  style={{background:"#fff8f0",border:"1px solid rgba(124,82,49,0.12)"}}>
                  {item.best&&<span className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full" style={{background:"#f59e0b",color:"#3d2314"}}>Best Seller</span>}
                  <h4 className="font-bold mb-1" style={{color:"#3d2314"}}>{item.name}</h4>
                  <p className="text-sm mb-4" style={{color:"rgba(61,35,20,0.5)"}}>{item.desc}</p>
                  <div className="font-black text-lg" style={{color:"#7c5231"}}>Rp {item.harga}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
