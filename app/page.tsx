"use client";

import { Shirt, Scissors, Baby, Moon } from "lucide-react";
import FadeInScroll from "@/components/animations/FadeInScroll";
import SectionDivider from "@/components/SectionDivider";
import FabricShowcase from "@/components/FabricShowcase";
import AboutUsContent from "@/components/AboutUsContent";
import CertificationGrid from "@/components/CertificationGrid";
import ContactInfo from "@/components/ContactInfo";
import CinematicHero from "@/components/animations/CinematicHero";

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════════
          SECTION 1 — HOME / HERO (Cinematic Letterbox)
      ═══════════════════════════════════════════════ */}
      <CinematicHero />

      <SectionDivider />

      {/* ═══════════════════════════════════════════════
          SECTION 2 — WHAT WE DO
      ═══════════════════════════════════════════════ */}
      <section
        id="what-we-do"
        className="bg-northern-linen px-6 py-20 sm:py-28 overflow-hidden"
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center">
            <FadeInScroll>
              <span className="mb-4 inline-block rounded-full border border-northern-evergreen/20 bg-northern-evergreen/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-northern-evergreen">
                Our Expertise
              </span>
            </FadeInScroll>
            <FadeInScroll delay={0.15}>
              <h2 className="text-3xl font-bold text-northern-evergreen sm:text-4xl md:text-5xl">
                What We Do
              </h2>
            </FadeInScroll>
            <FadeInScroll delay={0.3}>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-northern-evergreen/60 sm:text-lg">
                From fiber to finish, we craft premium garments across four
                core categories — delivering quality that global brands trust.
              </p>
            </FadeInScroll>
          </div>

          {/* Categories */}
          <FadeInScroll delay={0.1}>
            <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              {[
                { icon: Shirt, label: "Knitwear" },
                { icon: Scissors, label: "Sportswear" },
                { icon: Baby, label: "Kids" },
                { icon: Moon, label: "Sleepwear" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-northern-evergreen/10 bg-white/60 p-5 shadow-sm transition-all hover:shadow-md hover:border-northern-evergreen/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-northern-evergreen/10 text-northern-evergreen">
                    <Icon size={24} />
                  </div>
                  <span className="text-sm font-semibold text-northern-evergreen">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </FadeInScroll>

          {/* Fabric Showcase */}
          <div className="mt-16 sm:mt-20">
            <FadeInScroll>
              <h3 className="mb-2 text-center text-xl font-bold text-northern-evergreen sm:text-2xl">
                Our Fabrics
              </h3>
              <p className="mx-auto mb-8 max-w-lg text-center text-sm text-northern-evergreen/50">
                Click any fabric to learn more about its properties and
                applications.
              </p>
            </FadeInScroll>
            <FadeInScroll delay={0.15}>
              <FabricShowcase />
            </FadeInScroll>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════
          SECTION 3 — ABOUT US
      ═══════════════════════════════════════════════ */}
      <section
        id="about-us"
        className="bg-white px-6 py-20 sm:py-28 overflow-hidden"
      >
        <AboutUsContent />
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════
          SECTION 4 — CERTIFICATION
      ═══════════════════════════════════════════════ */}
      <section
        id="certification"
        className="bg-northern-linen px-6 py-20 sm:py-28 overflow-hidden"
      >
        <CertificationGrid />
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════
          SECTION 5 — CONTACT US
      ═══════════════════════════════════════════════ */}
      <section
        id="contact-us"
        className="bg-northern-evergreen px-6 py-20 sm:py-28 overflow-hidden"
      >
        <ContactInfo />
      </section>
    </>
  );
}
