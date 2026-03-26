import React from "react";
import { Zap, Activity } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import PostCard from "./PostCard";

const TrendingSection = ({ posts }) => {
  return (
    <section className="mt-40 relative overflow-hidden pb-20">
      {/* 01 / HEADER SYSTEM */}
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between mb-16">
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-soft border border-border-soft text-brand-primary shadow-sm">
            <Zap size={18} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.5em] text-txt-main">
              Trending Protocol
            </h2>
            <p className="text-[9px] font-medium text-txt-muted uppercase tracking-[0.2em] mt-1 opacity-60">
              Real-time Engagement Data
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-soft/30 border border-border-soft rounded-full">
          <Activity size={12} className="text-brand-primary opacity-50" />
          <span className="text-[9px] font-medium uppercase tracking-widest text-txt-muted">
            Live Stream Enabled
          </span>
        </div>
      </div>

      {/* 02 / CONTINUOUS MOTION ENGINE */}
      <div className="relative">
        {/* Subtle Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-main to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-main to-transparent z-10 pointer-events-none" />

        <Swiper
          modules={[Autoplay]}
          spaceBetween={60}
          slidesPerView={"auto"}
          loop={true}
          speed={8000} // Increased for a smoother, professional glide
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          // Ensures the movement is linear and never stops
          allowTouchMove={false}
          className="!overflow-visible cursor-default transition-timing-linear"
        >
          {posts.map((post) => (
            <SwiperSlide
              key={post.id}
              className="!w-[340px] !h-auto flex justify-center"
            >
              <div className="w-full opacity-80 hover:opacity-100 transition-opacity duration-700 group">
                {/* Passing a simplified viewMode or specific flag 
                   if PostCard needs to be more compact here 
                */}
                <PostCard post={post} viewMode="grid" />
              </div>
            </SwiperSlide>
          ))}
          {/* Duplicating slides internally if posts.length is low is handled by Swiper loop */}
        </Swiper>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .transition-timing-linear .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `,
        }}
      />
    </section>
  );
};

export default TrendingSection;
