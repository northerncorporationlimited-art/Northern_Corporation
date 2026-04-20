"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════════════
   HERO C — "The Reveal" — Scroll-Triggered Cinematic
   ═══════════════════════════════════════════════ */

export default function HeroC() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = containerRef.current.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Derived animation values
  const textScale = 1 - scrollProgress * 0.65; // 1 → 0.35
  const textY = scrollProgress * -30; // moves up
  const textOpacity = scrollProgress < 0.3 ? 1 : 1 - (scrollProgress - 0.3) * 1.5;
  const imageClip = scrollProgress * 100; // 0% → 100%
  const imageOpacity = scrollProgress > 0.15 ? Math.min(1, (scrollProgress - 0.15) * 2) : 0;
  const overlayTextOpacity = scrollProgress > 0.6 ? (scrollProgress - 0.6) * 2.5 : 0;

  return (
    <div ref={containerRef} className="hero-c-root">
      {/* Sticky viewport */}
      <div className="hero-c-sticky">
        {/* Phase 1: Giant text on green background */}
        <div
          className="hero-c-text-phase"
          style={{
            transform: `scale(${textScale}) translateY(${textY}vh)`,
            opacity: Math.max(0, textOpacity),
          }}
        >
          <motion.h1
            className="hero-c-headline"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-c-line">KNIT TO FIT</span>
            <span className="hero-c-line">YOUR WORLD</span>
          </motion.h1>
          <motion.p
            className="hero-c-initial-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Northern Corporation Limited
          </motion.p>
        </div>

        {/* Phase 2: Image reveals behind via expanding circle */}
        <div
          className="hero-c-image-phase"
          style={{
            clipPath: `circle(${imageClip}% at 50% 50%)`,
            opacity: imageOpacity,
          }}
        >
          <Image
            src="/images/hero-building.png"
            alt="Northern Corporation factory"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
          {/* Warm color grade */}
          <div className="hero-c-warm-overlay" />
        </div>

        {/* Phase 3: Final text over image */}
        <div
          className="hero-c-final-text"
          style={{ opacity: Math.max(0, overlayTextOpacity) }}
        >
          <h2 className="hero-c-final-headline">KNIT TO FIT YOUR WORLD</h2>
          <div className="hero-c-final-rule" />
          <p className="hero-c-final-sub">Est. 1967 — Gazipur, Bangladesh</p>
        </div>

        {/* Gold frame border — appears at end */}
        <div
          className="hero-c-frame"
          style={{ opacity: scrollProgress > 0.7 ? (scrollProgress - 0.7) * 3.3 : 0 }}
        />

        {/* Scroll cue — only at start */}
        <motion.div
          className="hero-c-scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollProgress < 0.05 ? 1 : 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="hero-c-scroll-pulse" />
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </div>

      <div className="hero-preview-label" style={{ position: "fixed" }}>C — "The Reveal" (Scroll-Triggered)</div>
    </div>
  );
}
