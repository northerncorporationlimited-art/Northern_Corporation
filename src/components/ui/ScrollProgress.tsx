"use client";

import React from "react";

export const ScrollProgress = ({ progress }: { progress: number }) => {
  const total = 4;
  const current = Math.min(Math.max(1, Math.ceil(progress * total)), total);

  // Hide after the DualScroll section completes (progress >= 1)
  const isVisible = progress > 0 && progress < 1;

  return (
    <div
      className="fixed right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 mix-blend-difference pointer-events-none text-white transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <span className="text-xs font-mono tracking-widest">{current.toString().padStart(2, "0")}</span>
      <div className="w-[2px] h-24 bg-white/20 relative overflow-hidden rounded-full">
        <div
          className="absolute top-0 left-0 w-full bg-white transition-transform duration-100 ease-linear origin-top rounded-full"
          style={{ height: "100%", transform: `scaleY(${progress || 0.01})` }}
        />
      </div>
      <span className="text-xs font-mono tracking-widest">{total.toString().padStart(2, "0")}</span>
    </div>
  );
};
