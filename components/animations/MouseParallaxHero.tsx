"use client";

import { useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";

const heroEase = [0.76, 0, 0.24, 1] as const;

const wordVariants = {
    hidden: { y: "120%", opacity: 0, rotateX: 50 },
    visible: (i: number) => ({
        y: "0%",
        opacity: 1,
        rotateX: 0,
        transition: {
            duration: 1.3,
            delay: 0.5 + i * 0.1,
            ease: heroEase,
        },
    }),
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, delay, ease: heroEase },
    }),
};

export default function MouseParallaxHero() {
    const containerRef = useRef<HTMLElement>(null);

    // Raw motion values — no React state, no re-renders
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics
    const springConfig = { stiffness: 100, damping: 30, mass: 1 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    // Layer 1: Background glow — moves OPPOSITE to mouse (parallax depth)
    const bgX = useTransform(smoothX, [-0.5, 0.5], [40, -40]);
    const bgY = useTransform(smoothY, [-0.5, 0.5], [30, -30]);

    // Layer 2: Typography — moves WITH the mouse (subtle, closer layer)
    const textX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
    const textY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

    // Layer 3: Badge — moves slightly more for depth contrast
    const badgeX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
    const badgeY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Normalize to -0.5 → 0.5
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const heroWords = ["Knit", "to", "Fit", "Your", "World"];

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Layer 1: Parallax Background Glows */}
            <motion.div
                className="pointer-events-none absolute inset-0"
                style={{ x: bgX, y: bgY }}
            >
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 2.5, ease: heroEase }}
                    className="absolute inset-0"
                >
                    <div className="absolute top-[20%] left-[15%] h-[500px] w-[500px] rounded-full bg-northern-evergreen/30 blur-[150px]" />
                    <div className="absolute bottom-[15%] right-[20%] h-[400px] w-[400px] rounded-full bg-northern-amber/[0.06] blur-[120px]" />
                    <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-northern-evergreen/15 blur-[180px]" />
                </motion.div>
                {/* Grain overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />
            </motion.div>

            {/* Horizontal accent lines */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-northern-amber/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-northern-amber/10 to-transparent" />
            </div>

            {/* Layer 2: Content with mouse tracking */}
            <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
                {/* Badge — Layer 3 depth */}
                <motion.div style={{ x: badgeX, y: badgeY }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: heroEase }}
                    >
                        <span className="mb-8 inline-block text-[10px] font-medium uppercase tracking-[0.4em] text-northern-amber/50 sm:text-xs">
                            LEED Gold Certified &nbsp;●&nbsp; 3,000+ Employees
                            &nbsp;●&nbsp; Est. 1987
                        </span>
                    </motion.div>
                </motion.div>

                {/* Staggered Word Reveal — Layer 2 */}
                <motion.div style={{ x: textX, y: textY }}>
                    <div className="overflow-hidden">
                        <h1 className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-5xl font-extrabold leading-[1.05] tracking-tight text-northern-linen sm:text-6xl md:text-7xl lg:text-[5.5rem] [perspective:1200px]">
                            {heroWords.map((word, i) => (
                                <span key={word + i} className="overflow-hidden inline-flex">
                                    <motion.span
                                        custom={i}
                                        variants={wordVariants}
                                        initial="hidden"
                                        animate="visible"
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
                </motion.div>

                {/* Sub-text */}
                <motion.p
                    custom={1.3}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-northern-linen/35 sm:text-base"
                >
                    Premium garment manufacturing since 1987 — where decades of expertise
                    meet uncompromising quality.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    custom={1.6}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
                >
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
                </motion.div>
            </div>

            {/* Scroll hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown size={16} className="text-northern-linen/20" />
                </motion.div>
            </motion.div>
        </section>
    );
}
