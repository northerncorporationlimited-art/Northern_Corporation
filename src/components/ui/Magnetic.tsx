"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export const Magnetic = ({ children, strength = 15, className = "" }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distX = (e.clientX - centerX) / (rect.width / 2);
    const distY = (e.clientY - centerY) / (rect.height / 2);

    x.set(distX * strength);
    y.set(distY * strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};
