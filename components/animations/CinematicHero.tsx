"use client";

import { useRef } from "react";
import Image from "next/image";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import { ArrowDown } from "lucide-react";

const heroEase = [0.76, 0, 0.24, 1] as const;

export default function CinematicHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [typewriterDone, setTypewriterDone] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Letterbox bars retract on scroll
    const barHeight = useTransform(scrollYProgress, [0, 0.4], ["30%", "0%"]);

    // Ken Burns slow zoom
    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

    // Image fades + blurs as user scrolls past
    const imgOpacity = useTransform(scrollYProgress, [0.5, 1], [1, 0.2]);

    // Text reveal triggers when bars are ~40% open
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (v > 0.15 && !typewriterDone) setTypewriterDone(true);
    });

    const tagline = "Knit to Fit Your World";

    return (
        <div ref={containerRef} className="relative h-[200vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Hero Image with Ken Burns */}
                <motion.div
                    className="absolute inset-0"
                    style={{ scale: imgScale, opacity: imgOpacity }}
                >
                    <Image
                        src="/hero-factory.png"
                        alt="Northern Corporation factory floor"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    {/* Dark overlay for text contrast */}
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>

                {/* Letterbox Bars */}
                <motion.div
                    className="absolute top-0 left-0 right-0 z-20 bg-black"
                    style={{ height: barHeight }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 right-0 z-20 bg-black"
                    style={{ height: barHeight }}
                />

                {/* Content overlay */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                    {/* Badge */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: typewriterDone ? 1 : 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-6 inline-block rounded-full border border-northern-amber/30 bg-northern-amber/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-northern-amber backdrop-blur-sm"
                    >
                        Est. 1987
                    </motion.span>

                    {/* Typewriter Tagline */}
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-northern-linen sm:text-5xl md:text-6xl lg:text-7xl">
                        {typewriterDone ? (
                            tagline.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.04, delay: i * 0.05 }}
                                    className={
                                        i >= tagline.indexOf("Your")
                                            ? "text-northern-amber"
                                            : ""
                                    }
                                >
                                    {char}
                                </motion.span>
                            ))
                        ) : (
                            <span className="opacity-0">{tagline}</span>
                        )}
                        <motion.span
                            animate={{ opacity: typewriterDone ? [1, 0] : 0 }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                repeatType: "reverse",
                                delay: tagline.length * 0.05 + 0.3,
                            }}
                            className="text-northern-amber"
                        >
                            |
                        </motion.span>
                    </h1>

                    {/* Sub-text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: typewriterDone ? 1 : 0,
                            y: typewriterDone ? 0 : 20,
                        }}
                        transition={{ duration: 0.8, delay: tagline.length * 0.05 + 0.5 }}
                        className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-northern-linen/60 sm:text-lg"
                    >
                        Decades of garment mastery from Dhaka, Bangladesh — trusted by the
                        world&apos;s leading fashion brands.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: typewriterDone ? 1 : 0,
                            y: typewriterDone ? 0 : 20,
                        }}
                        transition={{ duration: 0.8, delay: tagline.length * 0.05 + 0.8 }}
                        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
                    >
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
                    </motion.div>
                </div>

                {/* Scroll hint */}
                <div className="absolute bottom-12 left-1/2 z-30 -translate-x-1/2">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                    >
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-northern-linen/30">
                                Scroll to reveal
                            </span>
                            <ArrowDown size={16} className="text-northern-linen/30" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
