import React from "react";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/* ═══════════════════════════════════════════════
   DYNAMIC PRODUCT GALLERY — Server Component
   Auto-generates grid from files in public/products/
   ═══════════════════════════════════════════════ */

const SLUG_TO_FOLDER: Record<string, string> = {
  "tee-polo": "tee-polo",
  bottoms: "bottoms",
  nightwear: "nightwear",
  "sports-active": "sports-active",
  winter: "winter",
};

const SLUG_TO_TITLE: Record<string, string> = {
  "tee-polo": "Tee & Polo",
  bottoms: "Bottoms",
  nightwear: "Nightwear",
  "sports-active": "Sports & Active",
  winter: "Winter",
};

interface PageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return Object.keys(SLUG_TO_FOLDER).map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const title = SLUG_TO_TITLE[category];
  if (!title) return { title: "Not Found" };
  return {
    title: `${title} Collection`,
    description: `Browse Northern Corporation's ${title.toLowerCase()} collection — premium knitwear manufactured in Bangladesh.`,
  };
}

export default async function ProductGalleryPage({ params }: PageProps) {
  const { category } = await params;

  const folder = SLUG_TO_FOLDER[category];
  const title = SLUG_TO_TITLE[category] || category;

  if (!folder) {
    notFound();
  }

  const dirPath = path.join(process.cwd(), "public", "products", folder);
  let files: string[] = [];

  try {
    files = fs
      .readdirSync(dirPath)
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
      .sort((a, b) => {
        const numA = parseInt(a.replace(/\D/g, "")) || 0;
        const numB = parseInt(b.replace(/\D/g, "")) || 0;
        return numA - numB;
      });
  } catch {
    files = [];
  }

  return (
    <div className="min-h-screen bg-[#F5F5EB] px-6 py-24 text-[#023020] md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Back link */}
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest text-[#023020]/50 transition-colors hover:text-[#023020]"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <h1 className="font-playfair text-6xl leading-tight md:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="mt-4 font-sans text-lg text-[#023020]/60">
          {files.length} {files.length === 1 ? "piece" : "pieces"} in this
          collection
        </p>

        {/* Image Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {files.map((file, i) => (
            <div
              key={file}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#023020]/5"
            >
              <Image
                src={`/products/${folder}/${file}`}
                alt={`${title} product ${i + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {files.length === 0 && (
          <p className="mt-16 font-sans text-xl text-[#023020]/40">
            No images found in this collection.
          </p>
        )}
      </div>
    </div>
  );
}
