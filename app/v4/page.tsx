"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
    const maskContainerRef = useRef<HTMLDivElement>(null);
    const targetLetterRef = useRef<HTMLSpanElement>(null);
    const [transformOrigin, setTransformOrigin] = useState("center");

    const { scrollYProgress: statementScroll } = useScroll({
        target: statementRef,
        offset: ["start start", "end end"]
    });

    // Calculate exact center of the "H" to zoom into
    useEffect(() => {
        const calculateOrigin = () => {
            if (!maskContainerRef.current || !targetLetterRef.current) return;
            const container = maskContainerRef.current.getBoundingClientRect();
            const letter = targetLetterRef.current.getBoundingClientRect();

            // Calculate percentage position of the letter's center relative to the container
            const centerX = ((letter.left + letter.width / 2) - container.left) / container.width * 100;
            const centerY = ((letter.top + letter.height / 2) - container.top) / container.height * 100;

            setTransformOrigin(`${centerX}% ${centerY}%`);
        };

        calculateOrigin();
        window.addEventListener("resize", calculateOrigin);
        // Small delay to ensure fonts/layout have painted
        setTimeout(calculateOrigin, 100);

        return () => window.removeEventListener("resize", calculateOrigin);
    }, []);

    // Scroll Map:
    // 0.0 - 0.35: Mask zooms from 1x to 250x directly through the letter H
    // 0.35 - 0.40: Mask fades out so it stops blocking clicks/rendering
    // 0.45 - 0.75: Staccato words flash sequentially over the background
    // 0.80 - 0.95: Final content fades up over the image

    const maskScale = useTransform(statementScroll, [0, 0.35], [1, 250]);
    const maskOpacity = useTransform(statementScroll, [0.35, 0.4], [1, 0]);

    // Give each word `0.1` (about 40vh) of screen time
    const staccato1 = useTransform(statementScroll, [0.40, 0.45, 0.55, 0.60], [0, 1, 1, 0]);
    const staccato2 = useTransform(statementScroll, [0.55, 0.60, 0.70, 0.75], [0, 1, 1, 0]);
    const staccato3 = useTransform(statementScroll, [0.70, 0.75, 0.85, 0.90], [0, 1, 1, 0]);

    const finalOpacity = useTransform(statementScroll, [0.85, 0.90], [0, 1]);
    const finalY = useTransform(statementScroll, [0.85, 0.90], [80, 0]);

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

                <motion.div
                    className="relative z-10 px-8 md:px-16 pb-12 w-full max-w-[1600px] mx-auto flex flex-col justify-end gap-12"
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.15, delayChildren: 0.4 }}
                >
                    <div className="max-w-4xl">
                        <motion.h1 className="text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.85] tracking-tighter mb-8">
                            <motion.span variants={heroHeadlineVariants} className="block text-white">Decades <span className="font-serif font-light italic text-northern-amber">of</span></motion.span>
                            <motion.span variants={heroHeadlineVariants} className="block text-white">Expertise.</motion.span>
                        </motion.h1>

                        <div className="max-w-xl mb-10">
                            <motion.p variants={heroHeadlineVariants} className="text-lg md:text-xl text-white/90 font-medium mb-2">
                                Northern Corporation Ltd. —
                            </motion.p>
                            <motion.p variants={heroHeadlineVariants} className="text-white/70 text-lg leading-relaxed">
                                Engineering comfort, durability, and style since 1987. Scaling premium multi-brand apparel manufacturing from Dhaka to the world.
                            </motion.p>
                        </div>

                        <motion.div variants={heroHeadlineVariants}>
                            <Link href="#what-we-do" className="group inline-flex items-center gap-4 bg-white text-northern-evergreen px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-all hover:bg-northern-amber hover:text-black">
                                <span>Discover More</span>
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* 2. ALPHA MASK STATEMENT                             */}
            {/* ═══════════════════════════════════════════════════ */}
            {/* REVERTED TO 400vh for proper timeline spacing */}
            <section id="statement" ref={statementRef} className="relative h-[400vh] bg-black">
                <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">

                    {/* Revealed Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/hero-factory.png"
                            alt="Factory Interior"
                            fill
                            className="object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>

                    {/* Staccato Words (Flashing sequentially) */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                        <motion.h2 style={{ opacity: staccato1 }} className="absolute text-[clamp(2.5rem,8vw,10rem)] font-black text-white tracking-widest uppercase text-center px-4">PRECISION.</motion.h2>
                        <motion.h2 style={{ opacity: staccato2 }} className="absolute text-[clamp(2rem,6vw,8rem)] font-black text-white tracking-widest uppercase text-center px-4">UNCOMPROMISING.</motion.h2>
                        <motion.h2 style={{ opacity: staccato3 }} className="absolute text-[clamp(2.5rem,8vw,10rem)] font-black text-northern-amber tracking-widest uppercase text-center px-4">QUALITY.</motion.h2>
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

                    {/* The Dark Mask Layer (Mix Blend Multiply) */}
                    <motion.div
                        ref={maskContainerRef}
                        className="absolute inset-0 z-30 bg-black mix-blend-multiply pointer-events-none flex flex-col items-center justify-center transform-gpu"
                        style={{ scale: maskScale, opacity: maskOpacity, transformOrigin }}
                    >
                        <span className="text-[clamp(3.5rem,15vw,18rem)] text-white font-black leading-[0.85] tracking-tighter mr-8 whitespace-nowrap">ROOTED</span>
                        <span className="text-[clamp(3.5rem,15vw,18rem)] text-white font-black leading-[0.85] tracking-tighter whitespace-nowrap">
                            IN D<span ref={targetLetterRef} className="opacity-100">H</span>AKA
                        </span>
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

                            <div className="space-y-4">
                                {infraPanels.map((item, i) => (
                                    <button
                                        key={item.num}
                                        onClick={() => {
                                            const el = document.getElementById(`panel-${i}`);
                                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        }}
                                        className={`w-full text-left py-6 flex items-center gap-6 transition-all duration-500 hover:opacity-100 ${activePanel === i ? 'opacity-100' : 'opacity-50'}`}
                                    >
                                        <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${activePanel === i ? 'bg-northern-amber' : 'bg-transparent'}`} />

                                        <div className="flex items-center gap-6 border-b border-white/10 w-full pb-6">
                                            <span className="font-serif italic text-northern-amber text-xl">{item.num}</span>
                                            <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-tight leading-none text-white">{item.title}</h3>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <Link href="#contact-us" className="inline-block mt-16 px-8 py-4 rounded-full border border-white/30 text-xs font-bold tracking-wider uppercase transition-colors hover:bg-white hover:text-black">
                                Explore Facilities
                            </Link>
                        </div>
                    </div>

                    {/* Right Scrolling Panels */}
                    <div className="pt-12 lg:pt-[30vh] pb-[10vh] border-l border-white/5 pl-8 md:pl-16">
                        {infraPanels.map((panel, i) => (
                            <motion.div
                                key={i}
                                id={`panel-${i}`}
                                initial={{ opacity: 0.1, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ margin: "-30% 0px -40% 0px" }}
                                onViewportEnter={() => setActivePanel(i)}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className={`w-full max-w-xl mx-auto ${i !== infraPanels.length - 1 ? 'mb-[40vh]' : ''}`}
                            >
                                <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden mb-8 shadow-2xl">
                                    <Image
                                        src={panel.img}
                                        alt={panel.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                </div>
                                <div className="bg-white/5 p-8 rounded-lg backdrop-blur-sm border border-white/10">
                                    <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                                        {panel.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* 4. PROOF OF SCALE & CLIENTS                         */}
            {/* ═══════════════════════════════════════════════════ */}
            <section id="about-us" className="pt-32 pb-4bg-northern-evergreen relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-northern-amber/10 via-transparent to-transparent opacity-80 pointer-events-none" />

                <div className="max-w-[1600px] mx-auto px-8 md:px-16 mb-24 relative z-10">
                    <h4 className="text-northern-amber text-xs font-bold tracking-[0.2em] uppercase mb-16">Proof of Scale</h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-t border-northern-amber/20 pt-16">
                        <div>
                            <div className="font-serif text-[clamp(4rem,8vw,6rem)] leading-none text-white mb-4">
                                <CountUp target={12} suffix="M+" />
                            </div>
                            <div className="text-sm font-bold tracking-widest text-northern-amber uppercase">Items Produced Yearly</div>
                        </div>
                        <div className="hidden md:block w-px h-32 bg-northern-amber/20 mx-auto" />
                        <div>
                            <div className="font-serif text-[clamp(4rem,8vw,6rem)] leading-none text-white mb-4">
                                <CountUp target={40} suffix="+" />
                            </div>
                            <div className="text-sm font-bold tracking-widest text-northern-amber uppercase">Countries Exported To</div>
                        </div>
                        <div className="hidden md:block w-px h-32 bg-northern-amber/20 mx-auto" />
                        <div>
                            <div className="font-serif text-[clamp(4rem,8vw,6rem)] leading-none text-white mb-4">
                                <CountUp target={1300} suffix="+" />
                            </div>
                            <div className="text-sm font-bold tracking-widest text-northern-amber uppercase">Advanced Machines</div>
                        </div>
                    </div>
                </div>

                <div className="mt-48 mb-24 text-center relative z-10 px-8">
                    <h3 className="font-serif italic text-[clamp(2rem,4vw,3.5rem)] text-white/90">Trusted by the world&apos;s most demanding brands.</h3>
                </div>

                <div className="pb-16 relative z-10">
                    <InfiniteMarquee />
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* 5. FOOTER & CONTACT                                 */}
            {/* ═══════════════════════════════════════════════════ */}
            <div id="contact-us" className="bg-northern-evergreen relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <ContactInfo />
            </div>

            <footer className="bg-northern-evergreen border-t border-white/10 py-16 overflow-hidden relative z-20">
                <div className="max-w-[1600px] mx-auto px-8 w-full flex justify-center">
                    <h2 className="text-[clamp(4rem,18vw,26rem)] font-serif font-black leading-[0.8] tracking-tighter text-white/5 select-none">
                        NORTHERN
                    </h2>
                </div>
            </footer>
        </div>
    );
}
