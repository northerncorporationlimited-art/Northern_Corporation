"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════
   HERO — Premium Editorial Offset
   Text-mask reveal with Ken Burns cinematic zoom
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const TEXT_DELAY = 0.2; // starts immediately after preloader exit

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex h-screen w-full overflow-hidden bg-[#023020]"
    >
      {/* ── Ken Burns cinematic zoom ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
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

      {/* ── Gradient overlay — bottom-heavy so the sky breathes ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#023020] via-[#023020]/60 to-transparent"
      />

      {/* ── Editorial offset text — anchored bottom-left ── */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-end px-6 pb-32 lg:pb-40">
        {/* Gold eyebrow */}
        <motion.span
          className="mb-4 block font-sans text-xs uppercase tracking-[0.3em] text-[#FDD017] md:text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: TEXT_DELAY, ease: EASE }}
        >
          EST. 1967 • BANGLADESH
        </motion.span>

        {/* Headline — text mask reveal (slides up from hidden overflow) */}
        <h1 className="font-playfair text-[#F5F5EB]">
          {/* Line 1 */}
          <span className="block overflow-hidden">
            <motion.span
              className="block text-5xl leading-[0.95] md:text-7xl lg:text-8xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.2,
                delay: TEXT_DELAY + 0.15,
                ease: EASE,
              }}
            >
              Knit to Fit
            </motion.span>
          </span>

          {/* Line 2 */}
          <span className="block overflow-hidden">
            <motion.span
              className="block text-5xl leading-[0.95] md:text-7xl lg:text-8xl"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1.2,
                delay: TEXT_DELAY + 0.35,
                ease: EASE,
              }}
            >
              Your World
            </motion.span>
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 max-w-3xl font-sans text-lg text-[#F5F5EB]/80 md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: TEXT_DELAY + 0.8,
            ease: EASE,
          }}
        >
          Northern Corporation Limited pioneers the intersection of bespoke
          craftsmanship and industrial scale.
        </motion.p>
      </div>

      {/* ── Scroll cue — bottom center, gravity-drop dot ── */}
      <motion.div
        id="hero-scroll-cue"
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-10"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: TEXT_DELAY + 1.2, ease: "easeOut" }}
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-[#F5F5EB]/30">
          Scroll
        </span>
        {/* Track — gradient-faded at both ends */}
        <div className="relative h-14 w-[1px] md:h-16">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(245,245,235,0.15) 20%, rgba(245,245,235,0.15) 70%, transparent 100%)",
            }}
          />
          {/* Gravity-drop dot */}
          <motion.div
            className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#FDD017]"
            style={{
              boxShadow:
                "0 0 6px rgba(253,208,23,0.8), 0 0 16px rgba(253,208,23,0.3)",
            }}
            animate={{
              top: ["-4px", "100%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.8,
              ease: [0.45, 0, 0.55, 1],
              repeat: Infinity,
              repeatDelay: 0.6,
              times: [0, 1],
              opacity: {
                times: [0, 0.15, 0.75, 1],
                duration: 1.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 0.6,
              },
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};
