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
  const langCounts = { Semua: demos.length, id: demos.filter(d => d.lang === "id").length, en: demos.filter(d => d.lang === "en").length };

  return (
    <div style={{ background: "#070711", minHeight: "100vh", color: "#f0f4ff" }}>

      {/* ── Sticky Navbar ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(7,7,17,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(139,92,246,0.12)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "56px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg,#8b5cf6,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "13px", color: "#fff" }}>C</div>
            <span style={{ fontWeight: 800, fontSize: "16px" }}>Coderaft<span style={{ color: "#a78bfa" }}>Demos</span></span>
            <span style={{ fontSize: "11px", padding: "2px 10px", borderRadius: "100px", fontWeight: 700, background: "rgba(139,92,246,0.12)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.2)" }}>
              {demos.length} demos
            </span>
          </div>
          <a href="https://coderaft-studio.vercel.app" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: "12px", fontWeight: 600, color: "rgba(240,244,255,0.4)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
            ← Portfolio Utama
          </a>
        </div>
      </header>

      {/* ── Hero section ── */}
      <section style={{ position: "relative", padding: "80px 24px 60px", textAlign: "center", overflow: "hidden" }}>
        {/* BG glows */}
        <div style={{ position: "absolute", top: "0", left: "30%", width: "600px", height: "300px", background: "radial-gradient(ellipse,rgba(139,92,246,0.12),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "20%", right: "20%", width: "400px", height: "300px", background: "radial-gradient(ellipse,rgba(236,72,153,0.08),transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", borderRadius: "100px", marginBottom: "24px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#8b5cf6", display: "inline-block" }} />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#a78bfa", letterSpacing: "0.1em" }}>KATALOG PORTOFOLIO · CODERAFT STUDIO</span>
          </div>

          <h1 style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 900, letterSpacing: "-0.04em", margin: "0 0 16px", lineHeight: "1.0" }}>
            <span style={{ color: "#f0f4ff" }}>Demo Website</span><br />
            <span style={{ background: "linear-gradient(135deg,#8b5cf6,#ec4899,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Profesional.</span>
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(240,244,255,0.45)", maxWidth: "520px", margin: "0 auto 40px", lineHeight: "1.6" }}>
            {demos.length} demo live yang siap diperlihatkan ke klien. Landing page, dashboard, berbagai style dan bahasa.
          </p>

          {/* Quick stats */}
          <div style={{ display: "inline-flex", gap: "0", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(139,92,246,0.15)" }}>
            {[
              { label: "Landing Pages", val: counts["Landing Page"], color: "#a78bfa" },
              { label: "Dashboards", val: counts["Dashboard"], color: "#67e8f9" },
              { label: "English", val: langCounts["en"], color: "#f9a8d4" },
              { label: "Indonesia", val: langCounts["id"], color: "#86efac" },
            ].map((s, i) => (
              <div key={s.label} style={{ padding: "16px 24px", background: i % 2 === 0 ? "rgba(139,92,246,0.06)" : "rgba(56,189,248,0.04)", borderRight: i < 3 ? "1px solid rgba(139,92,246,0.1)" : "none", textAlign: "center" }}>
                <div style={{ fontSize: "24px", fontWeight: 900, color: s.color, lineHeight: "1" }}>{s.val}</div>
                <div style={{ fontSize: "11px", color: "rgba(240,244,255,0.35)", fontWeight: 600, marginTop: "4px", letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filters + Search ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 32px" }}>
        {/* Search */}
        <div style={{ position: "relative", marginBottom: "16px" }}>
          <span style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(240,244,255,0.3)", fontSize: "15px" }}>⌕</span>
          <input value={search} onChange={e => handleSearch(e.target.value)}
            placeholder="Cari demo berdasarkan nama, kategori, atau tag..."
            style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "14px", padding: "14px 16px 14px 44px", fontSize: "14px", color: "#f0f4ff", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }} />
          {search && (
            <button onClick={() => handleSearch("")}
              style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", color: "rgba(240,244,255,0.3)", background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}>✕</button>
          )}
        </div>

        {/* Filter pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
          {/* Tipe */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {[
              { f: "Semua",       icon: "⬡", label: `Semua (${counts.Semua})` },
              { f: "Landing Page", icon: "◻", label: `Landing Page (${counts["Landing Page"]})` },
              { f: "Dashboard",   icon: "◈", label: `Dashboard (${counts.Dashboard})` },
            ].map(({ f, icon, label }) => (
              <button key={f} onClick={() => handleFilter(f)}
                style={{
                  padding: "8px 16px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, cursor: "pointer", border: "none",
                  transition: "all 0.2s",
                  background: filter === f ? "linear-gradient(135deg,#8b5cf6,#6d28d9)" : "rgba(255,255,255,0.05)",
                  color: filter === f ? "#fff" : "rgba(240,244,255,0.5)",
                  boxShadow: filter === f ? "0 0 20px rgba(139,92,246,0.3)" : "none",
                }}>
                {icon} {label}
              </button>
            ))}
          </div>

          <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.08)" }} />

          {/* Bahasa */}
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            {[
              { key: "Semua", icon: "🌐", label: `Semua` },
              { key: "id",    icon: "🇮🇩", label: `Indonesia (${langCounts.id})` },
              { key: "en",    icon: "🇺🇸", label: `English (${langCounts.en})` },
            ].map(l => (
              <button key={l.key} onClick={() => handleLang(l.key)}
                style={{
                  display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "100px",
                  fontSize: "12px", fontWeight: 700, cursor: "pointer", border: "none", transition: "all 0.2s",
                  background: langFilter === l.key ? "linear-gradient(135deg,#ec4899,#be185d)" : "rgba(255,255,255,0.05)",
                  color: langFilter === l.key ? "#fff" : "rgba(240,244,255,0.5)",
                  boxShadow: langFilter === l.key ? "0 0 20px rgba(236,72,153,0.3)" : "none",
                }}>
                <span>{l.icon}</span>{l.label}
              </button>
            ))}
          </div>

          {/* Active filters indicator */}
          {(filter !== "Semua" || langFilter !== "Semua" || search) && (
            <button onClick={() => { handleSearch(""); handleFilter("Semua"); handleLang("Semua"); }}
              style={{ marginLeft: "auto", padding: "8px 14px", borderRadius: "100px", fontSize: "11px", fontWeight: 700, cursor: "pointer", border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#f87171" }}>
              Reset filter ✕
            </button>
          )}
        </div>

        {/* Result count */}
        {filtered.length !== demos.length && (
          <p style={{ fontSize: "13px", color: "rgba(240,244,255,0.35)", marginTop: "16px" }}>
            Menampilkan <span style={{ color: "#a78bfa", fontWeight: 700 }}>{filtered.length}</span> dari {demos.length} demo
          </p>
        )}
      </div>

      {/* ── Cards Grid ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 80px" }}>
        {paginated.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", marginBottom: "48px" }}>
            {paginated.map((d) => {
              const cs = catStyle[d.cat] || catStyle["Landing Page"];
              return (
                <Link key={d.id} href={`/demo/${d.slug}`} target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                  className="group">
                  <div style={{
                    borderRadius: "20px", overflow: "hidden",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    transition: "all 0.25s",
                  }}
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

                    {/* Card visual header */}
                    <div className={`bg-gradient-to-br ${d.color}`} style={{ height: "160px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)" }} />

                      {/* Emoji big */}
                      <span style={{ fontSize: "56px", position: "relative", zIndex: 1, filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))", transition: "transform 0.3s" }}
                        className="group-hover:scale-110">
                        {d.emoji}
                      </span>

                      {/* Top badges */}
                      <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "6px", zIndex: 2 }}>
                        <span style={{ fontSize: "16px" }} title={d.lang === "en" ? "English" : "Bahasa Indonesia"}>
                          {d.lang === "en" ? "🇺🇸" : "🇮🇩"}
                        </span>
                      </div>
                      <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "100px", background: cs.bg, color: cs.text, border: `1px solid ${cs.border}`, backdropFilter: "blur(8px)" }}>
                          {d.cat}
                        </span>
                      </div>

                      {/* Bottom glow line */}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40px", background: "linear-gradient(to top,rgba(7,7,17,0.8),transparent)" }} />
                    </div>

                    {/* Card body */}
                    <div style={{ padding: "20px" }}>
                      <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: "#8b5cf6", marginBottom: "6px", textTransform: "uppercase" }}>
                        {d.subcat}
                      </p>
                      <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#f0f4ff", margin: "0 0 8px", letterSpacing: "-0.02em", lineHeight: "1.2" }}>
                        {d.title}
                      </h3>
                      <p style={{ fontSize: "13px", color: "rgba(240,244,255,0.4)", lineHeight: "1.6", margin: "0 0 16px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {d.desc}
                      </p>

                      {/* Tags */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                        {d.tags.map(t => (
                          <span key={t} style={{ fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "100px", background: "rgba(255,255,255,0.04)", color: "rgba(240,244,255,0.4)", border: "1px solid rgba(255,255,255,0.06)" }}>
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#8b5cf6" }}>Buka Demo</span>
                        <div style={{ width: "32px", height: "32px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)", color: "#a78bfa", fontSize: "14px", transition: "all 0.2s" }}
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
          <div style={{ textAlign: "center", padding: "96px 24px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
            <p style={{ fontSize: "18px", fontWeight: 700, color: "rgba(240,244,255,0.5)", marginBottom: "8px" }}>Tidak ada demo yang cocok</p>
            <p style={{ fontSize: "14px", color: "rgba(240,244,255,0.25)", marginBottom: "20px" }}>Coba kata kunci lain atau reset filter</p>
            <button onClick={() => { handleSearch(""); handleFilter("Semua"); handleLang("Semua"); }}
              style={{ padding: "10px 24px", borderRadius: "100px", background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)", color: "#a78bfa", fontWeight: 700, fontSize: "13px", cursor: "pointer" }}>
              Reset semua filter
            </button>
          </div>
        )}

        {/* ── Pagination ── */}
        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              style={{ padding: "10px 20px", borderRadius: "12px", fontSize: "13px", fontWeight: 700, cursor: page === 1 ? "not-allowed" : "pointer", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: page === 1 ? "rgba(240,244,255,0.2)" : "rgba(240,244,255,0.6)", transition: "all 0.2s" }}>
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setPage(n)}
                style={{
                  width: "40px", height: "40px", borderRadius: "12px", fontSize: "14px", fontWeight: 700, cursor: "pointer", border: "none", transition: "all 0.2s",
                  background: n === page ? "linear-gradient(135deg,#8b5cf6,#6d28d9)" : "rgba(255,255,255,0.04)",
                  color: n === page ? "#fff" : "rgba(240,244,255,0.4)",
                  boxShadow: n === page ? "0 0 20px rgba(139,92,246,0.4)" : "none",
                }}>
                {n}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              style={{ padding: "10px 20px", borderRadius: "12px", fontSize: "13px", fontWeight: 700, cursor: page === totalPages ? "not-allowed" : "pointer", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: page === totalPages ? "rgba(240,244,255,0.2)" : "rgba(240,244,255,0.6)", transition: "all 0.2s" }}>
              Next →
            </button>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: "64px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <p style={{ fontSize: "12px", color: "rgba(240,244,255,0.2)" }}>
            Dibuat dengan 💜 oleh{" "}
            <a href="https://coderaft-studio.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: "#a78bfa", textDecoration: "none" }}>Coderaft Studio</a>
          </p>
        </div>
      </div>
    </div>
  );
}
