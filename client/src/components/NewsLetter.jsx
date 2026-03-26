import React, { useState } from "react";
import {
  Send,
  Mail,
  CheckCircle2,
  ArrowRight,
  Globe,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | syncing | success

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("syncing");
    // Simulate system transmission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-main flex items-center justify-center p-6 transition-colors">
      <Helmet>
        <title>Dispatch | System Subscription</title>
      </Helmet>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-card border border-border-soft rounded-[3rem] overflow-hidden shadow-sm">
        {/* --- LEFT: INFORMATION ARCHITECTURE --- */}
        <div className="p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-border-soft bg-soft/5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/5 border border-brand-primary/10 mb-8">
            <Zap size={14} className="text-brand-primary" />
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-primary">
              System Dispatch
            </span>
          </div>

          <h1 className="text-3xl font-medium text-txt-main tracking-tight leading-tight mb-6">
            Technical insights for the <br />
            <span className="text-txt-muted">modern architect.</span>
          </h1>

          <p className="text-sm text-txt-muted leading-relaxed mb-10 font-normal">
            Join 12,000+ developers receiving weekly deep-dives into React
            performance, distributed systems, and interface psychology.
          </p>

          <ul className="space-y-5">
            {[
              { icon: <Globe size={16} />, text: "Global Industry Standards" },
              {
                icon: <ShieldCheck size={16} />,
                text: "Zero Tracking & Privacy First",
              },
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-txt-main/70">
                <div className="text-brand-primary opacity-60">{item.icon}</div>
                <span className="text-[11px] font-medium uppercase tracking-widest">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* --- RIGHT: INTERACTION LAYER --- */}
        <div className="p-12 lg:p-16 flex flex-col justify-center">
          {status === "success" ? (
            <div className="text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-success/5 border border-success/10 text-success rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} strokeWidth={1.2} />
              </div>
              <h2 className="text-xl font-medium text-txt-main mb-2">
                Registration Confirmed
              </h2>
              <p className="text-sm text-txt-muted tracking-wide">
                Verification handshake sent to your inbox.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 text-[10px] font-medium uppercase tracking-[0.3em] text-brand-primary hover:underline"
              >
                Return to Buffer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-medium text-txt-muted uppercase tracking-[0.2em] ml-1">
                  Communication Endpoint
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-txt-muted/30 group-focus-within:text-brand-primary transition-colors"
                    size={18}
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usr@domain.com"
                    className="w-full bg-soft/20 border border-border-soft rounded-2xl pl-12 pr-4 py-4 text-sm font-medium outline-none focus:border-brand-primary/40 focus:ring-4 focus:ring-brand-primary/5 transition-all text-txt-main placeholder:text-txt-muted/20"
                  />
                </div>
              </div>

              <button
                disabled={status === "syncing"}
                className="w-full bg-brand-primary text-white py-4 rounded-2xl font-medium text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 disabled:opacity-50 transition-all shadow-xl shadow-brand-primary/20"
              >
                {status === "syncing"
                  ? "Transmitting..."
                  : "Initialize Subscription"}
                <ArrowRight
                  size={14}
                  className={status === "syncing" ? "animate-pulse" : ""}
                />
              </button>

              <p className="text-[9px] text-txt-muted/50 text-center leading-loose uppercase tracking-tighter">
                By subscribing, you agree to our{" "}
                <span className="text-txt-muted underline cursor-pointer">
                  Protocol Terms
                </span>{" "}
                and <br />
                <span className="text-txt-muted underline cursor-pointer">
                  Data Handling Manifesto
                </span>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
