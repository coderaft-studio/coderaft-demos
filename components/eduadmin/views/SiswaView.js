"use client";
import { useState } from "react";

const initSiswa = [
  { id: 1, nis: "2024001", nama: "Rini Handayani", kelas: "10 IPA 1", gender: "P", ttl: "Jakarta, 5 Mar 2008", ortu: "Budi Handayani", hp: "0812-XXXX", alamat: "Jl. Merdeka No.1, Jakarta", nilai: 92, status: "Aktif" },
  { id: 2, nis: "2024002", nama: "Budi Prasetyo", kelas: "10 IPA 2", gender: "L", ttl: "Bandung, 12 Jun 2008", ortu: "Siti Prasetyo", hp: "0813-XXXX", alamat: "Jl. Sudirman No.5, Bandung", nilai: 78, status: "Aktif" },
  { id: 3, nis: "2024003", nama: "Sinta Maharani", kelas: "11 IPS 1", gender: "P", ttl: "Surabaya, 20 Sep 2007", ortu: "Ahmad Maharani", hp: "0857-XXXX", alamat: "Jl. Pahlawan No.8, Surabaya", nilai: 85, status: "Aktif" },
  { id: 4, nis: "2024004", nama: "Ahmad Rizky", kelas: "11 IPA 1", gender: "L", ttl: "Yogyakarta, 3 Jan 2007", ortu: "Dewi Rizky", hp: "0878-XXXX", alamat: "Jl. Malioboro No.12, Yogyakarta", nilai: 97, status: "Aktif" },
  { id: 5, nis: "2024005", nama: "Dewi Kusuma", kelas: "10 IPA 1", gender: "P", ttl: "Medan, 8 Apr 2008", ortu: "Hendra Kusuma", hp: "0819-XXXX", alamat: "Jl. Gatot Subroto No.3, Medan", nilai: 88, status: "Aktif" },
  { id: 6, nis: "2024006", nama: "Hendra Jaya", kelas: "12 IPA 1", gender: "L", ttl: "Makassar, 15 Jul 2006", ortu: "Sari Jaya", hp: "0821-XXXX", alamat: "Jl. Veteran No.7, Makassar", nilai: 74, status: "Aktif" },
  { id: 7, nis: "2024007", nama: "Lina Santoso", kelas: "12 IPS 1", gender: "P", ttl: "Semarang, 22 Aug 2006", ortu: "Tono Santoso", hp: "0831-XXXX", alamat: "Jl. Pandanaran No.14, Semarang", nilai: 81, status: "Aktif" },
  { id: 8, nis: "2024008", nama: "Fajar Nugroho", kelas: "10 IPA 2", gender: "L", ttl: "Solo, 9 Nov 2008", ortu: "Wati Nugroho", hp: "0856-XXXX", alamat: "Jl. Slamet Riyadi No.3, Solo", nilai: 69, status: "Aktif" },
  { id: 9, nis: "2024009", nama: "Maya Putri", kelas: "11 IPA 1", gender: "P", ttl: "Denpasar, 14 Feb 2007", ortu: "Ketut Putri", hp: "0877-XXXX", alamat: "Jl. Gatot Kaca No.9, Denpasar", nilai: 91, status: "Aktif" },
];

const kelasList = ["10 IPA 1", "10 IPA 2", "11 IPS 1", "11 IPA 1", "12 IPS 1", "12 IPA 1"];
const emptyForm = { nis: "", nama: "", kelas: kelasList[0], gender: "L", ttl: "", ortu: "", hp: "", alamat: "", nilai: "", status: "Aktif" };

const avatarColors = [
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#3b82f6,#6366f1)",
  "linear-gradient(135deg,#ec4899,#f43f5e)",
  "linear-gradient(135deg,#10b981,#059669)",
  "linear-gradient(135deg,#f59e0b,#f97316)",
  "linear-gradient(135deg,#ef4444,#dc2626)",
  "linear-gradient(135deg,#06b6d4,#0ea5e9)",
  "linear-gradient(135deg,#8b5cf6,#a855f7)",
];

const nilaiColor = (n) => n >= 90 ? "#10b981" : n >= 75 ? "#6366f1" : n >= 60 ? "#f59e0b" : "#ef4444";
const nilaiLabel = (n) => n >= 90 ? "A" : n >= 75 ? "B" : n >= 60 ? "C" : "D";

export default function SiswaView() {
  const [siswa, setSiswa] = useState(initSiswa);
  const [search, setSearch] = useState("");
  const [filterKelas, setFilterKelas] = useState("Semua");
  const [view, setView] = useState("card"); // "card" | "table"
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [detail, setDetail] = useState(null);

  const filtered = siswa.filter(s => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.nama.toLowerCase().includes(q) || s.nis.includes(q);
    const matchKelas = filterKelas === "Semua" || s.kelas === filterKelas;
    return matchSearch && matchKelas;
  });

  const totalL = siswa.filter(s => s.gender === "L").length;
  const totalP = siswa.filter(s => s.gender === "P").length;
  const avgNilai = Math.round(siswa.reduce((a, s) => a + (s.nilai || 0), 0) / siswa.length);

  const save = (e) => {
    e.preventDefault();
    const avatar = form.nama.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    const grad = avatarColors[siswa.length % avatarColors.length];
    if (modal === "add") {
      setSiswa([...siswa, { ...form, id: Date.now(), avatar, grad, nilai: Number(form.nilai) || 0 }]);
    } else {
      setSiswa(siswa.map(s => s.id === modal.edit ? { ...s, ...form, nilai: Number(form.nilai) || s.nilai } : s));
    }
    setModal(null);
  };

  const openEdit = (s) => {
    setForm({ nis: s.nis, nama: s.nama, kelas: s.kelas, gender: s.gender, ttl: s.ttl, ortu: s.ortu, hp: s.hp, alamat: s.alamat, nilai: String(s.nilai || ""), status: s.status });
    setModal({ edit: s.id });
  };

  const inputCls = "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 bg-white";

  return (
    <div className="space-y-5">
      {/* ── Stats summary ── */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Siswa", val: siswa.length, icon: "👥", color: "#6366f1", bg: "rgba(99,102,241,0.1)" },
          { label: "Laki-laki", val: totalL, icon: "👦", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
          { label: "Perempuan", val: totalP, icon: "👧", color: "#ec4899", bg: "rgba(236,72,153,0.1)" },
          { label: "Rata-rata Nilai", val: avgNilai, icon: "📊", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
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
      <div className="rounded-2xl p-4 flex flex-wrap gap-3 items-center justify-between"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <div className="flex gap-3 flex-wrap flex-1">
          {/* Search */}
          <div className="relative flex-1 min-w-52">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama, NIS..."
              className="w-full bg-slate-100 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-violet-200 focus:bg-white transition-all" />
          </div>
          {/* Kelas filter chips */}
          <div className="flex gap-1.5 flex-wrap">
            {["Semua", ...kelasList].map(k => (
              <button key={k} onClick={() => setFilterKelas(k)}
                className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                style={filterKelas === k
                  ? { background: "#6366f1", color: "#fff" }
                  : { background: "rgba(99,102,241,0.08)", color: "#6366f1" }}>
                {k}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          {/* View toggle */}
          <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
            {[{ v: "card", icon: "⊞" }, { v: "table", icon: "☰" }].map(t => (
              <button key={t.v} onClick={() => setView(t.v)}
                className="w-8 h-8 rounded-lg text-sm transition-all"
                style={view === t.v ? { background: "#6366f1", color: "#fff" } : { color: "#94a3b8" }}>
                {t.icon}
              </button>
            ))}
          </div>
          <button onClick={() => { setForm(emptyForm); setModal("add"); }}
            className="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-1.5">
            + Tambah Siswa
          </button>
        </div>
      </div>

      {/* ── Card View ── */}
      {view === "card" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s, i) => {
            const grad = s.grad || avatarColors[i % avatarColors.length];
            const nc = nilaiColor(s.nilai);
            return (
              <div key={s.id} className="rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl group"
                style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                {/* Card top gradient */}
                <div className="h-20 relative" style={{ background: `linear-gradient(135deg, ${grad.includes("gradient") ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.1)"}, rgba(236,72,153,0.08))` }}>
                  <div className="absolute inset-0" style={{ background: `${grad.split(",")[1]?.replace(/\).*/, "")}12)` }} />
                  <div className="absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-lg border-2 border-white"
                      style={{ background: grad }}>
                      {s.avatar || s.nama.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                  {/* Nilai badge */}
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-xl flex flex-col items-center justify-center text-white shadow-md"
                    style={{ background: nc }}>
                    <span className="text-xs font-black leading-none">{nilaiLabel(s.nilai)}</span>
                    <span className="text-xs opacity-80 leading-none">{s.nilai}</span>
                  </div>
                </div>

                {/* Card content */}
                <div className="pt-10 pb-5 px-5 text-center">
                  <h3 className="font-bold text-slate-800 text-base mb-0.5">{s.nama}</h3>
                  <p className="text-xs font-mono text-violet-500 font-semibold mb-3">{s.nis}</p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>{s.kelas}</span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={s.gender === "L" ? { background: "rgba(59,130,246,0.1)", color: "#3b82f6" } : { background: "rgba(236,72,153,0.1)", color: "#ec4899" }}>
                      {s.gender === "L" ? "Laki-laki" : "Perempuan"}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mb-4 truncate">👨‍👩‍👦 {s.ortu}</div>
                  <div className="flex gap-2">
                    <button onClick={() => setDetail(s)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold transition-all hover:shadow-md"
                      style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>
                      Detail
                    </button>
                    <button onClick={() => openEdit(s)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold transition-all hover:shadow-md"
                      style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>
                      Edit
                    </button>
                    <button onClick={() => setSiswa(siswa.filter(x => x.id !== s.id))}
                      className="w-9 py-2 rounded-xl text-xs font-bold transition-all hover:shadow-md"
                      style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Table View ── */}
      {view === "table" && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.9)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid rgba(255,255,255,0.6)" }}>
          <table className="w-full">
            <thead style={{ background: "rgba(99,102,241,0.06)" }}>
              <tr>{["NIS", "Nama", "Kelas", "Gender", "Nilai", "Orang Tua", "Aksi"].map(h => (
                <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-violet-600 uppercase tracking-wide">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => {
                const grad = s.grad || avatarColors[i % avatarColors.length];
                const nc = nilaiColor(s.nilai);
                return (
                  <tr key={s.id} className="border-t hover:bg-violet-50/30 transition-colors" style={{ borderColor: "rgba(99,102,241,0.08)" }}>
                    <td className="px-5 py-4 font-mono font-bold text-sm" style={{ color: "#6366f1" }}>{s.nis}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ background: grad }}>
                          {s.avatar || s.nama.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-semibold text-slate-800 text-sm">{s.nama}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>{s.kelas}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={s.gender === "L" ? { background: "rgba(59,130,246,0.1)", color: "#3b82f6" } : { background: "rgba(236,72,153,0.1)", color: "#ec4899" }}>
                        {s.gender === "L" ? "L" : "P"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black" style={{ color: nc }}>{s.nilai}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: `${nc}15`, color: nc }}>{nilaiLabel(s.nilai)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-sm">{s.ortu}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1.5">
                        <button onClick={() => setDetail(s)} className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>Detail</button>
                        <button onClick={() => openEdit(s)} className="text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>Edit</button>
                        <button onClick={() => setSiswa(siswa.filter(x => x.id !== s.id))} className="text-xs px-2 py-1.5 rounded-lg font-semibold transition-colors" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>✕</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="px-5 py-3 text-xs text-slate-400" style={{ borderTop: "1px solid rgba(99,102,241,0.08)" }}>
            Menampilkan {filtered.length} dari {siswa.length} siswa
          </div>
        </div>
      )}

      {/* ── Add/Edit Modal ── */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 flex items-center justify-between flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
              <div className="flex items-center gap-3 text-white">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg">👤</div>
                <div>
                  <div className="font-bold">{modal === "add" ? "Tambah Siswa Baru" : "Edit Data Siswa"}</div>
                  <div className="text-white/70 text-xs">{modal === "add" ? "Isi data siswa baru" : `Mengedit: ${form.nama}`}</div>
                </div>
              </div>
              <button onClick={() => setModal(null)} className="text-white/70 hover:text-white text-xl transition-colors">✕</button>
            </div>
            <div className="p-6 overflow-y-auto">
              <form onSubmit={save} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">NIS *</label>
                    <input required value={form.nis} onChange={e => setForm({ ...form, nis: e.target.value })} placeholder="2024010" className={inputCls} />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Kelas</label>
                      <select value={form.kelas} onChange={e => setForm({ ...form, kelas: e.target.value })} className={inputCls}>
                        {kelasList.map(k => <option key={k}>{k}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Gender</label>
                      <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} className={inputCls}>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Nama Lengkap *</label>
                  <input required value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Rini Handayani" className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Tempat, Tgl Lahir</label>
                    <input value={form.ttl} onChange={e => setForm({ ...form, ttl: e.target.value })} placeholder="Jakarta, 5 Mar 2008" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Nilai Rata-rata</label>
                    <input type="number" min="0" max="100" value={form.nilai} onChange={e => setForm({ ...form, nilai: e.target.value })} placeholder="85" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Nama Orang Tua</label>
                  <input value={form.ortu} onChange={e => setForm({ ...form, ortu: e.target.value })} placeholder="Budi Handayani" className={inputCls} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">No. HP Orang Tua</label>
                    <input value={form.hp} onChange={e => setForm({ ...form, hp: e.target.value })} placeholder="0812-XXXX-XXXX" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Status</label>
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={inputCls}>
                      {["Aktif", "Tidak Aktif", "Pindah", "Lulus"].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Alamat</label>
                  <textarea value={form.alamat} onChange={e => setForm({ ...form, alamat: e.target.value })} rows={2} placeholder="Jl. Merdeka No.1, Jakarta" className={`${inputCls} resize-none`} />
                </div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setModal(null)} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-colors">Batal</button>
                  <button type="submit" className="flex-1 text-white py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                    {modal === "add" ? "Tambahkan" : "Simpan Perubahan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {detail && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Hero — avatar di dalam, pakai absolute bottom sehingga tidak terpotong overflow */}
            <div className="h-36 relative" style={{ background: detail.grad || "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              <div className="absolute inset-0 bg-black/20" />
              <button onClick={() => setDetail(null)} className="absolute top-3 right-3 text-white/70 hover:text-white text-xl z-10">✕</button>
              {/* Avatar di dalam hero, setengah ke bawah */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-2xl border-4 border-white shadow-xl"
                  style={{ background: detail.grad || "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                  {detail.avatar || detail.nama.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                </div>
              </div>
            </div>
            {/* Content — padding top untuk beri ruang avatar */}
            <div className="flex flex-col items-center pt-14 pb-5 px-6">
              <div />
              <h3 className="text-lg font-black text-slate-800">{detail.nama}</h3>
              <p className="text-sm font-mono text-violet-500 font-bold mb-1">{detail.nis}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}>{detail.kelas}</span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={detail.gender === "L" ? { background: "rgba(59,130,246,0.1)", color: "#3b82f6" } : { background: "rgba(236,72,153,0.1)", color: "#ec4899" }}>
                  {detail.gender === "L" ? "Laki-laki" : "Perempuan"}
                </span>
              </div>

              {/* Nilai besar */}
              {detail.nilai && (
                <div className="mt-4 w-full p-4 rounded-2xl text-center" style={{ background: `${nilaiColor(detail.nilai)}10` }}>
                  <div className="text-4xl font-black" style={{ color: nilaiColor(detail.nilai) }}>{detail.nilai}</div>
                  <div className="text-xs text-slate-500 mt-1">Nilai Rata-rata · Grade {nilaiLabel(detail.nilai)}</div>
                </div>
              )}

              {/* Info list */}
              <div className="w-full mt-4 space-y-0">
                {[{ l: "TTL", v: detail.ttl }, { l: "Orang Tua", v: detail.ortu }, { l: "No. HP", v: detail.hp }, { l: "Alamat", v: detail.alamat }, { l: "Status", v: detail.status }].map(item => item.v && (
                  <div key={item.l} className="flex justify-between py-2.5 text-sm" style={{ borderBottom: "1px solid rgba(99,102,241,0.08)" }}>
                    <span className="text-slate-400 flex-shrink-0">{item.l}</span>
                    <span className="text-slate-700 font-medium text-right max-w-[60%]">{item.v}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-5 w-full">
                <button onClick={() => { setDetail(null); openEdit(detail); }} className="flex-1 py-3 rounded-xl text-sm font-bold transition-all"
                  style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>
                  Edit Data
                </button>
                <button onClick={() => setDetail(null)} className="flex-1 py-3 rounded-xl text-sm font-bold transition-all border border-slate-200 text-slate-600 hover:bg-slate-50">
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
