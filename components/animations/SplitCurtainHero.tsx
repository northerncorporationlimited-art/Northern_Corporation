"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ease = [0.76, 0, 0.24, 1] as const;

export default function SplitCurtainHero() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Curtain panels slide apart on scroll
    const leftX = useTransform(scrollYProgress, [0, 0.45], ["0%", "-100%"]);
    const rightX = useTransform(scrollYProgress, [0, 0.45], ["0%", "100%"]);

    // Text fades in after curtains are ~30% open
    const contentOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
    const contentY = useTransform(scrollYProgress, [0.2, 0.45], [50, 0]);

    // Image parallax
    const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
    const imgOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.2]);

    return (
        <div ref={containerRef} className="relative h-[250vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Background Image — always behind the curtains */}
                <motion.div
                    className="absolute inset-0"
                    style={{ scale: imgScale, opacity: imgOpacity }}
                >
                    <Image
                        src="/hero-macro.png"
                        alt="Premium fabric texture"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-northern-evergreen/50" />
                </motion.div>

                {/* Left Curtain Panel */}
                <motion.div
                    className="absolute top-0 left-0 z-20 flex h-full w-1/2 items-center justify-end bg-[#0a0a0a]"
                    style={{ x: leftX }}
                >
                    <motion.div
                        className="mr-6 text-right sm:mr-12"
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
                    >
                        <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-northern-amber/40 sm:text-xs">
                            Northern Corporation
                        </p>
                        <p className="mt-2 text-4xl font-extrabold leading-none text-northern-linen sm:text-5xl md:text-6xl">
                            Knit
                        </p>
                        <p className="text-4xl font-extrabold leading-none text-northern-linen sm:text-5xl md:text-6xl">
                            to Fit
                        </p>
                    </motion.div>
                    {/* Right edge highlight */}
                    <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-northern-amber/20 to-transparent" />
                </motion.div>

                {/* Right Curtain Panel */}
                <motion.div
                    className="absolute top-0 right-0 z-20 flex h-full w-1/2 items-center justify-start bg-[#0a0a0a]"
                    style={{ x: rightX }}
                >
                    <motion.div
                        className="ml-6 sm:ml-12"
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
                    >
                        <p className="text-4xl font-extrabold leading-none text-northern-amber sm:text-5xl md:text-6xl">
                            Your
                        </p>
                        <p className="text-4xl font-extrabold leading-none text-northern-amber sm:text-5xl md:text-6xl">
                            World
                        </p>
                        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.3em] text-northern-linen/30 sm:text-xs">
                            Est. 1987 &nbsp;·&nbsp; Premium Knitwear
                        </p>
                    </motion.div>
                    {/* Left edge highlight */}
                    <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-northern-amber/20 to-transparent" />
                </motion.div>

                {/* Center split line glow (visible before panels open) */}
                <motion.div
                    className="absolute left-1/2 top-0 z-30 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-northern-amber/30 to-transparent"
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
                />

                {/* Content — revealed after curtains open */}
                <motion.div
                    className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
                    style={{ opacity: contentOpacity, y: contentY }}
                >
                    <span className="mb-6 inline-block text-[10px] font-medium uppercase tracking-[0.4em] text-northern-amber/60 sm:text-xs">
                        LEED Gold Certified &nbsp;●&nbsp; 3,000+ Employees &nbsp;●&nbsp;
                        Est. 1987
                    </span>

                    <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-northern-linen sm:text-6xl md:text-7xl lg:text-8xl">
                        Knit to Fit{" "}
                        <span className="text-northern-amber">Your World</span>
                    </h1>

                    <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-northern-linen/50 sm:text-lg">
                        Premium garment manufacturing since 1987 — where decades of
                        expertise meet uncompromising quality.
                    </p>

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

                {/* Scroll prompt — visible before curtains begin */}
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
                        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-northern-amber/40">
                            Scroll to open
                        </span>
                        <ArrowDown size={16} className="text-northern-amber/30" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
