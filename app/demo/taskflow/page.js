"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Sidebar from "@/components/taskflow/Sidebar";
import { initProjects } from "@/components/taskflow/views/ProjectsView";
import { initTasks }    from "@/components/taskflow/views/TasksView";
import { initTeam }     from "@/components/taskflow/views/TeamView";

const ViewLoader = () => (
  <div style={{ display:"flex", height:"calc(100vh - 56px)", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"12px" }}>
    <div style={{ width:"30px", height:"30px", border:"2px solid rgba(99,102,241,0.15)", borderTop:"2px solid #6366f1", borderRadius:"50%", animation:"spin 0.7s linear infinite" }}/>
    <div style={{ color:"rgba(99,102,241,0.4)", fontSize:"10px", letterSpacing:"0.1em" }}>MEMUAT</div>
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

const DashboardView    = dynamic(()=>import("@/components/taskflow/views/DashboardView"),                             { loading:()=><ViewLoader/>, ssr:false });
const ProjectsView     = dynamic(()=>import("@/components/taskflow/views/ProjectsView").then(m=>({default:m.default})),{ loading:()=><ViewLoader/>, ssr:false });
const TasksView        = dynamic(()=>import("@/components/taskflow/views/TasksView").then(m=>({default:m.default})),   { loading:()=><ViewLoader/>, ssr:false });
const TeamView         = dynamic(()=>import("@/components/taskflow/views/TeamView").then(m=>({default:m.default})),    { loading:()=><ViewLoader/>, ssr:false });
const QuickCreateModal = dynamic(()=>import("@/components/taskflow/QuickCreateModal"),                                 { ssr:false });

const titles = { dashboard:"Dashboard", projects:"Projects", tasks:"Tasks", team:"Team" };
const subs   = { dashboard:"Overview semua project", projects:"Kelola project aktif", tasks:"Semua task dan status", team:"Anggota tim" };

export default function TaskFlowPage() {
  const [active,   setActive]   = useState("dashboard");
  const [projects, setProjects] = useState(initProjects);
  const [tasks,    setTasks]    = useState(initTasks);
  const [team,     setTeam]     = useState(initTeam);
  const [newModal, setNewModal] = useState(null);

  const renderView = () => {
    if (active === "dashboard") return <DashboardView />;
    if (active === "projects")  return <ProjectsView projects={projects} setProjects={setProjects} onViewTasks={()=>setActive("tasks")} />;
    if (active === "tasks")     return <TasksView tasks={tasks} setTasks={setTasks} />;
    if (active === "team")      return <TeamView team={team} setTeam={setTeam} />;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar active={active} setActive={setActive} onNew={(type)=>setNewModal(type)} />
      <div className="flex-1 flex flex-col overflow-hidden" style={{ background:"#f8fafc" }}>
        <header className="h-14 bg-white flex items-center px-6 flex-shrink-0" style={{ borderBottom:"1px solid #e2e8f0" }}>
          <div>
            <h1 className="text-sm font-bold text-slate-800">{titles[active]}</h1>
            <p className="text-xs text-slate-400">{subs[active]}</p>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{renderView()}</main>
      </div>
      {newModal && (
        <QuickCreateModal type={newModal} onClose={()=>setNewModal(null)}
          projects={projects} setProjects={setProjects}
          tasks={tasks} setTasks={setTasks}
          team={team} setTeam={setTeam} />
      )}
    </div>
  );
}
