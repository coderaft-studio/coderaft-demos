"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const areas = [
  { icon: "⚖️", title: "Hukum Bisnis", desc: "Pendirian perusahaan, kontrak komersial, merger & akuisisi, sengketa bisnis." },
  { icon: "🏛", title: "Litigasi & Arbitrase", desc: "Representasi di pengadilan perdata, pidana, arbitrase nasional & internasional." },
  { icon: "🏠", title: "Hukum Properti", desc: "Jual beli, sewa, sengketa tanah, perizinan, dan pengembangan properti." },
  { icon: "👨‍👩‍👧", title: "Hukum Keluarga", desc: "Pernikahan, perceraian, waris, hak asuh anak, dan perjanjian pranikah." },
  { icon: "💼", title: "Hukum Ketenagakerjaan", desc: "PHK, kontrak kerja, perselisihan hubungan industrial, jaminan sosial." },
  { icon: "🔒", title: "Kekayaan Intelektual", desc: "Paten, merek dagang, hak cipta, desain industri, dan rahasia dagang." },
];

const lawyers = [
  { name: "Dr. Andi Prasetyo, S.H., M.H.", role: "Senior Partner", exp: "25 tahun", spec: "Hukum Bisnis & Litigasi", init: "AP" },
  { name: "Sari Dewi, S.H., LL.M.", role: "Partner", exp: "15 tahun", spec: "Hukum Keluarga & Waris", init: "SD" },
  { name: "Budi Hartono, S.H.", role: "Associate", exp: "10 tahun", spec: "Kekayaan Intelektual", init: "BH" },
];

function Nav() {
  const [sc, setSc] = useState(false);
  const [op, setOp] = useState(false);
  useEffect(() => { const fn = () => setSc(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  const links = [{ href: "#area", label: "Layanan" }, { href: "#pengacara", label: "Pengacara" }, { href: "#rekam", label: "Track Record" }, { href: "#kontak", label: "Konsultasi" }];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: sc ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: sc ? "blur(12px)" : "none", boxShadow: sc ? "0 1px 20px rgba(15,23,42,0.08)" : "none", borderBottom: sc ? "1px solid rgba(15,23,42,0.06)" : "none" }}>
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        <div>
          <div className="font-black text-xl tracking-tight" style={{ color: "#0f172a", letterSpacing: "0.05em" }}>NUSANTARA <span style={{ color: "#b45309" }}>LAW</span></div>
          <div className="text-xs" style={{ color: "rgba(15,23,42,0.4)", letterSpacing: "0.15em" }}>ADVOCATES & LEGAL CONSULTANTS</div>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => <a key={l.href} href={l.href} className="text-sm font-medium transition-colors hover:text-amber-700" style={{ color: "rgba(15,23,42,0.6)" }}>{l.label}</a>)}
          <a href="#kontak" className="px-6 py-2.5 text-sm font-bold transition-all" style={{ background: "#0f172a", color: "#fff", borderRadius: "4px" }}>Konsultasi Gratis</a>
        </nav>
        <button onClick={() => setOp(!op)} className="md:hidden p-2" style={{ color: "#0f172a" }}>☰</button>
      </div>
      {op && <nav style={{ background: "rgba(255,255,255,0.98)", borderTop: "1px solid rgba(15,23,42,0.08)" }} className="md:hidden px-6 py-4 flex flex-col gap-4">
        {links.map(l => <a key={l.href} href={l.href} onClick={() => setOp(false)} className="font-medium" style={{ color: "#0f172a" }}>{l.label}</a>)}
        <a href="#kontak" className="text-center py-2.5 font-bold" style={{ background: "#0f172a", color: "#fff", borderRadius: "4px" }}>Konsultasi Gratis</a>
      </nav>}
    </header>
  );
}

export default function LawPage() {
  const [form, setForm] = useState({ nama: "", email: "", wa: "", area: "", kasus: "" });
  const [sent, setSent] = useState(false);
  const h = e => setForm({ ...form, [e.target.name]: e.target.value });
  const inputCls = "w-full border-b py-3 text-sm outline-none bg-transparent transition-colors focus:border-amber-700";
  const inputStyle = { borderColor: "rgba(15,23,42,0.15)", color: "#0f172a" };

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative min-h-screen flex items-end pb-24 overflow-hidden" style={{ background: "#0f172a" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(180,83,9,0.1) 40px,rgba(180,83,9,0.1) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(180,83,9,0.1) 40px,rgba(180,83,9,0.1) 41px)" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-16 items-end">
          <div className="py-32">
            <div className="text-xs font-bold tracking-widest mb-8" style={{ color: "#b45309", letterSpacing: "0.3em" }}>ESTABLISHED 1998 · JAKARTA</div>
            <h1 className="font-black leading-none mb-8" style={{ fontSize: "clamp(3rem,7vw,5rem)", color: "#fff", letterSpacing: "-0.02em" }}>
              Keadilan<br />Adalah <span style={{ color: "#b45309", fontStyle: "italic" }}>Hak</span><br />Anda.
            </h1>
            <p className="text-lg mb-10" style={{ color: "rgba(248,250,252,0.6)", maxWidth: "480px" }}>Firma hukum terpercaya dengan pengalaman 25+ tahun. Kami hadir untuk memberikan solusi hukum yang komprehensif dan profesional.</p>
            <div className="flex gap-4">
              <a href="#kontak" className="px-8 py-4 font-bold text-sm transition-all" style={{ background: "#b45309", color: "#fff", borderRadius: "2px" }}>Konsultasi Gratis</a>
              <a href="#area" className="px-8 py-4 font-semibold text-sm transition-all" style={{ border: "1px solid rgba(248,250,252,0.2)", color: "rgba(248,250,252,0.7)", borderRadius: "2px" }}>Lihat Layanan</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pb-12">
            {[{ num: "25+", label: "Tahun Pengalaman" }, { num: "2.000+", label: "Kasus Ditangani" }, { num: "98%", label: "Win Rate" }, { num: "50+", label: "Klien Korporat" }].map(s => (
              <div key={s.label} className="p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(180,83,9,0.2)" }}>
                <div className="text-3xl font-black mb-1" style={{ color: "#b45309" }}>{s.num}</div>
                <div className="text-xs" style={{ color: "rgba(248,250,252,0.4)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area */}
      <section id="area" className="py-24" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <div>
              <div className="text-xs font-bold tracking-widest mb-4" style={{ color: "#b45309", letterSpacing: "0.2em" }}>AREA PRAKTIK</div>
              <h2 className="font-black text-4xl" style={{ color: "#0f172a", letterSpacing: "-0.02em" }}>Kami Ahli di<br /><span style={{ color: "#b45309" }}>Berbagai Bidang</span></h2>
            </div>
            <p className="text-lg" style={{ color: "rgba(15,23,42,0.5)", marginTop: "auto" }}>Tim pengacara kami memiliki spesialisasi yang beragam untuk melayani kebutuhan hukum Anda secara menyeluruh.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(15,23,42,0.06)" }}>
            {areas.map(a => (
              <div key={a.title} className="p-8 group hover:bg-amber-50 transition-colors" style={{ background: "#fff" }}>
                <div className="text-4xl mb-5">{a.icon}</div>
                <h3 className="font-black text-lg mb-3" style={{ color: "#0f172a" }}>{a.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(15,23,42,0.5)" }}>{a.desc}</p>
                <div className="mt-5 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#b45309" }}>Konsultasi →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track record */}
      <section id="rekam" className="py-24" style={{ background: "#0f172a" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="text-xs font-bold tracking-widest mb-4" style={{ color: "#b45309", letterSpacing: "0.2em" }}>TRACK RECORD</div>
          <h2 className="font-black text-4xl mb-16" style={{ color: "#fff" }}>Kepercayaan yang <span style={{ color: "#b45309" }}>Dibuktikan</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{ num: "2.000+", label: "Kasus Selesai", sub: "Sejak 1998" }, { num: "98%", label: "Tingkat Keberhasilan", sub: "Litigasi & Arbitrase" }, { num: "50+", label: "Klien Korporat", sub: "BUMN & Swasta" }, { num: "15+", label: "Penghargaan", sub: "Nasional & Internasional" }].map(s => (
              <div key={s.label} className="py-10 px-6" style={{ border: "1px solid rgba(180,83,9,0.2)" }}>
                <div className="text-4xl font-black mb-2" style={{ color: "#b45309" }}>{s.num}</div>
                <div className="font-bold mb-1" style={{ color: "#fff" }}>{s.label}</div>
                <div className="text-xs" style={{ color: "rgba(248,250,252,0.3)" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pengacara */}
      <section id="pengacara" className="py-24" style={{ background: "#f8fafc" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-xs font-bold tracking-widest mb-4" style={{ color: "#b45309", letterSpacing: "0.2em" }}>TIM KAMI</div>
          <h2 className="font-black text-4xl mb-14" style={{ color: "#0f172a" }}>Para <span style={{ color: "#b45309" }}>Advokat</span> Kami</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {lawyers.map(l => (
              <div key={l.name} className="group" style={{ borderTop: "3px solid #b45309" }}>
                <div className="pt-6 pb-4 flex items-center gap-4" style={{ borderBottom: "1px solid rgba(15,23,42,0.08)" }}>
                  <div className="w-16 h-16 flex items-center justify-center font-black text-xl" style={{ background: "#0f172a", color: "#b45309" }}>{l.init}</div>
                  <div>
                    <div className="font-black text-sm leading-tight" style={{ color: "#0f172a" }}>{l.name}</div>
                    <div className="text-xs mt-1" style={{ color: "#b45309" }}>{l.role}</div>
                  </div>
                </div>
                <div className="py-4 space-y-2">
                  <div className="text-sm" style={{ color: "rgba(15,23,42,0.5)" }}>📚 {l.spec}</div>
                  <div className="text-sm" style={{ color: "rgba(15,23,42,0.5)" }}>⏱ {l.exp} pengalaman</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Konsultasi */}
      <section id="kontak" className="py-24" style={{ background: "#fff" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-xs font-bold tracking-widest mb-4" style={{ color: "#b45309", letterSpacing: "0.2em" }}>KONSULTASI</div>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-black text-4xl mb-6" style={{ color: "#0f172a" }}>Jadwalkan <span style={{ color: "#b45309" }}>Konsultasi</span></h2>
              <p className="mb-8" style={{ color: "rgba(15,23,42,0.5)" }}>Konsultasi pertama gratis. Ceritakan masalah hukum Anda dan tim kami akan memberikan analisis awal dalam 24 jam.</p>
              {[{ icon: "📞", l: "Telepon", v: "+62 21-1234-5678" }, { icon: "📧", l: "Email", v: "konsultasi@nusantaralaw.id" }, { icon: "📍", l: "Kantor", v: "Jl. Sudirman No.45, Jakarta Selatan" }].map(item => (
                <div key={item.l} className="flex items-center gap-3 mb-4">
                  <span className="text-xl">{item.icon}</span>
                  <div><div className="text-xs" style={{ color: "rgba(15,23,42,0.4)" }}>{item.l}</div><div className="font-semibold text-sm" style={{ color: "#0f172a" }}>{item.v}</div></div>
                </div>
              ))}
            </div>
            <div>
              {sent ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">⚖️</div>
                  <h3 className="font-black text-xl mb-2" style={{ color: "#0f172a" }}>Terima Kasih</h3>
                  <p style={{ color: "rgba(15,23,42,0.5)" }}>Tim kami akan menghubungi Anda dalam 24 jam.</p>
                  <button onClick={() => setSent(false)} className="mt-4 text-sm underline" style={{ color: "rgba(15,23,42,0.3)" }}>Kirim lagi</button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-6">
                  {[{ n: "nama", l: "Nama Lengkap *", ph: "Budi Santoso" }, { n: "email", l: "Email *", ph: "budi@email.com" }, { n: "wa", l: "No. WhatsApp", ph: "08XXXXXXXXXX" }].map(f => (
                    <div key={f.n}>
                      <label className="block text-xs font-bold mb-2" style={{ color: "rgba(15,23,42,0.4)", letterSpacing: "0.1em" }}>{f.l}</label>
                      <input required={f.l.includes("*")} name={f.n} value={form[f.n]} onChange={h} placeholder={f.ph} className={inputCls} style={inputStyle} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold mb-2" style={{ color: "rgba(15,23,42,0.4)", letterSpacing: "0.1em" }}>Area Hukum</label>
                    <select name="area" value={form.area} onChange={h} className={inputCls} style={inputStyle}>
                      <option value="">Pilih area...</option>
                      {["Hukum Bisnis", "Litigasi", "Hukum Properti", "Hukum Keluarga", "Ketenagakerjaan", "Kekayaan Intelektual"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2" style={{ color: "rgba(15,23,42,0.4)", letterSpacing: "0.1em" }}>URAIAN SINGKAT KASUS *</label>
                    <textarea required name="kasus" value={form.kasus} onChange={h} rows={4} placeholder="Ceritakan masalah hukum yang Anda hadapi..." className={inputCls} style={{ ...inputStyle, resize: "none" }} />
                  </div>
                  <button type="submit" className="w-full py-4 font-bold text-sm transition-all hover:shadow-xl" style={{ background: "#0f172a", color: "#fff", borderRadius: "2px" }}>
                    KIRIM PERMINTAAN KONSULTASI
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0f172a", borderTop: "1px solid rgba(180,83,9,0.3)" }}>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-10 mb-8">
            <div>
              <div className="font-black text-xl mb-3" style={{ color: "#fff" }}>NUSANTARA <span style={{ color: "#b45309" }}>LAW</span></div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(248,250,252,0.4)" }}>Firma hukum terpercaya sejak 1998. Melayani kebutuhan hukum individu dan korporasi.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm" style={{ color: "rgba(248,250,252,0.6)" }}>Layanan</h4>
              <ul className="space-y-2 text-sm" style={{ color: "rgba(248,250,252,0.4)" }}>
                {["Hukum Bisnis", "Litigasi", "Properti", "Keluarga", "Ketenagakerjaan"].map(l => <li key={l}><a href="#area" className="hover:text-amber-600 transition-colors">{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm" style={{ color: "rgba(248,250,252,0.6)" }}>Kontak</h4>
              <ul className="space-y-2 text-sm" style={{ color: "rgba(248,250,252,0.4)" }}>
                <li>📍 Sudirman No.45, Jakarta</li>
                <li>📞 +62 21-1234-5678</li>
                <li>🕙 Senin–Jumat 08.00–17.00</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-6 text-center text-xs" style={{ borderColor: "rgba(180,83,9,0.2)", color: "rgba(248,250,252,0.2)" }}>
            <p>© 2024 Nusantara Law. All rights reserved. Terdaftar di Peradi.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
