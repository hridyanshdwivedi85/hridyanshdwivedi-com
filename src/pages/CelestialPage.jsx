import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import SolarSystemScene from '../components/labs/SolarSystemScene'
import HlsVideo from '../components/landing/HlsVideo'
import BackButton from '../components/ui/BackButton'

const HLS_URL = 'https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8'

export default function CelestialPage() {
  const [entered, setEntered] = useState(false)
  const [warping, setWarping] = useState(false)

  const handleEnter = () => {
    setWarping(true)
    // On mobile: force browser fullscreen + landscape orientation
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
    if (isMobile) {
      const el = document.documentElement
      const reqFs = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen
      if (reqFs) {
        try { reqFs.call(el).catch(() => {}) } catch (_) {}
      }
      // Lock to landscape if Screen Orientation API is supported
      if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
        window.screen.orientation.lock('landscape').catch(() => {})
      }
    }
    setTimeout(() => { setEntered(true); setWarping(false) }, 1400)
  }

  const handleExit = () => {
    setEntered(false)
    // Release fullscreen + orientation lock when exiting on mobile
    if (typeof document !== 'undefined' && document.fullscreenElement) {
      try { document.exitFullscreen && document.exitFullscreen() } catch (_) {}
    }
    if (typeof window !== 'undefined' && window.screen && window.screen.orientation && window.screen.orientation.unlock) {
      try { window.screen.orientation.unlock() } catch (_) {}
    }
  }

  return (
    <div className="bg-black min-h-screen text-white relative overflow-hidden">
      {!entered && !warping && <BackButton label="Home" state={{ fromCelestial: true }} />}

      {/* ── Warp transition ── */}
      <AnimatePresence>
        {warping && (
          <motion.div
            className="warp-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="warp-tunnel">
              {Array.from({ length: 120 }).map((_, i) => (
                <div
                  key={i}
                  className="warp-star"
                  style={{
                    '--angle':  `${(i / 120) * 360}deg`,
                    '--delay':  `${Math.random() * 0.5}s`,
                    '--length': `${60 + Math.random() * 140}px`,
                    '--offset': `${20 + Math.random() * 30}%`,
                  }}
                />
              ))}
            </div>
            <motion.div
              className="warp-text"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="warp-text-main" style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '0.2em' }}>
                ENTERING CELESTIAL MODE
              </div>
              <div className="warp-text-sub" style={{ fontFamily: "'Fira Code', monospace" }}>
                Calibrating gravitation cores...
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Full-Screen Solar System ── */}
      <AnimatePresence>
        {entered && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SolarSystemScene onClose={handleExit} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Landing ── */}
      {!entered && (
        <>
          <HlsVideo
            src={HLS_URL}
            className="fixed inset-0 w-full h-full object-cover opacity-30"
            style={{ filter: 'saturate(0.3)' }}
          />

          <div className="relative z-10 px-8 lg:px-16 pt-8">
            <div
              className="flex flex-col items-center justify-center text-center"
              style={{ minHeight: '88vh' }}
            >
              {/* Sector badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ fontFamily: "'Fira Code', monospace", fontSize: '9px', color: '#06b6d4', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '12px' }}
              >
                &gt; Sector 7G / Sol System
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(2.5rem,8vw,5rem)', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '16px' }}
              >
                COSMOS SIMULATOR
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{ fontFamily: "'Fira Code', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.45)', maxWidth: '420px', lineHeight: 1.8, letterSpacing: '0.04em', marginBottom: '40px' }}
              >
                Advanced 3D solar system with volumetric GLSL sun, UnrealBloom post-processing,
                planet breakdown engine, and real-time telemetry.
              </motion.p>

              {/* Enter button */}
              <motion.button
                onClick={handleEnter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="enter-space-btn mt-2"
              >
                <span className="enter-space-glow" />
                <span className="enter-space-text" style={{ fontFamily: "'Fira Code', monospace", letterSpacing: '0.15em' }}>
                  INITIALIZE ENGINE
                </span>
                <span className="enter-space-chevrons">
                  <span>›</span><span>›</span><span>›</span>
                </span>
              </motion.button>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl w-full"
              >
                {[
                  { label: 'Planets',   value: '8'        },
                  { label: 'Engine',    value: 'Three.js' },
                  { label: 'Post-FX',   value: 'UnrealBloom' },
                  { label: 'Galaxy',    value: 'Milky Way' },
                ].map(({ label, value }) => (
                  <div key={label} className="liquid-glass rounded-2xl p-5 text-center">
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1.1rem', color: '#fff' }}>{value}</div>
                    <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '8px', color: '#06b6d4', marginTop: '4px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
