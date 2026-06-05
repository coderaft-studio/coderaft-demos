"use client";
import { useState } from "react";

export default function Kontak() {
  const [form, setForm] = useState({ nama: "", wa: "", tanggal: "", tamu: "", paket: "", pesan: "" });
  const [sent, setSent] = useState(false);
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = e => { e.preventDefault(); setSent(true); };

  return (
    <section id="kontak" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-3">Hubungi Kami</p>
          <h2 className="text-4xl font-bold text-slate-800 mb-6">Mulai <span className="text-rose-500">Perjalanan Anda</span></h2>
          <p className="text-slate-500 leading-relaxed mb-8">Konsultasi pertama <strong className="text-slate-700">GRATIS</strong>. Ceritakan impian pernikahan Anda dan kami akan siapkan proposal dalam 24 jam.</p>
          <div className="space-y-4">
            {[{ icon: "💬", label: "WhatsApp", val: "+62 821-XXXX-XXXX" }, { icon: "📧", label: "Email", val: "hello@amoura-wedding.id" }, { icon: "📍", label: "Kantor", val: "Jl. Kemang Raya No.12, Jakarta Selatan" }, { icon: "🕙", label: "Jam Buka", val: "Senin–Sabtu, 09.00–18.00 WIB" }].map(item => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                <div>
                  <div className="text-slate-400 text-xs">{item.label}</div>
                  <div className="text-slate-700 font-medium text-sm">{item.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-rose-50 rounded-3xl p-8 border border-rose-100">
          {sent ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">💍</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Terima kasih!</h3>
              <p className="text-slate-500 text-sm">Tim kami akan menghubungi Anda dalam 1×24 jam.</p>
              <button onClick={() => setSent(false)} className="mt-4 text-rose-500 underline text-sm">Kirim lagi</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Form Konsultasi</h3>
              <div className="grid grid-cols-2 gap-4">
                {[{ name: "nama", label: "Nama Calon Pengantin *", placeholder: "Budi & Rini" }, { name: "wa", label: "No. WhatsApp *", placeholder: "0821XXXXXXXX" }].map(f => (
                  <div key={f.name}>
                    <label className="block text-xs font-medium text-slate-500 mb-1">{f.label}</label>
                    <input required name={f.name} value={form[f.name]} onChange={handle} placeholder={f.placeholder}
                      className="w-full bg-white border border-rose-200 focus:border-rose-400 rounded-xl px-4 py-3 text-sm outline-none transition-all" />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Tanggal Pernikahan</label>
                  <input type="date" name="tanggal" value={form.tanggal} onChange={handle}
                    className="w-full bg-white border border-rose-200 focus:border-rose-400 rounded-xl px-4 py-3 text-sm outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Estimasi Tamu</label>
                  <select name="tamu" value={form.tamu} onChange={handle}
                    className="w-full bg-white border border-rose-200 focus:border-rose-400 rounded-xl px-4 py-3 text-sm outline-none">
                    <option value="">Pilih...</option>
                    {["< 100 orang", "100–300 orang", "300–500 orang", "500+ orang"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Paket yang Diminati</label>
                <select name="paket" value={form.paket} onChange={handle}
                  className="w-full bg-white border border-rose-200 focus:border-rose-400 rounded-xl px-4 py-3 text-sm outline-none">
                  <option value="">Pilih paket...</option>
                  {["Silver", "Gold", "Platinum", "Belum tahu"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Ceritakan Impian Pernikahan Anda</label>
                <textarea name="pesan" value={form.pesan} onChange={handle} rows={3}
                  placeholder="Tema, venue, konsep, atau hal spesial yang Anda inginkan..."
                  className="w-full bg-white border border-rose-200 focus:border-rose-400 rounded-xl px-4 py-3 text-sm outline-none resize-none" />
              </div>
              <button type="submit" className="w-full bg-rose-500 hover:bg-rose-400 text-white py-4 rounded-xl font-bold transition-colors">
                Kirim Konsultasi 💍
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
