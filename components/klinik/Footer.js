export default function Footer() {
  return (
    <footer className="bg-teal-900 text-teal-200 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-8">
          <div><div className="text-white font-bold text-xl mb-3">🏥 Sehat<span className="text-teal-300">Clinic</span></div><p className="text-sm leading-relaxed">Melayani kesehatan Anda dengan standar medis tertinggi sejak 2008.</p></div>
          <div><h4 className="text-white font-semibold mb-4 text-sm">Layanan</h4><ul className="space-y-2 text-sm">{["Kardiologi", "Neurologi", "Gigi & Mulut", "Mata", "Umum & MCU"].map(l => <li key={l}><a href="#layanan" className="hover:text-white transition-colors">{l}</a></li>)}</ul></div>
          <div><h4 className="text-white font-semibold mb-4 text-sm">Kontak</h4><ul className="space-y-2 text-sm"><li>📞 (021) 1234-5678</li><li>📧 info@sehatclinic.id</li><li>📍 Jl. Kesehatan No.1, Jakarta</li><li>🕙 Senin–Minggu 07.00–21.00</li></ul></div>
        </div>
        <div className="border-t border-teal-800 pt-6 text-center text-xs"><p>© 2024 Sehat Clinic. All rights reserved.</p></div>
      </div>
    </footer>
  );
}
