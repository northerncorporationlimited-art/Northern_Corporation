"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const portfolioSections = [
  { id: 1, title: "Alpha Series", color: "bg-zinc-800" },
  { id: 2, title: "Beta Protocol", color: "bg-zinc-700" },
  { id: 3, title: "Gamma System", color: "bg-zinc-800" },
  { id: 4, title: "Delta Core", color: "bg-zinc-700" },
];

export const DualScroll = ({ setProgress }: { setProgress: (val: number) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !leftColumnRef.current || !rightColumnRef.current) return;

    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const leftHeight = leftColumnRef.current!.scrollHeight;
      const rightHeight = rightColumnRef.current!.scrollHeight;
      const windowHeight = window.innerHeight;

      // Reset transforms
      gsap.set(leftColumnRef.current, { y: 0 });
      gsap.set(rightColumnRef.current, { y: -(rightHeight - windowHeight) });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${leftHeight}`, // matches the scrollable content length
          pin: true,
          scrub: 1, 
          onUpdate: (self) => setProgress(self.progress)
        }
      });

      tl.to(leftColumnRef.current, {
        y: -(leftHeight - windowHeight),
        ease: "none",
      }, 0).to(rightColumnRef.current, {
        y: 0,
        ease: "none",
      }, 0);

      return () => {
        tl.kill();
      };
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

      return () => {
        st.kill();
      };
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="h-auto md:h-screen w-full flex flex-col md:flex-row overflow-hidden bg-[#0a0a0a] text-white">
      {/* Left Column (Headings & Mobile Content) */}
      <div ref={leftColumnRef} className="left-column w-full md:w-1/2 flex flex-col">
        {portfolioSections.map((section) => (
          <div key={`left-${section.id}`} className="mobile-section min-h-screen w-full flex flex-col justify-center px-8 md:px-20 shrink-0 border-b border-white/5 md:border-none">
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4">{section.title}</h2>
            <p className="text-zinc-400 text-lg max-w-md mb-8 md:mb-0">
              A placeholder description for {section.title}, showcasing the elegant dual scroll effect and responsive layout degradation.
            </p>
            {/* Mobile inline visual block */}
            <div className={`md:hidden w-full h-[50vh] rounded-2xl ${section.color} shadow-2xl flex items-center justify-center text-xl opacity-80 mt-8`}>
              Mobile Image {section.id}
            </div>
          </div>
        ))}
      </div>

      {/* Right Column (Desktop Visyaks Only) */}
      <div ref={rightColumnRef} className="right-column hidden md:flex w-1/2 flex-col h-auto">
        {[...portfolioSections].reverse().map((section) => (
          <div key={`right-${section.id}`} className="h-screen w-full flex items-center justify-center p-8 shrink-0">
            <div className={`w-full h-full rounded-2xl ${section.color} shadow-2xl flex items-center justify-center text-3xl font-light tracking-wide opacity-80`}>
              Image Placeholder {section.id}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
