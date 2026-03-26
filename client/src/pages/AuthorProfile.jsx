import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Globe,
  Twitter,
  Github,
  Layers,
  FileText,
  Activity,
  ArrowRight,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const AuthorProfile = () => {
  const { username } = useParams();

  // Mock Data for System Alignment
  const author = {
    name: "Alex Rivera",
    role: "Lead Systems Architect",
    bio: "Focused on the intersection of distributed systems and minimalist interface design. Currently maintaining the InkWell core protocol.",
    location: "Madrid, ES",
    stats: [
      { label: "Dispatches", value: "24" },
      { label: "Subscribers", value: "1.2k" },
      { label: "Uptime", value: "99.9%" },
    ],
    recentPosts: [
      {
        id: "1",
        title: "The Architecture of Digital Soul",
        date: "Mar 20, 2026",
        category: "Philosophy",
      },
      {
        id: "2",
        title: "Vector Scaling in React 19",
        date: "Feb 14, 2026",
        category: "Engineering",
      },
    ],
  };

  return (
    <div className="min-h-screen transition-colors duration-500 pb-32">
      <Helmet>
        <title>{author.name} | System Identity</title>
      </Helmet>

      {/* --- PROXIMITY HEADER --- */}
      <div className="h-64 bg-soft/20 border-b border-border-soft relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6">
        <div className="relative -mt-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* --- LEFT: IDENTITY CARD --- */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="bg-card border border-border-soft p-10 rounded-[3rem] shadow-sm relative">
              <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-main bg-soft shadow-xl mb-8">
                <img
                  src="/api/placeholder/200/200"
                  alt={author.name}
                  className="w-full h-full object-cover grayscale"
                />
              </div>

              <div className="space-y-2">
                <h1 className="text-2xl font-medium text-txt-main tracking-tight uppercase">
                  {author.name}
                </h1>
                <p className="text-[10px] font-medium text-brand-primary uppercase tracking-[0.3em]">
                  {author.role}
                </p>
              </div>

              <p className="mt-8 text-sm text-txt-muted leading-relaxed font-normal">
                {author.bio}
              </p>

              <div className="pt-10 flex items-center gap-6">
                <a
                  href="#"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  <Github size={18} />
                </a>
                <a
                  href="#"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="text-txt-muted hover:text-brand-primary transition-colors"
                >
                  <Globe size={18} />
                </a>
              </div>
            </div>

            {/* System Metrics Module */}
            <div className="p-10 bg-soft/10 border border-border-soft rounded-[3rem] space-y-8">
              <h3 className="text-[10px] font-medium uppercase tracking-[0.4em] text-txt-muted">
                System Metrics
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {author.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between border-b border-border-soft pb-4"
                  >
                    <span className="text-[10px] font-medium text-txt-muted uppercase tracking-widest">
                      {stat.label}
                    </span>
                    <span className="text-sm font-medium text-txt-main tracking-tighter">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* --- RIGHT: ACTIVITY & FEED --- */}
          <div className="lg:col-span-8 pt-12 lg:pt-24 space-y-20">
            {/* Expertise Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-brand-primary/5 rounded-lg text-brand-primary border border-brand-primary/10">
                  <Activity size={16} />
                </div>
                <h2 className="text-[11px] font-medium uppercase tracking-[0.4em] text-txt-main">
                  Active Research Nodes
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Distributed Systems",
                  "Interface Psychology",
                  "React Concurrency",
                ].map((node) => (
                  <div
                    key={node}
                    className="p-6 bg-card border border-border-soft rounded-2xl flex items-center justify-between group cursor-default"
                  >
                    <span className="text-[10px] font-medium uppercase tracking-widest text-txt-muted group-hover:text-txt-main transition-colors">
                      {node}
                    </span>
                    <Layers
                      size={14}
                      className="text-border-soft group-hover:text-brand-primary transition-colors"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Publication Feed */}
            <section className="space-y-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-soft rounded-lg text-txt-muted">
                    <FileText size={16} />
                  </div>
                  <h2 className="text-[11px] font-medium uppercase tracking-[0.4em] text-txt-main">
                    Publication Archive
                  </h2>
                </div>
                <span className="text-[9px] font-medium text-txt-muted uppercase tracking-widest opacity-50">
                  Sort: Chronological
                </span>
              </div>

              <div className="space-y-4">
                {author.recentPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group block p-8 bg-card hover:bg-soft/20 border border-border-soft rounded-[2rem] transition-all duration-500"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <span className="text-[9px] font-medium text-brand-primary uppercase tracking-[0.3em]">
                          {post.category}
                        </span>
                        <h4 className="text-lg font-medium text-txt-main group-hover:text-brand-primary transition-colors tracking-tight uppercase">
                          {post.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-8">
                        <span className="text-[10px] font-medium text-txt-muted uppercase tracking-widest">
                          {post.date}
                        </span>
                        <ArrowRight
                          size={16}
                          className="text-border-soft group-hover:text-brand-primary group-hover:translate-x-1 transition-all"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthorProfile;
