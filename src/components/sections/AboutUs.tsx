"use client";

import React from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════
   ABOUT US — Six Decades of Excellence
   h-screen 50/50 grid with history + scale stats
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATS = [
  { value: "1,300+", label: "Machines" },
  { value: "3,000+", label: "Employees" },
  { value: "$30M", label: "Yearly Turnover (USD)" },
];

export const AboutUs = () => {
  return (
    <section
      id="about"
      className="flex h-screen w-full items-center bg-[#F5F5EB] text-[#023020] relative overflow-hidden"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2">
        {/* ── Left Column — History ── */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="mb-6 font-sans text-sm uppercase tracking-widest text-[#023020]/50">
            Our Legacy
          </p>

          <h2 className="mb-8 font-playfair text-5xl leading-tight md:text-6xl lg:text-7xl">
            Six Decades of Excellence
          </h2>

          <p className="mb-6 font-sans text-lg leading-relaxed text-[#023020]/80">
            Founded by Shafiuddin Ahmed, Northern Corporation has grown over six
            decades from a steel re-rolling mill in 1967 into one of
            Bangladesh&apos;s most respected garment manufacturing conglomerates
            since 1987.
          </p>

          <p className="font-sans text-lg leading-relaxed text-[#023020]/80">
            Today, Northern is recognized as a leading textile manufacturer in
            Bangladesh, known for uncompromising quality, innovation, and
            sustainability. The group actively supports the UN Sustainable
            Development Goals (SDGs).
          </p>
        </motion.div>

        {/* ── Right Column — Scale ── */}
        <motion.div
          className="flex flex-col justify-center gap-10 border-l-2 border-[#023020]/10 pl-8 lg:pl-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          <p className="font-playfair text-xl leading-relaxed md:text-2xl">
            Equipped to handle global demand at uncompromising pace and quality.
          </p>

          <div className="flex flex-col gap-10">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.12,
                  ease: EASE,
                }}
              >
                <p className="mb-2 font-playfair text-6xl text-[#023020] lg:text-7xl">
                  {stat.value}
                </p>
                <p className="font-sans text-sm uppercase tracking-widest text-[#023020]/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
