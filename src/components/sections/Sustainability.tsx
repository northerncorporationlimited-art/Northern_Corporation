"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════
   CERTIFICATIONS — h-screen responsive grid
   Compact layout that fits within a single slide
   ═══════════════════════════════════════════════ */

/* Row 1 — 7 certs | Row 2 — 7 certs | Row 3 — 1 cert centered */
const CERTS = [
  /* ── Row 1 (7) ── */
  { name: "GOTS", full: "Global Organic Textile Standard", image: "/certifications/gots.png" },
  {
    name: "OEKO-TEX® 100",
    full: "Confidence in Textiles",
    image: "/certifications/oeko-tex-100.png",
  },
  {
    name: "OEKO-TEX® STeP",
    full: "Sustainable Textile Production",
    image: "/certifications/oeko-tex-step.png",
  },
  {
    name: "Made in Green",
    full: "Made in Green by OEKO-TEX®",
    image: "/certifications/made-in-green.png",
  },
  {
    name: "WRAP",
    full: "Worldwide Responsible Accredited Production",
    image: "/certifications/wrap.png",
  },
  { name: "SMETA", full: "Sedex Members Ethical Trade Audit", image: "/certifications/smeta.png" },
  {
    name: "Better Cotton",
    full: "Better Cotton Initiative",
    image: "/certifications/better-cotton.png",
  },
  /* ── Row 2 (7) ── */
  { name: "RWS", full: "Responsible Wool Standard", image: "/certifications/rws.png" },
  { name: "CmiA", full: "Cotton Made in Africa", image: "/certifications/cmia.png" },
  { name: "OCS", full: "Organic Content Standard", image: "/certifications/organic-content.png" },
  { name: "RCS", full: "Recycled Claim Standard", image: "/certifications/recycled-claim.png" },
  {
    name: "LEED Gold",
    full: "Leadership in Energy & Environmental Design",
    image: "/certifications/leed-gold.png",
  },
  { name: "RSC 100", full: "RMG Sustainability Council 100", image: "/certifications/rsc.png" },
  {
    name: "BSCI",
    full: "Business Social Compliance Initiative",
    image: "/certifications/bsci.webp",
  },
];

/* Separate row for Better Work — rendered centered below the main grid */
const CERT_BETTER_WORK = {
  name: "Better Work",
  full: "Better Work Bangladesh",
  image: "/certifications/better-work.png",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Sustainability = () => {
  return (
    <section
      id="certifications"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#F5F5EB] px-6 pt-32 pb-20"
    >
      {/* ── Header ── */}
      <motion.div
        className="mb-8 shrink-0 text-center md:mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <p className="mb-3 font-sans text-xs uppercase tracking-widest text-[#023020]/50 md:text-sm">
          Quality Assured
        </p>
        <h2 className="font-playfair text-4xl text-[#023020] md:text-5xl xl:text-6xl">
          Certifications
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[#023020]/60 md:text-base">
          Our commitment to sustainability and ethical practices is validated by the world&apos;s
          most respected certification bodies.
        </p>
      </motion.div>

      {/* ── Certification Grid — 7 cols × 2 rows ── */}
      <div className="mx-auto grid w-full max-w-5xl shrink-0 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 xl:grid-cols-7">
        {CERTS.map((cert, i) => (
          <motion.div
            key={cert.name}
            className="group flex flex-col items-center justify-center rounded-2xl border border-[#023020]/8 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md md:p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
          >
            <div className="relative mb-2 h-14 w-full sm:h-16 md:h-20">
              <Image
                src={cert.image}
                alt={cert.full}
                fill
                sizes="120px"
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="text-center text-[10px] font-semibold leading-tight text-[#023020] md:text-[11px]">
              {cert.name}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ── Row 3 — Better Work (centered, single card) ── */}
      <motion.div
        className="mx-auto mt-3 w-full max-w-5xl md:mt-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
      >
        <div className="flex justify-center">
          <div className="group flex w-[calc((100%-12px)/2)] flex-col items-center justify-center rounded-2xl border border-[#023020]/8 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md sm:w-[calc((100%-24px)/3)] md:w-[calc((100%-36px)/4)] md:p-4 lg:w-[calc((100%-48px)/5)] xl:w-[calc((100%-72px)/7)]">
            <div className="relative mb-2 h-14 w-full sm:h-16 md:h-20">
              <Image
                src={CERT_BETTER_WORK.image}
                alt={CERT_BETTER_WORK.full}
                fill
                sizes="120px"
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="text-center text-[10px] font-semibold leading-tight text-[#023020] md:text-[11px]">
              {CERT_BETTER_WORK.name}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Recognition Banner ── */}
      <motion.div
        className="mx-auto mt-8 max-w-3xl shrink-0 rounded-2xl bg-[#023020] px-6 py-5 text-center md:mt-12 md:px-8 md:py-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
      >
        <p className="font-sans text-xs leading-relaxed text-[#F5F5EB]/80 md:text-sm">
          Northern Corporation is a{" "}
          <span className="font-bold text-[#FDD017]">BGMEA Best Environment Compliant Factory</span>{" "}
          and a proud signatory of the{" "}
          <span className="font-bold text-[#FDD017]">UN Global Compact</span>. The group also
          partners with <span className="font-bold text-[#FDD017]">SNV Netherlands</span> to advance
          sustainable development across the textile supply chain.
        </p>
      </motion.div>
    </section>
  );
};
