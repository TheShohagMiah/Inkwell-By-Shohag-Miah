import React, { useState, useEffect } from "react";
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
  Tags,
} from "lucide-react";

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState(null);

  // Auto-expand the correct submenu based on the current URL path
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.submenu?.some((sub) => location.pathname === sub.path)) {
        setExpandedMenu(item.label);
      }
    });
  }, [location.pathname]);

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    {
      label: "Posts",
      icon: FileText,
      submenu: [
        { icon: List, label: "All Posts", path: "/admin/posts" },
        { icon: PlusSquare, label: "New post", path: "/admin/posts/add" },
      ],
    },
    {
      label: "Categories",
      icon: Tags,
      submenu: [
        { icon: List, label: "All Categories", path: "/admin/categories" },
        {
          icon: PlusSquare,
          label: "New Category",
          path: "/admin/categories/add",
        },
      ],
    },
    { label: "Signatories", icon: Users, path: "/admin/users" },
    { label: "Metrics_Grid", icon: BarChart3, path: "/admin/analytics" },
    { label: "System_Config", icon: Settings, path: "/admin/settings" },
  ];

  const handleParentClick = (label) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setExpandedMenu(label);
    } else {
      setExpandedMenu(expandedMenu === label ? null : label);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-txt-main/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-card border-r border-border-soft transition-all duration-500 ease-in-out
        lg:translate-x-0 lg:relative ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "w-20" : "w-72"}`}
      >
        <div className="flex flex-col h-full relative">
          {/* TOGGLE HANDLE - Floating design */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex absolute -right-3 top-8 w-6 h-6 bg-card border border-border-base rounded-full items-center justify-center text-txt-muted hover:text-brand-primary shadow-sm z-50 transition-all hover:scale-110 cursor-pointer"
          >
            {isCollapsed ? (
              <ChevronRight size={10} />
            ) : (
              <ChevronLeft size={10} />
            )}
          </button>

          {/* BRAND AREA */}
          <div className="h-20 flex items-center px-6 shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
                <ShieldCheck size={20} strokeWidth={2.5} />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-tight text-txt-main">
                    InkWell
                  </span>
                  <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest leading-none">
                    Admin_v2
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar">
            {menuItems.map((item) => {
              const hasSubmenu = !!item.submenu;
              const isExpanded = expandedMenu === item.label;
              const isActive =
                location.pathname === item.path ||
                item.submenu?.some((sub) => location.pathname === sub.path);

              return (
                <div key={item.label} className="flex flex-col">
                  {hasSubmenu ? (
                    <button
                      onClick={() => handleParentClick(item.label)}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all group cursor-pointer
                        ${isActive ? "bg-brand-primary/5 text-brand-primary" : "text-txt-muted hover:bg-soft hover:text-txt-main"}
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                        {!isCollapsed && (
                          <span className="text-xs font-semibold tracking-tight">
                            {item.label}
                          </span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                        ${
                          location.pathname === item.path
                            ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20"
                            : "text-txt-muted hover:bg-soft hover:text-txt-main"
                        }
                      `}
                    >
                      <item.icon
                        size={20}
                        className="shrink-0"
                        strokeWidth={location.pathname === item.path ? 2.5 : 2}
                      />
                      {!isCollapsed && (
                        <span className="text-xs font-semibold tracking-tight">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  )}

                  {/* SUBMENU */}
                  <AnimatePresence>
                    {hasSubmenu && isExpanded && !isCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col ml-10 mt-1 space-y-1"
                      >
                        {item.submenu.map((sub) => {
                          const isSubActive = location.pathname === sub.path;
                          return (
                            <Link
                              key={sub.label}
                              to={sub.path}
                              onClick={() => setIsMobileOpen(false)}
                              className={`px-4 py-2 text-[11px] font-bold tracking-wide transition-all border-l-2
                                ${
                                  isSubActive
                                    ? "border-brand-primary text-brand-primary bg-brand-primary/5"
                                    : "border-transparent text-txt-muted hover:text-txt-main hover:border-border-base"
                                }
                              `}
                            >
                              {sub.label}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* FOOTER */}
          <div className="p-4 border-t border-border-soft">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-txt-muted hover:text-danger hover:bg-danger/5 transition-all group cursor-pointer">
              <LogOut
                size={20}
                className="shrink-0 group-hover:-translate-x-1 transition-transform"
              />
              {!isCollapsed && (
                <span className="text-xs font-bold uppercase tracking-widest">
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
