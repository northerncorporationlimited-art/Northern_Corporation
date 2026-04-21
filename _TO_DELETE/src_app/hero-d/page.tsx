"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════════════
   HERO D — "The Frame" — Architectural Showcase
   ═══════════════════════════════════════════════ */

export default function HeroD() {
  return (
    <div className="hero-d-root">
      {/* Headline — overlaps top edge of image */}
      <div className="hero-d-headline-wrap">
        <div className="hero-d-headline-line">
          {"KNIT TO FIT".split("").map((char, i) => (
            <motion.span
              key={`t-${i}`}
              className="hero-d-char"
              initial={{ y: "120%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.5 + i * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
        <div className="hero-d-headline-line">
          {"YOUR WORLD".split("").map((char, i) => (
            <motion.span
              key={`b-${i}`}
              className="hero-d-char"
              initial={{ y: "120%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.9 + i * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Framed image */}
      <motion.div
        className="hero-d-frame"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-d-frame-border" />
        <div className="hero-d-image-wrap">
          <Image
            src="/images/hero-building.png"
            alt="Northern Corporation factory"
            fill
            priority
            sizes="90vw"
            style={{ objectFit: "cover", objectPosition: "center 35%" }}
          />
          {/* Subtle warm overlay */}
          <div className="hero-d-image-overlay" />
        </div>
      </motion.div>

      {/* Bottom meta */}
      <motion.div
        className="hero-d-meta"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.5 }}
      >
        <div className="hero-d-meta-rule" />
        <div className="hero-d-meta-row">
          <span>Northern Corporation Limited</span>
          <span>Est. 1967</span>
        </div>
      </motion.div>

      {/* Decorative corners */}
      <motion.div
        className="hero-d-corners"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <div className="hero-d-corner hero-d-corner-tl" />
        <div className="hero-d-corner hero-d-corner-tr" />
        <div className="hero-d-corner hero-d-corner-bl" />
        <div className="hero-d-corner hero-d-corner-br" />
      </motion.div>

      <div className="hero-preview-label">D — "The Frame" (Architectural Showcase)</div>
    </div>
  );
}
