"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const certifications = [
  { name: "GOTS", fullName: "Global Organic Textile Standard", image: "/certifications/gots.png" },
  { name: "OEKO-TEX® 100", fullName: "Confidence in Textiles", image: "/certifications/oeko-tex-100.png" },
  { name: "OEKO-TEX® STeP", fullName: "Sustainable Textile Production", image: "/certifications/oeko-tex-step.png" },
  { name: "BSCI", fullName: "Business Social Compliance Initiative", image: "/certifications/bsci.jpg" },
  { name: "WRAP", fullName: "Worldwide Responsible Accredited Production", image: "/certifications/wrap.png" },
  { name: "SMETA", fullName: "Sedex Members Ethical Trade Audit", image: "/certifications/smeta.png" },
  { name: "Better Cotton", fullName: "Better Cotton Initiative", image: "/certifications/better-cotton.png" },
  { name: "RWS", fullName: "Responsible Wool Standard", image: "/certifications/rws.png" },
  { name: "CmiA", fullName: "Cotton Made in Africa", image: "/certifications/cmia.png" },
  { name: "OCS", fullName: "Organic Content Standard", image: "/certifications/organic-content.png" },
  { name: "RCS", fullName: "Recycled Claim Standard", image: "/certifications/recycled-claim.png" },
  { name: "LEED Gold", fullName: "Leadership in Energy & Environmental Design", image: "/certifications/leed-gold.png" },
  { name: "RSC", fullName: "RMG Sustainability Council", image: "/certifications/rsc.png" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

export const Sustainability = () => {
  return (
    <section className="w-full bg-brand-cream py-32 px-8 md:px-20">
      {/* Header */}
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <span className="inline-block mb-4 rounded-full border border-brand-green/30 bg-brand-green/8 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-green">
          Quality Assured
        </span>
        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-brand-green mt-4">
          Certifications
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-brand-green/70 text-lg leading-relaxed">
          Our commitment to sustainability, ethical practices, and uncompromising quality is validated
          by the world&apos;s most respected certification bodies.
        </p>
      </motion.div>

      {/* Cert Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-5">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.name}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="group flex flex-col items-center justify-center rounded-2xl border border-brand-green/10 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative mb-3 h-16 w-full sm:h-20">
              <Image
                src={cert.image}
                alt={cert.fullName}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="text-center text-xs font-semibold text-brand-green">{cert.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Recognition Banner */}
      <motion.div
        className="mx-auto mt-16 max-w-2xl rounded-2xl bg-brand-green p-8 text-center shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <p className="text-sm font-medium leading-relaxed text-brand-cream/80">
          Northern Corporation is a{" "}
          <span className="font-bold text-brand-gold">BGMEA Best Environment Compliant Factory</span>
          {" "}and a proud signatory of the{" "}
          <span className="font-bold text-brand-gold">UN Global Compact</span>.
          {" "}The group also partners with{" "}
          <span className="font-bold text-brand-gold">SNV Netherlands</span>
          {" "}to advance sustainable development across the textile supply chain.
        </p>
      </motion.div>
    </section>
  );
};
