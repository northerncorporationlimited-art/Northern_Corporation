"use client";

import React from "react";
import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";
import { EcoImpact } from "@/components/sections/EcoImpact";
import { Sustainability } from "@/components/sections/Sustainability";

export default function Home() {
  return (
    <div className="relative w-full bg-[#023020]">
      {/* Curtain Reveal — each section stacks and covers the previous */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
        <Hero />
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <AboutUs />
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.4)]">
        <EcoImpact />
      </div>

      <div className="relative w-full z-40 bg-[#023020]">
        <Sustainability />
      </div>
    </div>
  );
}
