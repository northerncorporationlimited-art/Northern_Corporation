"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════
   GLOBAL REACH — Polished Map + Buyer Marquee
   Flex-column layout: Header → Map → Carousel
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

const PLACEHOLDER_BUYERS = [
  "ZARA",
  "H&M",
  "UNIQLO",
  "LEVI'S",
  "CALVIN KLEIN",
  "TOMMY HILFIGER",
  "PUMA",
  "MARKS & SPENCER",
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
}) => {
  const isLeft = loc.x < 50;

  return (
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
        className={`z-10 rotate-45 transition-all duration-300 ${
          isHub
            ? "h-3 w-3 bg-[#FDD017] shadow-[0_0_15px_#FDD017,0_0_30px_#FDD017]"
            : "h-2 w-2 bg-[#FDD017] shadow-[0_0_10px_#FDD017]"
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
        className={`absolute top-0 whitespace-nowrap font-sans text-[10px] uppercase tracking-widest ${
          loc.x > 65 ? "right-full mr-3" : "left-full ml-3"
        } ${
          isHub ? "text-[#FDD017]/80" : "text-[#F5F5EB]/40"
        } ${isActive ? "text-[#FDD017]" : ""}`}
      >
        {isHub ? "Bangladesh (HQ)" : loc.name}
      </span>

      {/* ── Smart Tooltip — opens to the side based on position ── */}
      <AnimatePresence>
        {isActive && !isHub && (
          <motion.div
            className={`pointer-events-none absolute z-50 w-64 rounded-2xl border border-[#F5F5EB]/20 bg-[#F5F5EB]/10 p-5 text-left shadow-2xl backdrop-blur-xl ${
              isLeft
                ? "left-full top-1/2 ml-4 origin-left md:ml-6"
                : "right-full top-1/2 mr-4 origin-right md:mr-6"
            }`}
            initial={{
              opacity: 0,
              x: isLeft ? -15 : 15,
              y: "-50%",
              scale: 0.8,
            }}
            animate={{ opacity: 1, x: 0, y: "-50%", scale: 1 }}
            exit={{
              opacity: 0,
              x: isLeft ? -15 : 15,
              y: "-50%",
              scale: 0.8,
            }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <p className="mb-4 border-b border-[#F5F5EB]/20 pb-2 font-playfair text-2xl text-[#FDD017]">
              {loc.name}
            </p>
            <p className="text-xs leading-relaxed text-[#F5F5EB]/60">
              Active export partnerships with leading retailers and fashion brands in the {loc.name} market.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */

export const GlobalReach = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <section
      id="global-reach"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#023020] pt-20 lg:h-screen"
    >
      {/* Radial glow behind map */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(253,208,23,0.06)_0%,transparent_60%)]"
      />

      {/* ── Top Header ── */}
      <motion.div
        className="z-30 mx-auto w-full max-w-7xl shrink-0 px-6 md:px-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <p className="mb-3 font-sans text-sm uppercase tracking-[0.3em] text-[#FDD017]">
          Global Footprint
        </p>
        <h2 className="font-playfair text-4xl text-[#F5F5EB] md:text-5xl lg:text-6xl">
          Exporting Excellence
        </h2>
      </motion.div>

      {/* ── Middle — Map ── */}
      <div className="relative z-20 mb-4 mt-4 flex min-h-0 flex-1 w-full items-center justify-center">
        <motion.div
          className="relative aspect-[2754/1398] w-[95%] max-w-6xl lg:scale-110"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
        >
          {/* World map — clean creamy tint */}
          <Image
            src="/images/world-map.svg"
            fill
            alt="World Map"
            className="pointer-events-none invert opacity-30"
            aria-hidden="true"
          />

          {/* ── Animated Trade Routes ── */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          >
            {LOCATIONS.map((loc) => {
              const d = `M ${HUB.x} ${HUB.y} Q ${loc.cx} ${loc.cy} ${loc.x} ${loc.y}`;
              return (
                <g key={loc.id}>
                  <path
                    d={d}
                    fill="none"
                    stroke="#F5F5EB"
                    strokeWidth="0.1"
                    strokeOpacity="0.3"
                  />
                  <motion.path
                    d={d}
                    fill="none"
                    stroke="#FDD017"
                    strokeWidth="0.3"
                    strokeDasharray="1 4"
                    initial={{ strokeDashoffset: 10 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{
                      duration: 2.5,
                      ease: "easeOut",
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Hub pin */}
          <HoloPin
            loc={{ id: "hub", name: "Bangladesh", x: HUB.x, y: HUB.y }}
            isActive={false}
            onEnter={() => {}}
            onLeave={() => {}}
            isHub
          />

          {/* Destination pins */}
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
      </div>

      {/* ── Bottom — Infinite Buyer Marquee ── */}
      <div
        className="relative z-40 flex h-16 w-full shrink-0 items-center overflow-hidden border-t border-[#F5F5EB]/10 bg-[#F5F5EB]/5 backdrop-blur-md md:h-20"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {[...PLACEHOLDER_BUYERS, ...PLACEHOLDER_BUYERS].map((buyer, i) => (
            <span
              key={`${buyer}-${i}`}
              className="mx-8 font-playfair text-lg uppercase tracking-widest text-[#F5F5EB]/50 md:mx-12 md:text-xl"
            >
              {buyer}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
