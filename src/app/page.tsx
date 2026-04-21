"use client";

import React from "react";
import { Hero } from "@/components/sections/Hero";
import { EcoImpact } from "@/components/sections/EcoImpact";
import { Sustainability } from "@/components/sections/Sustainability";

export default function Home() {
  return (
    <div className="relative w-full bg-brand-green">
      <Hero />

      <EcoImpact />

      {/* Certifications Section */}
      <div id="certifications">
        <Sustainability />
      </div>
    </div>
  );
}
