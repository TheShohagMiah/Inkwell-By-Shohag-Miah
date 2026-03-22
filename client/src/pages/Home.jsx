import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Sparkles, LayoutGrid, StretchHorizontal, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PostCard from "../components/PostCard";

const categories = ["The Archive", "Engineering", "Design", "Culture"];

// Standardized Mock Data
const posts = [
  {
    id: 1,
    title: "The Minimalism of Digital Architecture",
    excerpt:
      "Exploring how negative space defines modern user experiences in high-end software.",
    category: "Design",
    date: "Mar 12, 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "System Status: Spring 2026 Update",
    excerpt:
      "Infrastructure migration notes and the transition to edge-based computing nodes.",
    category: "Culture",
    date: "Feb 28, 2026",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Optimizing React with Framer Motion",
    excerpt:
      "A deep dive into 60fps animations and layout projections for complex dashboards.",
    category: "Engineering",
    date: "Mar 08, 2026",
    readTime: "12 min",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Next-Gen State Management",
    excerpt:
      "Moving beyond Redux: Why signals and atomic state are winning the performance war.",
    category: "Engineering",
    date: "Mar 05, 2026",
    readTime: "10 min",
    image:
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "The Psychology of Dark Mode",
    excerpt:
      "Analyzing user retention and eye strain metrics in immersive SaaS environments.",
    category: "Design",
    date: "Mar 01, 2026",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
  },
];

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
    <div className="min-h-screen bg-main pb-24 transition-colors">
      <Helmet>
        <title>Flux // Showcase Portfolio</title>
        <meta
          name="description"
          content="A curated collection of digital architecture and engineering perspectives."
        />
      </Helmet>

      {/* --- 1. HERO --- */}
      <section className="max-w-7xl mx-auto px-6 pt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-8 relative group aspect-[16/9] md:aspect-auto md:h-[580px] overflow-hidden rounded-3xl bg-soft border border-border-soft cursor-pointer shadow-sm"
          onClick={() => navigate(`/blogs/${featuredPost.id}`)}
        >
          <img
            src={featuredPost.image}
            className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-1000 group-hover:scale-[1.03]"
            alt="Feature"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-10 md:p-16 space-y-4 z-10">
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] text-white">
              Principal Feature
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-2xl tracking-tighter uppercase">
              {featuredPost.title}
            </h1>
          </div>
        </motion.div>

        <div className="md:col-span-4 grid grid-rows-2 gap-8">
          <div className="bg-txt-main rounded-3xl p-10 flex flex-col justify-between text-main group cursor-pointer hover:bg-txt-main/90 transition-all shadow-xl">
            <Sparkles size={28} strokeWidth={2} />
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight uppercase">
                Submit perspective.
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                Join the collective →
              </p>
            </div>
          </div>

          <div className="bg-soft border border-border-soft rounded-3xl p-10 flex flex-col justify-end space-y-6">
            <div>
              <p className="text-3xl font-black text-txt-main tracking-tighter">
                12.4K
              </p>
              <p className="text-[9px] font-bold text-txt-muted uppercase tracking-[0.2em]">
                Active Readers
              </p>
            </div>
            <div className="w-full h-px bg-border-soft" />
            <p className="text-[10px] font-medium text-txt-muted uppercase tracking-widest">
              Curated by the{" "}
              <span className="text-txt-main font-bold italic underline decoration-border-soft">
                InkWell Team
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* --- 2. FILTERS (STYLIZED) --- */}
      <section className="max-w-7xl mx-auto px-6 mt-24 flex items-center justify-between border-b border-border-soft sticky top-0 bg-main/80 backdrop-blur-xl z-30">
        <div className="flex items-center gap-8 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer relative pb-4 -mb-[18px] ${
                activeFilter === cat
                  ? "text-txt-main border-b-2 border-txt-main scale-105"
                  : "text-txt-muted hover:text-txt-main"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 bg-soft p-1 rounded-xl mb-4 shrink-0 border border-border-soft">
          {[
            { id: "grid", icon: <LayoutGrid size={14} /> },
            { id: "list", icon: <StretchHorizontal size={14} /> },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewMode === mode.id
                  ? "bg-main text-txt-main shadow-md ring-1 ring-border-soft"
                  : "text-txt-muted/40 hover:text-txt-muted"
              }`}
            >
              {mode.icon}
            </button>
          ))}
        </div>
      </section>

      {/* --- 3. FEED --- */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <motion.div
          layout
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
              : "flex flex-col gap-16"
          }
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} viewMode={viewMode} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredPosts.length === 0 && (
          <div className="py-40 text-center flex flex-col items-center">
            <div className="p-6 rounded-full bg-soft border border-border-soft mb-6">
              <Hash className="text-txt-muted animate-pulse" size={32} />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-txt-muted">
              Null result // No entries found.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
