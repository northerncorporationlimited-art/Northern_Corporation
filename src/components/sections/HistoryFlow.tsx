"use client";

import React from "react";
import { motion } from "framer-motion";

const milestones = [
  {
    year: "1987",
    title: "Founded in Dhaka",
    desc: "Northern Corporation Ltd. was established with a modest workshop in Dhaka, Bangladesh, with a vision to make quality knitwear for global markets.",
  },
  {
    year: "1995",
    title: "First Export Partnership",
    desc: "Secured our first major international export contract, supplying premium knitwear to European fashion brands.",
  },
  {
    year: "2003",
    title: "Factory Expansion",
    desc: "Expanded production capacity to 500+ machines, bringing on 1,000+ employees and doubling annual output.",
  },
  {
    year: "2010",
    title: "Sustainability Commitment",
    desc: "Achieved GOTS and OEKO-TEX® certifications, formalising our dedication to ethical and sustainable manufacturing.",
  },
  {
    year: "2015",
    title: "LEED Gold Certification",
    desc: "Our primary facility achieved LEED Gold status, recognising world-class environmental design and energy efficiency.",
  },
  {
    year: "2024",
    title: "1,300 Machines & 30M+ Pieces/Year",
    desc: "Today, Northern Corporation operates at full industrial scale — 1,300+ machines, 3,000+ employees, and trusted by the world's leading fashion brands.",
  },
];

export const HistoryFlow = () => {
  return (
    <section className="w-full bg-brand-green py-32 px-8 md:px-20 overflow-hidden">
      {/* Header */}
      <motion.div
        className="text-center mb-24"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-block mb-4 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-gold">
          Our Story
        </span>
        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-brand-cream mt-4">
          Since 1987
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-brand-cream/60 text-lg leading-relaxed">
          Established in 1987, Northern Corporation Ltd. has spent nearly four decades mastering the art
          of garment manufacturing — from a modest beginning to a globally trusted partner.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-brand-cream/10 -translate-x-1/2" />

        <div className="flex flex-col gap-16">
          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={m.year}
                className={`relative flex items-start gap-8 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Content */}
                <div className={`pl-10 md:pl-0 md:w-1/2 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                  <span className="text-brand-gold font-mono text-sm tracking-widest">{m.year}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-cream mt-1 mb-3">{m.title}</h3>
                  <p className="text-brand-cream/60 text-base leading-relaxed">{m.desc}</p>
                </div>

                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-gold border-2 border-brand-green ring-4 ring-brand-gold/20 mt-1.5" />

                {/* Empty half for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
