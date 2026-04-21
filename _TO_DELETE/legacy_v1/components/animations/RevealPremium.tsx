"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface RevealPremiumProps {
    children: ReactNode;
    className?: string;
    offset?: number;
}

export default function RevealPremium({
    children,
    className = "",
    offset = 80,
}: RevealPremiumProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "0.35 1"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [offset, 0]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

    return (
        <div ref={ref} className={className}>
            <motion.div style={{ y, opacity, scale }}>
                {children}
            </motion.div>
        </div>
    );
}
