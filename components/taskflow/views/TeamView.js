"use client";
import { useState } from "react";

// Gradient colors per index — objek, bukan string Tailwind
const COLORS = [
  { from: "#6366f1", to: "#8b5cf6", light: "rgba(99,102,241,0.1)",  mid: "rgba(99,102,241,0.07)"  },
  { from: "#3b82f6", to: "#06b6d4", light: "rgba(59,130,246,0.1)",  mid: "rgba(59,130,246,0.07)"  },
  { from: "#8b5cf6", to: "#ec4899", light: "rgba(139,92,246,0.1)",  mid: "rgba(139,92,246,0.07)"  },
  { from: "#06b6d4", to: "#10b981", light: "rgba(6,182,212,0.1)",   mid: "rgba(6,182,212,0.07)"   },
  { from: "#10b981", to: "#059669", light: "rgba(16,185,129,0.1)",  mid: "rgba(16,185,129,0.07)"  },
  { from: "#f59e0b", to: "#f97316", light: "rgba(245,158,11,0.1)",  mid: "rgba(245,158,11,0.07)"  },
];

const roleConfig = {
  "UI/UX Designer":    { icon: "🎨", skills: ["Figma", "Prototyping", "User Research", "Wireframe"] },
  "Backend Developer": { icon: "⚙️", skills: ["Node.js", "PostgreSQL", "REST API", "Docker"]        },
  "Frontend Developer":{ icon: "💻", skills: ["React", "Next.js", "Tailwind", "TypeScript"]          },
  "Mobile Developer":  { icon: "📱", skills: ["React Native", "Flutter", "iOS", "Android"]           },
  "QA Engineer":       { icon: "🧪", skills: ["Jest", "Cypress", "Postman", "Test Plan"]             },
  "DevOps":            { icon: "🔧", skills: ["CI/CD", "AWS", "Kubernetes", "Terraform"]             },
  "Product Manager":   { icon: "📋", skills: ["Roadmap", "Agile", "Stakeholder", "Analytics"]        },
};

export const initTeam = [
  { id: 1, nama: "Rini Handayani",  role: "UI/UX Designer",     email: "rini@taskflow.id",  projects: 3, tasks: 12, done: 9,  status: "Active",   joined: "Jan 2025", maxTasks: 15 },
  { id: 2, nama: "Budi Prasetyo",   role: "Backend Developer",   email: "budi@taskflow.id",  projects: 4, tasks: 18, done: 14, status: "Active",   joined: "Mar 2024", maxTasks: 20 },
  { id: 3, nama: "Sinta Maharani",  role: "Frontend Developer",  email: "sinta@taskflow.id", projects: 2, tasks: 9,  done: 7,  status: "Active",   joined: "Jun 2024", maxTasks: 15 },
  { id: 4, nama: "Ahmad Rizky",     role: "Mobile Developer",    email: "ahmad@taskflow.id", projects: 2, tasks: 14, done: 8,  status: "On Leave", joined: "Sep 2024", maxTasks: 15 },
];

const emptyForm = { nama: "", role: "Frontend Developer", email: "", status: "Active" };
const inputCls  = "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 bg-white";

// Selalu kembalikan objek color yang valid
const getClr = (index) => COLORS[index % COLORS.length];

const activityFeed = [
  { user: "Rini",  action: "menyelesaikan",  target: "Design Homepage",     time: "5 mnt",  ci: 0 },
  { user: "Budi",  action: "push code ke",   target: "API Auth Branch",     time: "30 mnt", ci: 1 },
  { user: "Sinta", action: "review PR",      target: "Mobile Responsive",   time: "1 jam",  ci: 2 },
  { user: "Ahmad", action: "update status",  target: "Payment Integration", time: "2 jam",  ci: 3 },
];

export default function TeamView({ team, setTeam }) {
  const [modal, setModal]     = useState(null);
  const [form, setForm]       = useState(emptyForm);
  const [detail, setDetail]   = useState(null);
  const [filter, setFilter]   = useState("Semua");
  const [viewMode, setViewMode] = useState("grid");

  // Guard: pastikan field yang mungkin undefined tetap valid
  const safeTeam = team.map((m, i) => ({
    ...m,
    done:     m.done     ?? m.tasksComplete ?? 0,
    maxTasks: m.maxTasks ?? 20,
    tasks:    m.tasks    ?? 0,
    projects: m.projects ?? 0,
    joined:   m.joined   ?? "—",
    colorIdx: i,
  }));

  const filtered = filter === "Semua" ? safeTeam : safeTeam.filter(m => m.status === filter);

  const totalTasks    = safeTeam.reduce((s, m) => s + m.tasks, 0);
  const totalDone     = safeTeam.reduce((s, m) => s + m.done, 0);
  const totalCapacity = safeTeam.reduce((s, m) => s + m.maxTasks, 0);
  const teamCapPct    = totalCapacity > 0 ? Math.round((totalTasks / totalCapacity) * 100) : 0;

  const save = (e) => {
    e.preventDefault();
    if (modal === "add") {
      setTeam([...team, {
        ...form, id: Date.now(), projects: 0, tasks: 0, done: 0, maxTasks: 15,
        joined: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      }]);
    } else {
      setTeam(team.map(m => m.id === modal.edit ? { ...m, ...form } : m));
    }
    setModal(null);
  };

  const openEdit = (m) => {
    setForm({ nama: m.nama, role: m.role, email: m.email, status: m.status });
    setModal({ edit: m.id });
  };

  return (
    <div className="space-y-5">

      {/* ── Team Overview ── */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Workload panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-black text-slate-800 text-lg">Tim Coderaft TaskFlow</h3>
              <p className="text-slate-400 text-sm">{safeTeam.filter(m => m.status === "Active").length} aktif · {safeTeam.length} total</p>
            </div>
            <button onClick={() => { setForm(emptyForm); setModal("add"); }}
              className="text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg transition-all"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              + Tambah
            </button>
          </div>

          {/* Team capacity bar */}
          <div className="mb-5 p-4 rounded-xl" style={{ background: "rgba(99,102,241,0.05)" }}>
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-slate-600">Kapasitas Tim</span>
              <span className="font-bold text-indigo-600">{totalTasks}/{totalCapacity} tasks ({teamCapPct}%)</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all"
                style={{ width: `${teamCapPct}%`, background: teamCapPct > 80 ? "linear-gradient(to right,#ef4444,#f97316)" : "linear-gradient(to right,#6366f1,#8b5cf6)" }} />
            </div>
            <div className="flex justify-between text-xs mt-1.5 text-slate-400">
              <span>{totalDone} selesai</span><span>{totalTasks - totalDone} aktif</span>
            </div>
          </div>

          {/* Per-member workload */}
          <div className="space-y-3">
            {safeTeam.map((m, i) => {
              const clr = getClr(i);
              const realPct = m.maxTasks > 0 ? Math.round((m.tasks / m.maxTasks) * 100) : 0;
              const pct  = Math.min(100, realPct); // cap 100% untuk bar
              const over = realPct > 100;
              const init = m.nama.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
              return (
                <div key={m.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${clr.from}, ${clr.to})` }}>
                    {init}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-slate-700">{m.nama.split(" ")[0]}</span>
                        {over && <span className="text-xs font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "#ef4444", fontSize: "10px" }}>Overloaded</span>}
                      </div>
                      <span className="text-slate-400">{m.tasks}/{m.maxTasks}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: over ? "#ef4444" : pct > 80 ? "#f59e0b" : `linear-gradient(to right,${clr.from},${clr.to})` }} />
                    </div>
                  </div>
                  <span className="text-xs font-bold w-12 text-right" style={{ color: over ? "#ef4444" : pct > 80 ? "#f59e0b" : clr.from }}>
                    {over ? "100%+" : `${pct}%`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">Aktivitas Terbaru</h3>
          <div className="relative">
            <div className="absolute left-3.5 top-0 bottom-0 w-px bg-slate-100" />
            <div className="space-y-4">
              {activityFeed.map((a, i) => {
                const clr = getClr(a.ci);
                return (
                  <div key={i} className="flex items-start gap-3 relative">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 relative z-10"
                      style={{ background: `linear-gradient(135deg,${clr.from},${clr.to})` }}>
                      {a.user.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="bg-slate-50 rounded-xl px-3 py-2.5 flex-1 hover:bg-indigo-50 transition-colors">
                      <p className="text-xs text-slate-700 leading-snug">
                        <span className="font-bold text-slate-800">{a.user}</span>{" "}
                        <span className="text-slate-500">{a.action}</span>{" "}
                        <span className="font-semibold" style={{ color: clr.from }}>{a.target}</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{a.time} lalu</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2">
          {[{ f: "Semua", n: safeTeam.length }, { f: "Active", n: safeTeam.filter(m => m.status === "Active").length }, { f: "On Leave", n: safeTeam.filter(m => m.status === "On Leave").length }].map(({ f, n }) => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={filter === f ? { background: "#6366f1", color: "#fff" } : { background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
              {f} <span className="opacity-60">({n})</span>
            </button>
          ))}
        </div>
        <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
          {[{ v: "grid", icon: "⊞" }, { v: "list", icon: "☰" }].map(t => (
            <button key={t.v} onClick={() => setViewMode(t.v)}
              className="w-8 h-8 rounded-lg text-sm transition-all"
              style={viewMode === t.v ? { background: "#6366f1", color: "#fff" } : { color: "#94a3b8" }}>
              {t.icon}
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID VIEW ── */}
      {viewMode === "grid" && (
        <div className="grid sm:grid-cols-2 gap-5">
          {filtered.map((m, i) => {
            const clr      = getClr(m.colorIdx ?? i);
            const rc       = roleConfig[m.role] || { icon: "👤", skills: [] };
            const init     = m.nama.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
            const isActive = m.status === "Active";
            const donePct      = m.tasks > 0 ? Math.round((m.done / m.tasks) * 100) : 0;
            const realWorkPct  = m.maxTasks > 0 ? Math.round((m.tasks / m.maxTasks) * 100) : 0;
            const workPct      = Math.min(100, realWorkPct);
            const isOverloaded = realWorkPct > 100;

            return (
              <div key={m.id} className="rounded-2xl overflow-hidden border border-slate-100 hover:-translate-y-1 hover:shadow-xl transition-all group bg-white">

                {/* Gradient header — avatar di dalam header, tidak overlap */}
                <div className="relative px-5 pt-4 pb-5"
                  style={{ background: `linear-gradient(135deg, ${clr.from}, ${clr.to})` }}>
                  {/* Top: status + workload */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2.5 h-2.5 rounded-full ${isActive ? "bg-emerald-300" : "bg-amber-300"}`} />
                      <span className="text-white/90 text-xs font-semibold">{m.status}</span>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      {isOverloaded && (
                        <span className="text-xs font-black px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(239,68,68,0.9)", color: "white" }}>
                          Overloaded
                        </span>
                      )}
                      <div>
                        <span className="text-white font-black text-xl leading-none">{workPct}%</span>
                        <span className="text-white/70 text-xs ml-1">workload</span>
                      </div>
                    </div>
                  </div>
                  {/* Bottom: avatar + name dalam header */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0 bg-white/20 border border-white/30 shadow-lg">
                      {init}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-black text-white truncate">{m.nama}</h3>
                      <p className="text-white/80 text-sm font-medium truncate">{rc.icon} {m.role}</p>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="px-5 pb-5 pt-4">
                  {/* Email */}
                  <p className="text-xs text-slate-400 mb-4 truncate">📧 {m.email} &nbsp;·&nbsp; 📅 {m.joined}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { label: "Projects", val: m.projects, color: clr.from },
                      { label: "Tasks",    val: m.tasks,    color: clr.from },
                      { label: "Done",     val: `${donePct}%`, color: "#10b981" },
                    ].map(s => (
                      <div key={s.label} className="text-center py-3 rounded-xl" style={{ background: clr.mid }}>
                        <div className="text-lg font-black" style={{ color: s.color }}>{s.val}</div>
                        <div className="text-xs text-slate-500">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {rc.skills.slice(0, 3).map(sk => (
                      <span key={sk} className="text-xs px-2.5 py-1 rounded-full font-semibold"
                        style={{ background: clr.light, color: clr.from }}>{sk}</span>
                    ))}
                    {rc.skills.length > 3 && (
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium text-slate-400 bg-slate-100">
                        +{rc.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Completion bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">Task completion</span>
                      <span className="font-bold" style={{ color: clr.from }}>{m.done}/{m.tasks}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${donePct}%`, background: `linear-gradient(to right,${clr.from},${clr.to})` }} />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button onClick={() => setDetail(m)} className="flex-1 py-2.5 rounded-xl text-xs font-bold"
                      style={{ background: clr.light, color: clr.from }}>Detail</button>
                    <button onClick={() => openEdit(m)} className="flex-1 py-2.5 rounded-xl text-xs font-bold"
                      style={{ background: "rgba(59,130,246,0.09)", color: "#3b82f6" }}>Edit</button>
                    <button onClick={() => setTeam(team.filter(x => x.id !== m.id))}
                      className="w-10 py-2.5 rounded-xl text-xs font-bold"
                      style={{ background: "rgba(239,68,68,0.09)", color: "#ef4444" }}>✕</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {viewMode === "list" && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <table className="w-full">
            <thead style={{ background: "rgba(99,102,241,0.05)" }}>
              <tr>{["Anggota", "Role", "Status", "Workload", "Tasks", "Bergabung", "Aksi"].map(h => (
                <th key={h} className="text-left px-5 py-4 text-xs font-bold text-indigo-600 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => {
                const clr     = getClr(m.colorIdx ?? i);
                const rc      = roleConfig[m.role] || { icon: "👤" };
                const init    = m.nama.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
                const pct     = m.maxTasks > 0 ? Math.round((m.tasks / m.maxTasks) * 100) : 0;
                const donePct = m.tasks > 0 ? Math.round((m.done / m.tasks) * 100) : 0;
                return (
                  <tr key={m.id} className="border-t hover:bg-indigo-50/30 transition-colors cursor-pointer"
                    style={{ borderColor: "rgba(99,102,241,0.08)" }}
                    onClick={() => setDetail(m)}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                            style={{ background: `linear-gradient(135deg,${clr.from},${clr.to})` }}>{init}</div>
                          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${m.status === "Active" ? "bg-emerald-400" : "bg-amber-400"}`} />
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{m.nama}</div>
                          <div className="text-xs text-slate-400">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold" style={{ color: clr.from }}>{rc.icon} {m.role}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-bold px-2.5 py-1.5 rounded-full"
                        style={m.status === "Active"
                          ? { background: "rgba(16,185,129,0.1)", color: "#059669" }
                          : { background: "rgba(245,158,11,0.1)", color: "#b45309" }}>
                        {m.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full"
                            style={{ width: `${pct}%`, background: pct > 85 ? "#ef4444" : `linear-gradient(to right,${clr.from},${clr.to})` }} />
                        </div>
                        <span className="text-xs font-bold" style={{ color: pct > 85 ? "#ef4444" : clr.from }}>{pct}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-bold text-slate-700">{m.done}<span className="text-slate-400 font-normal">/{m.tasks}</span></div>
                      <div className="text-xs text-slate-400">{donePct}% done</div>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400">{m.joined}</td>
                    <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                      <div className="flex gap-1.5">
                        <button onClick={() => openEdit(m)} className="text-xs px-3 py-1.5 rounded-lg font-bold" style={{ background: "rgba(59,130,246,0.09)", color: "#3b82f6" }}>Edit</button>
                        <button onClick={() => setTeam(team.filter(x => x.id !== m.id))} className="text-xs px-2.5 py-1.5 rounded-lg font-bold" style={{ background: "rgba(239,68,68,0.09)", color: "#ef4444" }}>✕</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Modal ── */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <div className="flex items-center gap-3 text-white">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg">👥</div>
                <div>
                  <div className="font-bold">{modal === "add" ? "Tambah Anggota" : "Edit Anggota"}</div>
                  <div className="text-white/70 text-xs">{modal !== "add" && form.nama}</div>
                </div>
              </div>
              <button onClick={() => setModal(null)} className="text-white/70 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-6">
              <form onSubmit={save} className="space-y-4">
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">Nama Lengkap *</label>
                  <input required value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Rini Handayani" className={inputCls} /></div>
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">Role / Jabatan *</label>
                  <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className={inputCls}>
                    {Object.keys(roleConfig).map(r => <option key={r}>{r}</option>)}
                  </select></div>
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">Email *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="rini@taskflow.id" className={inputCls} /></div>
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={inputCls}>
                    {["Active", "On Leave", "Inactive"].map(o => <option key={o}>{o}</option>)}
                  </select></div>
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
        const i       = safeTeam.findIndex(m => m.id === detail.id);
        const clr     = getClr(detail.colorIdx ?? i);
        const rc      = roleConfig[detail.role] || { icon: "👤", skills: [] };
        const init    = detail.nama.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
        const donePct = detail.tasks > 0 ? Math.round((detail.done / detail.tasks) * 100) : 0;
        const workPct = detail.maxTasks > 0 ? Math.round((detail.tasks / detail.maxTasks) * 100) : 0;
        return (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              {/* Hero */}
              <div className="h-28 relative" style={{ background: `linear-gradient(135deg, ${clr.from}, ${clr.to})` }}>
                <div className="absolute inset-0 bg-black/10" />
                <button onClick={() => setDetail(null)} className="absolute top-3 right-3 text-white/70 hover:text-white text-xl z-10">✕</button>
                <div className="absolute top-3 left-4 flex items-center gap-1.5 z-10">
                  <div className={`w-2.5 h-2.5 rounded-full ${detail.status === "Active" ? "bg-emerald-300" : "bg-amber-300"}`} />
                  <span className="text-white/80 text-xs font-medium">{detail.status}</span>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl"
                    style={{ background: `linear-gradient(135deg, ${clr.from}, ${clr.to})`, border: "4px solid white" }}>
                    {init}
                  </div>
                </div>
              </div>

              <div className="pt-14 px-6 pb-6 text-center">
                <h3 className="font-black text-slate-800 text-xl">{detail.nama}</h3>
                <p className="font-semibold text-sm mb-0.5" style={{ color: clr.from }}>{rc.icon} {detail.role}</p>
                <p className="text-xs text-slate-400 mb-5">{detail.email} · {detail.joined}</p>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Projects", val: detail.projects, color: clr.from },
                    { label: "Tasks",    val: detail.tasks,    color: clr.from },
                    { label: "Selesai",  val: detail.done,     color: "#10b981" },
                  ].map(s => (
                    <div key={s.label} className="py-3 rounded-xl" style={{ background: clr.mid }}>
                      <div className="text-2xl font-black" style={{ color: s.color }}>{s.val}</div>
                      <div className="text-xs text-slate-500">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 mb-5">
                  {[{ label: "Task Done", val: donePct }, { label: "Workload", val: workPct }].map(bar => (
                    <div key={bar.label} className="flex-1 p-3 rounded-xl text-left" style={{ background: clr.mid }}>
                      <div className="text-xs text-slate-500 mb-1">{bar.label}</div>
                      <div className="text-lg font-black mb-1.5" style={{ color: clr.from }}>{bar.val}%</div>
                      <div className="h-2 bg-white/60 rounded-full">
                        <div className="h-full rounded-full" style={{ width: `${bar.val}%`, background: `linear-gradient(to right,${clr.from},${clr.to})` }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-left mb-5">
                  <div className="text-xs text-slate-400 mb-2">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {rc.skills.map(sk => (
                      <span key={sk} className="text-xs px-3 py-1.5 rounded-full font-semibold"
                        style={{ background: clr.light, color: clr.from }}>{sk}</span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => { setDetail(null); openEdit(detail); }}
                    className="flex-1 py-3 rounded-xl font-bold text-sm" style={{ background: clr.light, color: clr.from }}>Edit</button>
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
