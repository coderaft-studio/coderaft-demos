"use client";
import { useState, useMemo } from "react";

const kategoriIn  = ["Gaji", "Freelance", "Investasi", "Bisnis", "Hadiah", "Lainnya"];
const kategoriOut = ["Makanan", "Transportasi", "Utilitas", "Belanja", "Hiburan", "Kesehatan", "Pendidikan", "Lainnya"];

const katIcon = {
  Gaji:"💼", Freelance:"💻", Investasi:"📈", Bisnis:"🏢", Hadiah:"🎁", Lainnya:"📦",
  Makanan:"🍽", Transportasi:"🚗", Utilitas:"💡", Belanja:"🛒", Hiburan:"🎬", Kesehatan:"🏥", Pendidikan:"📚",
};

const g = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(52,211,153,0.12)" };

const initData = (type) => type === "in" ? [
  { id: 1, desc: "Gaji Bulanan",        kat: "Gaji",       tgl: "2026-06-01", jumlah: 12000000 },
  { id: 2, desc: "Freelance Website",    kat: "Freelance",  tgl: "2026-06-08", jumlah: 3500000  },
  { id: 3, desc: "Dividen Saham",        kat: "Investasi",  tgl: "2026-06-15", jumlah: 450000   },
  { id: 4, desc: "Bonus Kinerja",        kat: "Gaji",       tgl: "2026-06-20", jumlah: 2000000  },
  { id: 5, desc: "Konsultasi IT",        kat: "Freelance",  tgl: "2026-06-25", jumlah: 1500000  },
] : [
  { id: 1, desc: "Listrik & Air",        kat: "Utilitas",      tgl: "2026-06-03", jumlah: 450000  },
  { id: 2, desc: "Belanja Bulanan",      kat: "Belanja",       tgl: "2026-06-05", jumlah: 1200000 },
  { id: 3, desc: "Makan Siang Kantor",   kat: "Makanan",       tgl: "2026-06-10", jumlah: 680000  },
  { id: 4, desc: "Bensin Motor",         kat: "Transportasi",  tgl: "2026-06-12", jumlah: 120000  },
  { id: 5, desc: "Netflix & Spotify",    kat: "Hiburan",       tgl: "2026-06-14", jumlah: 150000  },
  { id: 6, desc: "Vitamin & Suplemen",   kat: "Kesehatan",     tgl: "2026-06-18", jumlah: 280000  },
];

const fmt  = (n) => `Rp ${n.toLocaleString("id")}`;
const fmtM = (n) => `Rp ${(n/1000000).toFixed(1)}jt`;

export default function TransaksiView({ type }) {
  const [data, setData]   = useState(initData(type));
  const [modal, setModal] = useState(null);
  const [form, setForm]   = useState({ desc: "", kat: "", tgl: "", jumlah: "" });
  const [detail, setDetail] = useState(null);
  const [filterKat, setFilterKat] = useState("Semua");
  const [search, setSearch] = useState("");

  const isIn     = type === "in";
  const mainClr  = isIn ? "#10b981" : "#f87171";
  const accent   = isIn ? "rgba(16,185,129," : "rgba(239,68,68,";
  const kategori = isIn ? kategoriIn : kategoriOut;

  const total   = data.reduce((s, d) => s + d.jumlah, 0);
  const avg     = data.length > 0 ? Math.round(total / data.length) : 0;
  const biggest = data.length > 0 ? Math.max(...data.map(d => d.jumlah)) : 0;

  // Category breakdown
  const katBreakdown = useMemo(() => {
    const map = {};
    data.forEach(d => { map[d.kat] = (map[d.kat] || 0) + d.jumlah; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [data]);

  const filtered = data.filter(d => {
    const matchKat    = filterKat === "Semua" || d.kat === filterKat;
    const matchSearch = !search || d.desc.toLowerCase().includes(search.toLowerCase());
    return matchKat && matchSearch;
  });

  const openAdd  = () => { setForm({ desc: "", kat: kategori[0], tgl: "", jumlah: "" }); setModal("add"); };
  const openEdit = (item) => { setForm({ ...item, jumlah: String(item.jumlah) }); setModal({ edit: item.id }); };
  const save     = (e) => {
    e.preventDefault();
    if (modal === "add") setData([...data, { ...form, id: Date.now(), jumlah: Number(form.jumlah) }]);
    else setData(data.map(d => d.id === modal.edit ? { ...d, ...form, jumlah: Number(form.jumlah) } : d));
    setModal(null);
  };

  const inputCls = `w-full rounded-xl px-4 py-3 text-sm text-slate-800 outline-none bg-white border border-slate-200 focus:border-${isIn ? "emerald" : "red"}-400 focus:ring-2 focus:ring-${isIn ? "emerald" : "red"}-100`;

  return (
    <div className="space-y-5">
      {/* ── Stats row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: `Total ${isIn ? "Pemasukan" : "Pengeluaran"}`, val: fmtM(total), icon: isIn ? "📈" : "📉", sub: `${data.length} transaksi` },
          { label: "Rata-rata",    val: fmtM(avg),     icon: "📊", sub: "per transaksi" },
          { label: "Terbesar",     val: fmtM(biggest), icon: "🔝", sub: data.find(d => d.jumlah === biggest)?.desc || "-" },
          { label: "Kategori",     val: katBreakdown.length, icon: "🏷", sub: `${katBreakdown[0]?.[0] || "-"} terbesar` },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5" style={g}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl">{s.icon}</span>
              <span className="text-xs font-medium px-2 py-1 rounded-full"
                style={{ background: `${accent}0.12)`, color: mainClr }}>{s.label}</span>
            </div>
            <div className="text-xl font-black mb-0.5" style={{ color: mainClr }}>{s.val}</div>
            <div className="text-xs" style={{ color: "rgba(148,163,184,0.5)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Category breakdown mini chart ── */}
      <div className="rounded-2xl p-5" style={g}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold" style={{ color: "#e2e8f0" }}>Breakdown per Kategori</h3>
          <span className="text-xs" style={{ color: "rgba(148,163,184,0.4)" }}>{fmt(total)} total</span>
        </div>
        <div className="space-y-2.5">
          {katBreakdown.slice(0, 5).map(([kat, jml]) => {
            const pct = Math.round((jml / total) * 100);
            return (
              <div key={kat} className="flex items-center gap-3">
                <span className="text-base w-6 flex-shrink-0">{katIcon[kat] || "📦"}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1" style={{ color: "rgba(226,232,240,0.7)" }}>
                    <span>{kat}</span><span className="font-bold" style={{ color: mainClr }}>{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: mainClr }} />
                  </div>
                </div>
                <span className="text-xs font-semibold w-20 text-right flex-shrink-0" style={{ color: "rgba(148,163,184,0.6)" }}>
                  {fmtM(jml)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="rounded-2xl p-4 flex flex-wrap gap-3 items-center justify-between" style={g}>
        <div className="flex gap-2 flex-wrap flex-1">
          <div className="relative flex-1 min-w-44">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "rgba(148,163,184,0.5)" }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari transaksi..."
              className="w-full rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none transition-all"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(52,211,153,0.15)", color: "#e2e8f0" }} />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {["Semua", ...kategori].map(k => (
              <button key={k} onClick={() => setFilterKat(k)}
                className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                style={filterKat === k
                  ? { background: mainClr, color: "#fff" }
                  : { background: `${accent}0.08)`, color: mainClr, border: `1px solid ${accent}0.2)` }}>
                {katIcon[k] && k !== "Semua" ? `${katIcon[k]} ` : ""}{k}
              </button>
            ))}
          </div>
        </div>
        <button onClick={openAdd}
          className="px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:shadow-lg flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${mainClr}, ${isIn ? "#059669" : "#dc2626"})` }}>
          + Tambah
        </button>
      </div>

      {/* ── Transaction cards ── */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-2xl p-12 text-center" style={g}>
            <div className="text-4xl mb-3">📭</div>
            <p className="text-sm" style={{ color: "rgba(148,163,184,0.5)" }}>Tidak ada transaksi</p>
          </div>
        )}
        {filtered.map(d => (
          <div key={d.id} className="rounded-2xl p-5 flex items-center gap-4 hover:border-opacity-40 transition-all group"
            style={{ ...g, borderLeft: `3px solid ${mainClr}` }}>
            {/* Icon */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${accent}0.12)` }}>
              {katIcon[d.kat] || "📦"}
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm mb-0.5 truncate" style={{ color: "#e2e8f0" }}>{d.desc}</div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: `${accent}0.1)`, color: mainClr }}>{d.kat}</span>
                <span className="text-xs" style={{ color: "rgba(148,163,184,0.4)" }}>📅 {d.tgl}</span>
              </div>
            </div>
            {/* Amount */}
            <div className="text-right flex-shrink-0">
              <div className="text-lg font-black" style={{ color: mainClr }}>
                {isIn ? "+" : "-"}{fmtM(d.jumlah)}
              </div>
              <div className="text-xs" style={{ color: "rgba(148,163,184,0.4)" }}>{fmt(d.jumlah)}</div>
            </div>
            {/* Actions */}
            <div className="flex gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setDetail(d)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all"
                style={{ background: "rgba(148,163,184,0.08)", color: "rgba(148,163,184,0.7)" }}>👁</button>
              <button onClick={() => openEdit(d)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all"
                style={{ background: "rgba(59,130,246,0.1)", color: "#60a5fa" }}>✎</button>
              <button onClick={() => setData(data.filter(x => x.id !== d.id))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-all"
                style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>✕</button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Add/Edit Modal ── */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()} style={{ color: "#1e293b" }}>
            <div className="px-6 py-4 flex items-center justify-between"
              style={{ background: `linear-gradient(135deg, ${mainClr}, ${isIn ? "#059669" : "#dc2626"})` }}>
              <div className="flex items-center gap-3 text-white">
                <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg">{isIn ? "📈" : "📉"}</div>
                <div>
                  <div className="font-bold">{modal === "add" ? "Tambah" : "Edit"} {isIn ? "Pemasukan" : "Pengeluaran"}</div>
                  <div className="text-white/70 text-xs">{modal !== "add" && form.desc}</div>
                </div>
              </div>
              <button onClick={() => setModal(null)} className="text-white/70 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-6">
              <form onSubmit={save} className="space-y-4">
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">Deskripsi *</label>
                  <input required value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Nama transaksi" className={inputCls} /></div>
                <div><label className="block text-xs font-semibold text-slate-500 mb-1">Kategori</label>
                  <div className="flex flex-wrap gap-2">
                    {kategori.map(k => (
                      <button key={k} type="button" onClick={() => setForm({ ...form, kat: k })}
                        className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                        style={form.kat === k
                          ? { background: mainClr, color: "#fff" }
                          : { background: "rgba(148,163,184,0.08)", color: "#64748b" }}>
                        {katIcon[k]} {k}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-semibold text-slate-500 mb-1">Tanggal *</label>
                    <input required type="date" value={form.tgl} onChange={e => setForm({ ...form, tgl: e.target.value })} className={inputCls} /></div>
                  <div><label className="block text-xs font-semibold text-slate-500 mb-1">Jumlah (Rp) *</label>
                    <input required type="number" value={form.jumlah} onChange={e => setForm({ ...form, jumlah: e.target.value })} placeholder="0" className={inputCls} /></div>
                </div>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setModal(null)} className="flex-1 border border-slate-200 text-slate-600 py-3 rounded-xl font-semibold text-sm hover:bg-slate-50">Batal</button>
                  <button type="submit" className="flex-1 text-white py-3 rounded-xl font-bold text-sm"
                    style={{ background: `linear-gradient(135deg, ${mainClr}, ${isIn ? "#059669" : "#dc2626"})` }}>Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {detail && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setDetail(null)}>
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()} style={{ color: "#1e293b" }}>
            <div className="px-6 py-5 text-center"
              style={{ background: `linear-gradient(135deg, ${mainClr}, ${isIn ? "#059669" : "#dc2626"})` }}>
              <div className="text-5xl mb-2">{katIcon[detail.kat] || "📦"}</div>
              <div className="text-white font-black text-xl mb-1">{isIn ? "+" : "-"}{fmtM(detail.jumlah)}</div>
              <div className="text-white/80 text-sm">{detail.desc}</div>
              <button onClick={() => setDetail(null)} className="absolute top-3 right-3 text-white/70 hover:text-white text-xl">✕</button>
            </div>
            <div className="p-6 relative">
              {[{ l: "Kategori", v: detail.kat }, { l: "Tanggal", v: detail.tgl }, { l: "Jumlah", v: fmt(detail.jumlah) }].map(item => (
                <div key={item.l} className="flex justify-between py-3 border-b border-slate-100 text-sm">
                  <span className="text-slate-400">{item.l}</span>
                  <span className="text-slate-700 font-semibold">{item.v}</span>
                </div>
              ))}
              <div className="flex gap-3 mt-5">
                <button onClick={() => { setDetail(null); openEdit(detail); }}
                  className="flex-1 py-3 rounded-xl font-bold text-sm text-white"
                  style={{ background: mainClr }}>Edit</button>
                <button onClick={() => setDetail(null)} className="flex-1 py-3 rounded-xl font-bold text-sm border border-slate-200 text-slate-600 hover:bg-slate-50">Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
