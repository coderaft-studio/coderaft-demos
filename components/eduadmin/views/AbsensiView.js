"use client";
import { useState } from "react";

const statusConfig = {
  Hadir: { bg: "#10b981", light: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.3)", text: "#059669", icon: "✅" },
  Izin:  { bg: "#3b82f6", light: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.3)",  text: "#2563eb", icon: "📋" },
  Sakit: { bg: "#f59e0b", light: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.3)",  text: "#d97706", icon: "🏥" },
  Alpha: { bg: "#ef4444", light: "rgba(239,68,68,0.1)",   border: "rgba(239,68,68,0.3)",   text: "#dc2626", icon: "❌" },
};

const avatarGrads = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#3b82f6,#06b6d4)",
  "linear-gradient(135deg,#ec4899,#f43f5e)",
  "linear-gradient(135deg,#10b981,#059669)",
  "linear-gradient(135deg,#f59e0b,#f97316)",
  "linear-gradient(135deg,#ef4444,#dc2626)",
];

const initData = [
  { id: 1, nis: "2024001", nama: "Rini Handayani",  kelas: "10 IPA 1", status: "Hadir", keterangan: "", riwayat: ["H","H","H","H","H"] },
  { id: 2, nis: "2024002", nama: "Budi Prasetyo",   kelas: "10 IPA 2", status: "Hadir", keterangan: "", riwayat: ["H","H","I","H","H"] },
  { id: 3, nis: "2024003", nama: "Sinta Maharani",  kelas: "11 IPS 1", status: "Izin",  keterangan: "Keperluan keluarga", riwayat: ["H","S","H","H","I"] },
  { id: 4, nis: "2024004", nama: "Ahmad Rizky",     kelas: "11 IPA 1", status: "Hadir", keterangan: "", riwayat: ["H","H","H","H","H"] },
  { id: 5, nis: "2024005", nama: "Dewi Kusuma",     kelas: "10 IPA 1", status: "Sakit", keterangan: "Demam + surat dokter", riwayat: ["H","H","H","S","S"] },
  { id: 6, nis: "2024006", nama: "Hendra Jaya",     kelas: "12 IPA 1", status: "Alpha", keterangan: "", riwayat: ["H","A","H","H","A"] },
  { id: 7, nis: "2024007", nama: "Lina Santoso",    kelas: "12 IPS 1", status: "Hadir", keterangan: "", riwayat: ["H","H","H","I","H"] },
  { id: 8, nis: "2024008", nama: "Fajar Nugroho",   kelas: "10 IPA 2", status: "Hadir", keterangan: "", riwayat: ["H","H","H","H","H"] },
];

const riwayatStyle = { H: "#10b981", I: "#3b82f6", S: "#f59e0b", A: "#ef4444" };
const riwayatLabel = { H: "Hadir", I: "Izin", S: "Sakit", A: "Alpha" };
const kelasOpts = ["Semua", "10 IPA 1", "10 IPA 2", "11 IPS 1", "11 IPA 1", "12 IPA 1", "12 IPS 1"];

export default function AbsensiView() {
  const [data, setData] = useState(initData);
  const [date, setDate] = useState("2026-06-05");
  const [filterKelas, setFilterKelas] = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [ket, setKet] = useState(null);
  const [ketText, setKetText] = useState("");
  const [view, setView] = useState("card");

  const filtered = data.filter(d => {
    const matchKelas  = filterKelas === "Semua" || d.kelas === filterKelas;
    const matchStatus = filterStatus === "Semua" || d.status === filterStatus;
    return matchKelas && matchStatus;
  });

  const count = (s) => data.filter(d => d.status === s).length;
  const pctHadir = Math.round((count("Hadir") / data.length) * 100);

  const updateStatus = (id, newStatus) => setData(data.map(d => d.id === id ? { ...d, status: newStatus } : d));
  const saveKet = () => { setData(data.map(d => d.id === ket.id ? { ...d, keterangan: ketText } : d)); setKet(null); };
  const markAll = (s) => setData(data.map(d => ({ ...d, status: s })));

  const dateLabel = new Date(date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const r = 30, circ = 2 * Math.PI * r;
  const dash = (pctHadir / 100) * circ;

  return (
    <div className="space-y-5">

      {/* ── Hero: Date + Ring + Stats ── */}
      <div className="rounded-2xl p-5 flex flex-wrap gap-5 items-center"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>

        {/* Date picker */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Tanggal Absensi</span>
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 font-semibold" />
          <span className="text-xs text-violet-500 font-medium capitalize">{dateLabel}</span>
        </div>

        {/* Divider */}
        <div className="w-px h-16 bg-slate-200 hidden md:block" />

        {/* Attendance ring */}
        <div className="flex items-center gap-4">
          <div className="relative" style={{ width: 70, height: 70 }}>
            <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
              <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="8" />
              <circle cx="40" cy="40" r={r} fill="none" stroke="#10b981" strokeWidth="8"
                strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-black text-emerald-600 leading-none">{pctHadir}%</span>
              <span className="text-xs text-slate-400">hadir</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {Object.entries(statusConfig).map(([s, c]) => (
              <div key={s} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.bg }} />
                <span className="text-xs text-slate-500">{s}</span>
                <span className="text-sm font-black ml-auto" style={{ color: c.text }}>{count(s)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-16 bg-slate-200 hidden md:block" />

        {/* Quick actions */}
        <div className="flex flex-col gap-2 ml-auto">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Aksi Cepat</span>
          <div className="flex gap-2">
            <button onClick={() => markAll("Hadir")}
              className="px-3 py-2 rounded-xl text-xs font-bold transition-all hover:shadow-md"
              style={{ background: "rgba(16,185,129,0.1)", color: "#059669", border: "1px solid rgba(16,185,129,0.2)" }}>
              ✅ Semua Hadir
            </button>
            <button onClick={() => markAll("Alpha")}
              className="px-3 py-2 rounded-xl text-xs font-bold transition-all hover:shadow-md"
              style={{ background: "rgba(239,68,68,0.1)", color: "#dc2626", border: "1px solid rgba(239,68,68,0.2)" }}>
              ❌ Reset Alpha
            </button>
          </div>
        </div>
      </div>

      {/* ── Toolbar: filter + view toggle ── */}
      <div className="rounded-2xl p-4 flex flex-wrap gap-3 items-center justify-between"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <div className="flex gap-2 flex-wrap">
          {/* Kelas filter */}
          {kelasOpts.map(k => (
            <button key={k} onClick={() => setFilterKelas(k)}
              className="px-3 py-2 rounded-xl text-xs font-bold transition-all"
              style={filterKelas === k ? { background: "#6366f1", color: "#fff" } : { background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
              {k}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          {/* Status filter */}
          {["Semua", ...Object.keys(statusConfig)].map(s => {
            const c = statusConfig[s];
            return (
              <button key={s} onClick={() => setFilterStatus(s)}
                className="px-3 py-2 rounded-xl text-xs font-bold transition-all"
                style={filterStatus === s
                  ? { background: c ? c.bg : "#6366f1", color: "#fff" }
                  : { background: c ? c.light : "rgba(99,102,241,0.08)", color: c ? c.text : "#6366f1", border: `1px solid ${c ? c.border : "rgba(99,102,241,0.2)"}` }}>
                {c ? c.icon : "📋"} {s}
              </button>
            );
          })}
          {/* View toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1 ml-2">
            {[{ v: "card", icon: "⊞" }, { v: "table", icon: "☰" }].map(t => (
              <button key={t.v} onClick={() => setView(t.v)}
                className="w-8 h-8 rounded-lg text-sm transition-all"
                style={view === t.v ? { background: "#6366f1", color: "#fff" } : { color: "#94a3b8" }}>
                {t.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CARD VIEW ── */}
      {view === "card" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((d, i) => {
            const sc   = statusConfig[d.status];
            const grad = avatarGrads[i % avatarGrads.length];
            return (
              <div key={d.id} className="rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "rgba(255,255,255,0.9)", border: `1.5px solid ${sc.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

                {/* Card header */}
                <div className="p-4 flex items-center gap-3" style={{ background: sc.light }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                    style={{ background: grad }}>
                    {d.nama.split(" ").map(w => w[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-800 text-sm truncate">{d.nama}</div>
                    <div className="text-xs text-slate-400">{d.kelas}</div>
                  </div>
                  <div className="text-2xl">{sc.icon}</div>
                </div>

                <div className="p-4">
                  {/* Status toggle buttons */}
                  <div className="grid grid-cols-2 gap-1.5 mb-4">
                    {Object.entries(statusConfig).map(([s, c]) => (
                      <button key={s} onClick={() => updateStatus(d.id, s)}
                        className="py-2 rounded-xl text-xs font-bold transition-all"
                        style={d.status === s
                          ? { background: c.bg, color: "#fff", boxShadow: `0 2px 8px ${c.light}` }
                          : { background: c.light, color: c.text }}>
                        {c.icon} {s}
                      </button>
                    ))}
                  </div>

                  {/* Riwayat 5 hari */}
                  <div className="mb-3">
                    <div className="text-xs text-slate-400 mb-1.5">5 Hari Terakhir</div>
                    <div className="flex gap-1.5">
                      {d.riwayat.map((r, ri) => (
                        <div key={ri} className="flex-1 flex flex-col items-center gap-1"
                          title={riwayatLabel[r]}>
                          <div className="w-full h-6 rounded-md flex items-center justify-center text-white text-xs font-black"
                            style={{ background: riwayatStyle[r] }}>
                            {r}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Keterangan */}
                  {d.keterangan ? (
                    <div className="text-xs p-2.5 rounded-xl mb-3" style={{ background: "rgba(148,163,184,0.08)" }}>
                      <span className="text-slate-400">📝 </span>
                      <span className="text-slate-600">{d.keterangan}</span>
                    </div>
                  ) : null}

                  <button onClick={() => { setKet(d); setKetText(d.keterangan); }}
                    className="w-full py-2 rounded-xl text-xs font-bold transition-all"
                    style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
                    {d.keterangan ? "✏️ Edit Keterangan" : "+ Tambah Keterangan"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── TABLE VIEW ── */}
      {view === "table" && (
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid rgba(255,255,255,0.6)" }}>
          <table className="w-full">
            <thead style={{ background: "rgba(99,102,241,0.06)" }}>
              <tr>{["NIS", "Siswa", "Kelas", "Riwayat 5 Hari", "Status", "Keterangan", "Aksi"].map(h => (
                <th key={h} className="text-left px-5 py-4 text-xs font-bold text-violet-600 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => {
                const sc   = statusConfig[d.status];
                const grad = avatarGrads[i % avatarGrads.length];
                return (
                  <tr key={d.id} className="border-t hover:bg-violet-50/30 transition-colors" style={{ borderColor: "rgba(99,102,241,0.08)" }}>
                    <td className="px-5 py-4 font-mono font-bold text-sm" style={{ color: "#6366f1" }}>{d.nis}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ background: grad }}>
                          {d.nama.split(" ").map(w => w[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{d.nama}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>{d.kelas}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1">
                        {d.riwayat.map((r, ri) => (
                          <div key={ri} className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-black"
                            style={{ background: riwayatStyle[r] }} title={riwayatLabel[r]}>
                            {r}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1 flex-wrap">
                        {Object.entries(statusConfig).map(([s, c]) => (
                          <button key={s} onClick={() => updateStatus(d.id, s)}
                            className="px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all"
                            style={d.status === s
                              ? { background: c.bg, color: "#fff" }
                              : { background: c.light, color: c.text }}>
                            {c.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400 max-w-28 truncate">
                      {d.keterangan || <span className="text-slate-300">—</span>}
                    </td>
                    <td className="px-5 py-4">
                      <button onClick={() => { setKet(d); setKetText(d.keterangan); }}
                        className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors"
                        style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
                        {d.keterangan ? "Edit" : "+ Ket"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="px-5 py-3 text-xs text-slate-400" style={{ borderTop: "1px solid rgba(99,102,241,0.08)" }}>
            {filtered.length} siswa ditampilkan
          </div>
        </div>
      )}

      {/* ── Keterangan Modal ── */}
      {ket && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setKet(null)}>
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Modal header */}
            <div className="px-6 py-4 flex items-center justify-between"
              style={{ background: `linear-gradient(135deg, ${statusConfig[ket.status]?.bg || "#6366f1"}, ${statusConfig[ket.status]?.bg || "#8b5cf6"}90)` }}>
              <div className="flex items-center gap-3 text-white">
                <span className="text-2xl">{statusConfig[ket.status]?.icon || "📝"}</span>
                <div>
                  <div className="font-bold">{ket.nama}</div>
                  <div className="text-white/70 text-xs">{ket.kelas} · Status: {ket.status}</div>
                </div>
              </div>
              <button onClick={() => setKet(null)} className="text-white/70 hover:text-white text-xl transition-colors">✕</button>
            </div>
            <div className="p-6">
              <label className="block text-xs font-semibold text-slate-500 mb-2">Keterangan Ketidakhadiran</label>
              <textarea value={ketText} onChange={e => setKetText(e.target.value)} rows={4}
                placeholder="Contoh: Sakit demam, sudah bawa surat dokter..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 resize-none mb-4 bg-white" />
              {/* Keterangan templates */}
              <div className="flex gap-2 flex-wrap mb-4">
                {["Sakit (surat dokter)", "Izin keluarga", "Keperluan mendadak", "Tidak ada keterangan"].map(t => (
                  <button key={t} onClick={() => setKetText(t)}
                    className="text-xs px-3 py-1.5 rounded-xl transition-all"
                    style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setKet(null)} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors">Batal</button>
                <button onClick={saveKet} className="flex-1 text-white py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${statusConfig[ket.status]?.bg || "#6366f1"}, ${statusConfig[ket.status]?.bg || "#8b5cf6"}90)` }}>
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
