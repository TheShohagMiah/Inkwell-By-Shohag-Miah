import React from "react";
import { Link } from "react-router-dom";
import { Clock, Filter, ArrowUpRight, BookOpen } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-1 lg:grid-cols-12 gap-20 transition-colors duration-500">
      {/* --- 01 / PRIMARY FEED ARCHIVE --- */}
      <div className="lg:col-span-8 space-y-20">
        <header className="flex items-end justify-between border-b border-border-soft pb-10">
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-brand-primary">
              Global Registry
            </span>
            <h1 className="text-5xl font-medium tracking-tighter text-txt-main uppercase leading-none">
              All{" "}
              <span className="text-txt-muted italic font-normal">Stories</span>
            </h1>
          </div>
          <button className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.3em] text-txt-muted hover:text-brand-primary transition-all cursor-pointer pb-2 group">
            <Filter size={14} strokeWidth={1.5} />
            <span className="opacity-40">Sort:</span> Newest
          </button>
        </header>

        <div className="space-y-28">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group block">
              <article className="flex flex-col md:flex-row gap-12">
                {/* Image Chassis */}
                <div className="w-full md:w-80 h-60 shrink-0 overflow-hidden rounded-[2.5rem] border border-border-soft bg-soft/30 p-2.5">
                  <div className="w-full h-full overflow-hidden rounded-[2rem]">
                    <img
                      src={post.image}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                      alt={post.title}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-5">
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-brand-primary px-4 py-1.5 bg-brand-primary/5 border border-brand-primary/10 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-txt-muted opacity-40">
                      {post.date}
                    </span>
                  </div>

                  <h2 className="text-3xl font-medium text-txt-main group-hover:text-brand-primary transition-colors leading-[1.2] tracking-tight uppercase">
                    {post.title}
                  </h2>

                  <p className="text-txt-muted text-[15px] line-clamp-2 leading-relaxed font-medium opacity-70 max-w-xl">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-8 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/40" />
                      <span className="text-[10px] font-medium text-txt-main uppercase tracking-[0.2em]">
                        {post.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-medium text-txt-muted uppercase tracking-[0.2em]">
                      <Clock
                        size={14}
                        strokeWidth={1.5}
                        className="opacity-30"
                      />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* --- 02 / SYSTEM SIDEBAR --- */}
      <aside className="lg:col-span-4">
        <div className="sticky top-32 space-y-16">
          {/* Taxonomy Module */}
          <div className="p-12 bg-soft/30 border border-border-soft rounded-[3rem] shadow-sm relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-6 text-txt-main opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700">
              <BookOpen size={120} strokeWidth={1} />
            </div>

            <h3 className="text-[10px] font-medium uppercase tracking-[0.4em] mb-10 text-txt-muted border-b border-border-soft pb-3 w-fit">
              Registry Taxonomy
            </h3>

            <div className="flex flex-wrap gap-3 relative z-10">
              {["Engineering", "Design", "Infrastructure", "AI", "Startup"].map(
                (tag) => (
                  <button
                    key={tag}
                    className="px-5 py-2.5 rounded-[1rem] bg-main border border-border-soft text-[10px] font-medium uppercase tracking-[0.2em] text-txt-muted hover:border-brand-primary hover:text-brand-primary transition-all cursor-pointer"
                  >
                    {tag}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Contributors Module */}
          <div className="px-8 space-y-10">
            <h3 className="text-[10px] font-medium uppercase tracking-[0.5em] text-txt-muted flex items-center gap-4 opacity-50">
              <div className="w-8 h-[1px] bg-border-soft" /> Contributors
            </h3>

            <div className="space-y-10">
              {[
                { name: "Elena Soroka", stories: 14, initial: "ES" },
                { name: "Marcello Gatti", stories: 8, initial: "MG" },
                { name: "Alex Rivera", stories: 21, initial: "AR" },
              ].map((author, i) => (
                <Link
                  to="/author/me"
                  key={i}
                  className="flex items-center gap-6 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-[1.25rem] bg-soft border border-border-soft flex items-center justify-center text-[10px] font-medium text-txt-main group-hover:bg-brand-primary group-hover:text-main group-hover:border-brand-primary transition-all duration-500 shadow-sm">
                    {author.initial}
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-sm font-medium text-txt-main tracking-tight group-hover:text-brand-primary transition-colors uppercase">
                      {author.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-txt-muted uppercase font-medium tracking-[0.3em] opacity-50">
                        {author.stories} Dispatches
                      </span>
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 group-hover:opacity-40 transition-opacity"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Blogs;
