import React from "react";
import { motion } from "framer-motion";

const Manifesto = () => (
  <section className="max-w-7xl mx-auto px-6 py-32 border-y border-border-soft/50 my-20">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="flex flex-col md:flex-row gap-12 items-end"
    >
      <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
        Digital <br /> Craft <span className="text-txt-muted/10">_</span>
      </h2>
      <p className="max-w-sm text-[11px] font-bold uppercase tracking-[0.3em] text-txt-muted leading-relaxed pb-2">
        InkWell is a laboratory for digital architecture. We explore the
        intersection of high-performance engineering and brutalist aesthetics.
      </p>
    </motion.div>
  </section>
);

export default Manifesto;
