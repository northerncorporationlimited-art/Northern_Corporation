"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

/* ═══════════════════════════════════════════════
   NAVBAR — Condensed Smart Navigation
   Adaptive background, active tracking, bottom sheet mobile
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/* Condensed link set — Home removed (logo does it), Contact removed (CTA does it) */
const NAV_LINKS = [
  { label: "About", slideIndex: 1 },
  { label: "Sustainability", slideIndex: 2 },
  { label: "Products", slideIndex: 3 },
  { label: "Global Reach", slideIndex: 4 },
  { label: "Our People", slideIndex: 5 },
  { label: "Certifications", slideIndex: 6 },
];

/* All links for mobile — includes contact */
const ALL_LINKS = [
  { label: "Home", slideIndex: 0 },
  ...NAV_LINKS,
  { label: "Contact", slideIndex: 7 },
];

/* Slides with dark backgrounds — navbar can be transparent */
const DARK_SLIDES = new Set([0, 2, 4, 5, 7]);

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "";

  // Listen for SLIDE_CHANGED from PresentationDeck
  useEffect(() => {
    const handleSlideChange = (e: Event) => {
      const idx = (e as CustomEvent).detail;
      if (typeof idx === "number") setActiveSlide(idx);
    };
    window.addEventListener("SLIDE_CHANGED", handleSlideChange);
    return () => window.removeEventListener("SLIDE_CHANGED", handleSlideChange);
  }, []);

  // Mobile scroll spy
  useEffect(() => {
    const slides = document.querySelectorAll("[data-slide]");
    if (slides.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(slides).indexOf(entry.target as Element);
            if (idx >= 0) setActiveSlide(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

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
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navigateToSlide = useCallback(
    (slideIndex: number) => {
      setMobileOpen(false);

      if (!isHomePage) {
        // On a sub-page — navigate home with slide param
        router.push(`/?slide=${slideIndex}`);
        return;
      }

      // On homepage — dispatch event directly
      const dispatch = () => {
        window.dispatchEvent(
          new CustomEvent("NAVIGATE_SLIDE", { detail: slideIndex })
        );
      };
      if (mobileOpen) {
        setTimeout(dispatch, 400);
      } else {
        dispatch();
      }
    },
    [mobileOpen, isHomePage, router]
  );

  const isLightSlide = !DARK_SLIDES.has(activeSlide);

  return (
    <>
      <motion.nav
        className="fixed left-0 top-0 z-[200] w-full"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div
          className={`w-full transition-all duration-500 ${
            isLightSlide
              ? "bg-[#023020]/90 shadow-lg shadow-black/10 backdrop-blur-md"
              : "bg-gradient-to-b from-[#023020]/60 via-[#023020]/20 to-transparent"
          }`}
        >
          <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 md:px-12">
            {/* ── Logo ── */}
            <button
              onClick={() => navigateToSlide(0)}
              className={`group flex items-center transition-all duration-300 ${
                mobileOpen ? "relative z-[197]" : "relative z-[201]"
              }`}
            >
              <Logo className="h-14 w-14 text-brand-cream transition-transform duration-300 group-hover:scale-110" />
              <span className="-ml-3 hidden text-sm font-semibold uppercase tracking-[0.2em] text-brand-cream/80 sm:block">
                Northern Corp.
              </span>
            </button>

            {/* ── Desktop Links (6 condensed) ── */}
            <div
              className="hidden items-center gap-0 lg:flex"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSlide === link.slideIndex;
                return (
                  <button
                    key={link.label}
                    onClick={() => navigateToSlide(link.slideIndex)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    className="relative px-4 py-2 xl:px-5"
                  >
                    <span
                      className={`relative z-10 text-[12px] font-medium uppercase tracking-widest transition-colors duration-200 xl:text-[13px] ${
                        isActive
                          ? "text-[#FDD017]"
                          : "text-brand-cream/70 hover:text-brand-cream"
                      }`}
                    >
                      {link.label}
                    </span>

                    {/* Hover pill */}
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

                    {/* Active gold underline */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 h-[2px] w-[60%] -translate-x-1/2 rounded-full bg-[#FDD017]"
                        layoutId="navActiveBar"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* ── Contact CTA (Desktop) ── */}
            <button
              onClick={() => navigateToSlide(7)}
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
                  mobileOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }
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
                  mobileOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: EASE }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Bottom Sheet ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[198] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Bottom Sheet */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-[199] flex max-h-[75vh] flex-col overflow-hidden rounded-t-3xl border-t border-[#F5F5EB]/10 bg-[#023020]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pb-2 pt-4">
                <div className="h-1 w-10 rounded-full bg-[#F5F5EB]/20" />
              </div>

              {/* Links */}
              <div className="flex-1 overflow-y-auto px-6 pb-4 sm:px-8">
                {ALL_LINKS.map((link, i) => {
                  const isActive = activeSlide === link.slideIndex;
                  return (
                    <motion.button
                      key={link.label}
                      onClick={() => navigateToSlide(link.slideIndex)}
                      className={`flex w-full items-center gap-4 border-b border-[#F5F5EB]/5 py-4 text-left transition-colors ${
                        isActive ? "border-[#FDD017]/20" : ""
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.05 + i * 0.04,
                        ease: EASE,
                      }}
                    >
                      <span
                        className={`font-mono text-[10px] ${
                          isActive ? "text-[#FDD017]" : "text-[#F5F5EB]/25"
                        }`}
                      >
                        {String(link.slideIndex + 1).padStart(2, "0")}
                      </span>

                      {/* Active indicator dot */}
                      <div
                        className={`h-1.5 w-1.5 rounded-full transition-all ${
                          isActive
                            ? "bg-[#FDD017] shadow-[0_0_6px_#FDD017]"
                            : "bg-transparent"
                        }`}
                      />

                      <span
                        className={`font-playfair text-xl transition-colors sm:text-2xl ${
                          isActive
                            ? "text-[#FDD017]"
                            : "text-brand-cream/80 hover:text-brand-cream"
                        }`}
                      >
                        {link.label}
                      </span>

                      {isActive && (
                        <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-[#FDD017]/50">
                          Current
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Bottom info */}
              <div className="flex items-center justify-between border-t border-[#F5F5EB]/10 px-6 py-4 sm:px-8">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#F5F5EB]/25">
                  Northern Corporation Ltd.
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#F5F5EB]/25">
                  Est. 1967
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
