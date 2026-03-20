import React from "react";
import { Link } from "react-router-dom";
import {
  Twitter,
  Github,
  Instagram,
  Linkedin,
  ArrowUpRight,
  Globe,
  Zap,
  Activity,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-main border-t border-border-soft pt-32 pb-16 overflow-hidden transition-colors">
      {/* BACKGROUND WATERMARK */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[20vw] font-bold text-txt-main opacity-[0.02] select-none leading-none tracking-tighter -z-0 pointer-events-none uppercase italic">
        InkWell
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-20 md:gap-12">
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 space-y-10">
            <Link to="/" className="flex items-center gap-4 group w-fit">
              <div className="w-12 h-12 bg-txt-main border border-border-base rounded-2xl flex items-center justify-center text-main transition-transform duration-500 group-hover:scale-105 shadow-xl">
                <Zap size={22} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-[0.2em] text-txt-main uppercase">
                  InkWell
                </span>
                <span className="text-[9px] font-bold text-txt-muted uppercase tracking-[0.4em]">
                  Editorial Group
                </span>
              </div>
            </Link>

            <p className="max-w-xs text-sm text-txt-muted font-light leading-relaxed tracking-tight">
              A sanctuary for technical rigor and the art of modern digital
              craftsmanship. Documenting the frontier of web architecture.
            </p>

            <div className="flex gap-3">
              {[Twitter, Github, Instagram, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="p-3.5 rounded-xl bg-soft border border-border-soft text-txt-muted hover:text-txt-main hover:bg-main transition-all cursor-pointer"
                >
                  <Icon size={14} strokeWidth={2.5} />
                </button>
              ))}
            </div>
          </div>

          {/* NAVIGATION COLUMNS */}
          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-txt-muted flex items-center gap-2">
              <div className="w-4 h-[1px] bg-border-base" /> Index
            </h4>
            <ul className="space-y-4">
              {["Archive", "Engineering", "Design", "Authors"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-[11px] font-bold uppercase tracking-widest text-txt-main hover:text-txt-muted transition-all flex items-center gap-2 group"
                  >
                    {item}
                    <ArrowUpRight
                      size={10}
                      className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-txt-muted flex items-center gap-2">
              <div className="w-4 h-[1px] bg-border-base" /> Legal
            </h4>
            <ul className="space-y-4">
              {["Privacy", "Terms", "Licensing", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-[11px] font-bold uppercase tracking-widest text-txt-main hover:text-txt-muted transition-all"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER COLUMN */}
          <div className="md:col-span-3 space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-txt-muted flex items-center gap-2">
              <div className="w-4 h-[1px] bg-border-base" /> Newsletter
            </h4>
            <div className="relative group">
              <input
                type="email"
                placeholder="EMAIL_ADDRESS"
                className="w-full bg-soft border border-border-soft rounded-2xl px-6 py-4 text-[11px] font-bold tracking-widest uppercase outline-none focus:border-txt-main/40 transition-all text-txt-main placeholder:text-txt-muted/20"
              />
              <button className="absolute right-2 top-2 p-2.5 bg-txt-main text-main rounded-xl hover:opacity-90 transition-all cursor-pointer shadow-lg">
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </button>
            </div>
            <div className="space-y-3">
              <p className="text-[9px] text-txt-muted font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                <Globe size={12} className="opacity-30" /> Global Distribution
              </p>
              <p className="text-[9px] text-txt-muted font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                <Zap size={12} className="opacity-30" /> Principal Insights
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-32 pt-12 border-t border-border-soft flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-[10px] font-bold text-txt-muted uppercase tracking-[0.3em]">
              © {currentYear} InkWell Editorial Group
            </p>
            <div className="flex items-center gap-3 px-4 py-1.5 bg-soft rounded-lg border border-border-soft">
              <Activity size={12} className="text-emerald-500 animate-pulse" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-txt-muted">
                Systems: <span className="text-emerald-500">Nominal</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-txt-muted">
            <span className="opacity-40">Build 2026.4.12</span>
            <div className="w-1 h-1 bg-border-base rounded-full" />
            <span className="text-txt-main">Protocol by Rivera</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
