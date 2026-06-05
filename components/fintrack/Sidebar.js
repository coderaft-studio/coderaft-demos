"use client";
import { useState } from "react";

const menus = [
  { id: "dashboard", icon: "▦", label: "Dashboard" },
  { id: "pemasukan", icon: "📈", label: "Pemasukan" },
  { id: "pengeluaran", icon: "📉", label: "Pengeluaran" },
  { id: "budget", icon: "🎯", label: "Budget" },
];

export default function Sidebar({ active, setActive }) {
  const [col, setCol] = useState(false);
  return (
    <aside className={`relative flex flex-col transition-all duration-300 flex-shrink-0 ${col ? "w-16" : "w-64"}`}
      style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", borderRight: "1px solid rgba(52,211,153,0.15)", minHeight: "100vh", zIndex: 10 }}>

      {/* Toggle button — floating on right edge, always visible */}
      <button onClick={() => setCol(!col)}
        className="absolute -right-3 top-5 z-20 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all shadow-md"
        style={{ background: "#0d2818", border: "1px solid rgba(52,211,153,0.3)", color: "#10b981" }}>
        {col ? "▶" : "◀"}
      </button>

      {/* Logo */}
      <div className="h-16 flex items-center px-4 gap-3" style={{ borderBottom: "1px solid rgba(52,211,153,0.1)" }}>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #10b981, #059669)", boxShadow: "0 0 16px rgba(16,185,129,0.4)" }}>
          F
        </div>
        {!col && <span className="font-bold text-lg" style={{ color: "#10b981" }}>FinTrack Studio</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 space-y-1 px-2">
        {menus.map(m => (
          <button key={m.id} onClick={() => setActive(m.id)}
            className={`w-full flex items-center rounded-xl transition-all text-left relative ${col ? "justify-center py-2 px-1" : "gap-3 px-3 py-2.5"}`}
            style={!col && active === m.id ? {
              background: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.3)",
              color: "#10b981",
              boxShadow: "0 0 20px rgba(16,185,129,0.1) inset",
            } : { border: "1px solid transparent", color: "rgba(148,163,184,0.7)" }}>
            {!col && active === m.id && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 rounded-r-full" style={{ background: "#10b981", boxShadow: "0 0 8px #10b981" }} />
            )}
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 transition-all"
              style={active === m.id ? {
                background: "rgba(16,185,129,0.15)",
                border: "1px solid rgba(16,185,129,0.3)",
              } : {}}>
              {m.icon}
            </div>
            {!col && <span className="text-sm font-medium" style={active === m.id ? { color: "#10b981" } : {}}>{m.label}</span>}
          </button>
        ))}
      </nav>

      {/* User */}
      <div className={`p-4 flex items-center gap-3 ${col ? "justify-center" : ""}`}
        style={{ borderTop: "1px solid rgba(52,211,153,0.1)" }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>U</div>
        {!col && (
          <div>
            <div className="text-sm font-medium" style={{ color: "#e2e8f0" }}>User</div>
            <div className="text-xs" style={{ color: "rgba(52,211,153,0.6)" }}>user@fintrack.id</div>
          </div>
        )}
      </div>
    </aside>
  );
}
