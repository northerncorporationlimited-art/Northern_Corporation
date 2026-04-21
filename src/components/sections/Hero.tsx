"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex h-screen w-full flex-col justify-end overflow-hidden pb-24 md:pb-32 lg:pb-40"
    >
      {/* Ken Burns cinematic zoom — scale 1.15 → 1 over 20s */}
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

      {/* Bottom-heavy overlay — sky stays clear, base is anchored in brand green */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#023020] via-[#023020]/60 to-transparent"
      />

      {/* Text block — lives at the bottom of the viewport */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 4.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Gold editorial eyebrow */}
          <span className="mb-4 block font-sans text-xs uppercase tracking-[0.3em] text-[#FDD017] md:text-sm">
            EST. 1967 • BANGLADESH
          </span>

          <h1 className="font-playfair text-5xl leading-tight text-[#F5F5EB] md:text-7xl lg:text-8xl">
            Knit to Fit Your World
          </h1>
          <p className="mt-6 max-w-3xl font-sans text-lg text-[#F5F5EB]/85 md:text-2xl">
            Northern Corporation Limited pioneers the intersection of bespoke
            craftsmanship and industrial scale.
          </p>
        </motion.div>
      </div>

      {/* Scroll cue — fades in with the text block (delay 4.5s) */}
      <motion.div
        id="hero-scroll-cue"
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 4.5, ease: "easeOut" }}
      >
        {/* Thin track */}
        <div className="relative h-16 w-[1px] bg-[#F5F5EB]/20 overflow-hidden">
          {/* Animated fill line */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#FDD017]"
            initial={{ height: 0, y: 0 }}
            animate={{ height: ["0%", "100%", "0%"], y: ["0%", "0%", "100%"] }}
            transition={{
              duration: 1.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.4,
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};
