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
import { Helmet } from "react-helmet-async";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const rawQuery = searchParams.get("q") || "";
  const [viewMode, setViewMode] = useState("grid");
  const displayQuery = rawQuery.trim() || "Archive";
  const pageTitle = rawQuery.trim()
    ? `Search: ${rawQuery.trim()} // INKWELL`
    : "Library Archive // INKWELL";

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
    <div className="min-h-screen bg-main text-txt-main pb-24 transition-colors duration-500 selection:bg-brand-primary/20">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      {/* --- HEADER --- */}
      <header className="relative overflow-hidden border-b border-border-soft py-16 lg:py-24 bg-soft/30">
        {/* Subtle Brand Glow using your accent color */}
        <div className="absolute right-0 top-0 h-full w-1/3 rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-primary shadow-[0_0_8px_var(--color-brand-primary)]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-txt-muted">
                Database Inquiry
              </p>
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter text-txt-main md:text-4xl leading-none">
              {rawQuery ? "Found " : "The "}
              <span className="font-light italic lowercase tracking-normal text-txt-muted underline underline-offset-[12px] decoration-brand-primary/30 ml-4">
                {displayQuery}
              </span>
            </h3>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 rounded-xl border border-border-soft bg-soft p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-lg p-2 transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-main text-txt-main shadow-sm border border-border-soft"
                  : "text-txt-muted hover:text-txt-main"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-lg p-2 transition-all cursor-pointer ${
                viewMode === "list"
                  ? "bg-main text-txt-main shadow-sm border border-border-soft"
                  : "text-txt-muted hover:text-txt-main"
              }`}
            >
              <StretchHorizontal size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        {/* Metadata Bar */}
        <div className="mb-16 flex items-center justify-between border-b border-border-soft pb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-txt-muted">
          <span>Result Count: {results.length}</span>
          <span className="hidden opacity-60 italic md:block uppercase">
            Index Search Optimized
          </span>
        </div>

        <motion.div
          layout
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-x-12 gap-y-20 sm:grid-cols-2 lg:grid-cols-3"
              : "mx-auto flex max-w-4xl flex-col gap-12"
          }
        >
          <AnimatePresence mode="popLayout">
            {results.map((post, i) => (
              <motion.article
                layout
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`group relative cursor-pointer ${
                  viewMode === "list"
                    ? "flex flex-col items-center gap-10 border-b border-border-soft pb-12 last:border-0 md:flex-row"
                    : "flex flex-col"
                }`}
              >
                {/* Thumbnail using 'bg-soft' and 'border-border-soft' */}
                <div
                  className={`relative shrink-0 overflow-hidden rounded-[2.5rem] border border-border-soft bg-soft transition-all duration-700 group-hover:border-brand-primary/30 ${
                    viewMode === "grid"
                      ? "aspect-[16/10] mb-8"
                      : "aspect-video w-full md:w-64"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-0 flex items-center justify-center font-black italic text-txt-main/5 text-5xl transition-colors group-hover:text-brand-primary/10">
                    {post.cat.charAt(0)}
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-brand-primary">
                    <span>{post.cat}</span>
                    <span className="h-1 w-1 rounded-full bg-border-base" />
                    <span className="flex items-center gap-1.5 text-txt-muted">
                      <Clock size={12} className="opacity-60" /> {post.time}
                    </span>
                  </div>

                  <h2
                    className={`font-bold tracking-tighter text-txt-main transition-colors group-hover:text-txt-muted ${
                      viewMode === "grid" ? "text-2xl" : "text-3xl"
                    }`}
                  >
                    {post.title}
                  </h2>

                  <p className="text-sm font-light leading-relaxed tracking-tight text-txt-muted line-clamp-2 md:text-base">
                    {post.excerpt}
                  </p>

                  <div className="pt-4">
                    <span className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-txt-main transition-all group-hover:gap-6">
                      View Insight{" "}
                      <ArrowRight size={14} className="text-brand-primary" />
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
            <div className="relative rounded-full border border-border-soft bg-soft p-10">
              <SearchIcon
                size={40}
                className="text-border-base animate-pulse"
              />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-bold uppercase tracking-[0.2em] text-txt-main">
                No Matches Found
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.5em] text-txt-muted">
                The archive returned null
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
