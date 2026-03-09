"use client";

import { ArrowDown, Play, Shirt, Scissors, Baby, Moon } from "lucide-react";
import FadeInScroll from "@/components/animations/FadeInScroll";
import SectionDivider from "@/components/SectionDivider";
import FabricShowcase from "@/components/FabricShowcase";
import AboutUsContent from "@/components/AboutUsContent";
import CertificationGrid from "@/components/CertificationGrid";
import ContactInfo from "@/components/ContactInfo";

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════════
          SECTION 1 — HOME / HERO
      ═══════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center justify-center bg-northern-evergreen overflow-hidden"
      >
        {/* Subtle decorative gradients */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-northern-amber/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-northern-amber/5 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-northern-amber/[0.03] blur-3xl" />
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 pb-16 text-center">
          {/* Badge */}
          <FadeInScroll delay={0.1}>
            <span className="mb-6 inline-block rounded-full border border-northern-amber/30 bg-northern-amber/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-northern-amber">
              Est. 1987
            </span>
          </FadeInScroll>

          {/* Tagline */}
          <FadeInScroll delay={0.25}>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-northern-linen sm:text-5xl md:text-6xl lg:text-7xl">
              Knit to Fit{" "}
              <span className="text-northern-amber">Your World</span>
            </h1>
          </FadeInScroll>

          {/* Sub-text */}
          <FadeInScroll delay={0.4}>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-northern-linen/70 sm:text-lg">
              Established in 1987, Northern Corporation Ltd. has spent decades
              mastering the art of garment manufacturing.
            </p>
          </FadeInScroll>

          {/* CTA */}
          <FadeInScroll delay={0.55}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#what-we-do"
                className="inline-flex items-center gap-2 rounded-full bg-northern-amber px-8 py-3 text-sm font-semibold text-northern-evergreen shadow-lg shadow-northern-amber/20 transition-all hover:scale-105 hover:shadow-northern-amber/30"
              >
                Explore Our Work
                <ArrowDown size={16} />
              </a>
              <a
                href="#contact-us"
                className="inline-flex items-center gap-2 rounded-full border border-northern-linen/20 px-8 py-3 text-sm font-semibold text-northern-linen transition-all hover:border-northern-amber/40 hover:text-northern-amber"
              >
                Get in Touch
              </a>
            </div>
          </FadeInScroll>

          {/* Video / Media Placeholder */}
          <FadeInScroll delay={0.7}>
            <div className="mx-auto mt-16 w-full max-w-3xl">
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-2xl shadow-black/20">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-northern-amber/20 text-northern-amber backdrop-blur-sm transition-all hover:scale-110 hover:bg-northern-amber/30">
                    <Play size={28} fill="currentColor" />
                  </div>
                  <p className="text-sm font-medium text-northern-linen/50">
                    Corporate Video Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </FadeInScroll>
        </div>

        {/* "WRAP YOURSELF IN LUXURY" banner */}
        <div className="relative z-10 w-full bg-black/30 backdrop-blur-sm border-t border-b border-white/5 py-6 sm:py-8">
          <FadeInScroll>
            <p className="text-center text-2xl font-black uppercase tracking-[0.2em] text-northern-linen/30 sm:text-3xl md:text-4xl lg:text-5xl">
              Wrap Yourself in Luxury
            </p>
          </FadeInScroll>
        </div>

        {/* Our Long-Standing Buyers */}
        <div className="relative z-10 w-full bg-northern-evergreen/80 py-10 sm:py-12">
          <FadeInScroll>
            <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-northern-linen/40">
              Our Long-Standing Buyers
            </p>
          </FadeInScroll>
          <FadeInScroll delay={0.15}>
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-6 sm:gap-12">
              {[
                "H&M",
                "Zara",
                "C&A",
                "Primark",
                "Next",
                "S.Oliver",
              ].map((brand) => (
                <span
                  key={brand}
                  className="text-lg font-bold tracking-wider text-northern-linen/20 transition-colors hover:text-northern-linen/40 sm:text-xl"
                >
                  {brand}
                </span>
              ))}
            </div>
          </FadeInScroll>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <ArrowDown size={20} className="text-northern-linen/40" />
        </div>
      </section>

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
