import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  ChevronRight,
  Sparkles,
  LayoutGrid,
  StretchHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");

  const featuredPost = {
    title: "The Architecture of Modern Interfaces",
    author: "Alex Rivera",
    date: "March 2026",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  };

  const posts = [1, 2, 3, 4, 5, 6];

  return (
    <div className="min-h-screen bg-main pb-24 transition-colors">
      {/* --- 1. EDITORIAL HERO GRID --- */}
      <section className="max-w-7xl mx-auto px-6 pt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-8 relative group aspect-[16/9] md:aspect-auto md:h-[580px] overflow-hidden rounded-2xl bg-soft border border-border-soft cursor-pointer shadow-sm"
        >
          <img
            src={featuredPost.image}
            className="absolute inset-0 w-full h-full object-cover opacity-80 grayscale-[0.2] transition-transform duration-1000 group-hover:scale-[1.02]"
            alt="Feature"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-10 md:p-16 space-y-6">
            <span className="px-4 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-[0.3em] text-white">
              Principal Feature
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.05] max-w-2xl tracking-tighter">
              {featuredPost.title}
            </h1>
          </div>
        </motion.div>

        <div className="md:col-span-4 grid grid-rows-2 gap-8">
          {/* Action Card */}
          <div className="bg-txt-main rounded-2xl p-10 flex flex-col justify-between text-main group cursor-pointer hover:opacity-95 transition-all">
            <Sparkles size={28} strokeWidth={2.5} />
            <div className="space-y-4">
              <h3 className="text-2xl font-bold leading-tight tracking-tight">
                Submit your <br /> perspective.
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                Join the collective →
              </p>
            </div>
          </div>

          {/* Data/Stats Card */}
          <div className="bg-soft border border-border-soft rounded-2xl p-10 flex flex-col justify-end space-y-6">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-txt-main tracking-tighter">
                12.4k
              </p>
              <p className="text-[9px] font-bold text-txt-muted uppercase tracking-[0.2em]">
                Active Readers
              </p>
            </div>
            <div className="w-full h-[1px] bg-border-soft" />
            <p className="text-[10px] font-bold text-txt-muted uppercase tracking-widest leading-relaxed">
              Curated by the{" "}
              <span className="text-txt-main">InkWell Editorial Team</span>
            </p>
          </div>
        </div>
      </section>

      {/* --- 2. ARCHIVE FILTER + VIEW CONTROLS --- */}
      <section className="max-w-7xl mx-auto px-6 mt-24 flex items-center justify-between border-b border-border-soft">
        <div className="flex items-center gap-10 overflow-x-auto no-scrollbar pb-5">
          {["The Archive", "Engineering", "Design", "Culture"].map((cat, i) => (
            <button
              key={i}
              className={`whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer ${
                i === 0
                  ? "text-txt-main border-b-2 border-txt-main pb-5 -mb-[21px]"
                  : "text-txt-muted hover:text-txt-main"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-soft p-1 rounded-xl mb-5">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === "grid" ? "bg-main text-txt-main shadow-sm" : "text-txt-muted/40 hover:text-txt-muted"}`}
          >
            <LayoutGrid size={14} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all cursor-pointer ${viewMode === "list" ? "bg-main text-txt-main shadow-sm" : "text-txt-muted/40 hover:text-txt-muted"}`}
          >
            <StretchHorizontal size={14} strokeWidth={2.5} />
          </button>
        </div>
      </section>

      {/* --- 3. DYNAMIC CONTENT FEED --- */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <motion.div
          layout
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12"
              : "flex flex-col gap-12 max-w-4xl"
          }
        >
          <AnimatePresence mode="popLayout">
            {posts.map((item) => (
              <motion.article
                layout
                key={item}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`group cursor-pointer ${
                  viewMode === "list"
                    ? "flex flex-col md:flex-row gap-10 items-start border-b border-border-soft pb-12 last:border-0"
                    : "flex flex-col"
                }`}
              >
                <div
                  className={`bg-soft rounded-2xl overflow-hidden relative transition-all group-hover:border-border-base shrink-0 border border-border-soft ${
                    viewMode === "grid"
                      ? "aspect-[4/5] mb-8"
                      : "aspect-video w-full md:w-64"
                  }`}
                >
                  <div className="w-full h-full bg-border-soft/20 grayscale transition-transform duration-1000 group-hover:scale-105" />
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3 text-[9px] font-bold text-txt-muted uppercase tracking-[0.2em]">
                    <span className="text-txt-main">Technical</span>
                    <span className="w-1 h-1 bg-border-base rounded-full" />
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} /> 6 MIN
                    </span>
                  </div>
                  <h2
                    className={`${viewMode === "grid" ? "text-xl" : "text-3xl"} font-bold tracking-tighter text-txt-main group-hover:text-txt-muted transition-colors leading-[1.2]`}
                  >
                    Scaling infrastructure for 10M concurrent users
                  </h2>
                  <p className="text-sm text-txt-muted font-light line-clamp-2 leading-relaxed tracking-tight">
                    A technical exploration of the microservices and caching
                    architectures required to facilitate global traffic
                    expansion.
                  </p>
                  <div className="pt-4 flex items-center justify-between border-t border-border-soft/50">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-txt-muted">
                      Authored by{" "}
                      <span className="text-txt-main">David Chen</span>
                    </span>
                    <ChevronRight
                      size={16}
                      strokeWidth={2.5}
                      className="text-txt-muted group-hover:text-txt-main transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
