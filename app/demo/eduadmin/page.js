"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/eduadmin/Sidebar";

const ViewLoader = () => (
  <div style={{ display:"flex", height:"calc(100vh - 64px)", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"12px" }}>
    <div style={{ width:"30px", height:"30px", border:"2px solid rgba(139,92,246,0.15)", borderTop:"2px solid #8b5cf6", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
    <div style={{ color:"rgba(139,92,246,0.4)", fontSize:"10px", letterSpacing:"0.1em" }}>MEMUAT</div>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

const DashboardView = dynamic(()=>import("@/components/eduadmin/views/DashboardView"), { loading:()=><ViewLoader/>, ssr:false });
const SiswaView     = dynamic(()=>import("@/components/eduadmin/views/SiswaView"),     { loading:()=><ViewLoader/>, ssr:false });
const KelasView     = dynamic(()=>import("@/components/eduadmin/views/KelasView"),     { loading:()=><ViewLoader/>, ssr:false });
const NilaiView     = dynamic(()=>import("@/components/eduadmin/views/NilaiView"),     { loading:()=><ViewLoader/>, ssr:false });
const AbsensiView   = dynamic(()=>import("@/components/eduadmin/views/AbsensiView"),   { loading:()=><ViewLoader/>, ssr:false });

const titles     = { dashboard:"Dashboard", siswa:"Data Siswa", kelas:"Manajemen Kelas", nilai:"Input Nilai", absensi:"Absensi Harian" };
const menuColors = { dashboard:"#6366f1", siswa:"#ec4899", kelas:"#f59e0b", nilai:"#10b981", absensi:"#3b82f6" };

export default function EduAdminPage() {
  const [active, setActive] = useState("dashboard");
  const renderView = () => {
    if (active === "dashboard") return <DashboardView />;
    if (active === "siswa")     return <SiswaView />;
    if (active === "kelas")     return <KelasView />;
    if (active === "nilai")     return <NilaiView />;
    if (active === "absensi")   return <AbsensiView />;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 flex-shrink-0"
          style={{ background:"rgba(255,255,255,0.8)", backdropFilter:"blur(12px)", borderBottom:"1px solid rgba(148,163,184,0.15)" }}>
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 rounded-full flex-shrink-0" style={{ background:menuColors[active] }}/>
            <div>
              <h1 className="text-sm font-bold text-slate-800">{titles[active]}</h1>
              <p className="text-xs text-slate-400">TA 2025/2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-xs">SMA Nusantara</span>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
              style={{ background:"linear-gradient(135deg,#8b5cf6,#3b82f6)" }}>AD</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{renderView()}</main>
      </div>
    </div>
  );
}
