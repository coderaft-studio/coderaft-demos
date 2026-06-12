export const metadata = { title: "Bumbu Nusantara — Cita Rasa Otentik Indonesia" };

export default function Layout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Satisfy&family=Jost:wght@300;400;500;600&display=swap"/>
      <style>{`
        .kl-wow { opacity:0; transform:translateY(40px); transition:opacity .9s ease, transform .9s ease; }
        .kl-wow.kl-animated { opacity:1 !important; transform:none !important; }
        .kl-fadeInLeft.kl-wow { transform:translateX(-70px); }
        .kl-fadeInRight.kl-wow { transform:translateX(70px); }
        .kl-fadeIn.kl-wow { transform:none; }
        .kl-d1 { transition-delay:.1s !important; }
        .kl-d2 { transition-delay:.2s !important; }
        .kl-d3 { transition-delay:.35s !important; }
        .kl-d4 { transition-delay:.5s !important; }
        .kl-slide { position:absolute; inset:0; background-size:cover; background-position:center; opacity:0; transition:opacity .8s ease; display:flex; align-items:flex-end; }
        .kl-slide.kl-active { opacity:1; }
      `}</style>
      {children}
    </>
  );
}
