"use client";
import { useState } from "react";

const statusConfig = {
  Todo:        { bg: "rgba(148,163,184,0.12)", text: "#64748b", border: "rgba(148,163,184,0.3)", dot: "#94a3b8",  label: "Todo" },
  "In Progress":{ bg: "rgba(99,102,241,0.12)",  text: "#4338ca", border: "rgba(99,102,241,0.3)",  dot: "#6366f1",  label: "In Progress" },
  Review:      { bg: "rgba(245,158,11,0.12)",   text: "#b45309", border: "rgba(245,158,11,0.3)",  dot: "#f59e0b",  label: "Review" },
  Done:        { bg: "rgba(16,185,129,0.12)",   text: "#059669", border: "rgba(16,185,129,0.3)",  dot: "#10b981",  label: "Done" },
};
const priorityConfig = {
  High:   { color: "#ef4444", bg: "rgba(239,68,68,0.1)",   label: "🔴 High" },
  Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)",  label: "🟡 Medium" },
  Low:    { color: "#94a3b8", bg: "rgba(148,163,184,0.1)", label: "⚪ Low" },
};
const assigneeConfig = {
  Rini:  { color: "#6366f1", init: "RI" }, Budi:  { color: "#3b82f6", init: "BU" },
  Sinta: { color: "#8b5cf6", init: "SI" }, Ahmad: { color: "#06b6d4", init: "AH" },
  Dewi:  { color: "#10b981", init: "DW" },
};

export const initTasks = [
  { id: 1, judul: "Design Homepage UI",    project: "Website Redesign",  assignee: "Rini",  status: "Done",        priority: "High",   deadline: "2026-06-05", desc: "Buat desain homepage dengan Figma sesuai brand guideline" },
  { id: 2, judul: "Implement API Auth",    project: "Mobile App v2",     assignee: "Budi",  status: "In Progress", priority: "High",   deadline: "2026-06-10", desc: "Implementasi JWT authentication untuk mobile app" },
  { id: 3, judul: "Database Schema",       project: "Dashboard Admin",   assignee: "Sinta", status: "Done",        priority: "Medium", deadline: "2026-06-03", desc: "Desain schema database PostgreSQL" },
  { id: 4, judul: "Mobile Responsive",     project: "Website Redesign",  assignee: "Ahmad", status: "In Progress", priority: "High",   deadline: "2026-06-15", desc: "Pastikan semua halaman responsive di mobile" },
  { id: 5, judul: "Unit Testing",          project: "Mobile App v2",     assignee: "Rini",  status: "Todo",        priority: "Medium", deadline: "2026-06-20", desc: "Tulis unit test untuk semua komponen utama" },
  { id: 6, judul: "Payment Integration",   project: "API Integration",   assignee: "Budi",  status: "Review",      priority: "High",   deadline: "2026-06-25", desc: "Integrasi Midtrans payment gateway" },
];

const projects  = ["Website Redesign", "Mobile App v2", "Dashboard Admin", "API Integration"];
const assignees = ["Rini", "Budi", "Sinta", "Ahmad", "Dewi"];
const emptyForm = { judul: "", project: projects[0], assignee: "Rini", status: "Todo", priority: "Medium", deadline: "", desc: "" };
const inputCls  = "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 bg-white";

const daysLeft = (d) => Math.ceil((new Date(d) - new Date()) / 86400000);

export default function TasksView({ tasks, setTasks }) {
  const [filter, setFilter]   = useState("Semua");
  const [search, setSearch]   = useState("");
  const [view, setView]       = useState("list");   // "list" | "kanban"
  const [modal, setModal]     = useState(null);
  const [form, setForm]       = useState(emptyForm);
  const [detail, setDetail]   = useState(null);

  const filtered = tasks.filter(t => {
    const matchStatus = filter === "Semua" || t.status === filter;
    const matchSearch = !search || t.judul.toLowerCase().includes(search.toLowerCase()) || t.assignee.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const count = (s) => tasks.filter(t => t.status === s).length;

  const save = (e) => {
    e.preventDefault();
    if (modal === "add") setTasks([...tasks, { ...form, id: Date.now() }]);
    else setTasks(tasks.map(t => t.id === modal.edit ? { ...t, ...form } : t));
    setModal(null);
  };

  const nextStatus = (current) => {
    const flow = ["Todo", "In Progress", "Review", "Done"];
    const i = flow.indexOf(current);
    return i < flow.length - 1 ? flow[i + 1] : current;
  };

  const TaskCard = ({ t }) => {
    const sc  = statusConfig[t.status];
    const pc  = priorityConfig[t.priority];
    const ac  = assigneeConfig[t.assignee] || { color: "#6366f1", init: t.assignee?.slice(0,2).toUpperCase() };
    const days = daysLeft(t.deadline);
    const daysColor = days < 0 ? "#dc2626" : days <= 3 ? "#d97706" : "#94a3b8";

    return (
      <div className="bg-white rounded-2xl border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all group overflow-hidden"
        style={{ borderLeft: `4px solid ${pc.color}` }}>
        <div className="p-5">
          {/* Top */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-indigo-600 transition-colors flex-1">{t.judul}</h3>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Assignee avatar */}
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ background: ac.color }} title={t.assignee}>{ac.init}</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs px-2 py-1 rounded-full font-semibold"
              style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>📁 {t.project}</span>
            <span className="text-xs px-2 py-1 rounded-full font-bold"
              style={{ background: pc.bg, color: pc.color }}>{t.priority}</span>
          </div>

          {t.desc && <p className="text-slate-400 text-xs mb-3 line-clamp-1">{t.desc}</p>}

          {/* Bottom row */}
          <div className="flex items-center justify-between">
            {/* Status cycle button */}
            <button onClick={() => setTasks(tasks.map(x => x.id === t.id ? { ...x, status: nextStatus(x.status) } : x))}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all hover:shadow-md"
              style={{ background: sc.bg, color: sc.text, border: `1px solid ${sc.border}` }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: sc.dot }} />
              {t.status}
              {t.status !== "Done" && <span className="opacity-50">→</span>}
            </button>

            {/* Deadline */}
            <span className="text-xs font-semibold" style={{ color: daysColor }}>
              {days < 0 ? `${Math.abs(days)}h lalu` : days === 0 ? "Hari ini!" : `${days}h`}
            </span>
          </div>
        </div>

        {/* Action strip */}
        <div className="flex border-t border-slate-100">
          <button onClick={() => setDetail(t)} className="flex-1 py-2.5 text-xs font-semibold text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all">Detail</button>
          <div className="w-px bg-slate-100" />
          <button onClick={() => { setForm({ ...t }); setModal({ edit: t.id }); }} className="flex-1 py-2.5 text-xs font-semibold text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">Edit</button>
          <div className="w-px bg-slate-100" />
          <button onClick={() => setTasks(tasks.filter(x => x.id !== t.id))} className="flex-1 py-2.5 text-xs font-semibold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">Hapus</button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      {/* ── Stats bar ── */}
      <div className="grid grid-cols-4 gap-3">
        {Object.entries(statusConfig).map(([s, c]) => (
          <button key={s} onClick={() => setFilter(s)}
            className="rounded-2xl p-4 text-left transition-all hover:shadow-md"
            style={{
              background: filter === s ? c.bg : "rgba(255,255,255,0.9)",
              border: `1.5px solid ${filter === s ? c.border : "rgba(226,232,240,0.8)"}`,
            }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.dot }} />
              <span className="text-xs font-semibold text-slate-500">{s}</span>
            </div>
            <div className="text-3xl font-black" style={{ color: c.text }}>{count(s)}</div>
          </button>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-3 flex-1 flex-wrap">
          <div className="relative flex-1 min-w-48">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari task atau assignee..."
              className="w-full bg-slate-100 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-indigo-200 transition-all" />
          </div>
          <button onClick={() => setFilter("Semua")}
            className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
            style={filter === "Semua" ? { background: "#6366f1", color: "#fff" } : { background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
            Semua ({tasks.length})
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            {[{ v: "list", icon: "☰" }, { v: "kanban", icon: "⊞" }].map(t => (
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
            + New Task
          </button>
        </div>
      </div>

      {/* ── LIST VIEW ── */}
      {view === "list" && (
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-400">
              <div className="text-4xl mb-3">📋</div>
              <p className="font-semibold">Tidak ada task ditemukan</p>
            </div>
          )}
          {filtered.map(t => <TaskCard key={t.id} t={t} />)}
        </div>
      )}

      {/* ── KANBAN VIEW ── */}
      {view === "kanban" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(statusConfig).map(([s, c]) => {
            const colTasks = tasks.filter(t => t.status === s);
            return (
              <div key={s}>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: c.dot }} />
                  <span className="text-xs font-bold text-slate-600">{s}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold ml-auto" style={{ background: c.bg, color: c.text }}>{colTasks.length}</span>
                </div>
                <div className="space-y-3 min-h-32">
                  {colTasks.map(t => {
                    const pc = priorityConfig[t.priority];
                    const ac = assigneeConfig[t.assignee] || { color: "#6366f1", init: t.assignee?.slice(0,2).toUpperCase() };
                    const days = daysLeft(t.deadline);
                    return (
                      <div key={t.id} className="bg-white rounded-xl p-4 border border-slate-100 hover:shadow-md transition-all cursor-pointer"
                        style={{ borderLeft: `3px solid ${pc.color}` }}
                        onClick={() => setDetail(t)}>
                        <div className="font-semibold text-slate-800 text-sm mb-2 leading-tight">{t.judul}</div>
                        <div className="flex items-center justify-between">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ background: ac.color }}>{ac.init}</div>
                          <span className="text-xs font-semibold" style={{ color: days < 0 ? "#dc2626" : days <= 3 ? "#d97706" : "#94a3b8" }}>
                            {days < 0 ? `${Math.abs(days)}h` : `${days}h`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Add/Edit Modal ── */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 flex items-center justify-between flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <div className="flex items-center gap-3 text-white">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg">✅</div>
                <div>
                  <div className="font-bold">{modal === "add" ? "New Task" : "Edit Task"}</div>
                  <div className="text-white/70 text-xs">{modal !== "add" && form.judul}</div>
                </div>
              </div>
              <button onClick={() => setModal(null)} className="text-white/70 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-6 overflow-y-auto">
              <form onSubmit={save} className="space-y-4">
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">Judul Task *</label>
                  <input required value={form.judul} onChange={e => setForm({ ...form, judul: e.target.value })} placeholder="cth: Design Homepage" className={inputCls} /></div>
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">Deskripsi</label>
                  <textarea value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} rows={2} placeholder="Detail task..." className={`${inputCls} resize-none`} /></div>
                <div className="grid grid-cols-2 gap-3">
                  {[{ f: "project", l: "Project", opts: projects }, { f: "assignee", l: "Assignee", opts: assignees },
                    { f: "status", l: "Status", opts: Object.keys(statusConfig) }, { f: "priority", l: "Priority", opts: ["High", "Medium", "Low"] }].map(x => (
                    <div key={x.f}><label className="block text-xs font-semibold text-slate-500 mb-1">{x.l}</label>
                      <select value={form[x.f]} onChange={e => setForm({ ...form, [x.f]: e.target.value })} className={inputCls}>
                        {x.opts.map(o => <option key={o}>{o}</option>)}
                      </select></div>
                  ))}
                </div>
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">Deadline</label>
                  <input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} className={inputCls} /></div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setModal(null)} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors">Batal</button>
                  <button type="submit" className="flex-1 text-white py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {detail && (() => {
        const sc  = statusConfig[detail.status];
        const pc  = priorityConfig[detail.priority];
        const ac  = assigneeConfig[detail.assignee] || { color: "#6366f1", init: detail.assignee?.slice(0,2).toUpperCase() };
        const days = daysLeft(detail.deadline);
        return (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              {/* Hero */}
              <div className="h-20 relative flex items-end px-6 pb-4"
                style={{ background: `linear-gradient(135deg, ${ac.color}, ${ac.color}90)`, borderLeft: `6px solid ${pc.color}` }}>
                <div className="absolute inset-0 bg-black/15" />
                <button onClick={() => setDetail(null)} className="absolute top-3 right-3 text-white/70 hover:text-white text-xl z-10">✕</button>
                <div className="relative z-10">
                  <div className="text-white font-black text-lg leading-tight line-clamp-1">{detail.judul}</div>
                </div>
              </div>
              <div className="p-6">
                {/* Status + Priority */}
                <div className="flex gap-2 mb-4">
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                    style={{ background: sc.bg, color: sc.text }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: sc.dot }} />{detail.status}
                  </span>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: pc.bg, color: pc.color }}>{detail.priority}</span>
                </div>
                {/* Desc */}
                {detail.desc && <p className="text-sm text-slate-500 mb-4 leading-relaxed">{detail.desc}</p>}
                {/* Info cards */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl p-3 text-center" style={{ background: "rgba(99,102,241,0.06)" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mx-auto mb-1" style={{ background: ac.color }}>{ac.init}</div>
                    <div className="text-xs font-bold text-slate-700">{detail.assignee}</div>
                    <div className="text-xs text-slate-400">Assignee</div>
                  </div>
                  <div className="rounded-xl p-3 text-center" style={{ background: "rgba(99,102,241,0.06)" }}>
                    <div className="text-2xl font-black mb-0.5" style={{ color: days < 0 ? "#dc2626" : days <= 3 ? "#d97706" : "#6366f1" }}>
                      {days < 0 ? `${Math.abs(days)}` : days}
                    </div>
                    <div className="text-xs font-bold text-slate-700">{days < 0 ? "hari lalu" : "hari lagi"}</div>
                    <div className="text-xs text-slate-400">{detail.deadline}</div>
                  </div>
                </div>
                {[{ l: "Project", v: detail.project }].map(item => (
                  <div key={item.l} className="flex justify-between py-2.5 border-b border-slate-100 text-sm">
                    <span className="text-slate-400">{item.l}</span>
                    <span className="text-slate-700 font-medium">{item.v}</span>
                  </div>
                ))}
                <div className="flex gap-3 mt-5">
                  <button onClick={() => { setDetail(null); setForm({ ...detail }); setModal({ edit: detail.id }); }}
                    className="flex-1 py-3 rounded-xl font-bold text-sm transition-all" style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>Edit</button>
                  <button onClick={() => setDetail(null)} className="flex-1 py-3 rounded-xl font-bold text-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">Tutup</button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
