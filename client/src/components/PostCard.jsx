import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";

const PostCard = ({ post, viewMode = "grid" }) => {
  const navigate = useNavigate();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className={`group cursor-pointer ${
        viewMode === "list"
          ? "flex flex-col md:flex-row gap-8 items-center border-b border-border-soft pb-8"
          : "flex flex-col"
      }`}
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      {/* Image Container */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-soft border border-border-soft shrink-0 transition-all duration-500 ${
          viewMode === "grid"
            ? "aspect-[16/10] mb-6 w-full"
            : "aspect-[16/9] w-full md:w-72 lg:w-80"
        }`}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-main/90 backdrop-blur-md border border-border-soft px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest text-txt-main">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-4 text-txt-muted text-[9px] font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> {post.readTime}
          </span>
          <span className="w-1 h-1 bg-border-soft rounded-full" />
          <span>{post.date}</span>
        </div>

        <Link
          to={`/posts/${post.id}`}
          onClick={(e) => e.stopPropagation()} // Prevents double navigation
          className={`${
            viewMode === "grid" ? "text-xl" : "text-2xl"
          } font-bold uppercase tracking-tight text-txt-main group-hover:text-txt-muted transition-colors flex justify-between items-start gap-4`}
        >
          <span className="line-clamp-2">{post.title}</span>
          <ArrowUpRight
            size={20}
            className="shrink-0 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
          />
        </Link>

        <p className="text-[11px] leading-relaxed text-txt-muted line-clamp-2 uppercase tracking-wide font-medium">
          {post.excerpt}
        </p>
      </div>
    </motion.article>
  );
};

export default PostCard;
