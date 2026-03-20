import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Share2,
  Bookmark,
  Heart,
  MessageCircle,
  ArrowLeft,
  Send,
  Link as LinkIcon,
  LayoutTemplate,
} from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import CommentSection from "../components/CommentSection";

const BlogDetails = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [activeSection, setActiveSection] = useState("");

  // 1. Reading Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // 2. Table of Contents Observer
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

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // Suggestion: Replace with a subtle custom toast
    console.log("Link copied");
  };

  return (
    <div className="min-h-screen bg-main transition-colors duration-500 pb-24">
      {/* READING PROGRESS BAR - Monochromatic & Thin */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-txt-main z-[200] origin-left"
        style={{ scaleX }}
      />

      {/* --- HERO HEADER --- */}
      <header className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto space-y-8 text-center">
          <Link
            to="/blogs"
            className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-txt-muted hover:text-txt-main transition-colors"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Library Index
          </Link>

          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-txt-main leading-[0.95] uppercase">
            The Architecture of <br />
            <span className="font-light text-txt-muted decoration-border-base underline underline-offset-[12px] decoration-1">
              Digital Soul
            </span>
          </h1>

          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-4 bg-soft px-5 py-2.5 rounded-full border border-border-soft">
              <div className="w-7 h-7 rounded-full bg-txt-main/10 border border-border-base flex items-center justify-center text-[9px] font-bold">
                AR
              </div>
              <span className="text-[10px] font-bold text-txt-main uppercase tracking-widest">
                Alex Rivera
              </span>
              <div className="w-1 h-1 bg-border-base rounded-full" />
              <span className="text-txt-muted text-[10px] uppercase font-semibold tracking-widest">
                March 20, 2026
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 relative">
        {/* LEFT SIDEBAR: Interaction */}
        <aside className="hidden lg:block lg:col-span-1">
          <div className="sticky top-40 flex flex-col items-center gap-8">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                isLiked
                  ? "bg-txt-main text-main border-txt-main"
                  : "border-border-soft text-txt-muted hover:border-txt-main hover:text-txt-main"
              }`}
            >
              <Heart
                size={18}
                fill={isLiked ? "currentColor" : "none"}
                strokeWidth={2}
              />
            </button>
            <button className="p-3.5 rounded-xl border border-border-soft text-txt-muted hover:border-txt-main hover:text-txt-main transition-all cursor-pointer">
              <Bookmark size={18} strokeWidth={2} />
            </button>
            <div className="h-16 w-[1px] bg-border-soft" />
            <button
              onClick={copyLink}
              className="p-3.5 rounded-xl border border-border-soft text-txt-muted hover:border-txt-main transition-all cursor-pointer"
            >
              <LinkIcon size={18} strokeWidth={2} />
            </button>
          </div>
        </aside>

        {/* CENTER: The Article */}
        <main className="lg:col-span-7">
          <div className="aspect-video rounded-3xl overflow-hidden mb-20 border border-border-soft bg-soft shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600"
              className="w-full h-full object-cover grayscale opacity-90"
              alt="Conceptual Design Architecture"
            />
          </div>

          <article
            className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none 
            prose-p:leading-[1.9] prose-p:text-txt-muted prose-p:font-light
            prose-headings:tracking-tighter prose-headings:font-semibold prose-headings:text-txt-main prose-headings:uppercase"
          >
            <p className="text-2xl font-medium text-txt-main mb-12 leading-snug tracking-tight border-l-2 border-border-base pl-8 py-2">
              Interfaces are no longer just tools; they are the membranes
              through which we perceive reality.
            </p>

            <h2 id="section-1" className="text-3xl mt-16 mb-6">
              The Golden Ratio of UI
            </h2>
            <p>
              When we talk about industry-level design, we are talking about the
              balance between utility and aesthetics. Modernism taught us that
              form follows function, but in the digital age, form *is* function.
              The way a shadow falls or a curve terminates informs the user's
              trust in the system.
            </p>

            <h2 id="section-2" className="text-3xl mt-16 mb-6">
              Technical Implementation
            </h2>
            <p>
              Scaling a platform like InkWell requires a robust architecture. By
              leveraging edge computing, we ensure that the soul of the
              application remains responsive, regardless of geographic distance.
            </p>
          </article>

          {/* --- RESPONSES SECTION --- */}
          <section className="mt-40 pt-20 border-t border-border-soft">
            <div className="flex items-end justify-between mb-12">
              <h3 className="text-3xl font-semibold text-txt-main uppercase tracking-tighter">
                Discussion
              </h3>
              <span className="text-[11px] font-bold text-txt-muted uppercase tracking-[0.3em] border-b border-border-base pb-1">
                12 Entries
              </span>
            </div>

            <div className="relative bg-soft rounded-3xl border border-border-soft overflow-hidden transition-all duration-500 focus-within:border-txt-main/30">
              <div className="flex items-center justify-between px-8 pt-8 pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-main border border-border-soft" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-txt-muted">
                    Signatory: <span className="text-txt-main">Guest User</span>
                  </span>
                </div>
              </div>

              <textarea
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Contribute to the dialogue..."
                className="w-full bg-transparent px-8 py-6 text-lg outline-none resize-none text-txt-main placeholder:text-txt-muted/30 font-light leading-relaxed"
              />

              <div className="flex items-center justify-between px-8 py-6 bg-main/50 border-t border-border-soft">
                <div className="flex items-center gap-4">
                  <button className="text-[10px] font-bold uppercase tracking-widest text-txt-muted hover:text-txt-main transition-colors cursor-pointer">
                    Clear
                  </button>
                  <button className="bg-txt-main text-main px-10 py-4 rounded-xl font-bold text-[10px] uppercase tracking-[0.25em] transition-all hover:opacity-90 active:scale-[0.98] flex items-center gap-3 cursor-pointer">
                    Submit Contribution
                    <Send size={14} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          </section>
          <CommentSection />
        </main>

        {/* RIGHT SIDEBAR: Table of Contents */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-40 space-y-12">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-txt-muted border-b border-border-soft pb-2 w-fit">
                Index
              </h4>
              <nav className="flex flex-col gap-5">
                {[
                  { id: "section-1", label: "The Golden Ratio of UI" },
                  { id: "section-2", label: "Technical Implementation" },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`text-[11px] uppercase tracking-widest font-bold transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-txt-main translate-x-2"
                        : "text-txt-muted hover:text-txt-main"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="p-10 bg-txt-main rounded-[2.5rem] text-main space-y-6">
              <h4 className="text-xl font-semibold leading-tight tracking-tight uppercase">
                InkWell <br /> Weekly
              </h4>
              <p className="text-main/70 text-[11px] leading-relaxed font-medium uppercase tracking-wider">
                Curated insights on the future of design.
              </p>
              <div className="space-y-3 pt-2">
                <input
                  type="text"
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-main/10 border border-main/20 rounded-xl px-4 py-3 text-[10px] font-bold tracking-widest outline-none placeholder:text-main/30 text-main focus:border-main/50 transition-colors"
                />
                <button className="w-full bg-main text-txt-main font-bold py-3.5 rounded-xl text-[10px] uppercase tracking-[0.2em] hover:opacity-90 transition-opacity cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;
