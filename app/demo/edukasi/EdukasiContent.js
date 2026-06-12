"use client";
import { useState } from "react";
import Image from "next/image";
import { useAnimateOnScroll } from "./hooks";

function ScreenCard({ s, i }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ position:"relative", borderRadius:"16px", overflow:"hidden", cursor:"pointer",
        transform: hov ? "translateY(-6px)" : "none",
        boxShadow: hov ? "0 20px 48px rgba(81,255,182,0.2)" : "0 4px 16px rgba(0,0,0,0.3)",
        transition:"transform .35s ease, box-shadow .35s ease" }}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}>
      {/* Image container — fixed height for consistency */}
      <div style={{ position:"relative", height:"220px", overflow:"hidden" }}>
        <Image unoptimized src={s.src} alt={s.label} fill sizes="(max-width:768px) 50vw, 25vw"
          style={{ objectFit:"cover", transition:"transform .5s ease", transform:hov?"scale(1.08)":"scale(1)" }}/>
      </div>
      {/* Overlay — always visible gradient, strengthens on hover */}
      <div style={{
        position:"absolute", inset:0,
        background: hov
          ? "linear-gradient(to top, rgba(10,20,40,0.97) 0%, rgba(10,20,40,0.6) 55%, rgba(10,20,40,0.1) 100%)"
          : "linear-gradient(to top, rgba(10,20,40,0.88) 0%, rgba(10,20,40,0.3) 60%, transparent 100%)",
        display:"flex", flexDirection:"column", justifyContent:"flex-end",
        padding:"20px", transition:"background .35s",
      }}>
        <span style={{ fontSize:"10px", color:MINT, fontWeight:800, letterSpacing:"0.25em",
          textTransform:"uppercase", marginBottom:"6px", fontFamily:"'Raleway',sans-serif",
          background:"linear-gradient(90deg,#51ffb6,#57a0ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
          {String(i+1).padStart(2,"0")}
        </span>
        <h3 style={{ fontSize:"14px", fontWeight:700, color:"#fff", marginBottom: hov ? "8px" : "0",
          fontFamily:"'Raleway',sans-serif", transition:"margin .3s", lineHeight:1.4 }}>
          {s.label}
        </h3>
        <div style={{ maxHeight: hov ? "80px" : "0", overflow:"hidden", transition:"max-height .35s ease" }}>
          <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.75)", lineHeight:1.6,
            fontFamily:"'Raleway',sans-serif", margin:0 }}>{s.desc}</p>
        </div>
      </div>
      {/* Top badge */}
      <div style={{ position:"absolute", top:"14px", right:"14px", width:"28px", height:"28px",
        borderRadius:"50%", background:"rgba(81,255,182,0.15)", border:"1px solid rgba(81,255,182,0.4)",
        display:"flex", alignItems:"center", justifyContent:"center",
        opacity: hov ? 1 : 0, transition:"opacity .3s" }}>
        <span style={{ fontSize:"12px" }}>↗</span>
      </div>
    </div>
  );
}

const GRAD = "linear-gradient(50deg,#51ffb6,#57a0ff)";
const MINT = "#51ffb6";
const DARK = "#1a1a2e";

const FITUR_KIRI = [
  { icon:"🎬", judul:"Video HD Berkualitas",      desc:"Ribuan video pembelajaran berkualitas tinggi yang bisa diputar di semua perangkat, kapan saja dan di mana saja." },
  { icon:"📚", judul:"Kurikulum Terstruktur",     desc:"Materi disusun secara sistematis oleh pakar di bidangnya, dari tingkat dasar hingga mahir, dengan jalur belajar yang jelas." },
  { icon:"✅", judul:"Kuis &amp; Latihan Soal",  desc:"Uji pemahaman Anda dengan ribuan kuis dan latihan soal yang disesuaikan dengan materi yang sudah Anda pelajari." },
];
const FITUR_KANAN = [
  { icon:"🏆", judul:"Sertifikat Digital",        desc:"Dapatkan sertifikat yang diakui ratusan perusahaan terkemuka Indonesia setelah menyelesaikan setiap program pembelajaran." },
  { icon:"👨‍🏫", judul:"Mentor Berpengalaman",   desc:"Bimbingan langsung dari mentor profesional yang aktif di industri. Tanya jawab dan diskusi tersedia setiap saat." },
  { icon:"👥", judul:"Komunitas Belajar",         desc:"Bergabung dengan 500.000+ pelajar aktif. Diskusi, berbagi pengalaman, dan bangun jaringan profesional bersama." },
];

const KEUNGGULAN = [
  { icon:"🆓", judul:"Gratis Selamanya",    fx:"fadeInLeft",  desc:"Akses ratusan materi dasar secara gratis selamanya. Tidak ada batas waktu, tidak ada kartu kredit yang dibutuhkan." },
  { icon:"📱", judul:"Belajar di Mana Saja", fx:"bounceIn",    desc:"Download materi untuk belajar offline. Tersedia untuk Android dan iOS, belajar bahkan tanpa koneksi internet." },
  { icon:"🏅", judul:"Sertifikat Terpercaya",fx:"fadeInRight", desc:"Sertifikat kami diakui oleh 200+ perusahaan terkemuka di Indonesia, meningkatkan nilai CV dan karir Anda." },
];

const SCREEN = [
  { src:"/demo/edukasi/screen1.jpg", label:"Dashboard Belajar",    desc:"Pantau progres dan statistik belajar Anda secara real-time dengan visualisasi yang intuitif." },
  { src:"/demo/edukasi/screen2.jpg", label:"Video Pembelajaran",   desc:"Tonton ribuan video HD berkualitas studio dari mentor dan praktisi terbaik Indonesia." },
  { src:"/demo/edukasi/screen3.jpg", label:"Perpustakaan Materi",  desc:"Akses ribuan modul, e-book, dan materi pembelajaran dari ratusan bidang ilmu." },
  { src:"/demo/edukasi/screen4.jpg", label:"Sertifikat Digital",   desc:"Raih sertifikat premium yang diakui oleh 200+ perusahaan terkemuka di Indonesia." },
  { src:"/demo/edukasi/screen5.jpg", label:"Kuis Interaktif",      desc:"Uji pemahaman dengan kuis adaptif yang menyesuaikan tingkat kesulitan dengan kemampuan Anda." },
  { src:"/demo/edukasi/screen6.jpg", label:"Live Coding",          desc:"Praktik langsung dengan editor kode terintegrasi dan feedback instan dari sistem AI." },
  { src:"/demo/edukasi/screen7.jpg", label:"Belajar Offline",      desc:"Download materi favorit dan belajar di mana saja tanpa koneksi internet." },
  { src:"/demo/edukasi/screen8.jpg", label:"Komunitas Belajar",    desc:"Bergabung dan diskusi bersama 500.000+ pelajar aktif dalam forum komunitas eksklusif." },
];

const TESTIMONI = [
  { nama:"Budi Santoso",   peran:"Mahasiswa Teknik Informatika",    quote:"BelajarKu membantu saya menguasai pemrograman hanya dalam 3 bulan. Materinya sangat mudah dipahami dan mentor-nya selalu responsif. Sekarang saya sudah dapat pekerjaan pertama saya!" },
  { nama:"Siti Rahayu",    peran:"Ibu Rumah Tangga / Freelancer",   quote:"Saya belajar desain grafis dari nol dan sekarang sudah bisa menghasilkan uang dari rumah. Terima kasih BelajarKu! Platform ini benar-benar mengubah hidup saya." },
  { nama:"Andi Firmansyah",peran:"Pengusaha UKM",                   quote:"Kelas digital marketing di BelajarKu sangat praktis dan langsung bisa diterapkan. Omzet toko online saya naik 3x lipat setelah menerapkan ilmu dari sini." },
];

const PAKET = [
  {
    nama:"Gratis", harga:"Rp 0", per:"selamanya", unggulan:false,
    fitur:["100+ kursus dasar","Video HD","Kuis interaktif","Sertifikat kelulusan","Komunitas belajar"],
    tidak:["Kursus premium","Mentor 1-on-1","Download offline","Akses seumur hidup"],
    cta:"Daftar Gratis",
  },
  {
    nama:"Pro", harga:"Rp 99.000", per:"/ bulan", unggulan:true, badge:"Paling Populer",
    fitur:["Semua di paket Gratis","500+ kursus premium","Mentor 1-on-1","Download offline","Sertifikat premium","Prioritas support"],
    tidak:[],
    cta:"Mulai Belajar",
  },
  {
    nama:"Elite", harga:"Rp 199.000", per:"/ bulan", unggulan:false,
    fitur:["Semua di paket Pro","Kursus eksklusif","Akses seumur hidup","Konsultasi karir","Bootcamp bulanan","Garansi kerja"],
    tidak:[],
    cta:"Mulai Sekarang",
  },
];

const secD = { padding:"80px 0" };
const wrap = { maxWidth:"1200px", margin:"0 auto", padding:"0 24px" };

function SectionTitle({ sub, title, light=true }) {
  return (
    <div className="ed-wow ed-bounceIn" style={{ textAlign:"center", marginBottom:"16px" }}>
      <h2 style={{ fontSize:"clamp(24px,3.5vw,40px)", fontWeight:100, letterSpacing:"0.2em", textTransform:"uppercase", color:light?"#fff":"#333", fontFamily:"'Raleway',sans-serif" }}>{title}</h2>
    </div>
  );
}
function VLine() {
  return (
    <>
      <div style={{ width:"1px", height:"40px", background:GRAD, margin:"0 auto" }}/>
      <div style={{ width:"10px", height:"10px", borderRadius:"50%", background:GRAD, margin:"8px auto 48px" }}/>
    </>
  );
}

export default function EdukasiContent() {
  useAnimateOnScroll(".ed-wow", "ed-animated", 150);
  const [form, setForm] = useState({ nama:"", email:"", pesan:"" });
  const [sent, setSent] = useState(false);
  const f = k=>e=>setForm(p=>({...p,[k]:e.target.value}));

  return (
    <>
      {/* ── FITUR ── */}
      <section id="fitur" style={{ ...secD, background:"#16213e" }}>
        <div style={wrap}>
          <SectionTitle title="Fitur" light={true}/>
          <VLine/>
          <div style={{ textAlign:"center", maxWidth:"600px", margin:"0 auto 48px" }}>
            <Image unoptimized src="/demo/edukasi/feature_main.jpg" alt="Fitur BelajarKu" width={600} height={380}
              style={{ width:"100%", height:"auto", borderRadius:"16px", boxShadow:"0 20px 60px rgba(81,255,182,0.08)" }}
              className="ed-wow ed-bounceIn"/>
          </div>
          <p style={{ textAlign:"center", color:"rgba(255,255,255,0.55)", maxWidth:"560px", margin:"0 auto", lineHeight:1.8, fontFamily:"'Raleway',sans-serif" }} className="ed-wow">
            Didesain khusus untuk pelajar Indonesia — BelajarKu hadir dengan fitur-fitur canggih yang membuat proses belajar menjadi lebih mudah, menyenangkan, dan efektif.
          </p>
        </div>
      </section>

      {/* ── FITUR DETAIL ── */}
      <section style={{ ...secD, background:"#0d1f35" }}>
        <div style={wrap}>
          <div className="grid md:grid-cols-3 gap-0 items-center">
            {/* Left */}
            <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:"40px" }}>
              {FITUR_KIRI.map((f,i)=>(
                <li key={f.judul} className={`ed-wow ed-fadeInLeft ed-d${i+1}`}
                  style={{ display:"flex", gap:"16px", flexDirection:"row-reverse", textAlign:"right" }}>
                  <div style={{ width:"44px", height:"44px", borderRadius:"50%", border:`1px solid rgba(81,255,182,0.4)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", color:MINT, flexShrink:0, background:"rgba(81,255,182,0.06)" }}>{f.icon}</div>
                  <div>
                    <h3 style={{ fontSize:"16px", fontWeight:600, marginBottom:"6px", color:"#fff", fontFamily:"'Raleway',sans-serif" }}>{f.judul}</h3>
                    <p style={{ fontSize:"13px", lineHeight:1.7, color:"rgba(255,255,255,0.55)", margin:0, fontFamily:"'Raleway',sans-serif" }} dangerouslySetInnerHTML={{__html:f.desc}}/>
                  </div>
                </li>
              ))}
            </ul>
            {/* Center */}
            <div style={{ textAlign:"center", padding:"0 32px" }} className="ed-wow ed-bounceIn">
              <Image unoptimized src="/demo/edukasi/feature_left.jpg" alt="App" width={300} height={480}
                style={{ width:"100%", maxWidth:"260px", borderRadius:"24px", objectFit:"cover", boxShadow:`0 0 60px rgba(81,255,182,0.15)` }}/>
            </div>
            {/* Right */}
            <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:"40px" }}>
              {FITUR_KANAN.map((f,i)=>(
                <li key={f.judul} className={`ed-wow ed-fadeInRight ed-d${i+1}`}
                  style={{ display:"flex", gap:"16px" }}>
                  <div style={{ width:"44px", height:"44px", borderRadius:"50%", border:`1px solid rgba(81,255,182,0.4)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", color:MINT, flexShrink:0, background:"rgba(81,255,182,0.06)" }}>{f.icon}</div>
                  <div>
                    <h3 style={{ fontSize:"16px", fontWeight:600, marginBottom:"6px", color:"#fff", fontFamily:"'Raleway',sans-serif" }}>{f.judul}</h3>
                    <p style={{ fontSize:"13px", lineHeight:1.7, color:"rgba(255,255,255,0.55)", margin:0, fontFamily:"'Raleway',sans-serif" }}>{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── FITUR GRATIS VS PREMIUM ── */}
      <section style={{ ...secD, background:"#0d1f35" }}>
        <div style={wrap}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="ed-wow ed-fadeInLeft">
              <Image unoptimized src="/demo/edukasi/feature_right.jpg" alt="Fitur Gratis" width={500} height={360}
                style={{ width:"100%", borderRadius:"16px", objectFit:"cover", boxShadow:"0 16px 48px rgba(81,255,182,0.08)" }}/>
            </div>
            <div className="ed-wow ed-fadeInRight">
              <h3 style={{ fontSize:"18px", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"14px", color:"#fff", fontFamily:"'Raleway',sans-serif" }}>Fitur Gratis</h3>
              <p style={{ fontSize:"14px", lineHeight:1.7, color:"rgba(255,255,255,0.55)", marginBottom:"20px", fontFamily:"'Raleway',sans-serif" }}>Mulai belajar tanpa biaya. Akses ratusan kursus dasar, video pembelajaran, dan komunitas belajar aktif — semuanya gratis.</p>
              <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:"10px" }}>
                {["100+ kursus gratis","Video HD berkualitas","Kuis &amp; latihan soal","Sertifikat kelulusan","Forum komunitas","Akses seumur hidup"].map(f=>(
                  <li key={f} style={{ fontSize:"14px", color:"rgba(255,255,255,0.75)", display:"flex", alignItems:"center", gap:"10px", fontFamily:"'Raleway',sans-serif" }}>
                    <span style={{ color:MINT, fontWeight:700, fontSize:"18px" }}>›</span>
                    <span dangerouslySetInnerHTML={{__html:f}}/>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center" style={{ marginTop:"64px" }}>
            <div className="ed-wow ed-fadeInLeft">
              <h3 style={{ fontSize:"18px", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"14px", color:"#fff", fontFamily:"'Raleway',sans-serif" }}>Fitur Premium</h3>
              <p style={{ fontSize:"14px", lineHeight:1.7, color:"rgba(255,255,255,0.55)", marginBottom:"20px", fontFamily:"'Raleway',sans-serif" }}>Tingkatkan pengalaman belajar Anda dengan akses penuh ke semua fitur premium dan mentoring langsung dari para ahli.</p>
              <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:"10px" }}>
                {["500+ kursus premium","Mentor 1-on-1","Download offline","Sertifikat premium","Konsultasi karir","Bootcamp eksklusif"].map(f=>(
                  <li key={f} style={{ fontSize:"14px", color:"rgba(255,255,255,0.75)", display:"flex", alignItems:"center", gap:"10px", fontFamily:"'Raleway',sans-serif" }}>
                    <span style={{ color:"#57a0ff", fontWeight:700, fontSize:"18px" }}>‹</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="ed-wow ed-fadeInRight">
              <Image unoptimized src="/demo/edukasi/feature_left.jpg" alt="Fitur Premium" width={500} height={360}
                style={{ width:"100%", borderRadius:"16px", objectFit:"cover", boxShadow:"0 16px 48px rgba(81,255,182,0.08)" }}/>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEUNGGULAN ── */}
      <section id="keunggulan" style={{ ...secD, background:DARK }}>
        <div style={wrap}>
          <SectionTitle title="Keunggulan"/>
          <VLine/>
          <p style={{ textAlign:"center", color:"rgba(255,255,255,0.55)", maxWidth:"560px", margin:"0 auto 60px", lineHeight:1.8, fontFamily:"'Raleway',sans-serif" }} className="ed-wow">
            BelajarKu dirancang untuk memudahkan proses belajar siapa saja — dari pelajar, mahasiswa, hingga profesional yang ingin meningkatkan skill.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {KEUNGGULAN.map((k,i)=>(
              <div key={k.judul} className={`ed-wow ed-${k.fx} ed-d${i+1}`} style={{ textAlign:"center" }}>
                <div style={{ width:"80px", height:"80px", borderRadius:"50%", border:`1px solid rgba(81,255,182,0.3)`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:"28px", color:MINT, background:"rgba(81,255,182,0.06)", transition:"all .3s" }}
                  onMouseEnter={e=>{e.currentTarget.style.background=GRAD;e.currentTarget.style.color=DARK;}}
                  onMouseLeave={e=>{e.currentTarget.style.background="rgba(81,255,182,0.06)";e.currentTarget.style.color=MINT;}}>
                  {k.icon}
                </div>
                <h3 style={{ fontSize:"18px", fontWeight:600, color:"#fff", marginBottom:"12px", fontFamily:"'Raleway',sans-serif" }}>{k.judul}</h3>
                <p style={{ color:"rgba(255,255,255,0.55)", fontSize:"14px", lineHeight:1.7, fontFamily:"'Raleway',sans-serif" }}>{k.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALERI / SCREENSHOTS ── */}
      <section id="galeri" style={{ ...secD, background:"#16213e" }}>
        <div style={wrap}>
          <SectionTitle title="Screenshots" light={true}/>
          <VLine/>
          <p style={{ textAlign:"center", color:"rgba(255,255,255,0.5)", maxWidth:"500px", margin:"0 auto 40px", fontSize:"14px", lineHeight:1.7, fontFamily:"'Raleway',sans-serif" }} className="ed-wow">
            Intip tampilan aplikasi BelajarKu — dirancang indah, intuitif, dan menyenangkan untuk digunakan setiap hari.
          </p>
          {/* 2 rows × 4 columns */}
          <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SCREEN.slice(0,4).map((s,i)=>(
                <div key={i} className={`ed-wow ed-flipInY ed-d${i+1}`}>
                  <ScreenCard s={s} i={i}/>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SCREEN.slice(4,8).map((s,i)=>(
                <div key={i+4} className={`ed-wow ed-flipInY ed-d${i+1}`}>
                  <ScreenCard s={s} i={i+4}/>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div style={{ textAlign:"center", marginTop:"48px" }} className="ed-wow">
            <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"13px", marginBottom:"20px", fontFamily:"'Raleway',sans-serif" }}>
              Tersedia di Android &amp; iOS — gratis untuk diunduh
            </p>
            <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
              <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:"10px", padding:"10px 24px", borderRadius:"50px", background:"linear-gradient(90deg,#51ffb6,#57a0ff)", color:"#1a1a2e", fontSize:"12px", fontWeight:700, letterSpacing:"0.1em", textDecoration:"none", fontFamily:"'Raleway',sans-serif" }}>
                🤖 Google Play
              </a>
              <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:"10px", padding:"10px 24px", borderRadius:"50px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(81,255,182,0.3)", color:"#fff", fontSize:"12px", fontWeight:700, letterSpacing:"0.1em", textDecoration:"none", fontFamily:"'Raleway',sans-serif" }}>
                🍎 App Store
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONI ── */}
      <section id="testimoni" style={{ ...secD, background:"linear-gradient(135deg,#1a1a2e,#16213e)" }}>
        <div style={wrap}>
          <SectionTitle title="Testimoni"/>
          <VLine/>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONI.map((t,i)=>(
              <div key={t.nama} className={`ed-wow ed-bounceInUp ed-d${i+1}`}
                style={{ textAlign:"center", padding:"36px 28px", borderRadius:"12px", background:"rgba(255,255,255,0.04)", border:`1px solid rgba(81,255,182,0.1)` }}>
                <p style={{ fontSize:"14px", lineHeight:1.8, color:"rgba(255,255,255,0.75)", fontStyle:"italic", marginBottom:"24px", fontFamily:"'Raleway',sans-serif" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p style={{ fontSize:"12px", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:MINT, fontFamily:"'Raleway',sans-serif" }}>{t.nama}</p>
                <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.4)", marginTop:"4px", fontFamily:"'Raleway',sans-serif" }}>{t.peran}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HARGA ── */}
      <section id="harga" style={{ ...secD, background:"linear-gradient(135deg,#0d1f35,#1a1a2e)" }}>
        <div style={{ maxWidth:"1080px", margin:"0 auto", padding:"0 24px" }}>
          <SectionTitle title="Pilih Paket"/>
          <VLine/>
          <p style={{ textAlign:"center", color:"rgba(255,255,255,0.5)", maxWidth:"440px", margin:"0 auto 64px", lineHeight:1.8, fontFamily:"'Raleway',sans-serif", fontSize:"14px" }} className="ed-wow">
            Mulai gratis, upgrade kapan saja. Tanpa kontrak, tanpa biaya tersembunyi.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"24px", alignItems:"start" }}>
            {PAKET.map((p,i)=>{
              const isF = p.unggulan;
              const ICONS = ["🎯","🚀","💎"];
              return (
                <div key={p.nama} className={`ed-wow ed-flipInY ed-d${i+1}`}
                  style={{ position:"relative", borderRadius:"20px", overflow:"hidden",
                    background: isF ? "linear-gradient(145deg,#0d2f45,#0a1e32)" : "rgba(255,255,255,0.03)",
                    border: isF ? "1px solid rgba(81,255,182,0.4)" : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: isF ? "0 0 80px rgba(81,255,182,0.1), inset 0 1px 0 rgba(81,255,182,0.2)" : "none",
                    padding:"0",
                    transform: isF ? "translateY(-12px)" : "none",
                  }}>

                  {/* Gradient top bar */}
                  <div style={{ height:"4px", background: isF ? GRAD : "rgba(255,255,255,0.08)" }}/>

                  {/* Badge */}
                  {isF && (
                    <div style={{ position:"absolute", top:"16px", right:"16px",
                      background:GRAD, color:DARK, fontSize:"9px", fontWeight:900,
                      letterSpacing:"0.15em", textTransform:"uppercase",
                      padding:"4px 12px", borderRadius:"20px", fontFamily:"'Raleway',sans-serif" }}>
                      🔥 TERLARIS
                    </div>
                  )}

                  <div style={{ padding:"32px 28px 28px" }}>
                    {/* Icon + Name */}
                    <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"20px" }}>
                      <span style={{ fontSize:"24px" }}>{ICONS[i]}</span>
                      <div>
                        <p style={{ fontSize:"11px", fontWeight:800, letterSpacing:"0.2em",
                          textTransform:"uppercase", color: isF ? MINT : "rgba(255,255,255,0.5)",
                          fontFamily:"'Raleway',sans-serif", margin:0 }}>{p.nama}</p>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ marginBottom:"28px" }}>
                      <div style={{ display:"flex", alignItems:"flex-end", gap:"6px", lineHeight:1 }}>
                        <span style={{ fontSize: p.harga === "Rp 0" ? "48px" : "36px",
                          fontWeight:200, color:"#fff", fontFamily:"'Raleway',sans-serif" }}>
                          {p.harga}
                        </span>
                        <span style={{ fontSize:"13px", color:"rgba(255,255,255,0.4)",
                          fontFamily:"'Raleway',sans-serif", paddingBottom:"6px" }}>{p.per}</span>
                      </div>
                      {isF && (
                        <p style={{ fontSize:"11px", color:"rgba(81,255,182,0.6)", marginTop:"6px",
                          fontFamily:"'Raleway',sans-serif" }}>
                          💡 Hemat 20% bayar tahunan
                        </p>
                      )}
                    </div>

                    {/* Divider */}
                    <div style={{ height:"1px", background: isF ? "rgba(81,255,182,0.15)" : "rgba(255,255,255,0.06)", marginBottom:"24px" }}/>

                    {/* Features — only included features, no strikethrough */}
                    <ul style={{ listStyle:"none", padding:0, margin:"0 0 32px", display:"flex", flexDirection:"column", gap:"0" }}>
                      {p.fitur.map(ft=>(
                        <li key={ft} style={{ fontSize:"13px",
                          color: isF ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.6)",
                          padding:"10px 0", display:"flex", alignItems:"center", gap:"12px",
                          borderBottom:`1px solid ${isF ? "rgba(81,255,182,0.07)" : "rgba(255,255,255,0.04)"}`,
                          fontFamily:"'Raleway',sans-serif" }}>
                          <span style={{
                            width:"20px", height:"20px", borderRadius:"50%", flexShrink:0,
                            background: isF ? GRAD : "rgba(81,255,182,0.1)",
                            display:"flex", alignItems:"center", justifyContent:"center",
                            fontSize:"10px", fontWeight:900,
                            color: isF ? DARK : MINT,
                          }}>✓</span>
                          {ft}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a href="#kontak" style={{
                      display:"block", textAlign:"center", textDecoration:"none",
                      padding:"14px", borderRadius:"50px",
                      fontSize:"11px", fontWeight:800, letterSpacing:"0.2em", textTransform:"uppercase",
                      fontFamily:"'Raleway',sans-serif", transition:"all .3s",
                      background: isF ? GRAD : "transparent",
                      color: isF ? DARK : "rgba(255,255,255,0.6)",
                      border: isF ? "none" : "1px solid rgba(255,255,255,0.15)",
                    }}
                    onMouseEnter={e=>{ if(!isF){ e.currentTarget.style.borderColor=MINT; e.currentTarget.style.color=MINT; } else { e.currentTarget.style.opacity="0.85"; } }}
                    onMouseLeave={e=>{ if(!isF){ e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; e.currentTarget.style.color="rgba(255,255,255,0.6)"; } else { e.currentTarget.style.opacity="1"; } }}>
                      {p.cta}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom note */}
          <p style={{ textAlign:"center", color:"rgba(255,255,255,0.25)", fontSize:"12px",
            marginTop:"40px", fontFamily:"'Raleway',sans-serif", letterSpacing:"0.05em" }} className="ed-wow">
            Semua paket dilengkapi garansi uang kembali 14 hari · Tidak perlu kartu kredit untuk paket Gratis
          </p>
        </div>
      </section>

      {/* ── KONTAK ── */}
      <section id="kontak" style={{ ...secD, background:DARK }}>
        <div style={wrap}>
          <SectionTitle title="Hubungi Kami"/>
          <VLine/>
          <div className="grid md:grid-cols-4 gap-4" style={{ marginBottom:"56px" }}>
            {[
              { icon:"📍", judul:"Kantor",    teks:"Jl. Pendidikan No. 88\nJakarta Selatan, 12160", fx:"fadeInLeft" },
              { icon:"📞", judul:"Telepon",   teks:"+62 21 5551 8888\n+62 812-3456-7890",          fx:"fadeInLeft" },
              { icon:"✉",  judul:"Email",     teks:"halo@belajarku.id\nsupport@belajarku.id",      fx:"fadeInRight" },
              { icon:"🕐", judul:"Jam Kerja", teks:"Senin – Jumat: 08.00 – 20.00\nSabtu: 09.00 – 17.00", fx:"fadeInRight" },
            ].map(c=>(
              <div key={c.judul} className={`ed-wow ed-${c.fx}`} style={{ textAlign:"center", padding:"28px 16px" }}>
                <div style={{ width:"60px", height:"60px", borderRadius:"50%", border:`1px solid rgba(81,255,182,0.3)`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontSize:"22px", color:MINT }}>{c.icon}</div>
                <h3 style={{ fontSize:"13px", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:"8px", color:"#fff", fontFamily:"'Raleway',sans-serif" }}>{c.judul}</h3>
                <p style={{ fontSize:"13px", lineHeight:1.7, color:"rgba(255,255,255,0.55)", whiteSpace:"pre-line", fontFamily:"'Raleway',sans-serif" }}>{c.teks}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{ maxWidth:"760px", margin:"0 auto" }} className="ed-wow">
            <h3 style={{ textAlign:"center", fontSize:"22px", fontWeight:300, color:"#fff", marginBottom:"32px", letterSpacing:"0.1em", fontFamily:"'Raleway',sans-serif" }}>Kirim Pesan</h3>
            {sent ? (
              <div style={{ textAlign:"center", padding:"40px 0" }}>
                <div style={{ width:"60px", height:"60px", borderRadius:"50%", background:GRAD, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", fontSize:"22px", color:DARK }}>✓</div>
                <h3 style={{ fontSize:"24px", fontWeight:300, color:"#fff", marginBottom:"8px", fontFamily:"'Raleway',sans-serif" }}>Pesan terkirim!</h3>
                <p style={{ color:"rgba(255,255,255,0.5)", fontFamily:"'Raleway',sans-serif" }}>Kami akan membalas dalam 24 jam.</p>
              </div>
            ) : (
              <form onSubmit={e=>{e.preventDefault();setSent(true);}}>
                <div className="grid md:grid-cols-2 gap-x-8">
                  {[
                    { k:"nama", l:"Nama Lengkap", ph:"Nama Anda" },
                    { k:"email", l:"Email", ph:"email@anda.com" },
                  ].map(fi=>(
                    <div key={fi.k} style={{ marginBottom:"24px" }}>
                      <div style={{ fontSize:"9px", fontWeight:600, letterSpacing:".25em", textTransform:"uppercase", color:MINT, marginBottom:"8px", fontFamily:"'Raleway',sans-serif" }}>{fi.l}</div>
                      <input required type={fi.k==="email"?"email":"text"} placeholder={fi.ph} value={form[fi.k]} onChange={f(fi.k)}
                        style={{ display:"block", width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(81,255,182,0.15)", borderRadius:"8px", padding:"12px 16px", fontSize:"14px", color:"#fff", outline:"none", fontFamily:"'Raleway',sans-serif", boxSizing:"border-box", transition:"border-color .25s" }}
                        onFocus={e=>e.target.style.borderColor=MINT} onBlur={e=>e.target.style.borderColor="rgba(81,255,182,0.15)"}/>
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom:"28px" }}>
                  <div style={{ fontSize:"9px", fontWeight:600, letterSpacing:".25em", textTransform:"uppercase", color:MINT, marginBottom:"8px", fontFamily:"'Raleway',sans-serif" }}>Pesan</div>
                  <textarea required rows={4} value={form.pesan} onChange={f("pesan")} placeholder="Ceritakan kebutuhan Anda..."
                    style={{ display:"block", width:"100%", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(81,255,182,0.15)", borderRadius:"8px", padding:"12px 16px", fontSize:"14px", color:"#fff", outline:"none", resize:"none", fontFamily:"'Raleway',sans-serif", boxSizing:"border-box", lineHeight:1.7, transition:"border-color .25s" }}
                    onFocus={e=>e.target.style.borderColor=MINT} onBlur={e=>e.target.style.borderColor="rgba(81,255,182,0.15)"}/>
                </div>
                <div style={{ textAlign:"center" }}>
                  <button type="submit" style={{ background:GRAD, color:DARK, border:"none", fontSize:"10px", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", padding:"14px 48px", cursor:"pointer", borderRadius:"50px", fontFamily:"'Raleway',sans-serif", transition:"opacity .25s" }}
                    onMouseEnter={e=>e.currentTarget.style.opacity=".85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                    Kirim Pesan →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#0d1f35", padding:"56px 0 36px" }}>
        <div style={{ maxWidth:"800px", margin:"0 auto", padding:"0 24px", textAlign:"center" }}>
          <div style={{ fontSize:"40px", fontWeight:100, letterSpacing:"0.2em", fontFamily:"'Raleway',sans-serif", background:GRAD, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:"20px" }}>
            belajarku
          </div>
          <div style={{ display:"flex", justifyContent:"center", gap:"16px", listStyle:"none", padding:0, marginBottom:"28px" }}>
            {["𝕏","f","in","▶","📷"].map(s=>(
              <a key={s} href="#" style={{ width:"38px", height:"38px", borderRadius:"50%", border:"1px solid rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.5)", fontSize:"14px", textDecoration:"none", transition:"all .25s" }}
                onMouseEnter={e=>{e.currentTarget.style.background=GRAD;e.currentTarget.style.borderColor="transparent";e.currentTarget.style.color=DARK;}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";e.currentTarget.style.color="rgba(255,255,255,0.5)";}}>{s}</a>
            ))}
          </div>
          <p style={{ color:"rgba(255,255,255,0.25)", fontSize:"12px", fontFamily:"'Raleway',sans-serif" }}>
            © {new Date().getFullYear()} BelajarKu. Hak Cipta Dilindungi · Platform Belajar Online Indonesia
          </p>
        </div>
      </footer>

      <a href="#beranda" style={{ position:"fixed", bottom:"24px", right:"24px", zIndex:500, width:"44px", height:"44px", borderRadius:"50%", background:GRAD, color:DARK, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", textDecoration:"none", transition:"opacity .25s" }}
        onMouseEnter={e=>e.currentTarget.style.opacity=".8"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>↑</a>
    </>
  );
}
