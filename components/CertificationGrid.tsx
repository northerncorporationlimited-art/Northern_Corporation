"use client";

import Image from "next/image";
import FadeInScroll from "@/components/animations/FadeInScroll";

const certifications = [
    { name: "GOTS", fullName: "Global Organic Textile Standard", image: "/certifications/gots.png" },
    { name: "OEKO-TEX® Standard 100", fullName: "Confidence in Textiles", image: "/certifications/oeko-tex-100.png" },
    { name: "OEKO-TEX® STeP", fullName: "Sustainable Textile Production", image: "/certifications/oeko-tex-step.png" },
    { name: "BSCI", fullName: "Business Social Compliance Initiative", image: "/certifications/bsci.jpg" },
    { name: "WRAP", fullName: "Worldwide Responsible Accredited Production", image: "/certifications/wrap.png" },
    { name: "SMETA", fullName: "Sedex Members Ethical Trade Audit", image: "/certifications/smeta.png" },
    { name: "Better Cotton", fullName: "Better Cotton Initiative", image: "/certifications/better-cotton.png" },
    { name: "RWS", fullName: "Responsible Wool Standard", image: "/certifications/rws.png" },
    { name: "CmiA", fullName: "Cotton Made in Africa", image: "/certifications/cmia.png" },
    { name: "OCS", fullName: "Organic Content Standard", image: "/certifications/organic-content.png" },
    { name: "RCS", fullName: "Recycled Claim Standard", image: "/certifications/recycled-claim.png" },
    { name: "LEED Gold", fullName: "Leadership in Energy & Environmental Design", image: "/certifications/leed-gold.png" },
    { name: "RSC", fullName: "RMG Sustainability Council", image: "/certifications/rsc.png" },
];

export default function CertificationGrid() {
    return (
        <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="text-center">
                <FadeInScroll>
                    <span className="mb-4 inline-block rounded-full border border-northern-evergreen/20 bg-northern-evergreen/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-northern-evergreen">
                        Quality Assured
                    </span>
                </FadeInScroll>
                <FadeInScroll delay={0.15}>
                    <h2 className="text-3xl font-bold text-northern-evergreen sm:text-4xl md:text-5xl">
                        Certification
                    </h2>
                </FadeInScroll>
                <FadeInScroll delay={0.3}>
                    <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-northern-evergreen/60 sm:text-lg">
                        Our commitment to sustainability, ethical practices, and
                        uncompromising quality is validated by the world&apos;s most
                        respected certification bodies.
                    </p>
                </FadeInScroll>
            </div>

            {/* Certification Grid */}
            <FadeInScroll delay={0.15}>
                <div className="mx-auto mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
                    {certifications.map((cert) => (
                        <div
                            key={cert.name}
                            className="group flex flex-col items-center justify-center rounded-2xl border border-northern-evergreen/10 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-northern-evergreen/20 sm:p-5"
                        >
                            <div className="relative mb-3 h-16 w-full sm:h-20">
                                <Image
                                    src={cert.image}
                                    alt={cert.fullName}
                                    fill
                                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <p className="text-center text-xs font-semibold text-northern-evergreen">
                                {cert.name}
                            </p>
                        </div>
                    ))}
                </div>
            </FadeInScroll>

            {/* Additional Recognition */}
            <FadeInScroll delay={0.2}>
                <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-northern-evergreen/10 bg-northern-evergreen p-6 text-center shadow-lg sm:p-8">
                    <p className="text-sm font-medium leading-relaxed text-northern-linen/80">
                        Northern Corporation is a{" "}
                        <span className="font-bold text-northern-amber">
                            BGMEA Best Environment Compliant Factory
                        </span>{" "}
                        and a proud signatory of the{" "}
                        <span className="font-bold text-northern-amber">
                            UN Global Compact
                        </span>
                        .
                    </p>
                </div>
            </FadeInScroll>
        </div>
    );
}
