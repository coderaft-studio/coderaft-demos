export default function Footer() {
  return (
    <footer className="bg-rose-900 text-rose-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="text-white font-bold text-xl mb-3">💍 Amoura<span className="text-rose-300">Wedding</span></div>
            <p className="text-sm leading-relaxed max-w-xs">Mewujudkan pernikahan impian dengan sentuhan profesional dan penuh cinta sejak 2016.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Layanan</h4>
            <ul className="space-y-2 text-sm">
              {["Full Wedding Organizer", "Dekorasi & Florist", "Foto & Video", "Catering", "Entertainment"].map(l => <li key={l}><a href="#layanan" className="hover:text-white transition-colors">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Kontak</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 +62 821-XXXX-XXXX</li>
              <li>📧 hello@amoura-wedding.id</li>
              <li>📍 Jakarta Selatan</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-rose-800 pt-6 text-center text-xs">
          <p>© 2024 Amoura Wedding. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
