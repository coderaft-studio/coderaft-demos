"use client";
import { useState, useEffect } from "react";
const links = [{ href:"#program",label:"Program"},{href:"#trainer",label:"Trainer"},{href:"#harga",label:"Harga"},{href:"#kontak",label:"Kontak"}];
export default function GymNav() {
  const [sc,setSc]=useState(false);
  const [op,setOp]=useState(false);
  useEffect(()=>{const fn=()=>setSc(window.scrollY>40);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${sc?"shadow-2xl":""}`}
      style={{background:sc?"rgba(8,8,8,0.97)":"transparent",backdropFilter:sc?"blur(12px)":"none"}}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="font-black text-xl tracking-tight" style={{color:"#a3e635"}}>IRON<span style={{color:"#fff"}}>FORGE</span></a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l=><a key={l.href} href={l.href} className="text-sm font-semibold transition-colors hover:text-lime-400" style={{color:"rgba(240,253,244,0.7)"}}>{l.label}</a>)}
          <a href="#kontak" className="px-5 py-2 rounded-full text-sm font-black transition-all hover:shadow-lg" style={{background:"#a3e635",color:"#080808",boxShadow:"0 0 16px rgba(163,230,53,0.3)"}}>Trial Gratis</a>
        </nav>
        <button onClick={()=>setOp(!op)} className="md:hidden p-2" style={{color:"#a3e635"}}>☰</button>
      </div>
      {op&&<nav style={{background:"rgba(8,8,8,0.98)",borderTop:"1px solid rgba(163,230,53,0.2)"}} className="md:hidden px-6 py-4 flex flex-col gap-4">
        {links.map(l=><a key={l.href} href={l.href} onClick={()=>setOp(false)} className="font-semibold" style={{color:"rgba(240,253,244,0.8)"}}>{l.label}</a>)}
        <a href="#kontak" className="text-center py-2 rounded-full font-black" style={{background:"#a3e635",color:"#080808"}}>Trial Gratis</a>
      </nav>}
    </header>
  );
}
