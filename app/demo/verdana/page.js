"use client";
import { useState } from "react";

const GREEN = "#2d5a27";
const SAGE = "#6b8f71";
const EARTH = "#8b6b47";
const CREAM = "#faf7f0";
const LINEN = "#f0ebe0";
const DARK = "#1a2e1a";

const products = [
  { name: "Temulawak Gold",   sub: "Suplemen Imun & Kulit",    price: "85.000", desc: "Ekstrak temulawak organik premium. Dipanen tangan dari ladang Jawa Tengah.", emoji: "🌾" },
  { name: "Kayu Manis Relief", sub: "Teh Herbal Anti-Inflamasi", price: "65.000", desc: "Campuran kayu manis, jahe merah, dan lada hitam. Hangat dari dalam.", emoji: "🌿" },
  { name: "Rosella Calm",     sub: "Herbal Tidur & Relaksasi",  price: "72.000", desc: "Rosella merah, lavender, dan passion flower. Tidur alami tanpa efek samping.", emoji: "🌺" },
  { name: "Spirulina Detox",  sub: "Green Superfood Blend",     price: "95.000", desc: "Spirulina, moringa, dan chlorella. Detoks lengkap dalam satu sendok.", emoji: "🍃" },
];

const steps = [
  { step: "01", title: "Dipilih", text: "Bahan baku dipilih manual dari petani mitra yang telah kami kenal lebih dari 10 tahun." },
  { step: "02", title: "Diproses", text: "Ekstraksi suhu rendah menjaga senyawa aktif tetap utuh dan efektif." },
  { step: "03", title: "Diuji", text: "Setiap batch diuji di laboratorium independen sebelum sampai ke tangan Anda." },
  { step: "04", title: "Dikirim", text: "Dikemas ramah lingkungan, dikirim dalam 24 jam dengan rantai dingin." },
];

const faqs = [
  { q: "Apakah produk ini BPOM terdaftar?", a: "Ya, seluruh produk Verdana Herbs telah terdaftar di BPOM RI dan bersertifikat Halal MUI." },
  { q: "Berapa lama efek mulai terasa?", a: "Untuk suplemen, umumnya 2–4 minggu konsumsi rutin. Tubuh masing-masing orang berbeda." },
  { q: "Apakah ada efek samping?", a: "Formula kami 100% bahan alami tanpa bahan kimia tambahan. Konsultasikan dengan dokter jika sedang hamil atau menyusui." },
];

export default function VerdanaPage() {
  const [form, setForm] = useState({ nama: "", wa: "", produk: "", catatan: "" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div style={{ background: CREAM, color: DARK, minHeight: "100vh", fontFamily: "'Georgia', serif", overflowX: "hidden" }}>

      {/* Top bar */}
      <div className="text-center py-2 text-xs uppercase tracking-widest" style={{ background: GREEN, color: CREAM, letterSpacing: "0.25em" }}>
        🌿 &nbsp; Organik Bersertifikat · BPOM & Halal MUI &nbsp; 🌿
      </div>

      {/* Navbar */}
      <nav style={{ background: CREAM, borderBottom: `1px solid rgba(45,90,39,0.15)`, position: "sticky", top: 0, zIndex: 50 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div>
            <div className="font-black text-xl" style={{ fontFamily: "Georgia, serif", color: GREEN, letterSpacing: "0.1em" }}>VERDANA</div>
            <div className="text-xs uppercase" style={{ color: SAGE, letterSpacing: "0.3em", marginTop: "-2px", fontFamily: "sans-serif" }}>HERBS</div>
          </div>
          <div className="hidden md:flex gap-8">
            {["Produk", "Proses", "FAQ", "Pesan"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-xs uppercase" style={{ color: DARK, textDecoration: "none", letterSpacing: "0.15em", fontFamily: "sans-serif", fontWeight: 700 }}>{l}</a>
            ))}
          </div>
          <a href="#pesan" className="text-xs uppercase px-5 py-2.5 font-bold" style={{ background: GREEN, color: CREAM, textDecoration: "none", letterSpacing: "0.12em", fontFamily: "sans-serif" }}>
            Pesan Sekarang
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 16px 60px", background: LINEN, borderBottom: `1px solid rgba(45,90,39,0.1)` }}>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block text-xs uppercase px-4 py-2 mb-6" style={{ background: "rgba(45,90,39,0.1)", color: GREEN, letterSpacing: "0.2em", fontFamily: "sans-serif", fontWeight: 700 }}>
              🌱 Dari Alam, Untuk Anda
            </div>
            <h1 style={{ fontSize: "clamp(2.5rem,8vw,5.5rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, color: DARK, marginBottom: "24px" }}>
              Kekuatan<br />
              <em style={{ color: GREEN }}>Alam</em> dalam<br />
              Genggaman Anda
            </h1>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(26,46,26,0.6)", fontFamily: "Georgia, serif", maxWidth: "460px" }}>
              Formula herbal warisan leluhur, diperkuat dengan riset modern. Verdana Herbs hadir untuk mereka yang percaya bahwa kesehatan terbaik dimulai dari alam.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#produk" className="text-xs uppercase px-8 py-4 font-bold inline-block" style={{ background: GREEN, color: CREAM, textDecoration: "none", letterSpacing: "0.12em", fontFamily: "sans-serif" }}>
                Lihat Produk →
              </a>
              <a href="#proses" className="text-xs uppercase px-8 py-4 font-bold inline-block" style={{ border: `1.5px solid ${GREEN}`, color: GREEN, textDecoration: "none", letterSpacing: "0.12em", fontFamily: "sans-serif" }}>
                Cara Kerja Kami
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "15+", l: "Tahun Pengalaman", icon: "🌿" },
              { n: "200+", l: "Petani Mitra", icon: "👨‍🌾" },
              { n: "50rb+", l: "Pelanggan Sehat", icon: "💚" },
              { n: "4.9★", l: "Rating Shopee", icon: "⭐" },
            ].map(s => (
              <div key={s.l} className="p-6" style={{ background: CREAM, border: `1px solid rgba(45,90,39,0.12)` }}>
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="font-black text-2xl mb-1" style={{ color: GREEN, fontFamily: "sans-serif" }}>{s.n}</div>
                <div className="text-xs uppercase" style={{ color: SAGE, letterSpacing: "0.12em", fontFamily: "sans-serif", fontWeight: 700 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex items-center gap-4 py-8 px-8 max-w-5xl mx-auto">
        <div style={{ flex: 1, height: "1px", background: `rgba(45,90,39,0.15)` }} />
        <span style={{ color: SAGE, fontSize: "20px" }}>✦</span>
        <div style={{ flex: 1, height: "1px", background: `rgba(45,90,39,0.15)` }} />
      </div>

      {/* Products */}
      <section id="produk" style={{ padding: "40px 16px 80px" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-xs uppercase mb-3" style={{ color: SAGE, letterSpacing: "0.25em", fontFamily: "sans-serif", fontWeight: 700 }}>Koleksi Unggulan</p>
            <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 400, letterSpacing: "-0.02em", color: DARK }}>Produk Pilihan Kami</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {products.map(p => (
              <div key={p.name} className="flex gap-5 p-6" style={{ background: LINEN, border: `1px solid rgba(45,90,39,0.1)` }}>
                <div className="text-4xl flex-shrink-0 w-14 h-14 flex items-center justify-center" style={{ background: "rgba(45,90,39,0.08)", borderRadius: "50%" }}>
                  {p.emoji}
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase mb-1" style={{ color: SAGE, letterSpacing: "0.15em", fontFamily: "sans-serif", fontWeight: 700 }}>{p.sub}</div>
                  <h3 className="font-black text-lg mb-2" style={{ fontFamily: "sans-serif", color: DARK }}>{p.name}</h3>
                  <p className="text-sm mb-3 leading-relaxed" style={{ color: "rgba(26,46,26,0.55)" }}>{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-lg" style={{ color: GREEN, fontFamily: "sans-serif" }}>Rp {p.price}</span>
                    <a href="#pesan" className="text-xs uppercase font-bold px-4 py-2" style={{ border: `1px solid ${GREEN}`, color: GREEN, textDecoration: "none", letterSpacing: "0.1em", fontFamily: "sans-serif" }}>
                      Pesan →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="proses" style={{ padding: "80px 16px", background: GREEN }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase mb-3" style={{ color: "rgba(250,247,240,0.5)", letterSpacing: "0.25em", fontFamily: "sans-serif", fontWeight: 700 }}>Standar Kualitas</p>
            <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 400, letterSpacing: "-0.02em", color: CREAM }}>Proses Kami, Jaminan Anda</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map(s => (
              <div key={s.step} className="p-6" style={{ background: "rgba(250,247,240,0.07)", borderTop: `2px solid rgba(250,247,240,0.15)` }}>
                <div className="text-xs uppercase mb-4" style={{ color: "rgba(250,247,240,0.4)", letterSpacing: "0.2em", fontFamily: "sans-serif", fontWeight: 700 }}>{s.step}</div>
                <h3 className="font-black text-xl mb-3" style={{ fontFamily: "sans-serif", color: CREAM }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(250,247,240,0.6)", fontFamily: "Georgia, serif" }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 16px", background: CREAM }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 style={{ fontSize: "clamp(1.8rem,5vw,3rem)", fontWeight: 400, color: DARK }}>Pertanyaan Umum</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} style={{ border: `1px solid rgba(45,90,39,0.12)`, background: LINEN }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-5 text-left"
                  style={{ background: "none", border: "none", cursor: "pointer", color: DARK }}>
                  <span className="font-bold text-sm" style={{ fontFamily: "sans-serif" }}>{f.q}</span>
                  <span style={{ color: GREEN, fontWeight: 900, fontSize: "1.2rem", flexShrink: 0, marginLeft: "12px" }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "rgba(26,46,26,0.6)", borderTop: `1px solid rgba(45,90,39,0.08)`, paddingTop: "16px", fontFamily: "Georgia, serif" }}>
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form */}
      <section id="pesan" style={{ padding: "80px 16px", background: LINEN, borderTop: `1px solid rgba(45,90,39,0.1)` }}>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs uppercase mb-3" style={{ color: SAGE, letterSpacing: "0.25em", fontFamily: "sans-serif", fontWeight: 700 }}>Pesan Langsung</p>
            <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 400, color: DARK }}>Mulai Perjalanan<br /><em style={{ color: GREEN }}>Sehatmu</em></h2>
          </div>

          {sent ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="font-black text-xl" style={{ fontFamily: "sans-serif", color: GREEN }}>Pesanan Diterima!</h3>
              <p className="mt-2 text-sm" style={{ color: "rgba(26,46,26,0.55)" }}>Tim kami akan menghubungi Anda via WhatsApp dalam 1×24 jam.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-5">
              {[{ n: "nama", l: "Nama Lengkap", ph: "Nama Anda" }, { n: "wa", l: "No. WhatsApp", ph: "08XXXXXXXXXX" }].map(f => (
                <div key={f.n}>
                  <label className="block text-xs uppercase mb-2 font-bold" style={{ color: GREEN, letterSpacing: "0.15em", fontFamily: "sans-serif" }}>{f.l}</label>
                  <input required name={f.n} value={form[f.n]} onChange={e => setForm({ ...form, [f.n]: e.target.value })} placeholder={f.ph}
                    className="w-full px-4 py-3 text-sm" style={{ background: CREAM, border: `1px solid rgba(45,90,39,0.25)`, color: DARK, outline: "none", fontFamily: "Georgia, serif", boxSizing: "border-box" }} />
                </div>
              ))}
              <div>
                <label className="block text-xs uppercase mb-2 font-bold" style={{ color: GREEN, letterSpacing: "0.15em", fontFamily: "sans-serif" }}>Produk yang Diminati</label>
                <select name="produk" value={form.produk} onChange={e => setForm({ ...form, produk: e.target.value })}
                  className="w-full px-4 py-3 text-sm" style={{ background: CREAM, border: `1px solid rgba(45,90,39,0.25)`, color: DARK, outline: "none", fontFamily: "Georgia, serif", boxSizing: "border-box" }}>
                  <option value="">Pilih produk...</option>
                  {products.map(p => <option key={p.name}>{p.name} — Rp {p.price}</option>)}
                  <option>Konsultasi Produk (Tidak yakin pilih yang mana)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase mb-2 font-bold" style={{ color: GREEN, letterSpacing: "0.15em", fontFamily: "sans-serif" }}>Catatan (opsional)</label>
                <textarea name="catatan" value={form.catatan} onChange={e => setForm({ ...form, catatan: e.target.value })} placeholder="Kondisi kesehatan, pertanyaan, atau kebutuhan khusus..." rows={3}
                  className="w-full px-4 py-3 text-sm" style={{ background: CREAM, border: `1px solid rgba(45,90,39,0.25)`, color: DARK, outline: "none", fontFamily: "Georgia, serif", resize: "none", boxSizing: "border-box" }} />
              </div>
              <button type="submit" className="w-full text-xs uppercase py-4 font-bold tracking-widest transition-all hover:opacity-85"
                style={{ background: GREEN, color: CREAM, border: "none", cursor: "pointer", letterSpacing: "0.2em", fontFamily: "sans-serif" }}>
                Kirim Pesanan → Kami Hubungi via WA
              </button>
              <p className="text-center text-xs" style={{ color: "rgba(26,46,26,0.35)", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                Privasi Anda aman bersama kami.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: DARK, padding: "40px 16px" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "1.3rem", color: CREAM, letterSpacing: "0.12em" }}>VERDANA</div>
            <div className="text-xs uppercase" style={{ color: SAGE, letterSpacing: "0.35em", fontFamily: "sans-serif" }}>HERBS</div>
            <p className="text-xs mt-4 leading-relaxed" style={{ color: "rgba(250,247,240,0.35)", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
              Herbal Indonesia, dipercaya sejak 2009.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase font-bold mb-3" style={{ color: SAGE, letterSpacing: "0.2em", fontFamily: "sans-serif" }}>Sertifikasi</div>
            {["🟢 BPOM RI", "☪ Halal MUI", "🌱 Organik Certified", "🔬 GMP Standard"].map(c => (
              <div key={c} className="text-xs mb-2" style={{ color: "rgba(250,247,240,0.45)", fontFamily: "sans-serif" }}>{c}</div>
            ))}
          </div>
          <div>
            <div className="text-xs uppercase font-bold mb-3" style={{ color: SAGE, letterSpacing: "0.2em", fontFamily: "sans-serif" }}>Kontak</div>
            {["📧 hello@verdanaherbs.id", "📱 0812-3456-7890", "📍 Yogyakarta, Indonesia"].map(c => (
              <div key={c} className="text-xs mb-2" style={{ color: "rgba(250,247,240,0.45)", fontFamily: "sans-serif" }}>{c}</div>
            ))}
          </div>
        </div>
        <div className="max-w-5xl mx-auto mt-10 pt-6" style={{ borderTop: `1px solid rgba(250,247,240,0.08)` }}>
          <p className="text-xs text-center" style={{ color: "rgba(250,247,240,0.2)", fontFamily: "sans-serif" }}>© 2024 Verdana Herbs · Dari Alam, Untuk Anda</p>
        </div>
      </footer>
    </div>
  );
}
