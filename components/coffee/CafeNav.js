"use client";
import { useState, useEffect } from "react";
const links=[{href:"#menu",label:"Menu"},{href:"#tentang",label:"Tentang"},{href:"#galeri",label:"Galeri"},{href:"#kontak",label:"Kontak"}];
export default function CafeNav(){
  const [sc,setSc]=useState(false);
  const [op,setOp]=useState(false);
  useEffect(()=>{const fn=()=>setSc(window.scrollY>40);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  return(
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      style={{background:sc?"rgba(253,246,238,0.97)":"transparent",backdropFilter:sc?"blur(12px)":"none",boxShadow:sc?"0 1px 16px rgba(61,35,20,0.08)":"none"}}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="font-black text-xl" style={{color:"#7c5231",fontFamily:"serif",letterSpacing:"0.05em"}}>Kopiday ☕</a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l=><a key={l.href} href={l.href} className="text-sm font-medium transition-colors hover:text-amber-700" style={{color:"#7c5231"}}>{l.label}</a>)}
          <a href="#kontak" className="px-5 py-2 rounded-full text-sm font-bold transition-all" style={{background:"#7c5231",color:"#fdf6ee"}}>Pesan Sekarang</a>
        </nav>
        <button onClick={()=>setOp(!op)} className="md:hidden p-2 text-2xl" style={{color:"#7c5231"}}>☰</button>
      </div>
      {op&&<nav style={{background:"rgba(253,246,238,0.98)",borderTop:"1px solid rgba(124,82,49,0.1)"}} className="md:hidden px-6 py-4 flex flex-col gap-4">
        {links.map(l=><a key={l.href} href={l.href} onClick={()=>setOp(false)} className="font-medium" style={{color:"#7c5231"}}>{l.label}</a>)}
        <a href="#kontak" className="text-center py-2 rounded-full font-bold" style={{background:"#7c5231",color:"#fdf6ee"}}>Pesan Sekarang</a>
      </nav>}
    </header>
  );
}
