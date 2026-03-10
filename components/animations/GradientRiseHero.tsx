"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import TrustBar from "@/components/TrustBar";
import InfiniteMarquee from "@/components/InfiniteMarquee";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function GradientRiseHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Image fades + shifts up early on scroll
    const imgY = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const imgOpacity = useTransform(scrollYProgress, [0.2, 0.8], [1, 0]);

    // Foreground text smoothly flies up and fades out
    const textY = useTransform(scrollYProgress, [0, 0.6], [0, -150]);
    const textOpacity = useTransform(scrollYProgress, [0.1, 0.5], [1, 0]);

    // Marquee fades out later
    const marqueeOpacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]);

    // Scroll hint disappears immediately upon scrolling
    const hintOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-[160vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* ── Ken Burns Background Image ── */}
                <motion.div
                    className="absolute inset-0 overflow-hidden"
                    style={{ y: imgY, opacity: imgOpacity }}
                >
                    <Image
                        src="/v1-hero-factory.jpg"
                        alt="Northern Corporation factory"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover animate-ken-burns origin-center"
                    />
                </motion.div>

                {/* ── Sophisticated multi-layer overlay ── */}
                {/* Layer 1: Radial vignette */}
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease }}
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(2,48,32,0.25) 0%, rgba(2,48,32,0.65) 100%)",
                    }}
                />
                {/* Layer 2: Linear depth gradient */}
                <motion.div
                    className="absolute inset-0"
                    initial={{
                        background:
                            "linear-gradient(to bottom, rgba(2,48,32,1) 100%, transparent 100%)",
                    }}
                    animate={{
                        background:
                            "linear-gradient(to bottom, rgba(2,48,32,0.3) 0%, rgba(2,48,32,0.15) 30%, rgba(2,48,32,0.35) 60%, rgba(2,48,32,0.7) 100%)",
                    }}
                    transition={{ duration: 1.5, ease }}
                />
                {/* Layer 3: Subtle warm bottom glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(to top, rgba(253,208,23,0.04) 0%, transparent 40%)",
                    }}
                />

                {/* Elegant vignette edges */}
                <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.35)]" />

                {/* ── Content ── */}
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center pb-16"
                >
                    {/* Badge */}
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2, ease }}
                        className="mb-6 inline-block rounded-full border border-northern-amber/25 bg-northern-amber/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-northern-amber backdrop-blur-sm"
                    >
                        Est. 1987 &nbsp;·&nbsp; Dhaka, Bangladesh
                    </motion.span>

                    {/* Luxury banner */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0.8 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.3, ease }}
                        className="mb-5 flex items-center gap-4"
                    >
                        <span className="h-px w-10 bg-northern-amber/40 sm:w-16" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-northern-linen/50 sm:text-xs sm:tracking-[0.4em]">
                            Wrap Yourself in Luxury
                        </span>
                        <span className="h-px w-10 bg-northern-amber/40 sm:w-16" />
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease }}
                        className="text-4xl font-extrabold leading-[1.05] tracking-tight text-northern-linen sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        Knit to Fit{" "}
                        <span className="bg-gradient-to-r from-northern-amber to-amber-300 bg-clip-text text-transparent">
                            Your World
                        </span>
                    </motion.h1>

                    {/* Decorative separator */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.6, ease }}
                        className="mx-auto mt-6 flex items-center gap-3"
                    >
                        <span className="h-px w-8 bg-gradient-to-r from-transparent to-northern-amber/50 sm:w-12" />
                        <span className="h-1.5 w-1.5 rotate-45 bg-northern-amber/60" />
                        <span className="h-px w-8 bg-gradient-to-l from-transparent to-northern-amber/50 sm:w-12" />
                    </motion.div>

                    {/* Sub-text */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7, ease }}
                        className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-northern-linen/55 sm:text-lg"
                    >
                        Engineering comfort, durability, and style since 1987.
                        Bridging the gap between classic reliability and modern
                        performance.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8, ease }}
                        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
                    >
                        <a
                            href="#what-we-do"
                            className="group inline-flex items-center gap-2 rounded-full bg-northern-amber px-8 py-3 text-sm font-semibold text-northern-evergreen shadow-lg shadow-northern-amber/20 transition-all hover:scale-[1.03] hover:shadow-northern-amber/30"
                        >
                            Explore Our Work
                            <ArrowDown
                                size={16}
                                className="transition-transform group-hover:translate-y-0.5"
                            />
                        </a>
                        <a
                            href="#contact-us"
                            className="inline-flex items-center gap-2 rounded-full border border-northern-linen/20 px-8 py-3 text-sm font-semibold text-northern-linen/80 transition-all hover:border-northern-amber/40 hover:text-northern-amber"
                        >
                            Get in Touch
                        </a>
                    </motion.div>

                    {/* ── Glassmorphism Trust Bar ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0, ease }}
                        className="mt-16 w-full max-w-4xl"
                    >
                        <TrustBar />
                    </motion.div>
                </motion.div>

                {/* Scroll hint */}
                <motion.div
                    style={{ opacity: hintOpacity }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-14 left-1/2 z-20 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown size={16} className="text-northern-linen/30" />
                    </motion.div>
                </motion.div>

                {/* ── Infinite Client Marquee ── */}
                <motion.div style={{ opacity: marqueeOpacity }}>
                    <InfiniteMarquee />
                </motion.div>
            </div>
        </div>
    );
}
