"use client";
import { useState, useEffect } from "react";
const links = [{ href: "#layanan", label: "Layanan" }, { href: "#dokter", label: "Dokter" }, { href: "#booking", label: "Booking" }, { href: "#kontak", label: "Kontak" }];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className={`font-bold text-xl ${scrolled ? "text-teal-700" : "text-white"}`}>🏥 Sehat<span className="text-teal-400">Clinic</span></a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => <a key={l.href} href={l.href} className={`text-sm font-medium hover:text-teal-500 transition-colors ${scrolled ? "text-slate-600" : "text-white/90"}`}>{l.label}</a>)}
          <a href="#booking" className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2 rounded-full text-sm font-bold transition-colors">Booking Sekarang</a>
        </nav>
        <button onClick={() => setOpen(!open)} className={`md:hidden p-2 ${scrolled ? "text-slate-700" : "text-white"}`}>☰</button>
      </div>
      {open && <nav className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4">{links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-slate-700 hover:text-teal-500 font-medium">{l.label}</a>)}<a href="#booking" className="bg-teal-600 text-white px-5 py-2 rounded-full text-center font-bold">Booking</a></nav>}
    </header>
  );
}
