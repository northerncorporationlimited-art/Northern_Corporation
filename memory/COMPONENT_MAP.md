# Component Map

- `AppWrapper` -> conditionally renders `Preloader`
- `Preloader` -> imports and animates `Logo`
- `Logo` -> inline responsive SVG component
- `src/app/page.tsx` -> renders `DualScroll` & `ScrollProgress`
- `DualScroll` -> Handles GSAP ScrollTrigger pinning and dual left/right scrolling
- `ScrollProgress` -> Dynamic scroll progress marker component
