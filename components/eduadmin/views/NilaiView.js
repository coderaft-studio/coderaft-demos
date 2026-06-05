"use client";
import { useState, useMemo } from "react";

const mapelList = ["Matematika", "Fisika", "Kimia", "Biologi", "B. Indonesia", "B. Inggris"];
const mapelIkon = { Matematika: "➗", Fisika: "⚛️", Kimia: "🧪", Biologi: "🌿", "B. Indonesia": "📖", "B. Inggris": "🌐" };

const initData = [
  { id: 1, nis: "2024001", nama: "Rini Handayani", kelas: "10 IPA 1", grad: "linear-gradient(135deg,#6366f1,#8b5cf6)", nilai: { Matematika: 92, Fisika: 88, Kimia: 85, Biologi: 90, "B. Indonesia": 87, "B. Inggris": 94 } },
  { id: 2, nis: "2024002", nama: "Budi Prasetyo",   kelas: "10 IPA 2", grad: "linear-gradient(135deg,#3b82f6,#06b6d4)", nilai: { Matematika: 78, Fisika: 82, Kimia: 79, Biologi: 75, "B. Indonesia": 83, "B. Inggris": 80 } },
  { id: 3, nis: "2024003", nama: "Sinta Maharani",  kelas: "11 IPS 1", grad: "linear-gradient(135deg,#ec4899,#f43f5e)", nilai: { Matematika: 70, Fisika: 72, Kimia: 68, Biologi: 74, "B. Indonesia": 88, "B. Inggris": 85 } },
  { id: 4, nis: "2024004", nama: "Ahmad Rizky",     kelas: "11 IPA 1", grad: "linear-gradient(135deg,#10b981,#059669)", nilai: { Matematika: 95, Fisika: 93, Kimia: 90, Biologi: 88, "B. Indonesia": 82, "B. Inggris": 87 } },
  { id: 5, nis: "2024005", nama: "Dewi Kusuma",     kelas: "10 IPA 1", grad: "linear-gradient(135deg,#f59e0b,#f97316)", nilai: { Matematika: 84, Fisika: 79, Kimia: 81, Biologi: 86, "B. Indonesia": 90, "B. Inggris": 88 } },
];

const rataRata = (nilai) => Math.round(Object.values(nilai).reduce((s, v) => s + v, 0) / Object.keys(nilai).length);
const gradeOf  = (v) => v >= 90 ? "A" : v >= 75 ? "B" : v >= 60 ? "C" : "D";

const gradeStyle = {
  A: { bg: "rgba(16,185,129,0.12)", text: "#059669", border: "rgba(16,185,129,0.3)" },
  B: { bg: "rgba(99,102,241,0.12)", text: "#4338ca", border: "rgba(99,102,241,0.3)" },
  C: { bg: "rgba(245,158,11,0.12)", text: "#b45309", border: "rgba(245,158,11,0.3)" },
  D: { bg: "rgba(239,68,68,0.12)", text: "#dc2626", border: "rgba(239,68,68,0.3)" },
};

export default function NilaiView() {
  const [data, setData]           = useState(initData);
  const [editing, setEditing]     = useState(false);
  const [filterKelas, setFilter]  = useState("Semua");
  const [activeMapel, setMapel]   = useState("Semua");
  const [view, setView]           = useState("table");   // "table" | "card"
  const [saved, setSaved]         = useState(false);
  const [detail, setDetail]       = useState(null);

  const kelasOpts = ["Semua", ...new Set(data.map(d => d.kelas))];
  const filtered  = useMemo(() => {
    return filterKelas === "Semua" ? data : data.filter(d => d.kelas === filterKelas);
  }, [data, filterKelas]);

  const updateNilai = (id, mp, val) => {
    setData(data.map(s => s.id === id ? { ...s, nilai: { ...s.nilai, [mp]: Math.min(100, Math.max(0, Number(val) || 0)) } } : s));
    setSaved(false);
  };

  const handleSave = () => { setEditing(false); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  // Stats
  const allValues  = filtered.flatMap(s => Object.values(s.nilai));
  const avgAll     = Math.round(allValues.reduce((a, b) => a + b, 0) / allValues.length);
  const mapelAvg   = mapelList.map(m => ({ m, avg: Math.round(filtered.reduce((s, d) => s + (d.nilai[m] || 0), 0) / Math.max(1, filtered.length)) }));
  const bestMapel  = mapelAvg.reduce((a, b) => a.avg > b.avg ? a : b);
  const worstMapel = mapelAvg.reduce((a, b) => a.avg < b.avg ? a : b);
  const gradeCount = { A: 0, B: 0, C: 0, D: 0 };
  filtered.forEach(s => { gradeCount[gradeOf(rataRata(s.nilai))]++; });

  const shownMapel = activeMapel === "Semua" ? mapelList : [activeMapel];

  const inputCls = "w-14 text-center rounded-lg py-1.5 text-sm font-bold outline-none transition-all focus:ring-2 focus:ring-violet-300 text-slate-800 bg-white";

  return (
    <div className="space-y-5">
      {/* ── Stats banner ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Rata-rata Kelas", val: avgAll, sub: gradeOf(avgAll) + " · " + filtered.length + " siswa", color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
          { label: "Nilai Tertinggi", val: Math.max(...filtered.map(s => rataRata(s.nilai))), sub: filtered.find(s => rataRata(s.nilai) === Math.max(...filtered.map(s => rataRata(s.nilai))))?.nama?.split(" ")[0], color: "#10b981", bg: "rgba(16,185,129,0.1)" },
          { label: "Mapel Terbaik", val: bestMapel.avg, sub: bestMapel.m, color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
          { label: "Perlu Perhatian", val: worstMapel.avg, sub: worstMapel.m, color: "#ef4444", bg: "rgba(239,68,68,0.1)" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <div className="text-xs text-slate-400 mb-2">{s.label}</div>
            <div className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.val}</div>
            <div className="text-xs font-semibold" style={{ color: s.color }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Grade distribution bar ── */}
      <div className="rounded-2xl p-5"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-slate-700">Distribusi Nilai</span>
          <span className="text-xs text-slate-400">{filtered.length} siswa</span>
        </div>
        <div className="flex h-8 rounded-xl overflow-hidden gap-0.5">
          {["A","B","C","D"].map(g => {
            const pct = Math.round((gradeCount[g] / Math.max(1, filtered.length)) * 100);
            const s = gradeStyle[g];
            return pct > 0 ? (
              <div key={g} className="flex items-center justify-center text-xs font-black transition-all rounded-lg"
                style={{ width: `${pct}%`, background: s.bg, color: s.text, border: `1px solid ${s.border}` }}>
                {pct > 10 ? `${g} ${gradeCount[g]}` : ""}
              </div>
            ) : null;
          })}
        </div>
        <div className="flex gap-4 mt-3 text-xs text-slate-500">
          {["A","B","C","D"].map(g => {
            const s = gradeStyle[g];
            const label = { A: "A (90–100)", B: "B (75–89)", C: "C (60–74)", D: "D (<60)" }[g];
            return (
              <span key={g} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: s.bg, border: `1px solid ${s.border}` }} />
                {label} · <span className="font-bold" style={{ color: s.text }}>{gradeCount[g]}</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="rounded-2xl p-4 flex flex-wrap gap-3 items-center justify-between"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <div className="flex gap-2 flex-wrap">
          {kelasOpts.map(k => (
            <button key={k} onClick={() => setFilter(k)}
              className="px-3 py-2 rounded-xl text-xs font-bold transition-all"
              style={filterKelas === k ? { background: "#6366f1", color: "#fff" } : { background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
              {k}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            {[{ v: "table", icon: "☰" }, { v: "card", icon: "⊞" }].map(t => (
              <button key={t.v} onClick={() => setView(t.v)}
                className="w-8 h-8 rounded-lg text-sm transition-all"
                style={view === t.v ? { background: "#6366f1", color: "#fff" } : { color: "#94a3b8" }}>
                {t.icon}
              </button>
            ))}
          </div>
          {!editing ? (
            <button onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all hover:shadow-md"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              ✏️ Edit Nilai
            </button>
          ) : (
            <>
              <button onClick={handleSave} className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors">
                💾 Simpan
              </button>
              <button onClick={() => setEditing(false)} className="text-slate-600 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 transition-colors">
                Batal
              </button>
            </>
          )}
          {saved && (
            <span className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl"
              style={{ background: "rgba(16,185,129,0.1)", color: "#059669" }}>
              ✓ Tersimpan
            </span>
          )}
        </div>
      </div>

      {/* ── Mapel filter tabs (only in table mode) ── */}
      {view === "table" && (
        <div className="flex gap-2 flex-wrap">
          {["Semua", ...mapelList].map(m => (
            <button key={m} onClick={() => setMapel(m)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
              style={activeMapel === m
                ? { background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff" }
                : { background: "rgba(255,255,255,0.8)", color: "#64748b", border: "1px solid rgba(148,163,184,0.2)" }}>
              {m !== "Semua" && <span>{mapelIkon[m]}</span>} {m}
            </button>
          ))}
        </div>
      )}

      {/* ── TABLE VIEW ── */}
      {view === "table" && (
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid rgba(255,255,255,0.6)" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ background: "rgba(99,102,241,0.06)" }}>
                <tr>
                  <th className="text-left px-5 py-4 text-xs font-bold text-violet-600 uppercase tracking-wide sticky left-0" style={{ background: "rgba(99,102,241,0.06)" }}>
                    Siswa
                  </th>
                  {shownMapel.map(m => (
                    <th key={m} className="px-3 py-4 text-xs font-bold text-violet-600 text-center">
                      <div>{mapelIkon[m]}</div>
                      <div className="mt-0.5 whitespace-nowrap">{m}</div>
                    </th>
                  ))}
                  <th className="px-5 py-4 text-xs font-bold text-violet-600 text-center">Rata-rata</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => {
                  const avg  = rataRata(s.nilai);
                  const gs   = gradeStyle[gradeOf(avg)];
                  return (
                    <tr key={s.id} className="border-t hover:bg-violet-50/30 transition-colors cursor-pointer"
                      style={{ borderColor: "rgba(99,102,241,0.08)" }}
                      onClick={() => !editing && setDetail(s)}>
                      <td className="px-5 py-4 sticky left-0 bg-white">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: s.grad }}>
                            {s.nama.split(" ").map(w => w[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 text-sm">{s.nama}</div>
                            <div className="text-xs text-slate-400">{s.kelas}</div>
                          </div>
                        </div>
                      </td>
                      {shownMapel.map(m => {
                        const v  = s.nilai[m] || 0;
                        const gs = gradeStyle[gradeOf(v)];
                        return (
                          <td key={m} className="px-3 py-4 text-center" onClick={e => editing && e.stopPropagation()}>
                            {editing ? (
                              <input type="number" min="0" max="100" value={v}
                                onChange={e => updateNilai(s.id, m, e.target.value)}
                                className={inputCls}
                                style={{ border: `1px solid ${gs.border}`, color: gs.text }} />
                            ) : (
                              <div className="inline-flex flex-col items-center gap-0.5">
                                <span className="text-base font-black" style={{ color: gs.text }}>{v}</span>
                                <span className="text-xs font-bold px-1.5 rounded" style={{ background: gs.bg, color: gs.text }}>{gradeOf(v)}</span>
                              </div>
                            )}
                          </td>
                        );
                      })}
                      <td className="px-5 py-4 text-center">
                        <div className="inline-flex flex-col items-center gap-1">
                          <span className="text-xl font-black" style={{ color: gs.text }}>{avg}</span>
                          <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: gs.bg, color: gs.text }}>
                            Grade {gradeOf(avg)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {/* Rata-rata baris */}
                <tr className="border-t" style={{ borderColor: "rgba(99,102,241,0.15)", background: "rgba(99,102,241,0.04)" }}>
                  <td className="px-5 py-3 sticky left-0 font-bold text-xs text-violet-600 uppercase tracking-wide" style={{ background: "rgba(99,102,241,0.04)" }}>
                    Rata-rata Kelas
                  </td>
                  {shownMapel.map(m => {
                    const avg = Math.round(filtered.reduce((s, d) => s + (d.nilai[m] || 0), 0) / Math.max(1, filtered.length));
                    const gs  = gradeStyle[gradeOf(avg)];
                    return (
                      <td key={m} className="px-3 py-3 text-center">
                        <span className="text-sm font-black" style={{ color: gs.text }}>{avg}</span>
                      </td>
                    );
                  })}
                  <td className="px-5 py-3 text-center">
                    <span className="text-sm font-black" style={{ color: gradeStyle[gradeOf(avgAll)].text }}>{avgAll}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── CARD VIEW ── */}
      {view === "card" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(s => {
            const avg = rataRata(s.nilai);
            const gs  = gradeStyle[gradeOf(avg)];
            return (
              <div key={s.id} className="rounded-2xl overflow-hidden transition-all hover:shadow-xl"
                style={{ background: "rgba(255,255,255,0.9)", border: editing ? "2px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                {/* Card header */}
                <div className="h-24 relative flex items-center px-5 gap-4" style={{ background: s.grad }}>
                  <div className="absolute inset-0 bg-black/15" />
                  {editing && (
                    <div className="absolute top-2 left-2 z-10 bg-white/90 text-violet-600 text-xs font-bold px-2 py-1 rounded-lg">
                      ✏️ Edit Mode
                    </div>
                  )}
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                    {s.nama.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="relative z-10 flex-1 min-w-0">
                    <div className="text-white font-bold truncate">{s.nama}</div>
                    <div className="text-white/70 text-xs">{s.kelas} · {s.nis}</div>
                  </div>
                  {/* Grade big — realtime saat edit */}
                  <div className="relative z-10 text-right">
                    <div className="text-4xl font-black text-white leading-none">{avg}</div>
                    <div className="text-white/70 text-xs">Grade {gradeOf(avg)}</div>
                  </div>
                </div>

                {/* Nilai per mapel */}
                <div className="p-4">
                  <div className="space-y-2.5">
                    {mapelList.map(m => {
                      const v   = s.nilai[m] || 0;
                      const mgs = gradeStyle[gradeOf(v)];
                      return (
                        <div key={m}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <span>{mapelIkon[m]}</span> {m}
                            </span>
                            {editing ? (
                              /* Input saat mode edit */
                              <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
                                <input
                                  type="number" min="0" max="100" value={v}
                                  onChange={e => updateNilai(s.id, m, e.target.value)}
                                  className="w-14 text-center rounded-lg py-1 text-sm font-black outline-none focus:ring-2 focus:ring-violet-300 text-slate-800 bg-white"
                                  style={{ border: `1.5px solid ${mgs.border}`, color: mgs.text }}
                                />
                                <span className="text-xs px-1.5 py-0.5 rounded font-bold w-6 text-center"
                                  style={{ background: mgs.bg, color: mgs.text }}>{gradeOf(v)}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-black" style={{ color: mgs.text }}>{v}</span>
                                <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: mgs.bg, color: mgs.text }}>{gradeOf(v)}</span>
                              </div>
                            )}
                          </div>
                          <div className="h-1.5 rounded-full" style={{ background: "rgba(148,163,184,0.1)" }}>
                            <div className="h-full rounded-full transition-all" style={{ width: `${v}%`, background: mgs.bg.replace("0.12", "0.6") }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* Detail button — hanya saat bukan edit mode */}
                  {!editing && (
                    <button onClick={() => setDetail(s)}
                      className="mt-3 w-full py-2 rounded-xl text-xs font-bold transition-all"
                      style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
                      Lihat Detail →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Detail / Edit per siswa modal ── */}
      {detail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="h-28 relative flex items-center px-6 gap-4 flex-shrink-0" style={{ background: detail.grad }}>
              <div className="absolute inset-0 bg-black/15" />
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white font-black text-xl border-2 border-white/40">
                {detail.nama.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </div>
              <div className="relative z-10 flex-1">
                <div className="text-white font-black text-lg leading-tight">{detail.nama}</div>
                <div className="text-white/70 text-sm">{detail.kelas} · {detail.nis}</div>
              </div>
              <div className="relative z-10 text-right">
                <div className="text-5xl font-black text-white leading-none">{rataRata(detail.nilai)}</div>
                <div className="text-white/70 text-xs mt-1">Grade {gradeOf(rataRata(detail.nilai))}</div>
              </div>
              <button onClick={() => setDetail(null)} className="absolute top-3 right-3 text-white/60 hover:text-white text-xl z-20">✕</button>
            </div>

            {/* Nilai breakdown */}
            <div className="p-6 overflow-y-auto flex-1">
              <h4 className="text-sm font-bold text-slate-700 mb-4">Nilai Per Mata Pelajaran</h4>
              <div className="space-y-4">
                {mapelList.map(m => {
                  const v   = detail.nilai[m] || 0;
                  const mgs = gradeStyle[gradeOf(v)];
                  return (
                    <div key={m} className="p-3 rounded-xl" style={{ background: mgs.bg.replace("0.12", "0.07") }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                          <span className="text-base">{mapelIkon[m]}</span> {m}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-black" style={{ color: mgs.text }}>{v}</span>
                          <span className="text-sm font-black px-2 py-0.5 rounded-lg" style={{ background: mgs.bg, color: mgs.text }}>
                            {gradeOf(v)}
                          </span>
                        </div>
                      </div>
                      <div className="h-2.5 rounded-full" style={{ background: "rgba(148,163,184,0.15)" }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${v}%`, background: `linear-gradient(to right, ${mgs.text}80, ${mgs.text})` }} />
                      </div>
                      <div className="flex justify-between text-xs mt-1" style={{ color: mgs.text }}>
                        <span>0</span>
                        <span>{v}/100</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex-shrink-0">
              <button onClick={() => setDetail(null)} className="w-full py-3 rounded-xl font-bold text-sm border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {editing && (
        <div className="rounded-2xl p-4 flex items-center gap-3 text-sm"
          style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" }}>
          <span className="text-lg">✏️</span>
          <span className="font-semibold text-violet-700">Mode Edit Aktif</span>
          <span className="text-violet-500">— Klik nilai pada tabel untuk mengubah. Tekan Simpan setelah selesai.</span>
        </div>
      )}
    </div>
  );
}
