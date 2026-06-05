export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-8">
          <div><div className="text-white font-bold text-xl mb-3">🏠 Prime<span className="text-amber-400">Property</span></div><p className="text-sm leading-relaxed">Membantu ribuan keluarga menemukan rumah impian mereka sejak 2012.</p></div>
          <div><h4 className="text-white font-semibold mb-4 text-sm">Properti</h4><ul className="space-y-2 text-sm">{["Rumah", "Apartemen", "Ruko", "Villa", "Tanah"].map(l => <li key={l}><a href="#listing" className="hover:text-amber-400 transition-colors">{l}</a></li>)}</ul></div>
          <div><h4 className="text-white font-semibold mb-4 text-sm">Kontak</h4><ul className="space-y-2 text-sm"><li>📞 (021) 9876-5432</li><li>📧 info@primeproperty.id</li><li>📍 Jakarta Selatan</li></ul></div>
        </div>
        <div className="border-t border-slate-800 pt-6 text-center text-xs"><p>© 2024 Prime Property. All rights reserved.</p></div>
      </div>
    </footer>
  );
}
