"use client";

import React from "react";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════════════
   CONTACT C — "The Embassy"
   Immersive fullscreen map bg with frosted-glass
   floating contact cards. Fortune 500 editorial.
   ═══════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CARDS = [
  {
    id: "hq",
    title: "Corporate HQ",
    icon: "◆",
    lines: [
      "House # 91, Flat # S4, Block - K,",
      "Suhrawardy Avenue, Baridhara",
      "Diplomatic Zone, Dhaka – 1212",
    ],
  },
  {
    id: "factory-1",
    title: "Factory 1 — BSCIC",
    icon: "▲",
    lines: [
      "Plot # B43-45, BSCIC I/E,",
      "Tongi, Gazipur, Bangladesh",
    ],
  },
  {
    id: "factory-2",
    title: "Factory 2 — Tapirbari",
    icon: "▲",
    lines: [
      "Tapirbari, Tangra,",
      "Sreepur, Gazipur, Bangladesh",
    ],
  },
  {
    id: "reach",
    title: "Direct Inquiries",
    icon: "●",
    lines: [
      "+88-02-48814594",
      "info@northerncorp.com",
    ],
  },
];

export const ContactC = () => {
  return (
    <section
      id="contact-c"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#023020] lg:h-screen"
    >
      {/* ── Fullscreen Map Background ── */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://www.google.com/maps?q=Northern+Corporation+Limited+Baridhara+Dhaka&output=embed"
          style={{
            border: 0,
            filter: "invert(0.92) hue-rotate(180deg) saturate(0.15) brightness(0.6) contrast(1.2)",
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Northern Corporation Location — Contact C"
          className="pointer-events-none h-full w-full md:pointer-events-auto"
        />
        {/* Dark overlay to ensure card legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#023020] via-[#023020]/70 to-[#023020]/40" />
        {/* Noise grain */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px",
          }}
        />
      </div>

      {/* ── Content Overlay ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-12 lg:py-24">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        >
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.4em] text-[#FDD017]/80 md:text-sm">
            Est. 1967 · Dhaka, Bangladesh
          </p>
          <h2 className="font-playfair text-5xl leading-tight text-[#F5F5EB] md:text-6xl lg:text-7xl">
            The Northern
            <br />
            <span className="italic text-[#FDD017]">Network</span>
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#FDD017]/50 to-transparent" />
        </motion.div>

        {/* Floating Frosted Cards Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              className="group relative overflow-hidden rounded-2xl border border-[#F5F5EB]/10 bg-[#F5F5EB]/[0.06] p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-[#FDD017]/30 hover:bg-[#F5F5EB]/[0.1] hover:shadow-[0_8px_40px_rgba(253,208,23,0.08)] md:p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 * i, ease: EASE }}
            >
              {/* Gold accent corner */}
              <div className="absolute right-0 top-0 h-12 w-12 translate-x-6 -translate-y-6 rotate-45 bg-[#FDD017]/5 transition-all duration-500 group-hover:bg-[#FDD017]/10" />

              {/* Icon */}
              <span className="mb-4 inline-block text-lg text-[#FDD017]/50 transition-colors duration-300 group-hover:text-[#FDD017]">
                {card.icon}
              </span>

              {/* Title */}
              <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[#FDD017]/60">
                {card.title}
              </p>

              {/* Content */}
              {card.lines.map((line) => (
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

        {/* Bottom Bar — Social + Legal */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-6 border-t border-[#F5F5EB]/10 pt-8 sm:flex-row sm:justify-between"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
        >
          {/* Social */}
          <div className="flex gap-3">
            {[
              { name: "LinkedIn", url: "https://www.linkedin.com/in/northern-corporation-ltd" },
              { name: "Instagram", url: "https://www.instagram.com/northern.corporation/" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="rounded-full border border-[#F5F5EB]/10 bg-[#F5F5EB]/5 px-5 py-2 font-mono text-[10px] uppercase tracking-widest text-[#F5F5EB]/50 backdrop-blur-sm transition-all duration-300 hover:border-[#FDD017]/40 hover:bg-[#FDD017]/10 hover:text-[#FDD017]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex items-center gap-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5EB]/20">
              © {new Date().getFullYear()} Northern Corporation Ltd.
            </p>
            <span className="hidden text-[#F5F5EB]/10 sm:inline">|</span>
            <a
              href="/terms"
              className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5EB]/20 transition-colors hover:text-[#F5F5EB]/50"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5EB]/20 transition-colors hover:text-[#F5F5EB]/50"
            >
              Privacy
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
