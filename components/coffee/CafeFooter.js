export default function CafeFooter(){
  return(
    <footer style={{background:"#3d2314",color:"rgba(253,246,238,0.7)"}}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-8">
          <div>
            <div className="font-black text-2xl mb-3" style={{color:"#f59e0b",fontFamily:"serif"}}>Kopiday ☕</div>
            <p className="text-sm leading-relaxed">Specialty coffee dari petani lokal Indonesia. Biji terbaik, diseduh dengan penuh cinta.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm" style={{color:"#fdf6ee"}}>Menu</h4>
            <ul className="space-y-2 text-sm">
              {["Espresso Based","Manual Brew","Non-Coffee","Signature Series","Seasonal Menu"].map(l=><li key={l}><a href="#menu" className="hover:text-amber-400 transition-colors">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-sm" style={{color:"#fdf6ee"}}>Info</h4>
            <ul className="space-y-2 text-sm">
              <li>📍 Kemang Raya No.22, Jakarta</li>
              <li>📞 +62 812-3456-7890</li>
              <li>🕙 07.00–22.00 (Setiap hari)</li>
              <li>📧 hello@kopiday.id</li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 text-center text-xs" style={{borderColor:"rgba(245,158,11,0.2)"}}>
          <p>© 2024 Kopiday Café. Dibuat dengan ❤️ untuk pencinta kopi Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}
