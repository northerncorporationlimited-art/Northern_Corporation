"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

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

const STATS: { value: number; label: string }[] = [
  { value: 50, label: "Water consumption reduction" },
  { value: 27, label: "Carbon emission reduction" },
  { value: 20, label: "Waste reduction" },
  { value: 5, label: "Use renewable energy" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────
   Animated Counter
───────────────────────────────────────────── */

interface AnimatedCounterProps {
  from: number;
  to: number;
}

const AnimatedCounter = ({ from, to }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(from);
  const rounded = useTransform(motionValue, (v) => Math.round(v));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, to, {
      duration: 2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [isInView, motionValue, to]);

  useEffect(() => {
    return rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = String(v);
    });
  }, [rounded]);

  return <span ref={ref}>{from}</span>;
};

/* ─────────────────────────────────────────────
   Component — h-screen with photographic depth
───────────────────────────────────────────── */

export const EcoImpact = () => {
  return (
    <section
      id="eco-impact"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#023020] py-20 text-[#F5F5EB] lg:h-screen lg:py-0"
    >
      {/* ── Photographic texture background ── */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[#023020]/90 backdrop-blur-md"
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="mb-4 font-sans text-sm uppercase tracking-widest text-[#FDD017]">
              Economic &amp; Environmental
            </p>

            <h2 className="mb-8 font-playfair text-4xl leading-tight md:text-5xl lg:text-6xl">
              Environmental Sustainability
            </h2>

            {/* Interactive numbered initiative list */}
            <ul className="flex flex-col">
              {INITIATIVES.map((item, i) => (
                <li
                  key={item}
                  className={`group flex cursor-pointer items-center border-b border-[#F5F5EB]/15 py-4 ${
                    i === 0 ? "border-t" : ""
                  }`}
                >
                  <span className="mr-5 shrink-0 font-mono text-xs text-[#FDD017]/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans text-base text-[#F5F5EB]/70 transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#F5F5EB] md:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Right column — 2x2 frosted stat cards ── */}
          <motion.div
            className="grid grid-cols-2 gap-4 md:gap-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col justify-center rounded-2xl border border-[#F5F5EB]/10 bg-[#F5F5EB]/5 p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-[#F5F5EB]/10 md:p-8"
              >
                <p className="mb-3 font-playfair text-5xl leading-none text-[#FDD017] md:text-6xl lg:text-7xl">
                  <AnimatedCounter from={0} to={stat.value} />
                  <span>%</span>
                </p>
                <p className="font-sans text-xs uppercase leading-relaxed tracking-wide text-[#F5F5EB]/70 md:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
