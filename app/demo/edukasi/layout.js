export const metadata = { title: "BelajarKu — Platform Belajar Online Terbaik Indonesia" };

export default function Layout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800&display=swap"/>
      <style>{`
        .ed-wow { opacity:0; transition:opacity .7s ease, transform .7s ease; }
        .ed-wow.ed-animated { opacity:1 !important; transform:none !important; }
        .ed-fadeInLeft.ed-wow { transform:translateX(-60px); }
        .ed-fadeInRight.ed-wow { transform:translateX(60px); }
        .ed-bounceIn.ed-wow { transform:scale(0.7); }
        .ed-bounceInUp.ed-wow { transform:translateY(60px); }
        .ed-flipInY.ed-wow { transform:perspective(400px) rotateY(90deg); }
        .ed-d1 { transition-delay:.1s !important; }
        .ed-d2 { transition-delay:.2s !important; }
        .ed-d3 { transition-delay:.35s !important; }
      `}</style>
      {children}
    </>
  );
}
