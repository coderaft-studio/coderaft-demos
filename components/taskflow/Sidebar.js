"use client";
import { useState, useRef, useEffect } from "react";

const menus = [
  { id: "dashboard", icon: "▦", label: "Dashboard" },
  { id: "projects", icon: "📁", label: "Projects" },
  { id: "tasks", icon: "✅", label: "Tasks" },
  { id: "team", icon: "👥", label: "Team" },
];

const newOptions = [
  { icon: "📁", label: "New Project", type: "project", hint: "Buat project baru" },
  { icon: "✅", label: "New Task", type: "task", hint: "Tambah task baru" },
  { icon: "👥", label: "New Member", type: "member", hint: "Undang anggota tim" },
];

export default function Sidebar({ active, setActive, onNew }) {
  const [col, setCol] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setShowNew(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const handleNew = (type) => {
    onNew && onNew(type);
    setShowNew(false);
  };

  return (
    <aside className={`relative flex flex-col transition-all duration-300 flex-shrink-0 bg-white ${col ? "w-14" : "w-56"}`}
      style={{ borderRight: "1px solid #e2e8f0", minHeight: "100vh", zIndex: 10 }}>

      {/* Toggle button */}
      <button onClick={() => setCol(!col)}
        className="absolute -right-3 top-4 z-20 w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm transition-all hover:shadow-md bg-white text-slate-500"
        style={{ border: "1px solid #e2e8f0" }}>
        {col ? "▶" : "◀"}
      </button>

      {/* Logo */}
      <div className="h-14 flex items-center px-4 gap-2.5" style={{ borderBottom: "1px solid #f1f5f9" }}>
        <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xs flex-shrink-0">T</div>
        {!col && <span className="font-bold text-slate-800">Coderaft TaskFlow</span>}
      </div>

      {/* + New button with dropdown */}
      <div className="px-3 pt-4 pb-2 relative" ref={dropRef}>
        <button
          onClick={() => setShowNew(!showNew)}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors">
          {col ? "+" : "+ New"}
        </button>

        {/* Dropdown */}
        {showNew && (
          <div className={`absolute top-full mt-1 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-30 ${col ? "left-full ml-2 w-48" : "left-3 right-3"}`}>
            <p className="text-xs text-slate-400 font-semibold px-3 py-1.5 uppercase tracking-widest">Buat Baru</p>
            {newOptions.map((o) => (
              <button key={o.label} onClick={() => handleNew(o.type)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-indigo-50 transition-colors text-left group">
                <span className="text-base flex-shrink-0">{o.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">{o.label}</div>
                  <div className="text-xs text-slate-400">{o.hint}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {!col && (
        <div className="px-4 pb-2">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Workspace</span>
        </div>
      )}

      {/* Nav */}
      <nav className={`flex-1 py-2 px-2 space-y-0.5 ${col ? "pt-4" : ""}`}>
        {menus.map(m => (
          <button key={m.id} onClick={() => setActive(m.id)}
            className={`w-full flex items-center gap-2.5 py-2 rounded-lg text-left transition-all relative ${col ? "px-2 justify-center" : "px-3"}`}
            style={active === m.id ? { background: "#eef2ff", color: "#4338ca", cursor: "pointer" } : { color: "#64748b", cursor: "pointer" }}>
            {active === m.id && !col && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-600 rounded-r-full" />
            )}
            <span style={{ width:"20px", textAlign:"center", flexShrink:0, fontSize: col ? "15px" : "14px" }}>{m.icon}</span>
            {!col && <span className="text-sm font-medium">{m.label}</span>}
          </button>
        ))}
      </nav>

      {!col && (
        <div className="px-2 pb-3 space-y-0.5">
          <div className="px-3 py-1.5">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-widest">Settings</span>
          </div>
          {[{ icon: "⚙️", label: "Preferences" }, { icon: "🔔", label: "Notifications" }].map(item => (
            <button key={item.label} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all" style={{ cursor:"pointer" }}>
              <span style={{ width:"20px", textAlign:"center", flexShrink:0, fontSize:"14px" }}>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* User */}
      <div className={`flex items-center gap-2.5 p-3 ${col ? "justify-center" : ""}`} style={{ borderTop: "1px solid #f1f5f9" }}>
        <div className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 text-xs font-bold flex-shrink-0">PM</div>
        {!col && (
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-slate-700 truncate">Project Manager</div>
            <div className="text-xs text-slate-400 truncate">pm@taskflow.id</div>
          </div>
        )}
      </div>
    </aside>
  );
}
