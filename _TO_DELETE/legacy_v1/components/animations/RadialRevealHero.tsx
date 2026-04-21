"use client";

import { useRef } from "react";
import Image from "next/image";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { ArrowDown } from "lucide-react";

const heroEase = [0.76, 0, 0.24, 1] as const;

export default function RadialRevealHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLElement>(null);

    // Mouse tracking for parallax after reveal
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { stiffness: 80, damping: 25 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);
    const imgX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
    const imgY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!heroRef.current) return;
        const rect = heroRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Scroll-linked radial reveal
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Clip-path expands from 0% to 150% (overshoot to cover corners)
    const clipRadius = useTransform(scrollYProgress, [0, 0.5], [3, 150]);

    // Pulsing dot fades out as reveal starts
    const dotOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
    const dotScale = useTransform(scrollYProgress, [0, 0.12], [1, 3]);

    // Content text fades in once circle is ~60% open
    const contentOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.35, 0.55], [50, 0]);

    return (
        <div ref={containerRef} className="relative h-[250vh]">
            <section
                ref={heroRef}
                className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Radially-revealed image with mouse parallax */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        clipPath: useTransform(
                            clipRadius,
                            (r) => `circle(${r}% at 50% 50%)`
                        ),
                    }}
                >
                    <motion.div
                        className="absolute inset-[-40px]"
                        style={{ x: imgX, y: imgY }}
                    >
                        <Image
                            src="/hero-atelier.png"
                            alt="Northern Corporation luxury atelier"
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover"
                        />
                        {/* Dark overlay for text readability */}
                        <div className="absolute inset-0 bg-black/35" />
                    </motion.div>
                </motion.div>

                {/* Pulsing amber dot — visible before scroll */}
                <motion.div
                    className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                    style={{ opacity: dotOpacity, scale: dotScale }}
                >
                    <motion.div
                        animate={{
                            boxShadow: [
                                "0 0 0 0 rgba(253,208,23,0.4)",
                                "0 0 0 30px rgba(253,208,23,0)",
                            ],
                        }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "easeOut",
                        }}
                        className="h-4 w-4 rounded-full bg-northern-amber"
                    />
                </motion.div>

                {/* Scroll-to-reveal instruction */}
                <motion.div
                    className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2"
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
                    }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-northern-amber/50">
                            Scroll to reveal
                        </span>
                        <ArrowDown size={16} className="text-northern-amber/40" />
                    </motion.div>
                </motion.div>

                {/* Content — fades in after radial reveal */}
                <motion.div
                    className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
                    style={{ opacity: contentOpacity, y: contentY }}
                >
                    <span className="mb-6 inline-block text-[10px] font-medium uppercase tracking-[0.4em] text-northern-amber/60 sm:text-xs">
                        LEED Gold Certified &nbsp;●&nbsp; 3,000+ Employees &nbsp;●&nbsp;
                        Est. 1987
                    </span>

                    <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-northern-linen sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                        Knit to Fit{" "}
                        <span className="text-northern-amber">Your World</span>
                    </h1>

                    <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-northern-linen/40 sm:text-base">
                        Premium garment manufacturing since 1987 — where decades of
                        expertise meet uncompromising quality.
                    </p>

                    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                        <a
                            href="#what-we-do"
                            className="group inline-flex items-center gap-2 rounded-full bg-northern-amber px-8 py-3.5 text-sm font-semibold text-northern-evergreen shadow-lg shadow-northern-amber/15 transition-all hover:shadow-northern-amber/30 hover:scale-[1.03]"
                        >
                            Discover Our Craft
                            <ArrowDown
                                size={16}
                                className="transition-transform group-hover:translate-y-0.5"
                            />
                        </a>
                        <a
                            href="#contact-us"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-3.5 text-sm font-semibold text-northern-linen/50 transition-all hover:border-northern-amber/25 hover:text-northern-amber"
                        >
                            Get in Touch
                        </a>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
