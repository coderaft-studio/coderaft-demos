"use client";
import { useState } from "react";

const RED = "#FF2D20";
const BLUE = "#0D6EFD";
const YLW = "#FFDE00";
const BLK = "#0a0a0a";

const products = [
  { name: "Choco Bomb",   desc: "Coklat susu renyah + caramel explosion",   price: "12.000", emoji: "💣", bg: RED,  tag: "BEST SELLER" },
  { name: "Salty Pops",  desc: "Popcorn asin gurih luar biasa",             price: "10.000", emoji: "🍿", bg: BLUE, tag: "NEW" },
  { name: "Fruity Rings", desc: "Cincin buah asam manis warna-warni",        price: "8.000",  emoji: "🍭", bg: "#00C853", tag: "FAVORIT" },
  { name: "Spicy Stix",  desc: "Stik pedas level 3 yang bikin ketagihan",   price: "9.000",  emoji: "🌶", bg: "#FF6D00", tag: "PALING PEDAS" },
];

const reviews = [
  { name: "Budi S.", text: "Choco Bomb juara banget! Satu bungkus ga cukup!", rating: "★★★★★", color: RED },
  { name: "Rini H.", text: "Fruity Rings jadi cemilan wajib nonton drama!", rating: "★★★★★", color: BLUE },
  { name: "Ahmad R.", text: "Spicy Stix bikin tangan ga bisa berhenti!", rating: "★★★★★", color: "#00C853" },
];

function Shape({ type, color, style }) {
  const s = { position: "absolute", background: color, ...style };
  if (type === "circle") return <div style={{ ...s, borderRadius: "50%" }} />;
  if (type === "triangle") return <div style={{ ...s, width: 0, height: 0, background: "none", borderLeft: `${style.size/2}px solid transparent`, borderRight: `${style.size/2}px solid transparent`, borderBottom: `${style.size}px solid ${color}`, background: "none" }} />;
  return <div style={{ ...s, transform: `rotate(${style.rotate || 0}deg)` }} />;
}

export default function PopsyPage() {
  const [form, setForm] = useState({ nama: "", wa: "", produk: "", qty: "1" });
  const [sent, setSent] = useState(false);

  return (
    <div style={{ background: YLW, minHeight: "100vh", overflowX: "hidden" }}>

      {/* Navbar */}
      <nav style={{ background: BLK, borderBottom: `4px solid ${RED}` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="font-black text-2xl" style={{ color: YLW, letterSpacing: "-0.03em" }}>
            POP<span style={{ color: RED }}>SY</span>
          </div>
          <div className="hidden md:flex gap-6">
            {["Produk", "Tentang", "Order"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="font-black text-sm uppercase" style={{ color: YLW, textDecoration: "none", letterSpacing: "0.1em" }}>{l}</a>
            ))}
          </div>
          <a href="#order" className="font-black text-xs uppercase px-5 py-2.5" style={{ background: RED, color: YLW, textDecoration: "none", letterSpacing: "0.08em" }}>
            Order Sekarang →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: YLW, minHeight: "90vh", display: "flex", alignItems: "center" }}>
        {/* Memphis shapes */}
        <Shape type="circle" color={RED} style={{ width: "180px", height: "180px", top: "5%", right: "8%", opacity: 0.9 }} />
        <Shape type="circle" color={BLUE} style={{ width: "100px", height: "100px", top: "60%", right: "15%", opacity: 0.8 }} />
        <Shape type="square" color={BLK} style={{ width: "60px", height: "60px", top: "15%", left: "5%", rotate: "15deg" }} />
        <Shape type="circle" color="#00C853" style={{ width: "140px", height: "140px", bottom: "10%", left: "3%", opacity: 0.7 }} />
        <Shape type="square" color={RED} style={{ width: "40px", height: "40px", bottom: "30%", right: "5%", rotate: "30deg" }} />
        <div style={{ position: "absolute", top: "40%", left: "20%", width: "50px", height: "50px", border: `6px solid ${BLK}`, borderRadius: "50%" }} />
        <div style={{ position: "absolute", top: "20%", right: "30%", fontSize: "40px" }}>★</div>
        <div style={{ position: "absolute", bottom: "20%", left: "35%", fontSize: "32px" }}>●</div>

        {/* Zigzag top border */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "24px", background: `repeating-linear-gradient(135deg, ${BLK} 0, ${BLK} 12px, ${YLW} 12px, ${YLW} 24px)` }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block font-black text-xs uppercase px-4 py-2 mb-6 rotate-[-2deg]"
                style={{ background: RED, color: YLW, letterSpacing: "0.15em" }}>
                🔥 CEMILAN TERBAIK 2025
              </div>
              <h1 className="font-black leading-none mb-6"
                style={{ fontSize: "clamp(3.5rem,12vw,8rem)", letterSpacing: "-0.05em", color: BLK, textShadow: `5px 5px 0 ${RED}` }}>
                SNACK<br />YANG<br /><span style={{ color: RED, textShadow: `5px 5px 0 ${BLK}` }}>GILA!</span>
              </h1>
              <p className="font-bold text-lg mb-8" style={{ color: BLK, maxWidth: "400px" }}>
                Rasa bold, tekstur unik, harga gak bikin nangis. Cemilan untuk generasi yang ga mau biasa-biasa aja!
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#produk" className="font-black text-sm uppercase px-8 py-4 rotate-[-1deg] hover:rotate-0 transition-transform inline-block"
                  style={{ background: BLK, color: YLW, textDecoration: "none", letterSpacing: "0.08em", border: `4px solid ${BLK}` }}>
                  Coba Sekarang →
                </a>
                <a href="#order" className="font-black text-sm uppercase px-8 py-4 rotate-[1deg] hover:rotate-0 transition-transform inline-block"
                  style={{ background: YLW, color: BLK, textDecoration: "none", letterSpacing: "0.08em", border: `4px solid ${BLK}` }}>
                  Order Sekarang
                </a>
              </div>
            </div>
            {/* Stats boxes */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "50rb+", label: "Pelanggan Puas", bg: RED, fg: YLW },
                { num: "12", label: "Varian Rasa", bg: BLUE, fg: YLW },
                { num: "4.9★", label: "Rating Tokopedia", bg: BLK, fg: YLW },
                { num: "#1", label: "Snack Terlaris", bg: "#00C853", fg: BLK },
              ].map(s => (
                <div key={s.label} className="p-6 rotate-[0.5deg] hover:rotate-0 transition-transform"
                  style={{ background: s.bg, border: `4px solid ${BLK}`, boxShadow: `6px 6px 0 ${BLK}` }}>
                  <div className="font-black text-3xl mb-1" style={{ color: s.fg }}>{s.num}</div>
                  <div className="font-bold text-xs uppercase" style={{ color: s.fg, opacity: 0.75, letterSpacing: "0.1em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="produk" style={{ background: YLW, padding: "80px 0", borderTop: `4px solid ${BLK}` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="font-black" style={{ fontSize: "clamp(2.5rem,7vw,5rem)", letterSpacing: "-0.04em", textShadow: `4px 4px 0 ${RED}` }}>
              PILIH FAVORITMU!
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map(p => (
              <div key={p.name} className="hover:-translate-y-2 transition-transform"
                style={{ background: "#fff", border: `4px solid ${BLK}`, boxShadow: `6px 6px 0 ${BLK}` }}>
                <div className="flex items-center justify-center text-6xl" style={{ background: p.bg, height: "140px" }}>
                  {p.emoji}
                </div>
                <div className="p-4">
                  <div className="font-black text-xs uppercase px-2 py-1 mb-2 inline-block"
                    style={{ background: p.bg, color: p.bg === BLUE ? "#fff" : BLK, letterSpacing: "0.1em" }}>
                    {p.tag}
                  </div>
                  <h3 className="font-black text-lg mb-1">{p.name}</h3>
                  <p className="text-sm mb-3" style={{ color: "rgba(10,10,10,0.6)" }}>{p.desc}</p>
                  <div className="font-black text-xl" style={{ color: RED }}>Rp {p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div style={{ background: RED, borderTop: `4px solid ${BLK}`, borderBottom: `4px solid ${BLK}`, padding: "12px 0", overflow: "hidden" }}>
        <div className="flex gap-12 whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="font-black text-sm uppercase flex items-center gap-4" style={{ color: YLW, letterSpacing: "0.15em" }}>
              <span>★</span> FREE ONGKIR <span>●</span> GRATIS SAMPEL <span>★</span> COD TERSEDIA
            </span>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <section style={{ background: YLW, padding: "80px 0", borderTop: `4px solid ${BLK}` }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-black text-center mb-12" style={{ fontSize: "clamp(2rem,6vw,4rem)", letterSpacing: "-0.03em" }}>
            KATA MEREKA 🗣
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map(r => (
              <div key={r.name} className="p-6 rotate-[-0.5deg] hover:rotate-0 transition-transform"
                style={{ background: "#fff", border: `4px solid ${BLK}`, boxShadow: `5px 5px 0 ${r.color}` }}>
                <div className="font-black text-2xl mb-3" style={{ color: r.color }}>{r.rating}</div>
                <p className="font-bold text-base mb-4 italic">&ldquo;{r.text}&rdquo;</p>
                <div className="font-black text-sm" style={{ color: r.color }}>— {r.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="order" style={{ background: BLK, padding: "80px 0", borderTop: `4px solid ${RED}` }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-black text-center mb-3" style={{ fontSize: "clamp(2rem,6vw,4rem)", letterSpacing: "-0.03em", color: YLW, textShadow: `4px 4px 0 ${RED}` }}>
            ORDER SEKARANG!
          </h2>
          <p className="text-center font-bold mb-10" style={{ color: "rgba(255,222,0,0.6)" }}>Gratis ongkir untuk 100 pembeli pertama hari ini!</p>

          {sent ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="font-black text-2xl" style={{ color: YLW }}>Order Masuk! Siap Dikirim!</h3>
              <p style={{ color: "rgba(255,222,0,0.6)" }}>Tim kami akan hubungi kamu segera via WA.</p>
              <button onClick={() => setSent(false)} className="mt-4 font-bold underline" style={{ color: RED, background: "none", border: "none", cursor: "pointer" }}>Order lagi</button>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
              {[{ n: "nama", l: "Nama Lengkap *", ph: "Budi Snackers" }, { n: "wa", l: "No. WhatsApp *", ph: "08XXXXXXXXXX" }].map(f => (
                <div key={f.n}>
                  <label className="block font-black text-xs uppercase mb-2" style={{ color: YLW, letterSpacing: "0.1em" }}>{f.l}</label>
                  <input required name={f.n} value={form[f.n]} onChange={e => setForm({ ...form, [f.n]: e.target.value })} placeholder={f.ph}
                    className="w-full px-4 py-3 font-bold text-sm" style={{ background: YLW, border: `3px solid ${RED}`, color: BLK, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div>
                <label className="block font-black text-xs uppercase mb-2" style={{ color: YLW, letterSpacing: "0.1em" }}>Pilih Produk</label>
                <select name="produk" value={form.produk} onChange={e => setForm({ ...form, produk: e.target.value })}
                  className="w-full px-4 py-3 font-bold text-sm" style={{ background: YLW, border: `3px solid ${RED}`, color: BLK, outline: "none", boxSizing: "border-box" }}>
                  <option value="">Pilih snack...</option>
                  {products.map(p => <option key={p.name}>{p.name} — Rp {p.price}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full font-black text-sm uppercase py-4 transition-all hover:opacity-80"
                style={{ background: RED, color: YLW, border: `3px solid ${RED}`, cursor: "pointer", letterSpacing: "0.1em" }}>
                PESAN SEKARANG → GRATIS ONGKIR!
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: RED, borderTop: `4px solid ${BLK}`, padding: "24px 0" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="font-black text-xl" style={{ color: YLW }}>POP<span style={{ color: BLK }}>SY</span></div>
          <p className="font-bold text-xs" style={{ color: YLW, opacity: 0.8 }}>© 2024 Popsy Snacks · Snack Gila Indonesia</p>
        </div>
      </footer>
    </div>
  );
}
