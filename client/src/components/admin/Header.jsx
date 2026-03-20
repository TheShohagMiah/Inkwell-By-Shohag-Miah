import React, { useState, useEffect } from "react";
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Zap,
  Sun,
  Moon,
  Command,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

const Header = ({ setIsMobileOpen }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const profileRef = useOutsideClick(() => setIsProfileOpen(false));
  const notifyRef = useOutsideClick(() => setIsNotifyOpen(false));

  useEffect(() => {
    const root = window.document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <header className="sticky top-0 z-50 h-16 lg:h-20 w-full border-b border-border-soft bg-main/60 backdrop-blur-xl transition-all">
      <div className="flex h-full items-center justify-between px-6 lg:px-8">
        {/* --- MINIMAL SEARCH --- */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 -ml-2 text-txt-main hover:bg-soft rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="relative group max-w-sm w-full hidden md:block">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-txt-muted group-focus-within:text-txt-main transition-colors"
            />
            <input
              type="text"
              placeholder="Search or type a command..."
              className="w-full bg-soft/50 border border-border-soft py-2.5 pl-10 pr-12 rounded-lg text-sm outline-none focus:ring-2 focus:ring-txt-main/5 focus:border-txt-main/20 transition-all placeholder:text-txt-muted/50"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-40">
              <Command size={11} />
              <span className="text-[10px] font-medium">K</span>
            </div>
          </div>
        </div>

        {/* --- UTILITIES --- */}
        <div className="flex items-center gap-3">
          {/* THEME */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg text-txt-muted hover:text-txt-main hover:bg-soft transition-colors"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ opacity: 0, rotate: -20 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 20 }}
                transition={{ duration: 0.15 }}
              >
                {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* NOTIFICATIONS */}
          <div className="relative" ref={notifyRef}>
            <button
              onClick={() => setIsNotifyOpen(!isNotifyOpen)}
              className={`p-2.5 rounded-lg transition-all relative ${
                isNotifyOpen
                  ? "bg-soft text-txt-main shadow-sm"
                  : "text-txt-muted hover:text-txt-main hover:bg-soft"
              }`}
            >
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full border border-main" />
            </button>

            <AnimatePresence>
              {isNotifyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  className="absolute right-0 mt-3 w-80 bg-main border border-border-soft shadow-xl rounded-xl overflow-hidden z-[60]"
                >
                  <div className="px-4 py-3 bg-soft/30 border-b border-border-soft flex justify-between items-center">
                    <span className="text-xs font-semibold">Notifications</span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded">
                      3 New
                    </span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="p-4 border-b border-border-soft hover:bg-soft transition-colors cursor-pointer"
                      >
                        <p className="text-xs text-txt-main font-medium">
                          System Alert {i}
                        </p>
                        <p className="text-[11px] text-txt-muted mt-0.5">
                          A new operator has requested access to the terminal.
                        </p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 text-xs text-txt-muted hover:text-txt-main hover:bg-soft transition-colors font-medium">
                    View all notifications
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-[1px] h-4 bg-border-soft mx-1 hidden sm:block" />

          {/* PROFILE */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-soft transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                AR
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-semibold text-txt-main leading-none">
                  A. Rivera
                </p>
                <p className="text-[10px] text-txt-muted mt-1 leading-none">
                  Administrator
                </p>
              </div>
              <ChevronDown
                size={14}
                className={`text-txt-muted transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  className="absolute right-0 mt-3 w-52 bg-main border border-border-soft shadow-xl rounded-xl p-1.5 z-[60]"
                >
                  {[
                    { icon: User, label: "Profile" },
                    { icon: Settings, label: "Settings" },
                    { icon: Zap, label: "Activity Log" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-txt-muted hover:bg-soft hover:text-txt-main transition-colors"
                    >
                      <item.icon size={14} /> {item.label}
                    </button>
                  ))}
                  <div className="h-[1px] bg-border-soft my-1.5 mx-1" />
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-500 hover:bg-red-500/10 transition-colors">
                    <LogOut size={14} /> Log out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
