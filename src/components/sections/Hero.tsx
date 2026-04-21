"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative flex h-screen w-full items-center overflow-hidden"
    >
      <Image
        src="/images/hero-bg.jpg"
        alt="Northern Corporation facility"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Brand green overlay — starts dense top-left, fades slightly toward
          bottom-right so the sky/building never overwhelm the headline. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#023020]/85 via-[#023020]/80 to-[#023020]/75"
      />

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
          <h1 className="font-playfair text-5xl leading-tight text-[#F5F5EB] md:text-7xl lg:text-8xl">
            Knit to Fit Your World
          </h1>
          <p className="mt-6 max-w-3xl font-sans text-lg text-[#F5F5EB]/85 md:text-2xl">
            Northern Corporation Limited pioneers the intersection of bespoke
            craftsmanship and industrial scale.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
