"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════
   GLOBAL REACH — Interactive Map with 3D Beacons
   Trade routes from Bangladesh hub to 7 destinations
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Bangladesh origin hub */
const HUB = { x: 71.5, y: 44.5 };

const LOCATIONS = [
  { id: "canada", name: "Canada", x: 20, y: 25, cx: 45, cy: -10 },
  { id: "usa", name: "USA", x: 22, y: 36, cx: 45, cy: 0 },
  { id: "europe", name: "Europe", x: 50, y: 28, cx: 60, cy: 15 },
  { id: "india", name: "India", x: 68, y: 45, cx: 69, cy: 44 },
  { id: "japan", name: "Japan", x: 86, y: 35, cx: 78, cy: 30 },
  { id: "south-africa", name: "South Africa", x: 55, y: 74, cx: 65, cy: 60 },
  { id: "australia", name: "Australia", x: 85, y: 78, cx: 78, cy: 60 },
];

/* ── 3D Holographic Pin ── */
const HoloPin = ({
  loc,
  isActive,
  onEnter,
  onLeave,
  isHub,
}: {
  loc: { id: string; name: string; x: number; y: number };
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  isHub?: boolean;
}) => (
  <div
    className="absolute z-20 flex -translate-x-1/2 -translate-y-full flex-col items-center justify-end"
    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
  >
    {/* Invisible hover target */}
    <div
      className="absolute -top-1 z-30 h-12 w-12 -translate-y-1/2 cursor-crosshair"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    />

    {/* Top diamond */}
    <div
      className={`z-10 h-2 w-2 rotate-45 transition-all duration-300 ${
        isHub
          ? "h-3 w-3 bg-[#FDD017] shadow-[0_0_15px_#FDD017,0_0_30px_#FDD017]"
          : "bg-[#FDD017] shadow-[0_0_10px_#FDD017] group-hover:scale-150"
      } ${isActive ? "scale-150 shadow-[0_0_20px_#FDD017]" : ""}`}
    />

    {/* Laser stem */}
    <div
      className={`bg-gradient-to-t from-transparent via-[#FDD017]/80 to-[#FDD017] ${
        isHub ? "h-10 w-[2px] md:h-14" : "h-6 w-[1px] md:h-10"
      }`}
    />

    {/* Isometric sonar base */}
    <motion.div
      className="absolute bottom-0 h-6 w-6 origin-center rounded-full border border-[#FDD017]"
      style={{ transform: "rotateX(75deg) translateY(50%)" }}
      animate={{ scale: [0.5, 2.5], opacity: [0.8, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
    />

    {/* Second sonar ring — staggered */}
    <motion.div
      className="absolute bottom-0 h-6 w-6 origin-center rounded-full border border-[#FDD017]/60"
      style={{ transform: "rotateX(75deg) translateY(50%)" }}
      animate={{ scale: [0.5, 2.5], opacity: [0.5, 0] }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "easeOut",
        delay: 0.6,
      }}
    />

    {/* Region label */}
    <span
      className={`absolute left-full ml-3 top-0 whitespace-nowrap font-sans text-[10px] uppercase tracking-widest ${
        isHub ? "text-[#FDD017]/80" : "text-[#F5F5EB]/40"
      } ${isActive ? "text-[#FDD017]" : ""}`}
    >
      {isHub ? "Bangladesh (HQ)" : loc.name}
    </span>

    {/* ── Hover Tooltip ── */}
    <AnimatePresence>
      {isActive && !isHub && (
        <motion.div
          className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-6 w-64 origin-bottom -translate-x-1/2 rounded-2xl border border-[#F5F5EB]/20 bg-[#F5F5EB]/10 p-5 text-left shadow-2xl backdrop-blur-xl"
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <p className="mb-4 border-b border-[#F5F5EB]/20 pb-2 font-playfair text-2xl text-[#FDD017]">
            {loc.name}
          </p>
          {/* Placeholder buyer logo grid — replace with actual logos */}
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

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */

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

      {/* ── Map Container — matches SVG native aspect ratio ── */}
      <motion.div
        className="relative z-10 mx-auto mt-12 aspect-[2754/1398] w-[95%] max-w-6xl md:mt-24"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
      >
        {/* ── World map SVG background ── */}
        <Image
          src="/images/world-map.svg"
          fill
          alt="World Map"
          className="pointer-events-none invert sepia hue-rotate-[70deg] saturate-200 opacity-[0.25]"
          aria-hidden="true"
        />

        {/* ── Animated Trade Routes (SVG overlay) ── */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        >
          {LOCATIONS.map((loc) => {
            const d = `M ${HUB.x} ${HUB.y} Q ${loc.cx} ${loc.cy} ${loc.x} ${loc.y}`;
            return (
              <g key={loc.id}>
                {/* Background track */}
                <path
                  d={d}
                  fill="none"
                  stroke="#F5F5EB"
                  strokeWidth="0.1"
                  strokeOpacity="0.3"
                />
                {/* Animated shipment light */}
                <motion.path
                  d={d}
                  fill="none"
                  stroke="#FDD017"
                  strokeWidth="0.3"
                  strokeDasharray="1 4"
                  initial={{ strokeDashoffset: 10 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{
                    duration: 3,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* ── Bangladesh Hub Pin ── */}
        <HoloPin
          loc={{ id: "hub", name: "Bangladesh", x: HUB.x, y: HUB.y }}
          isActive={false}
          onEnter={() => {}}
          onLeave={() => {}}
          isHub
        />

        {/* ── Destination Pins ── */}
        {LOCATIONS.map((loc) => (
          <HoloPin
            key={loc.id}
            loc={loc}
            isActive={activeRegion === loc.id}
            onEnter={() => setActiveRegion(loc.id)}
            onLeave={() => setActiveRegion(null)}
          />
        ))}
      </motion.div>
    </section>
  );
};
