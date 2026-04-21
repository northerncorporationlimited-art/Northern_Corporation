"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════
   FACILITIES — Life at Northern
   Full-screen image crossfade + frosted accordion
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FACILITIES = [
  {
    title: "Prayer Rooms",
    image: "/images/facilities/prayer.jpg",
    text: "Separate, thoughtfully equipped prayer rooms for male and female employees. An Imam is available to lead prayers, fostering a supportive community.",
  },
  {
    title: "Medical Service",
    image: "/images/facilities/medical.jpg",
    text: "Comprehensive on-site medical services staffed by skilled doctors and nurses, offering free treatment and a dedicated psychology center for wellness.",
  },
  {
    title: "Dining",
    image: "/images/facilities/dining.jpg",
    text: "Spacious dining areas with large TVs, offering free, healthy meals and snacks from separate kitchens, maintained to the highest standards.",
  },
  {
    title: "Daycare Center",
    image: "/images/facilities/daycare.jpg",
    text: "A fully equipped, safe, and engaging environment stocked with toys, ensuring complete peace of mind for working parents.",
  },
  {
    title: "Equality",
    image: "/images/facilities/equality.jpg",
    text: "Embracing diversity, equity, and inclusion for all genders. Proactive HR policies ensure fair treatment and opportunities for every individual.",
  },
  {
    title: "Professional Dev.",
    image: "/images/facilities/development.jpg",
    text: "Fostering career growth through a robust framework of training programs, mentorship opportunities, and skill development initiatives.",
  },
];

export const Facilities = () => {
  const [active, setActive] = useState(0);

  return (
    <section
      id="facilities"
      className="relative flex h-screen w-full items-center overflow-hidden bg-[#023020]"
    >
      {/* ── Background image crossfade layer ── */}
      {FACILITIES.map((item, i) => (
        <Image
          key={item.title}
          src={item.image}
          alt={item.title}
          fill
          sizes="100vw"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            active === i ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
        />
      ))}

      {/* Gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#023020]/95 via-[#023020]/70 to-[#023020]/20"
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-12 px-6 lg:flex-row lg:items-center">
        {/* Left — Header */}
        <motion.div
          className="shrink-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="mb-4 font-sans text-sm uppercase tracking-[0.3em] text-[#FDD017]">
            Life at Northern
          </p>
          <h2 className="max-w-sm font-playfair text-5xl leading-tight text-[#F5F5EB] md:text-6xl">
            Empowering Our People
          </h2>
        </motion.div>

        {/* Right — Frosted glass accordion */}
        <motion.div
          className="flex w-full flex-col gap-2 rounded-3xl border border-[#F5F5EB]/10 bg-[#F5F5EB]/5 p-6 backdrop-blur-xl md:p-8 lg:w-[480px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          {FACILITIES.map((item, i) => {
            const isActive = active === i;
            return (
              <div
                key={item.title}
                className={`cursor-pointer rounded-xl px-4 py-3 transition-colors duration-300 ${
                  isActive ? "bg-[#F5F5EB]/5" : "hover:bg-[#F5F5EB]/[0.02]"
                }`}
                onClick={() => setActive(i)}
              >
                {/* Title row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-[#FDD017]/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-playfair text-xl transition-colors duration-300 md:text-2xl ${
                        isActive ? "text-[#FDD017]" : "text-[#F5F5EB]"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  <motion.span
                    className="text-sm text-[#F5F5EB]/40"
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ▾
                  </motion.span>
                </div>

                {/* Expandable body */}
                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={{
                    height: isActive ? "auto" : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p className="pt-3 font-sans text-sm leading-relaxed text-[#F5F5EB]/80">
                    {item.text}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
