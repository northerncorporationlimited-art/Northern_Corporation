"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const milestones = [
  {
    year: "1967",
    title: "Northern Steel Re-rolling Mill",
    desc: "Founded by Shafiuddin Ahmed and Tosrifa Khatoon, Northern Steel Re-rolling Mill Limited was established — the seed of what would become the Northern Group of Companies.",
  },
  {
    year: "1987",
    title: "Northern Corporation Limited",
    desc: "NCL was formed, marking the group's strategic entry into the textile and RMG (Ready Made Garments) industry — beginning a journey of industrial excellence.",
  },
  {
    year: "2000",
    title: "Fashion Asia Limited",
    desc: "Fashion Asia Limited (FAL) joined the Northern Group, broadening the company's reach into fashion manufacturing and global export markets.",
  },
  {
    year: "2002",
    title: "Tosrifa Industries Limited",
    desc: "Tosrifa Industries Limited (TIL) was established with a focus on green, sustainable textile production — setting a benchmark for eco-conscious manufacturing in Bangladesh.",
  },
  {
    year: "2005",
    title: "Printers and Printers Limited",
    desc: "Printers and Printers Limited (PPL) was introduced to the group, enhancing in-house production efficiency and delivering integrated packaging and printing capabilities.",
  },
  {
    year: "2011",
    title: "Public Listings & Enviro Pac",
    desc: "TIL and NCL became public limited companies. Enviro Pac Limited was introduced to the group, reinforcing the commitment to sustainable and environmentally responsible operations.",
  },
  {
    year: "2015",
    title: "Stock Exchange Listing",
    desc: "Tosrifa Industries Limited was listed on both the Dhaka Stock Exchange and the Chittagong Stock Exchange, marking a milestone of institutional trust and public accountability.",
  },
  {
    year: "2016",
    title: "LEED Certified & BDT 155 Crore Expansion",
    desc: "Achieved LEED certification, validating world-class environmental design. NCL simultaneously launched a BDT 155 Crore factory expansion project — positioning the group for the next era of scale.",
  },
  {
    year: "2017",
    title: "FAL Expansion Project",
    desc: "Fashion Asia Limited started a major expansion project to significantly increase production capacity, reinforcing the group's ability to meet growing global demand.",
  },
  {
    year: "2018",
    title: "NTG Farms",
    desc: "NTG Farms joined the Northern Group to diversify operations beyond textiles, extending the group's footprint into agriculture and agribusiness.",
  },
];

export const HistoryFlow = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const spineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="w-full bg-brand-green min-h-screen flex flex-col justify-center py-32 px-8 md:px-20 overflow-hidden">
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
          Since 1967
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-brand-cream/60 text-lg leading-relaxed">
          Founded by Shafiuddin Ahmed and Tosrifa Khatoon, the Northern Group has grown over six decades
          from a steel re-rolling mill into one of Bangladesh&apos;s most respected garment manufacturing conglomerates.
        </p>
      </motion.div>

      {/* Timeline */}
      <div ref={timelineRef} className="max-w-4xl mx-auto relative">
        {/* Static background track */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-brand-cream/5 -translate-x-1/2" />

        {/* Scroll-drawn spine — grows downward as user scrolls */}
        <motion.div
          className="absolute left-4 md:left-1/2 top-0 w-px bg-brand-gold/40 -translate-x-1/2 origin-top"
          style={{ height: spineHeight }}
        />

        <div className="flex flex-col gap-16">
          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={m.year}
                className={`relative flex items-start gap-8 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
              >
                {/* Content */}
                <div className={`pl-10 md:pl-0 md:w-1/2 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                  <span className="text-brand-gold font-mono text-sm tracking-widest">{m.year}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-brand-cream mt-1 mb-3">{m.title}</h3>
                  <p className="text-brand-cream/60 text-base leading-relaxed">{m.desc}</p>
                </div>

                {/* Timeline dot */}
                <motion.div
                  className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-gold/30 border-2 border-brand-green mt-1.5"
                  whileInView={{ backgroundColor: "#FDD017", scale: 1.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  style={{ boxShadow: "0 0 0 4px rgba(253, 208, 23, 0.15)" }}
                />

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>

        {/* Today — Concluding Block */}
        <motion.div
          className="relative mt-20 pl-10 md:pl-0 md:text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          {/* Final dot — larger */}
          <motion.div
            className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-gold/30 border-2 border-brand-green -mt-2"
            whileInView={{ backgroundColor: "#FDD017", scale: 1.3 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ boxShadow: "0 0 0 6px rgba(253, 208, 23, 0.2)" }}
          />
          <div className="md:mx-auto md:max-w-2xl pt-6">
            <span className="text-brand-gold font-mono text-sm tracking-widest">Today</span>
            <h3 className="text-3xl md:text-4xl font-bold text-brand-cream mt-2 mb-4">A Legacy of Excellence</h3>
            <p className="text-brand-cream/60 text-base md:text-lg leading-relaxed">
              Today, Northern is recognized as a leading textile manufacturer in Bangladesh, known for
              quality, innovation, and sustainability. The group is committed to environmentally friendly
              production and actively supports the UN Sustainable Development Goals (SDGs).
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
