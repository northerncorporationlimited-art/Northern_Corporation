"use client";

import { motion } from "framer-motion";
import { Award, Users, Building2 } from "lucide-react";

const ease = [0.76, 0, 0.24, 1] as const;

const stats = [
    {
        icon: Award,
        label: "LEED Gold Certified",
        sub: "Sustainable Manufacturing",
    },
    {
        icon: Users,
        label: "3,000+ Employees",
        sub: "Skilled Workforce",
    },
    {
        icon: Building2,
        label: "Est. 1987",
        sub: "Decades of Excellence",
    },
];

export default function TrustBar() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 2.5, ease }}
            className="mt-12 w-full max-w-3xl mx-auto"
        >
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 rounded-2xl border border-white/15 bg-white/[0.07] p-4 backdrop-blur-md shadow-lg shadow-black/10">
                {stats.map(({ icon: Icon, label, sub }, i) => (
                    <div
                        key={label}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.06] ${i < stats.length - 1
                                ? "sm:border-r sm:border-white/10"
                                : ""
                            }`}
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-northern-amber/15 text-northern-amber">
                            <Icon size={20} strokeWidth={1.8} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white leading-tight">
                                {label}
                            </p>
                            <p className="text-[11px] text-white/40 leading-tight mt-0.5">
                                {sub}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
