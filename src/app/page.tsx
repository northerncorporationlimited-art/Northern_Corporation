"use client";

import React from "react";
import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";
import { EcoImpact } from "@/components/sections/EcoImpact";
import { Products } from "@/components/sections/Products";
import { GlobalReach } from "@/components/sections/GlobalReach";
import { Facilities } from "@/components/sections/Facilities";
import { Sustainability } from "@/components/sections/Sustainability";
import { PresentationDeck } from "@/components/layout/PresentationDeck";

const LABELS = [
  "Hero",
  "About Us",
  "Eco Impact",
  "Products",
  "Global Reach",
  "Facilities",
  "Certifications",
];

export default function Home() {
  return (
    <PresentationDeck labels={LABELS}>
      <Hero />
      <AboutUs />
      <EcoImpact />
      <Products />
      <GlobalReach />
      <Facilities />
      <div className="flex h-screen w-full items-center justify-center bg-[#023020]">
        <Sustainability />
      </div>
    </PresentationDeck>
  );
}
