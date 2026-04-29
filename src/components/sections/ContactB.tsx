"use client";

import React from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════
   CONTACT B — Split Layout: Info Columns + Large Map
   Two text columns left, massive map right
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const OFFICES = [
  {
    title: "Head Office",
    lines: [
      "House # 91, Flat # S4, Block - K,",
      "Suhrawardy Avenue,",
      "Baridhara Diplomatic Zone,",
      "Baridhara, Dhaka – 1212",
    ],
  },
  {
    title: "Factory 1 — BSCIC",
    lines: [
      "Plot # B43-45, BSCIC I/E,",
      "Tongi, Gazipur, Bangladesh",
    ],
  },
  {
    title: "Factory 2 — Tapirbari",
    lines: [
      "Tapirbari, Tangra,",
      "Sreepur, Gazipur, Bangladesh",
    ],
  },
];

const CONTACT_DETAILS = [
  { label: "Phone", value: "+88-02-48814594" },
  { label: "Email", value: "info@northerncorp.com" },
];

export const ContactB = () => {
  return (
    <section
      id="contact-b"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#023020] text-[#F5F5EB] lg:h-screen lg:flex-row"
    >
      {/* ── Left: Info Columns ── */}
      <div className="flex flex-1 flex-col justify-between px-6 py-16 md:px-12 lg:w-[45%] lg:py-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="mb-3 font-sans text-xs uppercase tracking-widest text-[#FDD017] md:text-sm">
              Get in Touch
            </p>
            <h2 className="mb-12 font-playfair text-4xl leading-tight text-[#F5F5EB] md:text-5xl lg:text-6xl">
              Contact Us
            </h2>
          </motion.div>

          {/* Two-column office grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10">
            {/* Column 1: Offices */}
            <div className="flex flex-col gap-8">
              {OFFICES.map((office, i) => (
                <motion.div
                  key={office.title}
                  className="border-l-2 border-[#FDD017]/30 pl-5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE }}
                >
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[#FDD017]/60">
                    {office.title}
                  </p>
                  {office.lines.map((line) => (
                    <p
                      key={line}
                      className="font-sans text-sm leading-relaxed text-[#F5F5EB]/70 md:text-base"
                    >
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Column 2: Contact details + socials */}
            <div className="flex flex-col gap-8">
              {CONTACT_DETAILS.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="border-l-2 border-[#FDD017]/30 pl-5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease: EASE }}
                >
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[#FDD017]/60">
                    {item.label}
                  </p>
                  <p className="font-sans text-sm leading-relaxed text-[#F5F5EB]/70 md:text-base">
                    {item.value}
                  </p>
                </motion.div>
              ))}

              {/* Social links */}
              <motion.div
                className="flex flex-wrap gap-3 pt-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6, ease: EASE }}
              >
                {[
                  { name: "LinkedIn", url: "https://www.linkedin.com/in/northern-corporation-ltd" },
                  { name: "Instagram", url: "https://www.instagram.com/northern.corporation/" },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="rounded-full border border-[#F5F5EB]/15 bg-[#F5F5EB]/5 px-5 py-2 font-mono text-[10px] uppercase tracking-widest text-[#F5F5EB]/60 transition-all duration-300 hover:border-[#FDD017]/40 hover:bg-[#FDD017]/10 hover:text-[#FDD017]"
                  >
                    {link.name}
                  </a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Legal links at bottom of text area */}
        <motion.div
          className="mt-12 flex flex-wrap items-center gap-4 border-t border-[#F5F5EB]/10 pt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5EB]/25">
            © {new Date().getFullYear()} Northern Corporation Ltd.
          </p>
          <span className="hidden text-[#F5F5EB]/15 sm:inline">|</span>
          <a
            href="/terms"
            className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5EB]/25 transition-colors hover:text-[#F5F5EB]/50"
          >
            Terms & Conditions
          </a>
          <a
            href="/privacy"
            className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5EB]/25 transition-colors hover:text-[#F5F5EB]/50"
          >
            Privacy Policy
          </a>
        </motion.div>
      </div>

      {/* ── Right: Massive Map ── */}
      <motion.div
        className="relative w-full lg:w-[55%]"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
      >
        {/* Gold accent line between columns */}
        <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-[#FDD017]/20 to-transparent lg:block" />

        <div className="pointer-events-none h-[50vh] w-full md:pointer-events-auto lg:h-full">
          <iframe
            src="https://www.google.com/maps?q=Northern+Corporation+Limited+Baridhara+Dhaka&output=embed"
            style={{
              border: 0,
              filter: "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.9)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Northern Corporation Location — Contact B"
            className="h-full w-full"
          />
        </div>
      </motion.div>
    </section>
  );
};
