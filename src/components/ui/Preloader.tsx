"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

export const Preloader = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]"
      exit={{ y: "-100%", opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
        className="text-white w-48 h-48 md:w-64 md:h-64"
      >
        <Logo className="w-full h-full" />
      </motion.div>
    </motion.div>
  );
};
