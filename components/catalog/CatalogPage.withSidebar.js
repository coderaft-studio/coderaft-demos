"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { demos } from "@/data/demos";

const PER_PAGE = 9;

const catStyle = {
  "Landing Page": { bg: "rgba(139,92,246,0.12)", text: "#a78bfa", border: "rgba(139,92,246,0.25)" },
  "Dashboard":    { bg: "rgba(56,189,248,0.12)",  text: "#67e8f9", border: "rgba(56,189,248,0.25)" },
};

// ── Sidebar filter item ──
function FilterItem({ label, count, active, onClick, color = "#a78bfa" }) {
  return (
    <button onClick={onClick}
      style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "9px 12px", borderRadius: "9px", cursor: "pointer",
        background: active ? `rgba(139,92,246,0.12)` : "transparent",
        border: active ? "1px solid rgba(139,92,246,0.25)" : "1px solid transparent",
        transition: "all .2s", textAlign: "left",
        marginBottom: "3px",
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}>
      <span style={{ fontSize: "13px", fontWeight: active ? 700 : 500, color: active ? "#f0f4ff" : "rgba(240,244,255,0.45)" }}>
        {label}
      </span>
      <span style={{
        fontSize: "11px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px",
        background: active ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.05)",
        color: active ? "#a78bfa" : "rgba(240,244,255,0.3)",
      }}>{count}</span>
    </button>
  );
}

export default function CatalogPage() {
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("Semua");
  const [langFilter, setLang]     = useState("Semua");
  const [page, setPage]           = useState(1);
  const [mobileFilter, setMobileFilter] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return demos.filter(d => {
      const matchCat  = filter === "Semua" || d.cat === filter;
      const matchLang = langFilter === "Semua" || d.lang === langFilter;
      const matchSearch = !q || d.title.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q) || d.subcat.toLowerCase().includes(q) ||
        d.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchLang && matchSearch;
    });
  }, [search, filter, langFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const reset = () => setPage(1);
  const setF  = (f) => { setFilter(f);  reset(); };
  const setL  = (l) => { setLang(l);   reset(); };
  const setS  = (v) => { setSearch(v); reset(); };

  const counts = {
    Semua:         demos.length,
    "Landing Page": demos.filter(d => d.cat === "Landing Page").length,
    Dashboard:      demos.filter(d => d.cat === "Dashboard").length,
  };
  const langCounts = {
    Semua: demos.length,
    id:    demos.filter(d => d.lang === "id").length,
    en:    demos.filter(d => d.lang === "en").length,
  };

  const activeFiltersCount = [
    filter !== "Semua", langFilter !== "Semua", search !== ""
  ].filter(Boolean).length;

  return (
    <div style={{ background: "#070711", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", color: "#f0f4ff", fontFamily: "'Inter',sans-serif" }}>

      {/* ── TOP NAV ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(7,7,17,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(139,92,246,0.1)", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <svg width="26" height="26" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#a78bfa"/></linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#a78bfa"/><stop offset="100%" stopColor="#ec4899"/></linearGradient>
            </defs>
            <path d="M50 14 L50 60 L20 60 Z" fill="url(#g1)"/>
            <path d="M50 22 L50 60 L70 60 Z" fill="url(#g2)" opacity="0.85"/>
            <path d="M16 64 Q50 76 84 64 L79 71 Q50 83 21 71 Z" fill="url(#g1)"/>
            <path d="M10 82 Q20 77 30 82 Q40 87 50 82 Q60 77 70 82 Q80 87 90 82" stroke="url(#g1)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          </svg>
          <span style={{ fontWeight: 800, fontSize: "15px", letterSpacing: "-0.01em" }}>
            Coderaft <span style={{ color: "#a78bfa" }}>Demos</span>
          </span>
          <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "100px", fontWeight: 700, background: "rgba(139,92,246,0.12)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.2)" }}>
            {demos.length} demos
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {activeFiltersCount > 0 && (
            <button onClick={() => { setF("Semua"); setL("Semua"); setS(""); }}
              style={{ fontSize: "11px", fontWeight: 700, color: "#a78bfa", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", padding: "4px 12px", borderRadius: "100px", cursor: "pointer" }}>
              Reset ({activeFiltersCount}) ✕
            </button>
          )}
          {/* Mobile filter toggle */}
          <button className="lg:hidden" onClick={() => setMobileFilter(true)}
            style={{ display: "flex", alignItems: "center", gap: "6px", padding: "7px 12px", borderRadius: "9px", background: activeFiltersCount > 0 ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.06)", border: `1px solid ${activeFiltersCount > 0 ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.1)"}`, color: activeFiltersCount > 0 ? "#a78bfa" : "rgba(240,244,255,0.6)", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}>
            ⚙ Filter{activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ""}
          </button>
          <a href="https://coderaft.web.id" target="_blank" rel="noopener noreferrer"
            className="hidden sm:block"
            style={{ fontSize: "12px", fontWeight: 600, color: "rgba(240,244,255,0.35)", textDecoration: "none", letterSpacing: "0.05em" }}>
            ← Portfolio Utama
          </a>
        </div>
      </header>

      {/* ── MOBILE FILTER DRAWER ── */}
      {mobileFilter && (
        <div className="lg:hidden" style={{ position: "fixed", inset: 0, zIndex: 300 }}>
          {/* Backdrop */}
          <div onClick={() => setMobileFilter(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}/>
          {/* Drawer */}
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: "min(85vw, 340px)", background: "#0d0b1e", borderRight: "1px solid rgba(139,92,246,0.2)", overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Header drawer */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: "13px", fontWeight: 800, color: "#f0f4ff" }}>Filter Demo</span>
              <button onClick={() => setMobileFilter(false)} style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,244,255,0.6)", cursor: "pointer", fontSize: "16px" }}>✕</button>
            </div>
            {/* Search */}
            <div>
              <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(167,139,250,0.45)", marginBottom: "8px" }}>🔍 Cari Demo</div>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "rgba(240,244,255,0.3)", fontSize: "13px" }}>⌕</span>
                <input value={search} onChange={e => setS(e.target.value)} placeholder="Nama, kategori, tag..."
                  style={{ width: "100%", padding: "10px 30px 10px 30px", borderRadius: "9px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.2)", color: "#f0f4ff", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}/>
                {search && <button onClick={() => setS("")} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(240,244,255,0.3)", cursor: "pointer", fontSize: "14px" }}>✕</button>}
              </div>
            </div>
            {/* Kategori */}
            <div>
              <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(167,139,250,0.45)", marginBottom: "8px" }}>🎯 Kategori</div>
              {[["Semua", counts.Semua, filter === "Semua" && langFilter === "Semua", () => { setF("Semua"); setL("Semua"); }],
                ["Landing Page", counts["Landing Page"], filter === "Landing Page", () => { setF(filter === "Landing Page" ? "Semua" : "Landing Page"); setL("Semua"); }],
                ["Dashboard", counts.Dashboard, filter === "Dashboard", () => { setF(filter === "Dashboard" ? "Semua" : "Dashboard"); setL("Semua"); }],
              ].map(([label, count, active, fn]) => (
                <FilterItem key={label} label={label} count={count} active={active} onClick={fn} />
              ))}
            </div>
            {/* Bahasa */}
            <div>
              <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(167,139,250,0.45)", marginBottom: "8px" }}>🌍 Bahasa</div>
              <FilterItem label="🇮🇩 Bahasa Indonesia" count={langCounts.id} active={langFilter === "id"} onClick={() => { setL(langFilter === "id" ? "Semua" : "id"); setF("Semua"); }} />
              <FilterItem label="🇺🇸 English" count={langCounts.en} active={langFilter === "en"} onClick={() => { setL(langFilter === "en" ? "Semua" : "en"); setF("Semua"); }} />
            </div>
            {/* Apply */}
            <button onClick={() => setMobileFilter(false)}
              style={{ padding: "12px", borderRadius: "10px", background: "linear-gradient(135deg,#8b5cf6,#6d28d9)", color: "#fff", fontSize: "13px", fontWeight: 800, cursor: "pointer", border: "none", boxShadow: "0 4px 16px rgba(109,40,217,0.4)" }}>
              Tampilkan {filtered.length} Demo
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN LAYOUT: LEFT SIDEBAR + CENTER+RIGHT SCROLL ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* ══ LEFT SIDEBAR (truly fixed) ══ */}
        <aside className="hidden lg:flex" style={{
          width: "17vw", flexShrink: 0,
          height: "100%", overflowY: "auto",
          padding: "20px 14px 20px 16px",
          borderRight: "1px solid rgba(139,92,246,0.1)",
          background: "rgba(7,7,17,0.5)",
          scrollbarWidth: "none",
          flexDirection: "column",
        }}>
          {/* Scrollbar hide */}
          <style>{`aside::-webkit-scrollbar{display:none}`}</style>

          {/* ── INFO STATS (display only) ── */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(167,139,250,0.45)", marginBottom: "10px" }}>
              📊 Katalog
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))", gap: "6px" }}>
              {[
                { n: demos.length,                          l: "Total Demo",   c: "#a78bfa" },
                { n: counts["Landing Page"],                l: "Landing Page", c: "#c084fc" },
                { n: counts["Dashboard"],                   l: "Dashboard",    c: "#67e8f9" },
                { n: langCounts["id"],                      l: "🇮🇩 Indonesia", c: "#86efac" },
                { n: langCounts["en"],                      l: "🇺🇸 English",   c: "#f9a8d4" },
                { n: demos.filter(d=>d.stack.includes("Next.js")).length, l: "Next.js",  c: "#fde68a" },
              ].map(s => (
                <div key={s.l} style={{ padding: "10px 12px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: "20px", fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: "10px", fontWeight: 600, color: "rgba(240,244,255,0.3)", marginTop: "3px", letterSpacing: "0.02em" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(139,92,246,0.12)", marginBottom: "20px" }}/>

          {/* ── SEARCH ── */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(167,139,250,0.45)", marginBottom: "10px" }}>
              🔍 Cari Demo
            </div>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "11px", top: "50%", transform: "translateY(-50%)", color: "rgba(240,244,255,0.3)", fontSize: "13px" }}>⌕</span>
              <input value={search} onChange={e => setS(e.target.value)}
                placeholder="Nama, kategori, tag..."
                style={{ width: "100%", padding: "9px 30px 9px 30px", borderRadius: "9px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(139,92,246,0.2)", color: "#f0f4ff", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}/>
              {search && (
                <button onClick={() => setS("")} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(240,244,255,0.3)", cursor: "pointer", fontSize: "14px" }}>✕</button>
              )}
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(139,92,246,0.12)", marginBottom: "20px" }}/>

          {/* ── FILTER KATEGORI ── */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(167,139,250,0.45)", marginBottom: "10px" }}>
              🎯 Kategori
            </div>
            <FilterItem label="Semua" count={counts.Semua} active={filter === "Semua" && langFilter === "Semua"} onClick={() => { setF("Semua"); setL("Semua"); }} />
            <FilterItem label="Landing Page" count={counts["Landing Page"]} active={filter === "Landing Page"} onClick={() => { setF(filter === "Landing Page" ? "Semua" : "Landing Page"); setL("Semua"); }} />
            <FilterItem label="Dashboard" count={counts.Dashboard} active={filter === "Dashboard"} onClick={() => { setF(filter === "Dashboard" ? "Semua" : "Dashboard"); setL("Semua"); }} />
          </div>

          {/* ── FILTER BAHASA ── */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(167,139,250,0.45)", marginBottom: "10px" }}>
              🌍 Bahasa
            </div>
            <FilterItem label="🇮🇩 Bahasa Indonesia" count={langCounts.id} active={langFilter === "id"} onClick={() => { setL(langFilter === "id" ? "Semua" : "id"); setF("Semua"); }} />
            <FilterItem label="🇺🇸 English" count={langCounts.en} active={langFilter === "en"} onClick={() => { setL(langFilter === "en" ? "Semua" : "en"); setF("Semua"); }} />
          </div>

          <div style={{ height: "1px", background: "rgba(139,92,246,0.12)", marginBottom: "20px" }}/>

          {/* ── SARAN / HIGHLIGHT ── */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(167,139,250,0.45)", marginBottom: "10px" }}>
              ✦ Info
            </div>
            <div style={{ padding: "14px", borderRadius: "12px", background: "linear-gradient(135deg,rgba(139,92,246,0.1),rgba(236,72,153,0.06))", border: "1px solid rgba(139,92,246,0.2)" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#a78bfa", marginBottom: "6px" }}>💡 Cara pakai</div>
              <p style={{ fontSize: "11px", color: "rgba(240,244,255,0.45)", lineHeight: 1.6, margin: 0 }}>
                Klik demo untuk membuka live preview. Semua demo bisa langsung diperlihatkan ke klien.
              </p>
            </div>
            <div style={{ marginTop: "8px", padding: "12px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#67e8f9", marginBottom: "4px" }}>🆕 Terbaru</div>
              <div style={{ fontSize: "11px", color: "rgba(240,244,255,0.45)" }}>Axiom Studio, Voyaje, Amber & Co.</div>
            </div>
          </div>

          {/* ── BACK TO STUDIO ── */}
        </aside>

        {/* ══ MAIN CONTENT ══ */}
        {/* ══ SCROLL WRAPPER — cards + right panel scroll together ══ */}
        <div style={{ flex: 1, minWidth: 0, overflowY: "auto", height: "100%", display: "flex", gap: "0" }}>
        <main style={{ flex: 1, minWidth: 0 }}>
          <div className="max-w-6xl mx-auto" style={{ padding: "0 24px" }}>

          {/* ── HERO ── */}
          <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}} @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}`}</style>
          <section style={{ padding: "28px 0 20px", position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "absolute", top: "-40px", right: "10%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.12),transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", bottom: "-20px", left: "5%", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle,rgba(236,72,153,0.08),transparent 70%)", pointerEvents: "none" }}/>

            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 14px", borderRadius: "100px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", marginBottom: "14px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#a78bfa", display: "inline-block", animation: "pulse 2s infinite" }}/>
                <span style={{ fontSize: "10px", fontWeight: 800, color: "#c4b5fd", letterSpacing: "0.12em" }}>CODERAFT STUDIO · KATALOG DEMO</span>
              </div>

              {/* Title */}
              <h1 style={{ fontSize: "clamp(28px,4vw,52px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, color: "#f0f4ff", margin: "0 0 10px" }}>
                Demo Website{" "}
                <span style={{ background: "linear-gradient(90deg,#a78bfa,#c084fc,#f472b6,#a78bfa)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 4s linear infinite" }}>
                  Profesional.
                </span>
              </h1>

              {/* Subtitle */}
              <p style={{ fontSize: "14px", color: "rgba(240,244,255,0.4)", margin: "0 auto 16px", lineHeight: 1.6, whiteSpace: "nowrap" }}>
                Seluruh demo dapat diakses secara gratis tanpa perlu registrasi.
              </p>

            </div>
          </section>

          {/* ── MOBILE SEARCH + FILTER CHIPS ── */}
          <div className="lg:hidden" style={{ marginBottom: "20px" }}>
            <div style={{ position: "relative", marginBottom: "10px" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(240,244,255,0.3)", fontSize: "14px" }}>⌕</span>
              <input value={search} onChange={e => setS(e.target.value)} placeholder="Cari demo..."
                style={{ width: "100%", padding: "11px 36px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.2)", color: "#f0f4ff", fontSize: "13px", outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}/>
              {search && <button onClick={() => setS("")} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(240,244,255,0.3)", cursor: "pointer", fontSize: "15px" }}>✕</button>}
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {[["Semua", () => { setF("Semua"); setL("Semua"); }, filter === "Semua" && langFilter === "Semua"],
                ["Landing Page", () => setF(f => f === "Landing Page" ? "Semua" : "Landing Page"), filter === "Landing Page"],
                ["Dashboard", () => setF(f => f === "Dashboard" ? "Semua" : "Dashboard"), filter === "Dashboard"],
                ["🇮🇩 Indonesia", () => setL(l => l === "id" ? "Semua" : "id"), langFilter === "id"],
                ["🇺🇸 English", () => setL(l => l === "en" ? "Semua" : "en"), langFilter === "en"],
              ].map(([label, fn, active]) => (
                <button key={label} onClick={fn}
                  style={{ padding: "6px 12px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, cursor: "pointer", border: `1px solid ${active ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.1)"}`, background: active ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)", color: active ? "#a78bfa" : "rgba(240,244,255,0.5)" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* ── CARDS GRID ── */}
          <div style={{ paddingBottom: "60px" }}>
            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" style={{ gap: "14px", marginBottom: "32px" }}>
                {paginated.map((d) => {
                  const cs = catStyle[d.cat];
                  return (
                    <Link key={d.id} href={d.url || `/demo/${d.slug}`} target="_blank" rel="noopener noreferrer"
                      style={{ textDecoration: "none", display: "block" }}
                      className="group">
                      <div
                        className="rounded-2xl overflow-hidden transition-all"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.border = "1px solid rgba(139,92,246,0.3)";
                          e.currentTarget.style.boxShadow = "0 20px 48px rgba(139,92,246,0.15)";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
                          e.currentTarget.style.boxShadow = "none";
                        }}>

                        {/* Visual */}
                        <div className={`bg-gradient-to-br ${d.color} relative flex items-center justify-center`}
                          style={{ height: "148px" }}>
                          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.2)" }} />
                          <span className="group-hover:scale-110 transition-transform duration-300"
                            style={{ fontSize: "50px", position: "relative", zIndex: 1, filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))" }}>
                            {d.emoji}
                          </span>
                          <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 2, fontSize: "15px" }}>
                            {d.lang === "en" ? "🇺🇸" : "🇮🇩"}
                          </div>
                          <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 2 }}>
                            <span style={{ fontSize: "9px", fontWeight: 700, padding: "2px 8px", borderRadius: "100px", background: cs.bg, color: cs.text, border: `1px solid ${cs.border}`, backdropFilter: "blur(8px)" }}>
                              {d.cat}
                            </span>
                          </div>
                          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "36px", background: "linear-gradient(to top,rgba(7,7,17,0.7),transparent)" }} />
                        </div>

                        {/* Body */}
                        <div style={{ padding: "15px 16px 16px" }}>
                          <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", color: "#8b5cf6", marginBottom: "4px", textTransform: "uppercase" }}>
                            {d.subcat}
                          </p>
                          <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#f0f4ff", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
                            {d.title}
                          </h3>
                          <p style={{ fontSize: "12px", color: "rgba(240,244,255,0.38)", lineHeight: 1.55, margin: "0 0 10px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {d.desc}
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "10px" }}>
                            {d.tags.slice(0, 3).map(t => (
                              <span key={t} style={{ fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "100px", background: "rgba(255,255,255,0.04)", color: "rgba(240,244,255,0.32)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                {t}
                              </span>
                            ))}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                            <span style={{ fontSize: "12px", fontWeight: 700, color: "#8b5cf6" }}>Buka Demo</span>
                            <div style={{ width: "28px", height: "28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa", fontSize: "13px", transition: "all .2s" }}
                              className="group-hover:bg-violet-600 group-hover:border-violet-600 group-hover:text-white">
                              ↗
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
                <p style={{ fontSize: "16px", fontWeight: 600, color: "rgba(240,244,255,0.4)", marginBottom: "8px" }}>
                  Tidak ada demo yang cocok
                </p>
                <button onClick={() => { setF("Semua"); setL("Semua"); setS(""); }}
                  style={{ marginTop: "16px", padding: "8px 20px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa", cursor: "pointer" }}>
                  Reset filter
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", flexWrap: "wrap" }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  style={{ padding: "8px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: page === 1 ? "rgba(240,244,255,0.2)" : "rgba(240,244,255,0.6)", cursor: page === 1 ? "not-allowed" : "pointer" }}>
                  ← Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)}
                    style={{ width: "36px", height: "36px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, cursor: "pointer", border: "none", background: n === page ? "linear-gradient(135deg,#8b5cf6,#6d28d9)" : "rgba(255,255,255,0.04)", color: n === page ? "#fff" : "rgba(240,244,255,0.4)", boxShadow: n === page ? "0 0 16px rgba(139,92,246,0.4)" : "none" }}>
                    {n}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  style={{ padding: "8px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: 700, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: page === totalPages ? "rgba(240,244,255,0.2)" : "rgba(240,244,255,0.6)", cursor: page === totalPages ? "not-allowed" : "pointer" }}>
                  Next →
                </button>
              </div>
            )}

            {/* Mobile CTA — hanya tampil di < 2xl */}
            <div className="2xl:hidden" style={{ marginTop: "32px", borderRadius: "16px", overflow: "hidden", position: "relative", background: "linear-gradient(135deg,#1e0a3c 0%,#0d0522 60%,#160830 100%)", border: "1px solid rgba(139,92,246,0.4)", padding: "24px 20px" }}>
              <div style={{ position: "absolute", top: "-30px", right: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.35),transparent 70%)", pointerEvents: "none" }}/>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "3px 10px", borderRadius: "100px", background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.35)", marginBottom: "12px" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#a78bfa", display: "inline-block" }}/>
                  <span style={{ fontSize: "10px", fontWeight: 800, color: "#c4b5fd", letterSpacing: "0.12em", textTransform: "uppercase" }}>Tersedia Sekarang</span>
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#f0f4ff", marginBottom: "8px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                  Tertarik dengan salah satu demo ini?
                </h3>
                <p style={{ fontSize: "13px", color: "rgba(240,244,255,0.45)", lineHeight: 1.65, marginBottom: "20px" }}>
                  Kami bangun versi custom untuk bisnis kamu — siap dalam <strong style={{ color: "rgba(240,244,255,0.7)" }}>3–7 hari kerja</strong>.
                </p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <a href="https://coderaft.web.id" target="_blank" rel="noopener noreferrer"
                    style={{ flex: 1, minWidth: "140px", display: "flex", alignItems: "center", justifyContent: "center", padding: "13px 20px", background: "linear-gradient(135deg,#8b5cf6,#6d28d9)", color: "#fff", borderRadius: "10px", fontSize: "13px", fontWeight: 800, textDecoration: "none", boxShadow: "0 4px 20px rgba(109,40,217,0.45)" }}>
                    Pesan Sekarang →
                  </a>
                  <a href="https://coderaft.web.id/#kontak" target="_blank" rel="noopener noreferrer"
                    style={{ flex: 1, minWidth: "140px", display: "flex", alignItems: "center", justifyContent: "center", padding: "13px 20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(240,244,255,0.6)", borderRadius: "10px", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>
                    💬 Konsultasi Gratis
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: "center", marginTop: "48px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <p style={{ fontSize: "12px", color: "rgba(240,244,255,0.2)" }}>
                Dibuat dengan 💜 oleh{" "}
                <a href="https://coderaft.web.id" target="_blank" rel="noopener noreferrer" style={{ color: "#a78bfa", textDecoration: "none" }}>Coderaft Studio</a>
              </p>
            </div>
          </div>
          </div>{/* end max-w-6xl */}
        </main>

        {/* ══ RIGHT PANEL — sticky saat scroll ke atas ══ */}
        <aside className="hidden 2xl:flex" style={{
          width: "17vw", flexShrink: 0,
          alignSelf: "flex-start",
          position: "sticky", top: "0",
          maxHeight: "100vh", overflowY: "auto",
          padding: "20px 16px",
          borderLeft: "1px solid rgba(139,92,246,0.1)",
          background: "rgba(7,7,17,0.5)",
          scrollbarWidth: "none",
          flexDirection: "column", gap: "16px",
        }}>
          {/* 🧮 Kalkulator Harga */}
          <a href="https://coderaft.web.id/hitung" target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "block", padding: "14px", borderRadius: "12px", background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(16,185,129,0.12)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.35)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(16,185,129,0.07)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.2)"; }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <span style={{ fontSize: "20px" }}>🧮</span>
              <span style={{ fontSize: "13px", fontWeight: 800, color: "#f0f4ff" }}>Kalkulator Harga</span>
            </div>
            <p style={{ fontSize: "11px", color: "rgba(240,244,255,0.45)", lineHeight: 1.5, margin: "0 0 8px" }}>
              Hitung estimasi biaya website kamu dalam 2 menit.
            </p>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#34d399", letterSpacing: "0.04em" }}>Hitung sekarang →</span>
          </a>

          <div style={{ height: "1px", background: "rgba(139,92,246,0.1)" }}/>

          {/* 📖 Baca Blog */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(167,139,250,0.45)", marginBottom: "10px" }}>
              📖 Dari Blog Kami
            </div>
            {[
              { title: "Berapa biaya bikin website?",       slug: "berapa-biaya-buat-website-panduan-harga", tag: "Tips" },
              { title: "Landing page vs company profile",   slug: "landing-page-vs-company-profile",         tag: "Panduan" },
              { title: "Cara memilih jasa web yang tepat",  slug: "cara-memilih-jasa-web-yang-tepat",         tag: "Panduan" },
            ].map(post => (
              <a key={post.slug} href={`https://coderaft.web.id/blog/${post.slug}`} target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: "none", display: "block", padding: "10px 10px", borderRadius: "9px", marginBottom: "4px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", transition: "all .15s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(139,92,246,0.08)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#a78bfa", marginTop: "1px", flexShrink: 0 }}>→</span>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#f0f4ff", lineHeight: 1.4 }}>{post.title}</div>
                    <span style={{ fontSize: "9px", fontWeight: 700, color: "rgba(167,139,250,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{post.tag}</span>
                  </div>
                </div>
              </a>
            ))}
            <a href="https://coderaft.web.id/blog" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", textAlign: "center", padding: "7px", marginTop: "4px", fontSize: "11px", fontWeight: 700, color: "#a78bfa", textDecoration: "none", borderRadius: "8px", background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.15)" }}>
              Lihat semua artikel →
            </a>
          </div>

          <div style={{ height: "1px", background: "rgba(139,92,246,0.1)" }}/>

          {/* 🚀 CTA UTAMA */}
          <div style={{ borderRadius: "16px", overflow: "hidden", position: "relative", background: "linear-gradient(135deg,#1e0a3c 0%,#0d0522 60%,#160830 100%)", border: "1px solid rgba(139,92,246,0.4)", boxShadow: "0 0 40px rgba(109,40,217,0.15), inset 0 0 40px rgba(109,40,217,0.05)" }}>
            {/* glow orbs */}
            <div style={{ position: "absolute", top: "-30px", right: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.35),transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "absolute", bottom: "-20px", left: "-10px", width: "100px", height: "100px", borderRadius: "50%", background: "radial-gradient(circle,rgba(236,72,153,0.2),transparent 70%)", pointerEvents: "none" }}/>
            <div style={{ position: "relative", zIndex: 1, padding: "20px 18px 18px" }}>
              {/* badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "3px 10px", borderRadius: "100px", background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.35)", marginBottom: "12px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#a78bfa", display: "inline-block", animation: "pulse 2s infinite" }}/>
                <span style={{ fontSize: "10px", fontWeight: 800, color: "#c4b5fd", letterSpacing: "0.12em", textTransform: "uppercase" }}>Tersedia Sekarang</span>
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: 900, color: "#f0f4ff", marginBottom: "8px", letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                Tertarik dengan<br/>
                <span style={{ background: "linear-gradient(135deg,#a78bfa,#f0abfc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  salah satu demo ini?
                </span>
              </h3>
              <p style={{ fontSize: "12px", color: "rgba(240,244,255,0.45)", lineHeight: 1.65, marginBottom: "16px" }}>
                Kami bangun versi custom khusus untuk bisnis kamu — siap dalam <strong style={{ color: "rgba(240,244,255,0.7)", fontWeight: 700 }}>3–7 hari kerja</strong>.
              </p>
              {/* stats row */}
              <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
                {[["50+", "Klien"], ["4.9★", "Rating"], ["3-7hr", "Selesai"]].map(([v, l]) => (
                  <div key={l} style={{ flex: 1, textAlign: "center", padding: "8px 4px", borderRadius: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ fontSize: "14px", fontWeight: 900, color: "#f0f4ff", lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: "9px", fontWeight: 600, color: "rgba(240,244,255,0.35)", marginTop: "3px", letterSpacing: "0.06em" }}>{l}</div>
                  </div>
                ))}
              </div>
              <a href="https://coderaft.web.id" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px", background: "linear-gradient(135deg,#8b5cf6,#6d28d9)", color: "#fff", borderRadius: "10px", fontSize: "13px", fontWeight: 800, textDecoration: "none", letterSpacing: "0.04em", boxShadow: "0 4px 20px rgba(109,40,217,0.45)", marginBottom: "8px", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 28px rgba(109,40,217,0.65)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(109,40,217,0.45)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Pesan Sekarang →
              </a>
              <a href="https://coderaft.web.id/#kontak" target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,244,255,0.5)", borderRadius: "9px", fontSize: "12px", fontWeight: 600, textDecoration: "none", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(240,244,255,0.8)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "rgba(240,244,255,0.5)"; }}>
                💬 Konsultasi Gratis
              </a>
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(139,92,246,0.1)" }}/>

          {/* 💡 Cara Pesan */}
          <div>
            <div style={{ fontSize: "10px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(167,139,250,0.45)", marginBottom: "10px" }}>
              💡 Cara Pesan
            </div>
            {[
              { n: "1", t: "Pilih demo yang kamu suka" },
              { n: "2", t: "Klik Konsultasi Gratis" },
              { n: "3", t: "Kami buat dalam 3–7 hari" },
            ].map(s => (
              <div key={s.n} style={{ display: "flex", alignItems: "flex-start", gap: "9px", marginBottom: "10px" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "6px", background: "rgba(139,92,246,0.2)", border: "1px solid rgba(139,92,246,0.3)", display: "grid", placeItems: "center", fontSize: "10px", fontWeight: 800, color: "#a78bfa", flexShrink: 0 }}>{s.n}</div>
                <p style={{ fontSize: "12px", color: "rgba(240,244,255,0.5)", lineHeight: 1.5, margin: 0 }}>{s.t}</p>
              </div>
            ))}
          </div>
        </aside>

        </div>{/* end scroll wrapper */}
      </div>

      {/* ── FIXED: Kembali ke Studio (desktop only) ── */}
      <a href="https://coderaft.web.id" target="_blank" rel="noopener noreferrer" className="hidden lg:flex"
        style={{ position: "fixed", bottom: "20px", left: "16px", zIndex: 200, width: "calc(17vw - 32px)", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "12px 16px", borderRadius: "12px", background: "rgba(7,7,17,0.92)", backdropFilter: "blur(20px)", border: "1px solid rgba(139,92,246,0.25)", color: "#a78bfa", fontSize: "13px", fontWeight: 700, textDecoration: "none", transition: "all .2s", letterSpacing: "0.04em", boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.08)" }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(139,92,246,0.15)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.45)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(139,92,246,0.2), 0 0 0 1px rgba(139,92,246,0.12)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(7,7,17,0.92)"; e.currentTarget.style.borderColor = "rgba(139,92,246,0.25)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(139,92,246,0.08)"; }}>
        <span style={{ fontSize: "15px", opacity: 0.7 }}>←</span>
        <span>Kembali ke Studio</span>
        <span style={{ marginLeft: "auto", fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px", background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.2)", color: "rgba(167,139,250,0.7)", letterSpacing: "0.08em" }}>coderaft.web.id</span>
      </a>
    </div>
  );
}
