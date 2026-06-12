export default function Loading() {
  return (
    <div style={{ display:"flex", height:"100vh", background:"#1a1a2e", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"20px" }}>
      <div style={{ fontSize:"32px", fontWeight:800, fontFamily:"'Raleway',sans-serif", letterSpacing:"0.1em", background:"linear-gradient(50deg,#51ffb6,#57a0ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
        BelajarKu
      </div>
      <div style={{ width:"40px", height:"2px", background:"linear-gradient(90deg,#51ffb6,#57a0ff)", animation:"edload 1.2s ease-in-out infinite alternate", borderRadius:"2px" }}/>
      <style>{`@keyframes edload{to{width:80px}}`}</style>
    </div>
  );
}
