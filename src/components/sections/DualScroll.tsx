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
      { label: "Production/Yr", value: "30M Pcs" }
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

  useGSAP(() => {
    if (!containerRef.current || !leftColumnRef.current || !rightColumnRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Dynamic calculations for refresh safety
      const getLeftHeight = () => leftColumnRef.current!.scrollHeight - window.innerHeight;
      const getRightHeight = () => rightColumnRef.current!.scrollHeight - window.innerHeight;

      // Start position for the right side
      gsap.set(rightColumnRef.current, { y: () => -getRightHeight() });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${leftColumnRef.current!.scrollHeight}`,
          pin: true,
          scrub: 1, 
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress)
        }
      });

      tl.fromTo(leftColumnRef.current, 
        { y: 0 },
        { y: () => -getLeftHeight(), ease: "none" }, 0
      ).fromTo(rightColumnRef.current, 
        { y: () => -getRightHeight() },
        { y: 0, ease: "none" }, 0
      );

      return () => tl.kill();
    });

    mm.add("(max-width: 767px)", () => {
      gsap.set([leftColumnRef.current, rightColumnRef.current], { clearProps: "all" });

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setProgress(self.progress)
      });

      const mobileSections = gsap.utils.toArray<HTMLElement>(".mobile-section");
      mobileSections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 55%",
            scrub: true
          },
          opacity: 0,
          y: 50,
          ease: "none"
        });
      });

      return () => st.kill();
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-auto md:h-screen w-full flex flex-col md:flex-row overflow-hidden bg-brand-green text-brand-cream">
      {/* Left Column (Main Text Strategy) */}
      <div ref={leftColumnRef} className="left-column w-full md:w-1/2 flex flex-col">
        {portfolioSections.map((section) => (
          <div key={`left-${section.id}`} className="mobile-section min-h-screen w-full flex flex-col justify-center px-8 md:px-20 py-20 shrink-0 border-b border-brand-cream/10 md:border-none">
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4 text-brand-cream">{section.title}</h2>
            <p className="text-brand-cream/80 text-xl max-w-md mb-8">
              {section.desc}
            </p>
            
            {section.type === "accordion" && (
              <div className="md:hidden w-full mt-4">
                <AboutAccordion />
              </div>
            )}

            {section.type === "stats" && (
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 mt-8">
                {section.stats?.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-5xl font-light text-brand-gold">{stat.value}</span>
                    <span className="text-sm tracking-widest uppercase mt-2 opacity-60 text-brand-cream">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}

            {section.type === "certs" && (
              <div className="mt-8 flex flex-wrap gap-4">
                 <span className="px-6 py-2 border border-brand-gold text-brand-gold rounded-full text-sm tracking-widest uppercase">Knitwear</span>
                 <span className="px-6 py-2 border border-brand-gold text-brand-gold rounded-full text-sm tracking-widest uppercase">Sportswear</span>
              </div>
            )}

            {/* Mobile inline visual blocks */}
            {section.type !== "accordion" && (
              <div className="md:hidden w-full h-[40vh] rounded-2xl overflow-hidden relative shadow-2xl mt-12 bg-black/20">
                 <Image src={section.image} alt={section.title} fill className="object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Column (Visual/Interactive Split) */}
      <div ref={rightColumnRef} className="right-column hidden md:flex w-1/2 flex-col h-auto bg-black/10">
        {[...portfolioSections].reverse().map((section) => (
          <div key={`right-${section.id}`} className="min-h-screen w-full flex flex-col items-center justify-center p-12 shrink-0 relative overflow-hidden">
             
            {section.type !== "accordion" && (
              <Image src={section.image} alt={section.title} fill className="object-cover opacity-90" />
            )}

            {section.type === "accordion" && (
              <div className="w-full max-w-2xl h-full flex items-center justify-center z-10 p-12">
                 <AboutAccordion />
              </div>
            )}

          </div>
        ))}
      </div>
    </section>
  );
};
