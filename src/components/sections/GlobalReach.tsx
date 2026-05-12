"use client";

import React, { useState, useEffect } from "react";
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

const BUYERS = [
  "HONEYS",
  "MUJI",
  "UNY",
  "BONMAX",
  "LINDEX",
  "CELIO",
  "NEW YORKER",
  "NEXT",
  "SUZY",
  "GREG NORMAN",
  "WALMART",
  "TARGET",
  "TJX",
  "GUESS",
];

/* ── 3D Holographic Pin ── */
const HoloPin = ({
  loc,
  isActive,
  onEnter,
  onLeave,
  onTap,
  isHub,
}: {
  loc: { id: string; name: string; x: number; y: number };
  isActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onTap: () => void;
  isHub?: boolean;
}) => {
  const isLeft = loc.x < 50;

  return (
    <div
      className="absolute z-20 flex -translate-x-1/2 -translate-y-full flex-col items-center justify-end"
      style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
    >
      {/* Invisible hover + tap target */}
      <div
        className="absolute -top-1 z-30 h-12 w-12 -translate-y-1/2 cursor-crosshair"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onTap}
      />

      {/* Top diamond */}
      <div
        className={`z-10 rotate-45 transition-all duration-300 ${
          isHub
            ? "h-4 w-4 bg-[#FDD017] shadow-[0_0_20px_#FDD017,0_0_40px_rgba(253,208,23,0.4)]"
            : "h-2 w-2 bg-[#FDD017] shadow-[0_0_10px_#FDD017]"
        } ${isActive ? "scale-150 shadow-[0_0_20px_#FDD017]" : ""}`}
      />

      {/* Laser stem */}
      <div
        className={`bg-gradient-to-t from-transparent via-[#FDD017]/80 to-[#FDD017] ${
          isHub ? "h-10 w-[2px] md:h-14" : "h-6 w-[1px] md:h-10"
        }`}
      />

      {/* Isometric sonar base — smooth continuous ripple (no visible reset) */}
      <motion.div
        className={`absolute bottom-0 origin-center rounded-full border ${
          isHub ? "h-8 w-8 border-[#FDD017]" : "h-6 w-6 border-[#FDD017]"
        }`}
        style={{ transform: "rotateX(75deg) translateY(50%)" }}
        animate={{ scale: [0.4, 2.8], opacity: [0.6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      />
      <motion.div
        className={`absolute bottom-0 origin-center rounded-full border ${
          isHub ? "h-8 w-8 border-[#FDD017]/50" : "h-6 w-6 border-[#FDD017]/50"
        }`}
        style={{ transform: "rotateX(75deg) translateY(50%)" }}
        animate={{ scale: [0.4, 2.8], opacity: [0.4, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "linear",
          delay: 2,
        }}
      />

      {/* Region label — hidden on mobile to prevent overlap */}
      <span
        className={`absolute top-0 hidden whitespace-nowrap font-sans text-[10px] uppercase tracking-widest md:inline ${
          loc.x > 65 ? "right-full mr-3" : "left-full ml-3"
        } ${isHub ? "text-[#FDD017]/80" : "text-[#F5F5EB]/40"} ${isActive ? "text-[#FDD017]" : ""}`}
      >
        {isHub ? "Bangladesh (HQ)" : loc.name}
      </span>

      {/* ── Smart Tooltip — opens to the side based on position ── */}
      <AnimatePresence>
        {isActive && !isHub && (
          <motion.div
            className={`pointer-events-none absolute z-50 w-48 rounded-2xl border border-[#F5F5EB]/20 bg-[#F5F5EB]/10 p-4 text-left shadow-2xl backdrop-blur-xl md:w-64 md:p-5 ${
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
              Active export partnerships with leading retailers and fashion brands in the {loc.name}{" "}
              market.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Animated Flight Path ── */
const FlightPath = ({
  loc,
  hasLaunched,
  isHovered,
  delay,
}: {
  loc: (typeof LOCATIONS)[number];
  hasLaunched: boolean;
  isHovered: boolean;
  delay: number;
}) => {
  const d = `M ${HUB.x} ${HUB.y} Q ${loc.cx} ${loc.cy} ${loc.x} ${loc.y}`;

  // Phase 1: Initial draw-in (before launch completes) — full golden path
  // Phase 2: After launch — paths vanish completely
  // Phase 3: On hover — that specific path redraws with animation
  const isDrawing = !hasLaunched;
  const showPath = isDrawing || isHovered;
  const pathOpacity = showPath ? 1 : 0;
  const glowOpacity = isDrawing ? 0.3 : isHovered ? 0.3 : 0;

  return (
    <g>
      {/* Static ghost path — always visible at low opacity for map structure */}
      <path d={d} fill="none" stroke="#F5F5EB" strokeWidth="0.08" strokeOpacity="0.15" />

      {/* Animated golden path — vanishes after launch, redraws on hover */}
      <motion.path
        d={d}
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="0.25"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: showPath ? 1 : 0,
          opacity: pathOpacity,
        }}
        transition={{
          pathLength: {
            duration: isHovered ? 0.8 : hasLaunched ? 0.6 : 1.8,
            delay: isDrawing ? delay : 0,
            ease: [0.22, 1, 0.36, 1],
          },
          opacity: {
            duration: hasLaunched && !isHovered ? 0.6 : 0.3,
            delay: isDrawing ? delay : 0,
          },
        }}
      />

      {/* Glow trail — follows the path with broader stroke */}
      <motion.path
        d={d}
        fill="none"
        stroke="#FDD017"
        strokeWidth="0.6"
        strokeLinecap="round"
        style={{ filter: "blur(1px)" }}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: showPath ? 1 : 0,
          opacity: glowOpacity,
        }}
        transition={{
          pathLength: {
            duration: isHovered ? 0.8 : hasLaunched ? 0.6 : 1.8,
            delay: isDrawing ? delay : 0,
            ease: [0.22, 1, 0.36, 1],
          },
          opacity: {
            duration: hasLaunched && !isHovered ? 0.6 : 0.3,
            delay: isDrawing ? delay : 0,
          },
        }}
      />

      {/* Traveling dot particle — only visible on hovered path */}
      {isHovered && (
        <circle r="0.4" fill="#FDD017" opacity={0.9}>
          <animateMotion dur="3s" repeatCount="indefinite" path={d} />
        </circle>
      )}
    </g>
  );
};

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */

export const GlobalReach = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [hasLaunched, setHasLaunched] = useState(false);

  // Phase timer: after initial draw-in completes, mark as launched (2s)
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLaunched(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="global-reach"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#023020] pt-20 lg:h-screen"
    >
      {/* Radial glow behind map — warm ambient center glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_70%_50%_at_center,rgba(253,208,23,0.08)_0%,rgba(245,245,235,0.02)_40%,transparent_65%)]"
      />

      {/* Ambient glow pulse — subtle breathing animation */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_45%,rgba(253,208,23,0.06)_0%,transparent_70%)]"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Edge vignette — darkens edges to frame the map */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_80%_70%_at_50%_45%,transparent_40%,rgba(2,48,32,0.6)_75%,rgba(2,48,32,0.95)_100%)]"
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
          {/* World map — high-visibility treatment */}
          <Image
            src="/images/world-map.svg"
            fill
            alt="World Map"
            className="pointer-events-none opacity-[0.30]"
            aria-hidden="true"
            style={{
              filter: "invert(1) brightness(1.8) contrast(1.3) sepia(0.1) hue-rotate(60deg)",
            }}
          />

          {/* Dot-grid overlay — geographic depth and texture */}
          <svg
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-[0.12]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="dot-grid"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="0.5" fill="#F5F5EB" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid)" />
          </svg>

          {/* ── Animated Trade Routes ── */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
          >
            {/* Gradient definition for golden paths */}
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDD017" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#D4AF37" stopOpacity="1" />
                <stop offset="100%" stopColor="#FDD017" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {LOCATIONS.map((loc, i) => (
              <FlightPath
                key={loc.id}
                loc={loc}
                hasLaunched={hasLaunched}
                isHovered={hasLaunched && activeRegion === loc.id}
                delay={i * 0.15}
              />
            ))}
          </svg>

          {/* Hub pin */}
          <HoloPin
            loc={{ id: "hub", name: "Bangladesh", x: HUB.x, y: HUB.y }}
            isActive={false}
            onEnter={() => {}}
            onLeave={() => {}}
            onTap={() => {}}
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
              onTap={() => setActiveRegion(activeRegion === loc.id ? null : loc.id)}
            />
          ))}
        </motion.div>
      </div>

      {/* ── Bottom — Infinite Buyer Marquee ── */}
      <div
        className="relative z-40 flex h-16 w-full shrink-0 items-center overflow-hidden border-t border-[#F5F5EB]/10 bg-[#F5F5EB]/5 backdrop-blur-md md:h-20"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <motion.div
          className="flex w-max items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          {[...BUYERS, ...BUYERS].map((buyer, i) => (
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
