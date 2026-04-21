import React, { useState, useEffect, useMemo } from 'react'
import { ArrowLeft, X, Maximize2 } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import CoffeeBrewerUI    from '../components/labs/CoffeeBrewerUI'
import EntropyCremaCanvas from '../components/labs/EntropyCremaCanvas'
import BackButton         from '../components/ui/BackButton'

const experiments = [
  {
    id:          'coffee',
    name:        'Coffee Brewer',
    desc:        'Interactive espresso machine simulation — live temperature gauges, liquid physics, steam wand, and audio feedback.',
    icon:        '☕',
    gradient:    'from-amber-500/20 to-orange-600/10',
    accentColor: '#f59e0b',
  },
  {
    id:          'entropy',
    name:        'Entropy Canvas',
    desc:        'Interactive particle system with mouse tracking, gravitational attraction, connection webs, and emergent visual chaos.',
    icon:        '✨',
    gradient:    'from-violet-500/20 to-purple-600/10',
    accentColor: '#8b5cf6',
  },
]

function CosmicBackground() {
  const stars = useMemo(() => Array.from({ length: 80 }).map((_, i) => (
    <div
      key={i}
      className="labs-star"
      style={{
        left:              `${Math.random() * 100}%`,
        top:               `${Math.random() * 100}%`,
        animationDelay:    `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 4}s`,
        width:             `${1 + Math.random() * 2}px`,
        height:            `${1 + Math.random() * 2}px`,
      }}
    />
  )), [])

  return (
    <div className="labs-cosmic-bg">
      {stars}
      <div className="labs-nebula labs-nebula-1" />
      <div className="labs-nebula labs-nebula-2" />
      <div className="labs-nebula labs-nebula-3" />
    </div>
  )
}

import { useTheme } from '../context/ThemeContext'

export default function LabsPage() {
  const { setSplashConfig } = useTheme()
  const [activeExperiment,   setActiveExperiment]   = useState(null)
  // Entropy opens in fullscreen by default
  const [entropyFullscreen,  setEntropyFullscreen]  = useState(false)

  /* Set splash cursor to white for Labs experience */
  useEffect(() => {
    setSplashConfig({ rainbow: false, color: '#ffffff' })
    return () => setSplashConfig({ rainbow: true, color: '#c69603' })
  }, [setSplashConfig])

  /* When entropy is activated — open fullscreen automatically */
  useEffect(() => {
    if (activeExperiment === 'entropy') {
      setEntropyFullscreen(true)
    }
  }, [activeExperiment])

  /* ── Entropy fullscreen view ── */
  if (entropyFullscreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 bg-black"
      >
        {/* Controls */}
        <div style={{ position:'absolute', top:'1rem', left:'1rem', zIndex:10, display:'flex', gap:'8px' }}>
          <button
            onClick={() => { setEntropyFullscreen(false); setActiveExperiment(null) }}
            className="liquid-glass rounded-full px-4 py-2 text-white/60 text-sm hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Labs
          </button>
          <button
            onClick={() => setEntropyFullscreen(false)}
            className="liquid-glass rounded-full px-4 py-2 text-white/60 text-sm hover:text-white transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" /> Exit Fullscreen
          </button>
        </div>
        <EntropyCremaCanvas active fullscreen />
      </motion.div>
    )
  }

  return (
    <div className="bg-black min-h-screen text-white relative overflow-hidden">
      {!activeExperiment && <BackButton label="Home" />}
      <CosmicBackground />

      {/* ── Header ── */}
      <div className="relative z-10 px-6 sm:px-8 lg:px-16 pt-8 pb-4">
        <AnimatePresence mode="wait">
          {!activeExperiment && (
            <motion.div
              key="header"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 md:mb-16"
            >
              <div className="inline-block liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body mb-6">
                Creative Lab
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white tracking-tight leading-[0.9]">
                The Labs.
              </h1>
              <p className="mt-4 text-white/60 font-body font-light text-sm md:text-base max-w-lg mx-auto">
                Live experiments pushing the limits of web technology —
                physics engines, particle systems, and interactive machines.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Selector ── */}
      <AnimatePresence mode="wait">
        {!activeExperiment && (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative z-10 px-6 sm:px-8 lg:px-16 max-w-5xl mx-auto pb-12"
          >
            {/* Experiment Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {experiments.map((exp, i) => (
                <motion.button
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                  onClick={() => setActiveExperiment(exp.id)}
                  className="labs-experiment-card group"
                >
                  <div className="labs-card-accent" style={{ '--accent': exp.accentColor }} />
                  <div className="labs-card-icon">{exp.icon}</div>
                  <h3 className="text-white font-heading italic text-xl mb-2 group-hover:text-white/90">
                    {exp.name}
                  </h3>
                  <p className="text-white/50 font-body font-light text-sm leading-relaxed">
                    {exp.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-white/30 font-body text-xs uppercase tracking-widest group-hover:text-white/50 transition-colors">
                      Launch Experiment →
                    </span>
                    {exp.id === 'entropy' && (
                      <span style={{
                        fontFamily:     '"Barlow",sans-serif',
                        fontSize:       '9px',
                        letterSpacing:  '0.1em',
                        textTransform:  'uppercase',
                        color:          exp.accentColor,
                        border:         `1px solid ${exp.accentColor}44`,
                        padding:        '2px 7px',
                        borderRadius:   '4px',
                      }}>
                        Opens fullscreen
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Active experiment (non-fullscreen — only coffee reaches here) ── */}
      <AnimatePresence mode="wait">
        {activeExperiment && activeExperiment !== 'entropy' && (
          <motion.div
            key="experiment"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 px-4 sm:px-8 lg:px-16 pb-16"
          >
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <button
                onClick={() => setActiveExperiment(null)}
                className="liquid-glass rounded-full px-4 py-2 text-white/60 font-body text-sm hover:text-white transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            </div>

            {/* Coffee brewer — full viewport stage, non-scrollable, beans background */}
            <div
              className="w-full rounded-2xl overflow-hidden coffee-stage relative"
              style={{
                height: 'calc(100vh - 100px)',
                minHeight: 640,
                maxHeight: 'calc(100vh - 100px)',
                background:
                  'radial-gradient(ellipse at 50% 35%, rgba(120,60,20,0.35), transparent 55%), linear-gradient(160deg, #1a0f07, #0a0604)',
              }}
            >
              {/* Premium animated coffee beans backdrop */}
              <div aria-hidden className="coffee-beans-bg" style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
                {Array.from({ length: 22 }).map((_, i) => {
                  const size = 14 + Math.random() * 26
                  return (
                    <span
                      key={i}
                      className="coffee-bean"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${size}px`,
                        height: `${size * 1.45}px`,
                        animationDelay: `${Math.random() * 12}s`,
                        animationDuration: `${18 + Math.random() * 14}s`,
                        opacity: 0.18 + Math.random() * 0.22,
                        transform: `rotate(${Math.random() * 360}deg)`,
                      }}
                    />
                  )
                })}
                {/* Aromatic steam drifts */}
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={`steam-${i}`}
                    className="coffee-aroma"
                    style={{
                      left: `${20 + i * 30}%`,
                      animationDelay: `${i * 2}s`,
                    }}
                  />
                ))}
              </div>
              <div style={{ position:'relative', zIndex:1, width:'100%', height:'100%' }}>
                <CoffeeBrewerUI active />
              </div>
            </div>
            <style>{`
              @media (min-width: 768px) {
                .coffee-stage { height: calc(100vh - 110px) !important; min-height: 640px !important; max-height: calc(100vh - 110px) !important; }
              }
              .coffee-bean {
                position: absolute;
                border-radius: 50%;
                background:
                  radial-gradient(ellipse at 50% 35%, #7a3f1a 0%, #4a2109 55%, #1f0c03 100%);
                box-shadow:
                  inset 0 -2px 6px rgba(0,0,0,0.55),
                  inset 0 2px 4px rgba(255,170,80,0.22),
                  0 6px 16px rgba(0,0,0,0.45);
                animation: beanDrift linear infinite;
                will-change: transform, opacity;
              }
              .coffee-bean::before {
                content: '';
                position: absolute;
                inset: 10% 45%;
                background: linear-gradient(180deg, rgba(10,5,2,0.85), rgba(10,5,2,0.55));
                border-radius: 50%;
                filter: blur(0.4px);
              }
              @keyframes beanDrift {
                0%   { transform: translate3d(0,0,0) rotate(0deg); }
                50%  { transform: translate3d(40px,-60px,0) rotate(180deg); }
                100% { transform: translate3d(0,-120px,0) rotate(360deg); opacity: 0; }
              }
              .coffee-aroma {
                position: absolute;
                bottom: -80px;
                width: 260px; height: 260px;
                border-radius: 50%;
                background: radial-gradient(closest-side, rgba(255,200,120,0.10), transparent 70%);
                filter: blur(30px);
                animation: aromaRise 14s ease-in-out infinite;
                will-change: transform, opacity;
              }
              @keyframes aromaRise {
                0%,100% { transform: translateY(40px) scale(1); opacity: 0; }
                40%     { opacity: 0.9; }
                60%     { transform: translateY(-80vh) scale(1.3); opacity: 0; }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
