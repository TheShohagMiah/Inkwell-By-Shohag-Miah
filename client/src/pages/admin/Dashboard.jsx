import React from "react";
import {
  FileText,
  Users,
  Eye,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  ShieldCheck,
  History,
} from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  // Mock Data for the Terminal
  const stats = [
    {
      label: "Total_Documents",
      value: "1,284",
      change: "+12%",
      trending: "up",
      icon: FileText,
    },
    {
      label: "Active_Signatories",
      value: "892",
      change: "+4%",
      trending: "up",
      icon: Users,
    },
    {
      label: "Archive_Views",
      value: "42.5k",
      change: "-2%",
      trending: "down",
      icon: Eye,
    },
    {
      label: "System_Uptime",
      value: "99.98%",
      change: "Stable",
      trending: "neutral",
      icon: Activity,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      event: "New_Document_Committed",
      user: "Alex Rivera",
      time: "12m ago",
      status: "Success",
    },
    {
      id: 2,
      event: "User_Access_Elevated",
      user: "Sophia Wright",
      time: "1h ago",
      status: "Neutral",
    },
    {
      id: 3,
      event: "Archive_Backup_Generated",
      user: "System_Node",
      time: "3h ago",
      status: "Success",
    },
    {
      id: 4,
      event: "Failed_Login_Attempt",
      user: "IP_192.168.1.1",
      time: "5h ago",
      status: "Alert",
    },
  ];

  return (
    <div className="space-y-12">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-[0.2em] text-txt-main">
            Terminal_Main
          </h1>
          <p className="text-[10px] font-bold text-txt-muted uppercase tracking-[0.4em] mt-2 opacity-50">
            Node_Identifier:{" "}
            <span className="text-txt-main">InkWell_Beta_v2.0</span>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-soft border border-border-soft rounded-xl text-[10px] font-black uppercase tracking-widest text-txt-muted">
            Last_Sync: <span className="text-txt-main">09:42:11</span>
          </div>
          <button className="bg-txt-main text-main px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl">
            Generate_Report
          </button>
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-main border border-border-soft p-8 rounded-2xl group hover:border-txt-main/20 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-soft rounded-xl text-txt-muted group-hover:text-txt-main transition-colors">
                <stat.icon size={20} strokeWidth={2.5} />
              </div>
              {stat.trending === "up" ? (
                <span className="flex items-center gap-1 text-[10px] font-black text-emerald-500 bg-emerald-500/5 px-2 py-1 rounded">
                  {stat.change} <ArrowUpRight size={12} />
                </span>
              ) : stat.trending === "down" ? (
                <span className="flex items-center gap-1 text-[10px] font-black text-red-500 bg-red-500/5 px-2 py-1 rounded">
                  {stat.change} <ArrowDownRight size={12} />
                </span>
              ) : (
                <span className="text-[10px] font-black text-txt-muted bg-soft px-2 py-1 rounded">
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-[9px] font-black text-txt-muted uppercase tracking-[0.3em] mb-1">
              {stat.label}
            </p>
            <h3 className="text-2xl font-black text-txt-main tracking-tight">
              {stat.value}
            </h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- SYSTEM LOGS (LEDGER STYLE) --- */}
        <div className="lg:col-span-2 bg-main border border-border-soft rounded-3xl overflow-hidden shadow-sm">
          <div className="p-8 border-b border-border-soft flex items-center justify-between bg-soft/30">
            <div className="flex items-center gap-3">
              <History size={18} className="text-txt-main" />
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">
                Activity_Ledger
              </h4>
            </div>
            <button className="text-[9px] font-bold uppercase tracking-widest text-txt-muted hover:text-txt-main underline underline-offset-4">
              Export_Raw_Log
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border-soft">
                  <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-txt-muted">
                    Timestamp
                  </th>
                  <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-txt-muted">
                    Event_Type
                  </th>
                  <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-txt-muted">
                    Operator
                  </th>
                  <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-txt-muted">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {recentActivity.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-soft/50 transition-colors group"
                  >
                    <td className="px-8 py-5 text-[10px] font-bold text-txt-muted tracking-tighter">
                      {log.time}
                    </td>
                    <td className="px-8 py-5 text-[11px] font-bold text-txt-main">
                      {log.event}
                    </td>
                    <td className="px-8 py-5 text-[11px] font-medium text-txt-muted">
                      {log.user}
                    </td>
                    <td className="px-8 py-5">
                      <span
                        className={`text-[9px] font-black uppercase tracking-tighter px-3 py-1 rounded ${
                          log.status === "Success"
                            ? "bg-emerald-500/10 text-emerald-500"
                            : log.status === "Alert"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-soft text-txt-muted"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- SYSTEM HEALTH PANEL --- */}
        <div className="bg-txt-main text-main p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-10">
              <ShieldCheck size={32} strokeWidth={1.5} />
              <div className="px-3 py-1 border border-main/20 rounded-full text-[8px] font-black uppercase tracking-[0.2em]">
                Secure_Link
              </div>
            </div>
            <h4 className="text-xl font-black uppercase tracking-widest leading-tight mb-4">
              Archive_Integrity:{" "}
              <span className="text-emerald-400">Optimal</span>
            </h4>
            <p className="text-[10px] font-medium leading-relaxed text-main/60 uppercase tracking-widest">
              All data packets are encrypted via Node_v4. Security protocol 09
              is currently active across all shards.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em]">
                <span>CPU_Load</span>
                <span>24%</span>
              </div>
              <div className="h-1 bg-main/10 rounded-full overflow-hidden">
                <div className="h-full bg-main w-[24%]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em]">
                <span>RAM_Allocation</span>
                <span>68%</span>
              </div>
              <div className="h-1 bg-main/10 rounded-full overflow-hidden">
                <div className="h-full bg-main w-[68%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
