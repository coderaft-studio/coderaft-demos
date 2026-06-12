export default function Loading() {
  return (
    <div style={{ display:"flex", height:"100vh", background:"#18140e", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"20px" }}>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"28px", color:"#c9a84c", letterSpacing:"0.15em", fontWeight:400 }}>
        Bumbu <span style={{ fontFamily:"'Satisfy',cursive", color:"rgba(201,168,76,0.6)" }}>Nusantara</span>
      </div>
      <div style={{ width:"40px", height:"1px", background:"#c9a84c", animation:"klload 1.2s ease-in-out infinite alternate" }}/>
      <style>{`@keyframes klload{to{width:80px}}`}</style>
    </div>
  );
}
