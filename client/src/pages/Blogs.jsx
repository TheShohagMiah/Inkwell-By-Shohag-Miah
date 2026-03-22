import React from "react";
import { Link } from "react-router-dom";
import { Clock, Filter } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 bg-main">
      {/* Left: Feed */}
      <div className="lg:col-span-8 space-y-10">
        <div className="flex items-center justify-between border-b border-border-base pb-6">
          <h1 className="text-3xl font-black tracking-tight text-txt-main uppercase">
            All <span className="text-brand-primary">Stories</span>
          </h1>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-txt-muted hover:text-brand-primary transition-colors cursor-pointer">
            <Filter size={14} /> Sort by: Newest
          </button>
        </div>

        <div className="space-y-12">
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group block">
              <article className="flex flex-col md:flex-row gap-8">
                {/* Image Container with Custom Border Variable */}
                <div className="w-full md:w-72 h-48 shrink-0 overflow-hidden rounded-[2rem] border border-border-base bg-soft">
                  <img
                    src={post.image}
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                    alt={post.title}
                  />
                </div>

                <div className="flex flex-col justify-center space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">
                    {post.category}
                  </span>
                  <h2 className="text-2xl font-black text-txt-main group-hover:text-brand-primary transition-colors leading-snug tracking-tight">
                    {post.title}
                  </h2>
                  <p className="text-txt-muted text-sm line-clamp-2 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 pt-2 text-[10px] font-black text-txt-muted uppercase tracking-tighter">
                    <span className="text-txt-main">{post.author}</span>
                    <div className="w-1 h-1 bg-border-base rounded-full" />
                    <span className="flex items-center gap-1.5">
                      <Clock size={12} className="text-brand-primary" />{" "}
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Right: Sidebar */}
      <aside className="lg:col-span-4 space-y-10">
        <div className="sticky top-24 space-y-10">
          {/* Category Section with Soft Background */}
          <div className="p-8 bg-soft border border-border-base rounded-[2.5rem] shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-txt-main">
              Top Categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Engineering", "Design", "Infrastructure", "AI", "Startup"].map(
                (tag) => (
                  <button
                    key={tag}
                    className="px-4 py-2 rounded-xl bg-main border border-border-base text-[10px] font-black uppercase text-txt-muted hover:border-brand-primary hover:text-brand-primary transition-all cursor-pointer"
                  >
                    {tag}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="px-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-txt-main">
              Featured Authors
            </h3>
            <div className="space-y-6">
              {[
                { name: "Elena Soroka", stories: 14 },
                { name: "Marcello Gatti", stories: 8 },
                { name: "Alex Rivera", stories: 21 },
              ].map((author, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-linear-to-tr from-brand-primary/20 to-brand-accent/20 border border-brand-primary/10 flex items-center justify-center text-[10px] font-black text-brand-primary group-hover:scale-110 transition-transform">
                    {author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-black text-txt-main tracking-tight group-hover:text-brand-primary transition-colors">
                      {author.name}
                    </p>
                    <p className="text-[9px] text-txt-muted uppercase font-black tracking-tighter">
                      {author.stories} Stories
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
