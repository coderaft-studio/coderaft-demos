"use client";
import { useState, useEffect } from "react";

const works = [
  { no: "001", title: "REBRAND LOKAL BRAND", client: "Kopi Nusantara", year: "2025", cat: "Branding" },
  { no: "002", title: "KAMPANYE VIRAL MEDSOS", client: "Startup X", year: "2024", cat: "Digital" },
  { no: "003", title: "WEBSITE TANPA KOMPROMI", client: "Firma Hukum ABC", year: "2024", cat: "Web" },
  { no: "004", title: "IDENTITY SISTEM LENGKAP", client: "F&B Chain", year: "2025", cat: "Branding" },
];

function Nav() {
  const [sc, setSc] = useState(false);
  const [op, setOp] = useState(false);
  useEffect(() => { const fn = () => setSc(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, borderBottom: sc ? "3px solid #0a0a0a" : "none", background: sc ? "#f5f0e8" : "transparent" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontWeight: 900, fontSize: "20px", letterSpacing: "0.05em", fontFamily: "serif" }}>RAW</div>
        <nav style={{ display: "flex", gap: "32px", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
          {["Work", "Services", "Contact"].map(l => <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "rgba(10,10,10,0.5)", textDecoration: "none" }}>{l}</a>)}
        </nav>
        <a href="#contact" style={{ border: "3px solid #0a0a0a", padding: "8px 20px", fontWeight: 900, fontSize: "12px", textDecoration: "none", color: "#0a0a0a", textTransform: "uppercase", letterSpacing: "0.1em" }}>Hire Us</a>
      </div>
    </header>
  );
}

export default function BrutalPage() {
  const [hoveredWork, setHoveredWork] = useState(null);
  const [form, setForm] = useState({ nama: "", email: "", pesan: "" });
  const [sent, setSent] = useState(false);

  const b = (extra = {}) => ({
    border: "3px solid #0a0a0a", ...extra
  });

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ paddingTop: "80px", borderBottom: "3px solid #0a0a0a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", borderBottom: "3px solid #0a0a0a" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)" }}>Creative Agency · Est. 2018</span>
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)" }}>Jakarta, Indonesia</span>
          </div>

          {/* Headline */}
          <div style={{ padding: "48px 0", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "0", borderBottom: "3px solid #0a0a0a" }}>
            <div style={{ borderRight: "3px solid #0a0a0a", paddingRight: "40px" }}>
              <h1 style={{ fontSize: "clamp(4rem,10vw,9rem)", fontWeight: 900, lineHeight: "0.9", letterSpacing: "-0.04em", margin: 0, fontFamily: "serif" }}>
                WE<br />MAKE<br /><span style={{ color: "#f5f0e8", WebkitTextStroke: "3px #0a0a0a" }}>BOLD</span><br />SHIT.
              </h1>
            </div>
            <div style={{ paddingLeft: "40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <p style={{ fontSize: "16px", lineHeight: "1.6", color: "rgba(10,10,10,0.6)", margin: 0 }}>
                We don&apos;t make safe design. We make design that gets <strong>remembered</strong>, that <strong>sells</strong>, that truly <strong>differentiates</strong> your business from the competition.
              </p>
              <div>
                <a href="#work" style={{ display: "inline-block", background: "#0a0a0a", color: "#f5f0e8", padding: "16px 32px", fontWeight: 900, fontSize: "14px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px" }}>
                  See Our Work ↓
                </a>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {[{ n: "127", l: "Projects" }, { n: "98%", l: "Happy" }, { n: "6+", l: "Years" }, { n: "4", l: "Awards" }].map(s => (
                    <div key={s.l} style={{ border: "2px solid rgba(10,10,10,0.15)", padding: "12px" }}>
                      <div style={{ fontSize: "24px", fontWeight: 900, fontFamily: "serif" }}>{s.n}</div>
                      <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div style={{ padding: "16px 0", display: "flex", gap: "48px", overflow: "hidden" }}>
            {["BRANDING", "WEB DESIGN", "UI/UX", "DIGITAL MARKETING", "MOTION", "STRATEGY"].map(s => (
              <span key={s} style={{ fontSize: "13px", fontWeight: 900, letterSpacing: "0.2em", whiteSpace: "nowrap", color: "rgba(10,10,10,0.2)" }}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK ── */}
      <section id="work" style={{ borderBottom: "3px solid #0a0a0a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ padding: "48px 0 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: "3px solid #0a0a0a" }}>
            <h2 style={{ fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 900, fontFamily: "serif", margin: 0, letterSpacing: "-0.02em" }}>Selected Work</h2>
            <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(10,10,10,0.4)" }}>(2023–2025)</span>
          </div>
          {works.map((w, i) => (
            <div key={w.no} onMouseEnter={() => setHoveredWork(i)} onMouseLeave={() => setHoveredWork(null)}
              style={{ display: "grid", gridTemplateColumns: "80px 1fr 120px 120px", gap: "0", alignItems: "center", padding: "24px 0", borderBottom: "3px solid #0a0a0a", cursor: "pointer", background: hoveredWork === i ? "#0a0a0a" : "transparent", transition: "background 0.15s" }}>
              <div style={{ fontSize: "12px", fontWeight: 900, color: hoveredWork === i ? "rgba(255,255,255,0.3)" : "rgba(10,10,10,0.3)", letterSpacing: "0.1em" }}>{w.no}</div>
              <div style={{ fontSize: "clamp(1.2rem,3vw,2rem)", fontWeight: 900, fontFamily: "serif", color: hoveredWork === i ? "#f5f0e8" : "#0a0a0a", letterSpacing: "-0.02em" }}>{w.title}</div>
              <div style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: hoveredWork === i ? "rgba(255,255,255,0.4)" : "rgba(10,10,10,0.35)" }}>{w.cat}</div>
              <div style={{ fontSize: "13px", fontWeight: 700, textAlign: "right", color: hoveredWork === i ? "rgba(255,255,255,0.5)" : "rgba(10,10,10,0.3)" }}>{w.year} ↗</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section id="services" style={{ borderBottom: "3px solid #0a0a0a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 900, fontFamily: "serif", padding: "48px 0 32px", margin: 0, borderBottom: "3px solid #0a0a0a", letterSpacing: "-0.02em" }}>What We Do</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "none" }}>
            {[
              { no: "01", t: "Branding", d: "Logo, visual identity, brand systems that make your business impossible to ignore." },
              { no: "02", t: "Web Design", d: "No templates — websites that truly reflect the DNA of your business." },
              { no: "03", t: "Digital Ads", d: "Ads people actually *want* to see, not skip. Performance-driven, always." },
              { no: "04", t: "Strategy", d: "Brand and digital strategy consulting for sustainable, long-term growth." },
            ].map((s, i) => (
              <div key={s.no} style={{ padding: "32px 24px", borderRight: i % 2 === 0 ? "3px solid #0a0a0a" : "none", borderBottom: i < 2 ? "3px solid #0a0a0a" : "none" }}>
                <div style={{ fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(10,10,10,0.3)", marginBottom: "12px" }}>{s.no}</div>
                <h3 style={{ fontSize: "28px", fontWeight: 900, fontFamily: "serif", margin: "0 0 12px", letterSpacing: "-0.02em" }}>{s.t}</h3>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "rgba(10,10,10,0.5)", margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section style={{ background: "#0a0a0a", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(2.5rem,7vw,6rem)", fontWeight: 900, fontFamily: "serif", color: "#f5f0e8", margin: "0 0 24px", letterSpacing: "-0.03em", lineHeight: 0.9 }}>
          Ready to be<br /><span style={{ color: "#f5f0e8", WebkitTextStroke: "2px rgba(255,255,255,0.3)" }}>bold?</span>
        </h2>
        <a href="#contact" style={{ display: "inline-block", background: "#f5f0e8", color: "#0a0a0a", padding: "20px 48px", fontWeight: 900, fontSize: "16px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "16px" }}>
          Start a Project ↗
        </a>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ borderTop: "3px solid #0a0a0a" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "3px solid #0a0a0a" }}>
            <div style={{ padding: "48px 40px 48px 0", borderRight: "3px solid #0a0a0a" }}>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900, fontFamily: "serif", margin: "0 0 16px", letterSpacing: "-0.02em" }}>Let&apos;s make<br />something raw.</h2>
              <p style={{ fontSize: "15px", lineHeight: "1.6", color: "rgba(10,10,10,0.5)", margin: "0 0 32px" }}>Response within 24 hours. Free consultation. No bullshit.</p>
              {[{ l: "Email", v: "hello@rawagency.id" }, { l: "WA", v: "+62 812-3456-7890" }, { l: "Office", v: "Jl. Jaksa No.10, Jakarta Pusat" }].map(item => (
                <div key={item.l} style={{ display: "flex", gap: "16px", marginBottom: "12px", fontSize: "14px" }}>
                  <span style={{ fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(10,10,10,0.35)", minWidth: "52px" }}>{item.l}</span>
                  <span style={{ color: "rgba(10,10,10,0.7)" }}>{item.v}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "48px 0 48px 40px" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>✓</div>
                  <h3 style={{ fontSize: "24px", fontWeight: 900, fontFamily: "serif" }}>Message received.</h3>
                  <p style={{ color: "rgba(10,10,10,0.4)", fontSize: "14px" }}>We&apos;ll get back to you soon.</p>
                  <button onClick={() => setSent(false)} style={{ marginTop: "12px", fontSize: "12px", color: "rgba(10,10,10,0.3)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Send another</button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {[{ n: "nama", l: "NAMA *", ph: "Budi Santoso" }, { n: "email", l: "EMAIL *", ph: "budi@company.com" }].map(f => (
                    <div key={f.n}>
                      <label style={{ display: "block", fontSize: "11px", fontWeight: 900, letterSpacing: "0.15em", marginBottom: "8px", color: "rgba(10,10,10,0.4)" }}>{f.l}</label>
                      <input required name={f.n} value={form[f.n]} onChange={e => setForm({ ...form, [f.n]: e.target.value })} placeholder={f.ph}
                        style={{ width: "100%", borderBottom: "3px solid #0a0a0a", border: "none", borderBottom: "3px solid #0a0a0a", padding: "12px 0", fontSize: "15px", background: "transparent", outline: "none", fontWeight: 600, boxSizing: "border-box" }} />
                    </div>
                  ))}
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 900, letterSpacing: "0.15em", marginBottom: "8px", color: "rgba(10,10,10,0.4)" }}>CERITAKAN PROJECT ANDA *</label>
                    <textarea required name="pesan" value={form.pesan} onChange={e => setForm({ ...form, pesan: e.target.value })} rows={4} placeholder="Industry, budget, timeline, problem you want solved..."
                      style={{ width: "100%", borderBottom: "3px solid #0a0a0a", border: "none", borderBottom: "3px solid #0a0a0a", padding: "12px 0", fontSize: "14px", background: "transparent", outline: "none", resize: "none", boxSizing: "border-box", lineHeight: "1.6" }} />
                  </div>
                  <button type="submit"
                    style={{ background: "#0a0a0a", color: "#f5f0e8", padding: "18px", fontWeight: 900, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", border: "none", cursor: "pointer" }}>
                    SEND MESSAGE →
                  </button>
                </form>
              )}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", fontSize: "12px", color: "rgba(10,10,10,0.3)", fontWeight: 700, letterSpacing: "0.05em" }}>
            <span>RAW AGENCY</span>
            <span>© 2024 · JAKARTA</span>
          </div>
        </div>
      </section>
    </>
  );
}
