"use client";

import React from "react";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";

const contactDetails = [
  { label: "Head Office", value: "[Insert Factory Address]\nDhaka, Bangladesh" },
  { label: "Factory Location", value: "[Insert Factory Unit Address]\nGazipur / Narayanganj, Bangladesh" },
  { label: "Work Hours", value: "Saturday – Thursday\n8:00 AM – 5:00 PM (BST)" },
  { label: "Phone", value: "[Insert Phone Number]\n[Insert Phone Number]" },
  { label: "Email", value: "info@northerncorp.com\nsales@northerncorp.com" },
  { label: "Web", value: "www.northerncorp.com" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

export const ContactFooter = () => {
  return (
    <footer className="w-full bg-[#010f0a] py-32 px-8 md:px-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block mb-4 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            Let&apos;s Connect
          </span>
          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-brand-cream mt-4">
            Contact Us
          </h2>
          <p className="mt-6 max-w-xl text-brand-cream/50 text-lg leading-relaxed">
            Ready to partner with us? Reach out to discuss your next project — we&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {contactDetails.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="group rounded-2xl border border-white/8 bg-white/4 p-6 hover:border-brand-gold/20 hover:bg-white/8 transition-all"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold/70 mb-3">{item.label}</p>
              {item.value.split("\n").map((line) => (
                <p key={line} className="text-brand-cream/70 text-sm leading-relaxed">{line}</p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Magnetic strength={12}>
            <a
              href="mailto:info@northerncorp.com"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-8 py-3 text-sm font-semibold text-brand-green shadow-lg shadow-brand-gold/20 transition-all hover:scale-105 hover:shadow-brand-gold/30"
            >
              Send Us an Email
            </a>
          </Magnetic>
          <a
            href="mailto:sales@northerncorp.com"
            className="text-sm text-brand-cream/40 hover:text-brand-cream transition-colors underline underline-offset-4"
          >
            sales enquiries →
          </a>
        </motion.div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-brand-cream/25 tracking-widest uppercase">
            © {new Date().getFullYear()} Northern Corporation Ltd. All rights reserved.
          </p>
          <p className="text-xs text-brand-cream/20 tracking-widest uppercase">Dhaka, Bangladesh</p>
        </div>
      </div>
    </footer>
  );
};
