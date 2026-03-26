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
    <header className="sticky top-0 z-40 h-16 lg:h-18 w-full border-b border-border-soft bg-card/70 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60 transition-all">
      <div className="flex h-full items-center justify-between px-6 lg:px-10">
        {/* --- LEFT: SEARCH & MOBILE TOGGLE --- */}
        <div className="flex items-center gap-6 flex-1">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 text-txt-main hover:bg-soft rounded-xl transition-colors"
          >
            <Menu size={22} />
          </button>

          <div className="relative group max-w-md w-full hidden md:block border border-border-soft rounded-full">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-txt-muted group-focus-within:text-brand-primary transition-colors"
            />
            <input
              type="text"
              placeholder="Search data, users, or logs..."
              className="w-full bg-soft/50 border border-transparent py-2.5 pl-12 pr-14 rounded-2xl text-sm outline-none focus:bg-white focus:border-brand-primary/30 focus:ring-4 focus:ring-brand-primary/5 transition-all placeholder:text-txt-muted/60 dark:focus:bg-soft"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 bg-white dark:bg-card border border-border-soft rounded-lg shadow-sm">
              <Command size={10} className="text-txt-muted" />
              <span className="text-[10px] font-bold text-txt-muted tracking-tighter">
                K
              </span>
            </div>
          </div>

          <div className="liveSiteBtn  bg-soft px-3 py-1.5 rounded-full animation_btn">
            <a
              href="http://localhost:5173/"
              target="_blank"
              className="flex items-center gap-2"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-700 opacity-80"></span>
                <span class="relative inline-flex size-2 rounded-full bg-purple-700"></span>
              </span>
              <span className="text-xs font-semibold text-brand-primary ">
                Live Site
              </span>
            </a>
          </div>
        </div>

        {/* --- RIGHT: ACTIONS & PROFILE --- */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl text-txt-muted hover:text-brand-primary hover:bg-brand-primary/5 transition-all"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* NOTIFICATIONS */}
          <div className="relative" ref={notifyRef}>
            <button
              onClick={() => setIsNotifyOpen(!isNotifyOpen)}
              className={`p-2.5 rounded-xl transition-all relative ${
                isNotifyOpen
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25"
                  : "text-txt-muted hover:text-brand-primary hover:bg-brand-primary/5"
              }`}
            >
              <Bell size={20} />
              <span
                className={`absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 ${isNotifyOpen ? "border-brand-primary" : "border-white dark:border-card"}`}
              />
            </button>

            <AnimatePresence>
              {isNotifyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-80 bg-card border border-border-base shadow-2xl rounded-[20px] overflow-hidden z-[60]"
                >
                  <div className="px-5 py-4 bg-soft/40 border-b border-border-soft flex justify-between items-center">
                    <span className="text-sm font-bold text-txt-main">
                      Activity
                    </span>
                    <span className="trend-badge-up">3 New</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto custom-scrollbar p-2">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl hover:bg-soft transition-all cursor-pointer group"
                      >
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex-center text-brand-primary shrink-0">
                            <Zap size={14} />
                          </div>
                          <div>
                            <p className="text-xs text-txt-main font-bold">
                              New system access
                            </p>
                            <p className="text-[11px] text-txt-muted mt-1 leading-relaxed">
                              Node_72 generated a secure link for document
                              verification.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-4 text-xs text-brand-primary hover:bg-brand-primary/5 font-bold transition-colors">
                    Mark all as read
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-[1px] h-6 bg-soft" />

          {/* PROFILE DROPDOWN */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-3 p-1.5 rounded-2xl hover:bg-soft transition-all cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-brand-primary flex-center text-white text-xs font-black shadow-lg shadow-brand-primary/20">
                AR
              </div>
              <div className="text-left hidden xl:block">
                <p className="text-xs font-bold text-txt-main leading-tight">
                  Alex Rivera
                </p>
                <p className="text-[10px] text-brand-primary font-black uppercase tracking-tighter mt-0.5">
                  Admin_Super
                </p>
              </div>
              <ChevronDown
                size={14}
                className={`text-txt-muted transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-56 bg-card border border-border-base shadow-2xl rounded-[20px] p-2 z-[60]"
                >
                  <div className="px-3 py-2 mb-2 border-b border-border-soft">
                    <p className="text-[10px] font-black text-txt-muted uppercase tracking-widest">
                      Operator_ID: 0x482
                    </p>
                  </div>
                  {[
                    { icon: User, label: "Profile Settings" },
                    { icon: Settings, label: "Security Node" },
                    { icon: Zap, label: "Audit Trails" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-txt-muted hover:bg-brand-primary/5 hover:text-brand-primary transition-all"
                    >
                      <item.icon size={16} strokeWidth={2} /> {item.label}
                    </button>
                  ))}
                  <div className="h-[1px] bg-border-soft my-2 mx-2" />
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-500/5 transition-all">
                    <LogOut size={16} /> Terminate Session
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
