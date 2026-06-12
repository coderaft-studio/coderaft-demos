"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useAnimateOnScroll } from "./hooks";

const G = "#c9a84c";
const DARK = "#18140e";

const KulinerContent = dynamic(()=>import("./KulinerContent"), {
  ssr: false,
  loading: ()=>(
    <div style={{ minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", background:DARK }}>
      <div style={{ width:"40px", height:"1px", background:G, animation:"klx 1.2s ease-in-out infinite alternate" }}/>
      <style>{`@keyframes klx{to{width:80px}}`}</style>
    </div>
  )
});

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>60);
    window.addEventListener("scroll",fn,{passive:true});
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  const links=[["#beranda","Beranda"],["#menu","Menu"],["#tentang","Tentang"],["#acara","Acara"],["#reservasi","Reservasi"]];

  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:scrolled?"10px 0":"20px 0", background:scrolled?"rgba(24,20,14,0.97)":"transparent", borderBottom:scrolled?"1px solid rgba(201,168,76,0.15)":"none", backdropFilter:scrolled?"blur(12px)":"none", transition:"all .4s" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <a href="#beranda" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:400, color:"#f5efe4", textDecoration:"none", letterSpacing:"0.08em" }}>
            Bumbu<span style={{ color:G }}>.</span>Nusantara
          </a>
          <div className="hidden md:flex" style={{ gap:"32px" }}>
            {links.map(([href,label])=>(
              <a key={href} href={href} style={{ fontSize:"11px", fontWeight:500, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(245,239,228,0.7)", textDecoration:"none", transition:"color .25s" }}
                onMouseEnter={e=>e.currentTarget.style.color=G} onMouseLeave={e=>e.currentTarget.style.color="rgba(245,239,228,0.7)"}>{label}</a>
            ))}
          </div>
          <button className="md:hidden" onClick={()=>setOpen(!open)} style={{ background:"none", border:`1px solid rgba(201,168,76,0.4)`, color:G, padding:"6px 14px", fontSize:"11px", letterSpacing:"0.1em", cursor:"pointer" }}>
            {open?"TUTUP":"MENU"}
          </button>
        </div>
        {open && (
          <div style={{ background:"rgba(24,20,14,0.98)", padding:"12px 0", borderTop:"1px solid rgba(201,168,76,0.1)" }}>
            {links.map(([href,label])=>(
              <a key={href} href={href} onClick={()=>setOpen(false)} style={{ display:"block", padding:"10px 24px", fontSize:"11px", fontWeight:500, letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(245,239,228,0.7)", textDecoration:"none" }}>
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="beranda" style={{ minHeight:"100vh", backgroundImage:"url(/demo/kuliner/hero.jpg)", backgroundSize:"cover", backgroundPosition:"center", backgroundAttachment:"fixed", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
        <div style={{ position:"absolute", inset:0, background:"rgba(24,20,14,0.62)" }}/>
        <div style={{ position:"relative", zIndex:1, textAlign:"center", padding:"0 24px" }} className="kl-wow kl-fadeIn">
          <p style={{ fontFamily:"'Satisfy',cursive", fontSize:"22px", color:G, marginBottom:"14px" }}>Selamat Datang di</p>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(48px,8vw,100px)", fontWeight:300, letterSpacing:"0.05em", lineHeight:1.1, color:"#f5efe4", marginBottom:"20px" }}>
            Bumbu <em style={{ color:G, fontStyle:"italic" }}>Nusantara</em>
          </h1>
          <p style={{ fontFamily:"'Satisfy',cursive", fontSize:"18px", color:"rgba(245,239,228,0.7)", marginBottom:"40px" }}>Cita Rasa Leluhur, Kenangan yang Tak Terlupakan</p>
          <div style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
            <a href="#menu" style={{ display:"inline-block", padding:"13px 36px", border:`1px solid ${G}`, color:G, fontSize:"10px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", textDecoration:"none", transition:"all .25s" }}
              onMouseEnter={e=>{e.currentTarget.style.background=G;e.currentTarget.style.color=DARK;}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=G;}}>
              Lihat Menu
            </a>
            <a href="#reservasi" style={{ display:"inline-block", padding:"13px 36px", background:G, color:DARK, fontSize:"10px", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", textDecoration:"none", transition:"opacity .25s" }}
              onMouseEnter={e=>e.currentTarget.style.opacity=".85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              Pesan Meja
            </a>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:"28px", left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:"6px", animation:"bounce2 2s infinite" }}>
          <span style={{ fontSize:"9px", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(245,239,228,0.4)" }}>Gulir</span>
          <div style={{ width:"1px", height:"36px", background:"linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)" }}/>
        </div>
        <style>{`@keyframes bounce2{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(8px)}}`}</style>
      </section>

      <KulinerContent/>
    </>
  );
}

export default function KulinerPage() {
  useAnimateOnScroll(".kl-wow", "kl-animated");
  return <Navbar/>;
}
