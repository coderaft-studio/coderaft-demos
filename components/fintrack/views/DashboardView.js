"use client";
import { useState } from "react";

const g = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(52,211,153,0.12)" };
const fmt = (n) => `Rp ${(n / 1000000).toFixed(1)}jt`;
const fmtFull = (n) => `Rp ${n.toLocaleString("id")}`;

const stats = [
  { label: "Total Saldo", value: "Rp 48.250.000", change: "+12.5%", up: true, icon: "💰" },
  { label: "Pemasukan Bulan Ini", value: "Rp 15.500.000", change: "+8.2%", up: true, icon: "📈" },
  { label: "Pengeluaran Bulan Ini", value: "Rp 8.750.000", change: "+3.1%", up: false, icon: "📉" },
  { label: "Tabungan Bulan Ini", value: "Rp 6.750.000", change: "+22.4%", up: true, icon: "🏦" },
];

const monthly = [
  { m: "Jan", p: 12, k: 8 }, { m: "Feb", p: 14, k: 9 },
  { m: "Mar", p: 11, k: 10 }, { m: "Apr", p: 16, k: 8 },
  { m: "Mei", p: 15, k: 9 }, { m: "Jun", p: 15.5, k: 8.75 },
];

const recent = [
  { desc: "Gaji Bulanan", tgl: "1 Jun", jumlah: 12000000, type: "in" },
  { desc: "Listrik & Air", tgl: "3 Jun", jumlah: 450000, type: "out" },
  { desc: "Freelance Project", tgl: "8 Jun", jumlah: 3500000, type: "in" },
  { desc: "Belanja Bulanan", tgl: "10 Jun", jumlah: 1200000, type: "out" },
];

const kategori = [
  { nama: "Makanan & Minuman", jumlah: 1450000, pct: 28, color: "#f97316" },
  { nama: "Belanja", jumlah: 1200000, pct: 23, color: "#3b82f6" },
  { nama: "Lainnya", jumlah: 650000, pct: 13, color: "#6b7280" },
  { nama: "Transportasi", jumlah: 620000, pct: 12, color: "#8b5cf6" },
  { nama: "Utilitas", jumlah: 450000, pct: 9, color: "#eab308" },
  { nama: "Hiburan", jumlah: 380000, pct: 7, color: "#ec4899" },
];

const savingsRate = 44;
const avgP = 14000000;
const avgK = 9125000;

export default function DashboardView() {
  const [hover, setHover] = useState(null);
  const maxP = Math.max(...monthly.map(b => b.p));

  return (
    <div className="space-y-5">
      {/* ── Stats cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-2xl p-5 hover:border-emerald-500/30 transition-all" style={g}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xs font-bold px-2 py-1 rounded-full"
                style={{ background: s.up ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: s.up ? "#10b981" : "#f87171" }}>
                {s.change}
              </span>
            </div>
            <div className="text-xl font-black mb-1" style={{ color: s.up ? "#10b981" : "#f87171" }}>{s.value}</div>
            <div className="text-xs" style={{ color: "rgba(148,163,184,0.5)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Cashflow chart + Transaksi ── */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl p-6" style={g}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-sm" style={{ color: "#e2e8f0" }}>Cashflow 6 Bulan</h3>
              <p className="text-xs mt-0.5" style={{ color: "rgba(52,211,153,0.5)" }}>Jan–Jun 2026</p>
            </div>
            <span className="font-bold text-sm" style={{ color: "#10b981" }}>+12.5% ↑</span>
          </div>
          <div className="flex items-end gap-2 mb-3" style={{ height: "140px" }}>
            {monthly.map((b, i) => {
              const hov = hover === i;
              return (
                <div key={b.m} className="flex-1 flex flex-col items-center gap-1 cursor-pointer"
                  onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                  {hov && (
                    <div className="text-center px-2 py-1 rounded-lg text-xs mb-1" style={{ background: "rgba(255,255,255,0.08)", whiteSpace: "nowrap" }}>
                      <div style={{ color: "#10b981" }}>+{b.p}jt</div>
                      <div style={{ color: "#f87171" }}>-{b.k}jt</div>
                    </div>
                  )}
                  <div className="w-full flex gap-1 items-end" style={{ height: "110px" }}>
                    <div className="flex-1 rounded-t-md transition-all"
                      style={{ height: `${(b.p / maxP) * 100}%`, background: "linear-gradient(to top, #10b981, rgba(16,185,129,0.3))", boxShadow: hov ? "0 0 12px rgba(16,185,129,0.5)" : "0 0 6px rgba(16,185,129,0.2)" }} />
                    <div className="flex-1 rounded-t-md transition-all"
                      style={{ height: `${(b.k / maxP) * 100}%`, background: "linear-gradient(to top, #ef4444, rgba(239,68,68,0.2))", boxShadow: hov ? "0 0 12px rgba(239,68,68,0.4)" : "0 0 4px rgba(239,68,68,0.15)" }} />
                  </div>
                  <span className="text-xs" style={{ color: hov ? "#e2e8f0" : "rgba(148,163,184,0.4)" }}>{b.m}</span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1.5" style={{ color: "#10b981" }}><span className="w-3 h-1.5 rounded bg-emerald-500 inline-block" /> Pemasukan</span>
            <span className="flex items-center gap-1.5" style={{ color: "#f87171" }}><span className="w-3 h-1.5 rounded bg-red-500 inline-block" /> Pengeluaran</span>
          </div>
        </div>

        <div className="rounded-2xl p-6" style={g}>
          <h3 className="font-bold text-sm mb-5" style={{ color: "#e2e8f0" }}>Transaksi Terbaru</h3>
          <div className="space-y-4">
            {recent.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: r.type === "in" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)", border: `1px solid ${r.type === "in" ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}`, color: r.type === "in" ? "#10b981" : "#f87171" }}>
                  {r.type === "in" ? "↑" : "↓"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: "#e2e8f0" }}>{r.desc}</div>
                  <div className="text-xs" style={{ color: "rgba(148,163,184,0.4)" }}>{r.tgl}</div>
                </div>
                <div className="text-sm font-bold flex-shrink-0" style={{ color: r.type === "in" ? "#10b981" : "#f87171" }}>
                  {r.type === "in" ? "+" : "-"}{(r.jumlah / 1000000).toFixed(1)}jt
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Saving rate + Breakdown ── */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Saving rate ring */}
        <div className="lg:col-span-2 rounded-2xl p-6 flex flex-col" style={g}>
          <h3 className="font-bold text-sm mb-4" style={{ color: "#e2e8f0" }}>Saving Rate</h3>
          <div className="flex items-center justify-center mb-4">
            <div className="relative" style={{ width: 110, height: 110 }}>
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(52,211,153,0.1)" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="url(#g1)" strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - savingsRate / 100)}`}
                  strokeLinecap="round" />
                <defs>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black" style={{ color: "#10b981" }}>{savingsRate}%</span>
                <span className="text-xs" style={{ color: "rgba(148,163,184,0.4)" }}>saved</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 flex-1">
            {[
              { label: "Rata-rata Masuk/bln", val: avgP, color: "#10b981" },
              { label: "Rata-rata Keluar/bln", val: avgK, color: "#f87171" },
              { label: "Rata-rata Tabungan/bln", val: avgP - avgK, color: "#60a5fa" },
            ].map(item => (
              <div key={item.label} className="flex justify-between py-2" style={{ borderBottom: "1px solid rgba(52,211,153,0.08)" }}>
                <span className="text-xs" style={{ color: "rgba(148,163,184,0.5)" }}>{item.label}</span>
                <span className="text-xs font-bold" style={{ color: item.color }}>{fmt(item.val)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expense breakdown */}
        <div className="lg:col-span-3 rounded-2xl p-6" style={g}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-sm" style={{ color: "#e2e8f0" }}>Breakdown Pengeluaran</h3>
              <p className="text-xs mt-0.5" style={{ color: "rgba(148,163,184,0.4)" }}>Bulan Juni 2026</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981" }}>
              📥 Export
            </button>
          </div>
          <div className="space-y-3.5">
            {kategori.map(k => (
              <div key={k.nama}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: k.color, boxShadow: `0 0 5px ${k.color}60` }} />
                    <span className="text-xs" style={{ color: "rgba(226,232,240,0.7)" }}>{k.nama}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold" style={{ color: k.color }}>{k.pct}%</span>
                    <span className="text-xs" style={{ color: "rgba(148,163,184,0.5)" }}>{fmtFull(k.jumlah)}</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                  <div className="h-full rounded-full" style={{ width: `${k.pct}%`, background: `linear-gradient(to right, ${k.color}, ${k.color}60)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Insights ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: "🚀", title: "Bulan Terbaik", desc: "April 2026 — tabungan tertinggi", val: "Rp 7,2jt", color: "#10b981" },
          { icon: "⚠️", title: "Perlu Perhatian", desc: "Makanan & Minuman 28% pengeluaran", val: "Terbesar", color: "#f97316" },
          { icon: "🎯", title: "Target Tabungan", desc: "30% dari pemasukan per bulan", val: `${savingsRate}% / 30%`, color: "#60a5fa" },
        ].map(item => (
          <div key={item.title} className="rounded-2xl p-4" style={g}>
            <div className="text-xl mb-2">{item.icon}</div>
            <div className="text-xs font-bold mb-1" style={{ color: item.color }}>{item.title}</div>
            <div className="text-xs mb-2" style={{ color: "rgba(148,163,184,0.4)" }}>{item.desc}</div>
            <div className="text-xs font-black" style={{ color: "rgba(226,232,240,0.7)" }}>{item.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
