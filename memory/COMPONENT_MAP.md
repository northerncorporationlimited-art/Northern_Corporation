# Component Map

- `AppWrapper` → conditionally renders `Preloader`
- `Preloader` → imports and animates `Logo`
- `Logo` → inline responsive SVG component
- `src/app/page.tsx` → renders `DualScroll`, `ScrollProgress`, `HistoryFlow`, `Sustainability`, `WorkLife`, `ContactFooter`
- `DualScroll` → GSAP ScrollTrigger pinned dual-column split scroll (4 panels + accordion)
- `ScrollProgress` → Fixed vertical scroll progress marker
- `HistoryFlow` → Alternating timeline (1967–2018 + Today) with Framer Motion whileInView
- `Sustainability` → Certification grid (13 certs) + recognition banner (BGMEA, UN, SNV)
- `WorkLife` → "Life at Northern" HR well-being card grid (6 items)
- `ContactFooter` → Premium dark footer with contact cards, CTA, and copyright bar
