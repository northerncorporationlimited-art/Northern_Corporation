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
      <DualScroll setProgress={setProgress} />

      {/* Phase 2: Natural vertical scroll — Pin releases, page flows normally */}
      <HistoryFlow />
      <Sustainability />
      <WorkLife />
      <ContactFooter />
    </div>
  );
}
