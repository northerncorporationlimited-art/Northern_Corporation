"use client";

import RevealPremium from "@/components/animations/RevealPremium";
import FabricShowcase from "@/components/FabricShowcase";
import AboutUsContent from "@/components/AboutUsContent";
import CertificationGrid from "@/components/CertificationGrid";
import ContactInfo from "@/components/ContactInfo";
import SplitCurtainHero from "@/components/animations/SplitCurtainHero";

export default function V2Page() {
    return (
        <>
            {/* ═══════════════════════════════════════════════
          HERO — Split Curtain Reveal
      ═══════════════════════════════════════════════ */}
            <SplitCurtainHero />

            {/* ═══════════════════════════════════════════════
          WHAT WE DO
      ═══════════════════════════════════════════════ */}
            <section
                id="what-we-do"
                className="bg-[#0a0a0a] px-6 py-20 sm:py-28 overflow-hidden"
            >
                <div className="mx-auto max-w-6xl">
                    <RevealPremium>
                        <div className="text-center">
                            <span className="mb-4 inline-block text-xs font-medium uppercase tracking-[0.3em] text-northern-amber/60">
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

                    <RevealPremium>
                        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-3">
                            {["Knitwear", "Sportswear", "Kids", "Sleepwear"].map((cat) => (
                                <span
                                    key={cat}
                                    className="rounded-full border border-northern-amber/20 bg-northern-amber/5 px-5 py-2 text-sm font-semibold text-northern-amber/80 transition-colors hover:bg-northern-amber/10"
                                >
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </RevealPremium>

                    <div className="mt-16 sm:mt-20">
                        <RevealPremium>
                            <h3 className="mb-2 text-center text-xl font-bold text-northern-linen sm:text-2xl">
                                Our Fabrics
                            </h3>
                            <p className="mx-auto mb-8 max-w-lg text-center text-sm text-northern-linen/35">
                                Click any fabric to explore its properties and applications.
                            </p>
                        </RevealPremium>
                        <RevealPremium>
                            <FabricShowcase />
                        </RevealPremium>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════
          ABOUT US
      ═══════════════════════════════════════════════ */}
            <section
                id="about-us"
                className="bg-northern-evergreen px-6 py-20 sm:py-28 overflow-hidden"
            >
                <RevealPremium>
                    <AboutUsContent dark />
                </RevealPremium>
            </section>

            {/* ═══════════════════════════════════════════════
          CERTIFICATION
      ═══════════════════════════════════════════════ */}
            <section
                id="certification"
                className="bg-[#0a0a0a] px-6 py-20 sm:py-28 overflow-hidden"
            >
                <RevealPremium>
                    <CertificationGrid dark />
                </RevealPremium>
            </section>

            {/* ═══════════════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════════════ */}
            <section
                id="contact-us"
                className="bg-northern-evergreen px-6 py-20 sm:py-28 overflow-hidden"
            >
                <RevealPremium>
                    <ContactInfo />
                </RevealPremium>
            </section>
        </>
    );
}
