export default function Loading() {
  return (
    <div style={{ display:"flex", height:"100vh", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"16px", background:"#080810" }}>
      <div style={{ width:"36px", height:"36px", border:"3px solid rgba(167,139,250,0.15)", borderTop:"3px solid #a78bfa", borderRadius:"50%", animation:"spin 0.8s linear infinite" }}/>
      <div style={{ color:"rgba(167,139,250,0.5)", fontSize:"11px", fontWeight:700, letterSpacing:"0.12em" }}>MEMUAT DEMO...</div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
