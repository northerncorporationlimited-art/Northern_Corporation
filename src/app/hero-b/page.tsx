"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════════════
   HERO B — "The Split" — Editorial Magazine Layout
   ═══════════════════════════════════════════════ */

export default function HeroB() {
  return (
    <div className="hero-b-root">
      {/* Left panel — brand green with text */}
      <div className="hero-b-left">
        {/* Logo */}
        <motion.div
          className="hero-b-logo"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src="/logo-symbol.svg"
            alt="Northern Corp"
            className="hero-b-logo-img"
          />
          <span className="hero-b-logo-text">NORTHERN CORP.</span>
        </motion.div>

        {/* Headline — stacked */}
        <div className="hero-b-headline">
          {["KNIT", "TO FIT", "YOUR", "WORLD"].map((word, i) => (
            <div key={i} className="hero-b-word-wrap">
              <motion.span
                className="hero-b-word"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.9,
                  delay: 0.4 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Divider + subtitle */}
        <motion.div
          className="hero-b-meta"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          <div className="hero-b-rule" />
          <p className="hero-b-tagline">Precision knitwear manufacturing since 1967</p>
          <p className="hero-b-location">Gazipur, Bangladesh → Global</p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hero-b-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <span>Scroll to explore</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>

      {/* Right panel — building image */}
      <motion.div
        className="hero-b-right"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
      >
        <Image
          src="/images/hero-building.png"
          alt="Northern Corporation factory"
          fill
          priority
          sizes="60vw"
          style={{ objectFit: "cover", objectPosition: "center 35%" }}
        />
        {/* Subtle edge vignette */}
        <div className="hero-b-vignette" />
      </motion.div>

      <div className="hero-preview-label">B — "The Split" (Editorial Magazine)</div>
    </div>
  );
}
