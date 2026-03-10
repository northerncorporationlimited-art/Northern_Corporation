"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import TrustBar from "@/components/TrustBar";
import InfiniteMarquee from "@/components/InfiniteMarquee";

const ease = [0.76, 0, 0.24, 1] as const;

export default function GradientRiseHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Image fades + shifts up on scroll
    const imgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const imgOpacity = useTransform(scrollYProgress, [0.4, 0.9], [1, 0]);

    return (
        <div ref={containerRef} className="relative h-[160vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* ── Ken Burns Background Image ── */}
                <motion.div
                    className="absolute inset-0 overflow-hidden"
                    style={{ y: imgY, opacity: imgOpacity }}
                >
                    <Image
                        src="/hero-factory.png"
                        alt="Northern Corporation factory"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover animate-ken-burns origin-center"
                    />
                </motion.div>

                {/* ── Sophisticated multi-layer overlay ── */}
                {/* Layer 1: Radial vignette — darker edges, lighter center */}
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2.5, ease }}
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(2,48,32,0.25) 0%, rgba(2,48,32,0.65) 100%)",
                    }}
                />
                {/* Layer 2: Top-to-bottom linear depth gradient */}
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
                    transition={{ duration: 2, ease }}
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
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center pb-16">
                    {/* Badge */}
                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2, ease }}
                        className="mb-6 inline-block rounded-full border border-northern-amber/25 bg-northern-amber/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-northern-amber backdrop-blur-sm"
                    >
                        Est. 1987 &nbsp;·&nbsp; Dhaka, Bangladesh
                    </motion.span>

                    {/* Luxury banner */}
                    <motion.div
                        initial={{ opacity: 0, scaleX: 0.6 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 1, delay: 1.4, ease }}
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
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1.5, ease }}
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
                        transition={{ duration: 0.8, delay: 1.8, ease }}
                        className="mx-auto mt-6 flex items-center gap-3"
                    >
                        <span className="h-px w-8 bg-gradient-to-r from-transparent to-northern-amber/50 sm:w-12" />
                        <span className="h-1.5 w-1.5 rotate-45 bg-northern-amber/60" />
                        <span className="h-px w-8 bg-gradient-to-l from-transparent to-northern-amber/50 sm:w-12" />
                    </motion.div>

                    {/* Sub-text — updated with client copy */}
                    <motion.p
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 1.9, ease }}
                        className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-northern-linen/55 sm:text-lg"
                    >
                        Engineering comfort, durability, and style since 1987.
                        Bridging the gap between classic reliability and modern
                        performance.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 2.2, ease }}
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
                    <TrustBar />
                </div>

                {/* Scroll hint — pushed above marquee */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8, duration: 1 }}
                    className="absolute bottom-14 left-1/2 z-20 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <ArrowDown
                            size={16}
                            className="text-northern-linen/30"
                        />
                    </motion.div>
                </motion.div>

                {/* ── Infinite Client Marquee — anchored at bottom ── */}
                <InfiniteMarquee />
            </div>
        </div>
    );
}
