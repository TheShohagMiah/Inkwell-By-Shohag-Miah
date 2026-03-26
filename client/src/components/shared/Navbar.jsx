import React, { useState, useEffect } from "react";
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
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Feed", link: "/" },
  { label: "About", link: "/about" },
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

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

  // Auto-close on route change or resize
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setOpenDropdown(null);
    setShowProfileMenu(false);
  }, [location]);

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
      <nav className="w-full bg-main/50 backdrop-blur-2xl border-b border-border-soft z-[100] sticky top-0 h-20 flex items-center transition-all duration-500">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-10 lg:gap-14">
            {/* LOGO */}
            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <Feather
                className="text-brand-primary"
                size={20}
                strokeWidth={1.5}
              />
              <span className="text-[12px] font-medium uppercase tracking-[0.5em] text-txt-main hidden xs:block">
                InkWell
              </span>
            </div>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center gap-2">
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
                      `px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] transition-all flex items-center gap-2 ${
                        isActive
                          ? "text-white bg-brand-primary rounded-lg"
                          : "text-txt-muted hover:text-txt-main"
                      }`
                    }
                  >
                    {link.label}
                    {link.dropdown && (
                      <ChevronDown
                        size={10}
                        className={`transition-transform ${openDropdown === link.label ? "rotate-180" : ""}`}
                      />
                    )}
                  </NavLink>

                  <AnimatePresence>
                    {link.dropdown && openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-0 mt-2 w-52 bg-card border border-border-soft rounded-2xl shadow-3xl py-3 overflow-hidden"
                      >
                        {link.dropdown.map((sub, j) => (
                          <NavLink
                            key={j}
                            to={sub.link}
                            className="block px-6 py-3 text-[9px] font-medium uppercase tracking-[0.3em] text-txt-muted hover:text-brand-primary hover:bg-soft/50 transition-colors"
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

          <div className="flex items-center gap-3 md:gap-6">
            {/* SYSTEM SEARCH */}
            <div
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-3 bg-soft/40 border border-border-soft px-3 md:px-4 py-2 rounded-full cursor-pointer hover:bg-soft/80 transition-all group"
            >
              <Search
                size={14}
                className="text-txt-muted group-hover:text-txt-main"
              />
              <span className="hidden sm:inline text-[9px] text-txt-muted font-medium uppercase tracking-[0.2em]">
                Search
              </span>
              <div className="hidden xl:flex items-center gap-1 opacity-20">
                <Command size={10} />
                <span className="text-[9px] font-medium">K</span>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="text-txt-muted hover:text-txt-main p-1"
            >
              {isDarkMode ? (
                <Sun size={18} strokeWidth={1.5} />
              ) : (
                <Moon size={18} strokeWidth={1.5} />
              )}
            </button>

            {/* AUTH / PROFILE */}
            <div className="hidden sm:flex items-center border-l border-border-soft pl-6">
              {!isAuthenticated ? (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-txt-main text-main text-[9px] font-medium uppercase tracking-[0.3em] px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity"
                >
                  sign in
                </button>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-9 h-9 rounded-xl bg-soft border border-border-soft flex items-center justify-center text-[11px] font-medium text-txt-main hover:border-brand-primary transition-all"
                  >
                    AR
                  </button>
                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 mt-4 w-60 bg-card border border-border-soft rounded-[2rem] shadow-3xl py-4 overflow-hidden"
                      >
                        <div className="px-6 py-4 border-b border-border-soft mb-2">
                          <p className="text-[8px] font-medium text-txt-muted uppercase tracking-[0.4em] mb-1">
                            Authenticated Node
                          </p>
                          <p className="text-[12px] font-medium text-txt-main tracking-tight uppercase">
                            Alex Rivera
                          </p>
                        </div>
                        <button
                          onClick={() => navigate("/admin/dashboard")}
                          className="w-full flex items-center gap-4 px-6 py-3 text-[10px] font-medium uppercase tracking-widest text-txt-muted hover:text-txt-main hover:bg-soft transition-colors"
                        >
                          <LayoutDashboard size={14} strokeWidth={1.5} />{" "}
                          Dashboard
                        </button>
                        <button
                          onClick={() => setIsAuthenticated(false)}
                          className="w-full flex items-center gap-4 px-6 py-3 text-[10px] font-medium uppercase tracking-widest text-red-400 hover:bg-red-400/5 mt-2 border-t border-border-soft"
                        >
                          <LogOut size={14} strokeWidth={1.5} /> Terminate
                          Session
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* MOBILE MENU TRIGGER */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-txt-main bg-soft rounded-lg border border-border-soft"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-main/90 backdrop-blur-md z-[150]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-card border-l border-border-soft z-[160] p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-txt-muted opacity-50">
                  System Menu
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 bg-soft rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 space-y-8">
                {navLinks.map((link, i) => (
                  <div key={i} className="space-y-4">
                    <NavLink
                      to={link.link}
                      className="text-lg font-medium uppercase tracking-[0.2em] text-txt-main block"
                    >
                      {link.label}
                    </NavLink>
                    {link.dropdown && (
                      <div className="pl-4 space-y-3 border-l border-border-soft">
                        {link.dropdown.map((sub, j) => (
                          <NavLink
                            key={j}
                            to={sub.link}
                            className="text-[11px] font-medium uppercase tracking-widest text-txt-muted block hover:text-brand-primary"
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-border-soft space-y-4">
                {!isAuthenticated ? (
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full py-4 bg-txt-main text-main text-[10px] font-medium uppercase tracking-[0.3em] rounded-2xl"
                  >
                    Sign in
                  </button>
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-soft rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-card border border-border-soft flex items-center justify-center text-xs font-medium">
                      AR
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-medium uppercase tracking-wider">
                        Alex Rivera
                      </p>
                      <p className="text-[9px] text-txt-muted uppercase tracking-widest">
                        Active Dispatcher
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- SEARCH MODAL (Shared with previous logic) --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[10vh] md:pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-main/95 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-card border border-border-soft shadow-3xl rounded-[2rem] md:rounded-[3rem] overflow-hidden"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center px-6 md:px-10 py-6 md:py-8 border-b border-border-soft"
              >
                <Search className="text-brand-primary mr-4 md:mr-6" size={20} />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH ARCHIVES..."
                  className="flex-1 bg-transparent border-none outline-none text-txt-main text-xs md:text-sm font-medium tracking-[0.2em] uppercase placeholder:opacity-20"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-[10px] font-medium uppercase tracking-widest text-txt-muted ml-4"
                >
                  Esc
                </button>
              </form>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6 opacity-40">
                  <ShieldCheck size={12} className="text-brand-primary" />
                  <p className="text-[9px] font-medium text-txt-muted uppercase tracking-[0.4em]">
                    Protocol Suggested Nodes
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => navigate("/blogs")}
                    className="text-left p-5 rounded-2xl bg-soft/30 hover:bg-soft transition-all border border-border-soft flex flex-col gap-1 group"
                  >
                    <span className="text-[10px] font-medium uppercase tracking-widest text-txt-main">
                      Engineering Feed
                    </span>
                    <span className="text-[9px] text-txt-muted uppercase tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity">
                      Technical dispatches and logs
                    </span>
                  </button>
                  <button
                    onClick={() => navigate("/categories")}
                    className="text-left p-5 rounded-2xl bg-soft/30 hover:bg-soft transition-all border border-border-soft flex flex-col gap-1 group"
                  >
                    <span className="text-[10px] font-medium uppercase tracking-widest text-txt-main">
                      Design Systems
                    </span>
                    <span className="text-[9px] text-txt-muted uppercase tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity">
                      Visual architecture notes
                    </span>
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
