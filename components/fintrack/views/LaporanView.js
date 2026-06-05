"use client";
import { useState } from "react";

const monthly = [
  { bulan: "Jan", pemasukan: 12000000, pengeluaran: 8500000 },
  { bulan: "Feb", pemasukan: 14500000, pengeluaran: 9200000 },
  { bulan: "Mar", pemasukan: 11000000, pengeluaran: 10100000 },
  { bulan: "Apr", pemasukan: 16000000, pengeluaran: 8800000 },
  { bulan: "Mei", pemasukan: 15000000, pengeluaran: 9400000 },
  { bulan: "Jun", pemasukan: 15500000, pengeluaran: 8750000 },
];

const kategori = [
  { nama: "Makanan & Minuman", jumlah: 1450000, pct: 28, color: "#f97316", glow: "rgba(249,115,22,0.3)" },
  { nama: "Belanja",           jumlah: 1200000, pct: 23, color: "#3b82f6", glow: "rgba(59,130,246,0.3)" },
  { nama: "Lainnya",           jumlah: 650000,  pct: 13, color: "#6b7280", glow: "rgba(107,114,128,0.2)" },
  { nama: "Transportasi",      jumlah: 620000,  pct: 12, color: "#8b5cf6", glow: "rgba(139,92,246,0.3)" },
  { nama: "Utilitas",          jumlah: 450000,  pct: 9,  color: "#eab308", glow: "rgba(234,179,8,0.3)" },
  { nama: "Hiburan",           jumlah: 380000,  pct: 7,  color: "#ec4899", glow: "rgba(236,72,153,0.3)" },
];

const g = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(52,211,153,0.12)" };
const fmt = (n) => `Rp ${(n / 1000000).toFixed(1)}jt`;
const fmtFull = (n) => `Rp ${n.toLocaleString("id")}`;

export default function LaporanView() {
  const [hover, setHover] = useState(null);
  const totalP = monthly.reduce((s, m) => s + m.pemasukan, 0);
  const totalK = monthly.reduce((s, m) => s + m.pengeluaran, 0);
  const tabungan = totalP - totalK;
  const savingsRate = Math.round((tabungan / totalP) * 100);
  const maxVal = Math.max(...monthly.map(m => m.pemasukan));
  const avgP = Math.round(totalP / monthly.length);
  const avgK = Math.round(totalK / monthly.length);

  return (
    <div className="space-y-5">

      {/* ── Hero stats ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Pemasukan", sub: "6 bulan terakhir", val: totalP, color: "#10b981", icon: "📈", change: "+8.2%" },
          { label: "Total Pengeluaran", sub: "6 bulan terakhir", val: totalK, color: "#f87171", icon: "📉", change: "+3.1%" },
          { label: "Net Tabungan", sub: `${savingsRate}% saving rate`, val: tabungan, color: "#60a5fa", icon: "🏦", change: "+22.4%" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 relative overflow-hidden" style={g}>
            <div className="absolute inset-0 opacity-5" style={{ background: `radial-gradient(circle at top right, ${s.color}, transparent 70%)` }} />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: `${s.color}18`, color: s.color }}>{s.change}</span>
              </div>
              <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{fmt(s.val)}</div>
              <div className="text-xs font-semibold mb-0.5" style={{ color: "rgba(226,232,240,0.8)" }}>{s.label}</div>
              <div className="text-xs" style={{ color: "rgba(148,163,184,0.5)" }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* ── Bar chart ── */}
        <div className="lg:col-span-3 rounded-2xl p-6" style={g}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-sm" style={{ color: "#e2e8f0" }}>Cashflow Bulanan</h3>
              <p className="text-xs mt-0.5" style={{ color: "rgba(52,211,153,0.5)" }}>Rata-rata: {fmt(avgP)} masuk · {fmt(avgK)} keluar</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981" }}>
              📥 Export
            </button>
          </div>

          <div className="flex items-end gap-2 mb-3" style={{ height: "160px" }}>
            {monthly.map((m, i) => {
              const isHovered = hover === i;
              return (
                <div key={m.bulan} className="flex-1 flex flex-col items-center gap-1 cursor-pointer"
                  onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                  {isHovered && (
                    <div className="text-center mb-1 px-2 py-1 rounded-lg text-xs" style={{ background: "rgba(255,255,255,0.08)", color: "#e2e8f0", whiteSpace: "nowrap" }}>
                      <div style={{ color: "#10b981" }}>{fmt(m.pemasukan)}</div>
                      <div style={{ color: "#f87171" }}>{fmt(m.pengeluaran)}</div>
                    </div>
                  )}
                  <div className="w-full flex gap-1 items-end" style={{ height: "130px" }}>
                    <div className="flex-1 rounded-t-md transition-all duration-200"
                      style={{
                        height: `${(m.pemasukan / maxVal) * 100}%`,
                        background: isHovered
                          ? "linear-gradient(to top, #10b981, #34d399)"
                          : "linear-gradient(to top, #10b981, rgba(16,185,129,0.4))",
                        boxShadow: isHovered ? "0 0 12px rgba(16,185,129,0.5)" : "0 0 6px rgba(16,185,129,0.2)",
                      }} />
                    <div className="flex-1 rounded-t-md transition-all duration-200"
                      style={{
                        height: `${(m.pengeluaran / maxVal) * 100}%`,
                        background: isHovered
                          ? "linear-gradient(to top, #ef4444, #f87171)"
                          : "linear-gradient(to top, #ef4444, rgba(239,68,68,0.3))",
                        boxShadow: isHovered ? "0 0 12px rgba(239,68,68,0.4)" : "0 0 4px rgba(239,68,68,0.15)",
                      }} />
                  </div>
                  <span className="text-xs" style={{ color: isHovered ? "#e2e8f0" : "rgba(148,163,184,0.4)" }}>{m.bulan}</span>
                </div>
              );
            })}
          </div>

          <div className="flex gap-5 text-xs">
            <span className="flex items-center gap-1.5" style={{ color: "#10b981" }}><span className="w-3 h-1.5 rounded inline-block bg-emerald-500" /> Pemasukan</span>
            <span className="flex items-center gap-1.5" style={{ color: "#f87171" }}><span className="w-3 h-1.5 rounded inline-block bg-red-500" /> Pengeluaran</span>
          </div>
        </div>

        {/* ── Savings ring ── */}
        <div className="lg:col-span-2 rounded-2xl p-6 flex flex-col" style={g}>
          <h3 className="font-bold text-sm mb-5" style={{ color: "#e2e8f0" }}>Saving Rate</h3>

          {/* Ring chart (CSS) */}
          <div className="flex items-center justify-center mb-5">
            <div className="relative" style={{ width: 120, height: 120 }}>
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(52,211,153,0.1)" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none" stroke="url(#grad)" strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - savingsRate / 100)}`}
                  strokeLinecap="round" />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black" style={{ color: "#10b981" }}>{savingsRate}%</span>
                <span className="text-xs" style={{ color: "rgba(148,163,184,0.5)" }}>saved</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            {[
              { label: "Rata-rata Masuk/bln", val: avgP, color: "#10b981" },
              { label: "Rata-rata Keluar/bln", val: avgK, color: "#f87171" },
              { label: "Rata-rata Tabungan/bln", val: avgP - avgK, color: "#60a5fa" },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2"
                style={{ borderBottom: "1px solid rgba(52,211,153,0.08)" }}>
                <span className="text-xs" style={{ color: "rgba(148,163,184,0.6)" }}>{item.label}</span>
                <span className="text-xs font-bold" style={{ color: item.color }}>{fmt(item.val)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Category breakdown ── */}
      <div className="rounded-2xl p-6" style={g}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-sm" style={{ color: "#e2e8f0" }}>Breakdown Pengeluaran</h3>
            <p className="text-xs mt-0.5" style={{ color: "rgba(148,163,184,0.5)" }}>Total: {fmtFull(totalK / 6)} / bulan</p>
          </div>
          <div className="flex gap-2">
            {kategori.slice(0, 3).map(k => (
              <span key={k.nama} className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: `${k.color}18`, color: k.color }}>{k.pct}%</span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {kategori.map((k, i) => (
            <div key={k.nama} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: k.color, boxShadow: `0 0 6px ${k.glow}` }} />
                  <span className="text-sm" style={{ color: "rgba(226,232,240,0.8)" }}>{k.nama}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold" style={{ color: k.color }}>{k.pct}%</span>
                  <span className="text-xs font-bold" style={{ color: "rgba(226,232,240,0.6)" }}>{fmtFull(k.jumlah)}</span>
                </div>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                <div className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${k.pct}%`, background: `linear-gradient(to right, ${k.color}, ${k.color}80)`, boxShadow: `0 0 8px ${k.glow}` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Total bar */}
        <div className="mt-5 pt-4" style={{ borderTop: "1px solid rgba(52,211,153,0.1)" }}>
          <div className="flex justify-between text-xs mb-2" style={{ color: "rgba(148,163,184,0.5)" }}>
            <span>Total Pengeluaran Bulan Ini</span>
            <span style={{ color: "#f87171", fontWeight: 700 }}>{fmtFull(monthly[5].pengeluaran)}</span>
          </div>
          <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            <div className="h-full rounded-full" style={{ width: `${Math.round((monthly[5].pengeluaran / monthly[5].pemasukan) * 100)}%`, background: "linear-gradient(to right, #ef4444, #f87171)", boxShadow: "0 0 8px rgba(239,68,68,0.3)" }} />
          </div>
          <div className="flex justify-between text-xs mt-1.5" style={{ color: "rgba(148,163,184,0.4)" }}>
            <span>0</span>
            <span>{Math.round((monthly[5].pengeluaran / monthly[5].pemasukan) * 100)}% dari pemasukan</span>
            <span>{fmt(monthly[5].pemasukan)}</span>
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
          <div key={item.title} className="rounded-2xl p-5" style={g}>
            <div className="text-2xl mb-3">{item.icon}</div>
            <div className="text-sm font-bold mb-1" style={{ color: item.color }}>{item.title}</div>
            <div className="text-xs mb-2" style={{ color: "rgba(148,163,184,0.5)" }}>{item.desc}</div>
            <div className="text-xs font-black" style={{ color: "rgba(226,232,240,0.8)" }}>{item.val}</div>
          </div>
        ))}
      </div>

    </div>
  );
}
