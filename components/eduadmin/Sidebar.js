"use client";
import { useState } from "react";

const menus = [
  { id: "dashboard", icon: "▦", label: "Dashboard", color: "#6366f1", bg: "rgba(99,102,241,0.12)", border: "rgba(99,102,241,0.3)" },
  { id: "siswa", icon: "👤", label: "Siswa", color: "#ec4899", bg: "rgba(236,72,153,0.12)", border: "rgba(236,72,153,0.3)" },
  { id: "kelas", icon: "🏫", label: "Kelas", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)" },
  { id: "nilai", icon: "📝", label: "Nilai", color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)" },
  { id: "absensi", icon: "📅", label: "Absensi", color: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)" },
];

export default function Sidebar({ active, setActive }) {
  const [col, setCol] = useState(false);
  return (
    <aside className={`relative flex flex-col transition-all duration-300 flex-shrink-0 ${col ? "w-16" : "w-64"}`}
      style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(20px)", borderRight: "1px solid rgba(148,163,184,0.2)", minHeight: "100vh", zIndex: 10 }}>

      {/* Toggle button — floating on right edge, always visible */}
      <button onClick={() => setCol(!col)}
        className="absolute -right-3 top-5 z-20 w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:shadow-md"
        style={{ background: "#ffffff", border: "1px solid #e2e8f0", color: "#64748b" }}>
        {col ? "▶" : "◀"}
      </button>

      {/* Logo */}
      <div className="h-16 flex items-center px-4 gap-3" style={{ borderBottom: "1px solid rgba(148,163,184,0.15)" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)", boxShadow: "0 4px 15px rgba(139,92,246,0.3)" }}>🎓</div>
        {!col && <div className="flex-1 min-w-0"><div className="font-black text-sm text-slate-800">CoderaftEdu</div><div className="text-xs text-slate-400">SMA Nusantara</div></div>}
      </div>

      <nav className="flex-1 py-5 space-y-2 px-2">
        {menus.map(m => (
          <button key={m.id} onClick={() => setActive(m.id)}
            className={`w-full flex items-center rounded-xl transition-all text-left ${col ? "justify-center py-2 px-1" : "gap-3 px-3 py-2.5"}`}
            style={!col && active === m.id
              ? { background: m.bg, border: `1px solid ${m.border}`, color: m.color }
              : { border: "1px solid transparent", color: "#6b7280" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all"
              style={active === m.id
                ? { background: m.bg, border: `1px solid ${m.border}` }
                : {}}>
              {m.icon}
            </div>
            {!col && (
              <span className="text-sm font-semibold" style={active === m.id ? { color: m.color } : {}}>
                {m.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className={`p-4 flex items-center gap-3 ${col ? "justify-center" : ""}`} style={{ borderTop: "1px solid rgba(148,163,184,0.15)" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #8b5cf6, #3b82f6)" }}>AD</div>
        {!col && <div><div className="text-sm font-bold text-slate-700">Admin</div><div className="text-xs text-slate-400">admin@sekolah.id</div></div>}
      </div>
    </aside>
  );
}
