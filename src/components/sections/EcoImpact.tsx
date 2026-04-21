"use client";

import React, { useEffect, useRef } from "react";
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

const STATS: { value: number; label: string; detail: string }[] = [
  {
    value: 50,
    label: "Water Reduction",
    detail:
      "Half of all water consumption eliminated through closed-loop recycling and salt-free dyeing processes.",
  },
  {
    value: 27,
    label: "Carbon Reduction",
    detail:
      "Carbon emissions cut through energy-efficient machinery, LED lighting, and on-site solar capacity.",
  },
  {
    value: 20,
    label: "Waste Reduction",
    detail:
      "Manufacturing waste minimised via lean production, fabric optimisation, and zero-landfill initiatives.",
  },
  {
    value: 5,
    label: "Renewable Energy",
    detail:
      "Growing share of total energy sourced from rooftop solar and certified renewable grid supply.",
  },
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
   Framer Motion Variants
───────────────────────────────────────────── */

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

/* ─────────────────────────────────────────────
   Component — Sticky Dashboard Layout
───────────────────────────────────────────── */

export const EcoImpact = () => {
  return (
    <section
      id="eco-impact"
      className="w-full bg-[#023020] text-[#F5F5EB]"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start px-6 lg:flex-row">
        {/* ── Left Column — Sticky ── */}
        <motion.div
          className="w-full py-24 pr-0 lg:sticky lg:top-0 lg:h-screen lg:w-5/12 lg:py-0 lg:pr-8 lg:flex lg:flex-col lg:justify-center"
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
                className={`group flex cursor-pointer items-center border-b border-[#F5F5EB]/15 py-5 ${
                  i === 0 ? "border-t" : ""
                }`}
              >
                <span className="mr-6 shrink-0 font-mono text-xs text-[#FDD017]/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-lg text-[#F5F5EB]/70 transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#F5F5EB] md:text-xl">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ── Right Column — Scrolling Frosted Cards ── */}
        <div className="flex w-full flex-col gap-6 pb-24 pt-0 md:gap-8 lg:w-7/12 lg:py-48">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl border border-[#F5F5EB]/10 bg-[#F5F5EB]/5 p-10 backdrop-blur-md transition-colors duration-500 hover:bg-[#F5F5EB]/10 md:p-14"
            >
              {/* Subtle hover glow — top-right */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[#FDD017]/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />

              <p className="relative mb-4 font-playfair text-7xl leading-none text-[#FDD017] lg:text-8xl">
                <AnimatedCounter from={0} to={stat.value} />
                <span>%</span>
              </p>
              <p className="relative mb-3 font-sans text-lg uppercase tracking-wide text-[#F5F5EB]/80">
                {stat.label}
              </p>
              <p className="relative max-w-md font-sans text-sm leading-relaxed text-[#F5F5EB]/50">
                {stat.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
