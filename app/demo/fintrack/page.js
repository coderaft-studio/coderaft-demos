"use client";
import { useState } from "react";
import Sidebar from "@/components/fintrack/Sidebar";
import DashboardView from "@/components/fintrack/views/DashboardView";
import TransaksiView from "@/components/fintrack/views/TransaksiView";
import BudgetView from "@/components/fintrack/views/BudgetView";

const titles = { dashboard: "Dashboard", pemasukan: "Pemasukan", pengeluaran: "Pengeluaran", budget: "Budget" };

export default function FinTrackPage() {
  const [active, setActive] = useState("dashboard");
  const renderView = () => {
    if (active === "dashboard") return <DashboardView />;
    if (active === "pemasukan") return <TransaksiView type="in" />;
    if (active === "pengeluaran") return <TransaksiView type="out" />;
    if (active === "budget") return <BudgetView />;
  };
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#060610" }}>
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 flex-shrink-0"
          style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(52,211,153,0.1)", backdropFilter: "blur(10px)" }}>
          <div>
            <h1 className="text-base font-bold" style={{ color: "#e2e8f0" }}>{titles[active]}</h1>
            <p className="text-xs" style={{ color: "rgba(52,211,153,0.6)" }}>Juni 2026 · Real-time</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#10b981" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              Live
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}>U</div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{renderView()}</main>
      </div>
    </div>
  );
}
