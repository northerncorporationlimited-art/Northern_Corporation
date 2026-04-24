"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  // Synchronise Lenis RAF with GSAP ticker for frame-perfect alignment.
  // Lenis in `root` mode already intercepts document scroll — GSAP reads
  // window.scrollY naturally, which Lenis updates at the interpolated position.
  // No scrollerProxy needed — that was double-proxying and causing conflicts.

  useLenis(() => {
    // This callback fires on every Lenis scroll event.
    // We manually call ScrollTrigger.update() to keep GSAP in sync
    // with the interpolated scroll position.
    ScrollTrigger.update();
  });

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    // Ensure ScrollTrigger refreshes after Lenis mounts and takes over scroll
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
        autoResize: true,
      }}
    >
      {children}
    </ReactLenis>
  );
};

// Re-export useLenis so other components can access the Lenis instance
export { useLenis };
