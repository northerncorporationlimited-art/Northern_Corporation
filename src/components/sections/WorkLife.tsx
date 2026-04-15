"use client";

import React from "react";
import { motion } from "framer-motion";

const workLifeItems = [
  {
    title: "Daycare Center",
    desc: "On-site childcare services so parents can work with peace of mind, knowing their children are safe and cared for.",
  },
  {
    title: "Equality",
    desc: "We foster a culture of equal opportunity, ensuring fair treatment and advancement for all employees regardless of background.",
  },
  {
    title: "Professional Development",
    desc: "Continuous training programs and skill-building workshops empower our team to grow and advance in their careers.",
  },
  {
    title: "Prayer Rooms",
    desc: "Separate prayer rooms for male and female employees, equipped with essentials for spiritual practice and led by an Imam.",
  },
  {
    title: "Medical Service",
    desc: "Comprehensive on-site medical facilities with doctors, nurses, and a psychology center — all free of charge for employees.",
  },
  {
    title: "Dining",
    desc: "Spacious dining areas with free, healthy meals and snacks prepared in separate kitchens to the highest standards.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

export const WorkLife = () => {
  return (
    <section className="w-full bg-brand-green py-32 px-8 md:px-20 border-t border-brand-cream/5">
      {/* Header */}
      <motion.div
        className="max-w-6xl mx-auto mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-block mb-4 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-gold">
          HR Services &amp; Worker Well-being
        </span>
        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-brand-cream mt-4">
          Life at Northern
        </h2>
        <p className="mt-6 max-w-xl text-brand-cream/50 text-lg leading-relaxed">
          We invest in our people — because great garments start with a happy,
          healthy, and empowered workforce.
        </p>
      </motion.div>

      {/* Work Life Grid */}
      <div className="max-w-6xl mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {workLifeItems.map((item, i) => (
          <motion.div
            key={item.title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="group flex flex-col gap-3 rounded-2xl border border-white/8 bg-white/4 p-6 hover:border-brand-gold/20 hover:bg-white/8 transition-all"
          >
            <h4 className="text-lg font-bold text-brand-cream">{item.title}</h4>
            <p className="text-sm leading-relaxed text-brand-cream/50">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
