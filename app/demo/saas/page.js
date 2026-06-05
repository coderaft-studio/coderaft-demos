"use client";
import { useState, useEffect } from "react";

const features = [
  { icon: "⚡", title: "Deploy dalam 60 Detik", desc: "Push ke git, CodeLaunch otomatis build & deploy. Zero downtime, zero config." },
  { icon: "📊", title: "Analytics Real-time", desc: "Monitor performa, error, dan user behavior dalam satu dashboard yang intuitif." },
  { icon: "🔒", title: "Security Enterprise", desc: "SSL, WAF, DDoS protection, dan compliance SOC2 built-in tanpa biaya tambahan." },
  { icon: "🌍", title: "Global CDN", desc: "Distribusi konten dari 200+ edge nodes di seluruh dunia untuk latensi minimal." },
  { icon: "🤖", title: "AI-Powered Scaling", desc: "Auto-scaling cerdas berdasarkan traffic pattern. Bayar hanya yang dipakai." },
  { icon: "🔗", title: "100+ Integrasi", desc: "Connect dengan GitHub, Vercel, AWS, Stripe, Slack, dan ratusan tool favorit Anda." },
];

const plans = [
  { name: "Starter", harga: "Gratis", per: "selamanya", fitur: ["3 project", "1 GB storage", "Deploy unlimited", "Basic analytics", "Community support"], highlight: false },
  { name: "Pro", harga: "199.000", per: "/bulan", fitur: ["Unlimited project", "50 GB storage", "Custom domain", "Advanced analytics", "Priority support", "Team collaboration"], highlight: true },
  { name: "Enterprise", harga: "Custom", per: "hubungi kami", fitur: ["SLA 99.99%", "Dedicated infra", "Custom contract", "Onboarding khusus", "24/7 dedicated support", "Audit log"], highlight: false },
];

function Nav() {
  const [sc, setSc] = useState(false);
  const [op, setOp] = useState(false);
  useEffect(() => { const fn = () => setSc(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  const links = [{ href: "#fitur", label: "Fitur" }, { href: "#harga", label: "Harga" }, { href: "#kontak", label: "Kontak" }];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: sc ? "rgba(6,3,15,0.95)" : "transparent", backdropFilter: sc ? "blur(12px)" : "none" }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="font-black text-xl" style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Code<span style={{ WebkitTextFillColor: "#fff" }}>Launch</span> 🚀
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => <a key={l.href} href={l.href} className="text-sm font-medium transition-colors" style={{ color: "rgba(248,250,252,0.6)" }}>{l.label}</a>)}
          <a href="#kontak" className="px-5 py-2 rounded-full text-sm font-bold transition-all hover:shadow-lg"
            style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", color: "#fff" }}>Mulai Gratis</a>
        </nav>
        <button onClick={() => setOp(!op)} className="md:hidden p-2 text-white text-xl">☰</button>
      </div>
      {op && <nav style={{ background: "rgba(6,3,15,0.98)", borderTop: "1px solid rgba(168,85,247,0.2)" }} className="md:hidden px-6 py-4 flex flex-col gap-4">
        {links.map(l => <a key={l.href} href={l.href} onClick={() => setOp(false)} className="font-medium text-white/70">{l.label}</a>)}
        <a href="#kontak" className="text-center py-2 rounded-full font-bold text-white" style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)" }}>Mulai Gratis</a>
      </nav>}
    </header>
  );
}

export default function SaasPage() {
  const [form, setForm] = useState({ email: "", company: "", usecase: "" });
  const [sent, setSent] = useState(false);

  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#06030f" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%,rgba(168,85,247,0.2),transparent)" }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#a855f7" }} />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: "#ec4899" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold mb-8"
            style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", color: "#c084fc" }}>
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Trusted by 10,000+ developers
          </div>
          <h1 className="font-black leading-tight mb-6" style={{ fontSize: "clamp(2.5rem,7vw,5.5rem)", letterSpacing: "-0.03em" }}>
            <span style={{ background: "linear-gradient(135deg,#f8fafc,#e2e8f0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Ship Faster.</span><br />
            <span style={{ background: "linear-gradient(135deg,#a855f7,#ec4899,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Scale Smarter.</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-10" style={{ color: "rgba(248,250,252,0.5)" }}>
            Platform deployment & infrastructure management yang memungkinkan tim Anda fokus pada produk, bukan operasional.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="#kontak" className="px-8 py-4 rounded-full font-black text-lg transition-all hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", color: "#fff", boxShadow: "0 0 40px rgba(168,85,247,0.3)" }}>
              Mulai Gratis — No CC Required
            </a>
            <a href="#fitur" className="px-8 py-4 rounded-full font-semibold text-lg transition-all"
              style={{ border: "1px solid rgba(168,85,247,0.3)", color: "rgba(248,250,252,0.7)" }}>
              Lihat Demo
            </a>
          </div>
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            {[{ num: "99.99%", label: "Uptime SLA" }, { num: "<50ms", label: "Global Latency" }, { num: "0s", label: "Config Time" }].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-black" style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.num}</div>
                <div className="text-xs" style={{ color: "rgba(248,250,252,0.3)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" className="py-24" style={{ background: "#0a0514" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-bold text-xs tracking-widest mb-3" style={{ color: "#a855f7", letterSpacing: "0.2em" }}>EVERYTHING YOU NEED</p>
            <h2 className="font-black text-4xl" style={{ color: "#f8fafc" }}>Fitur <span style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Lengkap</span> dalam Satu Platform</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(f => (
              <div key={f.title} className="p-7 rounded-2xl group hover:-translate-y-1 transition-all"
                style={{ background: "rgba(168,85,247,0.04)", border: "1px solid rgba(168,85,247,0.12)" }}>
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-black text-lg mb-2 text-white group-hover:text-purple-400 transition-colors">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(248,250,252,0.4)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Harga */}
      <section id="harga" className="py-24" style={{ background: "#06030f" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-bold text-xs tracking-widest mb-3" style={{ color: "#a855f7", letterSpacing: "0.2em" }}>PRICING</p>
            <h2 className="font-black text-4xl text-white">Harga yang <span style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Transparan</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {plans.map(p => (
              <div key={p.name} className={`rounded-2xl p-8 relative ${p.highlight ? "scale-105" : ""}`}
                style={p.highlight
                  ? { background: "linear-gradient(135deg,#a855f7,#ec4899)", boxShadow: "0 0 60px rgba(168,85,247,0.3)" }
                  : { background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.15)" }}>
                {p.highlight && <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-black px-4 py-1.5 rounded-full" style={{ background: "#06030f", color: "#a855f7" }}>⭐ MOST POPULAR</div>}
                <div className={`text-sm font-black mb-2 ${p.highlight ? "text-white/80" : "text-purple-400"}`}>{p.name}</div>
                <div className={`text-4xl font-black mb-1 ${p.highlight ? "text-white" : "text-white"}`}>{p.harga === "Gratis" ? "Gratis" : p.harga === "Custom" ? "Custom" : `Rp ${p.harga}`}</div>
                <div className={`text-xs mb-6 ${p.highlight ? "text-white/60" : "text-white/30"}`}>{p.per}</div>
                <ul className="space-y-2.5 mb-8">
                  {p.fitur.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${p.highlight ? "text-white/90" : "text-white/60"}`}>
                      <span className={`mt-0.5 flex-shrink-0 font-black ${p.highlight ? "text-white" : "text-purple-400"}`}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href="#kontak" className={`block text-center py-3 rounded-xl font-black transition-all ${p.highlight ? "bg-white text-purple-700 hover:bg-purple-50" : "text-white hover:bg-purple-900/30"}`}
                  style={!p.highlight ? { border: "1px solid rgba(168,85,247,0.3)" } : {}}>
                  {p.name === "Enterprise" ? "Hubungi Kami" : "Mulai Sekarang"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kontak / CTA */}
      <section id="kontak" className="py-24" style={{ background: "#0a0514" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-black text-4xl mb-4 text-white">Mulai <span style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Sekarang</span></h2>
          <p className="mb-10" style={{ color: "rgba(248,250,252,0.4)" }}>Daftar dalam 30 detik. Tidak perlu kartu kredit.</p>
          {sent ? (
            <div className="py-12">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="font-black text-xl text-white mb-2">Welcome aboard!</h3>
              <p style={{ color: "rgba(248,250,252,0.4)" }}>Cek email Anda untuk link aktivasi.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <input required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email kerja Anda" type="email"
                className="w-full px-5 py-4 rounded-xl text-sm outline-none"
                style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", color: "#f8fafc" }} />
              <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Nama perusahaan (opsional)"
                className="w-full px-5 py-4 rounded-xl text-sm outline-none"
                style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", color: "#f8fafc" }} />
              <button type="submit" className="w-full py-4 rounded-xl font-black text-lg transition-all hover:shadow-2xl"
                style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", color: "#fff", boxShadow: "0 0 30px rgba(168,85,247,0.4)" }}>
                Mulai Trial Gratis 14 Hari 🚀
              </button>
              <p className="text-xs" style={{ color: "rgba(248,250,252,0.2)" }}>Tidak perlu kartu kredit · Cancel kapan saja · Setup dalam menit</p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#06030f", borderTop: "1px solid rgba(168,85,247,0.1)" }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="font-black text-lg" style={{ background: "linear-gradient(135deg,#a855f7,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>CodeLaunch 🚀</div>
          <p className="text-xs" style={{ color: "rgba(248,250,252,0.2)" }}>© 2024 CodeLaunch. Ship faster, scale smarter.</p>
        </div>
      </footer>
    </>
  );
}
