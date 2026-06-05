"use client";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "▦" },
  { id: "projects", label: "Projects", icon: "📁" },
  { id: "tasks", label: "Tasks", icon: "✅" },
  { id: "team", label: "Team", icon: "👥" },
];

export default function TopBar({ active, setActive }) {
  return (
    <header className="bg-white border-b border-slate-200 flex-shrink-0 sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 h-14">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-xs">T</div>
            <span className="font-bold text-slate-800 text-base">Coderaft TaskFlow</span>
          </div>
          {/* Nav tabs */}
          <nav className="flex items-center gap-1">
            {navItems.map(n => (
              <button key={n.id} onClick={() => setActive(n.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  active === n.id
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                }`}>
                <span className="text-xs">{n.icon}</span>
                {n.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors">
            + New
          </button>
          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-xs font-bold">PM</div>
        </div>
      </div>
    </header>
  );
}
