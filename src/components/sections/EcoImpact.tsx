"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */

const INITIATIVES = [
  "Sustainable Raw Material",
  "Salt-Free Waterless Dyeing",
  "Rain Water Harvesting",
  "Chemical & Biological ETP",
  "Bluesign® & GOTS Approved",
];

// Values are plain numbers — "%" is rendered separately
const STATS: { value: number; label: string }[] = [
  { value: 50, label: "Water consumption reduction" },
  { value: 27, label: "Carbon emission reduction" },
  { value: 20, label: "Waste reduction" },
  { value: 5, label: "Use renewable energy" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   Animated Counter (inline component)
───────────────────────────────────────────── */

interface AnimatedCounterProps {
  from: number;
  to: number;
}

const AnimatedCounter = ({ from, to }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(from);
  // Round to nearest integer for display
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, to, {
      duration: 2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [isInView, motionValue, to]);

  // Subscribe to rounded and write directly to DOM for performance
  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = String(v);
    });
  }, [rounded]);

  return <span ref={ref}>{from}</span>;
};

/* ─────────────────────────────────────────────
   Framer Motion Variants
───────────────────────────────────────────── */

const rightGridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */

export const EcoImpact = () => {
  return (
    <section
      id="eco-impact"
      className="flex min-h-screen w-full items-center bg-[#023020] py-24 text-[#F5F5EB] md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">

          {/* ── Left column — fades in first ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="mb-6 font-sans text-sm uppercase tracking-widest text-[#FDD017]">
              Economic &amp; Environmental
            </p>

            <h2 className="mb-12 font-playfair text-5xl leading-tight md:text-6xl lg:text-7xl">
              Environmental Sustainability
            </h2>

            {/* Interactive numbered initiative list */}
            <ul className="flex flex-col">
              {INITIATIVES.map((item, i) => (
                <li
                  key={item}
                  className={`group flex cursor-pointer items-center border-b border-[#F5F5EB]/20 py-5 ${
                    i === 0 ? "border-t" : ""
                  }`}
                >
                  {/* Ordinal number */}
                  <span className="mr-6 shrink-0 font-mono text-xs text-[#FDD017]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Label — slides right and brightens on hover */}
                  <span className="font-sans text-lg text-[#F5F5EB]/80 transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#F5F5EB] md:text-xl">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Right column — architectural bordered grid, staggered ── */}
          <motion.div
            variants={rightGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 border-l border-t border-[#F5F5EB]/10"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={statItemVariants}
                className="border-b border-r border-[#F5F5EB]/10 p-8 transition-colors duration-500 hover:bg-[#F5F5EB]/5 md:p-12 lg:p-16"
              >
                <p className="mb-4 font-playfair text-6xl leading-none text-[#FDD017] md:text-7xl lg:text-8xl">
                  <AnimatedCounter from={0} to={stat.value} />
                  <span>%</span>
                </p>
                <p className="max-w-[200px] font-sans text-sm uppercase leading-relaxed tracking-wide text-[#F5F5EB]/80 md:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
