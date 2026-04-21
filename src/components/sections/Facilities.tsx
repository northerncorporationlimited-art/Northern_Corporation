"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════
   FACILITIES — Expanding Image Gallery
   Desktop: hover to expand. Mobile: scrollable list.
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
  const [hoveredIndex, setHoveredIndex] = useState(0);

  return (
    <section
      id="facilities"
      className="relative flex h-screen w-full flex-col overflow-hidden bg-[#023020] px-4 py-12 md:px-12 md:py-20"
    >
      {/* ── Top Header ── */}
      <div className="shrink-0">
        <p className="mb-2 font-sans text-xs uppercase tracking-widest text-[#FDD017] md:text-sm">
          Life at Northern
        </p>
        <h2 className="font-playfair text-3xl text-[#F5F5EB] md:text-5xl lg:text-6xl">
          An Environment of Excellence
        </h2>
      </div>

      {/* ── Desktop: Expanding Gallery ── */}
      <div className="mt-6 hidden min-h-0 w-full flex-1 gap-4 lg:flex">
        {FACILITIES.map((fac, i) => {
          const isActive = hoveredIndex === i;
          return (
            <motion.div
              key={fac.title}
              className="group relative h-full cursor-pointer overflow-hidden rounded-3xl bg-[#023020]"
              animate={{ flex: isActive ? 5 : 1 }}
              transition={{ duration: 0.6, ease: EASE }}
              onMouseEnter={() => setHoveredIndex(i)}
              onClick={() => setHoveredIndex(i)}
            >
              <Image
                src={fac.image}
                alt={fac.title}
                fill
                sizes="50vw"
                priority={i === 0}
                className={`object-cover transition-all duration-700 ${
                  isActive
                    ? "scale-105 opacity-100"
                    : "opacity-60 grayscale-[30%] group-hover:opacity-80"
                }`}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#023020]/90 via-[#023020]/20 to-transparent"
              />

              {/* Collapsed: vertical title */}
              {!isActive && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="whitespace-nowrap font-playfair text-2xl uppercase tracking-wider text-[#F5F5EB]/70 drop-shadow-md -rotate-90">
                    {fac.title}
                  </span>
                </div>
              )}

              {/* Expanded: title + description */}
              {isActive && (
                <motion.div
                  className="pointer-events-none absolute bottom-0 left-0 flex w-full flex-col justify-end p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <p className="mb-3 font-playfair text-4xl text-[#FDD017]">
                    {fac.title}
                  </p>
                  <p className="max-w-lg font-sans text-base leading-relaxed text-[#F5F5EB]/90">
                    {fac.text}
                  </p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* ── Mobile: Scrollable Card List ── */}
      <div className="mt-6 flex flex-1 flex-col gap-3 overflow-y-auto lg:hidden">
        {FACILITIES.map((fac, i) => (
          <div
            key={fac.title}
            className="relative flex-shrink-0 overflow-hidden rounded-2xl"
            style={{ minHeight: "120px" }}
          >
            <Image
              src={fac.image}
              alt={fac.title}
              fill
              sizes="100vw"
              priority={i === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#023020]/90 via-[#023020]/50 to-transparent" />
            <div className="relative z-10 flex h-full items-center p-5">
              <div>
                <span className="mr-3 font-mono text-[10px] text-[#FDD017]/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-playfair text-lg text-[#FDD017]">
                  {fac.title}
                </span>
                <p className="mt-1 text-xs leading-relaxed text-[#F5F5EB]/70">
                  {fac.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
