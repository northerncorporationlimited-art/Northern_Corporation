import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions governing the use of the Northern Corporation Limited website.",
};

export default function TermsPage() {
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
          Terms &amp; Conditions
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
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using the Northern Corporation Limited website,
              you acknowledge that you have read, understood, and agree to be
              bound by these Terms &amp; Conditions. If you do not agree with
              any part of these terms, you must not use this website. Northern
              Corporation Limited reserves the right to modify these terms at
              any time without prior notice. Continued use of the website
              following any changes constitutes your acceptance of the revised
              terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-playfair text-2xl text-[#023020] md:text-3xl">
              2. Intellectual Property
            </h2>
            <p>
              All content on this website, including but not limited to text,
              graphics, logos, images, audio clips, digital downloads, and data
              compilations, is the property of Northern Corporation Limited or
              its content suppliers and is protected by international copyright
              and intellectual property laws. The compilation of all content on
              this site is the exclusive property of Northern Corporation
              Limited. Unauthorized reproduction, modification, distribution,
              or republication of any materials without prior written consent
              is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-playfair text-2xl text-[#023020] md:text-3xl">
              3. Limitation of Liability
            </h2>
            <p>
              Northern Corporation Limited shall not be liable for any direct,
              indirect, incidental, consequential, or punitive damages arising
              out of your access to, or use of, this website. This includes,
              without limitation, damages for loss of profits, data, or other
              intangible losses, even if Northern Corporation Limited has been
              advised of the possibility of such damages. The information
              provided on this website is for general informational purposes
              only and does not constitute professional advice.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-playfair text-2xl text-[#023020] md:text-3xl">
              4. Governing Law
            </h2>
            <p>
              These Terms &amp; Conditions shall be governed by and construed
              in accordance with the laws of the People&apos;s Republic of
              Bangladesh. Any disputes arising under or in connection with
              these terms shall be subject to the exclusive jurisdiction of the
              courts of Dhaka, Bangladesh. If any provision of these terms is
              found to be unenforceable or invalid, that provision shall be
              limited or eliminated to the minimum extent necessary so that
              these terms shall otherwise remain in full force and effect.
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
