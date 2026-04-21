"use client";

import React from "react";
import { Sustainability } from "@/components/sections/Sustainability";

export default function Home() {
  return (
    <div className="relative w-full bg-brand-green">
      {/* Certifications Section */}
      <div id="certifications">
        <Sustainability />
      </div>
    </div>
  );
}
