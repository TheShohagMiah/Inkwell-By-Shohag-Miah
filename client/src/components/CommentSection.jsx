import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Clock,
  CornerDownRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CommentSection = () => {
  const [replyTarget, setReplyTarget] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Sophia Wright",
      role: "Pro Member",
      avatar: "SW",
      date: "2h ago",
      text: "The point about LCP is crucial. Most developers overlook how much a 100ms delay can affect bounce rates.",
      likes: 24,
      replies: [
        {
          id: 101,
          user: "Alex Rivera",
          role: "Author",
          avatar: "AR",
          date: "1h ago",
          text: "Exactly, Sophia! That's why we've implemented Edge Caching for all static assets on InkWell.",
          likes: 5,
        },
      ],
    },
  ]);

  const handleReplySubmit = (parentId) => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      user: "Current User",
      role: "Member",
      avatar: "CU",
      date: "Just now",
      text: replyText,
      likes: 0,
    };

    setComments((prev) =>
      prev.map((c) =>
        c.id === parentId ? { ...c, replies: [...c.replies, newReply] } : c,
      ),
    );

    setReplyText("");
    setReplyTarget(null);
  };

  return (
    <div className="space-y-20 pt-16">
      {comments.map((comment) => (
        <div key={comment.id} className="relative group">
          {/* 1. PARENT COMMENT: ARCHITECTURAL ROW */}
          <div className="flex gap-8 relative z-10">
            <div className="shrink-0 w-12 h-12 rounded-lg bg-txt-main flex items-center justify-center text-[10px] font-bold text-main shadow-lg">
              {comment.avatar}
            </div>

            <div className="flex-1 space-y-5">
              <div className="flex items-center justify-between border-b border-border-soft pb-3">
                <div className="flex items-center gap-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-txt-main">
                    {comment.user}
                  </h4>
                  <span className="text-[9px] text-txt-muted font-bold uppercase tracking-widest flex items-center gap-2 opacity-50">
                    <Clock size={10} strokeWidth={3} /> {comment.date}
                  </span>
                </div>
              </div>
              <p className="text-txt-muted text-base leading-relaxed font-light tracking-tight max-w-2xl italic">
                "{comment.text}"
              </p>

              <div className="flex items-center gap-10 pt-2">
                <button className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-txt-muted hover:text-txt-main transition-colors cursor-pointer group/btn">
                  <Heart
                    size={14}
                    strokeWidth={2.5}
                    className="group-hover/btn:fill-current"
                  />{" "}
                  {comment.likes}
                </button>
                <button
                  onClick={() =>
                    setReplyTarget(
                      replyTarget === comment.id ? null : comment.id,
                    )
                  }
                  className={`flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] transition-all cursor-pointer ${
                    replyTarget === comment.id
                      ? "text-txt-main underline underline-offset-4"
                      : "text-txt-muted hover:text-txt-main"
                  }`}
                >
                  <MessageCircle size={14} strokeWidth={2.5} />
                  {replyTarget === comment.id
                    ? "Cancel_Entry"
                    : "Add_Contribution"}
                </button>
              </div>
            </div>
          </div>

          {/* 2. THREADED REPLIES */}
          <div className="relative ml-10 md:ml-16 pl-12 md:pl-20 mt-12 space-y-12">
            {/* The Vertical Thread Line - Darker & Thicker */}
            <div className="absolute left-0 -top-8 bottom-0 w-[2px] bg-border-soft" />

            {comment.replies.map((reply) => (
              <motion.div
                key={reply.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative flex gap-6"
              >
                {/* Connector with Arrow Icon for "Upright" look */}
                <div className="absolute -left-12 md:-left-20 top-0 text-border-soft">
                  <CornerDownRight size={24} strokeWidth={1.5} />
                </div>

                <div className="shrink-0 w-10 h-10 rounded-lg bg-soft border border-border-soft flex items-center justify-center text-[9px] font-bold text-txt-main">
                  {reply.avatar}
                </div>

                <div className="flex-1 space-y-3 bg-soft/20 p-8 rounded-xl border border-border-soft">
                  <div className="flex items-center gap-4 mb-2">
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-txt-main">
                      {reply.user}
                    </h5>
                    {reply.role === "Author" && (
                      <span className="text-[8px] bg-txt-main text-main px-2 py-0.5 rounded font-black uppercase tracking-tighter">
                        Staff_Author
                      </span>
                    )}
                    <span className="text-[8px] text-txt-muted uppercase font-bold tracking-widest opacity-40">
                      {reply.date}
                    </span>
                  </div>
                  <p className="text-sm text-txt-muted leading-relaxed font-light tracking-tight">
                    {reply.text}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* DYNAMIC REPLY INPUT BOX */}
            <AnimatePresence>
              {replyTarget === comment.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="relative pt-4"
                >
                  <div className="absolute -left-12 md:-left-20 top-12 text-txt-main/40">
                    <CornerDownRight size={24} strokeWidth={2} />
                  </div>

                  <div className="bg-main border border-brand-primary shadow-2xl rounded-lg overflow-hidden focus-within:border-txt-main/40 transition-all">
                    <textarea
                      autoFocus
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="APPEND_DATA_TO_THREAD..."
                      className="w-full bg-transparent px-8 py-8 text-xs uppercase tracking-widest outline-none text-txt-main resize-none placeholder:text-txt-muted/10 font-bold leading-relaxed"
                      rows="4"
                    />
                    <div className="flex justify-between items-center px-8 py-6 bg-soft border-t border-border-soft">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[8px] font-bold text-txt-muted uppercase tracking-[0.3em]">
                          Session:{" "}
                          <span className="text-txt-main">Authorized</span>
                        </span>
                      </div>
                      <button
                        onClick={() => handleReplySubmit(comment.id)}
                        disabled={!replyText.trim()}
                        className="bg-txt-main text-main px-10 py-3 rounded-lg text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:opacity-90 transition-all disabled:opacity-10 cursor-pointer shadow-xl"
                      >
                        Commit <Send size={12} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
