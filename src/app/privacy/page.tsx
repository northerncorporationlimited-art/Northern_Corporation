import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy detailing how Northern Corporation Limited collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F5F5EB] px-6 py-24 text-[#023020] md:py-32">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest text-[#023020]/50 transition-colors hover:text-[#023020]"
        >
          ← Back to Home
        </Link>

        {/* Title */}
        <h1 className="font-playfair text-5xl leading-tight text-[#023020] md:text-6xl lg:text-7xl">
          Privacy Policy
        </h1>

        {/* Client content banner */}
        <div className="mt-8 rounded-xl border-2 border-dashed border-[#FDD017] bg-[#FDD017]/10 px-6 py-4">
          <p className="font-mono text-sm font-bold uppercase tracking-widest text-[#023020]">
            [CLIENT LEGAL TEXT TO REPLACE]
          </p>
          <p className="mt-1 font-sans text-sm text-[#023020]/60">
            The content below is standard boilerplate. Replace with your
            approved legal text before launch.
          </p>
        </div>

        {/* Boilerplate content */}
        <div className="mt-12 space-y-8 font-sans text-base leading-[1.8] text-[#023020]/70 md:text-lg md:leading-[1.9]">
          <section>
            <h2 className="mb-4 font-playfair text-2xl text-[#023020] md:text-3xl">
              1. Information We Collect
            </h2>
            <p>
              Northern Corporation Limited may collect personal information
              that you voluntarily provide when contacting us through our
              website, including your name, email address, phone number, and
              any other details you choose to share. We may also automatically
              collect certain technical information such as your IP address,
              browser type, operating system, and browsing behavior through
              cookies and similar technologies for the purpose of improving
              our website experience.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-playfair text-2xl text-[#023020] md:text-3xl">
              2. How We Use Your Information
            </h2>
            <p>
              The information we collect is used to respond to your inquiries,
              improve our website and services, communicate with you about our
              products and capabilities, and comply with applicable legal
              obligations. We do not sell, trade, or otherwise transfer your
              personal information to outside parties without your consent,
              except as required by law or as necessary to protect our rights,
              property, or safety.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-playfair text-2xl text-[#023020] md:text-3xl">
              3. Data Security
            </h2>
            <p>
              Northern Corporation Limited implements reasonable technical and
              organizational security measures to protect your personal
              information against unauthorized access, alteration, disclosure,
              or destruction. However, no method of transmission over the
              Internet or electronic storage is completely secure, and we
              cannot guarantee absolute security. You acknowledge that you
              provide your personal information at your own risk.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-playfair text-2xl text-[#023020] md:text-3xl">
              4. Your Rights
            </h2>
            <p>
              You have the right to request access to, correction of, or
              deletion of your personal data held by Northern Corporation
              Limited. To exercise any of these rights, please contact us
              using the information provided on our website. We will respond
              to your request within a reasonable timeframe and in accordance
              with applicable data protection laws. This privacy policy may be
              updated periodically, and any changes will be posted on this
              page with a revised effective date.
            </p>
          </section>
        </div>

        {/* Last updated */}
        <p className="mt-16 font-mono text-xs uppercase tracking-widest text-[#023020]/30">
          Last updated: April 2026
        </p>
      </div>
    </div>
  );
}
