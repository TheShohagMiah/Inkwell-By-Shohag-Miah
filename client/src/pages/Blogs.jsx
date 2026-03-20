import React from "react";
import { Link } from "react-router-dom";
import { Clock, Filter, ArrowRight } from "lucide-react";

const Blogs = () => {
  const posts = [
    {
      id: "1",
      title: "The Shift to Edge Computing in 2026",
      excerpt:
        "Why latency is the new currency and how distributed networks are changing the web's architecture.",
      author: "Elena Soroka",
      category: "Infrastructure",
      date: "Mar 18",
      readTime: "6 min",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "2",
      title: "Typography in Minimalist Interfaces",
      excerpt:
        "How to use whitespace and variable fonts to create a premium feel without adding extra weight.",
      author: "Marcello Gatti",
      category: "Design",
      date: "Mar 15",
      readTime: "4 min",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-20 bg-main transition-colors">
      {/* Left: Feed */}
      <div className="lg:col-span-8 space-y-16">
        <div className="flex items-end justify-between border-b border-border-soft pb-10">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tighter text-txt-main uppercase">
              The{" "}
              <span className="font-light text-txt-muted/40 italic">
                Archive
              </span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-txt-muted">
              Technical documentation & perspectives
            </p>
          </div>
          <button className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-txt-muted hover:text-txt-main transition-colors cursor-pointer bg-soft px-5 py-2.5 rounded-xl border border-border-soft">
            <Filter size={14} strokeWidth={2.5} /> Sort: Newest
          </button>
        </div>

        <div className="space-y-24">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group block">
              <article className="flex flex-col md:flex-row gap-12">
                {/* Image Container - Sharp & Grayscale */}
                <div className="w-full md:w-72 h-48 shrink-0 overflow-hidden rounded-2xl border border-border-soft bg-soft relative">
                  <img
                    src={post.image}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 ease-out"
                    alt={post.title}
                  />
                </div>

                <div className="flex flex-col justify-center space-y-5 flex-1">
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-txt-main">
                      {post.category}
                    </span>
                    <div className="w-1.5 h-[1px] bg-border-base" />
                    <span className="text-[9px] text-txt-muted font-bold uppercase tracking-widest">
                      {post.date}
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold text-txt-main group-hover:text-txt-muted transition-colors leading-[1.1] tracking-tighter">
                    {post.title}
                  </h2>

                  <p className="text-txt-muted text-sm line-clamp-2 leading-relaxed font-light tracking-tight max-w-xl">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-6 pt-4 border-t border-border-soft/50 w-fit pr-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-txt-main">
                      {post.author}
                    </span>
                    <span className="flex items-center gap-2 text-[10px] font-bold text-txt-muted/60 uppercase tracking-tighter">
                      <Clock size={12} strokeWidth={2.5} /> {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Right: Sidebar */}
      <aside className="lg:col-span-4 space-y-16">
        <div className="sticky top-24 space-y-16">
          {/* Category Section - Simplified Hierarchy */}
          <div className="p-10 bg-soft/50 border border-border-soft rounded-2xl">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-txt-main/40 flex items-center gap-3">
              <div className="w-8 h-[1px] bg-border-base" /> Directory
            </h3>
            <div className="flex flex-col gap-5">
              {["Engineering", "Design", "Infrastructure", "AI", "Startup"].map(
                (tag) => (
                  <button
                    key={tag}
                    className="flex items-center justify-between group w-full text-left cursor-pointer"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-txt-muted group-hover:text-txt-main transition-colors">
                      {tag}
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-txt-muted/20 group-hover:text-txt-main transition-all -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100"
                    />
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Featured Voices - Squared Initials */}
          <div className="px-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-10 text-txt-main/40 flex items-center gap-3">
              <div className="w-8 h-[1px] bg-border-base" /> Contributors
            </h3>
            <div className="space-y-10">
              {[
                { name: "Elena Soroka", stories: 14 },
                { name: "Marcello Gatti", stories: 8 },
                { name: "Alex Rivera", stories: 21 },
              ].map((author, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-lg bg-soft border border-border-soft flex items-center justify-center text-[10px] font-bold text-txt-main group-hover:bg-txt-main group-hover:text-main transition-all">
                    {author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-txt-main">
                      {author.name}
                    </p>
                    <p className="text-[9px] text-txt-muted uppercase font-bold tracking-[0.1em] opacity-60">
                      {author.stories} Documents
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Blogs;
