"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Preloader } from '@/components/ui/Preloader';
import { Navbar } from '@/components/layout/Navbar';
import { SmoothScroll } from '@/components/layout/SmoothScroll';

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Sub-pages use native browser scrolling — Lenis smooth wheel
  // is only needed on the home page where PresentationDeck handles
  // its own scroll logic. Sub-routes need overflow-y-auto and
  // standard wheel behavior for long content pages.
  const isHomePage = pathname === "/" || pathname === "/V2";

  return (
    <SmoothScroll enableSmooth={isHomePage}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      {!isLoading && <Navbar />}
      <main className="relative">{children}</main>
    </SmoothScroll>
  );
};
