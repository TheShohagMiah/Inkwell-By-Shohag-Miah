import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  PlusSquare,
  List,
} from "lucide-react";

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const location = useLocation();
  // State to track which submenu is open
  const [openSubmenu, setOpenSubmenu] = useState("Archive_Ledger");

  const menuItems = [
    { icon: LayoutDashboard, label: "Terminal", path: "/admin/dashboard" },
    {
      icon: FileText,
      label: "Archive_Ledger",
      path: "/admin/posts",
      submenu: [
        { icon: List, label: "All_Entries", path: "/admin/posts" },
        { icon: PlusSquare, label: "New_Draft", path: "/admin/posts/add" },
      ],
    },
    {
      icon: FileText,
      label: "Categories",
      path: "/admin/categories",
      submenu: [
        { icon: List, label: "All_Entries", path: "/admin/categories" },
        { icon: PlusSquare, label: "New_Draft", path: "/admin/categories/add" },
      ],
    },
    { icon: Users, label: "Signatories", path: "/admin/users" },
    { icon: BarChart3, label: "Metrics_Grid", path: "/admin/analytics" },
    { icon: Settings, label: "System_Config", path: "/admin/settings" },
  ];

  const toggleSubmenu = (label) => {
    if (isCollapsed) setIsCollapsed(false);
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-main border-r border-border-soft transition-all duration-500 ease-in-out
        lg:translate-x-0 lg:relative ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "w-20" : "w-72"}`}
      >
        <div className="flex flex-col h-full relative">
          {/* DESKTOP TOGGLE HANDLE */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex absolute -right-3 top-10 w-6 h-6 bg-main border border-border-soft rounded-full items-center justify-center text-txt-muted hover:text-txt-main shadow-sm z-50 transition-transform hover:scale-110"
          >
            {isCollapsed ? (
              <ChevronRight size={12} />
            ) : (
              <ChevronLeft size={12} />
            )}
          </button>

          {/* BRAND AREA */}
          <div className="h-20 flex items-center px-6 border-b border-border-soft overflow-hidden">
            <Link to="/" className="flex items-center gap-4 min-w-max">
              <div className="w-10 h-10 bg-txt-main rounded-xl flex items-center justify-center text-main shadow-2xl">
                <ShieldCheck size={20} strokeWidth={2.5} />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col whitespace-nowrap">
                  <span className="text-sm font-black uppercase tracking-[0.3em]">
                    InkWell
                  </span>
                  <span className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest">
                    Admin_Core
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => {
              const hasSubmenu = !!item.submenu;
              const isActive =
                location.pathname === item.path ||
                item.submenu?.some((sub) => location.pathname === sub.path);
              const isOpen = openSubmenu === item.label;

              return (
                <div key={item.label} className="flex flex-col">
                  {/* MAIN ITEM */}
                  {hasSubmenu ? (
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`flex items-center justify-between w-full px-4 py-3.5 rounded-xl transition-all group
                        ${isActive && !isOpen ? "bg-soft text-txt-main" : "text-txt-muted hover:bg-soft hover:text-txt-main"}
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <item.icon size={18} className="shrink-0" />
                        {!isCollapsed && (
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                            {item.label}
                          </span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <ChevronDown
                          size={12}
                          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all relative group
                        ${isActive ? "bg-txt-main text-main shadow-lg" : "text-txt-muted hover:bg-soft hover:text-txt-main"}
                      `}
                    >
                      <item.icon size={18} className="shrink-0" />
                      {!isCollapsed && (
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  )}

                  {/* SUBMENU ITEMS */}
                  <AnimatePresence>
                    {hasSubmenu && isOpen && !isCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col ml-10 mt-1 space-y-1 border-l border-border-soft"
                      >
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            to={sub.path}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest transition-colors rounded-lg
                              ${location.pathname === sub.path ? "text-txt-main" : "text-txt-muted hover:text-txt-main"}
                            `}
                          >
                            <sub.icon size={12} />
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* FOOTER */}
          <div className="p-4 border-t border-border-soft bg-soft/30">
            <button className="w-full flex items-center gap-4 px-4 py-4 rounded-xl text-txt-muted hover:text-red-500 hover:bg-red-500/5 transition-all group overflow-hidden">
              <LogOut
                size={18}
                className="shrink-0 group-hover:-translate-x-1 transition-transform"
              />
              {!isCollapsed && (
                <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                  Terminate
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
