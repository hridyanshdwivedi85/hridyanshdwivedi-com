import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ThemeProvider } from './context/ThemeContext'
import FloatingTabNav from './components/ui/FloatingTabNav'
import CustomCursor   from './components/ui/CustomCursor'
import SplashCursor   from './components/ui/SplashCursor'
import HomePage       from './pages/HomePage'

const LabsPage      = lazy(() => import('./pages/LabsPage'))
const BrandingPage  = lazy(() => import('./pages/BrandingPage'))
const CelestialPage = lazy(() => import('./pages/CelestialPage'))
const InSecondsPage = lazy(() => import('./pages/InSecondsPage'))
const ContactPage   = lazy(() => import('./pages/ContactPage'))

/* ─── Premium page loader — modern, crisp, mobile-smooth ─── */
function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        backgroundColor: 'var(--theme-bg)',
        display: 'grid', placeItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Ambient gradient orb */}
      <motion.div
        aria-hidden
        initial={{ scale: 0.7, opacity: 0.35 }}
        animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.45, 0.75, 0.45] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          width: 'min(70vw, 520px)',
          height: 'min(70vw, 520px)',
          borderRadius: '50%',
          background: 'radial-gradient(closest-side, rgba(255,126,95,0.35), rgba(251,191,36,0.12) 45%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle grid backdrop */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          backgroundImage:
            'linear-gradient(var(--theme-border) 1px, transparent 1px), linear-gradient(90deg, var(--theme-border) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage: 'radial-gradient(ellipse at center, black 25%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 25%, transparent 70%)',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22,
      }}>
        {/* Ring loader with spinning arc */}
        <div style={{ position: 'relative', width: 76, height: 76 }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '1.5px solid var(--theme-border)',
          }} />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '1.5px solid transparent',
              borderTopColor: '#ff7e5f',
              borderRightColor: '#ff8c42',
              boxShadow: '0 0 24px rgba(255,126,95,0.45)',
            }}
          />
          {/* Center dot */}
          <motion.span
            animate={{ scale: [0.85, 1.1, 0.85], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              width: 8, height: 8, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff7e5f, #fbbf24)',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 14px rgba(255,126,95,0.7)',
            }}
          />
        </div>

        {/* Shimmer "Loading" wordmark */}
        <div style={{ position: 'relative' }}>
          <motion.div
            initial={{ backgroundPosition: '200% 50%' }}
            animate={{ backgroundPosition: '-200% 50%' }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: 'italic',
              fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
              letterSpacing: '-0.01em',
              lineHeight: 1,
              background: 'linear-gradient(90deg, var(--theme-text-muted) 0%, var(--theme-text) 40%, #ff7e5f 50%, var(--theme-text) 60%, var(--theme-text-muted) 100%)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
            }}
          >
            Loading
          </motion.div>
        </div>

        {/* Three-dot pulse */}
        <div style={{ display: 'flex', gap: 7 }}>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.25, 1, 0.25], y: [0, -4, 0] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.18,
              }}
              style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--theme-text)',
                display: 'inline-block',
              }}
            />
          ))}
        </div>

        {/* Tiny kicker */}
        <div style={{
          fontFamily: '"Fira Code", monospace',
          fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'var(--theme-text-muted)', marginTop: 2,
        }}>
          Preparing your view
        </div>
      </div>
    </motion.div>
  )
}

/* Route-change overlay — shows the loader briefly on every navigation
   so the transition always feels premium, even for already-loaded pages. */
function RouteTransition({ children }) {
  const location = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Skip global transition for InSeconds to prevent double-loading
    if (location.pathname === '/inseconds') {
      setVisible(false)
      return
    }

    setVisible(true)
    const t = setTimeout(() => setVisible(false), 350)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <>
      {children}
      <AnimatePresence>
        {visible && <PageLoader key="route-loader" />}
      </AnimatePresence>
    </>
  )
}


function SmartFallback() {
  const location = useLocation()
  if (location.pathname === '/inseconds') return null
  return <PageLoader />
}

import { useTheme } from './context/ThemeContext'

/* ... other components stay same ... */

function GlobalUI() {
  const { splashConfig } = useTheme()
  
  return (
    <>
      <CustomCursor />
      <SplashCursor 
        RAINBOW_MODE={splashConfig.rainbow}
        COLOR={splashConfig.color}
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={512}
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        SHADING={true}
        COLOR_UPDATE_SPEED={10}
      />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <GlobalUI />

        <div
          style={{ backgroundColor: 'var(--theme-bg)' }}
          className="min-h-screen transition-colors duration-400"
        >
          <div className="relative z-10">
            <RouteTransition>
              <Suspense fallback={<SmartFallback />}>
                <Routes>
                  <Route path="/"          element={<HomePage />}    />
                  <Route path="/labs"      element={<LabsPage />}    />
                  <Route path="/branding"  element={<BrandingPage />} />
                  <Route path="/celestial" element={<CelestialPage />} />
                  <Route path="/inseconds" element={<InSecondsPage />} />
                  <Route path="/contact"   element={<ContactPage />} />
                </Routes>
              </Suspense>
            </RouteTransition>
          </div>

          <FloatingTabNav />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}
