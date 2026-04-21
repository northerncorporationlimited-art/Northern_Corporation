"use client";

import React from "react";
import { motion } from "framer-motion";

const INITIATIVES = [
  "Sustainable Raw Material",
  "Salt-Free Waterless Dyeing",
  "Rain Water Harvesting",
  "Chemical & Biological ETP",
  "Bluesign® & GOTS Approved",
];

const STATS: { value: string; label: string }[] = [
  { value: "50%", label: "Water consumption reduction" },
  { value: "27%", label: "Carbon emission reduction" },
  { value: "20%", label: "Waste reduction" },
  { value: "5%", label: "Use renewable energy" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export const EcoImpact = () => {
  return (
    <section
      id="eco-impact"
      className="flex min-h-screen w-full items-center bg-[#023020] py-24 text-[#F5F5EB] md:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="mb-6 font-sans text-sm uppercase tracking-widest text-[#FDD017]">
              Economic & Environmental
            </p>

            <h2 className="mb-12 font-playfair text-5xl leading-tight md:text-6xl lg:text-7xl">
              Environmental Sustainability
            </h2>

            <ul className="flex flex-col">
              {INITIATIVES.map((item, i) => (
                <li
                  key={item}
                  className={`border-b border-[#F5F5EB]/20 py-5 font-sans text-lg text-[#F5F5EB]/90 md:text-xl ${
                    i === 0 ? "border-t" : ""
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="grid grid-cols-2 gap-10 md:gap-16"
          >
            {STATS.map((stat) => (
              <div key={stat.value}>
                <p className="mb-4 font-playfair text-6xl leading-none text-[#FDD017] md:text-7xl lg:text-8xl">
                  {stat.value}
                </p>
                <p className="max-w-[200px] font-sans text-sm uppercase leading-relaxed tracking-wide text-[#F5F5EB]/80 md:text-base">
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
