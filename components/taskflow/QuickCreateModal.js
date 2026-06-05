"use client";
import { useState } from "react";

const assignees = ["Rini", "Budi", "Sinta", "Ahmad", "Dewi"];
const colors = ["bg-indigo-500", "bg-blue-500", "bg-violet-500", "bg-cyan-500", "bg-emerald-500", "bg-amber-500"];

const config = {
  project: { title: "New Project", icon: "📁", color: "bg-indigo-600", focusColor: "focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" },
  task:    { title: "New Task",    icon: "✅", color: "bg-blue-600",   focusColor: "focus:border-blue-400 focus:ring-2 focus:ring-blue-100" },
  member:  { title: "Tambah Anggota Tim", icon: "👥", color: "bg-violet-600", focusColor: "focus:border-violet-400 focus:ring-2 focus:ring-violet-100" },
};

export default function QuickCreateModal({ type, onClose, projects, setProjects, tasks, setTasks, team, setTeam }) {
  const [form, setForm] = useState({ priority: "Medium", status: "Active", assignee: "Rini" });
  const [done, setDone] = useState(false);
  const h = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const c = config[type];

  const submit = (e) => {
    e.preventDefault();
    if (type === "project") {
      setProjects([...projects, {
        id: Date.now(), nama: form.nama || "", desc: form.desc || "",
        status: form.status || "Active", deadline: form.deadline || "",
        progress: Number(form.progress || 0), team: Number(form.team || 1),
        priority: form.priority || "Medium",
      }]);
    } else if (type === "task") {
      setTasks([...tasks, {
        id: Date.now(), judul: form.judul || "", desc: form.desc || "",
        project: form.project || projects[0]?.nama || "",
        assignee: form.assignee || "Rini", status: form.status || "Todo",
        priority: form.priority || "Medium", deadline: form.deadline || "",
      }]);
    } else if (type === "member") {
      const initials = (form.nama || "NM").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
      setTeam([...team, {
        id: Date.now(), nama: form.nama || "", role: form.role || "",
        email: form.email || "", projects: 0, tasks: 0,
        avatar: initials, color: colors[team.length % colors.length],
        status: form.status || "Active",
      }]);
    }
    setDone(true);
  };

  const inputClass = `w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none ${c.focusColor}`;
  const selectClass = "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={`${c.color} px-6 py-4 flex items-center justify-between flex-shrink-0`}>
          <div className="flex items-center gap-2 text-white">
            <span className="text-xl">{c.icon}</span>
            <span className="font-bold">{c.title}</span>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white text-xl transition-colors">✕</button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {done ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">Berhasil Ditambahkan!</h3>
              <p className="text-slate-400 text-sm mb-5">Data baru sudah masuk ke daftar.</p>
              <button onClick={onClose} className={`${c.color} hover:opacity-90 text-white px-6 py-2.5 rounded-xl font-semibold text-sm`}>Tutup</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">

              {/* PROJECT */}
              {type === "project" && (
                <>
                  <div><label className="block text-xs font-medium text-slate-500 mb-1">Nama Project *</label><input required name="nama" value={form.nama || ""} onChange={h} placeholder="cth: Mobile App v3" className={inputClass} /></div>
                  <div><label className="block text-xs font-medium text-slate-500 mb-1">Deskripsi</label><textarea name="desc" value={form.desc || ""} onChange={h} rows={2} placeholder="Deskripsi singkat project..." className={`${inputClass} resize-none`} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-xs font-medium text-slate-500 mb-1">Status</label><select name="status" value={form.status || "Active"} onChange={h} className={selectClass}>{["Active", "On Hold", "Done"].map(o => <option key={o}>{o}</option>)}</select></div>
                    <div><label className="block text-xs font-medium text-slate-500 mb-1">Priority</label><select name="priority" value={form.priority || "Medium"} onChange={h} className={selectClass}>{["High", "Medium", "Low"].map(o => <option key={o}>{o}</option>)}</select></div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div><label className="block text-xs font-medium text-slate-500 mb-1">Deadline</label><input type="date" name="deadline" value={form.deadline || ""} onChange={h} className={selectClass} /></div>
                    <div><label className="block text-xs font-medium text-slate-500 mb-1">Progress %</label><input type="number" name="progress" min="0" max="100" value={form.progress || "0"} onChange={h} className={selectClass} /></div>
                    <div><label className="block text-xs font-medium text-slate-500 mb-1">Tim</label><input type="number" name="team" min="1" value={form.team || "1"} onChange={h} className={selectClass} /></div>
                  </div>
                </>
              )}

              {/* TASK */}
              {type === "task" && (
                <>
                  <div><label className="block text-xs font-medium text-slate-500 mb-1">Judul Task *</label><input required name="judul" value={form.judul || ""} onChange={h} placeholder="cth: Fix login bug" className={inputClass} /></div>
                  <div><label className="block text-xs font-medium text-slate-500 mb-1">Deskripsi</label><textarea name="desc" value={form.desc || ""} onChange={h} rows={2} placeholder="Detail task..." className={`${inputClass} resize-none`} /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-xs font-medium text-slate-500 mb-1">Project</label><select name="project" value={form.project || ""} onChange={h} className={selectClass}>{projects.map(p => <option key={p.id}>{p.nama}</option>)}</select></div>
                    <div><label className="block text-xs font-medium text-slate-500 mb-1">Assignee</label><select name="assignee" value={form.assignee || "Rini"} onChange={h} className={selectClass}>{assignees.map(a => <option key={a}>{a}</option>)}</select></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="block text-xs font-medium text-slate-500 mb-1">Status</label><select name="status" value={form.status || "Todo"} onChange={h} className={selectClass}>{["Todo", "In Progress", "Review", "Done"].map(o => <option key={o}>{o}</option>)}</select></div>
                    <div><label className="block text-xs font-medium text-slate-500 mb-1">Priority</label><select name="priority" value={form.priority || "Medium"} onChange={h} className={selectClass}>{["High", "Medium", "Low"].map(o => <option key={o}>{o}</option>)}</select></div>
                  </div>
                  <div><label className="block text-xs font-medium text-slate-500 mb-1">Deadline</label><input type="date" name="deadline" value={form.deadline || ""} onChange={h} className={selectClass} /></div>
                </>
              )}

              {/* MEMBER */}
              {type === "member" && (
                <>
                  <div><label className="block text-xs font-medium text-slate-500 mb-1">Nama Lengkap *</label><input required name="nama" value={form.nama || ""} onChange={h} placeholder="cth: Dewi Maharani" className={inputClass} /></div>
                  <div><label className="block text-xs font-medium text-slate-500 mb-1">Role / Jabatan *</label><input required name="role" value={form.role || ""} onChange={h} placeholder="cth: QA Engineer" className={inputClass} /></div>
                  <div><label className="block text-xs font-medium text-slate-500 mb-1">Email *</label><input required type="email" name="email" value={form.email || ""} onChange={h} placeholder="dewi@taskflow.id" className={inputClass} /></div>
                  <div><label className="block text-xs font-medium text-slate-500 mb-1">Status</label><select name="status" value={form.status || "Active"} onChange={h} className={selectClass}>{["Active", "On Leave", "Inactive"].map(o => <option key={o}>{o}</option>)}</select></div>
                </>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors">Batal</button>
                <button type="submit" className={`flex-1 ${c.color} hover:opacity-90 text-white py-3 rounded-xl font-semibold text-sm transition-opacity`}>Simpan</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
