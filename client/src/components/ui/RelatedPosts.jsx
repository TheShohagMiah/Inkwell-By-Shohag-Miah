import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ArrowRight, Clock, User } from "lucide-react";
import { Link } from "react-router-dom";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";

const RelatedEntities = ({ posts }) => {
  return (
    <section className="pt-20 border-t border-border-soft">
      <div className="flex items-end justify-between mb-12">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-txt-main uppercase ">
            Related Entities
          </h3>
        </div>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={32}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="related-swiper !pb-16"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <Link to={`/posts/${post.id}`} className="group block space-y-6">
              {/* Entity Thumbnail */}
              <div className="aspect-[16/10] overflow-hidden rounded-lg border border-border-soft bg-soft relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover grayscale opacity-60 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-main/20 to-transparent" />
              </div>

              {/* Entity Identity */}
              <div className="space-y-4 px-2">
                <div className="flex items-center justify-between gap-4 text-[9px] font-medium uppercase tracking-[0.4em] text-txt-muted">
                  <span className="text-brand-primary">{post.category}</span>
                  <span className="text-[7px] font-medium">{post.date}</span>
                </div>

                <h4 className="text-md font-medium tracking-tighter uppercase text-txt-main group-hover:text-brand-primary transition-colors leading-tight line-clamp-2">
                  {post.title}
                </h4>

                {/* Author Signature */}
                {/* <div className="flex items-center gap-3 pt-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-border-soft bg-main shrink-0">
                    {post.author.avatar ? (
                      <img
                        src={post.author.avatar}
                        className="w-full h-full object-cover grayscale"
                        alt={post.author.name}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-txt-muted">
                        <User size={10} />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-txt-muted opacity-80">
                    {post.author.name}
                  </span>
                </div> */}
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .related-swiper .swiper-pagination-bullet {
          background: var(--color-border-soft);
          opacity: 1;
          width: 6px;
          height: 6px;
          transition: all 0.3s ease;
        }
        .related-swiper .swiper-pagination-bullet-active {
          background: var(--color-brand-primary);
          width: 24px;
          border-radius: 10px;
        }
      `,
        }}
      />
    </section>
  );
};

export default RelatedEntities;
