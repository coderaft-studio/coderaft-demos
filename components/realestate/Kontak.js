"use client";
import { useState } from "react";
export default function Kontak() {
  const [form, setForm] = useState({ nama: "", wa: "", tipe: "", budget: "", lokasi: "", pesan: "" });
  const [sent, setSent] = useState(false);
  return (
    <section id="kontak" className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-3">Kontak</p>
          <h2 className="text-4xl font-bold text-white mb-4">Konsultasi <span className="text-amber-400">Gratis</span></h2>
          <p className="text-slate-400">Ceritakan kebutuhan properti Anda dan agen kami akan menghubungi dalam 1 jam</p>
        </div>
        <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
          {sent ? (
            <div className="text-center py-12"><div className="text-5xl mb-4">🏠</div><h3 className="text-xl font-bold text-white mb-2">Terima Kasih!</h3><p className="text-slate-400 text-sm">Agen kami akan menghubungi Anda segera.</p><button onClick={() => setSent(false)} className="mt-4 text-amber-400 underline text-sm">Kirim lagi</button></div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="grid md:grid-cols-2 gap-4">
              {[{ name: "nama", label: "Nama *", ph: "Budi Santoso" }, { name: "wa", label: "WhatsApp *", ph: "08XXXXXXXXXX" }].map(f => (
                <div key={f.name}><label className="block text-xs font-medium text-slate-400 mb-1">{f.label}</label><input required name={f.name} value={form[f.name]} onChange={e => setForm({ ...form, [e.target.name]: e.target.value })} placeholder={f.ph} className="w-full bg-slate-900 border border-slate-600 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white outline-none transition-all placeholder-slate-500" /></div>
              ))}
              {[{ name: "tipe", label: "Tipe Properti", opts: ["Rumah", "Apartemen", "Ruko", "Villa", "Tanah"] }, { name: "budget", label: "Budget", opts: ["< 500 jt", "500 jt – 1 M", "1 M – 3 M", "3 M – 5 M", "> 5 M"] }, { name: "lokasi", label: "Lokasi yang Diinginkan", opts: ["Jakarta Selatan", "Jakarta Barat", "Jakarta Utara", "Tangerang", "Bekasi", "Bogor"] }].map(f => (
                <div key={f.name}><label className="block text-xs font-medium text-slate-400 mb-1">{f.label}</label><select name={f.name} value={form[f.name]} onChange={e => setForm({ ...form, [e.target.name]: e.target.value })} className="w-full bg-slate-900 border border-slate-600 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white outline-none"><option value="">Pilih...</option>{f.opts.map(o => <option key={o}>{o}</option>)}</select></div>
              ))}
              <div className="md:col-span-2"><label className="block text-xs font-medium text-slate-400 mb-1">Spesifikasi Tambahan</label><textarea name="pesan" value={form.pesan} onChange={e => setForm({ ...form, pesan: e.target.value })} rows={3} placeholder="Jumlah kamar, fasilitas yang diinginkan, dll." className="w-full bg-slate-900 border border-slate-600 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white outline-none resize-none placeholder-slate-500" /></div>
              <div className="md:col-span-2"><button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-4 rounded-xl font-bold transition-colors">Minta Konsultasi Gratis 🏠</button></div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
