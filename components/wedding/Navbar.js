"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [{ href: "#layanan", label: "Layanan" }, { href: "#galeri", label: "Galeri" }, { href: "#paket", label: "Paket" }, { href: "#kontak", label: "Kontak" }];
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className={`font-bold text-xl tracking-wide ${scrolled ? "text-rose-700" : "text-white"}`}>
          💍 Amoura<span className="text-rose-400">Wedding</span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.href} href={l.href} className={`text-sm font-medium transition-colors hover:text-rose-500 ${scrolled ? "text-slate-600" : "text-white/90"}`}>{l.label}</a>
          ))}
          <a href="#kontak" className="bg-rose-500 hover:bg-rose-400 text-white px-5 py-2 rounded-full text-sm font-bold transition-colors">Konsultasi Gratis</a>
        </nav>
        <button onClick={() => setOpen(!open)} className={`md:hidden p-2 ${scrolled ? "text-slate-700" : "text-white"}`}>
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-current ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-current transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>
      {open && (
        <nav className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4">
          {links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-slate-700 hover:text-rose-500 font-medium">{l.label}</a>)}
          <a href="#kontak" className="bg-rose-500 text-white px-5 py-2 rounded-full text-center font-bold">Konsultasi Gratis</a>
        </nav>
      )}
    </header>
  );
}
