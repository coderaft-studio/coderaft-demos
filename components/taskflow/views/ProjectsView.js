"use client";
import { useState } from "react";

const projectColors = [
  { from: "#6366f1", to: "#8b5cf6" },
  { from: "#3b82f6", to: "#06b6d4" },
  { from: "#10b981", to: "#059669" },
  { from: "#f59e0b", to: "#f97316" },
  { from: "#ec4899", to: "#f43f5e" },
  { from: "#8b5cf6", to: "#6366f1" },
];

const teamMembers = [
  { init: "RI", color: "#6366f1" }, { init: "BU", color: "#3b82f6" },
  { init: "SI", color: "#8b5cf6" }, { init: "AH", color: "#06b6d4" },
  { init: "DW", color: "#10b981" }, { init: "FA", color: "#f59e0b" },
];

export const initProjects = [
  { id: 1, nama: "Website Redesign", desc: "Redesain ulang website perusahaan dengan UI modern dan responsif", status: "Active", deadline: "2026-06-30", progress: 75, team: 4, priority: "High", tasks: { done: 18, total: 24 } },
  { id: 2, nama: "Mobile App v2", desc: "Pengembangan aplikasi mobile versi 2 dengan fitur-fitur baru", status: "Active", deadline: "2026-07-15", progress: 40, team: 6, priority: "High", tasks: { done: 12, total: 30 } },
  { id: 3, nama: "Dashboard Admin", desc: "Dashboard administrasi untuk manajemen konten dan data", status: "Active", deadline: "2026-06-08", progress: 90, team: 3, priority: "Medium", tasks: { done: 27, total: 30 } },
  { id: 4, nama: "API Integration", desc: "Integrasi dengan third-party API payment gateway", status: "On Hold", deadline: "2026-07-01", progress: 20, team: 2, priority: "Low", tasks: { done: 4, total: 20 } },
];

const priorityConfig = {
  High:   { bg: "rgba(239,68,68,0.1)",   text: "#dc2626", border: "rgba(239,68,68,0.3)",   dot: "#ef4444" },
  Medium: { bg: "rgba(245,158,11,0.1)",  text: "#b45309", border: "rgba(245,158,11,0.3)",  dot: "#f59e0b" },
  Low:    { bg: "rgba(148,163,184,0.1)", text: "#64748b", border: "rgba(148,163,184,0.3)", dot: "#94a3b8" },
};

const statusConfig = {
  Active:    { bg: "rgba(16,185,129,0.1)",  text: "#059669", icon: "🟢" },
  "On Hold": { bg: "rgba(245,158,11,0.1)",  text: "#b45309", icon: "⏸" },
  Done:      { bg: "rgba(59,130,246,0.1)",  text: "#2563eb", icon: "✅" },
};

const emptyForm = { nama: "", desc: "", status: "Active", deadline: "", progress: "0", team: "1", priority: "Medium" };
const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white";

const daysLeft = (deadline) => {
  const diff = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
  return diff;
};

export default function ProjectsView({ projects, setProjects, onViewTasks }) {
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState(emptyForm);
  const [detail, setDetail] = useState(null);
  const [filter, setFilter] = useState("Semua");
  const [view, setView]   = useState("grid");

  const filtered = filter === "Semua" ? projects : projects.filter(p => p.status === filter);

  const save = (e) => {
    e.preventDefault();
    const idx = modal === "add" ? projects.length : projects.findIndex(p => p.id === modal.edit);
    const clr = projectColors[idx % projectColors.length];
    if (modal === "add") {
      setProjects([...projects, { ...form, id: Date.now(), progress: Number(form.progress), team: Number(form.team), tasks: { done: 0, total: 0 }, color: clr }]);
    } else {
      setProjects(projects.map(p => p.id === modal.edit ? { ...p, ...form, progress: Number(form.progress), team: Number(form.team) } : p));
    }
    setModal(null);
  };

  const openEdit = (p) => {
    setForm({ nama: p.nama, desc: p.desc, status: p.status, deadline: p.deadline, progress: String(p.progress), team: String(p.team), priority: p.priority });
    setModal({ edit: p.id });
  };

  const stats = {
    total: projects.length,
    active: projects.filter(p => p.status === "Active").length,
    done: projects.filter(p => p.status === "Done").length,
    hold: projects.filter(p => p.status === "On Hold").length,
  };

  return (
    <div className="space-y-5">
      {/* ── Stats header ── */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Project", val: stats.total, color: "#6366f1", bg: "rgba(99,102,241,0.1)", icon: "📁" },
          { label: "Aktif", val: stats.active, color: "#10b981", bg: "rgba(16,185,129,0.1)", icon: "🟢" },
          { label: "Selesai", val: stats.done, color: "#3b82f6", bg: "rgba(59,130,246,0.1)", icon: "✅" },
          { label: "On Hold", val: stats.hold, color: "#f59e0b", bg: "rgba(245,158,11,0.1)", icon: "⏸" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: s.bg }}>{s.icon}</div>
            <div>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.val}</div>
              <div className="text-xs text-slate-400">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          {["Semua", "Active", "On Hold", "Done"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={filter === f
                ? { background: "#6366f1", color: "#fff" }
                : { background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
              {f} {f !== "Semua" && <span className="opacity-60">({projects.filter(p => p.status === f).length})</span>}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            {[{ v: "grid", icon: "⊞" }, { v: "list", icon: "☰" }].map(t => (
              <button key={t.v} onClick={() => setView(t.v)}
                className="w-8 h-8 rounded-lg text-sm transition-all"
                style={view === t.v ? { background: "#6366f1", color: "#fff" } : { color: "#94a3b8" }}>
                {t.icon}
              </button>
            ))}
          </div>
          <button onClick={() => { setForm(emptyForm); setModal("add"); }}
            className="flex items-center gap-1.5 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            + New Project
          </button>
        </div>
      </div>

      {/* ── GRID VIEW ── */}
      {view === "grid" && (
        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((p, i) => {
            const clr  = p.color || projectColors[i % projectColors.length];
            const pc   = priorityConfig[p.priority];
            const sc   = statusConfig[p.status];
            const days = daysLeft(p.deadline);
            const daysStyle = days < 0 ? { color: "#dc2626" } : days <= 7 ? { color: "#d97706" } : { color: "#64748b" };
            const r = 22, circ = 2 * Math.PI * r;
            const dash = (p.progress / 100) * circ;

            return (
              <div key={p.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:-translate-y-1 hover:shadow-xl transition-all group">
                {/* Gradient header */}
                <div className="h-3 w-full" style={{ background: `linear-gradient(to right, ${clr.from}, ${clr.to})` }} />

                <div className="p-6">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${clr.from}, ${clr.to})` }}>
                          {p.nama.charAt(0)}
                        </div>
                        <h3 className="font-black text-slate-800 text-base truncate group-hover:text-indigo-600 transition-colors">{p.nama}</h3>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{p.desc}</p>
                    </div>
                    {/* Progress ring */}
                    <div className="relative flex-shrink-0" style={{ width: 56, height: 56 }}>
                      <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
                        <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="5" />
                        <circle cx="28" cy="28" r={r} fill="none" stroke={`url(#pg${p.id})`} strokeWidth="5"
                          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
                        <defs>
                          <linearGradient id={`pg${p.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={clr.from} /><stop offset="100%" stopColor={clr.to} />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xs font-black leading-none" style={{ color: clr.from }}>{p.progress}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex gap-2 mb-4 flex-wrap">
                    <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: sc.bg, color: sc.text }}>
                      {sc.icon} {p.status}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: pc.bg, color: pc.text }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: pc.dot }} />
                      {p.priority}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">Progress</span>
                      <span className="font-semibold text-slate-600">{p.tasks?.done || 0}/{p.tasks?.total || 0} tasks</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${p.progress}%`, background: `linear-gradient(to right, ${clr.from}, ${clr.to})` }} />
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center justify-between mb-5">
                    {/* Team avatars */}
                    <div className="flex items-center">
                      {teamMembers.slice(0, p.team).map((m, mi) => (
                        <div key={mi} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ background: m.color, marginLeft: mi > 0 ? "-8px" : "0" }}>
                          {m.init}
                        </div>
                      ))}
                      {p.team > teamMembers.length && (
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold"
                          style={{ marginLeft: "-8px" }}>
                          +{p.team - teamMembers.length}
                        </div>
                      )}
                      <span className="text-xs text-slate-400 ml-2">{p.team} anggota</span>
                    </div>
                    {/* Deadline */}
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Deadline</div>
                      <div className="text-xs font-bold" style={daysStyle}>
                        {days < 0 ? `${Math.abs(days)} hari lalu` : days === 0 ? "Hari ini!" : `${days} hari lagi`}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button onClick={() => setDetail(p)} className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all hover:shadow-md"
                      style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
                      Detail
                    </button>
                    <button onClick={() => onViewTasks && onViewTasks(p)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all hover:shadow-md text-white"
                      style={{ background: `linear-gradient(135deg, ${clr.from}, ${clr.to})` }}>
                      Tasks →
                    </button>
                    <button onClick={() => openEdit(p)} className="w-10 py-2.5 rounded-xl text-xs font-bold transition-all"
                      style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>Edit</button>
                    <button onClick={() => setProjects(projects.filter(x => x.id !== p.id))}
                      className="w-10 py-2.5 rounded-xl text-xs font-bold transition-all"
                      style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>✕</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {view === "list" && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>{["Project", "Status", "Priority", "Progress", "Tim", "Deadline", "Aksi"].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-indigo-600 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const clr  = p.color || projectColors[i % projectColors.length];
                const pc   = priorityConfig[p.priority];
                const sc   = statusConfig[p.status];
                const days = daysLeft(p.deadline);
                const daysStyle = days < 0 ? "#dc2626" : days <= 7 ? "#d97706" : "#94a3b8";
                return (
                  <tr key={p.id} className="border-t hover:bg-indigo-50/30 transition-colors cursor-pointer"
                    style={{ borderColor: "rgba(99,102,241,0.08)" }}
                    onClick={() => setDetail(p)}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${clr.from}, ${clr.to})` }}>
                          {p.nama.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{p.nama}</div>
                          <div className="text-xs text-slate-400 truncate max-w-40">{p.desc}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: sc.bg, color: sc.text }}>
                        {sc.icon} {p.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1.5 text-xs font-bold w-fit" style={{ color: pc.text }}>
                        <span className="w-2 h-2 rounded-full" style={{ background: pc.dot }} />{p.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden flex-shrink-0">
                          <div className="h-full rounded-full" style={{ width: `${p.progress}%`, background: `linear-gradient(to right, ${clr.from}, ${clr.to})` }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: clr.from }}>{p.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center">
                        {teamMembers.slice(0, Math.min(p.team, 3)).map((m, mi) => (
                          <div key={mi} className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                            style={{ background: m.color, marginLeft: mi > 0 ? "-6px" : "0" }}>{m.init}</div>
                        ))}
                        {p.team > 3 && <span className="text-xs text-slate-400 ml-1.5">+{p.team - 3}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs font-bold" style={{ color: daysStyle }}>
                      {days < 0 ? `${Math.abs(days)}h lalu` : `${days}h lagi`}
                    </td>
                    <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                      <div className="flex gap-1.5">
                        <button onClick={() => onViewTasks && onViewTasks(p)} className="text-xs px-3 py-1.5 rounded-lg font-bold text-white transition-all"
                          style={{ background: `linear-gradient(135deg, ${clr.from}, ${clr.to})` }}>Tasks</button>
                        <button onClick={() => openEdit(p)} className="text-xs px-2.5 py-1.5 rounded-lg font-bold transition-all" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>Edit</button>
                        <button onClick={() => setProjects(projects.filter(x => x.id !== p.id))} className="text-xs px-2.5 py-1.5 rounded-lg font-bold transition-all" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>✕</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add/Edit Modal ── */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 flex items-center justify-between flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <div className="flex items-center gap-3 text-white">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg">📁</div>
                <div>
                  <div className="font-bold">{modal === "add" ? "New Project" : "Edit Project"}</div>
                  <div className="text-white/70 text-xs">{modal !== "add" && form.nama}</div>
                </div>
              </div>
              <button onClick={() => setModal(null)} className="text-white/70 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-6 overflow-y-auto">
              <form onSubmit={save} className="space-y-4">
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">Nama Project *</label><input required value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="cth: Website Redesign" className={inputCls} /></div>
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">Deskripsi</label><textarea value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} rows={2} placeholder="Deskripsi singkat project..." className={`${inputCls} resize-none`} /></div>
                <div className="grid grid-cols-2 gap-3">
                  {[{ f: "status", l: "Status", opts: ["Active", "On Hold", "Done"] }, { f: "priority", l: "Priority", opts: ["High", "Medium", "Low"] }].map(x => (
                    <div key={x.f}><label className="block text-xs font-semibold text-slate-500 mb-1">{x.l}</label><select value={form[x.f]} onChange={e => setForm({ ...form, [x.f]: e.target.value })} className={inputCls}>{x.opts.map(o => <option key={o}>{o}</option>)}</select></div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div><label className="block text-xs font-semibold text-slate-500 mb-1">Deadline</label><input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} className={inputCls} /></div>
                  <div><label className="block text-xs font-semibold text-slate-500 mb-1">Progress %</label><input type="number" min="0" max="100" value={form.progress} onChange={e => setForm({ ...form, progress: e.target.value })} className={inputCls} /></div>
                  <div><label className="block text-xs font-semibold text-slate-500 mb-1">Jumlah Tim</label><input type="number" min="1" value={form.team} onChange={e => setForm({ ...form, team: e.target.value })} className={inputCls} /></div>
                </div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setModal(null)} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors">Batal</button>
                  <button type="submit" className="flex-1 text-white py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                    {modal === "add" ? "Buat Project" : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {detail && (() => {
        const i   = projects.findIndex(p => p.id === detail.id);
        const clr = detail.color || projectColors[i % projectColors.length];
        const pc  = priorityConfig[detail.priority];
        const sc  = statusConfig[detail.status];
        const days = daysLeft(detail.deadline);
        return (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              {/* Hero */}
              <div className="h-24 relative flex items-end px-6 pb-4"
                style={{ background: `linear-gradient(135deg, ${clr.from}, ${clr.to})` }}>
                <div className="absolute inset-0 bg-black/15" />
                <button onClick={() => setDetail(null)} className="absolute top-3 right-3 text-white/70 hover:text-white text-xl z-10">✕</button>
                <div className="relative z-10">
                  <div className="text-white/70 text-xs mb-0.5">Project</div>
                  <div className="text-white font-black text-xl leading-tight">{detail.nama}</div>
                </div>
              </div>

              <div className="p-6">
                {/* Badges */}
                <div className="flex gap-2 mb-4">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: sc.bg, color: sc.text }}>{sc.icon} {detail.status}</span>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: pc.bg, color: pc.text }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: pc.dot }} />{detail.priority}
                  </span>
                </div>

                <p className="text-sm text-slate-500 mb-5 leading-relaxed">{detail.desc}</p>

                {/* Progress ring + stats */}
                <div className="flex items-center gap-5 mb-5 p-4 rounded-2xl" style={{ background: `rgba(${clr.from.includes("6366") ? "99,102,241" : "16,185,129"},0.06)` }}>
                  <div className="relative flex-shrink-0" style={{ width: 64, height: 64 }}>
                    <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                      <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="6" />
                      <circle cx="32" cy="32" r="26" fill="none" stroke={clr.from} strokeWidth="6"
                        strokeDasharray={`${(detail.progress / 100) * 2 * Math.PI * 26} ${2 * Math.PI * 26}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-sm font-black" style={{ color: clr.from }}>{detail.progress}%</span>
                    </div>
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Tasks Selesai</span>
                      <span className="font-bold" style={{ color: clr.from }}>{detail.tasks?.done || 0}/{detail.tasks?.total || 0}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Anggota Tim</span>
                      <span className="font-bold text-slate-700">{detail.team} orang</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Deadline</span>
                      <span className="font-bold" style={{ color: days < 7 ? "#dc2626" : "#64748b" }}>
                        {days < 0 ? `${Math.abs(days)} hari lalu` : `${days} hari lagi`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Team avatars */}
                <div className="mb-5">
                  <div className="text-xs text-slate-400 mb-2">Anggota Tim ({detail.team})</div>
                  <div className="flex gap-2">
                    {teamMembers.slice(0, detail.team).map((m, mi) => (
                      <div key={mi} className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: m.color }}>
                        {m.init}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => { setDetail(null); onViewTasks && onViewTasks(detail); }}
                    className="flex-1 text-white py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${clr.from}, ${clr.to})` }}>
                    Lihat Tasks →
                  </button>
                  <button onClick={() => { setDetail(null); openEdit(detail); }}
                    className="flex-1 py-3 rounded-xl font-bold text-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
