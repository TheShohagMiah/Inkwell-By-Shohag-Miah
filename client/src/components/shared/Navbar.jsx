import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  Feather,
  Command,
  Sun,
  Moon,
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Feed", link: "/" },
  {
    label: "Archive",
    link: "/blogs",
    dropdown: [
      { label: "All Posts", link: "/blogs" },
      { label: "Categories", link: "/categories" },
    ],
  },
  {
    label: "Updates",
    link: "/updates",
    dropdown: [
      { label: "Changelog", link: "/updates/changelog" },
      { label: "Status", link: "/status" },
    ],
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // --- STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock auth state
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // --- EFFECTS ---

  // 1. Theme Initialization & Persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  // 2. Search Shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 3. Navigation Cleanup
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setOpenDropdown(null);
    setShowProfileMenu(false);
  }, [location]);

  // --- HANDLERS ---
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <nav className="w-full bg-main/80 backdrop-blur-md border-b border-border-soft z-[100] sticky top-0 h-16 flex items-center transition-colors">
        <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
          <div className="flex items-center gap-6 lg:gap-10">
            {/* LOGO */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <Feather className="text-txt-main" size={18} strokeWidth={2.5} />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-txt-main">
                InkWell
              </span>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link, i) => (
                <div
                  key={i}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <NavLink
                    to={link.link}
                    className={({ isActive }) =>
                      `px-4 py-1 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-1 ${
                        isActive
                          ? "text-txt-main bg-soft rounded-lg"
                          : "text-txt-muted hover:text-txt-main"
                      }`
                    }
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        size={10}
                        className={
                          openDropdown === link.label
                            ? "rotate-180 transition-transform"
                            : "transition-transform"
                        }
                      />
                    )}
                  </NavLink>

                  <AnimatePresence>
                    {link.dropdown && openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute left-0 mt-1 w-44 bg-main border border-border-base rounded-2xl shadow-2xl py-2 z-[110]"
                      >
                        {link.dropdown.map((sub, j) => (
                          <NavLink
                            key={j}
                            to={sub.link}
                            className="block px-5 py-3 text-[9px] font-bold uppercase tracking-widest text-txt-muted hover:text-txt-main hover:bg-soft transition-colors"
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* SEARCH TRIGGER */}
            <div
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-3 bg-soft/50 border border-border-soft px-3 md:px-4 py-1.5 rounded-xl cursor-pointer hover:border-border-base transition-all"
            >
              <Search size={14} className="text-txt-muted" strokeWidth={2.5} />
              <span className="hidden md:inline text-[10px] text-txt-muted font-bold uppercase tracking-widest">
                Search
              </span>
              <div className="hidden lg:flex items-center gap-1 border-l border-border-soft pl-3 ml-1">
                <Command size={10} className="text-txt-muted/60" />
                <span className="text-[9px] font-bold text-txt-muted/60">
                  K
                </span>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 text-txt-muted hover:text-txt-main transition-colors"
            >
              {isDarkMode ? (
                <Sun size={16} strokeWidth={2.5} />
              ) : (
                <Moon size={16} strokeWidth={2.5} />
              )}
            </button>

            {/* PROFILE / AUTH SECTION */}
            <div className="hidden md:flex items-center">
              {!isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate("/login")}
                    className="text-txt-muted text-[10px] font-bold uppercase tracking-widest px-4 py-2 hover:text-txt-main"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-txt-main text-main text-[10px] font-bold uppercase tracking-[0.2em] px-5 py-2 rounded-xl active:scale-95"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-8 h-8 rounded-lg bg-txt-main text-main text-[10px] font-bold flex items-center justify-center border border-border-base hover:opacity-90 transition-all"
                  >
                    A
                  </button>
                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-3 w-48 bg-main border border-border-base rounded-2xl shadow-2xl py-2 z-[110] overflow-hidden"
                      >
                        <div className="px-5 py-3 border-b border-border-soft mb-1">
                          <p className="text-[9px] font-bold text-txt-muted uppercase tracking-tighter">
                            Signed in as
                          </p>
                          <p className="text-[10px] font-bold text-txt-main truncate">
                            alex@inkwell.com
                          </p>
                        </div>
                        <button
                          onClick={() => navigate("/dashboard")}
                          className="w-full flex items-center gap-3 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-txt-muted hover:text-txt-main hover:bg-soft"
                        >
                          <LayoutDashboard size={14} /> Dashboard
                        </button>
                        <button
                          onClick={() => navigate("/profile")}
                          className="w-full flex items-center gap-3 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-txt-muted hover:text-txt-main hover:bg-soft"
                        >
                          <User size={14} /> Profile
                        </button>
                        <button
                          onClick={() => setIsAuthenticated(false)}
                          className="w-full flex items-center gap-3 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-500/5 border-t border-border-soft"
                        >
                          <LogOut size={14} /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-txt-main bg-soft rounded-lg transition-all active:scale-90"
            >
              {isMobileMenuOpen ? (
                <X size={18} strokeWidth={2.5} />
              ) : (
                <Menu size={18} strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE DRAWER MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-main pt-24 px-8 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <div key={i} className="border-b border-border-soft pb-4">
                  <div
                    className="flex items-center justify-between text-[13px] font-bold uppercase tracking-[0.2em] text-txt-main mb-2"
                    onClick={() =>
                      link.dropdown
                        ? setOpenDropdown(
                            openDropdown === link.label ? null : link.label,
                          )
                        : navigate(link.link)
                    }
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        size={16}
                        className={
                          openDropdown === link.label ? "rotate-180" : ""
                        }
                      />
                    )}
                  </div>
                  {link.dropdown && openDropdown === link.label && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      className="flex flex-col gap-4 mt-4 ml-4 overflow-hidden"
                    >
                      {link.dropdown.map((sub, j) => (
                        <NavLink
                          key={j}
                          to={sub.link}
                          className="text-[10px] font-bold uppercase tracking-widest text-txt-muted"
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {isAuthenticated && (
                <NavLink
                  to="/admin/dashboard"
                  className="text-[13px] font-bold uppercase tracking-[0.2em] text-txt-main border-b border-border-soft pb-4"
                >
                  Dashboard
                </NavLink>
              )}

              <div className="flex flex-col gap-3 mt-4">
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full border border-border-soft text-txt-main py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em]"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                      className="w-full bg-txt-main text-main py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em]"
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsAuthenticated(false)}
                    className="w-full bg-soft text-red-500 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em]"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH COMMAND PALETTE MODAL */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-main/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-xl bg-main border border-border-base shadow-2xl rounded-3xl overflow-hidden"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center px-6 py-5 border-b border-border-soft"
              >
                <Search className="text-txt-muted mr-4" size={18} />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH ARCHIVE..."
                  className="flex-1 bg-transparent border-none outline-none text-txt-main text-sm font-bold tracking-widest uppercase placeholder:text-txt-muted/20"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-[9px] font-bold text-txt-muted/40 border border-border-soft px-2 py-1 rounded-md uppercase"
                >
                  Esc
                </button>
              </form>
              <div className="p-8 max-h-[300px] overflow-y-auto">
                <p className="text-[10px] font-bold text-txt-muted uppercase tracking-widest mb-4">
                  Quick Links
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => navigate("/blogs")}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-soft text-txt-muted hover:text-txt-main transition-all"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-widest">
                      View All Posts
                    </span>
                    <Command size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
