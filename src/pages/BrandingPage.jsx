import { useState, useEffect, useCallback, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import '../branding.css'
import {
  NikeSlide, PS5Slide, CokeSlide, AppleSlide, OnSlide,
  CetaSlide, CarlsSlide, BMWSlide, NvidiaSlide, GTA6Slide,
  InSecondsSlide, AgencySlide
} from '../components/branding/BrandSlides'
import BackButton from '../components/ui/BackButton'
import AmbientBackground from '../components/ui/AmbientBackground'

/* ── Brand cursor SVGs (32×32, hotspot 16,16) ── */
const mkCursor = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg)}") 16 16, auto`

const brandCursors = {
  // Nike swoosh
  Nike: mkCursor(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M2 20 C6 10, 16 4, 30 2 C24 8, 14 18, 8 22 Z" fill="#7c3aed" opacity="0.9"/></svg>`),
  // PlayStation triangle
  PlayStation: mkCursor(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><polygon points="16,4 28,26 4,26" fill="none" stroke="#3b82f6" stroke-width="2.5"/></svg>`),
  // Coca-Cola bottle cap
  'Coca-Cola': mkCursor(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="#ef4444"/><text x="16" y="20" text-anchor="middle" fill="white" font-size="10" font-weight="bold" font-family="sans-serif">C</text></svg>`),
  // Apple
  Apple: mkCursor(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M16 6c0-3 2.5-4 4-4-0.2 2-2 4-4 4zm-3 3c-4 0-7 4-7 9 0 6 4 11 7 11 1 0 2-1 3-1 1 0 2 1 3 1 3 0 7-5 7-11 0-4-3-7-5-7-1.5 0-3 1-4 1s-2.5-1-4-1z" fill="#555"/></svg>`),
  // ON badge
  'ON Running': mkCursor(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="6" y="8" width="20" height="16" rx="3" fill="none" stroke="#10b981" stroke-width="2.5"/><text x="16" y="20" text-anchor="middle" fill="#10b981" font-size="10" font-weight="900" font-family="sans-serif">ON</text></svg>`),
  // Cetaphil droplet
  Cetaphil: mkCursor(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M16 4 C16 4 6 16 6 21 C6 26.5 10.5 29 16 29 C21.5 29 26 26.5 26 21 C26 16 16 4 16 4Z" fill="#60a5fa" opacity="0.85"/></svg>`),
  // Carlsberg hop/crown
  Carlsberg: mkCursor(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M6 22 L10 10 L16 16 L22 10 L26 22 Z" fill="#D4AF37" opacity="0.9"/><circle cx="16" cy="24" r="3" fill="#D4AF37"/></svg>`),
  // BMW roundel
  BMW: mkCursor(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="13" fill="none" stroke="#60a5fa" stroke-width="2"/><path d="M16 3 L16 16 L3 16" fill="#0066CC" opacity="0.8"/><path d="M16 16 L16 29 L29 16" fill="#0066CC" opacity="0.8"/><path d="M16 3 L16 16 L29 16" fill="white" opacity="0.7"/><path d="M16 16 L16 29 L3 16" fill="white" opacity="0.7"/></svg>`),
  // Nvidia GPU chip
  NVIDIA: mkCursor(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="7" y="7" width="18" height="18" rx="3" fill="#76B900" opacity="0.9"/><rect x="11" y="11" width="10" height="10" rx="1.5" fill="#0a0a0a"/><text x="16" y="19" text-anchor="middle" fill="#76B900" font-size="7" font-weight="900" font-family="sans-serif">N</text><rect x="4" y="12" width="3" height="2" rx="0.5" fill="#76B900" opacity="0.7"/><rect x="4" y="18" width="3" height="2" rx="0.5" fill="#76B900" opacity="0.7"/><rect x="25" y="12" width="3" height="2" rx="0.5" fill="#76B900" opacity="0.7"/><rect x="25" y="18" width="3" height="2" rx="0.5" fill="#76B900" opacity="0.7"/><rect x="12" y="4" width="2" height="3" rx="0.5" fill="#76B900" opacity="0.7"/><rect x="18" y="4" width="2" height="3" rx="0.5" fill="#76B900" opacity="0.7"/><rect x="12" y="25" width="2" height="3" rx="0.5" fill="#76B900" opacity="0.7"/><rect x="18" y="25" width="2" height="3" rx="0.5" fill="#76B900" opacity="0.7"/></svg>`),
  // GTA star
  'GTA VI': mkCursor(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><polygon points="16,3 19.5,12 29,12 21.5,18 24,27 16,22 8,27 10.5,18 3,12 12.5,12" fill="#f59e0b" opacity="0.9"/></svg>`),
  'InSeconds': mkCursor(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="0" y="0" width="32" height="32" rx="4" fill="#EE3F2C"/><text x="16" y="22" text-anchor="middle" fill="#fff" font-size="16" font-weight="900" font-family="sans-serif">IS</text></svg>`),
  'Creative Agency': mkCursor(`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#fff"/><text x="16" y="21" text-anchor="middle" fill="#000" font-size="14" font-weight="900" font-family="serif">H</text></svg>`),
}

const slides = [
  { name: 'Nike',        tagline: 'Just Do It.',            year: '1964', category: 'Sportswear',     Component: NikeSlide,    accent: '#7c3aed', bg: '#050510' },
  { name: 'PlayStation', tagline: 'Play Has No Limits.',    year: '2020', category: 'Gaming',         Component: PS5Slide,     accent: '#3b82f6', bg: '#030318' },
  { name: 'Coca-Cola',   tagline: 'Open Happiness.',        year: '1886', category: 'Beverages',      Component: CokeSlide,    accent: '#ef4444', bg: '#1a0505' },
  { name: 'Apple',       tagline: 'Think Different.',       year: '2015', category: 'Technology',     Component: AppleSlide,   accent: '#6b7280', bg: '#f5f5f7' },
  { name: 'ON Running',  tagline: 'Dream On.',              year: '2010', category: 'Performance',    Component: OnSlide,      accent: '#10b981', bg: '#020f08' },
  { name: 'Cetaphil',    tagline: 'Beyond Boundaries.',     year: '2022', category: 'Skincare',       Component: CetaSlide,    accent: '#d97706', bg: '#0a0805' },
  { name: 'Carlsberg',   tagline: 'Probably the Best.',     year: '1847', category: 'Beverages',      Component: CarlsSlide,   accent: '#D4AF37', bg: '#090600' },
  { name: 'BMW',         tagline: 'Sheer Driving Pleasure.', year:'1916', category: 'Automotive',     Component: BMWSlide,     accent: '#60a5fa', bg: '#040812' },
  { name: 'NVIDIA',      tagline: 'Beyond Real-Time.',      year: '1993', category: 'Technology',     Component: NvidiaSlide,  accent: '#76B900', bg: '#050a02' },
  { name: 'GTA VI',      tagline: 'Return to Vice City.',   year: '2025', category: 'Entertainment',  Component: GTA6Slide,    accent: '#f59e0b', bg: '#08040e' },
  { name: 'InSeconds',   tagline: 'Automated Cold-Email.',  year: '2026', category: 'Software',       Component: InSecondsSlide,accent: '#EE3F2C', bg: '#0d0403' },
  { name: 'Creative Agency', tagline: "Let's Talk Business.", year: '2026', category: 'Digital Architect', Component: AgencySlide, accent: '#ffffff', bg: '#050505' },
]

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0, scale: 0.97 }),
  center: {
    x: 0, opacity: 1, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? '-100%' : '100%', opacity: 0, scale: 0.97,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function BrandingPage() {
  const [current,   setCurrent]   = useState(0)
  const [direction, setDirection] = useState(1)
  const [isMobile,  setIsMobile]  = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const go = useCallback((idx) => {
    const dir = idx > current ? 1 : -1
    setDirection(dir)
    setCurrent((idx + slides.length) % slides.length)
  }, [current])

  const next = useCallback(() => go(current + 1), [go, current])
  const prev = useCallback(() => go(current - 1), [go, current])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  useEffect(() => {
    let startX = 0
    const onStart = (e) => { startX = e.touches[0].clientX }
    const onEnd   = (e) => {
      const dx = e.changedTouches[0].clientX - startX
      if (dx > 50) prev()
      else if (dx < -50) next()
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend',   onEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend',   onEnd)
    }
  }, [next, prev])

  const slide = slides[current]
  const { Component } = slide

  const cursorStyle = useMemo(() => brandCursors[slide.name] || 'auto', [slide.name])

  return (
    <div
      className="text-white relative branding-page-container"
      style={{
        backgroundColor: '#050505',
        height: isMobile ? 'auto' : '100dvh',
        minHeight: isMobile ? '100svh' : undefined,
        overflow: isMobile ? 'auto' : 'hidden',
        display: 'flex',
        flexDirection: 'column',
        cursor: cursorStyle,
      }}
    >
      <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 30 }}>
        <BackButton label="Home" centered />
      </div>
      <style>{`
        .branding-page-container,
        .branding-page-container * {
          cursor: ${cursorStyle} !important;
        }
      `}</style>
      <AmbientBackground variant="brand" />
      {/* ── Header ── */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-10 pt-2 pb-1 flex-none">
        <div className="flex flex-row items-center gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <div className="inline-flex items-center gap-1.5 liquid-glass rounded-full px-2 py-0.5 text-[10px] text-white/60 font-body mb-1">
              <span className="w-1 h-1 rounded-full" style={{ backgroundColor: slide.accent }} />
              Branding · Advertising
            </div>
            <h1 className="text-base sm:text-lg md:text-xl font-heading italic text-white leading-[0.95] tracking-tight">
              Advertising Engine.
            </h1>
          </div>

          {/* Slide counter */}
          <div className="text-right flex-none">
            <div
              className="text-xl sm:text-2xl font-heading italic leading-none"
              style={{ color: slide.accent, opacity: 0.4 }}
            >
              {String(current + 1).padStart(2, '0')}
            </div>
            <div className="text-white/30 font-body text-[10px] mt-0.5">/ {slides.length}</div>
          </div>
        </div>
      </div>

      {/* ── Slide area ── */}
      <div
        className="relative w-full overflow-hidden flex-1"
        style={{ minHeight: isMobile ? 340 : 0 }}
      >
        {/* Background colour */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${current}`}
            className="absolute inset-0"
            style={{ background: slide.bg, zIndex: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        {/* Accent glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 85%, ${slide.accent}26 0%, transparent 65%)`,
            zIndex: 1,
          }}
        />

        {/* Slide content */}
        <AnimatePresence mode="sync" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 5, willChange: 'transform, opacity' }}
          >
            <Component active isMobile={isMobile} />
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 liquid-glass rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 liquid-glass rounded-full flex items-center justify-center text-white/50 hover:text-white transition-all hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── Bottom info bar ── */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-10 py-1.5 flex flex-row items-center gap-2 sm:gap-3 flex-none">
        {/* Slide info */}
        <div className="flex-1 min-w-0">
          <motion.div
            key={`info-${current}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm sm:text-base font-heading italic text-white">{slide.name}</span>
              <span
                className="text-[10px] font-body px-1.5 py-0.5 rounded-full"
                style={{ backgroundColor: `${slide.accent}22`, color: slide.accent, border: `1px solid ${slide.accent}44` }}
              >
                {slide.category}
              </span>
              <span className="text-white/30 font-body text-[10px]">Est. {slide.year}</span>
            </div>
            <p className="text-white/40 font-body text-[11px] sm:text-xs mt-0.5 italic truncate">"{slide.tagline}"</p>
          </motion.div>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5 flex-wrap justify-end flex-none">
          {slides.map((s, i) => (
            <button
              key={s.name}
              onClick={() => go(i)}
              title={s.name}
              className="transition-all duration-300"
              style={{
                width:           i === current ? 16 : 5,
                height:          5,
                borderRadius:    9999,
                backgroundColor: i === current ? slide.accent : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
