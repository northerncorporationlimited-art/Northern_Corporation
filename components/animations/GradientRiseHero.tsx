"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

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
                {/* Background Image */}
                <motion.div
                    className="absolute inset-0"
                    style={{ y: imgY, opacity: imgOpacity }}
                >
                    <Image
                        src="/hero-factory.png"
                        alt="Northern Corporation factory"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover scale-105"
                    />
                </motion.div>

                {/* Gradient overlay — rises from bottom on load */}
                <motion.div
                    className="absolute inset-0"
                    initial={{ background: "linear-gradient(to top, rgba(2,48,32,1) 100%, transparent 100%)" }}
                    animate={{ background: "linear-gradient(to top, rgba(2,48,32,0.85) 0%, rgba(2,48,32,0.4) 50%, rgba(2,48,32,0.15) 100%)" }}
                    transition={{ duration: 2, ease }}
                />

                {/* Vignette edges */}
                <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.4)]" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                    {/* Badge */}
                    <motion.span
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2, ease }}
                        className="mb-6 inline-block rounded-full border border-northern-amber/25 bg-northern-amber/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-northern-amber backdrop-blur-sm"
                    >
                        Est. 1987 &nbsp;·&nbsp; Dhaka, Bangladesh
                    </motion.span>

                    {/* Headline with staggered fade */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 1.5, ease }}
                        className="text-4xl font-extrabold leading-[1.08] tracking-tight text-northern-linen sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        Knit to Fit{" "}
                        <span className="text-northern-amber">Your World</span>
                    </motion.h1>

                    {/* Sub-text */}
                    <motion.p
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 1.9, ease }}
                        className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-northern-linen/60 sm:text-lg"
                    >
                        Premium garment manufacturing — where decades of expertise meet
                        uncompromising quality.
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
                </div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8, duration: 1 }}
                    className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown size={16} className="text-northern-linen/30" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
