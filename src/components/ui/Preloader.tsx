"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

export const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth exponential progress — fast start, slow end, snap to 100
    let frame: number;
    let start: number | null = null;
    const duration = 2800; // ms

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / duration, 1);
      // Ease-out cubic for organic feel
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#060a06] overflow-hidden"
      exit={{
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
      }}
    >
      {/* Ambient glow behind the logo */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(191,163,80,0.15) 0%, rgba(191,163,80,0) 70%)",
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1.2, 1], opacity: [0, 0.8, 0.6] }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      {/* Outer spinning ring */}
      <motion.div
        className="absolute w-[220px] h-[220px] md:w-[280px] md:h-[280px]"
        initial={{ rotate: 0, opacity: 0 }}
        animate={{ rotate: 360, opacity: [0, 1, 1, 0] }}
        transition={{
          rotate: { duration: 3, ease: "linear", repeat: 0 },
          opacity: { duration: 3, times: [0, 0.15, 0.7, 1] },
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BFA350" stopOpacity="0" />
              <stop offset="50%" stopColor="#BFA350" stopOpacity="1" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="url(#ring-grad)"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeDasharray="289.03"
            strokeDashoffset="72.26"
          />
        </svg>
      </motion.div>

      {/* Inner pulsing ring */}
      <motion.div
        className="absolute w-[180px] h-[180px] md:w-[230px] md:h-[230px] rounded-full border border-brand-gold/10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{
          scale: [0.9, 1.05, 0.95, 1],
          opacity: [0, 0.4, 0.2, 0.3],
        }}
        transition={{
          duration: 2.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      {/* Logo container with mask reveal */}
      <div className="relative">
        {/* Ghost logo (outline/dim) */}
        <motion.div
          className="w-36 h-36 md:w-48 md:h-48 text-brand-cream/5"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Logo className="w-full h-full" />
        </motion.div>

        {/* Gold fill logo — revealed via clip-path from bottom */}
        <motion.div
          className="absolute inset-0 w-36 h-36 md:w-48 md:h-48"
          style={{ color: "#BFA350" }}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{
            clipPath: `inset(${100 - progress}% 0 0 0)`,
          }}
          transition={{ duration: 0.1, ease: "linear" }}
        >
          <Logo className="w-full h-full" />
        </motion.div>

        {/* Shimmer sweep across logo at 70% */}
        <AnimatePresence>
          {progress >= 70 && progress < 100 && (
            <motion.div
              className="absolute inset-0 w-36 h-36 md:w-48 md:h-48 overflow-hidden pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress counter */}
      <motion.div
        className="mt-10 flex items-baseline gap-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span
          className="text-4xl md:text-5xl font-extralight tracking-tight tabular-nums"
          style={{
            color: progress >= 100 ? "#BFA350" : "rgba(245,240,225,0.6)",
            transition: "color 0.5s ease",
          }}
        >
          {progress}
        </span>
        <span className="text-sm font-light text-brand-cream/30 tracking-widest">
          %
        </span>
      </motion.div>

      {/* Brand name fade-in at the end */}
      <motion.p
        className="mt-4 text-[10px] md:text-xs uppercase tracking-[0.4em] text-brand-cream/20 font-medium"
        initial={{ opacity: 0, letterSpacing: "0.2em" }}
        animate={{
          opacity: progress >= 60 ? 1 : 0,
          letterSpacing: progress >= 60 ? "0.4em" : "0.2em",
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Northern Corporation
      </motion.p>

      {/* Subtle particle dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-brand-gold/20"
          style={{
            left: `${20 + i * 12}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
            y: [0, -30, -60],
          }}
          transition={{
            duration: 2.5,
            delay: 0.5 + i * 0.3,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
};
