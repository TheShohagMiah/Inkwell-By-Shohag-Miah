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
  MoreVertical,
} from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  const stats = [
    {
      label: "Total_Documents",
      value: "1,284",
      change: "+12.5%",
      trending: "up",
      icon: FileText,
    },
    {
      label: "Active_Signatories",
      value: "892",
      change: "+4.2%",
      trending: "up",
      icon: Users,
    },
    {
      label: "Archive_Views",
      value: "42,500",
      change: "-2.1%",
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
    <div className="space-y-10 px-2 py-4">
      <Helmet>
        <title>Analytics Dashboard | INKWELL</title>
      </Helmet>

      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-txt-main tracking-tight">
            Analytics
          </h1>
          <p className="text-sm text-txt-muted mt-1 font-medium">
            KPI analysis for{" "}
            <span className="text-brand-primary">e-commerce</span>
          </p>
        </div>

        {/* Date Selector / Action Buttons */}
        <div className="flex items-center gap-3 bg-white border border-border-base rounded-xl p-1.5 shadow-sm">
          {["Year", "Month", "Week"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${tab === "Month" ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" : "text-txt-muted hover:bg-soft"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="dash-card group relative" // Using our custom utility
          >
            <div className="flex justify-between items-center mb-6">
              <p className="text-[11px] font-bold text-txt-muted uppercase tracking-widest">
                {stat.label}
              </p>
              <button className="text-txt-muted hover:text-brand-primary transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-3xl font-bold text-txt-main mb-2 tracking-tighter">
                  {stat.value}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={
                      stat.trending === "up"
                        ? "trend-badge-up"
                        : stat.trending === "down"
                          ? "trend-badge-down"
                          : "bg-soft text-txt-muted px-2 py-0.5 rounded text-[10px] font-bold"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="text-[10px] text-txt-muted font-medium">
                    vs last month
                  </span>
                </div>
              </div>
              <div className="p-3 bg-brand-primary-soft text-brand-primary rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <stat.icon size={22} strokeWidth={2} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- ACTIVITY LEDGER --- */}
        <div className="lg:col-span-2 dash-card !p-0 overflow-hidden">
          <div className="p-6 border-b border-border-soft flex items-center justify-between">
            <h4 className="text-sm font-bold text-txt-main flex items-center gap-2 uppercase tracking-widest">
              <History size={16} className="text-brand-primary" />{" "}
              Activity_Ledger
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-soft/50">
                <tr>
                  {["Timestamp", "Event_Type", "Operator", "Status"].map(
                    (th) => (
                      <th
                        key={th}
                        className="px-6 py-4 text-[10px] font-black uppercase text-txt-muted tracking-widest"
                      >
                        {th}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {recentActivity.map((log) => (
                  <tr
                    key={log.id}
                    className="hover:bg-soft/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-xs font-medium text-txt-muted">
                      {log.time}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-txt-main">
                      {log.event}
                    </td>
                    <td className="px-6 py-4 text-xs text-txt-muted">
                      {log.user}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[9px] font-bold px-3 py-1 rounded-full ${
                          log.status === "Success"
                            ? "bg-success/10 text-success"
                            : log.status === "Alert"
                              ? "bg-danger/10 text-danger"
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
        <div className="bg-brand-primary p-8 rounded-[24px] shadow-2xl shadow-brand-primary/20 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-10">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <ShieldCheck size={28} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 bg-white/10 rounded-full">
                Secure_Node
              </span>
            </div>
            <h4 className="text-2xl font-bold leading-tight mb-2">
              Archive_Integrity:{" "}
              <span className="text-emerald-300">Optimal</span>
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              System performance is within expected parameters. Encrypted shards
              synchronized.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {[
              { label: "CPU_Load", val: "24%" },
              { label: "RAM_Allocation", val: "68%" },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-80">
                  <span>{item.label}</span>
                  <span>{item.val}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: item.val }}
                    className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
