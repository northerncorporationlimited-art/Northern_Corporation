"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
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

/* ─────────────────────────────────────────────────────────
   § 2 — "INTO THE MACHINE"
   Multi-layer parallax depth scene.
   ───────────────────────────────────────────────────────── */

const machineStats = [
    { value: "3,000+", label: "Craftsmen", align: "left" as const },
    { value: "12M+", label: "Garments / Year", align: "right" as const },
    { value: "40+", label: "Export Nations", align: "left" as const },
];

function Section2IntoTheMachine() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Layer speeds: back moves slow, front moves fast
    const backY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
    const midY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
    const frontY = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

    // Section title fades in early
    const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
    const titleY = useTransform(scrollYProgress, [0, 0.15], [60, 0]);

    // Stats stagger in as you scroll deeper
    const stat1Opacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
    const stat1Y = useTransform(scrollYProgress, [0.2, 0.35], [80, 0]);
    const stat2Opacity = useTransform(scrollYProgress, [0.35, 0.5], [0, 1]);
    const stat2Y = useTransform(scrollYProgress, [0.35, 0.5], [80, 0]);
    const stat3Opacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
    const stat3Y = useTransform(scrollYProgress, [0.5, 0.65], [80, 0]);

    const statAnimations = [
        { opacity: stat1Opacity, y: stat1Y },
        { opacity: stat2Opacity, y: stat2Y },
        { opacity: stat3Opacity, y: stat3Y },
    ];

    // Final narrative text at the bottom
    const narrativeOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
    const narrativeY = useTransform(scrollYProgress, [0.7, 0.85], [40, 0]);

    return (
        <section id="into-the-machine" ref={containerRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Layer 1 — Back: Blurred warm factory, slow */}
                <motion.div className="absolute inset-0 z-0" style={{ y: backY }}>
                    <Image
                        src="/hero-factory.png"
                        alt="Factory ambient"
                        fill
                        className="object-cover blur-sm opacity-30 saturate-150 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
                </motion.div>

                {/* Layer 2 — Mid: Crisp machinery, medium speed */}
                <motion.div className="absolute inset-0 z-10 flex items-center justify-center" style={{ y: midY }}>
                    <div className="relative w-[70vw] max-w-3xl aspect-[4/3] rounded-xl overflow-hidden shadow-2xl shadow-northern-amber/10 border border-white/5">
                        <Image
                            src="/hero-macro.png"
                            alt="Machinery close-up"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                    </div>
                </motion.div>

                {/* Section Title — floats above everything */}
                <motion.div
                    className="absolute top-[12vh] left-0 w-full z-30 text-center pointer-events-none"
                    style={{ opacity: titleOpacity, y: titleY }}
                >
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-northern-amber/60">Chapter II</span>
                    <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-tighter leading-none mt-2">
                        Into the <span className="font-serif font-light italic text-northern-amber/80">Machine</span>
                    </h2>
                </motion.div>

                {/* Layer 3 — Front: Stat blocks floating at fast speed */}
                <motion.div className="absolute inset-0 z-20 pointer-events-none" style={{ y: frontY }}>
                    <div className="relative h-full max-w-[1400px] mx-auto px-8">
                        {machineStats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className={`absolute ${stat.align === "left" ? "left-8 md:left-16" : "right-8 md:right-16"}`}
                                style={{
                                    top: `${30 + i * 25}%`,
                                    opacity: statAnimations[i].opacity,
                                    y: statAnimations[i].y,
                                }}
                            >
                                <div className={`${stat.align === "right" ? "text-right" : "text-left"}`}>
                                    <div className="text-[clamp(3rem,8vw,7rem)] font-black leading-none tracking-tighter text-white">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs font-bold uppercase tracking-[0.3em] text-northern-amber/70 mt-2">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Narrative close */}
                <motion.div
                    className="absolute bottom-[10vh] left-0 w-full z-30 text-center px-8 pointer-events-none"
                    style={{ opacity: narrativeOpacity, y: narrativeY }}
                >
                    <p className="font-serif italic text-[clamp(1.2rem,3vw,2rem)] text-white/60 max-w-2xl mx-auto leading-relaxed">
                        &ldquo;Where precision engineering meets raw organic fiber —
                        the silence of the floor is what strikes you first.&rdquo;
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────
   § 3 — "THE PRODUCT LINE"
   Horizontal scroll gallery with progress bar.
   ───────────────────────────────────────────────────────── */

const products = [
    {
        title: "Fine Gauge Knitwear",
        desc: "Ultra-lightweight, precision-knit fabrics engineered for luxury layering and next-to-skin softness.",
        img: "/v4/products/fine_gauge.png",
        tags: ["Premium", "Lightweight", "Technical"],
    },
    {
        title: "Heavy Knit Construction",
        desc: "Robust, structured textiles designed for outerwear and cold-weather performance garments.",
        img: "/v4/products/heavy_knit.png",
        tags: ["Durable", "Outerwear", "Structured"],
    },
    {
        title: "Seamless Engineering",
        desc: "Zero-stitch, body-mapped garments offering unparalleled comfort and a second-skin fit.",
        img: "/v4/products/seamless.png",
        tags: ["Innovative", "Body-Mapped", "Comfort"],
    },
];

function Section3ProductLine() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
    const xTranslate = useTransform(smoothProgress, [0, 1], ["0vw", "-200vw"]);

    // Progress bar width
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="product-line" ref={containerRef} className="relative h-[300vh] bg-[#0a0a0a]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

                {/* Top bar: title + progress */}
                <div className="relative z-20 px-8 md:px-16 pt-12 pb-8">
                    <div className="flex items-end justify-between mb-6">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-northern-amber/60 block mb-2">Chapter III</span>
                            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-tighter leading-none">
                                The Product <span className="font-serif font-light italic text-northern-amber/80">Line</span>
                            </h2>
                        </div>
                        <span className="text-xs uppercase tracking-[0.3em] text-white/30 hidden md:block">Scroll to explore →</span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-px bg-white/10 w-full">
                        <motion.div className="h-full bg-northern-amber origin-left" style={{ width: progressWidth }} />
                    </div>
                </div>

                {/* Horizontal track */}
                <div className="flex-1 flex items-center">
                    <motion.div
                        className="flex gap-8 md:gap-16 px-8 md:px-16 h-[70vh]"
                        style={{ x: xTranslate }}
                    >
                        {products.map((product, i) => (
                            <div key={i} className="w-[85vw] md:w-[65vw] flex-shrink-0 group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 flex flex-col md:flex-row">
                                {/* Image side */}
                                <div className="relative w-full md:w-3/5 h-1/2 md:h-full">
                                    <Image
                                        src={product.img}
                                        alt={product.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/80 hidden md:block" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent md:hidden" />
                                </div>

                                {/* Info side */}
                                <div className="relative z-10 w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                                    <span className="font-serif italic text-northern-amber text-3xl mb-4">0{i + 1}</span>
                                    <h3 className="text-2xl md:text-4xl font-black tracking-tight leading-none mb-6">{product.title}</h3>
                                    <p className="text-white/50 text-base leading-relaxed mb-8">{product.desc}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map((tag) => (
                                            <span key={tag} className="px-3 py-1 rounded-full border border-northern-amber/20 bg-northern-amber/5 text-xs font-bold uppercase tracking-wider text-northern-amber/70">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Amber separator between cards (visible on desktop) */}
                                {i < products.length - 1 && (
                                    <div className="absolute right-0 top-[15%] bottom-[15%] w-px bg-northern-amber/20 hidden md:block" />
                                )}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
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
                § 2 — INTO THE MACHINE
                Multi-layer parallax depth scene with floating stats.
            ═══════════════════════════════════════════════════════════ */}
            <Section2IntoTheMachine />

            {/* ═══════════════════════════════════════════════════════════
                § 3 — THE PRODUCT LINE
                Horizontal scroll gallery with progress bar.
            ═══════════════════════════════════════════════════════════ */}
            <Section3ProductLine />

            {/* ═══════════════════════════════════════════════════════════
                PLACEHOLDER: § 4+ coming next.
            ═══════════════════════════════════════════════════════════ */}
            <section id="fabric-lab" className="h-screen bg-[#FAF9F6] flex items-center justify-center">
                <p className="text-black/20 text-sm uppercase tracking-widest">§ 4 — The Fabric Lab (Coming Next)</p>
            </section>
        </div>
    );
}
