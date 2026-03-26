import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Sparkles,
  LayoutGrid,
  StretchHorizontal,
  Hash,
  ArrowUpRight,
  Database,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "../components/PostCard";
import TrendingSection from "../components/TrendingSection";
import Newsletter from "../components/NewsLetter";
import { posts } from "../data/demoData";

const categories = ["The Archive", "Engineering", "Design", "Culture"];

const Home = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("grid");
  const [activeFilter, setActiveFilter] = useState("The Archive");

  const filteredPosts = useMemo(() => {
    if (activeFilter === "The Archive") return posts;
    return posts.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const featuredPost = {
    id: "featured-1",
    title: "The Architecture of Modern Interfaces",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  };

  return (
    <div className="min-h-screen transition-colors duration-500">
      <Helmet>
        <title>InkWell // Digital Registry</title>
        <meta
          name="description"
          content="A curated collection of digital architecture and engineering perspectives."
        />
      </Helmet>

      {/* --- 01. HERO ARCHITECTURE --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        {/* Main Feature Slot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 relative group aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-[650px] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-soft border border-border-soft cursor-pointer shadow-sm"
          onClick={() => navigate(`/posts/${featuredPost.id}`)}
        >
          <img
            src={featuredPost.image}
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 transition-all duration-[1.5s] group-hover:scale-105 group-hover:grayscale-0"
            alt="Feature"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-main/90 via-main/20 to-transparent" />

          <div className="absolute bottom-0 left-0 p-8 md:p-16 lg:p-20 space-y-6 z-10">
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 bg-brand-primary/10 backdrop-blur-md border border-brand-primary/20 rounded-full text-[9px] font-medium uppercase tracking-[0.4em] text-brand-primary">
                Principal Dispatch // 2026
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-medium text-txt-main leading-[1.05] max-w-2xl tracking-tighter uppercase">
              {featuredPost.title}
            </h1>
          </div>
        </motion.div>

        {/* Action & Metric Slots */}
        <div className="lg:col-span-4 flex flex-col gap-8 md:gap-10">
          {/* Perspective Submission */}
          <div className="bg-txt-main rounded-[2.5rem] md:rounded-[3.5rem] p-10 md:p-12 flex flex-col justify-between text-main group cursor-pointer hover:opacity-95 transition-all shadow-2xl min-h-[280px] lg:h-1/2">
            <div className="flex justify-between items-start">
              <Sparkles
                size={32}
                strokeWidth={1.2}
                className="group-hover:rotate-12 transition-transform duration-500"
              />
              <div className="p-2 border border-main/20 rounded-full">
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-medium tracking-tighter uppercase leading-[0.9]">
                Submit <br /> perspective.
              </h3>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] opacity-60">
                Authorized Contributor Access
              </p>
            </div>
          </div>

          {/* Metric Node */}
          <div className="bg-soft/40 border border-border-soft rounded-[2.5rem] md:rounded-[3.5rem] p-10 md:p-12 flex flex-col justify-end space-y-8 min-h-[280px] lg:h-1/2 relative overflow-hidden">
            <Database
              size={100}
              className="absolute -top-6 -right-6 opacity-[0.03] text-txt-main"
              strokeWidth={1}
            />
            <div>
              <p className="text-5xl md:text-6xl font-medium text-txt-main tracking-tighter">
                12.4K
              </p>
              <p className="text-[10px] font-medium text-txt-muted uppercase tracking-[0.5em] mt-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                Active Nodes
              </p>
            </div>
            <div className="w-full h-[1px] bg-border-soft opacity-50" />
            <p className="text-[11px] font-medium text-txt-muted uppercase tracking-[0.2em] leading-relaxed">
              Maintained by the <br />
              <span className="text-txt-main font-medium border-b border-brand-primary/30">
                InkWell Global Registry
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* --- 02. SYSTEM FILTERS --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mt-24 md:mt-40 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-border-soft pb-8 gap-6 md:gap-0">
        <div className="flex flex-wrap items-center gap-6 md:gap-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-[10px] font-medium uppercase tracking-[0.4em] transition-all relative py-2 ${
                activeFilter === cat
                  ? "text-brand-primary"
                  : "text-txt-muted hover:text-txt-main"
              }`}
            >
              {cat}
              {activeFilter === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-soft/50 p-1.5 rounded-2xl border border-border-soft self-end md:self-auto">
          {[
            { id: "grid", icon: <LayoutGrid size={14} strokeWidth={1.5} /> },
            {
              id: "list",
              icon: <StretchHorizontal size={14} strokeWidth={1.5} />,
            },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={`p-2.5 rounded-xl transition-all ${
                viewMode === mode.id
                  ? "bg-main text-brand-primary shadow-sm border border-border-soft"
                  : "text-txt-muted/40 hover:text-txt-muted"
              }`}
            >
              {mode.icon}
            </button>
          ))}
        </div>
      </section>

      {/* --- 03. ENTRIES FEED --- */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 mt-10">
        <motion.div
          layout
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-15"
              : "flex flex-col gap-8"
          }
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} viewMode={viewMode} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPosts.length === 0 && (
          <div className="py-48 text-center flex flex-col items-center">
            <div className="p-10 rounded-full bg-soft border border-border-soft mb-8">
              <Hash
                className="text-brand-primary opacity-20"
                size={40}
                strokeWidth={1}
              />
            </div>
            <p className="text-[11px] font-medium uppercase tracking-[0.6em] text-txt-muted opacity-50">
              Null result // Archive Ledger Empty
            </p>
          </div>
        )}
      </section>

      <div className="mt-40">
        <TrendingSection posts={posts} />
      </div>

      <Newsletter />
    </div>
  );
};

export default Home;
