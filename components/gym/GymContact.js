"use client";
import { useState } from "react";
export default function GymContact(){
  const [form,setForm]=useState({nama:"",wa:"",goal:"",program:""});
  const [sent,setSent]=useState(false);
  return(
    <section id="kontak" className="py-24" style={{background:"#0d0d0d"}}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-black text-xs tracking-widest mb-3" style={{color:"#a3e635"}}>MULAI SEKARANG</p>
          <h2 className="font-black text-4xl mb-4" style={{color:"#fff"}}>DAFTAR <span style={{color:"#a3e635"}}>TRIAL GRATIS</span></h2>
          <p style={{color:"rgba(240,253,244,0.4)"}}>Coba 3 hari gratis tanpa syarat. Rasakan sendiri perbedaannya.</p>
        </div>
        <div className="rounded-3xl p-8" style={{background:"rgba(163,230,53,0.04)",border:"1px solid rgba(163,230,53,0.15)"}}>
          {sent?(
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💪</div>
              <h3 className="font-black text-2xl mb-2" style={{color:"#a3e635"}}>LET&apos;S GO!</h3>
              <p style={{color:"rgba(240,253,244,0.6)"}}>Tim kami akan menghubungi Anda dalam 24 jam.</p>
              <button onClick={()=>setSent(false)} className="mt-4 text-sm underline" style={{color:"rgba(240,253,244,0.3)"}}>Daftar lagi</button>
            </div>
          ):(
            <form onSubmit={e=>{e.preventDefault();setSent(true);}} className="grid md:grid-cols-2 gap-4">
              {[{n:"nama",l:"Nama Lengkap *",ph:"Budi Santoso"},{n:"wa",l:"No. WhatsApp *",ph:"08XXXXXXXXXX"}].map(f=>(
                <div key={f.n}>
                  <label className="block text-xs font-semibold mb-1" style={{color:"rgba(240,253,244,0.5)"}}>{f.l}</label>
                  <input required name={f.n} value={form[f.n]} onChange={e=>setForm({...form,[f.n]:e.target.value})} placeholder={f.ph}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(163,230,53,0.2)",color:"#fff"}}/>
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold mb-1" style={{color:"rgba(240,253,244,0.5)"}}>Target Fitness</label>
                <select value={form.goal} onChange={e=>setForm({...form,goal:e.target.value})}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(163,230,53,0.2)",color:"#fff"}}>
                  <option value="">Pilih target...</option>
                  {["Turun berat badan","Naik massa otot","Meningkatkan stamina","Hidup lebih sehat"].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{color:"rgba(240,253,244,0.5)"}}>Program Minat</label>
                <select value={form.program} onChange={e=>setForm({...form,program:e.target.value})}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(163,230,53,0.2)",color:"#fff"}}>
                  <option value="">Pilih program...</option>
                  {["Weight Training","Boxing & MMA","Yoga & Pilates","HIIT Cardio","Personal Training"].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full py-4 rounded-xl font-black text-lg transition-all hover:shadow-2xl"
                  style={{background:"#a3e635",color:"#080808",boxShadow:"0 0 24px rgba(163,230,53,0.3)"}}>
                  DAFTAR TRIAL GRATIS 💪
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
