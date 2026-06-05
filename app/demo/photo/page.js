"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const portofolio = [
  { cat: "Wedding", src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", alt: "Wedding photography" },
  { cat: "Portrait", src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80", alt: "Portrait session" },
  { cat: "Commercial", src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80", alt: "Product photography" },
  { cat: "Wedding", src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80", alt: "Wedding moment" },
  { cat: "Landscape", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", alt: "Landscape" },
  { cat: "Portrait", src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80", alt: "Portrait" },
];

const pakets = [
  { name: "Essentials", harga: "1.500.000", desc: "Sesi portrait atau produk", fitur: ["3 jam sesi foto", "50 foto terseleksi", "10 foto edit premium", "File digital HR", "Konsultasi outfit"], highlight: false },
  { name: "Signature", harga: "3.500.000", desc: "Paling populer untuk semua kebutuhan", fitur: ["6 jam sesi foto", "150 foto terseleksi", "30 foto edit premium", "Video slideshow", "Album digital", "2 lokasi"], highlight: true },
  { name: "Lumina Full", harga: "Custom", desc: "Coverage penuh & eksklusif", fitur: ["Full day coverage", "Foto unlimited", "Video cinematic", "Album cetak premium", "Dedicated asisten", "Rush delivery"], highlight: false },
];

function Nav() {
  const [sc, setSc] = useState(false);
  const [op, setOp] = useState(false);
  useEffect(() => { const fn = () => setSc(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  const links = [{ href: "#porto", label: "Portfolio" }, { href: "#paket", label: "Paket" }, { href: "#kontak", label: "Booking" }];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: sc ? "rgba(10,9,6,0.96)" : "transparent", backdropFilter: sc ? "blur(12px)" : "none" }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div>
          <div className="font-black text-xl tracking-widest" style={{ color: "#fdf8f3", letterSpacing: "0.15em" }}>LUMINA</div>
          <div className="text-xs" style={{ color: "rgba(253,248,243,0.3)", letterSpacing: "0.3em", marginTop: "-2px" }}>STUDIO</div>
        </div>
        <nav className="hidden md:flex items-center gap-10">
          {links.map(l => <a key={l.href} href={l.href} className="text-sm font-medium transition-colors" style={{ color: "rgba(253,248,243,0.5)", letterSpacing: "0.05em" }}>{l.label}</a>)}
          <a href="#kontak" className="px-6 py-2.5 text-sm font-bold transition-all" style={{ border: "1px solid rgba(253,248,243,0.2)", color: "#fdf8f3", borderRadius: "1px" }}>Book Session</a>
        </nav>
        <button onClick={() => setOp(!op)} className="md:hidden p-2" style={{ color: "#fdf8f3" }}>☰</button>
      </div>
      {op && <nav style={{ background: "rgba(10,9,6,0.98)", borderTop: "1px solid rgba(253,248,243,0.05)" }} className="md:hidden px-6 py-4 flex flex-col gap-4">
        {links.map(l => <a key={l.href} href={l.href} onClick={() => setOp(false)} style={{ color: "rgba(253,248,243,0.7)" }}>{l.label}</a>)}
        <a href="#kontak" className="text-center py-2.5 font-bold" style={{ border: "1px solid rgba(253,248,243,0.2)", color: "#fdf8f3", borderRadius: "1px" }}>Book Session</a>
      </nav>}
    </header>
  );
}

export default function PhotoPage() {
  const [activeKat, setActiveKat] = useState("Semua");
  const [form, setForm] = useState({ nama: "", email: "", wa: "", sesi: "", tgl: "", catatan: "" });
  const [sent, setSent] = useState(false);
  const cats = ["Semua", "Wedding", "Portrait", "Commercial", "Landscape"];
  const filtered = activeKat === "Semua" ? portofolio : portofolio.filter(p => p.cat === activeKat);

  return (
    <>
      <Nav />

      {/* Hero — full screen dark cinematic */}
      <section className="relative h-screen flex items-end pb-24 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&q=80" alt="Photography" fill priority className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(10,9,6,0.95) 30%,rgba(10,9,6,0.3) 60%,rgba(10,9,6,0.1))" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <p className="text-xs font-bold tracking-widest mb-4" style={{ color: "rgba(253,248,243,0.4)", letterSpacing: "0.3em" }}>PHOTOGRAPHY & VISUAL STORYTELLING</p>
          <h1 className="font-black leading-none mb-6" style={{ fontSize: "clamp(3rem,9vw,7rem)", color: "#fdf8f3", letterSpacing: "-0.03em" }}>
            Every Frame<br />Tells a <span style={{ color: "#d4a853", fontStyle: "italic" }}>Story.</span>
          </h1>
          <p className="text-lg mb-10 max-w-lg" style={{ color: "rgba(253,248,243,0.5)" }}>Kami merekam momen-momen berharga menjadi karya visual yang abadi. Dari wedding hingga editorial, setiap detail terabadikan dengan sempurna.</p>
          <div className="flex gap-5">
            <a href="#porto" className="px-8 py-4 font-bold text-sm transition-all" style={{ background: "#d4a853", color: "#0a0906" }}>Lihat Portfolio</a>
            <a href="#kontak" className="px-8 py-4 font-semibold text-sm transition-all" style={{ border: "1px solid rgba(253,248,243,0.2)", color: "rgba(253,248,243,0.8)" }}>Book Session</a>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="porto" className="py-24" style={{ background: "#0a0906" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold tracking-widest mb-2" style={{ color: "#d4a853", letterSpacing: "0.2em" }}>PORTFOLIO</p>
              <h2 className="font-black text-4xl" style={{ color: "#fdf8f3" }}>Karya <span style={{ color: "#d4a853" }}>Terpilih</span></h2>
            </div>
            <div className="flex gap-2">
              {cats.map(c => (
                <button key={c} onClick={() => setActiveKat(c)}
                  className="px-4 py-2 text-xs font-semibold transition-all"
                  style={activeKat === c ? { background: "#d4a853", color: "#0a0906" } : { border: "1px solid rgba(253,248,243,0.15)", color: "rgba(253,248,243,0.5)" }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {filtered.map((p, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden group aspect-square">
                <Image src={p.src} alt={p.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(10,9,6,0.5)" }}>
                  <div className="absolute bottom-4 left-4 text-xs font-bold tracking-widest" style={{ color: "#d4a853", letterSpacing: "0.2em" }}>{p.cat.toUpperCase()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paket */}
      <section id="paket" className="py-24" style={{ background: "#0f0c07" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest mb-3" style={{ color: "#d4a853", letterSpacing: "0.2em" }}>PAKET SESI</p>
            <h2 className="font-black text-4xl" style={{ color: "#fdf8f3" }}>Pilih <span style={{ color: "#d4a853" }}>Paket</span> Anda</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {pakets.map(p => (
              <div key={p.name} className={`p-8 rounded-2xl relative ${p.highlight ? "scale-105" : ""}`}
                style={p.highlight ? { background: "#d4a853", boxShadow: "0 0 60px rgba(212,168,83,0.25)" } : { background: "rgba(253,248,243,0.03)", border: "1px solid rgba(253,248,243,0.08)" }}>
                {p.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-black px-4 py-1.5 rounded-full" style={{ background: "#0a0906", color: "#d4a853" }}>✦ SIGNATURE</div>}
                <div className={`text-sm font-black mb-2 ${p.highlight ? "text-stone-800" : "text-amber-600"}`}>{p.name}</div>
                <div className={`text-3xl font-black mb-1 ${p.highlight ? "text-stone-900" : "text-white"}`}>{p.harga === "Custom" ? "Custom" : `Rp ${p.harga}`}</div>
                <div className={`text-xs mb-5 ${p.highlight ? "text-stone-600" : "text-white/30"}`}>{p.desc}</div>
                <ul className="space-y-2.5 mb-8">
                  {p.fitur.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${p.highlight ? "text-stone-800" : "text-white/60"}`}>
                      <span className={`mt-0.5 font-black flex-shrink-0 ${p.highlight ? "text-stone-700" : "text-amber-600"}`}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="#kontak" className={`block text-center py-3 rounded-xl font-bold transition-all ${p.highlight ? "bg-stone-900 text-amber-400 hover:bg-stone-800" : "text-amber-400 hover:bg-amber-900/20"}`}
                  style={!p.highlight ? { border: "1px solid rgba(212,168,83,0.3)" } : {}}>
                  Book Sekarang
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="kontak" className="py-24" style={{ background: "#0a0906" }}>
        <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-xs font-bold tracking-widest mb-4" style={{ color: "#d4a853", letterSpacing: "0.2em" }}>BOOKING</p>
            <h2 className="font-black text-4xl mb-6" style={{ color: "#fdf8f3" }}>Jadwalkan <span style={{ color: "#d4a853" }}>Sesi</span> Anda</h2>
            <p className="mb-8 leading-relaxed" style={{ color: "rgba(253,248,243,0.4)" }}>Kami terbuka untuk semua jenis sesi foto. Ceritakan momen yang ingin diabadikan dan kami akan buat rencana terbaik.</p>
            {[{ icon: "📞", l: "WhatsApp", v: "+62 812-3456-7890" }, { icon: "📧", l: "Email", v: "booking@luminastudio.id" }, { icon: "📍", l: "Studio", v: "Jl. Kemang Utara No.8, Jakarta" }].map(item => (
              <div key={item.l} className="flex items-center gap-3 mb-4">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="text-xs" style={{ color: "rgba(253,248,243,0.3)" }}>{item.l}</div>
                  <div className="font-semibold text-sm" style={{ color: "#fdf8f3" }}>{item.v}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-8 rounded-2xl" style={{ background: "rgba(253,248,243,0.03)", border: "1px solid rgba(253,248,243,0.06)" }}>
            {sent ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-4">📷</div>
                <h3 className="font-black text-xl mb-2" style={{ color: "#d4a853" }}>Booking Diterima!</h3>
                <p style={{ color: "rgba(253,248,243,0.4)" }}>Kami akan konfirmasi via WhatsApp segera.</p>
                <button onClick={() => setSent(false)} className="mt-4 text-sm underline" style={{ color: "rgba(253,248,243,0.2)" }}>Booking lagi</button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-5">
                {[{ n: "nama", l: "Nama *", ph: "Nama Anda" }, { n: "email", l: "Email *", ph: "email@domain.com" }, { n: "wa", l: "WhatsApp *", ph: "08XXXXXXXXXX" }].map(f => (
                  <div key={f.n}>
                    <label className="block text-xs font-bold mb-1.5" style={{ color: "rgba(253,248,243,0.3)", letterSpacing: "0.1em" }}>{f.l}</label>
                    <input required name={f.n} value={form[f.n]} onChange={e => setForm({ ...form, [f.n]: e.target.value })} placeholder={f.ph}
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                      style={{ background: "rgba(253,248,243,0.05)", border: "1px solid rgba(253,248,243,0.08)", color: "#fdf8f3" }} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: "rgba(253,248,243,0.3)", letterSpacing: "0.1em" }}>JENIS SESI</label>
                  <select name="sesi" value={form.sesi} onChange={e => setForm({ ...form, sesi: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(253,248,243,0.05)", border: "1px solid rgba(253,248,243,0.08)", color: "#fdf8f3" }}>
                    <option value="">Pilih sesi...</option>
                    {["Wedding Photography", "Portrait Session", "Maternity Shoot", "Product Photography", "Corporate Event", "Pre-Wedding"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: "rgba(253,248,243,0.3)", letterSpacing: "0.1em" }}>TANGGAL DIINGINKAN</label>
                  <input type="date" name="tgl" value={form.tgl} onChange={e => setForm({ ...form, tgl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ background: "rgba(253,248,243,0.05)", border: "1px solid rgba(253,248,243,0.08)", color: "#fdf8f3" }} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: "rgba(253,248,243,0.3)", letterSpacing: "0.1em" }}>CERITAKAN MOMEN ANDA</label>
                  <textarea name="catatan" value={form.catatan} onChange={e => setForm({ ...form, catatan: e.target.value })} rows={3}
                    placeholder="Lokasi, konsep, referensi yang diinginkan..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                    style={{ background: "rgba(253,248,243,0.05)", border: "1px solid rgba(253,248,243,0.08)", color: "#fdf8f3" }} />
                </div>
                <button type="submit" className="w-full py-4 rounded-xl font-bold text-sm transition-all hover:shadow-xl"
                  style={{ background: "#d4a853", color: "#0a0906" }}>
                  KIRIM PERMINTAAN BOOKING 📷
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0a0906", borderTop: "1px solid rgba(253,248,243,0.04)" }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <div className="font-black text-lg tracking-widest" style={{ color: "#fdf8f3" }}>LUMINA <span style={{ color: "#d4a853" }}>STUDIO</span></div>
            <div className="text-xs" style={{ color: "rgba(253,248,243,0.2)" }}>Photography & Visual Arts</div>
          </div>
          <p className="text-xs" style={{ color: "rgba(253,248,243,0.2)" }}>© 2024 Lumina Studio. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
