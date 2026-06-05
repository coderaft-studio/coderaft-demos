"use client";
import { useState } from "react";

const g = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(52,211,153,0.12)" };

const budgetColors = [
  { color: "#f97316", bg: "rgba(249,115,22,0.15)",  glow: "rgba(249,115,22,0.3)"  },
  { color: "#3b82f6", bg: "rgba(59,130,246,0.15)",  glow: "rgba(59,130,246,0.3)"  },
  { color: "#eab308", bg: "rgba(234,179,8,0.15)",   glow: "rgba(234,179,8,0.3)"   },
  { color: "#a855f7", bg: "rgba(168,85,247,0.15)",  glow: "rgba(168,85,247,0.3)"  },
  { color: "#10b981", bg: "rgba(16,185,129,0.15)",  glow: "rgba(16,185,129,0.3)"  },
  { color: "#ec4899", bg: "rgba(236,72,153,0.15)",  glow: "rgba(236,72,153,0.3)"  },
];

const initBudgets = [
  { id: 1, nama: "Makanan & Minuman", limit: 2000000, terpakai: 1450000, icon: "🍽" },
  { id: 2, nama: "Transportasi",      limit: 800000,  terpakai: 620000,  icon: "🚗" },
  { id: 3, nama: "Utilitas",          limit: 600000,  terpakai: 450000,  icon: "💡" },
  { id: 4, nama: "Hiburan",           limit: 500000,  terpakai: 380000,  icon: "🎬" },
  { id: 5, nama: "Kesehatan",         limit: 1000000, terpakai: 200000,  icon: "🏥" },
];

const fmt  = (n) => `Rp ${n.toLocaleString("id")}`;
const fmtM = (n) => `Rp ${(n/1000000).toFixed(1)}jt`;

export default function BudgetView() {
  const [budgets, setBudgets] = useState(initBudgets);
  const [modal, setModal]     = useState(null);
  const [form, setForm]       = useState({ nama: "", limit: "", icon: "💰" });
  const [spendModal, setSpendModal] = useState(null); // tambah pengeluaran ke budget
  const [spendAmt, setSpendAmt]     = useState("");

  const totalLimit    = budgets.reduce((s, b) => s + b.limit, 0);
  const totalTerpakai = budgets.reduce((s, b) => s + b.terpakai, 0);
  const totalSisa     = totalLimit - totalTerpakai;
  const overallPct    = Math.round((totalTerpakai / totalLimit) * 100);

  const save = (e) => {
    e.preventDefault();
    const idx = modal === "add" ? budgets.length : budgets.findIndex(b => b.id === modal.edit);
    const clr = budgetColors[idx % budgetColors.length];
    if (modal === "add") {
      setBudgets([...budgets, { id: Date.now(), nama: form.nama, limit: Number(form.limit), terpakai: 0, icon: form.icon, colorIdx: idx }]);
    } else {
      setBudgets(budgets.map(b => b.id === modal.edit ? { ...b, nama: form.nama, limit: Number(form.limit), icon: form.icon } : b));
    }
    setModal(null);
  };

  const addSpend = (e) => {
    e.preventDefault();
    const amt = Number(spendAmt);
    if (amt > 0) {
      setBudgets(budgets.map(b => b.id === spendModal.id ? { ...b, terpakai: Math.min(b.limit, b.terpakai + amt) } : b));
    }
    setSpendModal(null);
    setSpendAmt("");
  };

  const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white";

  return (
    <div className="space-y-5">

      {/* ── Hero overview ── */}
      <div className="rounded-2xl p-6" style={g}>
        <div className="flex flex-wrap items-center justify-between gap-5 mb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "rgba(52,211,153,0.6)" }}>Budget Bulan Ini</p>
            <div className="text-3xl font-black" style={{ color: "#10b981" }}>{fmtM(totalLimit)}</div>
          </div>
          <div className="flex gap-6">
            {[
              { label: "Terpakai",  val: fmtM(totalTerpakai), color: "#f87171" },
              { label: "Sisa",      val: fmtM(totalSisa),     color: "#10b981" },
              { label: "Kategori",  val: budgets.length,      color: "#60a5fa" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-xl font-black" style={{ color: s.color }}>{s.val}</div>
                <div className="text-xs" style={{ color: "rgba(148,163,184,0.5)" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <button onClick={() => { setForm({ nama: "", limit: "", icon: "💰" }); setModal("add"); }}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
            + Kategori
          </button>
        </div>

        {/* Overall progress bar */}
        <div>
          <div className="flex justify-between text-xs mb-2" style={{ color: "rgba(226,232,240,0.7)" }}>
            <span>Total pengeluaran dari budget</span>
            <span className="font-black" style={{ color: overallPct > 80 ? "#f87171" : "#10b981" }}>{overallPct}%</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div className="h-full rounded-full transition-all"
              style={{ width: `${overallPct}%`, background: overallPct > 80 ? "linear-gradient(to right,#ef4444,#f97316)" : "linear-gradient(to right,#10b981,#34d399)" }} />
          </div>
          <div className="flex justify-between text-xs mt-1.5" style={{ color: "rgba(148,163,184,0.4)" }}>
            <span>0</span><span>{fmt(totalTerpakai)} dari {fmt(totalLimit)}</span>
          </div>
        </div>
      </div>

      {/* ── Budget cards ── */}
      <div className="grid sm:grid-cols-2 gap-4">
        {budgets.map((b, i) => {
          const ci   = b.colorIdx ?? i;
          const clr  = budgetColors[ci % budgetColors.length];
          const pct  = Math.min(100, Math.round((b.terpakai / b.limit) * 100));
          const sisa = Math.max(0, b.limit - b.terpakai);
          const status = pct >= 90 ? "danger" : pct >= 70 ? "warning" : "safe";
          const barClr = status === "danger" ? "#ef4444" : status === "warning" ? "#f59e0b" : clr.color;

          return (
            <div key={b.id} className="rounded-2xl overflow-hidden transition-all hover:scale-[1.01] hover:shadow-xl group"
              style={{ ...g, borderLeft: `3px solid ${clr.color}` }}>

              {/* Card header */}
              <div className="p-5 pb-3">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: clr.bg, boxShadow: `0 0 16px ${clr.glow}` }}>
                      {b.icon}
                    </div>
                    <div>
                      <div className="font-bold text-sm" style={{ color: "#e2e8f0" }}>{b.nama}</div>
                      <div className="text-xs" style={{ color: "rgba(148,163,184,0.5)" }}>
                        Limit: <span style={{ color: clr.color }}>{fmtM(b.limit)}</span>
                      </div>
                    </div>
                  </div>
                  {/* Status badge */}
                  <span className="text-xs font-black px-2.5 py-1 rounded-full flex-shrink-0"
                    style={status === "danger"
                      ? { background: "rgba(239,68,68,0.15)", color: "#f87171" }
                      : status === "warning"
                      ? { background: "rgba(245,158,11,0.15)", color: "#fbbf24" }
                      : { background: "rgba(16,185,129,0.12)", color: "#34d399" }}>
                    {status === "danger" ? "⚠ Hampir Habis" : status === "warning" ? "⚡ Waspada" : "✓ Aman"}
                  </span>
                </div>

                {/* Big numbers row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Terpakai",  val: fmtM(b.terpakai), color: status === "danger" ? "#f87171" : "#f59e0b" },
                    { label: "Sisa",      val: fmtM(sisa),        color: "#34d399" },
                    { label: "Pct",       val: `${pct}%`,         color: barClr },
                  ].map(s => (
                    <div key={s.label} className="text-center py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                      <div className="text-base font-black" style={{ color: s.color }}>{s.val}</div>
                      <div className="text-xs" style={{ color: "rgba(148,163,184,0.4)" }}>{s.label === "Pct" ? "digunakan" : s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="h-3 rounded-full overflow-hidden mb-1" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, background: barClr, boxShadow: `0 0 8px ${clr.glow}` }} />
                </div>
                <div className="flex justify-between text-xs" style={{ color: "rgba(148,163,184,0.35)" }}>
                  <span>0</span><span>{fmt(b.limit)}</span>
                </div>
              </div>

              {/* Action strip */}
              <div className="flex border-t" style={{ borderColor: "rgba(52,211,153,0.08)" }}>
                <button onClick={() => { setSpendModal(b); setSpendAmt(""); }}
                  className="flex-1 py-3 text-xs font-bold transition-all hover:opacity-80"
                  style={{ color: clr.color, background: clr.bg }}>
                  + Tambah Pengeluaran
                </button>
                <div className="w-px" style={{ background: "rgba(52,211,153,0.08)" }} />
                <button onClick={() => { setForm({ nama: b.nama, limit: String(b.limit), icon: b.icon }); setModal({ edit: b.id }); }}
                  className="px-4 py-3 text-xs font-bold transition-all"
                  style={{ color: "rgba(148,163,184,0.6)", background: "transparent" }}>Edit</button>
                <button onClick={() => setBudgets(budgets.filter(x => x.id !== b.id))}
                  className="px-4 py-3 text-xs font-bold transition-all"
                  style={{ color: "rgba(239,68,68,0.6)", background: "transparent" }}>Hapus</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Add/Edit Modal ── */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()} style={{ color: "#1e293b" }}>
            <div className="px-6 py-4 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>
              <div className="flex items-center gap-3 text-white">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg">🎯</div>
                <div>
                  <div className="font-bold">{modal === "add" ? "Tambah" : "Edit"} Kategori Budget</div>
                  <div className="text-white/70 text-xs">{modal !== "add" && form.nama}</div>
                </div>
              </div>
              <button onClick={() => setModal(null)} className="text-white/70 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-6">
              <form onSubmit={save} className="space-y-4">
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">Nama Kategori *</label>
                  <input required value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="cth: Makanan" className={inputCls} /></div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2"><label className="block text-xs font-semibold text-slate-500 mb-1">Limit Budget (Rp) *</label>
                    <input required type="number" value={form.limit} onChange={e => setForm({ ...form, limit: e.target.value })} placeholder="0" className={inputCls} /></div>
                  <div><label className="block text-xs font-semibold text-slate-500 mb-1">Ikon</label>
                    <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className={`${inputCls} text-center text-xl`} /></div>
                </div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setModal(null)} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold text-sm hover:bg-slate-50">Batal</button>
                  <button type="submit" className="flex-1 text-white py-3 rounded-xl font-bold text-sm"
                    style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Quick Spend Modal ── */}
      {spendModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSpendModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()} style={{ color: "#1e293b" }}>
            <div className="px-6 py-5 text-center" style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>
              <div className="text-4xl mb-2">{spendModal.icon}</div>
              <div className="text-white font-bold">{spendModal.nama}</div>
              <div className="text-white/70 text-sm">Sisa budget: {fmt(Math.max(0, spendModal.limit - spendModal.terpakai))}</div>
            </div>
            <div className="p-6">
              <form onSubmit={addSpend} className="space-y-4">
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">Jumlah Pengeluaran (Rp)</label>
                  <input required type="number" value={spendAmt} onChange={e => setSpendAmt(e.target.value)} placeholder="0"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 bg-white" /></div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setSpendModal(null)} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold text-sm hover:bg-slate-50">Batal</button>
                  <button type="submit" className="flex-1 text-white py-3 rounded-xl font-bold text-sm"
                    style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}>Tambahkan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
