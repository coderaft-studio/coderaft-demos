export default function GymFooter(){
  return(
    <footer style={{background:"#080808",borderTop:"1px solid rgba(163,230,53,0.1)"}}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-8">
          <div>
            <div className="font-black text-2xl mb-3"><span style={{color:"#a3e635"}}>IRON</span><span style={{color:"#fff"}}>FORGE</span></div>
            <p className="text-sm" style={{color:"rgba(240,253,244,0.4)"}}>Gym & Fitness Studio #1 di Jakarta. Bergabunglah dengan 5.000+ member yang sudah merasakan perubahannya.</p>
          </div>
          <div>
            <h4 className="font-black mb-4 text-sm" style={{color:"#fff"}}>Program</h4>
            <ul className="space-y-2 text-sm" style={{color:"rgba(240,253,244,0.4)"}}>
              {["Weight Training","Boxing & MMA","Yoga & Pilates","HIIT Cardio","Personal Training"].map(l=><li key={l}><a href="#program" className="hover:text-lime-400 transition-colors">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-4 text-sm" style={{color:"#fff"}}>Kontak</h4>
            <ul className="space-y-2 text-sm" style={{color:"rgba(240,253,244,0.4)"}}>
              <li>📍 Jl. Sudirman No.88, Jakarta</li>
              <li>📞 +62 812-3456-7890</li>
              <li>🕙 Buka 24 Jam</li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-6 text-center text-xs" style={{borderColor:"rgba(163,230,53,0.1)",color:"rgba(240,253,244,0.3)"}}>
          <p>© 2024 IronForge Gym. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
