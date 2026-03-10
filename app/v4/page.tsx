"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import ContactInfo from "@/components/ContactInfo";
import InfiniteMarquee from "@/components/InfiniteMarquee";

// Helper for Animated Counters
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
    // ─── HERO ANIMATIONS ──────────────────────────────────────
    const heroHeadlineVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
    };

    // ─── ALPHA MASK SCROLL LOGIC ─────────────────────────────
    const statementRef = useRef<HTMLElement>(null);
    const { scrollYProgress: statementScroll } = useScroll({
        target: statementRef,
        offset: ["start start", "end end"]
    });

    // 0 to 0.4 => Mask scales from 1x to 150x. After 0.4 it stays huge.
    const maskScale = useTransform(statementScroll, [0, 0.4], [1, 200]);
    // The mask fades out exactly after it's fully zoomed so it stops interfering
    const maskOpacity = useTransform(statementScroll, [0.38, 0.4], [1, 0]);

    // Staccato words flashing over the revealed image.
    const staccato1 = useTransform(statementScroll, [0.42, 0.47, 0.52], [0, 1, 0]);
    const staccato2 = useTransform(statementScroll, [0.52, 0.57, 0.62], [0, 1, 0]);
    const staccato3 = useTransform(statementScroll, [0.62, 0.67, 0.72], [0, 1, 0]);

    // Final Content Reveal
    const finalOpacity = useTransform(statementScroll, [0.75, 0.85], [0, 1]);
    const finalY = useTransform(statementScroll, [0.75, 0.85], [60, 0]);

    // ─── INFRASTRUCTURE STICKY LOGIC ─────────────────────────
    const [activePanel, setActivePanel] = useState(0);

    const infraPanels = [
        { num: "01", title: "KNITTING", img: "/v4/infrastructure/knitting.png", desc: "State-of-the-art European machinery ensuring unparalleled fabric consistency and unmatched production speed." },
        { num: "02", title: "MATERIAL SCIENCE", img: "/v4/infrastructure/materials.png", desc: "Advanced R&D labs innovating sustainable, high-performance textiles engineered for the modern luxury market." },
        { num: "03", title: "PRECISION SEWING", img: "/v4/infrastructure/sewing.png", desc: "Lean manufacturing principles deployed across 1300+ advanced workstations, achieving a 99.2% right-first-time quality rate." }
    ];

    return (
        <div className="bg-northern-evergreen text-white selection:bg-northern-amber/30 selection:text-white font-sans antialiased overflow-x-hidden">
            <Navbar />

            {/* ═══════════════════════════════════════════════════ */}
            {/* 1. CINEMATIC HERO                                   */}
            {/* ═══════════════════════════════════════════════════ */}
            <section id="home" className="relative h-screen min-h-[700px] w-full flex flex-col justify-end overflow-hidden">
                {/* Background (Ken Burns attached via globals.css) */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero-factory.png"
                        alt="Northern Manufacturing Facility"
                        fill
                        className="object-cover animate-ken-burns scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-northern-evergreen/90" />
                </div>

                {/* Content */}
                <motion.div
                    className="relative z-10 px-8 md:px-16 pb-12 w-full max-w-[1600px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8"
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.15, delayChildren: 0.4 }}
                >
                    <div className="flex-1">
                        <motion.h1 className="text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.85] tracking-tighter mb-8">
                            <motion.span variants={heroHeadlineVariants} className="block text-white">Decades <span className="text-white/80 font-serif font-light italic text-[0.9em]">of</span></motion.span>
                            <motion.span variants={heroHeadlineVariants} className="block text-northern-amber">Expertise.</motion.span>
                        </motion.h1>

                        <div className="max-w-md">
                            <motion.p variants={heroHeadlineVariants} className="text-lg md:text-xl text-white/70 font-medium mb-2">
                                Northern Corporation Ltd. —
                            </motion.p>
                            <motion.p variants={heroHeadlineVariants} className="text-white/50 leading-relaxed">
                                Engineering comfort, durability, and style since 1987. Scaling premium multi-brand apparel manufacturing from Dhaka to the world.
                            </motion.p>
                        </div>
                    </div>

                    <motion.div variants={heroHeadlineVariants} className="shrink-0 mb-4 md:mb-0">
                        <Link href="#what-we-do" className="group inline-flex items-center gap-4 bg-white text-northern-evergreen px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all hover:bg-northern-amber hover:text-black">
                            <span>Discover More</span>
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* 2. ALPHA MASK STATEMENT                             */}
            {/* ═══════════════════════════════════════════════════ */}
            <section id="statement" ref={statementRef} className="relative h-[400vh] bg-black">
                <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">

                    {/* Revealed Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/hero-factory.png"
                            alt="Factory Interior"
                            fill
                            className="object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-black/60" />
                    </div>

                    {/* Staccato Words (Flashing over image) */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                        <motion.h2 style={{ opacity: staccato1 }} className="absolute text-[clamp(3rem,10vw,12rem)] font-black text-white tracking-widest uppercase">PRECISION.</motion.h2>
                        <motion.h2 style={{ opacity: staccato2 }} className="absolute text-[clamp(2.5rem,8vw,10rem)] font-black text-white tracking-widest uppercase">UNCOMPROMISING.</motion.h2>
                        <motion.h2 style={{ opacity: staccato3 }} className="absolute text-[clamp(3rem,10vw,12rem)] font-black text-northern-amber tracking-widest uppercase">QUALITY.</motion.h2>
                    </div>

                    {/* Final Reveal Content */}
                    <motion.div
                        className="absolute inset-0 z-20 flex flex-col justify-end px-8 pb-24 md:px-16 md:pb-32 bg-gradient-to-t from-black via-black/40 to-transparent"
                        style={{ opacity: finalOpacity }}
                    >
                        <div className="max-w-[1600px] w-full mx-auto">
                            <motion.h3 style={{ y: finalY }} className="text-[clamp(2.5rem,6vw,5rem)] font-black leading-[1.1] tracking-tight text-white mb-16">
                                Future-Focused<br />
                                <span className="font-serif italic font-light text-northern-amber">Innovation.</span>
                            </motion.h3>

                            <motion.div style={{ y: finalY }} className="border-t border-white/20 pt-8 flex flex-col md:flex-row gap-12 md:gap-24">
                                <div>
                                    <div className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-none text-white mb-2">
                                        <CountUp target={37} suffix="+" />
                                    </div>
                                    <div className="text-xs font-bold tracking-[0.2em] text-northern-amber uppercase">Years of Legacy</div>
                                </div>
                                <div>
                                    <div className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-none text-white mb-2">
                                        <CountUp target={3000} suffix="+" />
                                    </div>
                                    <div className="text-xs font-bold tracking-[0.2em] text-northern-amber uppercase">Employees</div>
                                </div>
                                <div>
                                    <div className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-none text-white mb-2">
                                        $<CountUp target={30} suffix="M+" />
                                    </div>
                                    <div className="text-xs font-bold tracking-[0.2em] text-northern-amber uppercase">Annual Revenue</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* The White Mask Layer (Mix Blend Screen) */}
                    <motion.div
                        className="absolute inset-0 z-30 bg-white mix-blend-screen pointer-events-none flex flex-col items-center justify-center transform-gpu origin-center"
                        style={{ scale: maskScale, opacity: maskOpacity }}
                    >
                        <span className="text-[clamp(4rem,20vw,24rem)] text-black font-black leading-[0.8] tracking-tighter mr-8">ROOTED</span>
                        <span className="text-[clamp(4rem,20vw,24rem)] text-black font-black leading-[0.8] tracking-tighter">IN DHAKA</span>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* 3. INFRASTRUCTURE (Sticky Track)                    */}
            {/* ═══════════════════════════════════════════════════ */}
            <section id="what-we-do" className="relative bg-black py-24 md:py-48 px-8 md:px-16">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">

                    {/* Left Sticky Nav */}
                    <div className="relative">
                        <div className="sticky top-32 lg:top-1/3">
                            <h4 className="text-northern-amber text-xs font-bold tracking-[0.2em] uppercase mb-12">Infrastructure</h4>

                            <div className="space-y-2">
                                {infraPanels.map((item, i) => (
                                    <button
                                        key={item.num}
                                        onClick={() => {
                                            const el = document.getElementById(`panel-${i}`);
                                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }}
                                        className={`w-full text-left py-6 border-b border-white/10 flex items-start gap-6 transition-all duration-500 hover:opacity-100 ${activePanel === i ? 'opacity-100' : 'opacity-30'}`}
                                    >
                                        <span className="font-serif italic text-northern-amber text-xl">{item.num}</span>
                                        <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-tight leading-none">{item.title}</h3>
                                    </button>
                                ))}
                            </div>

                            <Link href="#contact-us" className="inline-block mt-16 px-8 py-4 rounded-full border border-white/30 text-xs font-bold tracking-wider uppercase transition-colors hover:bg-white hover:text-black">
                                Explore Facilities
                            </Link>
                        </div>
                    </div>

                    {/* Right Scrolling Panels */}
                    <div className="pt-12 lg:pt-[30vh] pb-[20vh] space-y-[40vh]">
                        {infraPanels.map((panel, i) => (
                            <motion.div
                                key={i}
                                id={`panel-${i}`}
                                initial={{ opacity: 0.2, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ margin: "-20% 0px -40% 0px" }}
                                onViewportEnter={() => setActivePanel(i)}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full max-w-xl ml-auto"
                            >
                                <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden mb-8">
                                    <Image
                                        src={panel.img}
                                        alt={panel.title}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Overlay vignette */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                <p className="text-white/70 text-lg md:text-xl leading-relaxed">
                                    {panel.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* 4. PROOF OF SCALE & CLIENTS                         */}
            {/* ═══════════════════════════════════════════════════ */}
            <section id="about-us" className="py-32 bg-northern-evergreen relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-northern-amber/5 via-transparent to-transparent opacity-50 pointer-events-none" />

                <div className="max-w-[1600px] mx-auto px-8 md:px-16 mb-24">
                    <h4 className="text-northern-amber text-xs font-bold tracking-[0.2em] uppercase mb-16">Proof of Scale</h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t border-white/10 pt-12">
                        <div>
                            <div className="font-serif text-[clamp(4rem,8vw,6rem)] leading-none text-white mb-4">
                                <CountUp target={12} suffix="M+" />
                            </div>
                            <div className="text-sm font-bold tracking-widest text-white/50 uppercase">Items Produced Yearly</div>
                        </div>
                        <div className="hidden md:block w-px h-32 bg-white/10 mx-auto" />
                        <div>
                            <div className="font-serif text-[clamp(4rem,8vw,6rem)] leading-none text-white mb-4">
                                <CountUp target={40} suffix="+" />
                            </div>
                            <div className="text-sm font-bold tracking-widest text-white/50 uppercase">Countries Exported To</div>
                        </div>
                        <div className="hidden md:block w-px h-32 bg-white/10 mx-auto" />
                        <div>
                            <div className="font-serif text-[clamp(4rem,8vw,6rem)] leading-none text-white mb-4">
                                <CountUp target={1300} suffix="+" />
                            </div>
                            <div className="text-sm font-bold tracking-widest text-white/50 uppercase">Advanced Machines</div>
                        </div>
                    </div>
                </div>

                <div className="mt-48 mb-24 text-center">
                    <h3 className="font-serif italic text-[clamp(2rem,4vw,3rem)] text-white/90">Trusted by the world&apos;s most demanding brands.</h3>
                </div>

                {/* Import and use the exact InfiniteMarquee created for V1 */}
                <div className="pb-16">
                    <InfiniteMarquee />
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* 5. FOOTER & CONTACT                                 */}
            {/* ═══════════════════════════════════════════════════ */}
            <div id="contact-us" className="bg-northern-evergreen">
                <ContactInfo />
            </div>

            <footer className="bg-northern-evergreen border-t border-white/10 py-16 overflow-hidden">
                <div className="max-w-[1600px] mx-auto px-8 w-full flex justify-center">
                    <h2 className="text-[clamp(4rem,18vw,26rem)] font-serif font-black leading-[0.8] tracking-tighter text-white/5 select-none">
                        NORTHERN
                    </h2>
                </div>
            </footer>
        </div>
    );
}
