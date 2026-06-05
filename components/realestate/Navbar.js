"use client";
import { useState, useEffect } from "react";
const links = [{ href: "#listing", label: "Properti" }, { href: "#agen", label: "Agen" }, { href: "#proses", label: "Cara Beli" }, { href: "#kontak", label: "Kontak" }];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-slate-950/95 backdrop-blur shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="font-bold text-xl text-white">🏠 Prime<span className="text-amber-400">Property</span></a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => <a key={l.href} href={l.href} className="text-slate-300 hover:text-amber-400 transition-colors text-sm font-medium">{l.label}</a>)}
          <a href="#kontak" className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2 rounded-full text-sm font-bold transition-colors">Konsultasi</a>
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">☰</button>
      </div>
      {open && <nav className="md:hidden bg-slate-950 border-t border-slate-800 px-6 py-4 flex flex-col gap-4">{links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-slate-300 hover:text-amber-400 font-medium">{l.label}</a>)}<a href="#kontak" className="bg-amber-500 text-slate-950 px-5 py-2 rounded-full text-center font-bold">Konsultasi</a></nav>}
    </header>
  );
}
