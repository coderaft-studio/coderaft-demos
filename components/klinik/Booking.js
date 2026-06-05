"use client";
import { useState } from "react";
const dokterList = ["dr. Ahmad Fauzi, Sp.JP", "dr. Siti Rahayu, Sp.N", "drg. Budi Santoso", "dr. Lina Handayani, Sp.M"];
const times = ["08.00", "09.00", "10.00", "11.00", "13.00", "14.00", "15.00", "16.00"];

export default function Booking() {
  const [form, setForm] = useState({ nama: "", wa: "", layanan: "", dokter: "", tanggal: "", jam: "", keluhan: "" });
  const [sent, setSent] = useState(false);
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-teal-600 font-semibold tracking-widest uppercase text-sm mb-3">Online</p>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Booking <span className="text-teal-600">Dokter</span></h2>
          <p className="text-slate-500">Booking mudah, cepat, dan tanpa antri panjang</p>
        </div>
        <div className="bg-teal-50 rounded-3xl p-8 border border-teal-100">
          {sent ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Booking Berhasil!</h3>
              <p className="text-slate-500 text-sm">Konfirmasi akan dikirim ke WhatsApp Anda dalam 30 menit.</p>
              <button onClick={() => setSent(false)} className="mt-4 text-teal-600 underline text-sm">Booking lagi</button>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="grid md:grid-cols-2 gap-4">
              {[{ name: "nama", label: "Nama Lengkap *", placeholder: "Budi Santoso", type: "text" }, { name: "wa", label: "No. WhatsApp *", placeholder: "08XXXXXXXXXX", type: "tel" }].map(f => (
                <div key={f.name}>
                  <label className="block text-xs font-medium text-slate-600 mb-1">{f.label}</label>
                  <input required name={f.name} type={f.type} value={form[f.name]} onChange={handle} placeholder={f.placeholder}
                    className="w-full bg-white border border-teal-200 focus:border-teal-400 rounded-xl px-4 py-3 text-sm outline-none transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Layanan *</label>
                <select required name="layanan" value={form.layanan} onChange={handle} className="w-full bg-white border border-teal-200 focus:border-teal-400 rounded-xl px-4 py-3 text-sm outline-none">
                  <option value="">Pilih layanan...</option>
                  {["Kardiologi", "Neurologi", "Gigi & Mulut", "Mata", "Umum / MCU", "Pediatri"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Pilih Dokter</label>
                <select name="dokter" value={form.dokter} onChange={handle} className="w-full bg-white border border-teal-200 focus:border-teal-400 rounded-xl px-4 py-3 text-sm outline-none">
                  <option value="">Pilih dokter...</option>
                  {dokterList.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Tanggal Kunjungan *</label>
                <input required type="date" name="tanggal" value={form.tanggal} onChange={handle} className="w-full bg-white border border-teal-200 focus:border-teal-400 rounded-xl px-4 py-3 text-sm outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Jam Kunjungan *</label>
                <select required name="jam" value={form.jam} onChange={handle} className="w-full bg-white border border-teal-200 focus:border-teal-400 rounded-xl px-4 py-3 text-sm outline-none">
                  <option value="">Pilih jam...</option>
                  {times.map(t => <option key={t}>{t} WIB</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">Keluhan / Catatan</label>
                <textarea name="keluhan" value={form.keluhan} onChange={handle} rows={3} placeholder="Ceritakan keluhan atau hal yang ingin dikonsultasikan..."
                  className="w-full bg-white border border-teal-200 focus:border-teal-400 rounded-xl px-4 py-3 text-sm outline-none resize-none" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white py-4 rounded-xl font-bold transition-colors">Konfirmasi Booking 📅</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
