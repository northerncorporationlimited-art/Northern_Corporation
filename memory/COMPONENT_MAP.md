# Component Map

- `AppWrapper` → conditionally renders `Preloader`
- `Preloader` → imports and animates `Logo`
- `Logo` → inline responsive SVG component
- `src/app/page.tsx` → renders `DualScroll`, `ScrollProgress`, `HistoryFlow`, `Sustainability`, `ContactFooter`
- `DualScroll` → GSAP ScrollTrigger pinned dual-column split scroll
- `ScrollProgress` → Fixed vertical scroll progress marker
- `HistoryFlow` → Alternating timeline section (Framer Motion whileInView)
- `Sustainability` → Certification grid with fade-up reveals (Framer Motion whileInView)
- `ContactFooter` → Premium dark footer with contact cards and CTA
