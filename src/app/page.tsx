"use client";

import React, { useState } from "react";
import { DualScroll } from "@/components/sections/DualScroll";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Home() {
  const [progress, setProgress] = useState(0);

  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0a]">
      <ScrollProgress progress={progress} />
      <DualScroll setProgress={setProgress} />
    </div>
  );
}
