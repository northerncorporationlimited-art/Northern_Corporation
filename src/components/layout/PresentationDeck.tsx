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
}

export const PresentationDeck = ({ children }: PresentationDeckProps) => {
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

        {/* ── Slide indicators — right edge ── */}
        <div
          aria-hidden="true"
          className="absolute right-6 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2 md:right-8"
        >
          {childArray.map((_, i) => (
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
              className={`h-2 w-2 rounded-full transition-all duration-500 ${
                i === index
                  ? "h-6 bg-[#FDD017]"
                  : "bg-[#F5F5EB]/30 hover:bg-[#F5F5EB]/60"
              }`}
            />
          ))}
        </div>
      </div>
    </PresentationContext.Provider>
  );
};
