import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search as SearchIcon,
  Clock,
  ArrowRight,
  LayoutGrid,
  StretchHorizontal,
  Fingerprint,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const rawQuery = searchParams.get("q") || "";
  const [viewMode, setViewMode] = useState("grid");
  const displayQuery = rawQuery.trim() || "Full Archive";
  const pageTitle = rawQuery.trim()
    ? `Query: ${rawQuery.trim()} // INKWELL`
    : "Library Ledger // INKWELL";

  // Mock results with extended metadata
  const results = [
    {
      id: 1,
      title: "The Art of Subtle Interfaces",
      cat: "Design",
      time: "5 min",
      excerpt:
        "A study on reducing cognitive load through soft shadows and spatial awareness.",
    },
    {
      id: 2,
      title: "React State Harmony",
      cat: "Dev",
      time: "10 min",
      excerpt:
        "Architecting for performance and readability in complex modern web environments.",
    },
    {
      id: 3,
      title: "Modernist Typography",
      cat: "Typography",
      time: "3 min",
      excerpt:
        "How neo-grotesque typefaces define the visual language of the digital landscape.",
    },
    {
      id: 4,
      title: "Future of CSS Native",
      cat: "Dev",
      time: "7 min",
      excerpt:
        "Exploring the new frontier of native CSS nesting, scoping, and custom variables.",
    },
    {
      id: 5,
      title: "Minimalist Motion",
      cat: "Design",
      time: "4 min",
      excerpt:
        "Using physics-based animations to guide attention without distracting the user.",
    },
    {
      id: 6,
      title: "Backend Scalability",
      cat: "Engineering",
      time: "12 min",
      excerpt:
        "Architecting systems that handle massive concurrent loads through node distribution.",
    },
  ];

  return (
    <div className="min-h-screen text-txt-main pb-24 transition-colors duration-500 selection:bg-brand-primary/10">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      {/* --- HEADER ARCHITECTURE --- */}
      <header className="relative overflow-hidden border-b border-border-soft py-20 lg:py-32 bg-soft/20">
        {/* Ambient background element */}
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-8 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-primary" />
              <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-txt-muted opacity-60">
                System Inquiry // Registry
              </p>
            </div>
            <h1 className="text-4xl md:text-6xl font-medium uppercase tracking-tighter text-txt-main leading-none">
              {rawQuery ? "Located " : "Accessing "}
              <span className="font-light italic lowercase tracking-tight text-txt-muted ml-3 opacity-80">
                {displayQuery}
              </span>
            </h1>
          </div>

          {/* Interface Switcher */}
          <div className="flex items-center gap-2 rounded-2xl border border-border-soft bg-main/50 p-1.5 backdrop-blur-md">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-xl p-3 transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-main text-brand-primary shadow-sm border border-border-soft"
                  : "text-txt-muted hover:text-txt-main"
              }`}
            >
              <LayoutGrid size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-xl p-3 transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-main text-brand-primary shadow-sm border border-border-soft"
                  : "text-txt-muted hover:text-txt-main"
              }`}
            >
              <StretchHorizontal size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-8 py-20">
        {/* Status Bar */}
        <div className="mb-20 flex items-center justify-between border-b border-border-soft pb-6 text-[9px] font-medium uppercase tracking-[0.4em] text-txt-muted/50">
          <div className="flex items-center gap-4">
            <Fingerprint size={14} className="opacity-40" />
            <span>Entities Found: {results.length}</span>
          </div>
          <span className="hidden md:block italic">
            Protocol v2.0 // Latency 14ms
          </span>
        </div>

        <motion.div
          layout
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-x-12 gap-y-24 sm:grid-cols-2 lg:grid-cols-3"
              : "mx-auto flex max-w-5xl flex-col gap-16"
          }
        >
          <AnimatePresence mode="popLayout">
            {results.map((post, i) => (
              <motion.article
                layout
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.05,
                }}
                className={`group relative cursor-pointer ${
                  viewMode === "list"
                    ? "flex flex-col items-start gap-12 border-b border-border-soft/50 pb-16 last:border-0 md:flex-row md:items-center"
                    : "flex flex-col"
                }`}
              >
                {/* Node Representation */}
                <div
                  className={`relative shrink-0 overflow-hidden rounded-[2.5rem] border border-border-soft bg-soft/40 transition-all duration-700 group-hover:border-brand-primary/40 ${
                    viewMode === "grid"
                      ? "aspect-[16/10] mb-8"
                      : "aspect-video w-full md:w-72"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center font-medium italic text-txt-main/5 text-6xl transition-all duration-700 group-hover:scale-110 group-hover:text-brand-primary/10">
                    {post.cat.charAt(0)}
                  </div>
                </div>

                <div className="flex-1 space-y-5">
                  <div className="flex items-center gap-4 text-[9px] font-medium uppercase tracking-[0.3em]">
                    <span className="text-brand-primary">{post.cat}</span>
                    <span className="h-1 w-1 rounded-full bg-border-soft" />
                    <span className="flex items-center gap-2 text-txt-muted">
                      <Clock size={12} className="opacity-40" /> {post.time}
                    </span>
                  </div>

                  <h2
                    className={`font-medium tracking-tighter text-txt-main transition-colors group-hover:text-brand-primary ${
                      viewMode === "grid" ? "text-2xl" : "text-4xl"
                    }`}
                  >
                    {post.title}
                  </h2>

                  <p className="text-sm font-light leading-relaxed tracking-tight text-txt-muted line-clamp-2 opacity-70">
                    {post.excerpt}
                  </p>

                  <div className="pt-4">
                    <span className="inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.4em] text-txt-main transition-all group-hover:gap-6">
                      Access Dispatch
                      <ArrowRight
                        size={14}
                        className="text-brand-primary"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* --- EMPTY STATE --- */}
        {results.length === 0 && (
          <div className="flex flex-col items-center gap-8 py-48 text-center">
            <div className="relative rounded-full border border-border-soft bg-soft/50 p-12">
              <SearchIcon
                size={48}
                strokeWidth={1}
                className="text-txt-muted opacity-20 animate-pulse"
              />
            </div>
            <div className="space-y-4">
              <p className="text-xl font-medium uppercase tracking-[0.3em] text-txt-main">
                Registry Null
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-txt-muted opacity-50">
                No archived entities match this query
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
