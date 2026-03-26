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
  Terminal,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-main border-t border-border-soft pt-20 pb-20 overflow-hidden transition-colors duration-500">
      {/* 01 / BACKGROUND TEXTURE (SYSTEM WATERMARK) */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-[22vw] font-medium text-txt-main opacity-[0.015] select-none leading-none tracking-tighter -z-0 pointer-events-none uppercase italic">
        InkWell
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-24 lg:gap-16">
          {/* BRAND ARCHIVE COLUMN */}
          <div className="md:col-span-5 space-y-12">
            <Link to="/" className="flex items-center gap-5 group w-fit">
              <div className="w-14 h-14 bg-txt-main border border-border-soft rounded-[1.25rem] flex items-center justify-center text-main transition-all duration-700 group-hover:rotate-[360deg] shadow-2xl">
                <Zap size={24} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-medium tracking-[0.3em] text-txt-main uppercase">
                  InkWell
                </span>
                <span className="text-[10px] font-medium text-brand-primary uppercase tracking-[0.5em] mt-1">
                  Editorial Registry
                </span>
              </div>
            </Link>

            <p className="max-w-xs text-[13px] text-txt-muted font-medium leading-relaxed tracking-wide opacity-80">
              A sanctuary for technical rigor and the art of modern digital
              craftsmanship. Documenting the frontier of web architecture and
              system design principles.
            </p>

            <div className="flex gap-4">
              {[Twitter, Github, Instagram, Linkedin].map((Icon, i) => (
                <button
                  key={i}
                  className="p-4 rounded-2xl bg-soft/50 border border-border-soft text-txt-muted hover:text-brand-primary hover:bg-main transition-all cursor-pointer group"
                >
                  <Icon
                    size={16}
                    strokeWidth={1.5}
                    className="group-hover:scale-110 transition-transform"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* INDEX NAVIGATION */}
          <div className="md:col-span-2 space-y-10">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-txt-muted flex items-center gap-3 opacity-50">
              <div className="w-6 h-[1px] bg-border-soft" /> Index
            </h4>
            <ul className="space-y-5">
              {["Archive", "Engineering", "Design", "Authors"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-[11px] font-medium uppercase tracking-[0.2em] text-txt-main hover:text-brand-primary transition-all flex items-center gap-2 group"
                  >
                    {item}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL NODES */}
          <div className="md:col-span-2 space-y-10">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-txt-muted flex items-center gap-3 opacity-50">
              <div className="w-6 h-[1px] bg-border-soft" /> Registry
            </h4>
            <ul className="space-y-5">
              {["Privacy", "Terms", "Licensing", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-[11px] font-medium uppercase tracking-[0.2em] text-txt-main hover:text-brand-primary transition-all"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMMUNICATION CHANNEL */}
          <div className="md:col-span-3 space-y-10">
            <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-txt-muted flex items-center gap-3 opacity-50">
              <div className="w-6 h-[1px] bg-border-soft" /> Channel
            </h4>
            <div className="relative group">
              <input
                type="email"
                placeholder="REGISTRY_EMAIL"
                className="w-full bg-soft/30 border border-border-soft rounded-[1.5rem] px-8 py-5 text-[10px] font-medium tracking-[0.3em] uppercase outline-none focus:border-brand-primary/40 transition-all text-txt-main placeholder:opacity-20"
              />
              <button className="absolute right-3 top-3 p-3 bg-txt-main text-main rounded-[1rem] hover:opacity-90 transition-all cursor-pointer shadow-2xl">
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="space-y-4 pt-2">
              <p className="text-[9px] text-txt-muted font-medium uppercase tracking-[0.3em] flex items-center gap-4">
                <Globe size={14} className="opacity-30" /> Distributed Node
              </p>
              <p className="text-[9px] text-txt-muted font-medium uppercase tracking-[0.3em] flex items-center gap-4">
                <Terminal size={14} className="opacity-30" /> Encrypted Feed
              </p>
            </div>
          </div>
        </div>

        {/* TERMINAL STATUS BAR */}
        <div className="mt-40 pt-16 border-t border-border-soft flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <p className="text-[10px] font-medium text-txt-muted uppercase tracking-[0.4em] opacity-60">
              © {currentYear} InkWell Editorial Group
            </p>
            <div className="flex items-center gap-4 px-6 py-2 bg-soft/40 rounded-full border border-border-soft">
              <Activity
                size={14}
                className="text-brand-primary animate-pulse"
                strokeWidth={2.5}
              />
              <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-txt-muted">
                Interface: <span className="text-brand-primary">Optimal</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[10px] font-medium uppercase tracking-[0.3em] text-txt-muted">
            <span className="opacity-30">Revision 2026.04.B</span>
            <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
            <span className="text-txt-main opacity-80">Protocol Rivera-9</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
