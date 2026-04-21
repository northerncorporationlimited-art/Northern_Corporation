"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const fabrics = [
    {
        name: "French Terry",
        image: "/fabrics/french-terry.png",
        description:
            "A soft, looped-back knit fabric ideal for sweatshirts, hoodies, and casual loungewear. Offers excellent moisture absorption and comfort.",
        uses: ["Hoodies", "Sweatshirts", "Joggers"],
    },
    {
        name: "Interlock Fabric",
        image: "/fabrics/interlock.png",
        description:
            "A double-knit fabric with a smooth, identical finish on both sides. Known for its stability, stretch recovery, and luxurious hand feel.",
        uses: ["T-Shirts", "Dresses", "Baby Apparel"],
    },
    {
        name: "Rib Fabric",
        image: "/fabrics/rib.png",
        description:
            "A stretchy knit with distinctive vertical ridges, providing excellent elasticity and recovery. Perfect for cuffs, collars, and form-fitting garments.",
        uses: ["Cuffs & Collars", "Bodysuits", "Fitted Tops"],
    },
    {
        name: "Pique",
        image: "/fabrics/pique.png",
        description:
            "A textured weave with a waffle-like diamond pattern, most commonly associated with polo shirts. Breathable and structured.",
        uses: ["Polo Shirts", "Sportswear", "Casual Wear"],
    },
    {
        name: "Fleece Fabric",
        image: "/fabrics/fleece.png",
        description:
            "A plush, insulating fabric with a soft napped surface. Lightweight yet warm, making it a staple for outerwear and cold-weather essentials.",
        uses: ["Jackets", "Blankets", "Winter Wear"],
    },
    {
        name: "Jersey",
        image: "/fabrics/jersey.png",
        description:
            "A single-knit fabric known for its exceptional drape, stretch, and breathability. The most versatile fabric in garment manufacturing.",
        uses: ["T-Shirts", "Dresses", "Activewear"],
    },
    {
        name: "Poly Fleece",
        image: "/fabrics/poly-fleece.png",
        description:
            "A synthetic fleece made from polyester fibers, offering superior moisture-wicking, quick drying, and pill-resistant properties.",
        uses: ["Outdoor Gear", "Sportswear", "Layering"],
    },
    {
        name: "Knit Polyester",
        image: "/fabrics/knit-polyester.png",
        description:
            "A durable, wrinkle-resistant synthetic knit with excellent color retention. Ideal for performance and technical garments.",
        uses: ["Sportswear", "Uniforms", "Technical Wear"],
    },
];

export default function FabricShowcase() {
    const [selected, setSelected] = useState<number | null>(null);

    return (
        <div className="relative">
            {/* Fabric Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5">
                {fabrics.map((fabric, index) => (
                    <motion.button
                        key={fabric.name}
                        onClick={() => setSelected(index)}
                        className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-northern-evergreen/5"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                    >
                        <Image
                            src={fabric.image}
                            alt={fabric.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Overlay with name */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                            <p className="text-sm font-semibold text-white sm:text-base">
                                {fabric.name}
                            </p>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Expanded Detail Modal */}
            <AnimatePresence>
                {selected !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: 30 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                            className="relative flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Scrollable Content Area */}
                            <div className="overflow-y-auto">
                                {/* Close */}
                                <button
                                    onClick={() => setSelected(null)}
                                    className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                                    aria-label="Close"
                                >
                                    <X size={18} />
                                </button>

                                {/* Image */}
                                <div className="relative aspect-[16/10] w-full">
                                    <Image
                                        src={fabrics[selected].image}
                                        alt={fabrics[selected].name}
                                        fill
                                        sizes="(max-width: 512px) 100vw, 512px"
                                        className="object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-northern-evergreen">
                                        {fabrics[selected].name}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-northern-evergreen/70">
                                        {fabrics[selected].description}
                                    </p>

                                    {/* Tags */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {fabrics[selected].uses.map((use) => (
                                            <span
                                                key={use}
                                                className="rounded-full bg-northern-evergreen/10 px-3 py-1 text-xs font-medium text-northern-evergreen"
                                            >
                                                {use}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
