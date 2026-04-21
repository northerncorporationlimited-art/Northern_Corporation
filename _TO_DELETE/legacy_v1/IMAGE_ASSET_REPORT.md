# Image Asset Report

> **Source:** `/northern info/images/`
> **Total Assets:** 21 files (19 PNG, 2 JPG)
> **Date:** 2026-03-09

---

## Asset Inventory & Classification

### 🏷️ Company Logos

| File | Format | Size | Description |
|------|--------|------|-------------|
| `image7.png` | PNG | 36 KB | Northern logo (small) — green "N" with needle/thread motif + "NORTHERN EST. 1987" |
| `image20.jpg` | JPG | 84 KB | Northern logo (large, white bg) — same mark, higher detail ✅ **Used as `/public/logo.jpg`** |
| `image21.png` | PNG | 44 KB | OEKO-TEX Standard 100 badge (black) |

### 🎨 Brand Reference

| File | Format | Size | Description |
|------|--------|------|-------------|
| `image1.png` | PNG | 41 KB | Brand color palette reference — Evergreen (#023020), Bright Amber (#FDD017), Soft Linen (#F5F5EB) |

### 📜 Certification Badges

| File | Format | Size | Description |
|------|--------|------|-------------|
| `image2.png` | PNG | 234 KB | RWS — Responsible Wool Standard (Textile Exchange) |
| `image4.png` | PNG | 39 KB | CmiA — Cotton Made in Africa |
| `image5.png` | PNG | 37 KB | OCS — Organic 100 Content Standard & Organic Blended |
| `image8.png` | PNG | 113 KB | RCS — Recycled 100 & Recycled Blended Claim Standard |
| `image9.png` | PNG | 48 KB | SMETA — Sedex Members Ethical Trade Audit |
| `image10.png` | PNG | 123 KB | GOTS — Global Organic Textile Standard |
| `image13.jpg` | JPG | 154 KB | BSCI — Business Social Compliance Initiative |
| `image15.png` | PNG | 78 KB | OEKO-TEX STeP — Sustainable Textile Production |
| `image16.png` | PNG | 9 KB | RSC — RMG Sustainability Council |
| `image17.png` | PNG | 460 KB | WRAP — Worldwide Responsible Accredited Production |
| `image18.png` | PNG | 204 KB | BCI — Better Cotton Initiative |
| `image19.png` | PNG | 143 KB | LEED Gold — Leadership in Energy & Environmental Design |
| `image21.png` | PNG | 44 KB | OEKO-TEX Standard 100 |

### 🏭 Content Sections (Screenshots from existing design)

| File | Format | Size | Description |
|------|--------|------|-------------|
| `image6.png` | PNG | 241 KB | About/CSR content — Daycare Center, Equality, Professional Development (dark bg) |
| `image11.png` | PNG | 292 KB | About/CSR content — Prayer Rooms, Medical Service, Dining (dark bg) |
| `image14.png` | PNG | 1.4 MB | Fabric showcase grid — French Terry, Interlock, Rib, Pique, Fleece, Jersey, Poly Fleece, Knit Polyester |

### 🖼️ Decorative / Hero

| File | Format | Size | Description |
|------|--------|------|-------------|
| `image3.png` | PNG | 12 KB | UI wireframe fragment (minimal, likely a layout reference) |
| `image12.png` | PNG | 84 KB | Hero banner text — "WRAP YOURSELF IN LUXURY" |

---

## Proposed Section Mapping

### Hero (`#home`)
- **`image12.png`** — Use the "Wrap Yourself in Luxury" text as design inspiration for the hero banner
- No direct hero background image available; consider generating or sourcing one

### What We Do (`#what-we-do`)
- **`image14.png`** — Fabric showcase grid (French Terry, Jersey, etc.) — ideal for showcasing product range and materials expertise

### About Us (`#about-us`)
- **`image6.png`** — CSR content: Daycare Center, Equality, Professional Development
- **`image11.png`** — CSR content: Prayer Rooms, Medical Service, Dining
- Use the text content from these images to populate the About Us section with employee welfare initiatives

### Certification (`#certification`)
- **All 13 certification badge images** — Display in a responsive grid:
  - `image2.png` (RWS)
  - `image4.png` (CmiA)
  - `image5.png` (Organic Content Standard)
  - `image8.png` (Recycled Claim Standard)
  - `image9.png` (SMETA)
  - `image10.png` (GOTS)
  - `image13.jpg` (BSCI)
  - `image15.png` (OEKO-TEX STeP)
  - `image16.png` (RSC)
  - `image17.png` (WRAP)
  - `image18.png` (Better Cotton)
  - `image19.png` (LEED Gold)
  - `image21.png` (OEKO-TEX Standard 100)

### Contact Us (`#contact-us`)
- No dedicated image available; this section is text/form-based

---

## Next Steps

1. Copy all certification badge images into `/public/certifications/`
2. Extract text content from `image6.png` and `image11.png` for the About Us section
3. Use `image14.png` fabric data to build a product/material showcase in What We Do
4. Source or generate a hero background image for the Home section
