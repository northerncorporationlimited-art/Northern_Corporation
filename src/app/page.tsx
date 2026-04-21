"use client";

import React from "react";
import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";
import { EcoImpact } from "@/components/sections/EcoImpact";
import { Sustainability } from "@/components/sections/Sustainability";
import { PresentationDeck } from "@/components/layout/PresentationDeck";

export default function Home() {
  return (
    <PresentationDeck>
      <Hero />
      <AboutUs />
      <EcoImpact />
      <div className="flex h-screen w-full items-center justify-center bg-[#023020]">
        <Sustainability />
      </div>
    </PresentationDeck>
  );
}
