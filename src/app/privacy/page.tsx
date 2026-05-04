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

        {/* Content */}
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
              3. Employee &amp; Stakeholder Data
            </h2>
            <p>
              Northern Corporation Limited collects and processes personal
              data of employees in connection with our corporate social
              responsibility programs — including the Sarathi Program for
              worker development, child care services, subsidized health and
              hygiene initiatives, annual recognition programs, and workplace
              engagement activities. All employee data is handled in
              accordance with applicable labor laws of the People&apos;s
              Republic of Bangladesh and is used solely for internal
              organizational and welfare purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-playfair text-2xl text-[#023020] md:text-3xl">
              4. Data Security
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
              5. Sustainability Data &amp; Reporting
            </h2>
            <p>
              In pursuit of our long-term GHG carbon emissions reduction
              roadmap extending to 2030, Northern Corporation Limited may
              collect and process environmental data, energy consumption
              metrics, and project-based reporting information in
              collaboration with partners such as Lindex Buyer and ETI
              Bangladesh. This data is used exclusively for sustainability
              planning, environmental impact assessments, and compliance with
              our environmental commitments.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-playfair text-2xl text-[#023020] md:text-3xl">
              6. Your Rights
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
          Last updated: May 2026
        </p>
      </div>
    </div>
  );
}
