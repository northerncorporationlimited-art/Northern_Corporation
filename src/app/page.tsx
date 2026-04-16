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

      {/* Phase 2: Sticky Stack Curtain Reveal — each section slides over the previous */}
      <div id="about" className="sticky top-0 z-10 min-h-screen bg-brand-green">
        <HistoryFlow />
      </div>

      <div id="impact" className="sticky top-0 z-20 min-h-screen bg-brand-cream">
        <Sustainability />
      </div>

      <div className="sticky top-0 z-30 min-h-screen bg-brand-green">
        <WorkLife />
      </div>

      <div id="contact" className="sticky top-0 z-40 min-h-screen bg-[#010f0a]">
        <ContactFooter />
      </div>
    </div>
  );
}
