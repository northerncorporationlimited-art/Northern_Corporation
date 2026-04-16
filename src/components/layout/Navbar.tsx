"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { Magnetic } from "@/components/ui/Magnetic";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Impact", href: "#impact" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 w-full z-[100] transition-colors duration-500"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className={`w-full transition-all duration-500 ${
            scrolled
              ? "bg-brand-green/80 backdrop-blur-md shadow-lg shadow-black/10"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 md:px-12 py-4">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="relative z-[101] flex items-center gap-3 group"
            >
              <Logo className="w-10 h-10 text-brand-cream transition-transform duration-300 group-hover:scale-110" />
              <span className="hidden sm:block text-xs font-semibold uppercase tracking-[0.2em] text-brand-cream/80">
                Northern Corp.
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Magnetic key={link.label} strength={8}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="relative px-5 py-2 text-[13px] font-medium uppercase tracking-widest text-brand-cream/70 hover:text-brand-cream transition-colors duration-300"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
                  </a>
                </Magnetic>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-[101] md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-6 h-[1.5px] bg-brand-cream origin-center"
                animate={mobileOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
              <motion.span
                className="block w-6 h-[1.5px] bg-brand-cream origin-center"
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-6 h-[1.5px] bg-brand-cream origin-center"
                animate={mobileOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-brand-green flex flex-col items-center justify-center gap-8"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-brand-cream hover:text-brand-gold transition-colors"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + i * 0.08,
                  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
