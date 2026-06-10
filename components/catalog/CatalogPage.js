"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { demos } from "@/data/demos";

const PER_PAGE = 9;

const catStyle = {
  "Landing Page": { bg: "rgba(139,92,246,0.12)", text: "#a78bfa", border: "rgba(139,92,246,0.25)" },
  "Dashboard":    { bg: "rgba(56,189,248,0.12)",  text: "#67e8f9", border: "rgba(56,189,248,0.25)" },
};

export default function CatalogPage() {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("Semua");
  const [langFilter, setLang] = useState("Semua");
  const [page, setPage]       = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return demos.filter((d) => {
      const matchCat    = filter === "Semua" || d.cat === filter;
      const matchLang   = langFilter === "Semua" || d.lang === langFilter;
      const matchSearch = !q || d.title.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q) || d.subcat.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchLang && matchSearch;
    });
  }, [search, filter, langFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const reset = () => setPage(1);
  const handleFilter = (f) => { setFilter(f); reset(); };
  const handleLang   = (l) => { setLang(l);   reset(); };
  const handleSearch = (v) => { setSearch(v); reset(); };

  const counts = {
    Semua: demos.length,
    "Landing Page": demos.filter(d => d.cat === "Landing Page").length,
    Dashboard: demos.filter(d => d.cat === "Dashboard").length,
  };
  const langCounts = {
    Semua: demos.length,
    id: demos.filter(d => d.lang === "id").length,
    en: demos.filter(d => d.lang === "en").length,
  };

  return (
    <div style={{ background: "#070711", minHeight: "100vh", color: "#f0f4ff" }}>

      {/* ── Navbar ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(7,7,17,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(139,92,246,0.12)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6" style={{ height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "26px", height: "26px", borderRadius: "7px", background: "linear-gradient(135deg,#8b5cf6,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "12px", color: "#fff", flexShrink: 0 }}>C</div>
            <span style={{ fontWeight: 800, fontSize: "15px" }}>Coderaft<span style={{ color: "#a78bfa" }}>Demos</span></span>
            <span className="hidden sm:inline" style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "100px", fontWeight: 700, background: "rgba(139,92,246,0.12)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.2)" }}>
              {demos.length} demos
            </span>
          </div>
          <a href="https://coderaft.web.id" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "12px", fontWeight: 600, color: "rgba(240,244,255,0.4)", textDecoration: "none" }}>
            <span className="hidden sm:inline">← Portfolio Utama</span>
            <span className="sm:hidden">← Portfolio</span>
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden text-center" style={{ padding: "48px 16px 40px" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: "absolute", top: 0, left: "30%", width: "600px", height: "300px", background: "radial-gradient(ellipse,rgba(139,92,246,0.12),transparent 70%)" }} />
          <div style={{ position: "absolute", top: "20%", right: "20%", width: "400px", height: "300px", background: "radial-gradient(ellipse,rgba(236,72,153,0.08),transparent 70%)" }} />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full text-xs font-bold"
            style={{ background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa", letterSpacing: "0.08em" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 inline-block" />
            KATALOG PORTOFOLIO · CODERAFT STUDIO
          </div>

          <h1 className="font-black mb-4" style={{ fontSize: "clamp(2rem,7vw,4rem)", letterSpacing: "-0.04em", lineHeight: "1.05", color: "#f0f4ff" }}>
            Demo Website<br />
            <span style={{ color: "#a78bfa" }}>Profesional.</span>
          </h1>
          <p className="mx-auto mb-8 text-sm sm:text-base" style={{ maxWidth: "480px", color: "rgba(240,244,255,0.45)", lineHeight: "1.6" }}>
            Demo live yang siap diperlihatkan ke klien — landing page, dashboard, berbagai style dan bahasa.
          </p>

          {/* Stats — filter cards, 5 kolom */}
          <div className="inline-grid grid-cols-3 sm:grid-cols-5 overflow-hidden rounded-2xl" style={{ border: "1px solid rgba(139,92,246,0.15)" }}>
            {[
              { label: "Semua Demo",    sub: "All Projects",   val: demos.length,           color: "#ffffff", rgb: "255,255,255",   isOn: filter === "Semua" && langFilter === "Semua", action: () => { handleFilter("Semua"); handleLang("Semua"); handleSearch(""); } },
              { label: "Landing Page",  sub: "Web Promo",      val: counts["Landing Page"],  color: "#a78bfa", rgb: "139,92,246",   isOn: filter === "Landing Page",                    action: () => { filter === "Landing Page" ? handleFilter("Semua") : handleFilter("Landing Page"); handleLang("Semua"); } },
              { label: "Dashboard",     sub: "Web App",        val: counts["Dashboard"],     color: "#67e8f9", rgb: "56,189,248",   isOn: filter === "Dashboard",                       action: () => { filter === "Dashboard" ? handleFilter("Semua") : handleFilter("Dashboard"); handleLang("Semua"); } },
              { label: "English",       sub: "Bahasa Inggris", val: langCounts["en"],        color: "#f9a8d4", rgb: "236,72,153",   isOn: langFilter === "en",                          action: () => { langFilter === "en" ? handleLang("Semua") : handleLang("en"); handleFilter("Semua"); } },
              { label: "Indonesia",     sub: "Bahasa ID",      val: langCounts["id"],        color: "#86efac", rgb: "134,239,172",  isOn: langFilter === "id",                          action: () => { langFilter === "id" ? handleLang("Semua") : handleLang("id"); handleFilter("Semua"); } },
            ].map((s, i) => (
              <button key={s.label} onClick={s.action}
                className="text-center py-4 px-3 sm:px-5 transition-all"
                style={{
                  background: s.isOn ? `rgba(${s.rgb},0.16)` : "rgba(255,255,255,0.03)",
                  borderRight: i < 4 ? "1px solid rgba(139,92,246,0.1)" : "none",
                  cursor: "pointer", border: "none",
                  boxShadow: s.isOn ? `inset 0 -2px 0 ${s.color}` : "none",
                }}>
                <div className="text-2xl font-black leading-none mb-1" style={{ color: s.isOn ? s.color : "rgba(240,244,255,0.7)" }}>{s.val}</div>
                <div className="text-xs font-bold leading-tight" style={{ color: s.isOn ? s.color : "rgba(240,244,255,0.4)", letterSpacing: "0.03em" }}>{s.label}</div>
                <div className="text-xs mt-0.5 hidden sm:block" style={{ color: "rgba(240,244,255,0.2)", fontSize: "10px" }}>{s.sub}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Search ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm" style={{ color: "rgba(240,244,255,0.3)" }}>⌕</span>
          <input value={search} onChange={e => handleSearch(e.target.value)}
            placeholder="Cari demo..."
            className="w-full rounded-xl pl-10 pr-10 py-3 text-sm outline-none"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(139,92,246,0.2)", color: "#f0f4ff", boxSizing: "border-box" }} />
          {search && (
            <button onClick={() => handleSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2"
              style={{ color: "rgba(240,244,255,0.3)", background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}>✕</button>
          )}
        </div>
      </div>

      {/* ── Cards Grid — RESPONSIVE ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
            {paginated.map((d) => {
              const cs = catStyle[d.cat];
              return (
                <Link key={d.id} href={`/demo/${d.slug}`} target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                  className="group">
                  <div
                    className="rounded-2xl overflow-hidden transition-all"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.border = "1px solid rgba(139,92,246,0.3)";
                      e.currentTarget.style.boxShadow = "0 20px 60px rgba(139,92,246,0.15)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
                      e.currentTarget.style.boxShadow = "none";
                    }}>

                    {/* Card header */}
                    <div className={`bg-gradient-to-br ${d.color} relative flex items-center justify-center`}
                      style={{ height: "150px" }}>
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.22)" }} />
                      <span className="group-hover:scale-110 transition-transform duration-300"
                        style={{ fontSize: "52px", position: "relative", zIndex: 1, filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))" }}>
                        {d.emoji}
                      </span>
                      {/* Language badge */}
                      <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 2, fontSize: "16px" }}>
                        {d.lang === "en" ? "🇺🇸" : "🇮🇩"}
                      </div>
                      {/* Cat badge */}
                      <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 2 }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, padding: "3px 9px", borderRadius: "100px", background: cs.bg, color: cs.text, border: `1px solid ${cs.border}`, backdropFilter: "blur(8px)" }}>
                          {d.cat}
                        </span>
                      </div>
                      {/* Bottom fade */}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "36px", background: "linear-gradient(to top,rgba(7,7,17,0.7),transparent)" }} />
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "16px 18px 18px" }}>
                      <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", color: "#8b5cf6", marginBottom: "4px", textTransform: "uppercase" }}>
                        {d.subcat}
                      </p>
                      <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#f0f4ff", margin: "0 0 7px", letterSpacing: "-0.02em" }}>
                        {d.title}
                      </h3>
                      <p style={{ fontSize: "12px", color: "rgba(240,244,255,0.4)", lineHeight: "1.6", margin: "0 0 12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {d.desc}
                      </p>
                      {/* Tags — hidden on small to save space */}
                      <div className="hidden sm:flex flex-wrap gap-1 mb-3">
                        {d.tags.slice(0, 3).map(t => (
                          <span key={t} style={{ fontSize: "10px", fontWeight: 600, padding: "2px 8px", borderRadius: "100px", background: "rgba(255,255,255,0.04)", color: "rgba(240,244,255,0.35)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                      {/* CTA */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "#8b5cf6" }}>Buka Demo</span>
                        <div style={{ width: "28px", height: "28px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa", fontSize: "13px" }}
                          className="group-hover:bg-violet-600 group-hover:border-violet-600 group-hover:text-white transition-all">
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
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-lg font-semibold mb-2" style={{ color: "rgba(240,244,255,0.5)" }}>Tidak ada demo yang cocok</p>
            <button onClick={() => { handleSearch(""); handleFilter("Semua"); handleLang("Semua"); }}
              className="mt-4 px-5 py-2 rounded-full text-xs font-bold"
              style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa", cursor: "pointer" }}>
              Reset filter
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: page === 1 ? "rgba(240,244,255,0.2)" : "rgba(240,244,255,0.6)", cursor: page === 1 ? "not-allowed" : "pointer" }}>
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                className="w-9 h-9 rounded-xl text-sm font-bold transition-all"
                style={{
                  border: "none", cursor: "pointer",
                  background: n === page ? "linear-gradient(135deg,#8b5cf6,#6d28d9)" : "rgba(255,255,255,0.04)",
                  color: n === page ? "#fff" : "rgba(240,244,255,0.4)",
                  boxShadow: n === page ? "0 0 16px rgba(139,92,246,0.4)" : "none",
                }}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-4 py-2 rounded-xl text-sm font-bold transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: page === totalPages ? "rgba(240,244,255,0.2)" : "rgba(240,244,255,0.6)", cursor: page === totalPages ? "not-allowed" : "pointer" }}>
              Next →
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-14 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p style={{ fontSize: "12px", color: "rgba(240,244,255,0.2)" }}>
            Dibuat dengan 💜 oleh{" "}
            <a href="https://coderaft.web.id" target="_blank" rel="noopener noreferrer" style={{ color: "#a78bfa", textDecoration: "none" }}>Coderaft Studio</a>
          </p>
        </div>
      </div>
    </div>
  );
}
