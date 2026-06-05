const stats = [
  { label: "Total Projects", value: "12", change: "+2", up: true, icon: "📁", from: "#6366f1", to: "#818cf8" },
  { label: "Task Selesai", value: "48", change: "+8", up: true, icon: "✅", from: "#10b981", to: "#34d399" },
  { label: "In Progress", value: "23", change: "+3", up: true, icon: "⚡", from: "#f59e0b", to: "#fbbf24" },
  { label: "Overdue", value: "5", change: "-2", up: false, icon: "⚠️", from: "#ef4444", to: "#f87171" },
];

const taskStatus = [
  { label: "Done", count: 48, pct: 52, color: "#10b981" },
  { label: "In Progress", count: 23, pct: 25, color: "#6366f1" },
  { label: "Review", count: 12, pct: 13, color: "#f59e0b" },
  { label: "Todo", count: 9, pct: 10, color: "#e2e8f0" },
];

const projects = [
  { nama: "Website Redesign", progress: 75, deadline: "15 Jun", team: 4, status: "Active", color: "#6366f1" },
  { nama: "Mobile App v2", progress: 40, deadline: "30 Jun", team: 6, status: "Active", color: "#10b981" },
  { nama: "Dashboard Admin", progress: 90, deadline: "8 Jun", team: 3, status: "Review", color: "#f59e0b" },
  { nama: "API Integration", progress: 20, deadline: "1 Jul", team: 2, status: "On Hold", color: "#94a3b8" },
];

const activity = [
  { user: "Rini", action: "menyelesaikan", target: "Design Homepage", time: "5 mnt", avatar: "RI", color: "#6366f1", icon: "✅" },
  { user: "Budi", action: "menambah task", target: "API Integration", time: "20 mnt", avatar: "BU", color: "#3b82f6", icon: "➕" },
  { user: "Sinta", action: "update status", target: "Database Setup", time: "1 jam", avatar: "SI", color: "#8b5cf6", icon: "🔄" },
  { user: "Ahmad", action: "review", target: "Mobile Responsive", time: "2 jam", avatar: "AH", color: "#06b6d4", icon: "👁" },
];

const teamLoad = [
  { nama: "Rini", tasks: 12, max: 15, avatar: "RI", color: "#6366f1" },
  { nama: "Budi", tasks: 18, max: 20, avatar: "BU", color: "#3b82f6" },
  { nama: "Sinta", tasks: 9, max: 15, avatar: "SI", color: "#8b5cf6" },
  { nama: "Ahmad", tasks: 14, max: 15, avatar: "AH", color: "#06b6d4" },
];

const statusStyle = { Active: "bg-emerald-100 text-emerald-700", Review: "bg-amber-100 text-amber-700", "On Hold": "bg-slate-100 text-slate-500" };

export default function DashboardView() {
  const totalTasks = taskStatus.reduce((s, t) => s + t.count, 0);
  let offset = 0;
  const r = 40, circ = 2 * Math.PI * r;

  return (
    <div className="space-y-5">
      {/* ── Hero stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 -translate-y-4 translate-x-4"
              style={{ background: `radial-gradient(circle, ${s.from}, transparent)` }} />
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: `linear-gradient(135deg, ${s.from}18, ${s.to}30)` }}>
                {s.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                {s.change}
              </span>
            </div>
            <div className="text-3xl font-black mb-1" style={{ color: s.from }}>{s.value}</div>
            <div className="text-slate-400 text-xs font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* ── Task donut chart ── */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-5">Status Task</h3>
          <div className="flex items-center gap-6">
            <div className="relative flex-shrink-0" style={{ width: 100, height: 100 }}>
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {taskStatus.map((t, i) => {
                  const dash = (t.pct / 100) * circ;
                  const el = (
                    <circle key={t.label} cx="50" cy="50" r={r} fill="none" stroke={t.color} strokeWidth="12"
                      strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={-offset} strokeLinecap="butt" />
                  );
                  offset += dash;
                  return el;
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-800">{totalTasks}</span>
                <span className="text-xs text-slate-400">tasks</span>
              </div>
            </div>
            <div className="space-y-2.5 flex-1">
              {taskStatus.map(t => (
                <div key={t.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: t.color }} />
                    <span className="text-xs text-slate-600">{t.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">{t.count}</span>
                    <span className="text-xs text-slate-400">{t.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sprint progress */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-slate-600">Sprint Juni 2026</span>
              <span className="text-indigo-600 font-bold">68%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: "68%", background: "linear-gradient(to right, #6366f1, #818cf8)" }} />
            </div>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>17 dari 25 hari</span>
              <span>8 hari tersisa</span>
            </div>
          </div>
        </div>

        {/* ── Project progress ── */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-800">Project Progress</h3>
            <span className="text-xs text-slate-400">{projects.length} projects aktif</span>
          </div>
          <div className="space-y-4">
            {projects.map(p => (
              <div key={p.nama} className="p-4 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                    <span className="font-semibold text-slate-700 text-sm">{p.nama}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyle[p.status]}`}>{p.status}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>📅 {p.deadline}</span>
                    <span>👥 {p.team}</span>
                    <span className="font-bold" style={{ color: p.color }}>{p.progress}%</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${p.progress}%`, background: `linear-gradient(to right, ${p.color}, ${p.color}90)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* ── Team workload ── */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-800">Team Workload</h3>
            <span className="text-xs text-slate-400">Tasks aktif per anggota</span>
          </div>
          <div className="space-y-4">
            {teamLoad.map(m => {
              const pct = Math.round((m.tasks / m.max) * 100);
              const over = pct >= 90;
              return (
                <div key={m.nama} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: m.color }}>{m.avatar}</div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-700">{m.nama}</span>
                      <span className={`font-bold ${over ? "text-red-500" : "text-slate-500"}`}>{m.tasks}/{m.max} tasks</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: over ? "linear-gradient(to right, #ef4444, #f87171)" : `linear-gradient(to right, ${m.color}, ${m.color}80)` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Activity feed ── */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-5">Aktivitas Terbaru</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-100" />
            <div className="space-y-4">
              {activity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 relative pl-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 relative z-10"
                    style={{ background: a.color }}>
                    {a.avatar}
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-xl px-4 py-3 hover:bg-indigo-50 transition-colors">
                    <p className="text-sm text-slate-700">
                      <span className="font-bold text-slate-800">{a.user}</span>
                      <span className="text-slate-500"> {a.action} </span>
                      <span className="font-semibold text-indigo-600">{a.target}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{a.time} yang lalu</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
