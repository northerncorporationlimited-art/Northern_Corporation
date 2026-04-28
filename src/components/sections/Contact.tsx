"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════
   CONTACT — Premium Footer Section
   Dark, editorial contact page with map embed
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CONTACT_INFO = [
  {
    label: "Head Office",
    lines: [
      "House # 91, Flat # S4, Block - K,",
      "Suhrawardy Avenue,",
      "Baridhara Diplomatic Zone,",
      "Baridhara, Dhaka – 1212",
    ],
  },
  {
    label: "Factory",
    lines: [
      "Plot # B43-45, BSCIC I/E,",
      "Tongi, Gazipur, Bangladesh",
      "& Tapirbari, Tangra, Sreepur, Gazipur",
    ],
  },
  {
    label: "Phone",
    lines: ["+88-02-48814594"],
  },
  {
    label: "Email",
    lines: ["info@northerncorp.com"],
  },
];

const SOCIAL_LINKS = [
  { name: "LinkedIn", url: "#" },
  { name: "Facebook", url: "#" },
];

export const Contact = () => {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-[#023020] py-20 text-[#F5F5EB] lg:h-screen lg:py-0"
    >
      {/* Main content area */}
      <div className="flex flex-1 flex-col justify-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            {/* ── Left Column — Contact Info ── */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
            >
              <p className="mb-3 font-sans text-xs uppercase tracking-widest text-[#FDD017] md:text-sm">
                Get in Touch
              </p>
              <h2 className="mb-10 font-playfair text-5xl leading-tight text-[#F5F5EB] md:text-6xl lg:text-7xl">
                Contact Us
              </h2>

              <div className="flex flex-col gap-8">
                {CONTACT_INFO.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="border-l-2 border-[#FDD017]/30 pl-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE }}
                  >
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-[#FDD017]/60">
                      {item.label}
                    </p>
                    {item.lines.map((line) => (
                      <p
                        key={line}
                        className="font-sans text-base leading-relaxed text-[#F5F5EB]/80 md:text-lg"
                      >
                        {line}
                      </p>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Social links */}
              <motion.div
                className="mt-10 flex gap-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
              >
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    className="rounded-full border border-[#F5F5EB]/15 bg-[#F5F5EB]/5 px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest text-[#F5F5EB]/60 transition-all duration-300 hover:border-[#FDD017]/40 hover:bg-[#FDD017]/10 hover:text-[#FDD017]"
                  >
                    {link.name}
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right Column — Map ── */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            >
              <div className="relative w-full overflow-hidden rounded-3xl border border-[#F5F5EB]/10">
                <a
                  href="https://www.google.com/maps/search/Northern+Corporation+Limited+Baridhara+Dhaka"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-video w-full lg:aspect-[4/3]"
                  aria-label="View Northern Corporation location on Google Maps"
                >
                  <Image
                    src="/images/map-baridhara.png"
                    alt="Northern Corporation head office location — Baridhara Diplomatic Zone, Dhaka"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  {/* Hover overlay with CTA */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#023020]/0 transition-colors duration-300 group-hover:bg-[#023020]/40">
                    <span className="rounded-full border border-[#FDD017]/40 bg-[#023020]/80 px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest text-[#FDD017] opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      View on Google Maps ↗
                    </span>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Footer Bar ── */}
      <div className="shrink-0 border-t border-[#F5F5EB]/10 px-6 py-6 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5EB]/30">
            © {new Date().getFullYear()} Northern Corporation Limited. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5EB]/30 transition-colors hover:text-[#F5F5EB]/60"
            >
              Terms & Conditions
            </a>
            <a
              href="#"
              className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5EB]/30 transition-colors hover:text-[#F5F5EB]/60"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
