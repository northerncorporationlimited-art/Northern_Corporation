"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FACILITIES } from "@/data/facilities";

/* ═══════════════════════════════════════════════
   FACILITIES — Premium Interactive Gallery
   Desktop: hover-to-expand strips with content.
   Mobile: tappable cards with slide-up details.
   Both link to dedicated /facilities/[slug] pages.
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Facilities = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userInteractedRef = useRef(false);

  /* Auto-rotate on desktop when user hasn't interacted */
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    const tick = () => {
      autoPlayRef.current = setTimeout(() => {
        if (!userInteractedRef.current) {
          setActiveIndex((i) => (i + 1) % FACILITIES.length);
        }
        tick();
      }, 4000);
    };
    tick();
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [startAutoPlay]);

  const handleHover = (i: number) => {
    userInteractedRef.current = true;
    setActiveIndex(i);
    // Reset auto-play after 8 seconds of no interaction
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    autoPlayRef.current = setTimeout(() => {
      userInteractedRef.current = false;
      startAutoPlay();
    }, 8000);
  };

  const toggleMobileCard = (i: number) => {
    setMobileExpanded((prev) => (prev === i ? null : i));
  };



  return (
    <section
      id="facilities"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#023020] lg:h-screen"
    >
      {/* ── Background glow effect ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 70% 60%, rgba(253,208,23,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── Header ── */}
      <div className="relative z-10 shrink-0 px-6 pt-16 md:px-12 md:pt-20 lg:px-16">
        <motion.p
          className="mb-2 font-sans text-[10px] uppercase tracking-[0.3em] text-[#FDD017] md:text-xs"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Life at Northern
        </motion.p>
        <motion.h2
          className="font-playfair text-3xl text-[#F5F5EB] md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          An Environment of Excellence
        </motion.h2>
      </div>

      {/* ═══════════════════════════════════════
           DESKTOP: Interactive Expanding Gallery
         ═══════════════════════════════════════ */}
      <div className="relative z-10 mt-6 hidden min-h-0 flex-1 gap-3 px-6 pb-6 lg:flex lg:px-12 lg:pb-12">
        {FACILITIES.map((fac, i) => {
          const isActive = activeIndex === i;
          return (
            <motion.div
              key={fac.slug}
              className="group relative h-full cursor-pointer overflow-hidden rounded-2xl"
              animate={{ flex: isActive ? 5 : 1 }}
              transition={{ duration: 0.7, ease: EASE }}
              onMouseEnter={() => handleHover(i)}
              onClick={() => handleHover(i)}
            >
              {/* Background image */}
              <Image
                src={fac.image}
                alt={fac.title}
                fill
                sizes={isActive ? "60vw" : "10vw"}
                priority={i < 3}
                className={`object-cover transition-all duration-700 ${
                  isActive
                    ? "scale-[1.02] brightness-100"
                    : "brightness-[0.4] grayscale-[40%] group-hover:brightness-[0.55]"
                }`}
              />

              {/* Gradient overlay */}
              <div
                className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-60"
                }`}
                style={{
                  background: isActive
                    ? "linear-gradient(to top, rgba(2,48,32,0.95) 0%, rgba(2,48,32,0.4) 40%, transparent 70%)"
                    : "linear-gradient(to top, rgba(2,48,32,0.8) 0%, rgba(2,48,32,0.3) 100%)",
                }}
              />

              {/* Collapsed: number at top, vertical title centered */}
              <AnimatePresence>
                {!isActive && (
                  <motion.div
                    className="pointer-events-none absolute inset-0 flex flex-col items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Number badge — pinned near top */}
                    <span className="mt-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#FDD017]/25 font-mono text-[10px] text-[#FDD017]/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Vertical label — centered in remaining space */}
                    <span className="mt-auto mb-auto whitespace-nowrap font-playfair text-sm uppercase tracking-[0.2em] text-[#F5F5EB]/50 -rotate-90">
                      {fac.shortTitle}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expanded: full content + CTA */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-8 lg:p-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
                  >
                    {/* Tagline */}
                    <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.25em] text-[#FDD017]">
                      {fac.tagline}
                    </p>

                    <h3 className="mb-3 font-playfair text-3xl text-[#F5F5EB] lg:text-4xl">
                      {fac.title}
                    </h3>

                    <p className="mb-6 max-w-lg font-sans text-sm leading-relaxed text-[#F5F5EB]/75 lg:text-base">
                      {fac.description}
                    </p>

                    {/* Quick stats row */}
                    <div className="mb-6 flex gap-6">
                      {fac.highlights.slice(0, 3).map((h) => (
                        <div key={h.label} className="flex flex-col">
                          <span className="font-playfair text-xl text-[#FDD017]">
                            {h.value}
                          </span>
                          <span className="font-sans text-[10px] uppercase tracking-wider text-[#F5F5EB]/40">
                            {h.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Learn More CTA */}
                    <Link
                      href={`/facilities/${fac.slug}`}
                      className="group/link inline-flex w-fit items-center gap-2 rounded-full border border-[#FDD017]/30 px-6 py-2.5 font-sans text-xs uppercase tracking-widest text-[#FDD017] transition-all hover:border-[#FDD017] hover:bg-[#FDD017]/10 hover:shadow-lg hover:shadow-[#FDD017]/10"
                    >
                      Learn More
                      <span className="transition-transform group-hover/link:translate-x-1">
                        →
                      </span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active indicator bar at bottom */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#FDD017]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                style={{ transformOrigin: "left" }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* ── Desktop progress dots ── */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 gap-2 lg:flex">
        {FACILITIES.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === activeIndex
                ? "w-8 bg-[#FDD017]"
                : "w-2 bg-[#F5F5EB]/20"
            }`}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════
           MOBILE: Tappable Cards with Expand
         ═══════════════════════════════════════ */}
      <div className="relative z-10 mt-4 flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 pb-4 lg:hidden">
        {FACILITIES.map((fac, i) => {
          const isExpanded = mobileExpanded === i;
          return (
            <motion.div
              key={fac.slug}
              className="relative shrink-0 overflow-hidden rounded-xl"
              animate={{ height: isExpanded ? "auto" : 100 }}
              transition={{ duration: 0.4, ease: EASE }}
              layout
            >
              {/* Background */}
              <div className="absolute inset-0">
                <Image
                  src={fac.image}
                  alt={fac.title}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  className={`object-cover transition-all duration-500 ${
                    isExpanded ? "brightness-[0.3]" : "brightness-[0.5]"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#023020]/90 via-[#023020]/60 to-transparent" />
              </div>

              {/* Tappable header */}
              <button
                onClick={() => toggleMobileCard(i)}
                className="relative z-10 flex w-full items-center gap-4 p-4"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#FDD017]/30 font-mono text-[10px] text-[#FDD017]/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 text-left">
                  <span className="font-playfair text-lg text-[#FDD017]">
                    {fac.title}
                  </span>
                </div>
                <motion.span
                  className="text-[#F5F5EB]/40 text-xl"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ↓
                </motion.span>
              </button>

              {/* Expandable content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="relative z-10 px-4 pb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mb-4 text-sm leading-relaxed text-[#F5F5EB]/70">
                      {fac.description}
                    </p>

                    {/* Mini stats */}
                    <div className="mb-4 grid grid-cols-2 gap-2">
                      {fac.highlights.slice(0, 4).map((h) => (
                        <div
                          key={h.label}
                          className="rounded-lg bg-[#F5F5EB]/5 px-3 py-2"
                        >
                          <span className="block font-playfair text-lg text-[#FDD017]">
                            {h.value}
                          </span>
                          <span className="font-sans text-[9px] uppercase tracking-wider text-[#F5F5EB]/40">
                            {h.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/facilities/${fac.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-[#FDD017]/30 px-5 py-2 text-xs uppercase tracking-widest text-[#FDD017] transition-all active:bg-[#FDD017]/10"
                    >
                      Learn More →
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
