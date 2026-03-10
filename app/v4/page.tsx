"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactInfo from "@/components/ContactInfo";

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

/* ─────────────────────────────────────────────────────────
   § 4 — "THE FABRIC LAB"
   Interactive swatch explorer with full-screen expand.
   ───────────────────────────────────────────────────────── */

const fabricSwatches = [
    { name: "French Terry", img: "/fabrics/french-terry.png", desc: "Soft, looped-back knit ideal for sweatshirts and loungewear.", uses: ["Hoodies", "Sweatshirts", "Joggers"] },
    { name: "Interlock", img: "/fabrics/interlock.png", desc: "Double-knit with smooth finish on both sides. Luxurious hand feel.", uses: ["T-Shirts", "Dresses", "Baby Apparel"] },
    { name: "Rib Fabric", img: "/fabrics/rib.png", desc: "Stretchy knit with vertical ridges, excellent elasticity.", uses: ["Cuffs & Collars", "Bodysuits", "Fitted Tops"] },
    { name: "Piqué", img: "/fabrics/pique.png", desc: "Textured waffle-like pattern. Breathable and structured.", uses: ["Polo Shirts", "Sportswear", "Casual Wear"] },
    { name: "Fleece", img: "/fabrics/fleece.png", desc: "Plush, insulating fabric with a soft napped surface.", uses: ["Jackets", "Blankets", "Winter Wear"] },
    { name: "Jersey", img: "/fabrics/jersey.png", desc: "Single-knit fabric known for exceptional drape and stretch.", uses: ["T-Shirts", "Dresses", "Activewear"] },
    { name: "Poly Fleece", img: "/fabrics/poly-fleece.png", desc: "Synthetic fleece with superior moisture-wicking properties.", uses: ["Outdoor Gear", "Sportswear", "Layering"] },
    { name: "Knit Polyester", img: "/fabrics/knit-polyester.png", desc: "Durable, wrinkle-resistant synthetic with excellent color retention.", uses: ["Sportswear", "Uniforms", "Technical Wear"] },
];

function Section4FabricLab() {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <section id="fabric-lab" className="relative bg-[#FAF9F6] text-northern-evergreen py-32 md:py-48 px-8 md:px-16 overflow-hidden">

            {/* Section Header */}
            <div className="max-w-[1400px] mx-auto text-center mb-20">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-northern-amber/80 block mb-3">Chapter IV</span>
                <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-tighter leading-none mb-6">
                    The Fabric <span className="font-serif font-light italic text-northern-evergreen/60">Lab</span>
                </h2>
                <p className="text-northern-evergreen/50 text-lg max-w-xl mx-auto">
                    Tap any swatch to explore its properties. Eight core textiles, each perfected over decades.
                </p>
            </div>

            {/* Swatch Grid */}
            <div className="max-w-[1200px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12">
                {fabricSwatches.map((fabric, i) => (
                    <motion.button
                        key={fabric.name}
                        layoutId={`fabric-${i}`}
                        onClick={() => setSelected(i)}
                        className="group flex flex-col items-center gap-4 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Circular swatch */}
                        <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-2 ring-northern-evergreen/10 group-hover:ring-northern-amber/50 transition-all duration-500 shadow-lg group-hover:shadow-xl">
                            <Image src={fabric.img} alt={fabric.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <span className="text-sm font-bold uppercase tracking-wider text-northern-evergreen/70 group-hover:text-northern-amber transition-colors">
                            {fabric.name}
                        </span>
                    </motion.button>
                ))}
            </div>

            {/* Full-screen Detail Overlay */}
            <AnimatePresence>
                {selected !== null && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            layoutId={`fabric-${selected}`}
                            className="relative w-full max-w-2xl bg-[#FAF9F6] rounded-3xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Full image */}
                            <div className="relative w-full aspect-[16/10]">
                                <Image src={fabricSwatches[selected].img} alt={fabricSwatches[selected].name} fill className="object-cover" />
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-12">
                                <h3 className="text-3xl font-black tracking-tight text-northern-evergreen mb-4">
                                    {fabricSwatches[selected].name}
                                </h3>
                                <p className="text-northern-evergreen/60 text-base leading-relaxed mb-6">
                                    {fabricSwatches[selected].desc}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {fabricSwatches[selected].uses.map((use) => (
                                        <span key={use} className="px-4 py-1.5 rounded-full bg-northern-evergreen/10 text-xs font-bold uppercase tracking-wider text-northern-evergreen/80">
                                            {use}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => setSelected(null)}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-northern-evergreen/20 text-sm font-bold uppercase tracking-wider text-northern-evergreen/70 hover:bg-northern-evergreen/5 transition-colors"
                                >
                                    ← Back to Lab
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

/* ─────────────────────────────────────────────────────────
   § 5 — "THE TRUST WALL"
   Dual-direction certification marquees.
   ───────────────────────────────────────────────────────── */

const certifications = [
    "LEED Gold", "GOTS", "Oeko-Tex 100", "Oeko-Tex STeP", "WRAP",
    "Better Cotton", "BSCI", "CMIA", "Organic Content", "Recycled Claim",
    "RSC", "RWS", "SMETA",
];

const certLogos = [
    "/certifications/leed-gold.png", "/certifications/gots.png", "/certifications/oeko-tex-100.png",
    "/certifications/oeko-tex-step.png", "/certifications/wrap.png", "/certifications/better-cotton.png",
    "/certifications/bsci.jpg", "/certifications/cmia.png", "/certifications/organic-content.png",
    "/certifications/recycled-claim.png", "/certifications/rsc.png", "/certifications/rws.png",
    "/certifications/smeta.png",
];

const buyers = ["H&M", "ZARA", "C&A", "PRIMARK", "NEXT", "S.OLIVER"];

function CertMarqueeTrack({ direction = "left" }: { direction?: "left" | "right" }) {
    const animationClass = direction === "left" ? "animate-marquee" : "animate-marquee-reverse";
    return (
        <div className={`flex shrink-0 items-center gap-12 ${animationClass}`}>
            {certLogos.map((logo, i) => (
                <div key={i} className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-white rounded-xl p-3 shadow-sm border border-black/5">
                    <Image src={logo} alt={certifications[i]} fill className="object-contain p-2" />
                </div>
            ))}
        </div>
    );
}

function BuyerMarqueeTrack() {
    return (
        <div className="flex shrink-0 items-center gap-8 animate-marquee-reverse">
            {buyers.map((name) => (
                <span key={name} className="flex shrink-0 items-center gap-8">
                    <span className="text-[10px] text-northern-evergreen/20">◆</span>
                    <span className="shrink-0 text-sm font-bold uppercase tracking-[0.2em] text-northern-evergreen/50">
                        {name}
                    </span>
                </span>
            ))}
            <span className="text-[10px] text-northern-evergreen/20">◆</span>
        </div>
    );
}

function Section5TrustWall() {
    return (
        <section id="trust-wall" className="bg-[#FAF9F6] text-northern-evergreen py-32 md:py-48 overflow-hidden">
            {/* Header */}
            <div className="text-center px-8 mb-20">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-northern-amber/80 block mb-3">Chapter V</span>
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-tighter leading-none mb-4">
                    Globally Certified. <span className="font-serif font-light italic text-northern-evergreen/50">Universally Trusted.</span>
                </h2>
            </div>

            {/* Certification Marquee — scrolls left */}
            <div className="overflow-hidden mb-8">
                <div className="flex">
                    <CertMarqueeTrack direction="left" />
                    <CertMarqueeTrack direction="left" />
                </div>
            </div>

            {/* Center stat line */}
            <div className="text-center py-8 px-8">
                <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-northern-evergreen/30">
                    $30M+ Annual Revenue &nbsp;·&nbsp; 99.8% Quality Yield &nbsp;·&nbsp; Zero Tolerance for Compromise
                </p>
            </div>

            {/* Buyer Marquee — scrolls right */}
            <div className="overflow-hidden mt-8">
                <div className="flex">
                    <BuyerMarqueeTrack />
                    <BuyerMarqueeTrack />
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
                § 4 — THE FABRIC LAB
                Interactive swatch explorer.
            ═══════════════════════════════════════════════════════════ */}
            <Section4FabricLab />

            {/* ═══════════════════════════════════════════════════════════
                § 5 — THE TRUST WALL
                Dual-direction marquees.
            ═══════════════════════════════════════════════════════════ */}
            <Section5TrustWall />

            {/* ═══════════════════════════════════════════════════════════
                § 6 — THE CLOSE
                Contact & cinematic ghost-text footer.
            ═══════════════════════════════════════════════════════════ */}
            <section className="bg-northern-evergreen relative">
                {/* Contact */}
                <div className="px-8 py-32 md:py-48">
                    <ContactInfo />
                </div>

                {/* Closing Tagline */}
                <div className="text-center px-8 pb-16">
                    <p className="font-serif italic text-lg md:text-xl text-white/40 max-w-xl mx-auto">
                        The Atelier is open. Let&apos;s build something extraordinary.
                    </p>
                </div>

                {/* Ghost-text Footer */}
                <div className="overflow-hidden pb-8">
                    <h2 className="text-[clamp(5rem,20vw,28rem)] font-black leading-[0.75] tracking-tighter text-white/[0.04] select-none pointer-events-none text-center whitespace-nowrap">
                        NORTHERN
                    </h2>
                </div>
            </section>
        </div>
    );
}
