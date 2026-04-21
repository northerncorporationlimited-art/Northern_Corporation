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
   Supports nested sub-sliders via context.
   ═══════════════════════════════════════════════ */

const LOCK_DURATION = 1200;
const SUB_LOCK_DURATION = 800;
const WHEEL_THRESHOLD = 40;
const SWIPE_THRESHOLD = 50;

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
    transition: { duration: 1.0, ease: EASE },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? 0 : "100%",
    scale: direction > 0 ? 0.85 : 1,
    opacity: direction > 0 ? 0.4 : 1,
    zIndex: direction > 0 ? 0 : 10,
    transition: { duration: 1.0, ease: EASE },
  }),
};

interface PresentationDeckProps {
  children: React.ReactNode[];
  labels?: string[];
}

export const PresentationDeck = ({ children, labels }: PresentationDeckProps) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const isAnimating = useRef(false);
  const touchStartY = useRef(0);
  const subSliderRef = useRef<{
    onNext: () => boolean;
    onPrev: () => boolean;
  } | null>(null);
  const lenis = useLenis();
  const childCount = Children.count(children);

  // Stop Lenis from intercepting scroll while deck is active
  useEffect(() => {
    if (lenis) {
      lenis.stop();
    }
    return () => {
      if (lenis) {
        lenis.start();
      }
    };
  }, [lenis]);

  const goTo = useCallback(
    (newDirection: number) => {
      if (isAnimating.current) return;

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

      // Full slide transition
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
    [index, childCount]
  );

  // Wheel listener — non-passive to preventDefault
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;

      if (e.deltaY > WHEEL_THRESHOLD) {
        goTo(1);
      } else if (e.deltaY < -WHEEL_THRESHOLD) {
        goTo(-1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [goTo]);

  // Touch listeners for mobile swipe
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;

      if (deltaY > SWIPE_THRESHOLD) {
        goTo(1);
      } else if (deltaY < -SWIPE_THRESHOLD) {
        goTo(-1);
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goTo]);

  // Keyboard navigation
  useEffect(() => {
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
  }, [goTo]);

  // Global navigation listener (for Navbar integration)
  useEffect(() => {
    const handleNav = (e: Event) => {
      const targetIndex = (e as CustomEvent).detail;
      if (
        typeof targetIndex === "number" &&
        targetIndex !== index &&
        targetIndex >= 0 &&
        targetIndex < childCount
      ) {
        setDirection(targetIndex > index ? 1 : -1);
        setIndex(targetIndex);
      }
    };
    window.addEventListener("NAVIGATE_SLIDE", handleNav);
    return () => window.removeEventListener("NAVIGATE_SLIDE", handleNav);
  }, [index, childCount]);

  const childArray = Children.toArray(children);

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

        {/* ── Frosted Glass Chapter Tracker ── */}
        <div className="pointer-events-auto absolute right-0 top-1/2 z-[100] -translate-y-1/2">
          <div className="flex flex-col gap-1 rounded-l-2xl border border-r-0 border-[#F5F5EB]/10 bg-[#023020]/80 px-4 py-5 backdrop-blur-xl lg:px-5 lg:py-6">
            {childArray.map((_, i) => {
              const isActive = index === i;
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (isAnimating.current || i === index) return;
                    isAnimating.current = true;
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                    setTimeout(() => {
                      isAnimating.current = false;
                    }, LOCK_DURATION);
                  }}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-right transition-all duration-300 ${
                    isActive
                      ? "bg-[#FDD017]/10"
                      : "hover:bg-[#F5F5EB]/5"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] transition-colors duration-300 ${
                      isActive ? "text-[#FDD017]" : "text-[#F5F5EB]/30"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col items-start">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.15em] transition-all duration-300 lg:text-[11px] ${
                        isActive
                          ? "font-bold text-[#FDD017]"
                          : "text-[#F5F5EB]/50 hover:text-[#F5F5EB]/80"
                      }`}
                    >
                      {labels?.[i] || ""}
                    </span>
                  </div>
                  <div
                    className={`ml-auto rounded-full transition-all duration-500 ${
                      isActive
                        ? "h-[2px] w-4 bg-[#FDD017]"
                        : "h-[1px] w-2 bg-[#F5F5EB]/20"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </PresentationContext.Provider>
  );
};
