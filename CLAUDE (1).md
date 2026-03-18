# CLAUDE.md — Nocara Dark Project Context

## Project Overview
**Nocara Dark** is a luxury scroll-animation website for single-origin handcrafted chocolate.
- Stack: Next.js 14 (App Router, TypeScript), Tailwind CSS, HTML5 Canvas API
- No Three.js. No GSAP. Canvas only.
- Fonts: Playfair Display (headings) + Inter (body) from Google Fonts
- Deploy target: Vercel

---

## Brand Identity
| Key | Value |
|-----|-------|
| Name | Nocara Dark |
| Tagline | Dark. Pure. Obsessive. |
| Sub-tagline | Single-origin cocoa. Nothing compromised. |
| Aesthetic | Valrhona meets Aesop meets Apple.com — warm, indulgent, cinematic |
| Feel | Like being inside a chocolate factory at night. Warm, hungry, obsessive. |

---

## Color System
```css
--bg-deep:       #0D0600;   /* near-black warm cocoa — main background */
--bg-section:    #1A0A02;   /* deep cocoa brown */
--bg-card:       #261208;   /* card background */
--cocoa:         #3B1F0A;   /* deep cocoa */
--molten:        #D4831A;   /* molten gold — primary accent */
--molten-light:  #F0A84A;   /* light molten — glows and highlights */
--cream:         #FFF8E7;   /* warm cream — primary text */
--cream-muted:   #C8A882;   /* warm taupe — secondary text */

--gradient-hero: linear-gradient(180deg, #0D0600 0%, #1A0A02 50%, #0D0600 100%);
--gradient-gold: linear-gradient(135deg, #D4831A 0%, #F0A84A 50%, #D4831A 100%);
--gradient-text: linear-gradient(135deg, #FFF8E7 0%, #D4831A 40%, #F0A84A 100%);
```

---

## Typography System

### Google Fonts Import (in `layout.tsx`)
- **Playfair Display**: weights 400, 500, 700, 900 (include italic variants)
- **Inter**: weights 300, 400, 500

### Scale (desktop)
| Role | Size | Weight | Letter-spacing | Font | Notes |
|------|------|--------|---------------|------|-------|
| Display | 100px | 400 | -2px | Playfair Display italic | Hero/CTA |
| H1 | 76px | 400 | -1.5px | Playfair Display | |
| H2 | 52px | 500 | -1px | Playfair Display | |
| H3 | 32px | 700 | — | Playfair Display | |
| Body | 16px | 300 | — | Inter | line-height 1.9 |
| Caption | 11px | 400 | 4px | Inter | UPPERCASE |
| CTA | 13px | 500 | 3px | Inter | UPPERCASE |

---

## Scroll Animation Architecture

### Source
- Video file: `scroll-animation.mp4` in project root
- Extract frames: `ffmpeg -i scroll-animation.mp4 -vf fps=30 public/frames/frame_%04d.webp`
- Output format: `.webp` to `/public/frames/`

### Canvas Setup
- Full viewport, `position: sticky`, background `#0D0600`
- Total scroll height: **500vh**
- Frame driven by scroll progress (0–1)
- Warm glow behind canvas: `radial-gradient(rgba(212,131,26,0.06) at center)` — gives the chocolate an emanating warmth

### 3-Act Story
| Act | Scroll % | Scene |
|-----|----------|-------|
| 1 | 0–28% | Perfect chocolate bar, solid, sitting in warm darkness |
| 2 | 30–68% | Melts → flows → cocoa beans crack → golden dust disperses |
| 3 | 72–100% | Liquid reforms → solidifies → perfect bar returns |

---

## Text Overlay Specs

### Section 1 — Single Origin (visible 0%–22%)
- **Position**: bottom-left, 10% from left, 15% from bottom
- **Label**: `SINGLE ORIGIN` — 11px Inter, letter-spacing 4px, color `#D4831A`, uppercase
- **Headline**: `"Dark.\nPure.\nObsessive."` — 84px Playfair Display, weight 400, italic, gradient text `#FFF8E7 → #D4831A`, line-height 1.0
- **Subtext**: `"Crafted from single-origin cocoa beans."` — 16px Inter weight 300, color `#C8A882`, margin-top 24px

### Section 2 — The Melt Moment (visible 30%–55%)
- **Position**: top-right, 8% from right, 18% from top
- **Label**: `THE MELT MOMENT` — same label style
- **Headline**: `"The Melt\nMoment."` — 76px Playfair Display, weight 500, color `#FFF8E7`
- **Subtext**: `"72% dark. 100% real."` — same subtext style, color `#C8A882`

### Section 3 — Reborn (visible 60%–78%)
- **Position**: center, perfectly centered horizontally
- **Label**: `REBORN` — centered
- **Headline**: `"Reborn\nEvery Time."` — 92px Playfair Display, weight 400, italic, gradient `#D4831A → #F0A84A → #FFF8E7`, centered
- **Subtext**: `"Every bar made to be broken."` — centered, color `#C8A882`

### Section 4 — CTA (visible 84%–100%)
- **Position**: perfectly centered
- **Headline**: `"Taste the Craft."` — 96px Playfair Display, weight 400, color `#FFF8E7`
- **Subtext**: `"Handcrafted in small batches. Ships worldwide."` — 15px Inter, color `#C8A882`
- **CTA Button**:
  - Text: `SHOP THE COLLECTION →`
  - 13px Inter, weight 500, letter-spacing 3px
  - Background: `linear-gradient(135deg, #D4831A, #F0A84A)`
  - Color: `#0D0600`
  - Padding: `18px 52px`
  - Border-radius: `0px` (sharp — luxury)
  - Hover: `scale(1.03)` with `0.3s ease`
  - Box-shadow: `0 0 50px rgba(212, 131, 26, 0.4)`

---

## Navbar

- Fixed, full width, initially transparent
- After scroll past 100px: `background: rgba(13,6,0,0.88)`, `backdrop-filter: blur(20px)`
- **Left**: `NOCARA DARK` — 13px Inter, weight 500, letter-spacing 4px, color `#FFF8E7`
- **Right links**: `Origin` `Process` `Collection` — 12px Inter, letter-spacing 2px, color `#C8A882`, hover → `#D4831A` with 0.3s transition
- **Far right pill**: `ORDER NOW`
  - Border: `1px solid #D4831A`, color `#D4831A`, padding `8px 20px`, border-radius `2px`
  - Hover: `background #D4831A`, color `#0D0600`

---

## Loading Screen

- Background: `#0D0600`
- Center: `NOCARA DARK` — 14px Inter, letter-spacing 6px, color `#D4831A`
- Progress bar: 200px wide, 1px height
  - Track: `rgba(255,255,255,0.08)`
  - Fill: `linear-gradient(90deg, #D4831A, #F0A84A)`
- Below bar: percentage counter — 11px Inter, color `#C8A882`
- Dismiss: `0.8s` opacity fade when frames fully loaded
- **Site does not render until 100% of frames are preloaded**

---

## Below-Fold Sections

### Origin Section
- Background: `#1A0A02`, full bleed
- 3 columns: `BEAN TO BAR` / `STONE GROUND` / `SMALL BATCH`
  - Each: gold SVG icon, 11px gold label, 26px Playfair heading, 15px Inter body in `#C8A882`
- Column dividers: `1px solid rgba(212,131,26,0.12)`

### Process Quote Section
- Background: `#0D0600`, full bleed
- Centered quote: `"72 hours of conching.\nZero compromises."` — 52px Playfair Display italic, color `#FFF8E7`
- Gold divider: 60px wide, 1px, centered, color `#D4831A`

### Tasting Notes Section
- Background: `#1A0A02`
- 3 floating flavor cards:
  - Card bg: `#261208`, border: `1px solid rgba(212,131,26,0.15)`, border-radius `4px`, padding `40px`
  - Each: percentage circle in gold, flavor name in Playfair, tasting notes in Inter
  - Labels: `72% — Dark Intensity` / `85% — Forest Bitter` / `92% — Pure Origin`
  - Hover: `border-color rgba(212,131,26,0.5)`, `translateY(-4px)` with transition

### Final CTA Section
- Background: `linear-gradient(180deg, #1A0A02, #0D0600)`
- Centered `"Taste the Craft."` heading
- Same gold CTA button as scroll overlay

---

## Micro-Details (Non-Negotiable)

### Grain Texture Overlay
```css
/* Full page, pointer-events: none, z-index top */
/* SVG feTurbulence filter noise */
opacity: 0.04;
position: fixed;
inset: 0;
pointer-events: none;
```

### Scroll Progress Bar
- `position: fixed`, top 0, left 0
- `height: 1px`, `background: linear-gradient(90deg, #D4831A, #F0A84A)`
- Width driven by `window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100`

### Custom Cursor
- Inner: 8px filled circle, color `#D4831A`
- Outer: 28px ring, `border: 1px solid #D4831A`, follows with ~100ms lag
- On CTA hover: outer ring scales to 48px

### Warm Canvas Glow
- `radial-gradient` from `rgba(212,131,26,0.06)` at canvas center
- Positioned behind canvas — gives chocolate a soft warm emanation

### Page Transition
- Fade in on load: `opacity 0 → 1` over `0.7s`

---

## Performance Rules

- Preload ALL frames before showing any content
- Use `requestAnimationFrame` for canvas rendering — never `setInterval`
- Mobile (`< 768px`): skip every 2nd frame
- Cache frames in `next.config.js`:
```js
async headers() {
  return [{ source: '/frames/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] }]
}
```
- All frame images must be `.webp`

---

## SEO & Metadata (`layout.tsx`)

```ts
export const metadata = {
  title: 'Nocara Dark — Single Origin Luxury Chocolate',
  description: 'Dark. Pure. Obsessive. Handcrafted from single-origin cocoa beans.',
  themeColor: '#0D0600',
  openGraph: {
    images: ['/frames/frame_0001.webp'],
  },
}
```

---

## File Structure Reference

```
/
├── public/
│   └── frames/               ← .webp frames extracted from video
├── app/
│   ├── layout.tsx             ← fonts, metadata, grain overlay, cursor
│   ├── page.tsx               ← main scroll page
│   └── globals.css            ← CSS variables, base resets
├── components/
│   ├── Navbar.tsx
│   ├── LoadingScreen.tsx
│   ├── ScrollCanvas.tsx       ← Canvas + frame animation + warm glow
│   ├── TextOverlay.tsx        ← Section text with opacity transitions
│   ├── OriginSection.tsx
│   ├── ProcessQuote.tsx
│   ├── TastingNotes.tsx
│   └── FinalCTA.tsx
├── hooks/
│   └── useScrollProgress.ts
├── scroll-animation.mp4
└── next.config.js
```

---

## Claude Code Behavior Rules

- Never use Three.js, GSAP, Framer Motion, or any animation library — Canvas + CSS only
- Every color must reference the CSS variable system above — no hardcoded hex in components
- Tailwind for layout/spacing only; typography and color styles via CSS variables
- Always build mobile-responsive (frame-skip logic on < 768px)
- Prioritize perceived performance: loading screen → instant canvas → lazy below-fold sections
- The warm canvas glow is mandatory — it is central to the "chocolate factory at night" atmosphere
- Every section must feel warm, indulgent, and slightly hungry-making — check the design philosophy before writing any new component
