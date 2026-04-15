"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const portfolioSections = [
  { 
    id: 1, 
    type: "standard",
    title: "Knit to Fit Your World", 
    desc: "Northern Corporation Limited pioneers the intersection of bespoke craftsmanship and industrial scale.",
    image: "/images/hero_bg.jpg" 
  },
  { 
    id: 2, 
    type: "accordion",
    title: "Building the Foundation", 
    desc: "Discover our core pillars of operation.",
    image: "/images/factory.png" 
  },
  { 
    id: 3, 
    type: "stats",
    title: "Scale & Capability", 
    desc: "Equipped to handle global demand at uncompromising pace and quality.",
    stats: [
      { label: "Machines", value: "1,300+" },
      { label: "Employees", value: "3,000+" },
      { label: "Yearly Turnover", value: "$30M USD" }
    ],
    image: "/images/macro.png" 
  },
  { 
    id: 4, 
    type: "certs",
    title: "Products & Certs", 
    desc: "Premium knitwear, activewear, and sportswear backed by globally recognized sustainability records.",
    image: "/images/leed.png" 
  },
];

const SECTION_COUNT = portfolioSections.length;

const AboutAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const items = [
    { title: "Decades of Expertise", text: "With extensive experience in global garment manufacturing, we bring a wealth of operational knowledge to every stitch.", img: "/images/factory.png" },
    { title: "Uncompromising Quality", text: "Every thread is tested. Every seam is verified. Quality is our default setting.", img: "/images/macro.png" },
    { title: "Future-Focused Innovation", text: "We invest heavily in automated machinery and sustainable practices.", img: "/images/hero_bg.jpg" }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 350);
    return () => clearTimeout(timer);
  }, [openIndex]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-4">
      {items.map((item, idx) => (
        <div key={idx} className="border-b border-brand-cream/20 pb-4">
          <button 
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            className={`w-full text-left text-2xl md:text-4xl font-semibold transition-colors duration-300 ${openIndex === idx ? 'text-brand-gold' : 'text-brand-cream'}`}
          >
            {item.title}
          </button>
          <div 
            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-[500px] mt-6 opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <p className="text-brand-cream/80 mb-6 text-lg">{item.text}</p>
            <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden">
              <Image src={item.img} alt={item.title} fill className="object-cover" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const DualScroll = ({ setProgress }: { setProgress: (val: number) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const leftPanelsRef = useRef<HTMLDivElement[]>([]);
  const imageLayersRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (!containerRef.current || !leftColumnRef.current || !rightColumnRef.current) return;

    const mm = gsap.matchMedia();

    // ============================
    // DESKTOP — Clip-path wipes + text focus
    // ============================
    mm.add("(min-width: 768px)", () => {
      const panels = leftPanelsRef.current.filter(Boolean);
      const images = imageLayersRef.current.filter(Boolean);
      const panelCount = panels.length;
      const totalScrollHeight = panelCount * window.innerHeight;

      // Initial states: first image visible, rest clipped from bottom
      images.forEach((img, i) => {
        if (i === 0) {
          gsap.set(img, { clipPath: "inset(0% 0% 0% 0%)" });
        } else {
          gsap.set(img, { clipPath: "inset(100% 0% 0% 0%)" });
        }
      });

      // All text panels start dimmed except the first
      panels.forEach((panel, i) => {
        gsap.set(panel, { opacity: i === 0 ? 1 : 0.15 });
      });

      // Main pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalScrollHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });

      // For each transition between sections
      for (let i = 0; i < panelCount - 1; i++) {
        const segStart = i / (panelCount - 1);
        const segEnd = (i + 1) / (panelCount - 1);
        const segDuration = segEnd - segStart;

        // Left column: scroll the text upward by one panel height
        tl.fromTo(
          leftColumnRef.current,
          { y: `-${i * 100}vh` },
          { y: `-${(i + 1) * 100}vh`, ease: "none" },
          segStart
        );

        // Fade out current text panel, fade in next
        tl.to(panels[i], { opacity: 0.15, ease: "none" }, segStart);
        tl.fromTo(
          panels[i + 1],
          { opacity: 0.15 },
          { opacity: 1, ease: "none" },
          segStart + segDuration * 0.15
        );

        // Clip-path wipe: reveal next image from bottom to top
        if (images[i + 1]) {
          tl.to(
            images[i + 1],
            {
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power2.inOut",
              duration: segDuration,
            },
            segStart
          );
        }
      }

      return () => tl.kill();
    });

    // ============================
    // MOBILE — Standard vertical blocks
    // ============================
    mm.add("(max-width: 767px)", () => {
      // Clear any desktop transforms/clips
      gsap.set(leftColumnRef.current, { clearProps: "all" });
      gsap.set(rightColumnRef.current, { clearProps: "all" });
      leftPanelsRef.current.forEach((p) => p && gsap.set(p, { clearProps: "all" }));
      imageLayersRef.current.forEach((img) => img && gsap.set(img, { clearProps: "all" }));

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setProgress(self.progress),
      });

      const mobileSections = gsap.utils.toArray<HTMLElement>(".mobile-section");
      mobileSections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 55%",
            scrub: true,
          },
          opacity: 0,
          y: 50,
          ease: "none",
        });
      });

      return () => st.kill();
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="h-auto md:h-screen w-full flex flex-col md:flex-row overflow-hidden bg-brand-green text-brand-cream"
    >
      {/* ====== LEFT COLUMN — Text Panels ====== */}
      <div ref={leftColumnRef} className="left-column w-full md:w-1/2 flex flex-col">
        {portfolioSections.map((section, i) => (
          <div
            key={`left-${section.id}`}
            ref={(el) => { if (el) leftPanelsRef.current[i] = el; }}
            className="mobile-section min-h-screen w-full flex flex-col justify-center px-8 md:px-20 py-20 shrink-0 border-b border-brand-cream/10 md:border-none"
          >
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4 text-brand-cream">
              {section.title}
            </h2>
            <p className="text-brand-cream/80 text-xl max-w-md mb-8">{section.desc}</p>

            {section.type === "accordion" && (
              <div className="md:hidden w-full mt-4">
                <AboutAccordion />
              </div>
            )}

            {section.type === "stats" && (
              <div className="flex flex-col gap-8 mt-8">
                {section.stats?.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-4xl md:text-5xl font-light text-brand-gold">{stat.value}</span>
                    <span className="text-sm tracking-widest uppercase mt-2 opacity-60 text-brand-cream">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {section.type === "certs" && (
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="px-6 py-2 border border-brand-gold text-brand-gold rounded-full text-sm tracking-widest uppercase">Knitwear</span>
                <span className="px-6 py-2 border border-brand-gold text-brand-gold rounded-full text-sm tracking-widest uppercase">Sportswear</span>
                <span className="px-6 py-2 border border-brand-gold text-brand-gold rounded-full text-sm tracking-widest uppercase">Kids</span>
                <span className="px-6 py-2 border border-brand-gold text-brand-gold rounded-full text-sm tracking-widest uppercase">Sleepwear</span>
              </div>
            )}

            {/* Mobile inline images */}
            {section.type !== "accordion" && (
              <div className="md:hidden w-full h-[40vh] rounded-2xl overflow-hidden relative shadow-2xl mt-12 bg-black/20">
                <Image src={section.image} alt={section.title} fill className="object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ====== RIGHT COLUMN — Stacked Clip-Path Image Layers (Desktop Only) ====== */}
      <div
        ref={rightColumnRef}
        className="right-column hidden md:block w-1/2 h-screen relative overflow-hidden"
      >
        {portfolioSections.map((section, i) => (
          <div
            key={`img-${section.id}`}
            ref={(el) => { if (el) imageLayersRef.current[i] = el; }}
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ zIndex: i + 1, clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
          >
            {section.type === "accordion" ? (
              <div className="w-full h-full flex items-center justify-center bg-brand-green p-12">
                <AboutAccordion />
              </div>
            ) : (
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover"
                priority={i === 0}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
