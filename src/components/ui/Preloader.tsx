"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const letters = "NORTHERN".split("");

export const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 3200;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / duration, 1);
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
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.15 },
      }}
    >
      {/* Ambient gold glow — very subtle */}
      <motion.div
        className="absolute w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(191,163,80,0.08) 0%, rgba(191,163,80,0) 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />

      {/* Main typography container */}
      <div className="relative flex flex-col items-center">
        {/* Giant "NORTHERN" — letter-by-letter reveal */}
        <div
          className="flex items-baseline justify-center"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {letters.map((letter, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                className="text-[13vw] md:text-[11vw] lg:text-[9vw] font-black leading-[0.9] tracking-[-0.02em] select-none block"
                style={{ color: "#F5F0E1" }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  y: {
                    duration: 0.8,
                    delay: 0.2 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  },
                  opacity: {
                    duration: 0.4,
                    delay: 0.2 + i * 0.08,
                  },
                }}
              >
                {letter}
              </motion.span>
            </div>
          ))}
        </div>

        {/* "CORPORATION LIMITED" subtitle — slides up */}
        <div className="overflow-hidden mt-2 md:mt-4">
          <motion.p
            className="text-[2.5vw] md:text-[1.4vw] lg:text-[1.1vw] font-light uppercase tracking-[0.5em] md:tracking-[0.7em]"
            style={{
              color: "rgba(191,163,80,0.45)",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              y: {
                duration: 0.7,
                delay: 1.2,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              },
              opacity: { duration: 0.5, delay: 1.2 },
            }}
          >
            Corporation Limited
          </motion.p>
        </div>
      </div>

      {/* Bottom bar — progress line + year */}
      <div className="absolute bottom-8 md:bottom-12 left-6 right-6 md:left-12 md:right-12">
        {/* EST. 1967 — left aligned */}
        <motion.p
          className="text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3"
          style={{
            color: "rgba(245,240,225,0.2)",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
        >
          Est. 1967
        </motion.p>

        {/* Progress line container */}
        <div className="relative h-[1px] w-full bg-white/5 overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #BFA350 0%, #D4AF37 60%, rgba(212,175,55,0.3) 100%)",
              width: `${progress}%`,
            }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
          {/* Glowing tip on progress line */}
          <motion.div
            className="absolute top-[-2px] h-[5px] w-[40px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(212,175,55,0.6) 0%, transparent 70%)",
              left: `${progress}%`,
              transform: "translateX(-100%)",
            }}
          />
        </div>

        {/* Bottom row: progress % right-aligned */}
        <div className="flex justify-end mt-2">
          <motion.span
            className="text-[10px] md:text-xs tabular-nums tracking-widest"
            style={{
              color:
                progress >= 100
                  ? "rgba(191,163,80,0.8)"
                  : "rgba(245,240,225,0.25)",
              transition: "color 0.5s ease",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {progress}%
          </motion.span>
        </div>
      </div>

      {/* Film grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
    </motion.div>
  );
};
