"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  createContext,
  Children,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";

/* ═══════════════════════════════════════════════
   PRESENTATION DECK — Fullpage Slide Architecture
   Desktop: snapping slides. Mobile: normal scroll.
   Broadcasts SLIDE_CHANGED for navbar integration.
   ═══════════════════════════════════════════════ */

const LOCK_DURATION = 1200;
const SUB_LOCK_DURATION = 800;
const WHEEL_THRESHOLD = 40;
const SWIPE_THRESHOLD = 50;
const MOBILE_BREAKPOINT = 1024;

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Context for sub-slider registration ── */
export const PresentationContext = createContext<{
  registerSubSlider: (
    onNext: () => boolean,
    onPrev: () => boolean
  ) => void;
  unregisterSubSlider: () => void;
} | null>(null);

const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : 0,
    scale: direction > 0 ? 1 : 0.85,
    opacity: direction > 0 ? 1 : 0.4,
    zIndex: direction > 0 ? 10 : 0,
  }),
  center: {
    y: 0,
    scale: 1,
    opacity: 1,
    zIndex: 5,
    transition: { duration: 0.6, ease: EASE },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? 0 : "100%",
    scale: direction > 0 ? 0.85 : 1,
    opacity: direction > 0 ? 0.4 : 1,
    zIndex: direction > 0 ? 0 : 10,
    transition: { duration: 0.6, ease: EASE },
  }),
};

interface PresentationDeckProps {
  children: React.ReactNode[];
  labels?: string[];
}

export const PresentationDeck = ({ children, labels }: PresentationDeckProps) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);
  const subSliderRef = useRef<{
    onNext: () => boolean;
    onPrev: () => boolean;
  } | null>(null);
  const lenis = useLenis();
  const childCount = Children.count(children);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Read ?slide=N from URL (when navigating back from sub-pages)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slideParam = params.get("slide");
    if (slideParam !== null) {
      const target = parseInt(slideParam, 10);
      if (!isNaN(target) && target >= 0 && target < childCount) {
        // Small delay to let the page render first
        setTimeout(() => {
          if (window.innerWidth < MOBILE_BREAKPOINT) {
            const sections = document.querySelectorAll("[data-slide]");
            if (target === 0) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              sections[target]?.scrollIntoView({ behavior: "smooth" });
            }
          } else {
            setDirection(target > 0 ? 1 : -1);
            setIndex(target);
          }
        }, 300);
      }
      // Clean the URL
      window.history.replaceState({}, "", "/");
    }
  }, [childCount]);

  // Broadcast SLIDE_CHANGED for Navbar integration
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("SLIDE_CHANGED", { detail: index })
    );
  }, [index]);

  // Stop Lenis on desktop only
  useEffect(() => {
    if (!lenis) return;
    if (isMobile) {
      lenis.start();
    } else {
      lenis.stop();
    }
    return () => {
      if (lenis) lenis.start();
    };
  }, [lenis, isMobile]);

  const goTo = useCallback(
    (newDirection: number) => {
      if (isAnimating.current || isMobile) return;

      // Check sub-slider first
      if (newDirection > 0 && subSliderRef.current?.onNext()) {
        isAnimating.current = true;
        setTimeout(() => {
          isAnimating.current = false;
        }, SUB_LOCK_DURATION);
        return;
      }
      if (newDirection < 0 && subSliderRef.current?.onPrev()) {
        isAnimating.current = true;
        setTimeout(() => {
          isAnimating.current = false;
        }, SUB_LOCK_DURATION);
        return;
      }

      if (newDirection > 0 && index < childCount - 1) {
        isAnimating.current = true;
        setDirection(1);
        setIndex((i) => i + 1);
        setTimeout(() => {
          isAnimating.current = false;
        }, LOCK_DURATION);
      } else if (newDirection < 0 && index > 0) {
        isAnimating.current = true;
        setDirection(-1);
        setIndex((i) => i - 1);
        setTimeout(() => {
          isAnimating.current = false;
        }, LOCK_DURATION);
      }
    },
    [index, childCount, isMobile]
  );

  // Wheel listener — desktop only
  useEffect(() => {
    if (isMobile) return;
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }
      if (e.deltaY > WHEEL_THRESHOLD) {
        e.preventDefault();
        goTo(1);
      } else if (e.deltaY < -WHEEL_THRESHOLD) {
        e.preventDefault();
        goTo(-1);
      }
      // Sub-threshold wheel events pass through for overflow scrolling
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [goTo, isMobile]);

  // Touch listeners — desktop only
  useEffect(() => {
    if (isMobile) return;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (deltaY > SWIPE_THRESHOLD) goTo(1);
      else if (deltaY < -SWIPE_THRESHOLD) goTo(-1);
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goTo, isMobile]);

  // Keyboard navigation — desktop only
  useEffect(() => {
    if (isMobile) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goTo(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goTo(-1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goTo, isMobile]);

  // Global navigation listener (for Navbar integration)
  useEffect(() => {
    const handleNav = (e: Event) => {
      const targetIndex = (e as CustomEvent).detail;
      if (
        typeof targetIndex !== "number" ||
        targetIndex < 0 ||
        targetIndex >= childCount
      )
        return;

      if (isMobile) {
        // Mobile: always scroll to the target section
        const sections = document.querySelectorAll("[data-slide]");
        if (targetIndex === 0) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          sections[targetIndex]?.scrollIntoView({ behavior: "smooth" });
        }
      } else if (targetIndex !== index) {
        // Desktop: animate slide transition
        setDirection(targetIndex > index ? 1 : -1);
        setIndex(targetIndex);
      }
    };
    window.addEventListener("NAVIGATE_SLIDE", handleNav);
    return () => window.removeEventListener("NAVIGATE_SLIDE", handleNav);
  }, [index, childCount, isMobile]);

  const childArray = Children.toArray(children);

  // ── MOBILE: Normal scrollable stack ──
  if (isMobile) {
    return (
      <PresentationContext.Provider
        value={{
          registerSubSlider: () => {},
          unregisterSubSlider: () => {},
        }}
      >
        <div className="flex flex-col">
          {childArray.map((child, i) => (
            <div key={i} data-slide={labels?.[i] || i}>
              {child}
            </div>
          ))}
        </div>
      </PresentationContext.Provider>
    );
  }

  // ── DESKTOP: Snapping presentation deck ──
  return (
    <PresentationContext.Provider
      value={{
        registerSubSlider: (onNext, onPrev) => {
          subSliderRef.current = { onNext, onPrev };
        },
        unregisterSubSlider: () => {
          subSliderRef.current = null;
        },
      }}
    >
      <div className="relative h-screen w-full overflow-hidden bg-[#023020]">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 h-screen w-full overflow-hidden"
          >
            {childArray[index]}
          </motion.div>
        </AnimatePresence>

        {/* ── Vertical Progress Rail — left edge (clickable) ── */}
        <div className="absolute left-6 top-1/2 z-[100] hidden -translate-y-1/2 flex-col items-center gap-0 lg:left-10 lg:flex">
          {/* Track line with clickable segments */}
          <div className="relative h-48 w-[1px] bg-[#F5F5EB]/10">
            {/* Animated gold fill — grows based on slide progress */}
            <motion.div
              className="absolute left-0 top-0 w-full bg-gradient-to-b from-[#FDD017] to-[#FDD017]/30"
              animate={{ height: `${((index + 1) / childCount) * 100}%` }}
              transition={{ duration: 0.8, ease: EASE }}
            />
            {/* Glowing marker dot */}
            <motion.div
              className="pointer-events-none absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#FDD017]"
              animate={{ top: `${(index / Math.max(childCount - 1, 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: EASE }}
              style={{ boxShadow: "0 0 8px #FDD017, 0 0 20px rgba(253,208,23,0.3)" }}
            />
            {/* Clickable hit areas for each slide */}
            {Array.from({ length: childCount }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to ${labels?.[i] || `slide ${i + 1}`}`}
                className="absolute left-1/2 h-3 w-8 -translate-x-1/2 cursor-pointer opacity-0"
                style={{ top: `${(i / Math.max(childCount - 1, 1)) * 100}%`, transform: "translate(-50%, -50%)" }}
                onClick={() => {
                  if (i !== index) {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }
                }}
              />
            ))}
          </div>
          {/* Section label — slides up on change */}
          <div className="mt-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={labels?.[index] || index}
                className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-[#F5F5EB]/25 -rotate-90 origin-center"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {labels?.[index] || `Slide ${index + 1}`}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Horizontal Shimmer Wipe — cinematic transition line ── */}
        <AnimatePresence>
          <motion.div
            key={`shimmer-${index}`}
            className="pointer-events-none absolute left-0 z-[99] h-[1px] w-full"
            style={{
              top: direction > 0 ? "100%" : "0%",
              background: "linear-gradient(90deg, transparent 0%, #FDD017 30%, #FDD017 70%, transparent 100%)",
            }}
            initial={{ top: direction > 0 ? "100%" : "0%", opacity: 0.8, scaleX: 0 }}
            animate={{ top: "50%", opacity: 0, scaleX: 1 }}
            transition={{ duration: 1.0, ease: EASE }}
          />
        </AnimatePresence>


      </div>
    </PresentationContext.Provider>
  );
};
