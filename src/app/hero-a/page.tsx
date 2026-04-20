"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════════════
   HERO A — "The Monument" — Full-Bleed Cinematic
   ═══════════════════════════════════════════════ */

const headlineTop = "KNIT TO FIT";
const headlineBottom = "YOUR WORLD";

export default function HeroA() {
  return (
    <div className="hero-a-root">
      {/* Background Image — full bleed */}
      <div className="hero-a-image-wrap">
        <Image
          src="/images/hero-building.png"
          alt="Northern Corporation factory building"
          fill
          priority
          sizes="100vw"
          className="hero-a-bg-image"
          style={{ objectFit: "cover" }}
        />
        {/* Cinematic gradient overlay — dark from bottom */}
        <div className="hero-a-gradient" />
        {/* Subtle warm color grade */}
        <div className="hero-a-color-grade" />
      </div>

      {/* Content — bottom-left like a film title card */}
      <div className="hero-a-content">
        {/* Headline */}
        <div className="hero-a-headline-wrap">
          <div className="hero-a-headline-line">
            {headlineTop.split("").map((char, i) => (
              <motion.span
                key={`top-${i}`}
                className="hero-a-char"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          <div className="hero-a-headline-line">
            {headlineBottom.split("").map((char, i) => (
              <motion.span
                key={`bot-${i}`}
                className="hero-a-char"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7 + i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <motion.div
          className="hero-a-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-a-divider" />
          <div className="hero-a-subtitle-text">
            <span>Northern Corporation Limited</span>
            <span className="hero-a-subtitle-sep">—</span>
            <span>Est. 1967</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="hero-a-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.8 }}
      >
        <span className="hero-a-scroll-text">Scroll</span>
        <div className="hero-a-scroll-line" />
      </motion.div>

    </div>
  );
}
