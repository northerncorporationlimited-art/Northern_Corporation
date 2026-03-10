"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactInfo from "@/components/ContactInfo";

function CountUp({ target, duration = 2, suffix = "" }: { target: number, duration?: number, suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const totalFrames = Math.round(duration * 60);
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(target * easeOutProgress));

            if (frame === totalFrames) {
                clearInterval(counter);
            }
        }, 1000 / 60);

        return () => clearInterval(counter);
    }, [isInView, target, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export default function V4Page() {
    // ─── HERO CURTAIN VARIANTS ────────────────────────────────
    const curtainVariants = {
        hidden: { height: "50vh" },
        visible: { height: "0vh", transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] as const, delay: 0.5 } }
    };

    const heroTextVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 1.5 } }
    };

    // ─── EDITORIAL THREAD SCROLL ─────────────────────────────
    const editorialRef = useRef<HTMLElement>(null);
    const { scrollYProgress: editorialScroll } = useScroll({
        target: editorialRef,
        offset: ["start center", "end end"]
    });

    const threadHeight = useTransform(editorialScroll, [0, 0.9], ["0%", "100%"]);
    const imageParallax1 = useTransform(editorialScroll, [0, 1], [50, -50]);
    const imageParallax2 = useTransform(editorialScroll, [0, 1], [100, -100]);

    // ─── HORIZONTAL SCROLL GALLERY ───────────────────────────
    const horizontalContainerRef = useRef<HTMLElement>(null);
    const { scrollYProgress: horizontalScroll } = useScroll({
        target: horizontalContainerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the horizontal scrolling with a spring
    const smoothHorizontalScroll = useSpring(horizontalScroll, { stiffness: 100, damping: 20 });
    // Translate the wide container (400vw) backwards by up to -300vw
    const xTranslate = useTransform(smoothHorizontalScroll, [0, 1], ["0vw", "-200vw"]);

    const galleryItems = [
        {
            title: "Advanced Knitting",
            desc: "Precision European machinery driving scalable, high-speed textile creation.",
            img: "/v4/infrastructure/knitting.png",
            stat: "1,200kg",
            statLabel: "Daily Capacity"
        },
        {
            title: "Material Science",
            desc: "Innovating sustainable dyes and durable synthetic blends for global brands.",
            img: "/v4/infrastructure/materials.png",
            stat: "100%",
            statLabel: "Oeko-Tex Certified"
        },
        {
            title: "Zero-Defect Sewing",
            desc: "Over 1,300 workstations operating on lean manufacturing tolerances.",
            img: "/v4/infrastructure/sewing.png",
            stat: "99.8%",
            statLabel: "Quality Yield"
        }
    ];

    return (
        <div className="bg-[#FAF9F6] text-northern-evergreen selection:bg-northern-amber/30 selection:text-northern-evergreen font-sans antialiased overflow-x-hidden">
            <Navbar /> {/* Assuming Navbar respects or handles light backgrounds if absolute */}

            {/* Override navbar color specifically for this page using global css overrides or just letting it contrast */}
            <div className="fixed top-0 left-0 w-full h-24 bg-gradient-to-b from-black/50 to-transparent z-40 pointer-events-none mix-blend-multiply" />

            {/* ═══════════════════════════════════════════════════ */}
            {/* 1. CURTAIN REVEAL HERO (DARK)                       */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className="relative h-screen min-h-[800px] w-full bg-black overflow-hidden flex items-center justify-center">

                {/* Background Image (Revealed) */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero-factory.png"
                        alt="Northern Manufacturing Facility"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Hero Content (Appears after curtain opens) */}
                <motion.div
                    className="relative z-10 text-center px-8"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.2 } }
                    }}
                >
                    <motion.div variants={heroTextVariants} className="uppercase tracking-[0.3em] text-northern-amber text-xs font-bold mb-8">
                        The Northern Standard
                    </motion.div>
                    <motion.h1 variants={heroTextVariants} className="text-[clamp(3.5rem,8vw,8rem)] text-white font-black leading-[0.85] tracking-tighter mb-8 max-w-6xl mx-auto">
                        Engineering the <span className="font-serif font-light italic text-[#FAF9F6]">Fabric</span> of Tomorrow.
                    </motion.h1>
                    <motion.p variants={heroTextVariants} className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12">
                        Pioneering ultra-premium, deeply scalable apparel manufacturing from Dhaka to the world's most demanding runways.
                    </motion.p>
                    <motion.div variants={heroTextVariants}>
                        <Link href="#editorial" className="inline-flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-transform">
                            Enter the Editorial
                        </Link>
                    </motion.div>
                </motion.div>

                {/* The Top Curtain */}
                <motion.div
                    className="absolute top-0 left-0 w-full bg-northern-evergreen z-20 flex items-end justify-center pb-8"
                    initial="hidden"
                    animate="visible"
                    variants={curtainVariants}
                >
                    {/* Optional: Half Logo */}
                </motion.div>

                {/* The Bottom Curtain */}
                <motion.div
                    className="absolute bottom-0 left-0 w-full bg-northern-evergreen z-20 flex items-start justify-center pt-8"
                    initial="hidden"
                    animate="visible"
                    variants={curtainVariants}
                >
                    {/* Optional: Half Logo */}
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* 2. "THE THREAD" EDITORIAL (LIGHT)                   */}
            {/* ═══════════════════════════════════════════════════ */}
            <section id="editorial" ref={editorialRef} className="relative py-32 md:py-64 px-8 md:px-16 max-w-[1600px] mx-auto min-h-[150vh]">

                {/* The Animated SVG Thread (Center Line) */}
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-black/10 -translate-x-1/2 hidden md:block" />
                <motion.div
                    className="absolute left-8 md:left-1/2 top-0 w-1 bg-northern-evergreen -translate-x-1/2 origin-top hidden md:block"
                    style={{ height: threadHeight }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-48">

                    {/* Left Column Block 1 */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-northern-amber mb-6">Chapter I : Origins</h2>
                        <p className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] mb-8">
                            A heritage woven into the very fabric of standard-defiing textiles.
                        </p>
                        <p className="text-lg text-black/60 leading-relaxed max-w-md">
                            Since our inception in 1987, Northern has rejected the paradigm of fast, disposable fashion.
                            We implemented lean cellular manufacturing long before it became an industry buzzword, establishing
                            our first campus with a singular obsession: uncompromised aesthetic integrity.
                        </p>
                    </div>

                    {/* Right Column Image 1 (Parallax) */}
                    <motion.div style={{ y: imageParallax1 }} className="relative aspect-[3/4] w-full max-w-lg mx-auto md:mt-32">
                        <Image
                            src="/hero-img.jpg" // Reusing a high-quality asset
                            alt="Historical Craftsmanship"
                            fill
                            className="object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </motion.div>

                    {/* Left Column Image 2 (Parallax) */}
                    <motion.div style={{ y: imageParallax2 }} className="relative aspect-[4/5] w-full max-w-md mx-auto order-last md:order-none">
                        <div className="absolute -inset-4 bg-northern-amber/10 -z-10 translate-x-8 translate-y-8" />
                        <Image
                            src="/v4/infrastructure/materials.png"
                            alt="Material Innovation"
                            fill
                            className="object-cover rounded-sm saturate-50 hover:saturate-100 transition-all duration-700"
                        />
                    </motion.div>

                    {/* Right Column Block 2 */}
                    <div className="flex flex-col justify-center md:pb-64">
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-northern-amber mb-6">Chapter II : Precision</h2>
                        <p className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] mb-8">
                            The exactitude of modern metallurgy meets raw organic fibers.
                        </p>
                        <p className="text-lg text-black/60 leading-relaxed max-w-md">
                            Walk our factory floor today, and the silence is what strikes you. Precision engineering
                            means machines don't rattle—they glide. Over 1,300 advanced workstations operate in a synergistic
                            matrix, ensuring that a micro-stitch engineered in R&D is replicated ten million times flawlessly.
                        </p>
                    </div>

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* 3. "ASSEMBLY LINE" HORIZONTAL SCROLL (DARK)         */}
            {/* ═══════════════════════════════════════════════════ */}
            {/* The outer container is 300vh tall to allow scrolling space. */}
            <section ref={horizontalContainerRef} className="relative h-[300vh] bg-northern-evergreen">

                {/* The pinned sticky section holding the horizontal track */}
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

                    {/* The wide track that physically moves left (3 panels = roughly 300vw wide) */}
                    <motion.div
                        className="flex gap-16 md:gap-32 px-8 md:px-[10vw]"
                        style={{ x: xTranslate }}
                    >

                        {/* Intro Panel (Takes up standard viewport width) */}
                        <div className="w-[85vw] md:w-[40vw] flex-shrink-0 flex flex-col justify-center text-white h-[70vh]">
                            <svg className="w-12 h-12 text-northern-amber mb-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <h2 className="text-[clamp(3rem,6vw,5rem)] font-black leading-none tracking-tighter mb-6">
                                The Assembly<br />
                                <span className="font-serif font-light italic text-northern-amber">Line.</span>
                            </h2>
                            <p className="text-white/60 text-xl max-w-md">
                                Scroll down to traverse our seamlessly integrated production ecosystem, from raw thread to runway-ready artifact.
                            </p>
                        </div>

                        {/* Gallery Panels */}
                        {galleryItems.map((item, i) => (
                            <div key={i} className="w-[85vw] md:w-[60vw] flex-shrink-0 flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                                {/* Large Image */}
                                <div className="relative w-full md:w-2/3 aspect-[4/3] md:aspect-video rounded-xl overflow-hidden shadow-2xl group">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                {/* Info Block */}
                                <div className="w-full md:w-1/3 flex flex-col justify-center text-white">
                                    <span className="font-serif italic text-northern-amber text-2xl mb-4">0{i + 1}</span>
                                    <h3 className="text-3xl md:text-5xl font-black tracking-tight leading-none mb-6">{item.title}</h3>
                                    <p className="text-white/60 text-lg mb-12">
                                        {item.desc}
                                    </p>
                                    <div className="border-t border-white/20 pt-6">
                                        <div className="text-4xl font-serif text-white">{item.stat}</div>
                                        <div className="text-xs uppercase tracking-[0.2em] font-bold text-northern-amber mt-2">{item.statLabel}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* 4. "SCALE MATRIX" & FOOTER                          */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className="bg-black text-white py-32 md:py-48 px-8 md:px-16 border-t border-white/10">
                <div className="max-w-[1600px] mx-auto text-center mb-24">
                    <h2 className="text-[clamp(3rem,6vw,5rem)] font-black leading-none tracking-tighter mb-6 relative inline-block">
                        Scalable Impact
                        <div className="absolute -top-6 -right-12 w-24 h-24 bg-northern-amber rounded-full blur-3xl opacity-20" />
                    </h2>
                    <p className="text-white/60 text-xl font-serif italic max-w-2xl mx-auto">
                        Decades of compounding excellence resulting in undeniable global velocity.
                    </p>
                </div>

                {/* Brutalist 3D Grid */}
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
                    {/* Stat Card */}
                    <motion.div
                        whileHover={{ scale: 0.98, rotateX: 5, rotateY: 5 }}
                        className="bg-white/5 border border-white/10 p-12 flex flex-col justify-center items-center text-center aspect-square backdrop-blur-sm cursor-crosshair transition-colors hover:bg-white/10"
                    >
                        <div className="font-serif text-6xl text-white mb-4">
                            <CountUp target={12} suffix="M+" />
                        </div>
                        <div className="text-xs font-bold tracking-widest text-northern-amber uppercase">Pieces/Year</div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 0.98, rotateX: 5, rotateY: -5 }}
                        className="bg-white/5 border border-white/10 p-12 flex flex-col justify-center items-center text-center aspect-square backdrop-blur-sm cursor-crosshair transition-colors hover:bg-white/10"
                    >
                        <div className="font-serif text-6xl text-white mb-4">
                            <CountUp target={1300} suffix="+" />
                        </div>
                        <div className="text-xs font-bold tracking-widest text-northern-amber uppercase">Advanced Stations</div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 0.98, rotateX: -5, rotateY: 5 }}
                        className="bg-white/5 border border-white/10 p-12 flex flex-col justify-center items-center text-center aspect-square backdrop-blur-sm cursor-crosshair transition-colors hover:bg-white/10"
                    >
                        <div className="font-serif text-6xl text-white mb-4">
                            <CountUp target={3000} suffix="+" />
                        </div>
                        <div className="text-xs font-bold tracking-widest text-northern-amber uppercase">Craftsmen</div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 0.98, rotateX: -5, rotateY: -5 }}
                        className="bg-white/5 border border-white/10 p-12 flex flex-col justify-center items-center text-center aspect-square backdrop-blur-sm cursor-crosshair transition-colors hover:bg-white/10"
                    >
                        <div className="font-serif text-6xl text-white mb-4">
                            <CountUp target={40} suffix="+" />
                        </div>
                        <div className="text-xs font-bold tracking-widest text-northern-amber uppercase">Export Nations</div>
                    </motion.div>
                </div>
            </section>

            <div id="contact-us" className="bg-northern-evergreen relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] border-t border-white/10">
                <ContactInfo />
            </div>

            <footer className="bg-northern-evergreen py-16 overflow-hidden relative z-20 mix-blend-screen opacity-50">
                <div className="max-w-[1600px] mx-auto px-8 w-full flex justify-center">
                    <h2 className="text-[clamp(4rem,18vw,26rem)] font-serif font-black leading-[0.8] tracking-tighter text-white/10 select-none pointer-events-none">
                        NORTHERN
                    </h2>
                </div>
            </footer>
        </div>
    );
}
