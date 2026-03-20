import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search as SearchIcon,
  Clock,
  ArrowRight,
  LayoutGrid,
  StretchHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [viewMode, setViewMode] = useState("grid");

  const results = [
    {
      id: 1,
      title: "The Art of Subtle Interfaces",
      cat: "Design",
      time: "5 min",
      excerpt: "A study on reducing cognitive load through soft shadows.",
    },
    {
      id: 2,
      title: "React State Harmony",
      cat: "Dev",
      time: "10 min",
      excerpt: "Balancing performance and readability in modern architectures.",
    },
    {
      id: 3,
      title: "Modernist Typography",
      cat: "Typography",
      time: "3 min",
      excerpt: "How neo-grotesque typefaces define the digital landscape.",
    },
    {
      id: 4,
      title: "Future of CSS",
      cat: "Dev",
      time: "7 min",
      excerpt:
        "Exploring the new frontier of native CSS nesting and variables.",
    },
    {
      id: 5,
      title: "Minimalist Motion",
      cat: "Design",
      time: "4 min",
      excerpt: "Using physics-based animations to guide user attention.",
    },
    {
      id: 6,
      title: "Backend Scalability",
      cat: "Engineering",
      time: "12 min",
      excerpt: "Architecting systems that handle millions of concurrent users.",
    },
  ];

  return (
    <div className="bg-main min-h-screen transition-colors duration-500 pb-24">
      {/* 1. Refined Header Section */}
      <header className="py-12 lg:py-16 border-b border-border-soft">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-txt-muted">
              Database Inquiry
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-txt-main leading-none">
              Found{" "}
              <span className="text-txt-muted font-light underline decoration-border-base underline-offset-8">
                {query || "Archive"}
              </span>
            </h1>
          </div>

          {/* Grid Switcher */}
          <div className="flex items-center gap-1 bg-soft p-1.5 rounded-xl border border-border-soft">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-main text-txt-main shadow-sm"
                  : "text-txt-muted hover:text-txt-main"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-main text-txt-main shadow-sm"
                  : "text-txt-muted hover:text-txt-main"
              }`}
            >
              <StretchHorizontal size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          layout
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
              : "max-w-4xl mx-auto flex flex-col gap-10"
          }
        >
          <AnimatePresence mode="popLayout">
            {results.map((post, i) => (
              <motion.article
                layout
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`group cursor-pointer ${
                  viewMode === "list"
                    ? "flex flex-col md:flex-row gap-8 items-start border-b border-border-soft pb-10 last:border-0"
                    : "flex flex-col"
                }`}
              >
                {/* Thumbnail */}
                <div
                  className={`bg-soft rounded-2xl overflow-hidden relative transition-all duration-500 group-hover:border-border-base border border-border-soft shrink-0 ${
                    viewMode === "grid"
                      ? "aspect-video mb-6"
                      : "aspect-video w-full md:w-56"
                  }`}
                >
                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex-1 space-y-3">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-[10px] font-semibold text-txt-muted tracking-widest uppercase">
                    <span className="text-txt-main/70">{post.cat}</span>
                    <span className="w-1 h-1 bg-border-base rounded-full" />
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="opacity-50" /> {post.time}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className={`${
                      viewMode === "grid" ? "text-xl" : "text-2xl"
                    } font-semibold text-txt-main tracking-tight group-hover:text-txt-muted transition-colors leading-tight`}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-sm text-txt-muted leading-relaxed line-clamp-2 font-light tracking-tight">
                    {post.excerpt}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold text-txt-main tracking-widest uppercase border-b-2 border-transparent group-hover:border-border-base transition-all pb-1">
                      View Insight{" "}
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {results.length === 0 && (
          <div className="py-32 text-center space-y-4">
            <SearchIcon
              size={32}
              className="mx-auto text-border-base opacity-50"
            />
            <p className="text-txt-muted text-[11px] uppercase tracking-[0.3em] font-semibold">
              No results matched your query
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
