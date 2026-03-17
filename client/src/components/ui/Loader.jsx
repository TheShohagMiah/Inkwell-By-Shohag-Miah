import React from "react";

const Loader = ({
  color = "bg-pink-500",
  size = "md",
  label = "Loading...",
  showLabel = true,
}) => {
  const sizes = {
    sm: { bar: "w-1 h-5", gap: "gap-1", text: "text-xs" },
    md: { bar: "w-1.5 h-8", gap: "gap-1.5", text: "text-sm" },
    lg: { bar: "w-2 h-12", gap: "gap-2", text: "text-base" },
  };

  const { bar, gap, text } = sizes[size];

  const delays = ["[0ms]", "[150ms]", "[300ms]", "[450ms]", "[600ms]"];

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`flex items-center ${gap}`}>
        {delays.map((delay, i) => (
          <div
            key={i}
            className={`
              ${bar} ${color}
              rounded-full
              animate-wave
              delay-${delay}
            `}
          />
        ))}
      </div>
      {showLabel && (
        <p className={`${text} text-slate-400 font-medium tracking-wide`}>
          {label}
        </p>
      )}
    </div>
  );
};

export default Loader;
