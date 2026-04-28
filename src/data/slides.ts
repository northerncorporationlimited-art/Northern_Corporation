/* ═══════════════════════════════════════════════
   SLIDE CONFIG — Single source of truth for
   PresentationDeck order, Navbar labels, and
   dark/light background assignments.
   ═══════════════════════════════════════════════ */

export interface SlideConfig {
  id: string;
  label: string;           // PresentationDeck progress rail label
  navLabel: string;        // Navbar link label
  isDark: boolean;         // true = dark bg → transparent navbar
  showInDesktopNav: boolean; // false = hidden from condensed desktop nav
}

export const SLIDES: SlideConfig[] = [
  { id: "hero",           label: "Hero",           navLabel: "Home",           isDark: true,  showInDesktopNav: false },
  { id: "about",          label: "About Us",       navLabel: "About",          isDark: false, showInDesktopNav: true  },
  { id: "eco-impact",     label: "Eco Impact",     navLabel: "Sustainability", isDark: true,  showInDesktopNav: true  },
  { id: "products",       label: "Products",       navLabel: "Products",       isDark: false, showInDesktopNav: true  },
  { id: "global-reach",   label: "Global Reach",   navLabel: "Global Reach",   isDark: true,  showInDesktopNav: true  },
  { id: "facilities",     label: "Facilities",     navLabel: "Our People",     isDark: true,  showInDesktopNav: true  },
  { id: "certifications", label: "Certifications", navLabel: "Certifications", isDark: false, showInDesktopNav: true  },
  { id: "contact",        label: "Contact",        navLabel: "Contact",        isDark: true,  showInDesktopNav: false },
];

/** Labels array for PresentationDeck */
export const SLIDE_LABELS = SLIDES.map((s) => s.label);

/** Desktop nav links (excludes Home and Contact — they have dedicated UI) */
export const NAV_LINKS = SLIDES.reduce<{ label: string; slideIndex: number }[]>(
  (acc, slide, i) => {
    if (slide.showInDesktopNav) acc.push({ label: slide.navLabel, slideIndex: i });
    return acc;
  },
  []
);

/** All links for mobile bottom sheet */
export const ALL_LINKS = SLIDES.map((s, i) => ({
  label: s.navLabel,
  slideIndex: i,
}));

/** Slide indices with dark backgrounds — navbar adapts styling */
export const DARK_SLIDES = new Set(
  SLIDES.reduce<number[]>((acc, s, i) => {
    if (s.isDark) acc.push(i);
    return acc;
  }, [])
);
