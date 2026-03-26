import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Share2,
  Bookmark,
  Heart,
  ArrowLeft,
  Send,
  Link as LinkIcon,
  Tag,
  ArrowRight,
  User,
  SearchIcon,
  Share2Icon,
  Facebook,
  TwitterIcon,
  InstagramIcon,
} from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import CommentSection from "../components/CommentSection";
import RelatedEntities from "../components/ui/RelatedPosts";
import { posts } from "../data/demoData";

const BlogDetails = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [activeSection, setActiveSection] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "0% 0% -80% 0%" },
    );

    document.querySelectorAll("h2").forEach((h2) => observer.observe(h2));
    return () => observer.disconnect();
  }, []);

  const tags = [
    "Architecture",
    "Modernism",
    "Scale",
    "Registry",
    "Architecture",
  ];

  const relatedPosts = [
    { id: "2", title: "The Geometry of Motion", cat: "Design" },
    { id: "3", title: "Edge Computing Protocols", cat: "Engineering" },
  ];

  return (
    <div className="min-h-screen text-txt-main pb-24 transition-colors duration-500">
      <Helmet>
        <title>The Architecture of Digital Soul // INKWELL</title>
      </Helmet>

      {/* PROGRESS FILAMENT */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-brand-primary z-[200] origin-left"
        style={{ scaleX }}
      />

      {/* --- HERO ARCHITECTURE --- */}
      <header className="pb-10">
        <div className="max-w-4xl mx-auto space-y-10 text-center">
          <Link
            to="/blogs"
            className="group inline-flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.5em] text-txt-muted hover:text-brand-primary transition-colors"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Return to Index
          </Link>

          <h1 className="text-3xl md:text-6xl font-bold tracking-tighter leading-[0.9] uppercase">
            The Architecture of <br />
            <span className="font-light italic text-txt-muted/60 lowercase tracking-normal">
              Digital Soul
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 pt-6">
            <div className="flex items-center gap-5 bg-soft/70 px-6 py-3 rounded-full border border-border-soft backdrop-blur-sm">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-brand-primary">
                Alex Rivera
              </span>
              <div className="w-[1px] h-3 bg-border-soft" />
              <span className="text-txt-muted text-[10px] uppercase font-medium tracking-[0.3em]">
                March 20, 2026
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
        {/* LEFT: INTERACTION PROTOCOL */}

        {/* CENTER: CORE NARRATIVE */}
        <main className="lg:col-span-8">
          <div className="aspect-video rounded-lg overflow-hidden mb-20 border border-border-soft bg-soft relative group">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600"
              className="w-full h-full object-cover grayscale opacity-60 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
              alt="Conceptual Architecture"
            />
          </div>

          <article
            className="prose prose-xl prose-slate dark:prose-invert max-w-none 
            prose-p:text-lg prose-p:leading-relaxed prose-p:font-light prose-p:text-txt-muted prose-p:tracking-tight
            prose-headings:font-medium prose-headings:tracking-tighter prose-headings:uppercase prose-headings:text-txt-main"
          >
            <p className="text-2xl font-medium text-txt-main mb-16 leading-tight tracking-tighter border-l border-brand-primary/40 pl-10 py-2">
              Interfaces are no longer just tools; they are the membranes
              through which we perceive digital reality.
            </p>

            <h2 id="section-1">The Golden Ratio of UI</h2>
            <p>
              When we talk about industry-level design, we are talking about the
              balance between utility and aesthetics. Modernism taught us that
              form follows function, but in the digital age, form{" "}
              <strong>is</strong> function.
            </p>

            <h2 id="section-2">Technical Implementation</h2>
            <p>
              Scaling a platform like InkWell requires a robust architecture. By
              leveraging edge computing, we ensure the soul of the application
              remains responsive, regardless of geographic distance.
            </p>
          </article>

          {/* TAGS & SHARE */}
          <div className="mt-24 pt-12 border-t border-border-soft flex flex-col lg:flex-row justify-between gap-8">
            <div className="flex flex-wrap items-center uppercase gap-3">
              {" "}
              <span className="font-bold text-xs tracking-[0.3em]">Tags:</span>
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1.5 bg-soft border border-border-soft rounded-xl text-[8px] font-bold uppercase tracking-[0.3em] text-txt-muted hover:border-brand-primary/30 hover:bg-brand-primary hover:text-white transition-all cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
              <span className="text-sm font-medium uppercase text-txt-muted bg-soft rounded-2xl px-4 py-1.5">
                +... {tags.length - 4}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] ">
              <span className="font-bold text-xs uppercase tracking-[0.4em] text-txt-main hover:opacity-70 transition-opacity">
                Share:
              </span>
              <div className="w-8 h-8  flex items-center justify-center bg-soft hover:bg-brand-primary transition-all text-txt-muted cursor-pointer hover:text-white border border-border-soft rounded-2xl">
                <Share2Icon size={14} />
              </div>

              <div className="w-8 h-8  flex items-center justify-center bg-soft hover:bg-brand-primary transition-all text-txt-muted cursor-pointer hover:text-white border border-border-soft rounded-2xl">
                <TwitterIcon size={14} />
              </div>
              <div className="w-8 h-8  flex items-center justify-center bg-soft hover:bg-brand-primary transition-all text-txt-muted cursor-pointer hover:text-white border border-border-soft rounded-2xl">
                <InstagramIcon size={14} />
              </div>
            </div>
          </div>

          {/* AUTHOR SIGNATURE */}
          <section className="mt-15 p-5 md:p-10 bg-soft/50 border border-border-soft rounded-xl shadow-sm flex flex-col md:flex-row gap-10 items-center">
            <div className="w-24 h-24 shrink-0 rounded-full bg-main border border-border-soft overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center text-txt-muted/20">
                <User size={40} strokeWidth={1} />
              </div>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 border-brand-primary"
                alt="Alex Rivera"
              />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-[10px] font-medium uppercase tracking-[0.5em] text-brand-primary">
                Lead Architect
              </h4>
              <h3 className="text-3xl font-medium tracking-tighter uppercase text-txt-main">
                Alex Rivera
              </h3>
              <p className="text-sm font-light text-txt-muted leading-relaxed max-w-md">
                Exploring the intersection of structural engineering and digital
                interface design. Alex oversees the InkWell Registry protocols.
              </p>
            </div>
          </section>

          <RelatedEntities posts={posts} />

          {/* DISCUSSION PROTOCOL */}
          <section className="mt-15">
            <div className="flex items-end justify-between mb-12">
              <h3 className="text-3xl font-medium text-txt-main uppercase tracking-tighter">
                Discussion
              </h3>
              <span className="text-[10px] font-medium text-txt-muted uppercase tracking-[0.4em]">
                12 Entries
              </span>
            </div>
            <div className="bg-soft/50 rounded-lg border border-border-soft overflow-hidden focus-within:border-brand-primary/30 transition-all">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add to the registry..."
                className="w-full bg-transparent p-10 text-lg outline-none resize-none text-txt-main placeholder:text-txt-muted/20 font-light"
                rows="4"
              />
              <div className="px-10 py-6 bg-main/50 border-t border-border-soft flex justify-end">
                <button className="bg-txt-main text-main px-8 py-4 rounded-xl font-medium text-[9px] uppercase tracking-[0.4em] hover:bg-brand-primary hover:text-white transition-all flex items-center gap-3">
                  Submit Entry <Send size={12} strokeWidth={2} />
                </button>
              </div>
            </div>
            <CommentSection />
          </section>
        </main>

        {/* RIGHT: REGISTRY INDEX */}
        <aside className="lg:col-span-4">
          <div className="sticky top-40 space-y-10">
            {/* 1. SEARCH PROTOCOL */}
            <div className="space-y-5 bg-card border border-card rounded-lg p-4 shadow-xl">
              <h4 className="text-[9px] font-medium uppercase tracking-[0.5em] text-txt-muted border-b border-border-soft pb-4">
                Search Registry
              </h4>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="QUERY DATABASE..."
                  className="w-full bg-soft/50 border border-border-soft rounded-xl px-5 py-3 text-[10px] font-medium tracking-[0.2em] outline-none focus:border-brand-primary/40 focus:bg-soft transition-all placeholder:text-txt-muted/30"
                />
                <SearchIcon
                  size={14}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-txt-muted opacity-40 group-focus-within:text-brand-primary transition-colors"
                />
              </div>
            </div>

            {/* 3. PRIORITY ENTITIES (Top 5) */}
            <div className="space-y-5 bg-card border border-card rounded-lg p-4 shadow-xl">
              <h4 className="text-[9px] font-medium uppercase tracking-[0.5em] text-txt-muted border-b border-border-soft pb-4">
                Priority Entities
              </h4>
              <div className="space-y-8">
                {[
                  { id: "1", title: "The Architecture of Soul", cat: "Core" },
                  { id: "2", title: "Spatial Interfaces", cat: "Design" },
                  { id: "3", title: "Latency Protocols", cat: "Eng" },
                  { id: "4", title: "The Grid System", cat: "Layout" },
                  { id: "5", title: "Type as Structure", cat: "Font" },
                ].map((post, idx) => (
                  <div
                    key={post.id}
                    className="group cursor-pointer flex gap-4"
                  >
                    <span className="text-[9px] font-medium text-txt-muted opacity-30 mt-1">
                      0{idx + 1}
                    </span>
                    <div className="space-y-1">
                      <p className="text-[7px] font-medium uppercase tracking-[0.4em] text-brand-primary/60">
                        {post.cat}
                      </p>
                      <h5 className="text-sm font-medium tracking-tight uppercase text-txt-main group-hover:text-brand-primary transition-colors leading-tight">
                        {post.title}
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. COMMUNICATION LINK (Get in Touch) */}
            <div className="space-y-5 bg-card border border-card rounded-lg p-4 shadow-xl">
              <h4 className="text-[10px] font-medium uppercase tracking-[0.4em] text-txt-main">
                Liaison
              </h4>
              <p className="text-[11px] font-light text-txt-muted leading-relaxed tracking-tight">
                Request a formal consultation or report a registry anomaly.
              </p>
              <button className="w-full group flex items-center justify-between bg-main border border-border-soft hover:border-brand-primary/40 px-5 py-3.5 rounded-xl transition-all cursor-pointer">
                <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-txt-main">
                  Get in Touch
                </span>
                <ArrowRight
                  size={14}
                  className="text-brand-primary -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
                />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;
