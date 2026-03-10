"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

/* ─────────────────────────────────────────────────────────
   § 1 — "THE OPENING SEQUENCE"
   A cinematic, film-title-card hero.
   ───────────────────────────────────────────────────────── */

function TypewriterText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
    const [displayed, setDisplayed] = useState("");
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let i = 0;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayed(text.slice(0, i + 1));
                i++;
                if (i >= text.length) clearInterval(interval);
            }, 70);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [isInView, text, delay]);

    return (
        <span ref={ref} className={className}>
            {displayed}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-[3px] h-[1em] bg-northern-amber ml-1 align-middle"
            />
        </span>
    );
}

export default function V4Page() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    // Parallax the background image as user scrolls away
    const heroImgScale = useTransform(heroScroll, [0, 1], [1.1, 1.25]);
    const heroImgOpacity = useTransform(heroScroll, [0.5, 1], [1, 0]);
    const heroContentOpacity = useTransform(heroScroll, [0.3, 0.6], [1, 0]);
    const heroContentY = useTransform(heroScroll, [0.3, 0.6], [0, -80]);

    return (
        <div className="bg-black text-white font-sans antialiased overflow-x-hidden">
            <Navbar />

            {/* ═══════════════════════════════════════════════════════════
                § 1 — THE OPENING SEQUENCE
            ═══════════════════════════════════════════════════════════ */}
            <section ref={heroRef} className="relative h-screen min-h-[800px] w-full bg-black overflow-hidden flex items-center justify-center">

                {/* Background Image (revealed by the slit) */}
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{ scale: heroImgScale, opacity: heroImgOpacity }}
                >
                    <Image
                        src="/hero-factory.png"
                        alt="Northern Corporation Factory Floor"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </motion.div>

                {/* The Amber Light Slit — expands on load */}
                <motion.div
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-transparent via-northern-amber/40 to-transparent pointer-events-none"
                    initial={{ height: 2, opacity: 1 }}
                    animate={{ height: "120vh", opacity: 0 }}
                    transition={{
                        height: { duration: 2, ease: [0.76, 0, 0.24, 1] as const, delay: 0.5 },
                        opacity: { duration: 1.5, ease: "easeOut", delay: 1.8 },
                    }}
                />

                {/* Dark overlay that fades to reveal the image */}
                <motion.div
                    className="absolute inset-0 z-[5] bg-black pointer-events-none"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] as const, delay: 0.8 }}
                />

                {/* Hero Content */}
                <motion.div
                    className="relative z-20 text-center px-8 flex flex-col items-center"
                    style={{ opacity: heroContentOpacity, y: heroContentY }}
                >
                    {/* Typewriter Title */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 2.5 }}
                    >
                        <h1 className="text-[clamp(2rem,5vw,5rem)] font-black tracking-[0.3em] uppercase leading-none mb-6">
                            <TypewriterText text="NORTHERN CORPORATION" delay={2800} />
                        </h1>
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        className="text-white/50 text-lg md:text-xl font-light tracking-widest uppercase max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 4.5 }}
                    >
                        Engineering the Fabric of Tomorrow — Since 1987
                    </motion.p>

                    {/* Thin amber divider */}
                    <motion.div
                        className="w-24 h-px bg-northern-amber/60 mt-10 mb-10"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] as const, delay: 5 }}
                    />

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 5.5 }}
                    >
                        <Link
                            href="#into-the-machine"
                            className="group inline-flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-white/80
                                       hover:border-northern-amber/60 hover:text-northern-amber transition-all duration-500"
                        >
                            <span>Begin the Journey</span>
                            <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 6, duration: 1 }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] uppercase tracking-[0.4em] text-northern-amber/40 font-medium">Scroll</span>
                        <svg className="w-4 h-4 text-northern-amber/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
                        </svg>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════════
                PLACEHOLDER: Remaining sections will be added iteratively.
            ═══════════════════════════════════════════════════════════ */}
            <section id="into-the-machine" className="h-screen bg-black flex items-center justify-center">
                <p className="text-white/20 text-sm uppercase tracking-widest">§ 2 — Into the Machine (Coming Next)</p>
            </section>
        </div>
    );
}
