"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./v4.module.css";
import Navbar from "@/components/Navbar";
import ContactInfo from "@/components/ContactInfo";

export default function V4Page() {
    // We import Navbar separately since it's global, but the rest is scoped.
    // Replace the legacy nav with the site's global Navbar component to maintain routing.

    const maskTextLayerRef = useRef<HTMLDivElement>(null);
    const maskContentRef = useRef<HTMLDivElement>(null);
    const metricsRowRef = useRef<HTMLDivElement>(null);

    // For intersection observers
    const [revealedElements, setRevealedElements] = useState<Set<string>>(new Set());
    const section2Ref = useRef<HTMLElement>(null);

    // Alpha mask scrolling logic translated from main.js
    useEffect(() => {
        const handleAlphaMaskScroll = () => {
            const section = section2Ref.current;
            const layer = maskTextLayerRef.current;
            const content = maskContentRef.current;

            if (!section || !layer || !content) return;

            const target = document.getElementById("zoom-target");
            if (target) {
                const layerRect = layer.getBoundingClientRect();
                const targetRect = target.getBoundingClientRect();
                const originX = ((targetRect.left + targetRect.width / 2) - layerRect.left) / layerRect.width * 100;
                const originY = ((targetRect.top + targetRect.height / 2) - layerRect.top) / layerRect.height * 100;
                layer.style.transformOrigin = `${originX}% ${originY}%`;
            }

            const rect = section.getBoundingClientRect();
            // Calculate progress from 0 to 1 based on sticky scrolling
            let progress = -rect.top / (rect.height - window.innerHeight);
            progress = Math.max(0, Math.min(1, progress));

            // Phase 1: Scale text & fade out (progress 0.0 to 0.35)
            let scaleProgress = Math.min(1, progress / 0.35);
            const easeScale = scaleProgress < 0.5 ? 2 * scaleProgress * scaleProgress : -1 + (4 - 2 * scaleProgress) * scaleProgress;
            let scale = 1 + easeScale * 150;
            layer.style.transform = `scale(${scale})`;

            // Hide text layer when zoomed fully to prevent blocking clicks
            layer.style.opacity = progress > 0.35 ? "0" : "1";

            // Phase 2: Staccato words in the void (progress 0.38 to 0.68)
            const w1 = document.getElementById("staccato-1");
            const w2 = document.getElementById("staccato-2");
            const w3 = document.getElementById("staccato-3");

            if (w1 && w2 && w3) {
                w1.classList.toggle(styles.visible, progress > 0.38 && progress <= 0.48);
                w2.classList.toggle(styles.visible, progress > 0.48 && progress <= 0.58);
                w3.classList.toggle(styles.visible, progress > 0.58 && progress <= 0.68);
            }

            // Phase 3: Final content and image reveal (progress 0.72+)
            content.classList.toggle(styles.visible, progress > 0.72);
        };

        window.addEventListener("scroll", handleAlphaMaskScroll, { passive: true });
        // Trigger once to set initial state
        handleAlphaMaskScroll();

        return () => window.removeEventListener("scroll", handleAlphaMaskScroll);
    }, []);

    // Intersection Observers for revealed elements and counters
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("data-reveal-id");
                        if (id) {
                            setRevealedElements((prev) => new Set(prev).add(id));
                        }
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
        );

        const elements = document.querySelectorAll("[data-reveal-id]");
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Proof of Scale Counter Animation
    const [counts, setCounts] = useState({ items: 0, countries: 0, years: 0, machines: 0 });
    const [countersAnimated, setCountersAnimated] = useState(false);

    useEffect(() => {
        const row = metricsRowRef.current;
        if (!row || countersAnimated) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !countersAnimated) {
                    setCountersAnimated(true);

                    const duration = 2000;
                    const start = performance.now();

                    const targetItems = 12;
                    const targetCountries = 40;
                    const targetYears = 34; // Later changing to 37 (Est 1987) based on client data
                    const targetMachines = 1300;

                    const animate = (now: number) => {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                        setCounts({
                            items: Math.floor(ease * targetItems),
                            countries: Math.floor(ease * targetCountries),
                            years: Math.floor(ease * 37), // Est 1987 = ~37 years
                            machines: Math.floor(ease * targetMachines),
                        });

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    requestAnimationFrame(animate);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(row);
        return () => observer.disconnect();
    }, [countersAnimated]);

    // Sticky accordion state
    const [activePanel, setActivePanel] = useState(0);

    return (
        <div className={styles.v4Container}>
            <Navbar />

            {/* ═══════════════════════════════════════════════════ */}
            {/* SECTION 1 — CINEMATIC HERO                          */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className={styles.hero} id="home">
                <div className={styles.heroBg}>
                    <div className={styles.heroImageBg} />
                    <div className={styles.heroBgOverlay} />
                </div>

                <div className={styles.heroHeadline}>
                    <div className={styles.heroHeadlineRow}>
                        <span className={styles.heroWord} style={{ animationDelay: "0.4s" }}>Decades</span>
                        <span className={styles.heroWord} style={{ animationDelay: "0.52s" }}>of</span>
                    </div>
                    <div className={styles.heroHeadlineRow}>
                        <span className={`${styles.heroWord} ${styles.heroWordSerif}`} style={{ animationDelay: "0.64s" }}>Expertise</span>
                    </div>
                </div>

                <div className={styles.heroBottom}>
                    <div className={styles.heroSubtitle}>
                        <div className={styles.heroSubLine}>
                            <span className={styles.heroSubText} style={{ animationDelay: "0.9s" }}>
                                Northern Corporation Ltd. —
                            </span>
                        </div>
                        <div className={styles.heroSubLine}>
                            <span className={styles.heroSubText} style={{ animationDelay: "1.05s" }}>
                                Engineering comfort, durability, and style since 1987.
                            </span>
                        </div>
                    </div>
                    <Link href="#what-we-do" className={styles.heroCtaBtn}>
                        <span className={styles.heroCtaText}>Discover More</span>
                        <span className={styles.heroCtaArrow}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </Link>
                </div>

                <div className={styles.heroScroll}>
                    <div className={styles.heroScrollLine} />
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* SECTION 2 — ALPHA STATEMENT (Mask Variant)          */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className={styles.alphaMaskSection} id="statement" ref={section2Ref}>
                <div className={styles.alphaMaskSticky}>

                    <div className={styles.alphaMaskTextLayer} ref={maskTextLayerRef}>
                        <div className={styles.alphaMaskWord}>ROOTED</div>
                        <div className={styles.alphaMaskWord}>
                            IN D<span className={styles.alphaMaskTarget} id="zoom-target">H</span>AKA
                        </div>
                    </div>

                    <div className={styles.alphaMaskStaccato}>
                        <div className={styles.staccatoWord} id="staccato-1">PRECISION.</div>
                        <div className={styles.staccatoWord} id="staccato-2">UNCOMPROMISING.</div>
                        <div className={styles.staccatoWord} id="staccato-3">QUALITY.</div>
                    </div>

                    <div className={styles.alphaMaskContent} ref={maskContentRef}>
                        <div className={styles.alphaMaskBgImage}>
                            <Image
                                src="/hero-factory.png"
                                alt="Northern Manufacturing Facility"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className={styles.alphaMaskOverlay} />

                        <div className={styles.finalRevealContainer}>
                            <div className={styles.finalRevealHeadline}>
                                <h2 className={`${styles.titleAlpha} ${styles.textWhite}`}>
                                    Future-Focused<br />
                                    <span className={`${styles.textSerif} ${styles.textAccentItalic}`}>Innovation.</span>
                                </h2>
                            </div>

                            <div className={styles.finalRevealMetrics}>
                                <div className={styles.metricCol}>
                                    <div className={`${styles.metricVal} ${styles.textWhite}`}>
                                        37<span className={styles.textAccent}>+</span>
                                    </div>
                                    <div className={styles.metricLabel}>Years of Legacy</div>
                                </div>
                                <div className={styles.metricCol}>
                                    <div className={`${styles.metricVal} ${styles.textWhite}`}>
                                        3000<span className={styles.textAccent}>+</span>
                                    </div>
                                    <div className={styles.metricLabel}>Employees</div>
                                </div>
                                <div className={styles.metricCol}>
                                    <div className={`${styles.metricVal} ${styles.textWhite}`}>
                                        30<span className={styles.textAccent}>M+</span>
                                    </div>
                                    <div className={styles.metricLabel}>Annual Revenue ($)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* SECTION 3 — INFRASTRUCTURE (Sticky Variant)         */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className={styles.infraStickySection} id="what-we-do">
                <div className={`${styles.containerBase} ${styles.infraContainer}`}>
                    <div className={styles.gridSplit}>

                        <div className={styles.splitLeft}>
                            <div className={styles.infraStickyNav}>
                                <div className={`${styles.labelAccent} ${styles.mb4x}`}>INFRASTRUCTURE</div>

                                {[
                                    { num: "01", title: "KNITTING" },
                                    { num: "02", title: "MATERIAL SCIENCE" },
                                    { num: "03", title: "PRECISION SEWING" }
                                ].map((item, i) => (
                                    <div
                                        key={item.num}
                                        className={`${styles.infraNavItem} ${activePanel === i ? styles.active : ""}`}
                                        onClick={() => setActivePanel(i)}
                                    >
                                        <span className={styles.infraNum}>{item.num}</span>
                                        <h3 className={styles.infraTitle}>{item.title}</h3>
                                    </div>
                                ))}

                                <Link href="#contact-us" className={`${styles.btnOutline} ${styles.mt8x}`}>
                                    Explore Facilities
                                </Link>
                            </div>
                        </div>

                        <div className={styles.splitRight}>
                            {[
                                {
                                    img: "/v4/infrastructure/knitting.png",
                                    desc: "State-of-the-art European machinery ensuring unparalleled fabric consistency and unmatched production speed.",
                                    idx: 0
                                },
                                {
                                    img: "/v4/infrastructure/materials.png",
                                    desc: "Advanced R&D labs innovating sustainable, high-performance textiles engineered for the modern luxury market.",
                                    idx: 1
                                },
                                {
                                    img: "/v4/infrastructure/sewing.png",
                                    desc: "Lean manufacturing principles deployed across 1300+ advanced workstations, achieving a 99.2% right-first-time quality rate.",
                                    idx: 2
                                }
                            ].map((panel, i) => (
                                <div
                                    key={i}
                                    className={`${styles.infraPanel} ${activePanel === i ? styles.inView : ""}`}
                                >
                                    <div className={styles.infraPanelImg}>
                                        <Image
                                            src={panel.img}
                                            alt={panel.desc}
                                            width={800}
                                            height={1000}
                                        />
                                    </div>
                                    <div className={styles.infraPanelContent}>
                                        <p>{panel.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════ */}
            {/* SECTION 4 — PROOF OF SCALE                          */}
            {/* ═══════════════════════════════════════════════════ */}
            <section className={styles.proofOfScale} id="about-us">
                <div className={styles.containerBase}>
                    <div
                        data-reveal-id="proof-header"
                        className={`${styles.labelAccent} ${styles.mb6x} ${styles.revealBase} ${revealedElements.has("proof-header") ? styles.revealActive : ""}`}
                    >
                        PROOF OF SCALE
                    </div>

                    <div
                        data-reveal-id="proof-metrics"
                        ref={metricsRowRef}
                        className={`${styles.posMetricsRow} ${styles.revealBase} ${revealedElements.has("proof-metrics") ? styles.revealActive : ""}`}
                    >
                        <div className={styles.posMetric}>
                            <span className={styles.posMetricNum}>{counts.items}</span>
                            <span className={styles.posMetricSuffix}>M+</span>
                            <div className={styles.posMetricLabel}>Items Produced Yearly</div>
                        </div>
                        <div className={styles.posMetricDivider} />
                        <div className={styles.posMetric}>
                            <span className={styles.posMetricNum}>{counts.countries}</span>
                            <span className={styles.posMetricSuffix}>+</span>
                            <div className={styles.posMetricLabel}>Countries Exported To</div>
                        </div>
                        <div className={styles.posMetricDivider} />
                        <div className={styles.posMetric}>
                            <span className={styles.posMetricNum}>{counts.machines}</span>
                            <span className={styles.posMetricSuffix}>+</span>
                            <div className={styles.posMetricLabel}>Advanced Machines</div>
                        </div>
                    </div>
                </div>

                <div className={styles.containerBase}>
                    <p
                        data-reveal-id="proof-tagline"
                        className={`${styles.posTagline} ${styles.revealBase} ${revealedElements.has("proof-tagline") ? styles.revealActive : ""}`}
                    >
                        Trusted by the world&apos;s most demanding brands
                    </p>
                </div>

                {/* Marquee */}
                <div className={styles.marquee}>
                    <div className={styles.marqueeTrack}>
                        {[...Array(2)].map((_, groupIndex) => (
                            <div key={groupIndex} className={styles.marqueeGroup}>
                                <Image src="/client_logos/Picture2.png" alt="Client Logo" width={120} height={60} className={styles.partnerLogo} />
                                <Image src="/client_logos/Picture3.png" alt="Client Logo" width={120} height={60} className={styles.partnerLogo} />
                                <Image src="/client_logos/Picture4.png" alt="Client Logo" width={120} height={60} className={styles.partnerLogo} />
                                <Image src="/client_logos/Picture5.png" alt="Client Logo" width={120} height={60} className={styles.partnerLogo} />
                                <Image src="/client_logos/Picture6.png" alt="Client Logo" width={120} height={60} className={styles.partnerLogo} />
                                <Image src="/client_logos/Picture7.png" alt="Client Logo" width={120} height={60} className={styles.partnerLogo} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div id="contact-us">
                <ContactInfo />
            </div>

            <footer className={styles.footer}>
                <div className={`${styles.containerBase} ${styles.pb8x}`}>
                    <div className={styles.footerMassiveText}>NORTHERN</div>
                </div>
            </footer>
        </div>
    );
}
