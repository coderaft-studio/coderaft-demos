const stats = [
  { label: "Total Siswa", value: "324", change: "+4", icon: "👤", color: "#6366f1", bg: "rgba(99,102,241,0.12)" },
  { label: "Hadir Hari Ini", value: "298", change: "92%", icon: "✅", color: "#10b981", bg: "rgba(16,185,129,0.12)" },
  { label: "Kelas Aktif", value: "12", change: "6 kelas", icon: "🏫", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  { label: "Rata-rata Nilai", value: "82.4", change: "+1.2", icon: "📝", color: "#ec4899", bg: "rgba(236,72,153,0.12)" },
];

const kelasData = [
  { nama: "10 IPA 1", wali: "Bu Siti", siswa: 32, hadir: 30, color: "#6366f1" },
  { nama: "10 IPA 2", wali: "Pak Budi", siswa: 31, hadir: 28, color: "#3b82f6" },
  { nama: "11 IPS 1", wali: "Bu Rini", siswa: 30, hadir: 30, color: "#10b981" },
  { nama: "11 IPA 1", wali: "Pak Ahmad", siswa: 33, hadir: 29, color: "#f59e0b" },
  { nama: "12 IPS 1", wali: "Bu Dewi", siswa: 28, hadir: 25, color: "#ec4899" },
];

const gradeData = [
  { range: "A  90–100", count: 52, pct: 16, color: "#10b981" },
  { range: "B  75–89", count: 148, pct: 46, color: "#6366f1" },
  { range: "C  60–74", count: 89, pct: 27, color: "#f59e0b" },
  { range: "D  < 60", count: 35, pct: 11, color: "#ef4444" },
];

const siswaRecent = [
  { nama: "Rini Handayani", kelas: "10 IPA 1", status: "Hadir", nilai: 92, avatar: "RH", color: "#6366f1" },
  { nama: "Budi Prasetyo", kelas: "10 IPA 2", status: "Hadir", nilai: 78, avatar: "BP", color: "#3b82f6" },
  { nama: "Sinta Maharani", kelas: "11 IPS 1", status: "Izin", nilai: 85, avatar: "SM", color: "#ec4899" },
  { nama: "Ahmad Rizky", kelas: "11 IPA 1", status: "Hadir", nilai: 95, avatar: "AR", color: "#10b981" },
];

const statusStyle = { Hadir: { bg: "bg-emerald-100", text: "text-emerald-700" }, Izin: { bg: "bg-blue-100", text: "text-blue-700" }, Alpha: { bg: "bg-red-100", text: "text-red-600" } };

export default function DashboardView() {
  const totalHadir = 298;
  const totalSiswa = 324;
  const pctHadir = Math.round((totalHadir / totalSiswa) * 100);
  const r = 40, circ = 2 * Math.PI * r;
  const dash = (pctHadir / 100) * circ;

  return (
    <div className="space-y-5">
      {/* ── Gradient hero stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-2xl p-5 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <div className="absolute inset-0 opacity-30 rounded-2xl"
              style={{ background: `linear-gradient(135deg, ${s.bg}, transparent)` }} />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: s.bg, border: `1px solid ${s.color}20` }}>
                  {s.icon}
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: s.bg, color: s.color }}>{s.change}</span>
              </div>
              <div className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-slate-500 text-xs font-medium">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* ── Attendance ring ── */}
        <div className="rounded-2xl p-6 flex flex-col"
          style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <h3 className="font-bold text-slate-800 mb-5">Kehadiran Hari Ini</h3>

          <div className="flex items-center gap-5 mb-5">
            <div className="relative flex-shrink-0" style={{ width: 100, height: 100 }}>
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="10" />
                <circle cx="50" cy="50" r={r} fill="none" stroke="url(#egrad)" strokeWidth="10"
                  strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round" />
                <defs>
                  <linearGradient id="egrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-indigo-600">{pctHadir}%</span>
                <span className="text-xs text-slate-400">hadir</span>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              {[
                { label: "Hadir", val: 298, color: "#6366f1" },
                { label: "Izin/Sakit", val: 18, color: "#3b82f6" },
                { label: "Alpha", val: 8, color: "#ef4444" },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    <span className="text-xs text-slate-500">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: item.color }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Per class */}
          <div className="space-y-2.5 flex-1">
            {kelasData.map(k => {
              const pct = Math.round((k.hadir / k.siswa) * 100);
              return (
                <div key={k.nama}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-600">{k.nama}</span>
                    <span className="font-bold" style={{ color: k.color }}>{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: k.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Grade distribution ── */}
        <div className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <h3 className="font-bold text-slate-800 mb-5">Distribusi Nilai</h3>

          {/* Big number */}
          <div className="text-center mb-6 py-4 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(236,72,153,0.08))" }}>
            <div className="text-5xl font-black" style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>82.4</div>
            <div className="text-slate-500 text-sm mt-1">Rata-rata Nilai Sekolah</div>
            <div className="text-emerald-600 text-xs font-semibold mt-1">↑ +1.2 dari bulan lalu</div>
          </div>

          <div className="space-y-4">
            {gradeData.map(g => (
              <div key={g.range}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: g.color }} />
                    <span className="text-xs font-semibold text-slate-600">{g.range}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{g.count} siswa</span>
                    <span className="text-xs font-bold w-8 text-right" style={{ color: g.color }}>{g.pct}%</span>
                  </div>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all flex items-center justify-end pr-1"
                    style={{ width: `${g.pct}%`, background: `linear-gradient(to right, ${g.color}90, ${g.color})` }}>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recent students ── */}
        <div className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-800">Siswa Terbaru</h3>
            <span className="text-xs text-slate-400">TA 2025/2026</span>
          </div>
          <div className="space-y-3">
            {siswaRecent.map((s, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/80 transition-colors">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}90)` }}>
                  {s.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 text-sm truncate">{s.nama}</div>
                  <div className="text-slate-400 text-xs">{s.kelas}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyle[s.status]?.bg} ${statusStyle[s.status]?.text}`}>{s.status}</span>
                  <span className="text-xs font-bold" style={{ color: s.nilai >= 90 ? "#10b981" : s.nilai >= 75 ? "#6366f1" : "#f59e0b" }}>{s.nilai}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4" style={{ borderTop: "1px solid rgba(148,163,184,0.15)" }}>
            {[
              { label: "Kelas", val: "12", color: "#f59e0b" },
              { label: "Guru", val: "28", color: "#6366f1" },
              { label: "Mapel", val: "16", color: "#ec4899" },
            ].map(item => (
              <div key={item.label} className="text-center p-2 rounded-xl" style={{ background: `${item.color}10` }}>
                <div className="text-lg font-black" style={{ color: item.color }}>{item.val}</div>
                <div className="text-xs text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* ── Row 3: Jadwal + Pengumuman + Ujian ── */}
      <div className="grid lg:grid-cols-3 gap-5">

        {/* Jadwal Hari Ini */}
        <div className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-800">Jadwal Hari Ini</h3>
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "rgba(99,102,241,0.12)", color: "#6366f1" }}>Kamis, 5 Jun</span>
          </div>
          <div className="space-y-3">
            {[
              { jam: "07.00", mapel: "Matematika", kelas: "10 IPA 1", guru: "Pak Budi", ruang: "R-101", active: true },
              { jam: "08.40", mapel: "Fisika", kelas: "11 IPA 1", guru: "Bu Siti", ruang: "R-202", active: true },
              { jam: "10.20", mapel: "B. Indonesia", kelas: "12 IPS 1", guru: "Bu Rini", ruang: "R-301", active: false },
              { jam: "12.00", mapel: "ISTIRAHAT", kelas: "", guru: "", ruang: "", active: false, break: true },
              { jam: "13.00", mapel: "Kimia", kelas: "10 IPA 2", guru: "Pak Ahmad", ruang: "Lab 1", active: false },
              { jam: "14.40", mapel: "Biologi", kelas: "11 IPA 1", guru: "Bu Dewi", ruang: "Lab 2", active: false },
            ].map((j, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${j.break ? "opacity-50" : j.active ? "" : ""}`}
                style={j.active ? { background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)" } : { border: "1px solid transparent" }}>
                <div className="text-xs font-black w-12 flex-shrink-0" style={{ color: j.active ? "#6366f1" : "#94a3b8" }}>{j.jam}</div>
                {j.break ? (
                  <div className="flex-1 text-center text-xs text-slate-400 font-semibold tracking-widest">— {j.mapel} —</div>
                ) : (
                  <>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-slate-800 truncate">{j.mapel}</div>
                      <div className="text-xs text-slate-400">{j.guru} · {j.kelas}</div>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-lg font-semibold flex-shrink-0"
                      style={{ background: j.active ? "rgba(99,102,241,0.12)" : "rgba(148,163,184,0.1)", color: j.active ? "#6366f1" : "#94a3b8" }}>
                      {j.ruang}
                    </span>
                    {j.active && <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse flex-shrink-0" />}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pengumuman Sekolah */}
        <div className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-slate-800">Pengumuman</h3>
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "rgba(236,72,153,0.12)", color: "#ec4899" }}>4 baru</span>
          </div>
          <div className="space-y-3">
            {[
              { judul: "Ujian Tengah Semester", isi: "UTS akan dilaksanakan pada 15–20 Juni 2026. Jadwal tersedia di papan pengumuman.", tgl: "Hari ini", prio: "high", icon: "📋" },
              { judul: "Pembayaran SPP Juni", isi: "Batas pembayaran SPP bulan Juni adalah tanggal 10 Juni 2026.", tgl: "Kemarin", prio: "medium", icon: "💳" },
              { judul: "Peringatan Hari Lingkungan", isi: "Seluruh siswa diharap membawa tanaman pada Jumat 7 Juni 2026.", tgl: "3 hari lalu", prio: "low", icon: "🌿" },
              { judul: "Rapat Orang Tua Wali", isi: "Rapat wali murid kelas 12 dijadwalkan pada 22 Juni 2026 pukul 09.00.", tgl: "5 hari lalu", prio: "medium", icon: "👨‍👩‍👧" },
            ].map((p, i) => {
              const prioStyle = { high: { bg: "rgba(239,68,68,0.1)", color: "#ef4444" }, medium: { bg: "rgba(245,158,11,0.1)", color: "#f59e0b" }, low: { bg: "rgba(16,185,129,0.1)", color: "#10b981" } };
              return (
                <div key={i} className="p-4 rounded-xl cursor-pointer hover:shadow-sm transition-all"
                  style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(148,163,184,0.15)" }}>
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{p.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-slate-800 truncate">{p.judul}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0"
                          style={{ background: prioStyle[p.prio].bg, color: prioStyle[p.prio].color }}>
                          {p.prio === "high" ? "Penting" : p.prio === "medium" ? "Info" : "Umum"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{p.isi}</p>
                      <p className="text-xs text-slate-400 mt-1.5">🕙 {p.tgl}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ujian Mendatang + Top Siswa */}
        <div className="space-y-5">
          {/* Ujian countdown */}
          <div className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <h3 className="font-bold text-slate-800 mb-4">Ujian Mendatang</h3>
            <div className="space-y-3">
              {[
                { nama: "UTS Matematika", kelas: "Semua Kelas", tgl: "15 Jun", hari: 10, color: "#6366f1" },
                { nama: "Praktikum Kimia", kelas: "10 & 11 IPA", tgl: "12 Jun", hari: 7, color: "#10b981" },
                { nama: "Ujian Lisan B. Ing", kelas: "12 IPS 1", tgl: "10 Jun", hari: 5, color: "#f59e0b" },
                { nama: "Try Out UN", kelas: "Kelas 12", tgl: "8 Jun", hari: 3, color: "#ef4444" },
              ].map((u, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: `${u.color}08`, border: `1px solid ${u.color}20` }}>
                  <div className="w-10 h-10 rounded-xl flex flex-col items-center justify-center text-white flex-shrink-0"
                    style={{ background: u.color }}>
                    <span className="text-sm font-black leading-none">{u.hari}</span>
                    <span className="text-xs opacity-80">hari</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-slate-800 truncate">{u.nama}</div>
                    <div className="text-xs text-slate-400">{u.kelas} · {u.tgl} Jun</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top siswa */}
          <div className="rounded-2xl p-6"
            style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <h3 className="font-bold text-slate-800 mb-4">🏆 Top Siswa</h3>
            <div className="space-y-2.5">
              {[
                { nama: "Ahmad Rizky", kelas: "11 IPA 1", nilai: 97, avatar: "AR", color: "#f59e0b" },
                { nama: "Rini Handayani", kelas: "10 IPA 1", nilai: 95, avatar: "RH", color: "#6366f1" },
                { nama: "Dewi Kusuma", kelas: "12 IPS 1", nilai: 93, avatar: "DK", color: "#10b981" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{ background: i === 0 ? "#fef08a" : i === 1 ? "#e2e8f0" : "#fed7aa", color: i === 0 ? "#854d0e" : i === 1 ? "#475569" : "#9a3412" }}>
                    {i + 1}
                  </div>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: s.color }}>{s.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-800 truncate">{s.nama}</div>
                    <div className="text-xs text-slate-400">{s.kelas}</div>
                  </div>
                  <div className="text-base font-black" style={{ color: s.color }}>{s.nilai}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
