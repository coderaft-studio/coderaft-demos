"use client";
import { useState, useEffect } from "react";

const works = [
  { title: "Rebrand Kopi Lokal",    cat: "Branding",   year: "2025", bg: "#1a1a2e", fg: "#a5b4fc", emoji: "☕" },
  { title: "App Mobile Fintech",    cat: "UI/UX",       year: "2024", bg: "#0f2027", fg: "#67e8f9", emoji: "💳" },
  { title: "Website E-commerce",   cat: "Web Dev",     year: "2024", bg: "#1a0a1a", fg: "#f0abfc", emoji: "🛒" },
  { title: "Campaign Digital",      cat: "Marketing",   year: "2025", bg: "#0a1a0f", fg: "#86efac", emoji: "📊" },
];

const services = [
  { no: "01", title: "Brand Identity", desc: "Logo, visual identity, and brand guidelines that make your business unforgettable." },
  { no: "02", title: "Web Design",     desc: "Beautiful, fast websites that convert visitors into loyal customers." },
  { no: "03", title: "UI/UX Design",   desc: "Intuitive user experiences for web and mobile apps your users will love." },
  { no: "04", title: "Motion & Video", desc: "Animations and videos that bring your brand story to life." },
];

const clients = ["Tokopedia", "Gojek", "BCA", "Pertamina", "Unilever", "Astra"];

function Nav() {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: sc ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: sc ? "blur(20px)" : "none",
        borderBottom: `1px solid rgba(0,0,0,${sc ? 0.07 : 0})`,
        transition: "background 0.4s ease, border-color 0.4s ease",
      }}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="font-black text-lg tracking-tight" style={{ color: "#0a0a0a" }}>
          forma<span style={{ color: "#6366f1" }}>.</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold" style={{ color: "rgba(10,10,10,0.6)" }}>
          {["Work", "Services", "About", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="transition-colors"
              style={{ textDecoration: "none" }}
              onMouseEnter={e => e.target.style.color = "#6366f1"}
              onMouseLeave={e => e.target.style.color = "rgba(10,10,10,0.6)"}>
              {l}
            </a>
          ))}
        </nav>
        {/* Fix: hover pakai indigo bukan black, teks tetap terbaca */}
        <a href="#contact"
          className="px-5 py-2 rounded-full text-xs font-bold"
          style={{ border: "2px solid #6366f1", color: "#6366f1", textDecoration: "none", transition: "background 0.2s, color 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.background = "#6366f1"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6366f1"; }}>
          Let&apos;s Talk ↗
        </a>
      </div>
    </header>
  );
}

export default function BentoPage() {
  const [form, setForm] = useState({ nama: "", email: "", brief: "" });
  const [sent, setSent] = useState(false);
  const inputCls = "w-full px-4 py-3 rounded-xl text-sm outline-none";

  return (
    <>
      <Nav />

      {/* ── BENTO HERO ── */}
      <section className="pt-20 pb-4 px-6 max-w-6xl mx-auto">

        {/* Row 1: Headline + Stats + CTA */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {/* Headline card — dark */}
          <div className="col-span-2 rounded-3xl p-10 relative overflow-hidden flex flex-col justify-between" style={{ background: "#0a0a0a", minHeight: "300px" }}>
            <div className="text-xs font-bold tracking-widest px-3 py-1.5 rounded-full w-fit" style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}>
              Design Studio · Jakarta
            </div>
            <div>
              <h1 className="font-black leading-none mb-5 text-white" style={{ fontSize: "clamp(2.8rem,5vw,4.5rem)" }}>
                We design<br />things that<br /><span style={{ color: "#a5b4fc" }}>matter.</span>
              </h1>
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>Brand · Web · Digital Experience</p>
            </div>
            {/* Decorative glow */}
            <div className="absolute bottom-0 right-0 w-48 h-48 opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle,#6366f1,transparent 70%)", transform: "translate(30%,30%)" }} />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-3">
            {/* Stats card */}
            <div className="rounded-3xl p-6 flex flex-col justify-between flex-1" style={{ background: "#eef0ff", border: "1px solid rgba(99,102,241,0.15)" }}>
              <div className="text-5xl font-black" style={{ color: "#4338ca" }}>127</div>
              <div>
                <div className="font-bold text-sm text-slate-800">Projects Done</div>
                <div className="text-xs font-medium mt-0.5" style={{ color: "#6366f1" }}>across 8 industries</div>
              </div>
            </div>
            {/* CTA card */}
            <div className="rounded-3xl p-6 flex flex-col gap-4" style={{ background: "#6366f1" }}>
              <div className="font-black text-white text-xl leading-tight">Start your<br />project ↗</div>
              <a href="#contact" className="text-sm font-bold px-4 py-3 rounded-full text-center transition-all hover:scale-105" style={{ background: "#fff", color: "#4338ca" }}>
                Get in touch
              </a>
            </div>
          </div>
        </div>

        {/* Row 2: Clients marquee + Year badge */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <div className="col-span-3 rounded-3xl px-8 py-4 flex items-center overflow-hidden" style={{ background: "#f0f0f5", border: "1px solid rgba(0,0,0,0.07)" }}>
            <span className="text-xs font-black mr-8 flex-shrink-0 tracking-widest" style={{ color: "rgba(10,10,10,0.5)" }}>TRUSTED BY</span>
            <div className="flex gap-10 items-center">
              {clients.map(c => <span key={c} className="font-black text-sm whitespace-nowrap" style={{ color: "rgba(10,10,10,0.55)" }}>{c}</span>)}
            </div>
          </div>
          <div className="rounded-3xl p-6 flex flex-col items-center justify-center" style={{ background: "#0a0a0a" }}>
            <div className="text-3xl font-black text-white">5<span style={{ color: "#a5b4fc" }}>+</span></div>
            <div className="text-xs text-center mt-1 font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>Years of<br />Excellence</div>
          </div>
        </div>

        {/* Row 3: Work cards — dark themed for contrast */}
        <div className="grid grid-cols-4 gap-3">
          {works.map((w) => (
            <div key={w.title} className="rounded-3xl p-6 cursor-pointer group hover:-translate-y-1.5 transition-all hover:shadow-2xl flex flex-col justify-between"
              style={{ background: w.bg, minHeight: "200px" }}>
              <div className="flex items-center justify-between">
                <div className="text-3xl">{w.emoji}</div>
                <div className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `${w.fg}20`, color: w.fg }}>{w.cat}</div>
              </div>
              <div>
                <div className="font-bold text-sm leading-tight mb-1" style={{ color: "#fff" }}>{w.title}</div>
                <div className="text-xs font-semibold" style={{ color: w.fg }}>{w.year} ↗</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-black tracking-widest mb-2" style={{ color: "#6366f1", letterSpacing: "0.2em" }}>SERVICES</p>
            <h2 className="font-black text-4xl text-slate-900">What we do</h2>
          </div>
          <a href="#contact" className="text-sm font-bold pb-0.5" style={{ borderBottom: "2px solid #6366f1", color: "#6366f1" }}>All services ↗</a>
        </div>
        <div style={{ border: "2px solid rgba(10,10,10,0.1)", borderRadius: "24px", overflow: "hidden" }}>
          {services.map((s, i) => (
            <div key={s.no} className="flex items-center gap-8 px-8 py-7 group hover:bg-indigo-50 transition-colors cursor-pointer"
              style={{ borderBottom: i < services.length - 1 ? "1px solid rgba(10,10,10,0.08)" : "none" }}>
              <span className="text-xs font-black w-8 flex-shrink-0" style={{ color: "#6366f1" }}>{s.no}</span>
              <div className="flex-1">
                <div className="font-black text-xl text-slate-900 group-hover:text-indigo-600 transition-colors">{s.title}</div>
                <div className="text-sm mt-1 font-medium" style={{ color: "rgba(10,10,10,0.55)" }}>{s.desc}</div>
              </div>
              <span className="text-2xl opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-indigo-500">↗</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT BENTO ── */}
      <section id="about" className="pb-4 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 rounded-3xl p-10" style={{ background: "#4338ca" }}>
            <p className="text-xs font-black tracking-widest mb-6" style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.2em" }}>ABOUT FORMA</p>
            <h2 className="font-black text-4xl text-white leading-tight mb-5">
              Small team.<br />Big impact.<br /><span style={{ color: "#c7d2fe" }}>Always human.</span>
            </h2>
            <p className="text-base leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.75)", maxWidth: "400px" }}>
              We are a boutique design studio that believes great design isn&apos;t just about aesthetics — it&apos;s about real, measurable impact for your business.
            </p>
          </div>
          <div className="grid grid-rows-2 gap-3">
            <div className="rounded-3xl p-6" style={{ background: "#f0f0f5", border: "1px solid rgba(0,0,0,0.07)" }}>
              <div className="text-3xl font-black text-slate-900 mb-1">98%</div>
              <div className="text-sm font-bold text-slate-700">Client retention</div>
              <div className="text-xs font-medium mt-1" style={{ color: "#6366f1" }}>klien balik lagi</div>
            </div>
            <div className="rounded-3xl p-6" style={{ background: "#0a0a0a" }}>
              <div className="text-3xl font-black text-white mb-1">4.9<span style={{ color: "#a5b4fc" }}>★</span></div>
              <div className="text-sm font-bold text-white">Client rating</div>
              <div className="text-xs font-medium mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>rata-rata ulasan</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="rounded-3xl p-12" style={{ background: "#0a0a0a" }}>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-black tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em" }}>LET&apos;S TALK</p>
              <h2 className="font-black text-4xl text-white mb-4 leading-tight">
                Have a project<br />in mind? <span style={{ color: "#a5b4fc" }}>Tell us.</span>
              </h2>
              <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>We respond within 24 hours. First consultation is free.</p>
              <div className="mt-8 space-y-3">
                {[{ icon: "📧", v: "hello@forma.studio" }, { icon: "📞", v: "+62 812-3456-7890" }].map(item => (
                  <div key={item.v} className="flex items-center gap-3 text-sm font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                    <span>{item.icon}</span><span>{item.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-4xl mb-3">✨</div>
                  <h3 className="font-black text-xl text-white mb-2">Siap berkolaborasi!</h3>
                  <p style={{ color: "rgba(255,255,255,0.5)" }}>We&apos;ll reach out to you shortly.</p>
                  <button onClick={() => setSent(false)} className="mt-4 text-xs underline" style={{ color: "rgba(255,255,255,0.3)" }}>Kirim lagi</button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                  {[{ n: "nama", l: "Nama", ph: "Budi Santoso" }, { n: "email", l: "Email", ph: "budi@email.com" }].map(f => (
                    <div key={f.n}>
                      <label className="block text-xs font-bold mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>{f.l}</label>
                      <input required name={f.n} value={form[f.n]} onChange={e => setForm({ ...form, [f.n]: e.target.value })} placeholder={f.ph}
                        className={inputCls} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold mb-2" style={{ color: "rgba(255,255,255,0.45)" }}>Tell us about your project</label>
                    <textarea required name="brief" value={form.brief} onChange={e => setForm({ ...form, brief: e.target.value })} rows={4}
                      placeholder="Industry, budget, timeline..."
                      className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                      style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff" }} />
                  </div>
                  <button type="submit" className="w-full py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.02]" style={{ background: "#6366f1", color: "#fff" }}>
                    Kirim Brief ↗
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 pb-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center pt-6" style={{ borderTop: "2px solid rgba(10,10,10,0.08)" }}>
          <div className="font-black text-lg text-slate-900">forma<span style={{ color: "#6366f1" }}>.</span></div>
          <p className="text-xs font-medium" style={{ color: "rgba(10,10,10,0.45)" }}>© 2024 Forma Studio. Jakarta, Indonesia.</p>
        </div>
      </footer>
    </>
  );
}
