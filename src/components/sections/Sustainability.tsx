"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════
   CERTIFICATIONS — h-screen responsive grid
   Compact layout that fits within a single slide
   ═══════════════════════════════════════════════ */

const CERTS = [
  { name: "GOTS", full: "Global Organic Textile Standard", image: "/certifications/gots.png" },
  { name: "OEKO-TEX® 100", full: "Confidence in Textiles", image: "/certifications/oeko-tex-100.png" },
  { name: "OEKO-TEX® STeP", full: "Sustainable Textile Production", image: "/certifications/oeko-tex-step.png" },
  { name: "BSCI", full: "Business Social Compliance Initiative", image: "/certifications/bsci.jpg" },
  { name: "WRAP", full: "Worldwide Responsible Accredited Production", image: "/certifications/wrap.png" },
  { name: "SMETA", full: "Sedex Members Ethical Trade Audit", image: "/certifications/smeta.png" },
  { name: "Better Cotton", full: "Better Cotton Initiative", image: "/certifications/better-cotton.png" },
  { name: "RWS", full: "Responsible Wool Standard", image: "/certifications/rws.png" },
  { name: "CmiA", full: "Cotton Made in Africa", image: "/certifications/cmia.png" },
  { name: "OCS", full: "Organic Content Standard", image: "/certifications/organic-content.png" },
  { name: "RCS", full: "Recycled Claim Standard", image: "/certifications/recycled-claim.png" },
  { name: "LEED Gold", full: "Leadership in Energy & Environmental Design", image: "/certifications/leed-gold.png" },
  { name: "RSC", full: "RMG Sustainability Council", image: "/certifications/rsc.png" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const Sustainability = () => {
  return (
    <section
      id="certifications"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#F5F5EB] px-6 py-20 lg:h-screen"
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
        <h2 className="font-playfair text-4xl text-[#023020] md:text-5xl lg:text-6xl">
          Certifications
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-[#023020]/60 md:text-base">
          Our commitment to sustainability and ethical practices is validated by
          the world&apos;s most respected certification bodies.
        </p>
      </motion.div>

      {/* ── Certification Grid ── */}
      <div className="mx-auto grid w-full max-w-5xl shrink-0 grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 md:gap-4">
        {CERTS.map((cert, i) => (
          <motion.div
            key={cert.name}
            className="group flex flex-col items-center justify-center rounded-2xl border border-[#023020]/8 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md md:p-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: EASE }}
          >
            <div className="relative mb-2 h-10 w-full sm:h-12 md:h-14">
              <Image
                src={cert.image}
                alt={cert.full}
                fill
                sizes="120px"
                className="object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <p className="text-center text-[9px] font-semibold leading-tight text-[#023020] md:text-[10px]">
              {cert.name}
            </p>
          </motion.div>
        ))}
      </div>

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
          <span className="font-bold text-[#FDD017]">
            BGMEA Best Environment Compliant Factory
          </span>{" "}
          and a proud signatory of the{" "}
          <span className="font-bold text-[#FDD017]">UN Global Compact</span>.
          The group also partners with{" "}
          <span className="font-bold text-[#FDD017]">SNV Netherlands</span> to
          advance sustainable development across the textile supply chain.
        </p>
      </motion.div>
    </section>
  );
};
