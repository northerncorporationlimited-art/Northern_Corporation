"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import RevealPremium from "@/components/animations/RevealPremium";
import SectionDivider from "@/components/SectionDivider";
import FabricShowcase from "@/components/FabricShowcase";
import AboutUsContent from "@/components/AboutUsContent";
import CertificationGrid from "@/components/CertificationGrid";
import ContactInfo from "@/components/ContactInfo";

/* ─── Staggered text reveal animation config ─── */
const heroEase = [0.76, 0, 0.24, 1] as const;

const wordVariants = {
    hidden: { y: "110%", opacity: 0, rotateX: 45 },
    visible: (i: number) => ({
        y: "0%",
        opacity: 1,
        rotateX: 0,
        transition: {
            duration: 1.2,
            delay: 0.6 + i * 0.12,
            ease: heroEase,
        },
    }),
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, delay, ease: heroEase },
    }),
};

export default function V2Page() {
    const heroWords = ["Knit", "to", "Fit", "Your", "World"];

    return (
        <>
            {/* ═══════════════════════════════════════════════
          PREMIUM HERO
      ═══════════════════════════════════════════════ */}
            <section
                id="home"
                className="relative flex min-h-screen flex-col items-center justify-center bg-northern-evergreen overflow-hidden"
            >
                {/* Parallax background elements */}
                <motion.div
                    className="pointer-events-none absolute inset-0"
                    initial={{ scale: 1.15 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.5, ease: heroEase }}
                >
                    <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-northern-amber/[0.04] blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-northern-amber/[0.03] blur-[100px]" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-northern-amber/20 to-transparent" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: heroEase }}
                    >
                        <span className="mb-8 inline-block text-xs font-medium uppercase tracking-[0.35em] text-northern-amber/70">
                            LEED Gold Certified &nbsp;●&nbsp; 3,000+ Employees &nbsp;●&nbsp;
                            Est. 1987
                        </span>
                    </motion.div>

                    {/* Staggered Word Reveal */}
                    <div className="overflow-hidden">
                        <h1 className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-5xl font-extrabold leading-[1.1] tracking-tight text-northern-linen sm:text-6xl md:text-7xl lg:text-8xl [perspective:1000px]">
                            {heroWords.map((word, i) => (
                                <span key={word + i} className="overflow-hidden inline-flex">
                                    <motion.span
                                        custom={i}
                                        variants={wordVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className={`inline-block ${word === "Your" || word === "World"
                                            ? "text-northern-amber"
                                            : ""
                                            }`}
                                        style={{ transformOrigin: "bottom center" }}
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                            ))}
                        </h1>
                    </div>

                    {/* Sub-text */}
                    <motion.p
                        custom={1.4}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-northern-linen/50 sm:text-lg"
                    >
                        Premium garment manufacturing since 1987 — where decades of
                        expertise meet uncompromising quality.
                    </motion.p>

                    {/* CTA */}
                    <motion.div
                        custom={1.7}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
                    >
                        <a
                            href="#what-we-do"
                            className="group inline-flex items-center gap-2 rounded-full bg-northern-amber px-8 py-3.5 text-sm font-semibold text-northern-evergreen shadow-lg shadow-northern-amber/20 transition-all hover:shadow-northern-amber/40 hover:scale-[1.03]"
                        >
                            Discover Our Craft
                            <ArrowDown
                                size={16}
                                className="transition-transform group-hover:translate-y-0.5"
                            />
                        </a>
                        <a
                            href="#contact-us"
                            className="inline-flex items-center gap-2 rounded-full border border-northern-linen/15 px-8 py-3.5 text-sm font-semibold text-northern-linen/70 transition-all hover:border-northern-amber/30 hover:text-northern-amber"
                        >
                            Get in Touch
                        </a>
                    </motion.div>
                </div>

                {/* Bottom line accent */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-northern-amber/15 to-transparent" />

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown size={18} className="text-northern-linen/25" />
                    </motion.div>
                </motion.div>
            </section>

            <SectionDivider />

            {/* ═══════════════════════════════════════════════
          WHAT WE DO — Premium
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

                    {/* Category Pills */}
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

                    {/* Fabric Showcase */}
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

            <SectionDivider />

            {/* ═══════════════════════════════════════════════
          ABOUT US — Premium (dark bg)
      ═══════════════════════════════════════════════ */}
            <section
                id="about-us"
                className="bg-northern-evergreen px-6 py-20 sm:py-28 overflow-hidden"
            >
                <RevealPremium>
                    <AboutUsContent dark />
                </RevealPremium>
            </section>

            <SectionDivider />

            {/* ═══════════════════════════════════════════════
          CERTIFICATION — Premium (near-black)
      ═══════════════════════════════════════════════ */}
            <section
                id="certification"
                className="bg-[#0a0a0a] px-6 py-20 sm:py-28 overflow-hidden"
            >
                <RevealPremium>
                    <CertificationGrid dark />
                </RevealPremium>
            </section>

            <SectionDivider />

            {/* ═══════════════════════════════════════════════
          CONTACT — Premium
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
