"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════
   HERO — Direction 1: "The Monument"
   Preview route — separate from production homepage
   ═══════════════════════════════════════════════ */

const HEADLINE_TOP = "Knit to Fit";
const HEADLINE_BOTTOM = "Your World";
const CHAR_STAGGER = 0.04; // seconds between each character
const HEADLINE_DELAY = 0.6; // no preloader on this preview page
const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroPreview() {
  const topChars = HEADLINE_TOP.split("");
  const bottomChars = HEADLINE_BOTTOM.split("");
  const topDuration = topChars.length * CHAR_STAGGER;
  const bottomStart = HEADLINE_DELAY + topDuration + 0.1;
  const bottomDuration = bottomChars.length * CHAR_STAGGER;
  const afterHeadline = bottomStart + bottomDuration + 0.15;

  return (
    <section
      id="hero-preview"
      className="relative flex h-screen w-full flex-col justify-end overflow-hidden"
    >
      {/* ── Ken Burns zoom + Y drift ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15, y: "-2%" }}
        animate={{ scale: 1, y: "0%" }}
        transition={{ duration: 20, ease: "easeOut" }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt="Northern Corporation facility"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* ── Warm color grade ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[rgba(191,163,80,0.04)]"
        style={{ mixBlendMode: "overlay" }}
      />

      {/* ── Dual gradient — bottom-up dense + top-down subtle ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#023020] via-[#023020]/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#023020]/40 via-transparent to-transparent"
      />

      {/* ── Film grain (same pattern as preloader) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          opacity: 0.02,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px",
        }}
      />

      {/* ── Text block — bottom anchored ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 md:pb-32 lg:pb-40">
        {/* Animated gold divider line */}
        <motion.div
          className="mb-5 h-[1px] origin-left bg-gradient-to-r from-[#BFA350] to-[#BFA350]/30"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{
            duration: 0.6,
            delay: HEADLINE_DELAY - 0.3,
            ease: EASE,
          }}
        />

        {/* Gold eyebrow */}
        <motion.span
          className="mb-5 block font-sans text-xs uppercase tracking-[0.3em] text-[#FDD017] md:text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: HEADLINE_DELAY - 0.15,
            ease: EASE,
          }}
        >
          EST. 1967 • BANGLADESH
        </motion.span>

        {/* Per-character headline — Line 1 */}
        <h1 className="font-playfair leading-tight text-[#F5F5EB]">
          <span className="flex overflow-hidden text-5xl md:text-7xl lg:text-8xl">
            {topChars.map((char, i) => (
              <motion.span
                key={`t-${i}`}
                className="inline-block"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: HEADLINE_DELAY + i * CHAR_STAGGER,
                  ease: EASE,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>

          {/* Per-character headline — Line 2 */}
          <span className="flex overflow-hidden text-5xl md:text-7xl lg:text-8xl">
            {bottomChars.map((char, i) => (
              <motion.span
                key={`b-${i}`}
                className="inline-block"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: bottomStart + i * CHAR_STAGGER,
                  ease: EASE,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle — fades in after headline completes */}
        <motion.p
          className="mt-6 max-w-3xl font-sans text-lg text-[#F5F5EB]/85 md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: afterHeadline, ease: EASE }}
        >
          Northern Corporation Limited pioneers the intersection of bespoke
          craftsmanship and industrial scale.
        </motion.p>
      </div>

      {/* ── Scroll cue with "SCROLL" label ── */}
      <motion.div
        id="hero-preview-scroll-cue"
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.9,
          delay: afterHeadline + 0.3,
          ease: "easeOut",
        }}
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#F5F5EB]/30">
          Scroll
        </span>
        <div className="relative h-16 w-[1px] overflow-hidden bg-[#F5F5EB]/20">
          <motion.div
            className="absolute left-0 top-0 w-full bg-[#FDD017]"
            initial={{ height: 0, y: 0 }}
            animate={{
              height: ["0%", "100%", "0%"],
              y: ["0%", "0%", "100%"],
            }}
            transition={{
              duration: 1.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
          />
        </div>
      </motion.div>

      {/* ── Decorative gold corners ── */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: afterHeadline + 0.5, duration: 0.8 }}
      >
        {/* Top-left */}
        <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-[#BFA350]/15 md:left-8 md:top-8 md:h-10 md:w-10" />
        {/* Top-right */}
        <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-[#BFA350]/15 md:right-8 md:top-8 md:h-10 md:w-10" />
        {/* Bottom-left */}
        <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-[#BFA350]/15 md:bottom-8 md:left-8 md:h-10 md:w-10" />
        {/* Bottom-right */}
        <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-[#BFA350]/15 md:bottom-8 md:right-8 md:h-10 md:w-10" />
      </motion.div>
    </section>
  );
}
