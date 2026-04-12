"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StickyCurtainSectionProps {
    children: ReactNode;
    className?: string;
}

export default function StickyCurtainSection({
    children,
    className = "",
}: StickyCurtainSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // As user scrolls past, the section scales down and fades
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.92]);
    const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.3]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 24]);

    return (
        <div ref={containerRef} className="relative" style={{ zIndex: 1 }}>
            <motion.div
                className={`sticky top-0 min-h-screen overflow-hidden ${className}`}
                style={{ scale, opacity, borderRadius }}
            >
                {children}
            </motion.div>
        </div>
    );
}
