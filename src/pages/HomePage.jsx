import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import Hero          from '../components/landing/Hero'
import TransformedHero from '../components/landing/TransformedHero'
import StartSection  from '../components/landing/StartSection'
import FeaturesGrid  from '../components/landing/FeaturesGrid'
import Stats         from '../components/landing/Stats'
import Testimonials  from '../components/landing/Testimonials'
import CtaFooter     from '../components/landing/CtaFooter'
import SiteFooter    from '../components/landing/SiteFooter'
import Work          from '../components/home/Work'
import FounderCard   from '../components/home/FounderCard'
import AmbientBackground from '../components/ui/AmbientBackground'
import { useTheme } from '../context/ThemeContext'

const SYSTEM_LOGS = [
  "Leaving the surface...",
  "Slowing down time...",
  "Breathing deep...",
  "Entering the space of intent...",
  "Welcome to HD® World.",
]

const TOTAL_DURATION = 5000
const LOG_INTERVAL = TOTAL_DURATION / SYSTEM_LOGS.length // 1000ms each

export default function HomePage() {
  const { setSplashConfig } = useTheme()
  const location = useLocation()
  const [heroState, setHeroState] = useState('original') // 'original' | 'loading' | 'transformed'
  const [loadPercentage, setLoadPercentage] = useState(0)
  const [logIndex, setLogIndex] = useState(0)
  const [showPageContent, setShowPageContent] = useState(true)
  const rafRef = useRef(null)

  const handleTransform = () => {
    // Cinematic Reset: Ensure we are at the top
    window.scrollTo({ top: 0, behavior: 'instant' })
    
    setHeroState('loading')
    setShowPageContent(false)
    setLoadPercentage(0)
    setLogIndex(0)
    
    // Switch to Gold for Hridyansh World
    setSplashConfig({ rainbow: false, color: '#c69603' })
  }

  const handleBack = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setHeroState('original')
    setShowPageContent(true)
    setLoadPercentage(0)
    setLogIndex(0)

    // Switch back to Rainbow for Original Hero
    setSplashConfig({ rainbow: true, color: '#c69603' })
  }

  // Ensure SplashCursor resets if user leaves the page while transformed
  useEffect(() => {
    return () => {
      setSplashConfig({ rainbow: true, color: '#c69603' })
    }
  }, [setSplashConfig])

  // Detect navigation from Celestial tab
  useEffect(() => {
    if (location.state?.fromCelestial) {
      setHeroState('transformed')
      setSplashConfig({ rainbow: false, color: '#c69603' })
      
      // Clear state so refresh doesn't trigger it again
      window.history.replaceState({}, document.title)
    }
  }, [location.state, setSplashConfig])

  // RAF-based loading animation — runs only when heroState is 'loading'
  useEffect(() => {
    if (heroState !== 'loading') return

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    // Forceful scroll lock handler for the 5-second cinematic
    const preventScroll = (e) => e.preventDefault()
    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })

    const startTime = performance.now()
    let lastUpdate = 0

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min((elapsed / TOTAL_DURATION) * 100, 100)
      const newLogIndex = Math.min(
        Math.floor(elapsed / LOG_INTERVAL),
        SYSTEM_LOGS.length - 1
      )

      // Throttle React state updates to ~30fps (every 33ms)
      if (now - lastUpdate > 33) {
        lastUpdate = now
        setLoadPercentage(progress)
        setLogIndex(newLogIndex)
      }

      if (elapsed < TOTAL_DURATION) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        // Final update at 100%
        setLoadPercentage(100)
        setLogIndex(SYSTEM_LOGS.length - 1)
        setHeroState('transformed')
        setTimeout(() => setShowPageContent(true), 1500)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
    }
  }, [heroState])

  return (
    <>
      <style>{`
        @keyframes loader-fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .story-text {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          letter-spacing: -0.01em;
        }
      `}</style>

      <AnimatePresence mode="wait">
        {heroState === 'original' && (
          <motion.div
            key="original-hero"
            exit={{ 
              opacity: 0, 
              scale: 0.98,
              filter: 'blur(20px)',
              transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
            }}
          >
            <Hero onTransform={handleTransform} />
          </motion.div>
        )}

        {heroState === 'loading' && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.2 } }}
            className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden bg-[#0c0a09]"
          >
            {/* Vintage Background Image */}
            <motion.img 
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5, ease: "linear" }}
              src="/images/vintage_loading_bg.png" 
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              alt=""
            />
            {/* Moody Vignette & Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1412]/30 via-transparent to-[#0a0807]/90" />
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />

            {/* Main Minimalist Core */}
            <div className="relative z-10 flex flex-col items-center max-w-sm w-full px-8 pt-20">
              
              {/* Elegant Percentage */}
              <div className="flex flex-col items-center mb-6">
                <span className="text-4xl font-light tracking-widest story-text text-[#ebd9c1] drop-shadow-md">
                  {Math.floor(loadPercentage)}<span className="text-2xl text-[#d4c3ab]/60 ml-1">%</span>
                </span>
              </div>

              {/* Single Elegant Progress Line */}
              <div className="w-64 h-[1px] bg-[#ebd9c1]/10 relative overflow-hidden mb-16 rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${loadPercentage}%` }}
                  className="absolute inset-y-0 left-0 bg-[#ebd9c1]/60 shadow-[0_0_10px_rgba(235,217,193,0.3)]"
                />
              </div>

              {/* Atmospheric Story Text */}
              <div className="h-10 overflow-hidden flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={logIndex}
                    initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl story-text text-[#d4c3ab]/90 text-center tracking-wide drop-shadow-sm"
                  >
                    {SYSTEM_LOGS[logIndex]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            {/* Film Grain Overlay for extreme vintage feel */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
              style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                 backgroundSize: '150px 150px'
              }}
            />
          </motion.div>
        )}

        {heroState === 'transformed' && (
          <motion.div
            key="transformed-hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="bg-black"
          >
            <TransformedHero onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Visual Guard: Hide content below during transformation ── */}
      <div 
        style={{ 
          backgroundColor: '#000000',
          opacity: showPageContent ? 1 : 0,
          visibility: showPageContent ? 'visible' : 'hidden',
          transition: 'opacity 0.8s ease',
        }}
      >
        <StartSection />
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <AmbientBackground variant="warm" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Work />
            <FounderCard />
            <FeaturesGrid />
          </div>
        </div>
        <Stats />
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <AmbientBackground variant="cool" />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Testimonials />
          </div>
        </div>
        <CtaFooter />
        <SiteFooter />
      </div>
    </>
  )
}
