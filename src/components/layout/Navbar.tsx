"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

/* ═══════════════════════════════════════════════
   NAVBAR — Premium Awwwards-Level Navigation
   Integrates with PresentationDeck via custom events
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const NAV_LINKS = [
  { label: "Home", slideIndex: 0 },
  { label: "About", slideIndex: 1 },
  { label: "Sustainability", slideIndex: 2 },
  { label: "Products", slideIndex: 3 },
  { label: "Global Reach", slideIndex: 4 },
  { label: "Life at Northern", slideIndex: 5 },
  { label: "Certifications", slideIndex: 6 },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Auto-close mobile menu on resize to desktop
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navigateToSlide = useCallback(
    (slideIndex: number) => {
      setMobileOpen(false);
      // Small delay if closing mobile menu first
      const dispatch = () => {
        window.dispatchEvent(
          new CustomEvent("NAVIGATE_SLIDE", { detail: slideIndex })
        );
      };
      if (mobileOpen) {
        setTimeout(dispatch, 500);
      } else {
        dispatch();
      }
    },
    [mobileOpen]
  );

  return (
    <>
      <motion.nav
        className="fixed left-0 top-0 z-[200] w-full"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 2.2, ease: EASE }}
      >
        <div className="w-full bg-gradient-to-b from-[#023020]/60 via-[#023020]/20 to-transparent">
          <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 md:px-12">
            {/* ── Logo ── */}
            <button
              onClick={() => navigateToSlide(0)}
              className="group relative z-[201] flex items-center"
            >
              <Logo className="h-14 w-14 text-brand-cream transition-transform duration-300 group-hover:scale-110" />
              <span className="-ml-3 hidden text-sm font-semibold uppercase tracking-[0.2em] text-brand-cream/80 sm:block">
                Northern Corp.
              </span>
            </button>

            {/* ── Desktop Links ── */}
            <div
              className="hidden items-center gap-0 lg:flex"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {NAV_LINKS.map((link, i) => (
                <button
                  key={link.label}
                  onClick={() => navigateToSlide(link.slideIndex)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  className="relative px-4 py-2 xl:px-5"
                >
                  <span className="relative z-10 text-[12px] font-medium uppercase tracking-widest text-brand-cream/70 transition-colors duration-200 hover:text-brand-cream xl:text-[13px]">
                    {link.label}
                  </span>

                  {/* Hover pill background */}
                  {hoveredIndex === i && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#F5F5EB]/10"
                      layoutId="navHoverPill"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* ── Contact CTA (Desktop) ── */}
            <button
              onClick={() => navigateToSlide(6)}
              className="hidden rounded-full border border-[#FDD017]/30 bg-[#FDD017]/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-[#FDD017] backdrop-blur-sm transition-all duration-300 hover:border-[#FDD017]/60 hover:bg-[#FDD017]/20 lg:block"
            >
              Contact Us
            </button>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-[201] flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block h-[1.5px] w-6 origin-center bg-brand-cream"
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 4.5 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: EASE }}
              />
              <motion.span
                className="block h-[1.5px] w-6 origin-center bg-brand-cream"
                animate={
                  mobileOpen
                    ? { opacity: 0, scaleX: 0 }
                    : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-[1.5px] w-6 origin-center bg-brand-cream"
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -4.5 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: EASE }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Fullscreen Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[199] flex flex-col bg-[#023020]"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Decorative background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(245,245,235,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,245,235,0.03) 1px, transparent 1px)",
                backgroundSize: "4rem 4rem",
              }}
            />

            <div className="relative z-10 flex flex-1 flex-col items-start justify-center gap-1 px-8 sm:px-12">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => navigateToSlide(link.slideIndex)}
                  className="group flex items-baseline gap-4 py-3"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.06,
                    ease: EASE,
                  }}
                >
                  <span className="font-mono text-xs text-[#FDD017]/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-playfair text-4xl text-brand-cream transition-colors duration-200 group-hover:text-[#FDD017] sm:text-5xl">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Bottom info bar */}
            <motion.div
              className="relative z-10 flex items-center justify-between border-t border-[#F5F5EB]/10 px-8 py-6 sm:px-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5EB]/30">
                Northern Corporation Limited
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5EB]/30">
                Est. 1967
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
