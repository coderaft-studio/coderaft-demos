"use client";
import { useState } from "react";

const PINK = "#ff6ec7";
const CYAN = "#00f5ff";
const VIOLET = "#bf5fff";
const WHITE = "#ffffff";
const BLK = "#0a0a0a";

const products = [
  { name: "HoloGlow Serum", sub: "Radiance Booster", price: "$58", emoji: "✨", gradient: "linear-gradient(135deg,#ff6ec7,#bf5fff)", tag: "BESTSELLER" },
  { name: "AquaBurst Mask", sub: "Hydration Overload", price: "$42", emoji: "💧", gradient: "linear-gradient(135deg,#00f5ff,#4169ff)", tag: "NEW DROP" },
  { name: "Chrome Lip", sub: "Metallic Plumper", price: "$28", emoji: "💋", gradient: "linear-gradient(135deg,#ff6ec7,#ffb347)", tag: "VIRAL" },
  { name: "Pixel SPF 50", sub: "UV Defense Shield", price: "$36", emoji: "🛡", gradient: "linear-gradient(135deg,#bf5fff,#00f5ff)", tag: "MUST HAVE" },
];

const steps = [
  { n: "01", title: "Cleanse", text: "Prep your canvas. Clear skin absorbs 40% more active ingredients.", emoji: "🫧" },
  { n: "02", title: "Activate", text: "Apply HoloGlow Serum. Tap — never rub. Let nanotech penetrate.", emoji: "⚡" },
  { n: "03", title: "Lock", text: "Seal with AquaBurst mask. 15 mins. No scrolling allowed. Just vibe.", emoji: "🔒" },
  { n: "04", title: "Glow", text: "Reveal your upgrade. Take the selfie. You've earned it.", emoji: "✨" },
];

function IridescentBadge({ children, style }) {
  return (
    <span className="inline-block text-xs font-black uppercase px-3 py-1"
      style={{ background: "linear-gradient(135deg,#ff6ec7,#bf5fff,#00f5ff)", color: WHITE, letterSpacing: "0.12em", borderRadius: "2px", ...style }}>
      {children}
    </span>
  );
}

export default function GlowLabPage() {
  const [form, setForm] = useState({ name: "", email: "", skin: "" });
  const [sent, setSent] = useState(false);

  return (
    <div style={{ background: WHITE, color: BLK, minHeight: "100vh", overflowX: "hidden" }}>

      {/* Top iridescent bar */}
      <div style={{ height: "4px", background: "linear-gradient(to right, #ff6ec7, #bf5fff, #00f5ff, #ff6ec7)", backgroundSize: "200% 100%", animation: "none" }} />

      {/* Navbar */}
      <nav style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.06)", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="font-black text-xl" style={{ letterSpacing: "-0.03em" }}>
            GLOW<span style={{ background: "linear-gradient(135deg,#ff6ec7,#bf5fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LAB</span>
          </div>
          <div className="hidden md:flex gap-6">
            {["Products", "Routine", "About"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-xs font-black uppercase" style={{ color: BLK, textDecoration: "none", letterSpacing: "0.1em" }}>{l}</a>
            ))}
          </div>
          <a href="#contact" className="font-black text-xs uppercase px-5 py-2.5"
            style={{ background: "linear-gradient(135deg,#ff6ec7,#bf5fff)", color: WHITE, textDecoration: "none", letterSpacing: "0.08em", borderRadius: "2px" }}>
            Shop Now
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ padding: "80px 16px 60px", textAlign: "center", background: "linear-gradient(180deg, #fff5fc 0%, #f0fbff 50%, #fdf5ff 100%)", position: "relative", overflow: "hidden" }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,110,199,0.15),transparent)", top: "-100px", left: "-100px" }} />
        <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(0,245,255,0.15),transparent)", bottom: "-50px", right: "-50px" }} />

        <div className="relative max-w-3xl mx-auto">
          <IridescentBadge style={{ marginBottom: "24px" }}>🔬 Futuristic Skincare</IridescentBadge>

          <h1 className="font-black leading-none mb-6"
            style={{ fontSize: "clamp(3.5rem,12vw,8rem)", letterSpacing: "-0.05em" }}>
            YOUR SKIN<br />
            <span style={{ background: "linear-gradient(135deg,#ff6ec7 0%,#bf5fff 40%,#00f5ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>UPGRADED.</span>
          </h1>
          <p className="text-lg mb-10 mx-auto" style={{ maxWidth: "520px", color: "rgba(10,10,10,0.55)", lineHeight: 1.7 }}>
            Science-backed formulas with Y2K aesthetics. We made skincare feel like a vibe again.
          </p>

          {/* CTA pills */}
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#products" className="font-black text-sm uppercase px-8 py-4 inline-block"
              style={{ background: "linear-gradient(135deg,#ff6ec7,#bf5fff)", color: WHITE, textDecoration: "none", letterSpacing: "0.08em", boxShadow: "0 0 30px rgba(255,110,199,0.35)" }}>
              Shop the Drop →
            </a>
            <a href="#routine" className="font-black text-sm uppercase px-8 py-4 inline-block"
              style={{ border: "2px solid", borderColor: PINK, color: PINK, textDecoration: "none", letterSpacing: "0.08em" }}>
              See the Routine
            </a>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-10 mt-14">
            {[["100K+", "Happy Skin"], ["4.9★", "Reviews"], ["#1", "Beauty TikTok"]].map(s => (
              <div key={s[0]} className="text-center">
                <div className="font-black text-2xl" style={{ background: "linear-gradient(135deg,#ff6ec7,#bf5fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s[0]}</div>
                <div className="text-xs font-bold uppercase" style={{ color: "rgba(10,10,10,0.4)", letterSpacing: "0.1em" }}>{s[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" style={{ padding: "80px 16px", background: WHITE }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <IridescentBadge style={{ marginBottom: "16px" }}>✨ New Drops</IridescentBadge>
            <h2 className="font-black" style={{ fontSize: "clamp(2rem,6vw,4rem)", letterSpacing: "-0.04em" }}>The Lab Collection</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map(p => (
              <div key={p.name} className="overflow-hidden group hover:-translate-y-1 transition-transform"
                style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div className="flex items-center justify-center text-5xl" style={{ background: p.gradient, height: "160px", position: "relative" }}>
                  {p.emoji}
                  <span className="absolute top-3 left-3 text-xs font-black uppercase px-2 py-0.5" style={{ background: "rgba(0,0,0,0.5)", color: WHITE, letterSpacing: "0.1em" }}>
                    {p.tag}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-black text-base mb-0.5">{p.name}</h3>
                  <p className="text-xs mb-3" style={{ color: "rgba(10,10,10,0.45)", letterSpacing: "0.05em" }}>{p.sub}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-lg" style={{ background: "linear-gradient(135deg,#ff6ec7,#bf5fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{p.price}</span>
                    <button className="text-xs font-black uppercase px-3 py-1.5" style={{ background: BLK, color: WHITE, border: "none", cursor: "pointer", letterSpacing: "0.08em" }}>Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routine Steps */}
      <section id="routine" style={{ padding: "80px 16px", background: "linear-gradient(135deg,#fff5fc,#f0fbff)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <IridescentBadge style={{ marginBottom: "16px" }}>⚡ The Protocol</IridescentBadge>
            <h2 className="font-black" style={{ fontSize: "clamp(2rem,6vw,4rem)", letterSpacing: "-0.04em" }}>4-Step Glow Routine</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(s => (
              <div key={s.n} className="p-6 text-center" style={{ background: WHITE, border: "1px solid rgba(255,110,199,0.15)", boxShadow: "0 0 30px rgba(255,110,199,0.06)" }}>
                <div className="text-4xl mb-4">{s.emoji}</div>
                <div className="font-black text-xs mb-2" style={{ color: PINK, letterSpacing: "0.2em" }}>{s.n}</div>
                <h3 className="font-black text-lg mb-2">{s.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(10,10,10,0.5)" }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "80px 16px", background: BLK }}>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <IridescentBadge style={{ marginBottom: "16px" }}>💌 Get in Touch</IridescentBadge>
            <h2 className="font-black" style={{ fontSize: "clamp(2rem,6vw,3.5rem)", letterSpacing: "-0.04em", color: WHITE }}>
              Get Your Free<br />
              <span style={{ background: "linear-gradient(135deg,#ff6ec7,#00f5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Skin Analysis</span>
            </h2>
            <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Tell us your skin type. We'll build your perfect routine — free.</p>
          </div>

          {sent ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="font-black text-xl" style={{ color: WHITE }}>You're on the list!</h3>
              <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Check your email for your free skin analysis.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
              {[{ n: "name", l: "Your Name", ph: "Name here" }, { n: "email", l: "Email", ph: "your@email.com" }].map(f => (
                <div key={f.n}>
                  <label className="block text-xs font-black uppercase mb-2" style={{ color: PINK, letterSpacing: "0.15em" }}>{f.l}</label>
                  <input required name={f.n} value={form[f.n]} onChange={e => setForm({ ...form, [f.n]: e.target.value })} placeholder={f.ph}
                    className="w-full px-4 py-3 text-sm font-bold"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,110,199,0.3)", color: WHITE, outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-black uppercase mb-2" style={{ color: PINK, letterSpacing: "0.15em" }}>Skin Type</label>
                <select name="skin" value={form.skin} onChange={e => setForm({ ...form, skin: e.target.value })}
                  className="w-full px-4 py-3 text-sm font-bold"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,110,199,0.3)", color: WHITE, outline: "none", boxSizing: "border-box" }}>
                  <option value="" style={{ background: BLK }}>Select skin type</option>
                  {["Dry", "Oily", "Combination", "Sensitive", "Normal"].map(t => <option key={t} value={t} style={{ background: BLK }}>{t}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full font-black text-sm uppercase py-4"
                style={{ background: "linear-gradient(135deg,#ff6ec7,#bf5fff)", color: WHITE, border: "none", cursor: "pointer", letterSpacing: "0.1em", boxShadow: "0 0 30px rgba(255,110,199,0.3)" }}>
                Get My Free Analysis →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,110,199,0.15)", padding: "24px 16px", background: BLK }}>
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="font-black text-lg" style={{ color: WHITE }}>GLOW<span style={{ background: "linear-gradient(135deg,#ff6ec7,#bf5fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LAB</span></div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>© 2024 GlowLab · Future of Skincare</p>
        </div>
      </footer>
    </div>
  );
}
