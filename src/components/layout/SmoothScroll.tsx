"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<InstanceType<typeof import("lenis").default> | null>(null);

  useEffect(() => {
    // Synchronise Lenis interpolated scroll position with GSAP ScrollTrigger.
    // On every Lenis tick we push the current scroll value into ScrollTrigger
    // so pin-spacing, scrub timelines, and start/end calculations stay aligned
    // with the smoothed (lerp) scroll position instead of the raw native one.

    function update(time: number) {
      lenisRef.current?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // prevent GSAP from throttling frames

    // Tell ScrollTrigger to read scroll from the Lenis-smoothed wrapper
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (lenisRef.current) {
          if (arguments.length && value !== undefined) {
            lenisRef.current.scrollTo(value, { immediate: true });
          }
          return lenisRef.current.scroll;
        }
        return window.scrollY;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: document.documentElement });

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={(instance) => {
        if (instance) {
          lenisRef.current = (instance as unknown as { lenis: InstanceType<typeof import("lenis").default> }).lenis;
        }
      }}
      options={{
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
};
