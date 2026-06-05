"use client";
import { useState, useEffect } from "react";

const features = [
  { icon: "⚡", title: "Instant Transfer", desc: "Send money to 150+ countries in seconds, with zero hidden fees." },
  { icon: "📊", title: "Smart Analytics", desc: "AI-powered insights to help you make the best financial decisions." },
  { icon: "🔒", title: "Bank-grade Security", desc: "Military-grade encryption and biometrics protecting every cent you own." },
  { icon: "💹", title: "Auto Invest", desc: "Automatically invest in stocks, crypto, and funds based on your risk profile." },
  { icon: "🌐", title: "Multi Currency", desc: "Hold, exchange, and spend in 60+ currencies at the best rates available." },
  { icon: "🎯", title: "Goal Tracker", desc: "Set financial goals and Aurora will help you reach them faster." },
];

const plans = [
  { name: "Free", harga: "0", fitur: ["5 transfers/month", "1 currency account", "Basic analytics", "Email support"] },
  { name: "Plus", harga: "$4.99", fitur: ["Unlimited transfers", "10 currency accounts", "AI analytics", "Priority support", "Auto invest"] },
  { name: "Pro", harga: "$14.99", fitur: ["All Plus features", "60+ currencies", "Dedicated manager", "API access", "White-label option"] },
];

const gCard = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "24px",
};

function Nav() {
  const [sc, setSc] = useState(false);
  const [op, setOp] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: sc ? "rgba(3,1,10,0.88)" : "transparent",
      backdropFilter: sc ? "blur(20px)" : "none",
      /* border selalu ada, opacity warna yang berubah — tidak ada flash */
      borderBottom: `1px solid rgba(255,255,255,${sc ? 0.07 : 0})`,
      transition: "background 0.4s ease, border-color 0.4s ease",
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg,#818cf8,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>◈</div>
          <span style={{ fontWeight: 900, fontSize: "18px", color: "#f0f4ff" }}>Aurora</span>
        </div>
        <nav style={{ display: "flex", gap: "32px", fontSize: "14px", fontWeight: 500 }}>
          {["Features", "Pricing", "Security"].map(l => <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "rgba(240,244,255,0.5)", textDecoration: "none" }}>{l}</a>)}
        </nav>
        <div style={{ display: "flex", gap: "12px" }}>
          <a href="#pricing" style={{ padding: "8px 20px", borderRadius: "100px", fontSize: "13px", fontWeight: 700, color: "rgba(240,244,255,0.7)", textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)" }}>Login</a>
          <a href="#pricing" style={{ padding: "8px 20px", borderRadius: "100px", fontSize: "13px", fontWeight: 700, color: "#0a0a14", textDecoration: "none", background: "linear-gradient(135deg,#818cf8,#38bdf8)" }}>Get Started</a>
        </div>
      </div>
    </header>
  );
}

export default function GlassPage() {
  const [form, setForm] = useState({ email: "" });
  const [sent, setSent] = useState(false);

  return (
    <div style={{ background: "#03010a", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Global background glows */}
      <div style={{ position: "fixed", top: "10%", left: "15%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.15),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: "20%", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,0.1),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "20%", left: "30%", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,0.12),transparent 70%)", pointerEvents: "none" }} />

      <Nav />

      {/* ── HERO ── */}
      <section style={{ paddingTop: "140px", paddingBottom: "80px", textAlign: "center", maxWidth: "900px", margin: "0 auto", padding: "140px 24px 80px", position: "relative" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "100px", marginBottom: "32px", ...gCard }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
          <span style={{ fontSize: "13px", fontWeight: 600, color: "rgba(240,244,255,0.6)" }}>10,000+ users trust Aurora</span>
        </div>

        <h1 style={{ fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 900, lineHeight: "1.0", letterSpacing: "-0.04em", margin: "0 0 24px", background: "linear-gradient(135deg,#f0f4ff 0%,#818cf8 50%,#38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Your Money,<br />Amplified.
        </h1>
        <p style={{ fontSize: "20px", lineHeight: "1.6", color: "rgba(240,244,255,0.45)", margin: "0 auto 40px", maxWidth: "560px" }}>
          The smart financial platform that helps you save more, invest smarter, and live with greater peace of mind.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "64px" }}>
          <a href="#pricing" style={{ padding: "16px 36px", borderRadius: "100px", fontWeight: 900, fontSize: "15px", textDecoration: "none", color: "#0a0a14", background: "linear-gradient(135deg,#818cf8,#38bdf8)", boxShadow: "0 0 40px rgba(129,140,248,0.4)" }}>
            Get Started Free ↗
          </a>
          <a href="#features" style={{ padding: "16px 36px", borderRadius: "100px", fontWeight: 700, fontSize: "15px", textDecoration: "none", color: "rgba(240,244,255,0.7)", ...gCard }}>
            Lihat Demo
          </a>
        </div>

        {/* Glass hero card */}
        <div style={{ ...gCard, padding: "32px", maxWidth: "700px", margin: "0 auto", textAlign: "left" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <div>
              <div style={{ fontSize: "12px", color: "rgba(240,244,255,0.3)", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "4px" }}>TOTAL BALANCE</div>
              <div style={{ fontSize: "36px", fontWeight: 900, color: "#f0f4ff", letterSpacing: "-0.02em" }}>Rp 248.750.000</div>
            </div>
            <div style={{ padding: "8px 16px", borderRadius: "100px", background: "rgba(74,222,128,0.15)", color: "#4ade80", fontWeight: 700, fontSize: "14px" }}>↑ +12.4%</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
            {[{ l: "Invested", v: "Rp 120jt", c: "#818cf8" }, { l: "Savings", v: "Rp 85jt", c: "#38bdf8" }, { l: "Spending", v: "Rp 43jt", c: "#f472b6" }].map(s => (
              <div key={s.l} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "16px", padding: "16px" }}>
                <div style={{ fontSize: "11px", color: "rgba(240,244,255,0.3)", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "8px" }}>{s.l}</div>
                <div style={{ fontSize: "18px", fontWeight: 900, color: s.c }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", color: "#818cf8", marginBottom: "12px" }}>FEATURES</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: 0, color: "#f0f4ff" }}>
            Everything you need to<br /><span style={{ background: "linear-gradient(135deg,#818cf8,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>grow your wealth.</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }}>
          {features.map((f, i) => (
            <div key={f.title} style={{ ...gCard, padding: "28px", cursor: "default", transition: "transform 0.2s", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)" }} />
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>{f.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#f0f4ff", margin: "0 0 10px", letterSpacing: "-0.01em" }}>{f.title}</h3>
              <p style={{ fontSize: "14px", lineHeight: "1.6", color: "rgba(240,244,255,0.4)", margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "64px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ ...gCard, padding: "48px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "32px', textAlign: 'center" }}>
          {[{ num: "Rp 2T+", label: "Total Transaksi", glow: "#818cf8" }, { num: "10rb+", label: "Pengguna Aktif", glow: "#38bdf8" }, { num: "99.9%", label: "Uptime", glow: "#4ade80" }, { num: "150+", label: "Negara", glow: "#f472b6" }].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "36px", fontWeight: 900, color: s.glow, textShadow: `0 0 30px ${s.glow}80`, letterSpacing: "-0.02em" }}>{s.num}</div>
              <div style={{ fontSize: "13px", color: "rgba(240,244,255,0.4)", fontWeight: 600, marginTop: "8px", letterSpacing: "0.05em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: "80px 24px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", color: "#818cf8", marginBottom: "12px" }}>PRICING</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-0.03em", margin: 0, color: "#f0f4ff" }}>Start free, scale as you grow.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
          {plans.map((p, i) => (
            <div key={p.name} style={{ ...gCard, padding: "32px", position: "relative", overflow: "hidden", ...(i === 1 ? { border: "1px solid rgba(129,140,248,0.4)", boxShadow: "0 0 40px rgba(129,140,248,0.1)" } : {}) }}>
              {i === 1 && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg,#818cf8,#38bdf8)" }} />}
              {i === 1 && <div style={{ position: "absolute", top: "16px", right: "16px", padding: "4px 12px", borderRadius: "100px", background: "rgba(129,140,248,0.15)", color: "#818cf8", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em" }}>POPULAR</div>}
              <div style={{ fontSize: "14px", fontWeight: 700, color: "rgba(240,244,255,0.4)", letterSpacing: "0.05em", marginBottom: "16px" }}>{p.name}</div>
              <div style={{ fontSize: "36px", fontWeight: 900, color: "#f0f4ff", letterSpacing: "-0.03em", marginBottom: "4px" }}>{p.harga === "0" ? "Gratis" : `Rp ${p.harga}`}</div>
              <div style={{ fontSize: "12px", color: "rgba(240,244,255,0.3)", marginBottom: "24px" }}>{p.harga !== "0" ? "per bulan" : "selamanya"}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {p.fitur.map(f => (
                  <li key={f} style={{ fontSize: "14px", color: "rgba(240,244,255,0.55)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: i === 1 ? "#818cf8" : "#4ade80", fontWeight: 700 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#cta" style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: "100px", fontWeight: 700, fontSize: "14px", textDecoration: "none", color: i === 1 ? "#0a0a14" : "rgba(240,244,255,0.8)", background: i === 1 ? "linear-gradient(135deg,#818cf8,#38bdf8)" : "rgba(255,255,255,0.06)", transition: "all 0.2s" }}>
                {p.harga === "0" ? "Get Started Free" : "Try 14 Days Free"}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" style={{ padding: "80px 24px", textAlign: "center", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ ...gCard, padding: "56px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(129,140,248,0.15),transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,rgba(129,140,248,0.3),transparent)" }} />
          <div style={{ position: "relative" }}>
            <h2 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, color: "#f0f4ff", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
              Ready to take control<br /><span style={{ background: "linear-gradient(135deg,#818cf8,#38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>of your finances?</span>
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(240,244,255,0.4)", margin: "0 0 36px" }}>Join 10,000+ users who have already transformed the way they manage their money.</p>
            {sent ? (
              <div>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎉</div>
                <p style={{ color: "#4ade80", fontWeight: 700 }}>Welcome to Aurora! Check your email.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "flex", gap: "12px", maxWidth: "420px", margin: "0 auto" }}>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Your work email"
                  style={{ flex: 1, padding: "14px 20px", borderRadius: "100px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f4ff", fontSize: "14px", outline: "none" }} />
                <button type="submit" style={{ padding: "14px 28px", borderRadius: "100px", fontWeight: 900, fontSize: "14px", color: "#0a0a14", background: "linear-gradient(135deg,#818cf8,#38bdf8)", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
                  Get Started ↗
                </button>
              </form>
            )}
            <p style={{ fontSize: "12px", color: "rgba(240,244,255,0.2)", marginTop: "16px" }}>Free 14 days · No credit card required · Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 24px", maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "linear-gradient(135deg,#818cf8,#38bdf8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>◈</div>
          <span style={{ fontWeight: 900, color: "#f0f4ff" }}>Aurora</span>
        </div>
        <p style={{ fontSize: "12px", color: "rgba(240,244,255,0.2)" }}>© 2024 Aurora Financial Technologies. All rights reserved.</p>
      </footer>
    </div>
  );
}
