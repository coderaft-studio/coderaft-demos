"use client";
import Image from "next/image";
import { useState } from "react";

const properties = [
  { id: 1, nama: "Villa Mewah Pondok Indah", lokasi: "Jakarta Selatan", harga: "8.500.000.000", tipe: "Rumah", kamar: 5, toilet: 4, luas: "600 m²", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80", badge: "Unggulan" },
  { id: 2, nama: "Apartemen Modern BSD", lokasi: "Tangerang Selatan", harga: "850.000.000", tipe: "Apartemen", kamar: 2, toilet: 2, luas: "65 m²", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80", badge: "Baru" },
  { id: 3, nama: "Rumah Townhouse Kemang", lokasi: "Jakarta Selatan", harga: "4.200.000.000", tipe: "Rumah", kamar: 4, toilet: 3, luas: "280 m²", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80", badge: null },
  { id: 4, nama: "Ruko 3 Lantai Grogol", lokasi: "Jakarta Barat", harga: "3.800.000.000", tipe: "Ruko", kamar: 0, toilet: 4, luas: "200 m²", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80", badge: null },
  { id: 5, nama: "Villa Puncak Weekend", lokasi: "Bogor", harga: "2.100.000.000", tipe: "Villa", kamar: 4, toilet: 3, luas: "400 m²", img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80", badge: "Hot" },
  { id: 6, nama: "Apartemen Studio Kelapa Gading", lokasi: "Jakarta Utara", harga: "450.000.000", tipe: "Apartemen", kamar: 1, toilet: 1, luas: "32 m²", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80", badge: null },
];

const badgeColor = { Unggulan: "bg-amber-500 text-slate-950", Baru: "bg-emerald-500 text-white", Hot: "bg-red-500 text-white" };

export default function Listing() {
  const [filter, setFilter] = useState("Semua");
  const [selected, setSelected] = useState(null);
  const types = ["Semua", "Rumah", "Apartemen", "Ruko", "Villa"];
  const filtered = filter === "Semua" ? properties : properties.filter(p => p.tipe === filter);

  return (
    <section id="listing" className="py-24 bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <p className="text-amber-400 font-semibold tracking-widest uppercase text-sm mb-1">Properti</p>
            <h2 className="text-4xl font-bold text-white">Pilihan <span className="text-amber-400">Terbaik</span></h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {types.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === t ? "bg-amber-500 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-amber-500/40 transition-all hover:-translate-y-1">
              <div className="relative h-48">
                <Image src={p.img} alt={p.nama} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                {p.badge && <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${badgeColor[p.badge]}`}>{p.badge}</span>}
                <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full">{p.tipe}</span>
              </div>
              <div className="p-5">
                <p className="text-slate-400 text-xs mb-1">📍 {p.lokasi}</p>
                <h3 className="text-white font-bold mb-3 group-hover:text-amber-400 transition-colors">{p.nama}</h3>
                <div className="flex gap-4 text-slate-400 text-xs mb-4">
                  {p.kamar > 0 && <span>🛏 {p.kamar} Kamar</span>}
                  <span>🚿 {p.toilet} Toilet</span>
                  <span>📐 {p.luas}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-amber-400 font-bold">Rp {Number(p.harga).toLocaleString("id")}</span>
                  <button onClick={() => setSelected(p)} className="bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 hover:border-amber-500 px-3 py-1.5 rounded-lg text-xs font-bold transition-all">Detail</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <div className="bg-slate-900 rounded-2xl w-full max-w-lg border border-slate-700 overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="relative h-56">
                <Image src={selected.img} alt={selected.nama} fill className="object-cover" />
                <button onClick={() => setSelected(null)} className="absolute top-3 right-3 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">✕</button>
                {selected.badge && <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${badgeColor[selected.badge]}`}>{selected.badge}</span>}
              </div>
              <div className="p-6">
                <p className="text-slate-400 text-xs mb-1">📍 {selected.lokasi}</p>
                <h3 className="text-white font-bold text-lg mb-4">{selected.nama}</h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[{ label: "Tipe", val: selected.tipe }, { label: "Luas", val: selected.luas }, { label: "Toilet", val: `${selected.toilet} unit` }, ...(selected.kamar > 0 ? [{ label: "Kamar", val: `${selected.kamar} kamar` }] : [])].map(item => (
                    <div key={item.label} className="bg-slate-800 rounded-xl p-3 text-center">
                      <div className="text-slate-400 text-xs">{item.label}</div>
                      <div className="text-white font-semibold text-sm">{item.val}</div>
                    </div>
                  ))}
                </div>
                <div className="text-amber-400 font-bold text-xl mb-4">Rp {Number(selected.harga).toLocaleString("id")}</div>
                <div className="flex gap-3">
                  <button onClick={() => setSelected(null)} className="flex-1 border border-slate-600 text-slate-300 py-3 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors">Tutup</button>
                  <a href="#kontak" onClick={() => setSelected(null)} className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 py-3 rounded-xl font-bold text-sm text-center transition-colors">Hubungi Agen</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
