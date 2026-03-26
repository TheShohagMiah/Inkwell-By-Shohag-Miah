import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Cpu,
  Layers,
  Terminal,
  ShieldCheck,
  ArrowUpRight,
  Activity,
  History,
} from "lucide-react";

const About = () => {
  const stack = [
    "React 19",
    "Tailwind 4.0",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
  ];

  const timeline = [
    {
      year: "2021",
      event: "Initial Protocol Deployment",
      detail: "First iteration of the minimalist CMS architecture.",
    },
    {
      year: "2023",
      event: "Kernel Migration",
      detail:
        "Transitioned to headless architecture for high-concurrency data.",
    },
    {
      year: "2026",
      event: "INKWELL V3",
      detail: "Current stable release focusing on interface psychology.",
    },
  ];

  return (
    <div className="min-h-screen bg-main transition-colors duration-500">
      <Helmet>
        <title>Identity | System Protocol</title>
      </Helmet>

      <main className="max-w-[1100px] mx-auto px-8 py-20">
        {/* --- HEADER: ARCHITECT PROFILE --- */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-center">
          <div className="lg:col-span-4">
            <div className="relative group">
              <div className="aspect-square rounded-[3rem] overflow-hidden border border-border-soft bg-soft/30 p-2 shadow-2xl shadow-brand-primary/5">
                <img
                  src="/api/placeholder/400/400"
                  alt="Lead Architect"
                  className="w-full h-full object-cover rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-card border border-border-soft p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-1000">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-txt-main">
                  Status: Online
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-brand-primary">
                The Architect
              </span>
              <h1 className="text-4xl font-medium text-txt-main tracking-tight leading-tight">
                Engineering interfaces that <br />
                <span className="text-txt-muted italic">speak in silence.</span>
              </h1>
            </div>

            <p className="text-lg text-txt-main/80 leading-relaxed font-normal">
              My name is Alex, a systems-focused designer and full-stack
              engineer. I specialize in building high-fidelity web experiences
              where the underlying code is as elegant as the visual output.
            </p>

            <div className="flex flex-wrap gap-3">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1.5 bg-soft/20 border border-border-soft rounded-full text-[10px] font-medium text-txt-muted uppercase tracking-widest"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* --- GRID: MISSION & CORE VALUES --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="bg-card border border-border-soft p-12 rounded-[3rem] space-y-6 shadow-sm">
            <div className="w-12 h-12 bg-brand-primary/5 rounded-2xl flex items-center justify-center text-brand-primary border border-brand-primary/10">
              <Cpu size={20} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-medium text-txt-main tracking-tight">
              The Mission
            </h2>
            <p className="text-sm text-txt-muted leading-relaxed">
              INKWELL was conceived as a response to the "over-designed" web.
              The goal is to provide a content management framework that
              respects user cognitive load through balanced typography and
              strict utility.
            </p>
          </div>

          <div className="bg-card border border-border-soft p-12 rounded-[3rem] space-y-6 shadow-sm">
            <div className="w-12 h-12 bg-success/5 rounded-2xl flex items-center justify-center text-success border border-success/10">
              <ShieldCheck size={20} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-medium text-txt-main tracking-tight">
              Data Ethics
            </h2>
            <p className="text-sm text-txt-muted leading-relaxed">
              Privacy is not a feature; it is the foundation. Every line of code
              written under the INKWELL protocol is audited for data integrity,
              zero-tracking, and lightning-fast server-side delivery.
            </p>
          </div>
        </section>

        {/* --- TIMELINE: SYSTEM LOGS --- */}
        <section className="space-y-12">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-soft rounded-lg text-txt-muted">
              <History size={18} />
            </div>
            <h3 className="text-xs font-medium uppercase tracking-[0.4em] text-txt-muted">
              System Evolution Logs
            </h3>
          </div>

          <div className="space-y-0 border-l border-border-soft ml-4">
            {timeline.map((item, index) => (
              <div key={index} className="relative pl-12 pb-16 last:pb-0">
                {/* Timeline Dot */}
                <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-border-soft border-4 border-main group-hover:bg-brand-primary transition-colors" />

                <div className="space-y-2">
                  <span className="text-[10px] font-medium text-brand-primary tracking-widest uppercase">
                    Launch Year: {item.year}
                  </span>
                  <h4 className="text-base font-medium text-txt-main tracking-tight">
                    {item.event}
                  </h4>
                  <p className="text-sm text-txt-muted max-w-xl leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- FOOTER CTA: CONNECT --- */}
        <section className="mt-32 pt-20 border-t border-border-soft text-center space-y-8">
          <h3 className="text-xl font-medium text-txt-main tracking-tight">
            Ready to initiate a collaboration?
          </h3>
          <div className="flex items-center justify-center gap-8">
            <a
              href="mailto:hello@inkwell.system"
              className="group flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-brand-primary"
            >
              Email Endpoint
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#"
              className="group flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-txt-muted hover:text-txt-main transition-colors"
            >
              GitHub Node
              <Terminal size={14} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
