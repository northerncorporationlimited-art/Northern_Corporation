"use client";

import React from "react";
import { Hero } from "@/components/sections/Hero";
import { Sustainability } from "@/components/sections/Sustainability";

export default function Home() {
  return (
    <div className="relative w-full bg-brand-green">
      <Hero />

      {/* Certifications Section */}
      <div id="certifications">
        <Sustainability />
      </div>
    </div>
  );
}
