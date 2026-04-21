"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════
   PRODUCTS — Interactive Category Lookbook
   Left: category menu, Right: crossfade product image
   ═══════════════════════════════════════════════ */

const CATEGORIES = [
  { name: "Tee & Polo", slug: "tee-polo", image: "/products/tee-polo/1.jpg" },
  { name: "Bottoms", slug: "bottom", image: "/products/bottom/1.jpg" },
  { name: "Nightwear", slug: "nightwear", image: "/products/nightwear/1.png" },
  {
    name: "Sports & Active",
    slug: "sports",
    image: "/products/sports/1.jpeg",
  },
  { name: "Winter", slug: "winter", image: "/products/winter/1.jpeg" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Products = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = CATEGORIES[activeIndex];

  return (
    <section
      id="products"
      className="relative flex h-screen w-full overflow-hidden bg-[#F5F5EB] text-[#023020]"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center px-6">
        <div className="grid h-full w-full grid-cols-1 items-center gap-8 lg:grid-cols-5 lg:gap-16">
          {/* ── Left — Category Menu (2/5 width) ── */}
          <div className="flex flex-col justify-center lg:col-span-2">
            <motion.p
              className="mb-8 font-sans text-sm uppercase tracking-widest text-[#023020]/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              Product Categories
            </motion.p>

            <nav className="flex flex-col gap-2">
              {CATEGORIES.map((cat, i) => (
                <motion.button
                  key={cat.slug}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  className={`group flex items-baseline gap-4 py-3 text-left transition-all duration-300 ${
                    i === activeIndex
                      ? "translate-x-4 opacity-100"
                      : "opacity-30 hover:opacity-60"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: i === 0 ? 1 : 0.3, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.08,
                    ease: EASE,
                  }}
                >
                  <span className="font-mono text-xs text-[#023020]/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-playfair text-4xl leading-tight lg:text-5xl xl:text-6xl">
                    {cat.name}
                  </span>
                </motion.button>
              ))}
            </nav>
          </div>

          {/* ── Right — Product Image (3/5 width) ── */}
          <div className="relative flex h-full items-center justify-center lg:col-span-3">
            <div className="relative aspect-[3/4] w-full max-w-lg overflow-hidden rounded-3xl bg-[#023020] lg:max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Category label overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#023020]/80 to-transparent px-8 pb-8 pt-16">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active.slug}
                    className="font-playfair text-3xl text-[#F5F5EB]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    {active.name}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
