"use client";
import { useState } from "react";

const jurusanConfig = {
  IPA:    { from: "#6366f1", to: "#8b5cf6", bg: "rgba(99,102,241,0.1)", text: "#6366f1", light: "rgba(99,102,241,0.08)" },
  IPS:    { from: "#3b82f6", to: "#06b6d4", bg: "rgba(59,130,246,0.1)", text: "#3b82f6", light: "rgba(59,130,246,0.08)" },
  Bahasa: { from: "#10b981", to: "#059669", bg: "rgba(16,185,129,0.1)", text: "#10b981", light: "rgba(16,185,129,0.08)" },
  Umum:   { from: "#f59e0b", to: "#f97316", bg: "rgba(245,158,11,0.1)", text: "#f59e0b", light: "rgba(245,158,11,0.08)" },
};

const mapelPerJurusan = {
  IPA:    ["Matematika", "Fisika", "Kimia", "Biologi", "B. Indonesia", "B. Inggris"],
  IPS:    ["Ekonomi", "Geografi", "Sosiologi", "Sejarah", "B. Indonesia", "B. Inggris"],
  Bahasa: ["Sastra Indo", "B. Jepang", "B. Mandarin", "B. Inggris", "Seni Budaya"],
  Umum:   ["Matematika", "B. Indonesia", "B. Inggris", "PPKN", "Penjaskes"],
};

const initKelas = [
  { id: 1, nama: "10 IPA 1", wali: "Bu Siti Rahayu", ruang: "R-101", jurusan: "IPA", siswa: 32, maks: 36, jadwal: "Senin–Jumat 07.00–14.30", hadir: 94 },
  { id: 2, nama: "10 IPA 2", wali: "Pak Budi Santoso", ruang: "R-102", jurusan: "IPA", siswa: 31, maks: 36, jadwal: "Senin–Jumat 07.00–14.30", hadir: 90 },
  { id: 3, nama: "11 IPS 1", wali: "Bu Rini Handayani", ruang: "R-201", jurusan: "IPS", siswa: 30, maks: 36, jadwal: "Senin–Jumat 07.00–14.30", hadir: 88 },
  { id: 4, nama: "11 IPA 1", wali: "Pak Ahmad Rizky", ruang: "R-202", jurusan: "IPA", siswa: 33, maks: 36, jadwal: "Senin–Jumat 07.00–14.30", hadir: 97 },
  { id: 5, nama: "12 IPS 1", wali: "Bu Dewi Kusuma", ruang: "R-301", jurusan: "IPS", siswa: 28, maks: 36, jadwal: "Senin–Jumat 07.00–14.30", hadir: 85 },
  { id: 6, nama: "12 IPA 1", wali: "Pak Hendra Jaya", ruang: "R-302", jurusan: "IPA", siswa: 30, maks: 36, jadwal: "Senin–Jumat 07.00–14.30", hadir: 92 },
];

const emptyForm = { nama: "", wali: "", ruang: "", jurusan: "IPA", jadwal: "", maks: "36" };
const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 bg-white";

export default function KelasView() {
  const [kelas, setKelas] = useState(initKelas);
  const [filter, setFilter] = useState("Semua");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [detail, setDetail] = useState(null);

  const filtered = filter === "Semua" ? kelas : kelas.filter(k => k.jurusan === filter);
  const totalSiswa = kelas.reduce((s, k) => s + k.siswa, 0);

  const save = (e) => {
    e.preventDefault();
    if (modal === "add") setKelas([...kelas, { ...form, id: Date.now(), siswa: 0, hadir: 0, maks: Number(form.maks) || 36 }]);
    else setKelas(kelas.map(k => k.id === modal.edit ? { ...k, ...form, maks: Number(form.maks) || k.maks } : k));
    setModal(null);
  };

  const openEdit = (k) => {
    setForm({ nama: k.nama, wali: k.wali, ruang: k.ruang, jurusan: k.jurusan, jadwal: k.jadwal, maks: String(k.maks) });
    setModal({ edit: k.id });
  };

  return (
    <div className="space-y-5">
      {/* ── Stats header ── */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Kelas", val: kelas.length, icon: "🏫", color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
          { label: "Total Siswa", val: totalSiswa, icon: "👥", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
          { label: "Kelas IPA", val: kelas.filter(k => k.jurusan === "IPA").length, icon: "🔬", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)" },
          { label: "Kelas IPS", val: kelas.filter(k => k.jurusan === "IPS").length, icon: "📚", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-4 flex items-center gap-4"
            style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: s.bg }}>
              {s.icon}
            </div>
            <div>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.val}</div>
              <div className="text-xs text-slate-500">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <div className="flex gap-1.5 flex-wrap">
          {["Semua", "IPA", "IPS", "Bahasa", "Umum"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
              style={filter === f
                ? { background: f === "Semua" ? "#6366f1" : (jurusanConfig[f]?.from || "#6366f1"), color: "#fff" }
                : { background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
              {f} {f !== "Semua" && <span className="opacity-70">({kelas.filter(k => k.jurusan === f).length})</span>}
            </button>
          ))}
        </div>
        <button onClick={() => { setForm(emptyForm); setModal("add"); }}
          className="text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
          + Tambah Kelas
        </button>
      </div>

      {/* ── Kelas cards ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(k => {
          const cfg = jurusanConfig[k.jurusan] || jurusanConfig.IPA;
          const kapPct = Math.round((k.siswa / k.maks) * 100);
          const mapel = mapelPerJurusan[k.jurusan] || [];
          const waliInitial = k.wali.split(" ").filter(w => w.length > 1).slice(0, 2).map(w => w[0]).join("");

          return (
            <div key={k.id} className="rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl group"
              style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>

              {/* Card header gradient */}
              <div className="h-28 relative flex items-center justify-between px-6"
                style={{ background: `linear-gradient(135deg, ${cfg.from}, ${cfg.to})` }}>
                <div className="absolute inset-0 bg-black/10" />
                {/* Kelas number big */}
                <div className="relative z-10">
                  <div className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">Kelas</div>
                  <div className="text-white font-black text-3xl leading-none">{k.nama}</div>
                  <div className="text-white/70 text-xs mt-1">{k.jurusan}</div>
                </div>
                {/* Kehadiran ring */}
                <div className="relative z-10">
                  <svg viewBox="0 0 60 60" className="w-14 h-14 -rotate-90">
                    <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="5" />
                    <circle cx="30" cy="30" r="24" fill="none" stroke="white" strokeWidth="5"
                      strokeDasharray={`${2 * Math.PI * 24}`}
                      strokeDashoffset={`${2 * Math.PI * 24 * (1 - k.hadir / 100)}`}
                      strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-white font-black text-sm leading-none">{k.hadir}%</span>
                    <span className="text-white/60 text-xs">hadir</span>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                {/* Wali kelas */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${cfg.from}, ${cfg.to})` }}>
                    {waliInitial}
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Wali Kelas</div>
                    <div className="text-sm font-semibold text-slate-700">{k.wali}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-xs text-slate-400">Ruang</div>
                    <div className="text-sm font-bold" style={{ color: cfg.text }}>{k.ruang}</div>
                  </div>
                </div>

                {/* Kapasitas siswa */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500">Kapasitas Siswa</span>
                    <span className="font-bold" style={{ color: cfg.text }}>{k.siswa}/{k.maks} siswa</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: cfg.light }}>
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${kapPct}%`, background: `linear-gradient(to right, ${cfg.from}, ${cfg.to})` }} />
                  </div>
                </div>

                {/* Mapel chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {mapel.slice(0, 4).map(m => (
                    <span key={m} className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{ background: cfg.light, color: cfg.text }}>
                      {m}
                    </span>
                  ))}
                  {mapel.length > 4 && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium text-slate-400"
                      style={{ background: "rgba(148,163,184,0.1)" }}>
                      +{mapel.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button onClick={() => setDetail(k)} className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all"
                    style={{ background: cfg.light, color: cfg.text }}>
                    Detail
                  </button>
                  <button onClick={() => openEdit(k)} className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all"
                    style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>
                    Edit
                  </button>
                  <button onClick={() => setKelas(kelas.filter(x => x.id !== k.id))}
                    className="w-10 py-2.5 rounded-xl text-xs font-bold transition-all"
                    style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                    ✕
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Add/Edit Modal ── */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <div className="flex items-center gap-3 text-white">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg">🏫</div>
                <div>
                  <div className="font-bold">{modal === "add" ? "Tambah Kelas Baru" : "Edit Data Kelas"}</div>
                  <div className="text-white/70 text-xs">{modal === "add" ? "Buat kelas baru" : `Mengedit: ${form.nama}`}</div>
                </div>
              </div>
              <button onClick={() => setModal(null)} className="text-white/70 hover:text-white text-xl transition-colors">✕</button>
            </div>
            <div className="p-6">
              <form onSubmit={save} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Nama Kelas *</label>
                    <input required value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="10 IPA 1" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">No. Ruang *</label>
                    <input required value={form.ruang} onChange={e => setForm({ ...form, ruang: e.target.value })} placeholder="R-101" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Wali Kelas *</label>
                  <input required value={form.wali} onChange={e => setForm({ ...form, wali: e.target.value })} placeholder="Bu Siti Rahayu" className={inputCls} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Jurusan</label>
                    <select value={form.jurusan} onChange={e => setForm({ ...form, jurusan: e.target.value })} className={inputCls}>
                      {["IPA", "IPS", "Bahasa", "Umum"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Maks Siswa</label>
                    <input type="number" min="1" value={form.maks} onChange={e => setForm({ ...form, maks: e.target.value })} placeholder="36" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Jadwal</label>
                    <input value={form.jadwal} onChange={e => setForm({ ...form, jadwal: e.target.value })} placeholder="Sen–Jum" className={inputCls} />
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setModal(null)} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors">Batal</button>
                  <button type="submit" className="flex-1 text-white py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                    {modal === "add" ? "Tambahkan" : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {detail && (() => {
        const cfg = jurusanConfig[detail.jurusan] || jurusanConfig.IPA;
        const mapel = mapelPerJurusan[detail.jurusan] || [];
        const kapPct = Math.round((detail.siswa / detail.maks) * 100);
        const waliInitial = detail.wali.split(" ").filter(w => w.length > 1).slice(0, 2).map(w => w[0]).join("");
        return (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
              {/* Hero */}
              <div className="h-32 relative flex flex-col items-center justify-center text-center"
                style={{ background: `linear-gradient(135deg, ${cfg.from}, ${cfg.to})` }}>
                <div className="absolute inset-0 bg-black/15" />
                <button onClick={() => setDetail(null)} className="absolute top-3 right-3 text-white/70 hover:text-white text-xl z-10">✕</button>
                <div className="relative z-10">
                  <div className="text-white/60 text-xs uppercase tracking-widest mb-1">Kelas</div>
                  <div className="text-white font-black text-4xl leading-none">{detail.nama}</div>
                  <div className="text-white/70 text-sm mt-1">{detail.jurusan} · {detail.ruang}</div>
                </div>
              </div>

              <div className="p-6">
                {/* Wali */}
                <div className="flex items-center gap-3 mb-5 p-3 rounded-2xl" style={{ background: cfg.light }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${cfg.from}, ${cfg.to})` }}>
                    {waliInitial}
                  </div>
                  <div>
                    <div className="text-xs text-slate-500">Wali Kelas</div>
                    <div className="font-bold text-slate-800">{detail.wali}</div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Siswa", val: `${detail.siswa}/${detail.maks}`, icon: "👥" },
                    { label: "Kehadiran", val: `${detail.hadir}%`, icon: "✅" },
                    { label: "Kapasitas", val: `${kapPct}%`, icon: "📊" },
                  ].map(s => (
                    <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: cfg.light }}>
                      <div className="text-base mb-0.5">{s.icon}</div>
                      <div className="font-black text-sm" style={{ color: cfg.text }}>{s.val}</div>
                      <div className="text-xs text-slate-400">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Capacity bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-1.5 text-slate-500">
                    <span>Kapasitas Kelas</span>
                    <span className="font-bold" style={{ color: cfg.text }}>{kapPct}%</span>
                  </div>
                  <div className="h-3 rounded-full overflow-hidden" style={{ background: cfg.light }}>
                    <div className="h-full rounded-full" style={{ width: `${kapPct}%`, background: `linear-gradient(to right, ${cfg.from}, ${cfg.to})` }} />
                  </div>
                </div>

                {/* Jadwal */}
                <div className="mb-4 p-3 rounded-xl flex items-center gap-3" style={{ background: "rgba(148,163,184,0.08)" }}>
                  <span className="text-xl">🕙</span>
                  <div>
                    <div className="text-xs text-slate-400">Jadwal Belajar</div>
                    <div className="text-sm font-semibold text-slate-700">{detail.jadwal}</div>
                  </div>
                </div>

                {/* Mapel */}
                <div className="mb-5">
                  <div className="text-xs text-slate-400 mb-2">Mata Pelajaran ({mapel.length})</div>
                  <div className="flex flex-wrap gap-1.5">
                    {mapel.map(m => (
                      <span key={m} className="text-xs px-3 py-1.5 rounded-full font-medium"
                        style={{ background: cfg.light, color: cfg.text }}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => { setDetail(null); openEdit(detail); }} className="flex-1 py-3 rounded-xl text-sm font-bold"
                    style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>
                    Edit Kelas
                  </button>
                  <button onClick={() => setDetail(null)} className="flex-1 py-3 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
