import { ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* ═══════════════════════════════════════════════
          SECTION 1 — HOME / HERO
      ═══════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col items-center justify-center bg-northern-evergreen px-6 text-center"
      >
        {/* Subtle decorative gradients */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-northern-amber/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-northern-amber/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          {/* Badge */}
          <span className="mb-6 inline-block rounded-full border border-northern-amber/30 bg-northern-amber/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-northern-amber">
            Est. 1987
          </span>

          {/* Tagline */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-northern-linen sm:text-5xl md:text-6xl lg:text-7xl">
            Knit to Fit{" "}
            <span className="text-northern-amber">Your World</span>
          </h1>

          {/* Sub-text */}
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-northern-linen/70 sm:text-lg">
            Established in 1987, Northern Corporation Ltd. has spent decades
            mastering the art of garment manufacturing.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#what-we-do"
              className="inline-flex items-center gap-2 rounded-full bg-northern-amber px-8 py-3 text-sm font-semibold text-northern-evergreen shadow-lg shadow-northern-amber/20 transition-all hover:scale-105 hover:shadow-northern-amber/30"
            >
              Explore Our Work
              <ArrowDown size={16} />
            </a>
            <a
              href="#contact-us"
              className="inline-flex items-center gap-2 rounded-full border border-northern-linen/20 px-8 py-3 text-sm font-semibold text-northern-linen transition-all hover:border-northern-amber/40 hover:text-northern-amber"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown size={20} className="text-northern-linen/40" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — WHAT WE DO
      ═══════════════════════════════════════════════ */}
      <section
        id="what-we-do"
        className="flex min-h-screen items-center justify-center bg-northern-linen px-6"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-northern-evergreen sm:text-4xl">
            What We Do
          </h2>
          <p className="mt-4 text-northern-evergreen/60">
            Content coming soon.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — ABOUT US
      ═══════════════════════════════════════════════ */}
      <section
        id="about-us"
        className="flex min-h-screen items-center justify-center bg-white px-6"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-northern-evergreen sm:text-4xl">
            About Us
          </h2>
          <p className="mt-4 text-northern-evergreen/60">
            Content coming soon.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4 — CERTIFICATION
      ═══════════════════════════════════════════════ */}
      <section
        id="certification"
        className="flex min-h-screen items-center justify-center bg-northern-linen px-6"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-northern-evergreen sm:text-4xl">
            Certification
          </h2>
          <p className="mt-4 text-northern-evergreen/60">
            Content coming soon.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5 — CONTACT US
      ═══════════════════════════════════════════════ */}
      <section
        id="contact-us"
        className="flex min-h-screen items-center justify-center bg-northern-evergreen px-6"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-northern-linen sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-northern-linen/60">
            Content coming soon.
          </p>
        </div>
      </section>
    </>
  );
}
