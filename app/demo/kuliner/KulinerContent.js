"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAnimateOnScroll } from "./hooks";

const G = "#c9a84c";
const DARK = "#18140e";
const DARK2 = "#221e16";
const CREAM = "#f5efe4";
const MUTED = "rgba(245,239,228,0.55)";

const MENU_ITEMS = [
  { img:"/demo/kuliner/menu1.jpg", nama:"Rendang Wagyu Spesial", harga:"Rp 185.000", desc:"Daging wagyu dimasak 6 jam dengan rempah pilihan — rendang terlembut yang pernah Anda cicipi.", offsetTop:false },
  { img:"/demo/kuliner/menu2.jpg", nama:"Nasi Goreng Rempah",    harga:"Rp 65.000",  desc:"Nasi goreng wangi dengan bumbu rempah lengkap, telur kampung, dan kerupuk udang spesial.", offsetTop:true },
  { img:"/demo/kuliner/menu3.jpg", nama:"Soto Ayam Kampung",      harga:"Rp 55.000",  desc:"Kuah bening segar dengan ayam kampung pilihan, bihun, dan pelengkap soto khas Jawa Tengah.", offsetTop:false },
  { img:"/demo/kuliner/menu4.jpg", nama:"Bebek Betutu Bali",      harga:"Rp 120.000", desc:"Bebek utuh dipanggang dalam daun pisang dengan bumbu base genep Bali selama 8 jam.", offsetTop:true },
  { img:"/demo/kuliner/menu5.jpg", nama:"Iga Bakar Asam Manis",   harga:"Rp 135.000", desc:"Iga sapi pilihan dipanggang sempurna dengan balutan bumbu asam manis kecap spesial, disajikan di atas papan kayu jati.", offsetTop:false },
  { img:"/demo/kuliner/menu6.jpg", nama:"Gado-gado Betawi",       harga:"Rp 45.000",  desc:"Sayuran segar rebus dengan saus kacang spesial khas Betawi, dilengkapi telur rebus dan kerupuk gendar renyah.", offsetTop:true },
  { img:"/demo/kuliner/menu7.jpg", nama:"Ayam Bakar Kecap",       harga:"Rp 75.000",  desc:"Ayam kampung pilihan dimarinasi semalaman dengan kecap manis dan rempah, dibakar hingga kecokelatan sempurna.", offsetTop:false },
  { img:"/demo/kuliner/menu8.jpg", nama:"Siomay Bandung",         harga:"Rp 40.000",  desc:"Siomay ikan tenggiri kukus khas Bandung dengan saus kacang gurih, tahu, telur, dan pare istimewa.", offsetTop:true },
];

const SLIDES = [
  { img:"/demo/kuliner/slide1.jpg", judul:"Rendang", em:"Warisan", emWord:"Leluhur", desc:"Daging wagyu kami dimasak selama 6 jam dengan 30 jenis rempah pilihan dari Sumatera Barat. Setiap suapan adalah perjalanan menuju cita rasa yang tak terlupakan.", cta:"Pesan Rendang" },
  { img:"/demo/kuliner/slide2.jpg", judul:"Nasi Goreng", em:"Khas", emWord:"Nusantara", desc:"Wangi rempah menguar dari setiap butir nasi yang digoreng sempurna dengan minyak kelapa dan bumbu rahasia keluarga kami selama tiga generasi.", cta:"Lihat Menu" },
  { img:"/demo/kuliner/slide3.jpg", judul:"Bebek Betutu", em:"Bali", emWord:"Asli", desc:"Bebek utuh dibungkus daun pisang bersama bumbu base genep yang kaya, dipanggang perlahan selama 8 jam hingga daging terlepas sempurna dari tulang.", cta:"Reservasi Sekarang" },
];

const ACARA = [
  { img:"/demo/kuliner/event1.jpg", tanggal:"Setiap Sabtu Malam",           judul:"Malam Keluarga Spesial",     desc:"Nikmati makan malam bersama keluarga dengan menu spesial dan hiburan musik tradisional Indonesia setiap Sabtu malam." },
  { img:"/demo/kuliner/event2.jpg", tanggal:"Sabtu Pertama Setiap Bulan",   judul:"Workshop Masak Nusantara",   desc:"Belajar memasak hidangan autentik Indonesia bersama chef kami. Tersedia untuk 15 peserta. Daftar sekarang sebelum penuh." },
  { img:"/demo/kuliner/event3.jpg", tanggal:"Setiap Hari Jumat & Sabtu",    judul:"Malam Rempah Live Music",   desc:"Paduan harmonis antara cita rasa masakan Nusantara dan alunan musik akustik yang memanjakan telinga. Reservasi disarankan." },
];

function useSlider(count, interval=4500) {
  const [current, setCurrent] = useState(0);
  useEffect(()=>{
    const t = setInterval(()=>setCurrent(c=>(c+1)%count), interval);
    return()=>clearInterval(t);
  },[count, interval]);
  return [current, setCurrent];
}

const secStyle = { padding:"80px 0" };
const wrap = { maxWidth:"1200px", margin:"0 auto", padding:"0 48px" };
const secHead = (title) => (
  <div className="kl-wow" style={{ marginBottom:"48px" }}>
    <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:300, letterSpacing:"0.03em", marginBottom:"20px" }}>{title}</h2>
    <div style={{ width:"36px", height:"1px", background:G }}/>
  </div>
);

export default function KulinerContent() {
  useAnimateOnScroll(".kl-wow", "kl-animated", 150);
  const [slide, setSlide] = useSlider(SLIDES.length);

  return (
    <>
      {/* ── TENTANG ── */}
      <section id="tentang" style={{ ...secStyle, background:"#1a1610", color:CREAM }}>
        <div style={wrap}>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="kl-wow kl-fadeInLeft">
              <Image unoptimized src="/demo/kuliner/about.jpg" alt="Dapur kami" width={600} height={700}
                style={{ width:"100%", height:"auto", objectFit:"cover" }}/>
            </div>
            <div className="kl-wow">
              {secHead("Warung Kami")}
              <p style={{ color:MUTED, fontSize:"15px", lineHeight:1.8, marginBottom:"16px" }}>
                Bumbu Nusantara lahir dari kecintaan mendalam terhadap kekayaan cita rasa masakan Indonesia. Didirikan sejak 2010, kami hadir untuk menjaga dan merayakan keagungan kuliner leluhur yang hampir terlupakan.
              </p>
              <p style={{ color:MUTED, fontSize:"15px", lineHeight:1.8, marginBottom:"16px" }}>
                Setiap hidangan kami diracik dengan rempah-rempah pilihan yang didatangkan langsung dari petani lokal di Sumatera, Jawa, dan Bali. Chef kami berpengalaman lebih dari 20 tahun dalam dunia kuliner tradisional Indonesia.
              </p>
              <p style={{ color:MUTED, fontSize:"15px", lineHeight:1.8, marginBottom:"32px" }}>
                Kami percaya bahwa makanan bukan sekadar kebutuhan — melainkan sebuah perjalanan rasa, kenangan, dan identitas budaya yang wajib dijaga dan diwariskan.
              </p>
              <a href="#reservasi" style={{ display:"inline-block", padding:"12px 32px", border:`1px solid ${G}`, color:G, fontSize:"10px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", textDecoration:"none", transition:"all .25s" }}
                onMouseEnter={e=>{e.currentTarget.style.background=G;e.currentTarget.style.color=DARK;}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=G;}}>
                Pesan Meja
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" style={{ ...secStyle, background:DARK, color:CREAM }}>
        <div style={wrap}>
          <div className="kl-wow" style={{ marginBottom:"48px" }}>
            <p style={{ fontFamily:"'Satisfy',cursive", fontSize:"18px", color:G, marginBottom:"8px" }}>Pilihan Terbaik Kami</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:300, letterSpacing:"0.03em", marginBottom:"20px" }}>Menu Unggulan</h2>
            <div style={{ width:"36px", height:"1px", background:G, marginBottom:"20px" }}/>
            <div className="grid md:grid-cols-2">
              <p style={{ color:MUTED, fontSize:"15px", lineHeight:1.8 }}>
                Setiap hidangan adalah hasil kolaborasi antara resep leluhur yang telah teruji waktu dengan sentuhan modern yang menjaga keaslian cita rasa.
              </p>
            </div>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:"48px" }}>
            {[MENU_ITEMS.slice(0,4), MENU_ITEMS.slice(4,8)].map((row, ri)=>(
              <div key={ri} className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {row.map((item,i)=>(
                  <div key={item.nama} className="kl-wow" style={{ transitionDelay:`${i*0.12}s`, marginTop:item.offsetTop?"48px":"0" }}>
                    <div style={{ overflow:"hidden", marginBottom:"16px" }}>
                      <Image unoptimized src={item.img} alt={item.nama} width={400} height={300}
                        style={{ width:"100%", aspectRatio:"4/3", objectFit:"cover", transition:"transform .5s ease" }}
                        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
                        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
                    </div>
                    <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"20px", fontWeight:400, marginBottom:"6px" }}>{item.nama}</h3>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"26px", fontWeight:400, color:G, marginBottom:"8px" }}>{item.harga}</div>
                    <p style={{ color:MUTED, fontSize:"13px", lineHeight:1.7 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONI ── */}
      <section style={{ ...secStyle, background:"#1a1610", color:CREAM }}>
        <div style={wrap}>
          <div className="kl-wow" style={{ marginBottom:"48px" }}>
            <p style={{ fontFamily:"'Satisfy',cursive", fontSize:"18px", color:G, marginBottom:"8px" }}>Apa Kata Mereka</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:300, letterSpacing:"0.03em", marginBottom:"20px" }}>Testimoni Pelanggan</h2>
            <div style={{ width:"36px", height:"1px", background:G, marginBottom:"20px" }}/>
            <div className="grid md:grid-cols-2">
              <p style={{ color:MUTED, fontSize:"15px", lineHeight:1.8 }}>Kami bangga melayani ribuan pelanggan setia yang telah mempercayakan momen spesial mereka bersama kami.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="kl-wow kl-fadeInLeft">
              <Image unoptimized src="/demo/kuliner/testimony.jpg" alt="Pelanggan" width={500} height={640}
                style={{ width:"100%", maxWidth:"420px", objectFit:"cover", aspectRatio:"4/5" }}/>
            </div>
            <div className="kl-wow kl-fadeInRight">
              <blockquote style={{ borderLeft:`3px solid ${G}`, padding:"24px 32px", background:"rgba(201,168,76,0.05)", margin:0 }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(18px,2vw,24px)", fontWeight:300, fontStyle:"italic", lineHeight:1.7, color:CREAM, marginBottom:"16px" }}>
                  &ldquo;Pengalaman makan malam yang luar biasa! Rendang Wagyu-nya sungguh tak tertandingi — dagingnya begitu lembut dan kaya rempah. Suasana restorannya pun sangat hangat dan autentik. Kami sudah langganan setiap bulan.&rdquo;
                </p>
                <cite style={{ color:G, fontSize:"13px", letterSpacing:"0.1em" }}>— Budi Santoso &amp; Keluarga, Pelanggan Setia</cite>
              </blockquote>
              <blockquote style={{ borderLeft:`3px solid ${G}`, padding:"24px 32px", background:"rgba(201,168,76,0.05)", margin:"24px 0 0" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(16px,1.8vw,22px)", fontWeight:300, fontStyle:"italic", lineHeight:1.7, color:CREAM, marginBottom:"16px" }}>
                  &ldquo;Bebek Betutu Bali-nya membawa saya seperti benar-benar berada di Bali. Rempahnya meresap sempurna. Layanan tim Bumbu Nusantara juga sangat ramah dan profesional.&rdquo;
                </p>
                <cite style={{ color:G, fontSize:"13px", letterSpacing:"0.1em" }}>— Dewi Rahayu, Food Blogger</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── SLIDER ── */}
      <section style={{ ...secStyle, background:DARK2, color:CREAM }}>
        <div style={wrap}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="kl-wow">
              <p style={{ fontFamily:"'Satisfy',cursive", fontSize:"18px", color:G, marginBottom:"8px" }}>Hidangan Istimewa</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,3.5vw,44px)", fontWeight:300, letterSpacing:"0.03em", marginBottom:"20px" }}>
                Pilihan <em style={{ color:G, fontStyle:"italic" }}>Terbaik</em> Kami
              </h2>
              <div style={{ width:"36px", height:"1px", background:G, marginBottom:"20px" }}/>
              <p style={{ color:MUTED, fontSize:"15px", lineHeight:1.8, marginBottom:"28px" }}>
                Dari Rendang Wagyu yang dimasak perlahan hingga Bebek Betutu Bali yang sempurna — setiap hidangan adalah karya yang penuh dedikasi.
              </p>
              <div style={{ display:"flex", gap:"8px" }}>
                {SLIDES.map((_,i)=>(
                  <button key={i} onClick={()=>setSlide(i)}
                    style={{ width:"8px", height:"8px", borderRadius:"50%", background:slide===i?G:"rgba(201,168,76,0.3)", border:"none", cursor:"pointer", transition:"background .25s" }}/>
                ))}
              </div>
            </div>
            <div className="kl-wow kl-fadeInRight">
              <div style={{ position:"relative", overflow:"hidden", aspectRatio:"4/3" }}>
                {SLIDES.map((s,i)=>(
                  <div key={i} className={`kl-slide${slide===i?" kl-active":""}`} style={{ backgroundImage:`url(${s.img})` }}>
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(24,20,14,0.9) 0%, rgba(24,20,14,0.2) 60%, transparent 100%)" }}/>
                    <div style={{ position:"relative", zIndex:1, padding:"28px" }}>
                      <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"26px", fontWeight:400, marginBottom:"8px" }}>
                        {s.judul} <em style={{ color:G, fontStyle:"italic" }}>{s.em}</em> {s.emWord}
                      </h3>
                      <p style={{ color:"rgba(245,239,228,0.7)", fontSize:"13px", lineHeight:1.6, marginBottom:"14px" }}>{s.desc}</p>
                      <a href="#reservasi" style={{ fontSize:"9px", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:G, textDecoration:"none", border:`1px solid ${G}`, padding:"8px 20px", transition:"all .25s" }}
                        onMouseEnter={e=>{e.currentTarget.style.background=G;e.currentTarget.style.color=DARK;}}
                        onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=G;}}>
                        {s.cta}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACARA ── */}
      <section id="acara" style={{ ...secStyle, background:DARK, color:CREAM }}>
        <div style={wrap}>
          <div style={{ textAlign:"center", marginBottom:"56px" }} className="kl-wow">
            <p style={{ fontFamily:"'Satisfy',cursive", fontSize:"18px", color:G, marginBottom:"8px" }}>Jadwal Acara</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,4vw,52px)", fontWeight:300, letterSpacing:"0.03em", marginBottom:"16px" }}>Acara &amp; Kegiatan</h2>
            <div style={{ width:"36px", height:"1px", background:G, margin:"0 auto 20px" }}/>
            <p style={{ color:MUTED, maxWidth:"520px", margin:"0 auto", fontSize:"15px", lineHeight:1.8 }}>
              Bergabunglah dalam berbagai acara istimewa kami — dari malam keluarga hingga workshop memasak yang seru dan edukatif.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {ACARA.map((ev,i)=>(
              <div key={ev.judul} className="kl-wow" style={{ transitionDelay:`${i*0.15}s` }}>
                <div style={{ overflow:"hidden", height:"220px" }}>
                  <Image unoptimized src={ev.img} alt={ev.judul} width={400} height={220}
                    style={{ width:"100%", height:"220px", objectFit:"cover", transition:"transform .5s ease" }}
                    onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}/>
                </div>
                <div style={{ padding:"20px 0" }}>
                  <span style={{ fontSize:"11px", letterSpacing:"0.15em", textTransform:"uppercase", color:G, display:"block", marginBottom:"8px" }}>{ev.tanggal}</span>
                  <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"22px", fontWeight:400, marginBottom:"10px" }}>{ev.judul}</h3>
                  <p style={{ color:MUTED, fontSize:"13px", lineHeight:1.7, marginBottom:"14px" }}>{ev.desc}</p>
                  <a href="#reservasi" style={{ color:G, fontSize:"11px", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", textDecoration:"none" }}>Selengkapnya →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA RESERVASI ── */}
      <section id="reservasi" style={{ position:"relative", backgroundImage:"url(/demo/kuliner/cta.jpg)", backgroundSize:"cover", backgroundPosition:"center", backgroundAttachment:"fixed", padding:"100px 0", textAlign:"center", color:CREAM }}>
        <div style={{ position:"absolute", inset:0, background:"rgba(24,20,14,0.78)" }}/>
        <div style={{ position:"relative", zIndex:1, maxWidth:"600px", margin:"0 auto", padding:"0 24px" }} className="kl-wow kl-fadeIn">
          <p style={{ fontFamily:"'Satisfy',cursive", fontSize:"20px", color:G, marginBottom:"14px" }}>Bergabunglah Bersama Kami</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,5vw,64px)", fontWeight:300, marginBottom:"16px" }}>Pesan Meja Sekarang</h2>
          <p style={{ color:MUTED, fontSize:"15px", lineHeight:1.7, marginBottom:"28px" }}>
            Luangkan waktu untuk menikmati pengalaman kuliner yang tak terlupakan bersama keluarga dan orang-orang terkasih. Meja kami selalu terbuka untuk Anda.
          </p>
          <a href="tel:+62215551234" style={{ display:"inline-block", padding:"14px 48px", background:G, color:DARK, fontSize:"10px", fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", textDecoration:"none", transition:"opacity .25s" }}
            onMouseEnter={e=>e.currentTarget.style.opacity=".85"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            Hubungi Kami Sekarang
          </a>
          <p style={{ marginTop:"16px", color:"rgba(245,239,228,0.4)", fontSize:"13px" }}>
            📞 (021) 555-1234 &nbsp;|&nbsp; ✉ reservasi@bumbunusantara.id
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:DARK, padding:"60px 0 40px", color:CREAM }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"0 48px" }}>
          <div className="grid md:grid-cols-4 gap-8" style={{ marginBottom:"40px" }}>
            <div>
              <h4 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"24px", fontWeight:400, color:G, marginBottom:"12px", letterSpacing:"0.08em" }}>Bumbu<span style={{ color:CREAM }}>.</span>Nusantara</h4>
              <p style={{ color:MUTED, fontSize:"13px", lineHeight:1.7 }}>Restoran masakan Indonesia otentik yang menghadirkan cita rasa leluhur dalam suasana yang hangat dan berkesan.</p>
            </div>
            <div>
              <h5 style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:G, marginBottom:"16px" }}>Navigasi</h5>
              {["Beranda","Menu","Tentang","Acara","Reservasi"].map(l=>(
                <a key={l} href={`#${l.toLowerCase()}`} style={{ display:"block", color:MUTED, fontSize:"13px", textDecoration:"none", marginBottom:"8px", transition:"color .2s" }}
                  onMouseEnter={e=>e.currentTarget.style.color=CREAM} onMouseLeave={e=>e.currentTarget.style.color=MUTED}>{l}</a>
              ))}
            </div>
            <div>
              <h5 style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:G, marginBottom:"16px" }}>Jam Buka</h5>
              {[["Senin – Jumat","11.00 – 22.00"],["Sabtu – Minggu","10.00 – 23.00"],["Hari Libur","10.00 – 22.00"]].map(([h,j])=>(
                <div key={h} style={{ marginBottom:"8px" }}>
                  <span style={{ color:CREAM, fontSize:"13px" }}>{h}</span>
                  <span style={{ color:MUTED, fontSize:"13px" }}> · {j}</span>
                </div>
              ))}
            </div>
            <div>
              <h5 style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:G, marginBottom:"16px" }}>Kontak</h5>
              <p style={{ color:MUTED, fontSize:"13px", lineHeight:1.7, marginBottom:"8px" }}>Jl. Rempah Nusantara No. 12<br/>Kebayoran Baru, Jakarta Selatan</p>
              <p style={{ color:MUTED, fontSize:"13px" }}>📞 (021) 555-1234</p>
              <p style={{ color:MUTED, fontSize:"13px" }}>✉ hello@bumbunusantara.id</p>
            </div>
          </div>
          <div style={{ borderTop:`1px solid rgba(201,168,76,0.15)`, paddingTop:"24px", textAlign:"center" }}>
            <p style={{ color:"rgba(245,239,228,0.3)", fontSize:"12px" }}>© {new Date().getFullYear()} Bumbu Nusantara. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>

      <a href="#beranda" style={{ position:"fixed", bottom:"24px", right:"24px", zIndex:500, width:"44px", height:"44px", background:"rgba(201,168,76,0.15)", border:`1px solid rgba(201,168,76,0.3)`, color:G, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", textDecoration:"none", transition:"all .25s" }}
        onMouseEnter={e=>{e.currentTarget.style.background=G;e.currentTarget.style.color=DARK;}}
        onMouseLeave={e=>{e.currentTarget.style.background="rgba(201,168,76,0.15)";e.currentTarget.style.color=G;}}>↑</a>
    </>
  );
}
