"use client";

import React from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════
   CONTACT — Premium Footer Section
   Dark, editorial contact page with map embed
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CONTACT_INFO = [
  {
    label: "Factory & Head Office",
    lines: ["Kayempur, Fatullah,", "Narayanganj-1420, Bangladesh"],
  },
  {
    label: "Phone",
    lines: ["+880 9613 444 555"],
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
      className="relative flex h-screen w-full flex-col overflow-hidden bg-[#023020] text-[#F5F5EB]"
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
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.2175!2d90.4895!3d23.6948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQxJzQxLjMiTiA5MMKwMjknMjIuMiJF!5e0!3m2!1sen!2sbd!4v1"
                  width="100%"
                  height="400"
                  style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.3)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Northern Corporation Location"
                  className="aspect-square w-full lg:aspect-[4/3]"
                />
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
