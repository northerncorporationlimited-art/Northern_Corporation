"use client";

import { Shirt, Scissors, Baby, Moon } from "lucide-react";
import MouseParallaxHero from "@/components/animations/MouseParallaxHero";
import StickyCurtainSection from "@/components/animations/StickyCurtainSection";
import RevealPremium from "@/components/animations/RevealPremium";
import FabricShowcase from "@/components/FabricShowcase";
import AboutUsContent from "@/components/AboutUsContent";
import CertificationGrid from "@/components/CertificationGrid";
import ContactInfo from "@/components/ContactInfo";

export default function V3Page() {
    return (
        <div className="bg-[#0a0a0a]">
            {/* ═══════════════════════════════════════════════
          HERO — Mouse Parallax
      ═══════════════════════════════════════════════ */}
            <StickyCurtainSection>
                <MouseParallaxHero />
            </StickyCurtainSection>

            {/* ═══════════════════════════════════════════════
          WHAT WE DO
      ═══════════════════════════════════════════════ */}
            <StickyCurtainSection className="bg-northern-evergreen flex items-center">
                <div className="mx-auto max-w-6xl px-6 py-20 sm:py-28 w-full">
                    <RevealPremium>
                        <div className="text-center">
                            <span className="mb-4 inline-block text-[10px] font-medium uppercase tracking-[0.35em] text-northern-amber/50 sm:text-xs">
                                Our Expertise
                            </span>
                            <h2 className="text-3xl font-bold text-northern-linen sm:text-4xl md:text-5xl">
                                What We Do
                            </h2>
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-northern-linen/40 sm:text-lg">
                                From fiber to finish, we craft premium garments across four core
                                categories — delivering quality that global brands trust.
                            </p>
                        </div>
                    </RevealPremium>

                    {/* Category Pills */}
                    <RevealPremium>
                        <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-4">
                            {[
                                { icon: Shirt, label: "Knitwear" },
                                { icon: Scissors, label: "Sportswear" },
                                { icon: Baby, label: "Kids" },
                                { icon: Moon, label: "Sleepwear" },
                            ].map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-2.5 rounded-full border border-northern-amber/15 bg-northern-amber/5 px-5 py-2.5 transition-colors hover:bg-northern-amber/10"
                                >
                                    <Icon size={16} className="text-northern-amber/70" />
                                    <span className="text-sm font-semibold text-northern-amber/80">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </RevealPremium>

                    {/* Fabric Showcase */}
                    <div className="mt-16 sm:mt-20">
                        <RevealPremium>
                            <h3 className="mb-2 text-center text-xl font-bold text-northern-linen sm:text-2xl">
                                Our Fabrics
                            </h3>
                            <p className="mx-auto mb-8 max-w-lg text-center text-sm text-northern-linen/30">
                                Click any fabric to explore its properties and applications.
                            </p>
                        </RevealPremium>
                        <RevealPremium>
                            <FabricShowcase />
                        </RevealPremium>
                    </div>
                </div>
            </StickyCurtainSection>

            {/* ═══════════════════════════════════════════════
          ABOUT US
      ═══════════════════════════════════════════════ */}
            <StickyCurtainSection className="bg-[#0a0a0a] flex items-center">
                <div className="w-full px-6 py-20 sm:py-28">
                    <RevealPremium>
                        <AboutUsContent dark />
                    </RevealPremium>
                </div>
            </StickyCurtainSection>

            {/* ═══════════════════════════════════════════════
          CERTIFICATION
      ═══════════════════════════════════════════════ */}
            <StickyCurtainSection className="bg-northern-evergreen flex items-center">
                <div className="w-full px-6 py-20 sm:py-28">
                    <RevealPremium>
                        <CertificationGrid dark />
                    </RevealPremium>
                </div>
            </StickyCurtainSection>

            {/* ═══════════════════════════════════════════════
          CONTACT — final section, no curtain needed
      ═══════════════════════════════════════════════ */}
            <section
                id="contact-us"
                className="relative bg-[#0a0a0a] px-6 py-20 sm:py-28"
                style={{ zIndex: 2 }}
            >
                <RevealPremium>
                    <ContactInfo />
                </RevealPremium>
            </section>
        </div>
    );
}
