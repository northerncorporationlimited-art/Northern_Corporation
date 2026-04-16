"use client";

import React, { useState } from "react";
import { DualScroll } from "@/components/sections/DualScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { HistoryFlow } from "@/components/sections/HistoryFlow";
import { Sustainability } from "@/components/sections/Sustainability";
import { WorkLife } from "@/components/sections/WorkLife";
import { ContactFooter } from "@/components/sections/ContactFooter";

export default function Home() {
  const [progress, setProgress] = useState(0);

  return (
    <div className="relative w-full bg-brand-green">
      {/* Fixed scroll progress marker — only visible during GSAP pin phase */}
      <ScrollProgress progress={progress} />

      {/* Phase 1: GSAP Pinned Dual Scroll SPA */}
      <div id="work">
        <DualScroll setProgress={setProgress} />
      </div>

      {/* Phase 2: Curtain Reveal sections.
          Desktop: sticky-section (from CSS) + z-index ladder = card-stack reveal.
          Mobile: normal document flow — no sticky to avoid overlap issues. */}

      {/* HistoryFlow — NOT sticky. Its content (~3000px with 10 milestones)
          is far taller than one viewport, so it scrolls naturally. */}
      <div id="about" className="relative z-10">
        <HistoryFlow />
      </div>

      {/* These sections fit within ~1 viewport each, so sticky curtain works */}
      <div id="impact" className="sticky-section z-20 relative">
        <Sustainability />
      </div>

      <div className="sticky-section z-30 relative">
        <WorkLife />
      </div>

      <div id="contact" className="sticky-section z-40 relative">
        <ContactFooter />
      </div>
    </div>
  );
}
