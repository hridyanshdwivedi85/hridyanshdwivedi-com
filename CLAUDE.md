# CLAUDE.md — Project Guide for AI Assistants

> Read this file first. It maps every important file so you don't need to glob/grep blindly.
> **Auto-update rule**: after any code change, update this file if the change touches routes, file locations, top-level page structure, or adds/removes a component. A Stop hook (`.claude/settings.json`) surfaces a reminder so the update happens in the same session.

## Tech Stack
- **Framework**: React 18 + Vite 6
- **3D**: Three.js 0.183 + `three-stdlib` (OrbitControls) + `ogl` 1.0 (WebGL shaders)
- **Animation**: GSAP 3.14, Motion (Framer Motion fork) 12
- **Styling**: Tailwind 3.4 + global CSS (`index.css`, `labs.css`, `branding.css`)
- **Routing**: React Router 6
- **Fonts**: Instrument Serif (headings), Barlow / Almarai (body/UI), Fira Code / JetBrains Mono (monospace labels)
- **Port**: `npm run dev` → :5173 (Vite may pick a different port if busy)
- **Favicon**: `/hd.png` (file lives in both project root and `public/`)

---

## Directory Map

```
src/
├── App.jsx                         # Router root — 6 routes
├── main.jsx                        # Entry point
├── index.css                       # Global theme vars + utilities (~909 lines — read chunked)
├── labs.css                        # Labs page styles (~3610 lines — read chunked)
├── branding.css                    # Branding/slide grid (see "SLIDE GRID LAYOUT")
│
├── pages/
│   ├── HomePage.jsx                # Composes landing sections
│   ├── LabsPage.jsx                # Labs experiments page — Coffee Brewer + Entropy Canvas
│   │                               #   (Celestial Engine card removed from the grid;
│   │                               #    /celestial is still reachable via FloatingTabNav)
│   ├── BrandingPage.jsx            # Slide carousel for brand ads
│   ├── CelestialPage.jsx           # Wraps SolarSystemScene
│   ├── InSecondsPage.jsx           # Chrome extension product page (pricing + 12 features)
│   ├── ContactPage.jsx
│   └── WordsPullUp.jsx             # Animated letter pull-up used in Hero
│
├── components/
│   ├── landing/
│   │   ├── Hero.jsx               # Giant name hero — currently "Hola ! Amigo"
│   │   ├── LightHero.jsx          # Apple-style light-mode hero variant
│   │   ├── Navbar.jsx
│   │   ├── StartSection.jsx
│   │   ├── FeaturesChess.jsx
│   │   ├── FeaturesGrid.jsx       # "Technical Edge" skill arsenal (premium UI)
│   │   ├── Stats.jsx
│   │   ├── Testimonials.jsx
│   │   ├── CtaFooter.jsx
│   │   ├── BlurText.jsx
│   │   └── HlsVideo.jsx
│   │
│   ├── home/
│   │   ├── Work.jsx
│   │   └── CircularGallery.jsx
│   │
│   ├── labs/
│   │   ├── SolarSystemScene.jsx   # Three.js solar system (706 lines — use offset+limit)
│   │   ├── EntropyCremaCanvas.jsx # Canvas 2D particles + Galaxy WebGL backdrop
│   │   ├── Galaxy.jsx             # ogl/WebGL galaxy shader (default props = exact colors)
│   │   ├── Galaxy.css
│   │   └── CoffeeBrewerUI.jsx     # Espresso machine UI (base 450 × 870, fluid scale)
│   │
│   ├── branding/
│   │   └── BrandSlides.jsx        # Named exports: NikeSlide, PS5Slide, CokeSlide,
│   │                               #   AppleSlide, OnSlide, CetaSlide, CarlsSlide,
│   │                               #   BMWSlide, XboxSlide, GTA6Slide
│   │
│   ├── layout/
│   │   └── FluidBackground.jsx
│   │
│   └── ui/
│       ├── CustomCursor.jsx       # Dual-ring cursor
│       ├── FloatingTabNav.jsx     # Bottom-right floating tabs (homepage only)
│       └── BackButton.jsx         # Used on sub-pages
│
├── context/
│   └── ThemeContext.jsx           # light/dark toggle — useTheme()
│
├── controllers/
│   └── homeController.js
│
└── directives/
    └── threeScene.js

public/
├── hd.png                         # Favicon
├── favicon.svg
├── vintage-hero-bg.png
├── assets/
│   ├── textures/                  # 12 planet textures for SolarSystemScene
│   └── images/                    # Product shots: bmw_car, carlsberg_real, cd,
│                                   #   cetaphil_real, coke_can, cover, fg_ps5,
│                                   #   gta6, img1 (InSeconds sidebar), img2 (InSeconds portrait),
│                                   #   profile, whey_real, xbox_real
└── scene_images/

root/
├── hd.png                         # Source favicon (also copied to /public)
└── icon128.png                    # Legacy favicon (still referenced in InSecondsPage hero icon)
```

---

## Routes (src/App.jsx)

| Path          | Component        | Notes                                            |
|---------------|------------------|--------------------------------------------------|
| `/`           | HomePage         | Navbar + Hero + sections                         |
| `/labs`       | LabsPage         | Coffee Brewer + Entropy only (Celestial removed) |
| `/branding`   | BrandingPage     | 10-slide carousel                                |
| `/celestial`  | CelestialPage    | Three.js solar system                            |
| `/inseconds`  | InSecondsPage    | Product page — portrait price card + 12 features |
| `/contact`    | ContactPage      |                                                  |

FloatingTabNav renders on `/` only. Sub-pages show BackButton.

---

## Key Patterns

### Theme system
- CSS vars on `:root`: `--theme-bg`, `--theme-text`, `--theme-text-muted`, `--theme-border`, `--theme-text-secondary`.
- Light mode = `[data-theme="light"]` selector in `index.css`.
- Toggle via `useTheme()` from `ThemeContext`.

### Hero name
- `Hero.jsx` renders `<WordsPullUp text="Hola ! Amigo" showAsterisk />` (~line 72).
- Sizing via inline CSS `.hero-name span { font-size: 18vw → 11vw }` across breakpoints.

### FeaturesGrid ("Technical Edge")
- Ambient orange + blue radial glows in backdrop, gradient-text "Edge" word.
- Three skill groups: Frontend & 3D, Backend & APIs, Design & Tools.
- Cards are `liquid-glass` tiles with per-category accent hover.

### InSecondsPage layout (Targo-inspired dark redesign)
- Palette: pure black `#000000`, brand red `#EE3F2C`, white text. Typography: **Rubik** (bold, uppercase, `-0.04em` tracking). Ignores the global theme toggle.
- Section order: Video-bg Hero (with docked stats strip) → Pricing card → Gallery slider → 12 feature cards → bottom CTA.
- **Clipped-corner buttons**: shared `ClipBtn` component with `clip-path` polygon (12px diagonal cut top-right + bottom-left). Variants: `red`, `white`, `ghost`.
- **Hero**: full-viewport `<video>` autoplay/muted/loop from cloudfront URL, left-aligned headline "SEND 3,000 EMAILS. RIGHT FROM GMAIL.", horizontal dark gradient for legibility, stats strip docked to bottom with glass backdrop.
- **Pricing card**: liquid glass (`backdrop-filter: blur(40px) saturate(180%)`, 12% white border, diagonal shine overlay). Portrait image (`img2.png`) in a clipped frame.
- **Gallery** uses `img1.png` in the Chrome-window `Slider`.
- **Feature cards**: 4-column grid, clipped corners, red spotlight on hover.

### LabsPage
- Two experiments: Coffee Brewer (`id: 'coffee'`) and Entropy Canvas (`id: 'entropy'`, fullscreen by default).
- Coffee stage: `calc(100vh - 100px)` (desktop `- 110px`), non-scrollable, coffee-bean drift + aroma radial blobs as backdrop.
- `CoffeeBrewerUI` base = 450 × 870, headroom 0.94 desktop / 0.96 mobile.
- **Celestial Engine card removed** from the grid; route `/celestial` is intact.

### Galaxy backdrop (Entropy)
- `EntropyCremaCanvas` layers: Galaxy (ogl WebGL, z=0) → vignette (z=1) → Canvas 2D particles + cursor (z=2) → headline overlay (z=2).
- Galaxy uses **default props** (exact colors from the React Bits component): `starSpeed=0.5, density=1, hueShift=140, saturation=0, glowIntensity=0.3, twinkleIntensity=0.3, rotationSpeed=0.1, repulsionStrength=2, transparent=false`.
- Particle cursor palette/colors are independent of Galaxy and unchanged.

### BrandSlides grid
- `.br-slide` from `branding.css` = 2-col `[txt | img]`; `.br-flip` swaps.
- Mobile collapses to single column, image on top.
- XboxSlide image sized `maxWidth: 88%, maxHeight: 78%` so it fills the right column on desktop.

### CircularGallery
- Items: `{ image, text, category? }`.
- Auto-scrolls 0.35 px/frame; triplicated items for seamless loop.

---

## Auto-update hook

`.claude/settings.json` contains a **Stop** hook that surfaces a reminder to reconcile this file when the session modified files under `src/` or `public/`. The hook is advisory — Claude should re-open CLAUDE.md, reconcile the directory map / routes / patterns with the real tree, and commit the diff as part of the same turn.

---

## What NOT to read unless directly relevant
- `index.css` (~909 lines) — only for global CSS bugs
- `labs.css` (~3610 lines) — only for labs-specific styling
- `branding.css` — only for slide grid layout
- `SolarSystemScene.jsx` (706 lines) — use `offset`+`limit`
- `node_modules/`, `dist/`, `package-lock.json` — never

---

## Common Commands
```bash
npm run dev      # Vite dev server
npm run build    # Production build → dist/
npm run preview  # Preview build on :4173
```
