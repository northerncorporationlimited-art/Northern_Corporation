"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════
   PRODUCTS — Nested Sub-Slider Lookbook
   Scrolling cycles through categories before
   advancing to the next full slide.
   ═══════════════════════════════════════════════ */

const CATEGORIES = [
  { title: "Tee & Polo", slug: "tee-polo", image: "/products/tee-polo/1.jpg" },
  { title: "Bottoms", slug: "bottoms", image: "/products/bottoms/1.jpg" },
  {
    title: "Nightwear",
    slug: "nightwear",
    image: "/products/nightwear/1.png",
  },
  {
    title: "Sports & Active",
    slug: "sports-active",
    image: "/products/sports-active/1.jpeg",
  },
  { title: "Winter", slug: "winter", image: "/products/winter/1.jpeg" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Products = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Sub-slider wheel hijacking removed per client feedback:
  // categories change on click only, scroll passes through to next section.

  const active = CATEGORIES[activeIndex];

  return (
    <section
      id="products"
      className="relative flex min-h-screen w-full overflow-hidden bg-[#F5F5EB] py-20 text-[#023020] lg:h-screen lg:py-0"
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

            <nav className="flex flex-col gap-1">
              {CATEGORIES.map((cat, i) => {
                const isActive = i === activeIndex;
                return (
                  <div key={cat.slug}>
                    <button
                      onClick={() => setActiveIndex(i)}
                      className={`group flex w-full items-baseline gap-4 py-3 text-left outline-none transition-all duration-300 ${
                        isActive
                          ? "translate-x-4 opacity-100"
                          : "opacity-30 hover:opacity-60"
                      }`}
                    >
                      <span className="font-mono text-xs text-[#023020]/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-playfair text-3xl leading-tight lg:text-4xl xl:text-5xl">
                        {cat.title}
                      </span>
                    </button>

                    {/* Explore link — slides in under active category */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="ml-12 overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                        >
                          <Link
                            href={`/products/${cat.slug}`}
                            className="mt-1 mb-2 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#FDD017] transition-opacity hover:opacity-70"
                          >
                            Explore Collection ↗
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* ── Right — Product Image (3/5 width) ── */}
          <div className="relative flex h-full items-center justify-center pt-20 lg:col-span-3">
            {/* Preload all category images for instant crossfade */}
            {CATEGORIES.map((cat) => (
              <Image
                key={`preload-${cat.slug}`}
                src={cat.image}
                alt=""
                fill
                sizes="1px"
                className="pointer-events-none invisible absolute"
                aria-hidden="true"
                priority
              />
            ))}
            <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-3xl bg-[#023020] sm:max-w-sm lg:max-w-xl lg:max-h-[calc(100vh-200px)]">
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
                    alt={active.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-top"
                    priority
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
                    {active.title}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Sub-slide progress dots */}
              <div className="absolute bottom-8 right-8 z-10 flex gap-1.5">
                {CATEGORIES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-6 bg-[#FDD017]"
                        : "w-1.5 bg-[#F5F5EB]/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
