"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════
   GLOBAL REACH — Interactive Map & Buyer Nodes
   h-screen with radar-pulse dots and hover tooltips
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const REGIONS = [
  { name: "Canada", top: 25, left: 20 },
  { name: "USA", top: 38, left: 22 },
  { name: "Europe", top: 30, left: 50 },
  { name: "India", top: 48, left: 68 },
  { name: "Japan", top: 35, left: 85 },
  { name: "South Africa", top: 75, left: 53 },
  { name: "Australia", top: 80, left: 85 },
];

export const GlobalReach = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <section
      id="global-reach"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#023020]"
    >
      {/* ── Header — absolute top-left ── */}
      <motion.div
        className="absolute left-6 top-12 z-20 md:left-12 lg:left-24 lg:top-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p className="mb-4 font-sans text-sm uppercase tracking-[0.3em] text-[#FDD017]">
          Global Footprint
        </p>
        <h2 className="font-playfair text-5xl text-[#F5F5EB] md:text-6xl">
          Exporting Excellence
        </h2>
      </motion.div>

      {/* ── Map Container ── */}
      <motion.div
        className="relative z-10 mt-16 aspect-[2/1] w-[95%] max-w-6xl md:aspect-[21/9]"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
      >
        {/* Tech-radar grid background — will be replaced with final map asset */}
        <div
          className="relative h-full w-full overflow-hidden rounded-3xl border border-[#F5F5EB]/10 backdrop-blur-sm"
          style={{
            backgroundImage:
              "linear-gradient(rgba(245,245,235,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,235,0.03) 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
          }}
        >
          {/* Watermark */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-playfair text-[12vw] text-[#F5F5EB] opacity-[0.03]"
          >
            GLOBAL
          </div>

          {/* ── Interactive Nodes ── */}
          {REGIONS.map((region, i) => {
            const isActive = activeRegion === region.name;

            return (
              <div
                key={region.name}
                className="absolute"
                style={{ top: `${region.top}%`, left: `${region.left}%` }}
              >
                {/* Invisible hover area */}
                <div
                  className="absolute z-30 h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onMouseEnter={() => setActiveRegion(region.name)}
                  onMouseLeave={() => setActiveRegion(null)}
                />

                {/* Radar pulse */}
                <motion.div
                  className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FDD017]"
                  animate={{
                    scale: [0.5, 2.5],
                    opacity: [0.4, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />

                {/* Gold dot */}
                <div className="absolute z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FDD017]" />

                {/* Region label (always visible) */}
                <span className="absolute left-3 top-3 z-20 whitespace-nowrap font-sans text-[10px] uppercase tracking-widest text-[#F5F5EB]/40">
                  {region.name}
                </span>

                {/* ── Hover Tooltip — Frosted Glass Card ── */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-4 w-64 origin-bottom -translate-x-1/2 rounded-2xl border border-[#F5F5EB]/20 bg-[#F5F5EB]/10 p-5 text-left shadow-2xl backdrop-blur-xl"
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <p className="mb-4 border-b border-[#F5F5EB]/20 pb-2 font-playfair text-2xl text-[#FDD017]">
                        {region.name}
                      </p>

                      {/* Placeholder logo grid — replace with actual buyer logos */}
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map((n) => (
                          <div
                            key={n}
                            className="flex h-12 items-center justify-center rounded border border-[#F5F5EB]/5 bg-[#F5F5EB]/10 text-[10px] uppercase tracking-wider text-[#F5F5EB]/50"
                          >
                            Logo
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
