"use client";
import { useState } from "react";

const GOLD = "#d4af37";
const DARK = "#0a0806";
const CREAM = "#f5f0e8";
const MUTED = "rgba(245,240,232,0.45)";

const products = [
  { name: "Lumière Noire", sub: "Eau de Parfum 50ml", price: "$320", desc: "Dark florals meet vetiver and oud. An evening affair." },
  { name: "Velvet Elixir", sub: "Concentrated Oil 30ml", price: "$185", desc: "Pure essence of rose attar and sandalwood." },
  { name: "Onyx Collection", sub: "Gift Set — 3 pcs", price: "$580", desc: "Our signature trio. Gift-ready, timelessly wrapped." },
  { name: "Absolue Nuit", sub: "Eau de Parfum 100ml", price: "$490", desc: "The magnum opus. A scent for those who need none." },
];

const values = [
  { roman: "I", title: "Provenance", text: "Raw materials sourced exclusively from Grasse, Mysore, and Oman." },
  { roman: "II", title: "Artisanat", text: "Every bottle hand-poured. Every box hand-stamped. No exceptions." },
  { roman: "III", title: "Pérennité", text: "Formulas unchanged since 1923. Some things should not be touched." },
];

function ArtDecoLine({ vertical }) {
  if (vertical) return <div style={{ width: "1px", background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`, height: "100%", minHeight: "80px" }} />;
  return <div style={{ height: "1px", background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, width: "100%" }} />;
}

export default function MaisonPage() {
  const [form, setForm] = useState({ name: "", email: "", interest: "" });
  const [sent, setSent] = useState(false);

  return (
    <div style={{ background: DARK, color: CREAM, minHeight: "100vh", overflowX: "hidden" }}>

      {/* Top ornament bar */}
      <div style={{ background: GOLD, height: "3px" }} />
      <div className="flex justify-center py-2" style={{ background: DARK, borderBottom: `1px solid rgba(212,175,55,0.2)` }}>
        <span className="uppercase tracking-widest text-xs" style={{ color: GOLD, letterSpacing: "0.4em" }}>✦ &nbsp; Since 1923 &nbsp; ✦</span>
      </div>

      {/* Navbar */}
      <nav style={{ borderBottom: `1px solid rgba(212,175,55,0.15)` }}>
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xs uppercase tracking-widest" style={{ color: MUTED, letterSpacing: "0.25em" }}>Collection</div>
          <div className="text-center">
            <div style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", letterSpacing: "0.25em", color: CREAM }}>MAISON</div>
            <div className="text-xs" style={{ color: GOLD, letterSpacing: "0.5em", marginTop: "-2px" }}>◆ NOIR ◆</div>
          </div>
          <a href="#enquiry" className="text-xs uppercase tracking-widest" style={{ color: GOLD, textDecoration: "none", letterSpacing: "0.25em" }}>Enquire</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "80px 24px", position: "relative" }}>
        {/* Art Deco corner ornaments */}
        {[{ t: 0, l: 0, tr: "none" }, { t: 0, r: 0, tr: "scaleX(-1)" }, { b: 0, l: 0, tr: "scaleY(-1)" }, { b: 0, r: 0, tr: "scale(-1)" }].map((pos, i) => (
          <div key={i} style={{ position: "absolute", width: 60, height: 60, ...pos, borderTop: i < 2 ? `1px solid ${GOLD}` : "none", borderBottom: i >= 2 ? `1px solid ${GOLD}` : "none", borderLeft: i % 2 === 0 ? `1px solid ${GOLD}` : "none", borderRight: i % 2 === 1 ? `1px solid ${GOLD}` : "none" }} />
        ))}

        <div style={{ maxWidth: "640px" }}>
          <div className="mb-8">
            <ArtDecoLine />
            <div className="flex items-center justify-center gap-6 py-3">
              <div style={{ width: "40px", height: "1px", background: GOLD }} />
              <span className="text-xs uppercase tracking-widest" style={{ color: GOLD, letterSpacing: "0.35em" }}>Haute Parfumerie</span>
              <div style={{ width: "40px", height: "1px", background: GOLD }} />
            </div>
            <ArtDecoLine />
          </div>

          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(3rem,10vw,7rem)", letterSpacing: "0.15em", color: CREAM, fontWeight: 400, lineHeight: 1.1 }}>
            MAISON<br /><span style={{ color: GOLD }}>NOIR</span>
          </h1>

          <div className="my-8">
            <ArtDecoLine />
            <p className="py-6 text-sm leading-loose" style={{ color: MUTED, letterSpacing: "0.08em", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
              "Luxury is not a surface. It is the residue of time, care,<br />and the refusal to compromise."
            </p>
            <ArtDecoLine />
          </div>

          <a href="#collection" className="inline-block text-xs uppercase tracking-widest px-10 py-4 mt-4"
            style={{ border: `1px solid ${GOLD}`, color: GOLD, textDecoration: "none", letterSpacing: "0.3em" }}>
            Explore Collection
          </a>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 24px", borderTop: `1px solid rgba(212,175,55,0.15)` }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: GOLD, letterSpacing: "0.35em" }}>Our Philosophy</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem,5vw,3rem)", letterSpacing: "0.12em", fontWeight: 400 }}>The Three Pillars</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-0" style={{ border: `1px solid rgba(212,175,55,0.2)` }}>
            {values.map((v, i) => (
              <div key={v.roman} className="p-8 text-center" style={{ borderRight: i < 2 ? `1px solid rgba(212,175,55,0.2)` : "none" }}>
                <div className="mb-4" style={{ fontFamily: "Georgia, serif", fontSize: "2rem", color: GOLD }}>{v.roman}</div>
                <ArtDecoLine />
                <h3 className="mt-4 mb-3 text-sm uppercase tracking-widest" style={{ letterSpacing: "0.25em", color: CREAM }}>{v.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: MUTED, fontFamily: "Georgia, serif", fontStyle: "italic" }}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" style={{ padding: "80px 24px", borderTop: `1px solid rgba(212,175,55,0.15)` }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: GOLD, letterSpacing: "0.35em" }}>La Collection</p>
            <ArtDecoLine />
            <h2 className="my-4" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem,5vw,3rem)", letterSpacing: "0.12em", fontWeight: 400 }}>Selected Works</h2>
            <ArtDecoLine />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: `rgba(212,175,55,0.15)` }}>
            {products.map(p => (
              <div key={p.name} className="p-10 group" style={{ background: DARK }}>
                {/* Art deco product icon */}
                <div className="mb-6 flex items-center gap-4">
                  <div style={{ width: "40px", height: "40px", border: `1px solid ${GOLD}`, transform: "rotate(45deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ transform: "rotate(-45deg)", color: GOLD, fontSize: "14px" }}>✦</span>
                  </div>
                  <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
                </div>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", letterSpacing: "0.1em", color: CREAM, fontWeight: 400, marginBottom: "4px" }}>{p.name}</h3>
                <div className="text-xs uppercase mb-3" style={{ color: GOLD, letterSpacing: "0.25em" }}>{p.sub}</div>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: MUTED, fontFamily: "Georgia, serif", fontStyle: "italic" }}>{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem", color: GOLD }}>{p.price}</span>
                  <a href="#enquiry" className="text-xs uppercase tracking-widest" style={{ color: CREAM, textDecoration: "none", letterSpacing: "0.2em", borderBottom: `1px solid rgba(245,240,232,0.3)`, paddingBottom: "2px" }}>
                    Enquire →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry" style={{ padding: "100px 24px", borderTop: `1px solid rgba(212,175,55,0.15)`, background: "#080605" }}>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: GOLD, letterSpacing: "0.35em" }}>Private Client Services</p>
            <ArtDecoLine />
            <h2 className="my-6" style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem,4vw,2.5rem)", letterSpacing: "0.1em", fontWeight: 400 }}>Request a Consultation</h2>
            <ArtDecoLine />
            <p className="mt-4 text-xs leading-loose" style={{ color: MUTED, fontFamily: "Georgia, serif", fontStyle: "italic" }}>
              Our private client advisors respond within 24 hours.<br />Discretion is our standard.
            </p>
          </div>

          {sent ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-6" style={{ color: GOLD }}>✦</div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", letterSpacing: "0.1em", fontWeight: 400, color: CREAM }}>Thank you.</h3>
              <p className="mt-3 text-sm" style={{ color: MUTED, fontFamily: "Georgia, serif", fontStyle: "italic" }}>Your enquiry has been received. We will be in touch.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-6">
              {[{ n: "name", l: "Full Name", ph: "Your Name" }, { n: "email", l: "Email Address", ph: "your@email.com" }].map(f => (
                <div key={f.n}>
                  <label className="block text-xs uppercase mb-3" style={{ color: GOLD, letterSpacing: "0.25em" }}>{f.l}</label>
                  <input required name={f.n} value={form[f.n]} onChange={e => setForm({ ...form, [f.n]: e.target.value })} placeholder={f.ph}
                    className="w-full px-0 py-3 text-sm bg-transparent"
                    style={{ borderBottom: `1px solid rgba(212,175,55,0.4)`, borderTop: "none", borderLeft: "none", borderRight: "none", color: CREAM, outline: "none", fontFamily: "Georgia, serif", fontStyle: "italic" }} />
                </div>
              ))}
              <div>
                <label className="block text-xs uppercase mb-3" style={{ color: GOLD, letterSpacing: "0.25em" }}>Area of Interest</label>
                <select name="interest" value={form.interest} onChange={e => setForm({ ...form, interest: e.target.value })}
                  className="w-full px-0 py-3 text-sm bg-transparent"
                  style={{ borderBottom: `1px solid rgba(212,175,55,0.4)`, borderTop: "none", borderLeft: "none", borderRight: "none", color: CREAM, outline: "none", WebkitAppearance: "none", background: "transparent" }}>
                  <option value="" style={{ background: DARK }}>Select a collection</option>
                  {products.map(p => <option key={p.name} value={p.name} style={{ background: DARK }}>{p.name} — {p.sub}</option>)}
                  <option value="bespoke" style={{ background: DARK }}>Bespoke — Private Commission</option>
                </select>
              </div>
              <div className="pt-4 text-center">
                <button type="submit" className="text-xs uppercase tracking-widest px-14 py-4 transition-all"
                  style={{ border: `1px solid ${GOLD}`, color: GOLD, background: "transparent", cursor: "pointer", letterSpacing: "0.3em" }}
                  onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = DARK; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}>
                  Send Enquiry
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid rgba(212,175,55,0.15)`, padding: "40px 24px" }}>
        <div className="max-w-4xl mx-auto text-center">
          <div style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", letterSpacing: "0.3em", color: CREAM, marginBottom: "4px" }}>MAISON NOIR</div>
          <div className="text-xs mb-6" style={{ color: GOLD, letterSpacing: "0.4em" }}>◆ &nbsp; EST. 1923 &nbsp; ◆</div>
          <ArtDecoLine />
          <p className="mt-6 text-xs" style={{ color: MUTED, letterSpacing: "0.1em" }}>© 2024 Maison Noir. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
