"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/fintrack/Sidebar";

const ViewLoader = () => (
  <div style={{ display:"flex", height:"calc(100vh - 64px)", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"12px" }}>
    <div style={{ width:"30px", height:"30px", border:"2px solid rgba(16,185,129,0.15)", borderTop:"2px solid #10b981", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
    <div style={{ color:"rgba(16,185,129,0.4)", fontSize:"10px", letterSpacing:"0.1em" }}>MEMUAT</div>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

const DashboardView = dynamic(()=>import("@/components/fintrack/views/DashboardView"), { loading:()=><ViewLoader/>, ssr:false });
const TransaksiView = dynamic(()=>import("@/components/fintrack/views/TransaksiView"), { loading:()=><ViewLoader/>, ssr:false });
const BudgetView    = dynamic(()=>import("@/components/fintrack/views/BudgetView"),    { loading:()=><ViewLoader/>, ssr:false });

const titles = { dashboard:"Dashboard", pemasukan:"Pemasukan", pengeluaran:"Pengeluaran", budget:"Budget" };

export default function FinTrackPage() {
  const [active, setActive] = useState("dashboard");
  const renderView = () => {
    if (active === "dashboard")   return <DashboardView />;
    if (active === "pemasukan")   return <TransaksiView type="in" />;
    if (active === "pengeluaran") return <TransaksiView type="out" />;
    if (active === "budget")      return <BudgetView />;
  };
  return (
    <div className="flex h-screen overflow-hidden" style={{ background:"#060610" }}>
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 flex-shrink-0"
          style={{ background:"rgba(255,255,255,0.02)", borderBottom:"1px solid rgba(52,211,153,0.1)", backdropFilter:"blur(10px)" }}>
          <div>
            <h1 className="text-base font-bold" style={{ color:"#e2e8f0" }}>{titles[active]}</h1>
            <p className="text-xs" style={{ color:"rgba(52,211,153,0.6)" }}>Juni 2026 · Real-time</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs" style={{ background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.2)", color:"#10b981" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"/>Live
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background:"linear-gradient(135deg,#10b981,#059669)" }}>U</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{renderView()}</main>
      </div>
    </div>
  );
}
