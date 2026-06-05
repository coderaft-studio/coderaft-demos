"use client";
import { useState } from "react";
export default function CafeContact(){
  const [form,setForm]=useState({nama:"",wa:"",tgl:"",jam:"",pax:"",catatan:""});
  const [sent,setSent]=useState(false);
  const h=e=>setForm({...form,[e.target.name]:e.target.value});
  return(
    <section id="kontak" className="py-24" style={{background:"#fdf6ee"}}>
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="font-semibold text-xs tracking-widest mb-4" style={{color:"#b45309",letterSpacing:"0.2em"}}>KUNJUNGI KAMI</p>
          <h2 className="font-black text-4xl mb-6" style={{color:"#3d2314",fontFamily:"serif"}}>Pre-Order & <span style={{color:"#7c5231"}}>Reservasi</span></h2>
          <p className="mb-8 leading-relaxed" style={{color:"rgba(61,35,20,0.6)"}}>Pesan sebelumnya agar kami bisa menyiapkan meja dan pesanan terbaik untuk Anda.</p>
          {[{icon:"📍",l:"Alamat",v:"Jl. Kemang Raya No.22, Jakarta Selatan"},{icon:"📞",l:"WhatsApp",v:"+62 812-3456-7890"},{icon:"🕙",l:"Jam Buka",v:"Senin–Minggu 07.00–22.00"},{icon:"📍",l:"Moda",v:"Dine-in, Take Away, Pre-Order"}].map(item=>(
            <div key={item.l} className="flex items-start gap-3 mb-4">
              <span className="text-xl">{item.icon}</span>
              <div><div className="font-semibold text-sm" style={{color:"#7c5231"}}>{item.l}</div><div className="text-sm" style={{color:"rgba(61,35,20,0.6)"}}>{item.v}</div></div>
            </div>
          ))}
        </div>
        <div className="rounded-3xl p-7" style={{background:"#f5e6d3",border:"1px solid rgba(124,82,49,0.15)"}}>
          {sent?(
            <div className="text-center py-10">
              <div className="text-5xl mb-4">☕</div>
              <h3 className="font-black text-xl mb-2" style={{color:"#7c5231"}}>Pesanan Diterima!</h3>
              <p style={{color:"rgba(61,35,20,0.6)"}}>Kami akan konfirmasi via WhatsApp segera.</p>
              <button onClick={()=>setSent(false)} className="mt-4 text-sm underline" style={{color:"rgba(61,35,20,0.4)"}}>Pesan lagi</button>
            </div>
          ):(
            <form onSubmit={e=>{e.preventDefault();setSent(true);}} className="space-y-4">
              <h3 className="font-black text-lg mb-5" style={{color:"#3d2314"}}>Form Reservasi</h3>
              {[{n:"nama",l:"Nama *",ph:"Budi Santoso"},{n:"wa",l:"No. WhatsApp *",ph:"08XXXXXXXXXX"}].map(f=>(
                <div key={f.n}>
                  <label className="block text-xs font-semibold mb-1" style={{color:"rgba(61,35,20,0.5)"}}>{f.l}</label>
                  <input required name={f.n} value={form[f.n]} onChange={h} placeholder={f.ph}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{background:"#fdf6ee",border:"1px solid rgba(124,82,49,0.2)",color:"#3d2314"}}/>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{color:"rgba(61,35,20,0.5)"}}>Tanggal *</label>
                  <input required type="date" name="tgl" value={form.tgl} onChange={h} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{background:"#fdf6ee",border:"1px solid rgba(124,82,49,0.2)",color:"#3d2314"}}/>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{color:"rgba(61,35,20,0.5)"}}>Jumlah Orang</label>
                  <select name="pax" value={form.pax} onChange={h} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{background:"#fdf6ee",border:"1px solid rgba(124,82,49,0.2)",color:"#3d2314"}}>
                    <option>1 orang</option>{["2","3","4","5","6+"].map(o=><option key={o}>{o} orang</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{color:"rgba(61,35,20,0.5)"}}>Catatan / Pre-Order Menu</label>
                <textarea name="catatan" value={form.catatan} onChange={h} rows={3} placeholder="Contoh: pre-order 2 V60 + 1 Signature Latte..."
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{background:"#fdf6ee",border:"1px solid rgba(124,82,49,0.2)",color:"#3d2314"}}/>
              </div>
              <button type="submit" className="w-full py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl" style={{background:"#7c5231",color:"#fdf6ee"}}>
                Reservasi Sekarang ☕
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
