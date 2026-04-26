import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FACILITIES } from "@/data/facilities";
import type { Metadata } from "next";

/* ═══════════════════════════════════════════════
   FACILITY DETAIL PAGE — Server Component
   Editorial layout with hero, stats, details,
   and gallery. Generated statically at build.
   ═══════════════════════════════════════════════ */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FACILITIES.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const facility = FACILITIES.find((f) => f.slug === slug);
  if (!facility) return { title: "Not Found" };

  return {
    title: facility.title,
    description: facility.description,
  };
}

export default async function FacilityDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const facility = FACILITIES.find((f) => f.slug === slug);

  if (!facility) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#023020] text-[#F5F5EB]">
      {/* ── Hero Section ── */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src={facility.image}
          alt={facility.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#023020] via-[#023020]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#023020]/40 to-transparent" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 md:px-16 md:pb-16 lg:px-24 lg:pb-20">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/#facilities"
              className="mb-6 inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest text-[#FDD017]/70 transition-colors hover:text-[#FDD017]"
            >
              ← Back to Life at Northern
            </Link>
            <p className="mb-3 font-sans text-xs uppercase tracking-[0.25em] text-[#FDD017]">
              {facility.tagline}
            </p>
            <h1 className="font-playfair text-5xl leading-tight text-[#F5F5EB] md:text-6xl lg:text-7xl">
              {facility.title}
            </h1>
            <p className="mt-4 max-w-2xl font-sans text-lg leading-relaxed text-[#F5F5EB]/70 md:text-xl">
              {facility.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-b border-[#F5F5EB]/10 bg-[#023020]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
          {facility.highlights.map((h, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1 border-r border-[#F5F5EB]/10 px-6 py-8 last:border-r-0 md:py-10"
            >
              <span className="font-playfair text-3xl text-[#FDD017] md:text-4xl">
                {h.value}
              </span>
              <span className="font-sans text-xs uppercase tracking-widest text-[#F5F5EB]/50">
                {h.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Content Section ── */}
      <section className="px-6 py-16 md:px-16 md:py-24 lg:px-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-5">
          {/* Left — Long Description (3/5) */}
          <div className="lg:col-span-3">
            <h2 className="mb-8 font-playfair text-3xl text-[#F5F5EB] md:text-4xl">
              About This Facility
            </h2>
            <p className="font-sans text-base leading-[1.8] text-[#F5F5EB]/70 md:text-lg md:leading-[1.9]">
              {facility.longDescription}
            </p>
          </div>

          {/* Right — Key Details (2/5) */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 font-sans text-xs uppercase tracking-widest text-[#FDD017]">
              Key Features
            </h3>
            <ul className="space-y-4">
              {facility.details.map((detail, i) => (
                <li
                  key={i}
                  className="flex gap-3 border-b border-[#F5F5EB]/5 pb-4 last:border-b-0"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FDD017]/10 text-xs text-[#FDD017]">
                    ✓
                  </span>
                  <span className="font-sans text-sm leading-relaxed text-[#F5F5EB]/60">
                    {detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section className="px-6 pb-16 md:px-16 md:pb-24 lg:px-24">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-8 font-sans text-xs uppercase tracking-widest text-[#FDD017]">
            Gallery
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {facility.galleryImages.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#F5F5EB]/5"
              >
                <Image
                  src={img}
                  alt={`${facility.title} gallery ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Footer ── */}
      <section className="border-t border-[#F5F5EB]/10 px-6 py-12 md:px-16 md:py-16 lg:px-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h3 className="font-playfair text-2xl text-[#F5F5EB] md:text-3xl">
              Discover More About Life at Northern
            </h3>
            <p className="mt-2 font-sans text-sm text-[#F5F5EB]/50">
              Explore our other employee facilities and programs.
            </p>
          </div>
          <Link
            href="/#facilities"
            className="shrink-0 rounded-full bg-[#FDD017] px-8 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-[#023020] transition-all hover:bg-[#FDD017]/90 hover:shadow-lg hover:shadow-[#FDD017]/20"
          >
            View All Facilities
          </Link>
        </div>
      </section>
    </div>
  );
}
