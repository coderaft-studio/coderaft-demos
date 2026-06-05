const reviews = [
  { name: "Rini & Budi", date: "Maret 2026", avatar: "RB", color: "bg-rose-500", text: "Amoura Wedding membuat hari pernikahan kami menjadi lebih dari yang kami bayangkan. Setiap detail diperhatikan, tim yang ramah dan profesional. Terima kasih atas kenangan indah ini!" },
  { name: "Sari & Andi", date: "Januari 2026", avatar: "SA", color: "bg-pink-500", text: "Dari awal konsultasi hingga hari H, semua berjalan lancar. Dekorasi sangat cantik sesuai tema yang kami inginkan. Tamu-tamu kami semua terpesona!" },
  { name: "Dewi & Hendra", date: "November 2025", avatar: "DH", color: "bg-fuchsia-500", text: "Worth every penny! Profesional, detail-oriented, dan selalu siap membantu. Foto dan video hasil dokumentasi sangat memukau. Definitely recommended!" },
];

export default function Testimoni() {
  return (
    <section className="py-24 bg-rose-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-3">Cerita Mereka</p>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Pasangan <span className="text-rose-500">Bahagia</span></h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-yellow-400 text-2xl">★★★★★</span>
            <span className="text-slate-700 font-bold text-xl">4.9</span>
            <span className="text-slate-400 text-sm">(500+ ulasan)</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map(r => (
            <div key={r.name} className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-yellow-400 text-lg mb-4">★★★★★</div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className={`${r.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>{r.avatar}</div>
                <div>
                  <div className="font-bold text-slate-800 text-sm">{r.name}</div>
                  <div className="text-slate-400 text-xs">{r.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
