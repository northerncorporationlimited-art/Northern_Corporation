"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

const heroEase = [0.76, 0, 0.24, 1] as const;

const wordVariants = {
    hidden: { y: "110%", opacity: 0, rotateX: 45 },
    visible: (i: number) => ({
        y: "0%",
        opacity: 1,
        rotateX: 0,
        transition: {
            duration: 1.2,
            delay: 0.6 + i * 0.12,
            ease: heroEase,
        },
    }),
};

export default function MacroZoomHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Zoom out from 3x to 1x over first 50% of scroll
    const imgScale = useTransform(scrollYProgress, [0, 0.5], [3, 1]);

    // Text fades in after zoom-out completes
    const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
    const textY = useTransform(scrollYProgress, [0.3, 0.5], [60, 0]);

    // Dark overlay ramps up as content approaches
    const overlayOpacity = useTransform(scrollYProgress, [0.6, 1], [0.3, 0.85]);

    // Image blurs slightly at the end
    const imgBrightness = useTransform(scrollYProgress, [0.6, 1], [1, 0.5]);

    const heroWords = ["Knit", "to", "Fit", "Your", "World"];

    return (
        <div ref={containerRef} className="relative h-[300vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Zooming macro image */}
                <motion.div
                    className="absolute inset-0 origin-center"
                    style={{
                        scale: imgScale,
                        filter: useTransform(imgBrightness, (v) => `brightness(${v})`),
                    }}
                >
                    <Image
                        src="/hero-macro.png"
                        alt="Fabric macro texture"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                </motion.div>

                {/* Progressive dark overlay */}
                <motion.div
                    className="absolute inset-0 bg-northern-evergreen"
                    style={{ opacity: overlayOpacity }}
                />

                {/* Content — fades in after zoom-out */}
                <motion.div
                    className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
                    style={{ opacity: textOpacity, y: textY }}
                >
                    {/* Badge */}
                    <span className="mb-6 inline-block text-[10px] font-medium uppercase tracking-[0.4em] text-northern-amber/60 sm:text-xs">
                        LEED Gold Certified &nbsp;●&nbsp; 3,000+ Employees &nbsp;●&nbsp;
                        Est. 1987
                    </span>

                    {/* Staggered Word Reveal */}
                    <div className="overflow-hidden">
                        <h1 className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-5xl font-extrabold leading-[1.1] tracking-tight text-northern-linen sm:text-6xl md:text-7xl lg:text-8xl [perspective:1000px]">
                            {heroWords.map((word, i) => (
                                <span key={word + i} className="overflow-hidden inline-flex">
                                    <motion.span
                                        custom={i}
                                        variants={wordVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className={`inline-block ${word === "Your" || word === "World"
                                                ? "text-northern-amber"
                                                : ""
                                            }`}
                                        style={{ transformOrigin: "bottom center" }}
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                            ))}
                        </h1>
                    </div>

                    {/* Sub-text */}
                    <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-northern-linen/50 sm:text-lg">
                        Premium garment manufacturing since 1987 — where decades of
                        expertise meet uncompromising quality.
                    </p>

                    {/* CTAs */}
                    <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                        <a
                            href="#what-we-do"
                            className="group inline-flex items-center gap-2 rounded-full bg-northern-amber px-8 py-3.5 text-sm font-semibold text-northern-evergreen shadow-lg shadow-northern-amber/20 transition-all hover:shadow-northern-amber/40 hover:scale-[1.03]"
                        >
                            Discover Our Craft
                            <ArrowDown
                                size={16}
                                className="transition-transform group-hover:translate-y-0.5"
                            />
                        </a>
                        <a
                            href="#contact-us"
                            className="inline-flex items-center gap-2 rounded-full border border-northern-linen/15 px-8 py-3.5 text-sm font-semibold text-northern-linen/70 transition-all hover:border-northern-amber/30 hover:text-northern-amber"
                        >
                            Get in Touch
                        </a>
                    </div>
                </motion.div>

                {/* Scroll prompt — visible only at top */}
                <motion.div
                    className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]),
                    }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-northern-linen/40">
                            Scroll to zoom out
                        </span>
                        <ArrowDown size={16} className="text-northern-linen/40" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
