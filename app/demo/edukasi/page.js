"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAnimateOnScroll } from "./hooks";

const GRAD = "linear-gradient(50deg,#51ffb6,#57a0ff)";
const DARK = "#1a1a2e";
const MINT = "#51ffb6";

const EdukasiContent = dynamic(()=>import("./EdukasiContent"), {
  ssr: false,
  loading:()=>(
    <div style={{ minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", background:DARK }}>
      <div style={{ width:"40px", height:"2px", background:GRAD, animation:"edx 1.2s ease-in-out infinite alternate", borderRadius:"2px" }}/>
      <style>{`@keyframes edx{to{width:80px}}`}</style>
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

  const links=[["#beranda","Beranda"],["#fitur","Fitur"],["#keunggulan","Keunggulan"],["#galeri","Galeri"],["#testimoni","Testimoni"],["#harga","Harga"],["#kontak","Kontak"]];

  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, padding:scrolled?"10px 0":"16px 0", background:scrolled?"rgba(26,26,46,0.97)":"transparent", backdropFilter:scrolled?"blur(12px)":"none", boxShadow:scrolled?"0 2px 20px rgba(81,255,182,0.1)":"none", transition:"all .4s" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <a href="#beranda" style={{ fontSize:"22px", fontWeight:800, fontFamily:"'Raleway',sans-serif", letterSpacing:"0.05em", background:GRAD, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", textDecoration:"none" }}>
            BelajarKu
          </a>
          <div className="hidden md:flex" style={{ gap:"28px" }}>
            {links.map(([href,label])=>(
              <a key={href} href={href} style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(255,255,255,0.7)", textDecoration:"none", transition:"color .25s" }}
                onMouseEnter={e=>e.currentTarget.style.color=MINT} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.7)"}>{label}</a>
            ))}
          </div>
          <button className="md:hidden" onClick={()=>setOpen(true)} style={{ background:"none", border:`1px solid rgba(81,255,182,0.3)`, color:MINT, padding:"6px 14px", fontSize:"11px", letterSpacing:"0.1em", cursor:"pointer", borderRadius:"4px", fontFamily:"'Raleway',sans-serif" }}>
            ☰
          </button>
        </div>
      </nav>

      {/* Overlay menu mobile */}
      <div style={{ position:"fixed", inset:0, zIndex:200, background:"rgba(26,26,46,0.97)", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", opacity:open?1:0, pointerEvents:open?"auto":"none", transition:"opacity .4s" }}>
        <button onClick={()=>setOpen(false)} style={{ position:"absolute", top:"24px", right:"24px", background:"none", border:"none", color:"#fff", fontSize:"24px", cursor:"pointer" }}>✕</button>
        {links.map(([href,label],i)=>(
          <a key={href} href={href} onClick={()=>setOpen(false)}
            style={{ fontSize:"clamp(28px,5vw,44px)", fontWeight:100, letterSpacing:"0.15em", textTransform:"uppercase", background:GRAD, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", textDecoration:"none", margin:"12px 0", opacity:open?1:0, transform:open?"none":"translateY(20px)", transition:`all .4s ${i*0.05}s` }}>
            {label}
          </a>
        ))}
      </div>

      {/* Hero */}
      <section id="beranda" style={{ minHeight:"100vh", backgroundImage:"url(/demo/edukasi/hero.jpg)", backgroundSize:"cover", backgroundPosition:"center", display:"flex", alignItems:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(26,26,46,0.92),rgba(22,33,62,0.85))" }}/>
        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 24px", paddingTop:"80px", width:"100%", position:"relative", zIndex:1 }}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="ed-wow ed-bounceIn">
              <h1 style={{ fontSize:"clamp(36px,5vw,64px)", fontWeight:100, letterSpacing:"0.08em", color:"#fff", lineHeight:1.2, marginBottom:"20px", fontFamily:"'Raleway',sans-serif" }}>
                <strong style={{ fontWeight:800, background:GRAD, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Belajar</strong><br/>Lebih Mudah,<br/>Raih Impianmu
              </h1>
              <p style={{ fontSize:"16px", lineHeight:1.8, color:"rgba(255,255,255,0.7)", maxWidth:"520px", marginBottom:"36px", fontFamily:"'Raleway',sans-serif", fontWeight:300 }}>
                BelajarKu telah dipercaya lebih dari 500.000 pelajar Indonesia. Platform belajar online terlengkap dengan ribuan materi, mentor berpengalaman, dan sertifikat yang diakui industri.
              </p>
              <div style={{ display:"flex", gap:"16px", flexWrap:"wrap" }}>
                <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:"12px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(81,255,182,0.4)", color:"#fff", padding:"12px 24px", borderRadius:"50px", fontSize:"13px", fontWeight:500, textDecoration:"none", transition:"all .3s", fontFamily:"'Raleway',sans-serif" }}
                  onMouseEnter={e=>{e.currentTarget.style.background=GRAD;e.currentTarget.style.borderColor="transparent";e.currentTarget.style.color=DARK;}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.borderColor="rgba(81,255,182,0.4)";e.currentTarget.style.color="#fff";}}>
                  🤖 <span><small style={{ display:"block", fontSize:"9px", opacity:.7 }}>Unduh di</small><strong>Google Play</strong></span>
                </a>
                <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:"12px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(81,255,182,0.4)", color:"#fff", padding:"12px 24px", borderRadius:"50px", fontSize:"13px", fontWeight:500, textDecoration:"none", transition:"all .3s", fontFamily:"'Raleway',sans-serif" }}
                  onMouseEnter={e=>{e.currentTarget.style.background=GRAD;e.currentTarget.style.borderColor="transparent";e.currentTarget.style.color=DARK;}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.borderColor="rgba(81,255,182,0.4)";e.currentTarget.style.color="#fff";}}>
                  🍎 <span><small style={{ display:"block", fontSize:"9px", opacity:.7 }}>Unduh di</small><strong>App Store</strong></span>
                </a>
              </div>
            </div>
            <div style={{ textAlign:"center" }} className="ed-wow ed-flipInY ed-d2">
              <Image unoptimized src="/demo/edukasi/feature_main.jpg" alt="BelajarKu App" width={420} height={520}
                priority
                style={{ width:"100%", maxWidth:"400px", height:"auto", borderRadius:"16px", boxShadow:"0 20px 60px rgba(81,255,182,0.15)" }}/>
            </div>
          </div>
        </div>
      </section>

      <EdukasiContent/>
    </>
  );
}

export default function EdukasiPage() {
  useAnimateOnScroll(".ed-wow", "ed-animated");
  return <Navbar/>;
}
