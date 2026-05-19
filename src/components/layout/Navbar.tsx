"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, ALL_LINKS, DARK_SLIDES } from "@/data/slides";

/* ═══════════════════════════════════════════════
   NAVBAR — Cinematic Navigation System
   Pathname-aware background, responsive logo,
   fullscreen Awwwards-level overlay menu.
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];
const MENU_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Auto-close menu on resize to desktop
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1360px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navigateToSlide = useCallback(
    (slideIndex: number) => {
      setMenuOpen(false);

      if (!isHomePage) {
        // On a sub-page — navigate home with slide param
        router.push(`/?slide=${slideIndex}`);
        return;
      }

      // On homepage — dispatch event directly
      const dispatch = () => {
        window.dispatchEvent(new CustomEvent("NAVIGATE_SLIDE", { detail: slideIndex }));
      };
      if (menuOpen) {
        setTimeout(dispatch, 500);
      } else {
        dispatch();
      }
    },
    [menuOpen, isHomePage, router]
  );

  /* ── Navbar background logic ──
     On home (/): adapt based on current slide (dark vs light)
     On sub-pages: always solid dark green for legibility */
  const isLightSlide = isHomePage && !DARK_SLIDES.has(activeSlide);
  const navBg = !isHomePage
    ? "bg-[#023020] shadow-lg shadow-black/10 border-b border-[#F5F5EB]/10 backdrop-blur-md"
    : isLightSlide
      ? "bg-[#023020]/90 shadow-lg shadow-black/10 backdrop-blur-md"
      : "bg-gradient-to-b from-[#023020]/60 via-[#023020]/20 to-transparent";

  return (
    <>
      <motion.nav
        className="fixed left-0 top-0 z-[200] w-full"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className={`w-full transition-all duration-500 ${navBg}`}>
          <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-4 sm:px-6 md:px-12">
            {/* ── Logo ── */}
            <button
              id="nav-logo"
              onClick={() => navigateToSlide(0)}
              aria-label="Navigate to home"
              className="group relative z-[201] flex items-center gap-2 transition-all duration-300"
            >
              <Image
                src="/logo-symbol.svg"
                alt="Northern Corporation"
                width={48}
                height={48}
                className="h-8 w-auto brightness-0 invert transition-transform duration-300 group-hover:scale-110 md:h-10 lg:h-12"
                priority
              />
              <span className="hidden text-base font-black uppercase tracking-wider text-brand-cream/90 transition-colors duration-300 group-hover:text-brand-cream sm:block md:text-lg">
                Northern Corp.
              </span>
            </button>

            {/* ── Desktop Links (6 condensed) ── */}
            <div
              className="hidden items-center gap-0 desktop:flex"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSlide === link.slideIndex;
                return (
                  <button
                    key={link.label}
                    id={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => navigateToSlide(link.slideIndex)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    className="relative px-4 py-2 xl:px-5"
                  >
                    <span
                      className={`relative z-10 text-[12px] font-medium uppercase tracking-widest transition-colors duration-200 xl:text-[13px] ${
                        isActive ? "text-[#FDD017]" : "text-brand-cream/70 hover:text-brand-cream"
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
              id="nav-contact-cta"
              onClick={() => navigateToSlide(ALL_LINKS.length - 1)}
              aria-label="Navigate to contact section"
              className="hidden rounded-full border border-[#FDD017]/30 bg-[#FDD017]/10 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#FDD017] backdrop-blur-sm transition-all duration-300 hover:border-[#FDD017]/60 hover:bg-[#FDD017]/20 desktop:block"
            >
              Contact Us
            </button>

            {/* ── Hamburger — 48px touch target ── */}
            <button
              id="nav-mobile-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-[201] flex h-12 w-12 flex-col items-center justify-center gap-1.5 desktop:hidden"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block h-[2px] w-7 origin-center rounded-full bg-brand-cream"
                animate={menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: MENU_EASE }}
              />
              <motion.span
                className="block h-[2px] w-7 origin-center rounded-full bg-brand-cream"
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block h-[2px] w-7 origin-center rounded-full bg-brand-cream"
                animate={menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: MENU_EASE }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ═══════════════════════════════════════════════
           CINEMATIC FULLSCREEN MENU OVERLAY
           Awwwards-level curtain with staggered reveals,
           massive typography, and B2B contact footer.
         ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[199] flex flex-col overflow-y-auto bg-[#023020]/[0.97] backdrop-blur-2xl"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: MENU_EASE }}
          >
            {/* ── Gold accent line — sweeps across on open ── */}
            <motion.div
              className="pointer-events-none absolute left-0 top-[72px] h-[1px] w-full bg-gradient-to-r from-transparent via-[#FDD017] to-transparent"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.4 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: MENU_EASE }}
            />

            {/* ── Navigation Links ── */}
            <nav className="flex flex-1 flex-col justify-center px-6 pt-24 sm:px-10 md:px-16 lg:px-24">
              {ALL_LINKS.map((link, i) => {
                const isActive = activeSlide === link.slideIndex;
                return (
                  <motion.button
                    key={link.label}
                    onClick={() => navigateToSlide(link.slideIndex)}
                    className="group relative flex items-baseline gap-4 border-b border-[#F5F5EB]/[0.04] py-3 text-left sm:gap-6 sm:py-4 md:py-5"
                    initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 + i * 0.06,
                      ease: MENU_EASE,
                    }}
                  >
                    {/* Index number */}
                    <span
                      className={`font-mono text-xs transition-colors duration-300 sm:text-sm ${
                        isActive ? "text-[#FDD017]" : "text-[#F5F5EB]/20"
                      }`}
                    >
                      {String(link.slideIndex + 1).padStart(2, "0")}
                    </span>

                    {/* Link text */}
                    <span
                      className={`font-playfair text-4xl leading-[1.1] transition-all duration-300 sm:text-5xl md:text-6xl lg:text-8xl ${
                        isActive
                          ? "text-[#FDD017]"
                          : "text-[#F5F5EB]/80 group-hover:text-[#FDD017] group-hover:translate-x-3"
                      }`}
                    >
                      {link.label}
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <motion.span
                        className="ml-auto hidden font-mono text-[9px] uppercase tracking-[0.25em] text-[#FDD017]/40 sm:block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        Current
                      </motion.span>
                    )}

                    {/* Hover shimmer line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[1px] w-full origin-left bg-gradient-to-r from-[#FDD017]/30 to-transparent"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4, ease: MENU_EASE }}
                    />
                  </motion.button>
                );
              })}
            </nav>

            {/* ── B2B Contact Footer ── */}
            <motion.div
              className="shrink-0 border-t border-[#F5F5EB]/[0.06] px-6 pb-8 pt-6 sm:px-10 md:px-16 lg:px-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: MENU_EASE }}
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                {/* HQ Info */}
                <div className="flex flex-col gap-1">
                  <span className="mb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#FDD017]/50">
                    Corporate Headquarters
                  </span>
                  <span className="font-sans text-sm leading-relaxed text-[#F5F5EB]/50">
                    Baridhara Diplomatic Zone
                  </span>
                  <span className="font-sans text-sm leading-relaxed text-[#F5F5EB]/50">
                    Dhaka — 1212, Bangladesh
                  </span>
                </div>

                {/* Direct Inquiries */}
                <div className="flex flex-col gap-1 sm:items-end">
                  <span className="mb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-[#FDD017]/50">
                    Direct Inquiries
                  </span>
                  <a
                    href="mailto:Socials@ntg.com.bd"
                    className="font-sans text-sm text-[#F5F5EB]/50 transition-colors duration-300 hover:text-[#FDD017]"
                  >
                    Socials@ntg.com.bd
                  </a>
                  <a
                    href="tel:+8809606548147"
                    className="font-sans text-sm text-[#F5F5EB]/50 transition-colors duration-300 hover:text-[#FDD017]"
                  >
                    +880 9606 548147
                  </a>
                </div>

                {/* Branding */}
                <div className="flex flex-col sm:items-end">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#F5F5EB]/15">
                    Northern Corporation Ltd.
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#F5F5EB]/15">
                    Est. 1967 • Bangladesh
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
