import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const TRANSFORMATION_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'

const CREAM = '#E1E0CC'
const CREAM_DIM = 'rgba(225, 224, 204, 0.8)'

const navItems = [
  { label: 'Our Story', href: '#about' },
  { label: 'Work',      href: '#work' },
  { label: 'Labs',      href: '/labs',      internal: true },
  { label: 'Branding',  href: '/branding',  internal: true },
  { label: 'Contact',   href: '/contact',   internal: true },
]

const WORLD_MESSAGES = [
  {
    headline: "Where engineering meets cinematic craft.",
    sub: "(Bold move entering here. Most people just stick to the surface level.)",
    hint: "↓ keep scrolling",
  },
  {
    headline: "You've got an eye for detail.",
    sub: "(Or you're just curious. Either way, you're exactly the type of thinker I build for.)",
    hint: "↓ almost there",
  },
  {
    headline: "The space is yours to explore.",
    sub: "(Systems, labs, and interfaces built for high-leverage founders. Dive in below.)",
    hint: null,
  },
]

export default function TransformedHero({ onBack }) {
  const [index, setIndex] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const lastScrollTime = useRef(0)
  const touchStartY = useRef(0)
  const containerRef = useRef(null)
  const [isInView, setIsInView] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    return () => observer.disconnect()
  }, [])

  // Dedicated effect for scroll locking to prevent overflow styling flashing
  useEffect(() => {
    if (!isDone && isInView) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDone, isInView])

  // Scroll & Touch Event Listeners
  useEffect(() => {
    const handleWheel = (e) => {
      if (isDone || !isInView) return
      
      if (e.deltaY < 0 && index === 0) return

      e.preventDefault()

      const now = Date.now()
      if (now - lastScrollTime.current < 900) return

      if (e.deltaY > 15) {
        if (index < WORLD_MESSAGES.length - 1) {
          setIndex(prev => prev + 1)
          lastScrollTime.current = now
        } else {
          setIsDone(true)
        }
      } else if (e.deltaY < -15) {
        if (index > 0) {
          setIndex(prev => prev - 1)
          lastScrollTime.current = now
        }
      }
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      if (isDone || !isInView) return
      
      const deltaY = touchStartY.current - e.touches[0].clientY
      if (deltaY < 0 && index === 0) return

      e.preventDefault()

      const now = Date.now()
      if (now - lastScrollTime.current < 1000) return

      if (Math.abs(deltaY) > 30) {
        if (deltaY > 0) {
          if (index < WORLD_MESSAGES.length - 1) {
            setIndex(prev => prev + 1)
            lastScrollTime.current = now
          } else {
            setIsDone(true)
          }
        } else {
          if (index > 0) {
            setIndex(prev => prev - 1)
            lastScrollTime.current = now
          }
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [index, isDone, isInView])

  // Auto-finish sequence when we reach the last message to allow natural scrolling
  useEffect(() => {
    let timer;
    if (index === WORLD_MESSAGES.length - 1 && !isDone) {
      timer = setTimeout(() => {
        setIsDone(true)
      }, 1200) // 1.2s delay absorbs any immediate trackpad momentum
    }
    return () => clearTimeout(timer)
  }, [index, isDone])

  const msg = WORLD_MESSAGES[index]

  return (
    <section ref={containerRef} id="home" className="h-screen w-full p-4 md:p-6 bg-black relative">
      <style>{`
        .liquid-glass-nav {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
        }

        @keyframes th-hint-bob {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) translateY(0); }
          50% { opacity: 0.7; transform: translateX(-50%) translateY(5px); }
        }
        .th-hint-bob {
          animation: th-hint-bob 2s ease-in-out infinite;
          position: absolute;
          bottom: 40px;
          left: 50%;
        }
      `}</style>

      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black">
        {/* Video Background */}
        <motion.video
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src={TRANSFORMATION_VIDEO} type="video/mp4" />
        </motion.video>

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)',
          zIndex: 1,
        }} />

        {/* Header / Navbar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-1">
             <span style={{ fontFamily: "'Instrument Serif', serif" }} className="text-3xl text-white tracking-tight">
               HD<sup className="text-[10px] opacity-70">®</sup>
             </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 bg-black/20 backdrop-blur-md rounded-full px-8 py-3 border border-white/5">
            {navItems.map(({ label, href, internal }) => {
              const common = {
                className: 'text-xs uppercase tracking-widest transition-colors',
                style: { color: 'rgba(255,255,255,0.6)', fontFamily: "'Almarai', sans-serif" },
                onMouseEnter: (e) => { e.currentTarget.style.color = '#ffffff' },
                onMouseLeave: (e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)' },
              }
              return internal ? (
                <Link key={label} to={href} {...common}>{label}</Link>
              ) : (
                <a key={label} href={href} {...common}>{label}</a>
              )
            })}
          </nav>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl flex flex-col items-center"
            >
              {/* Buttons ABOVE the headline when on last message */}
              <AnimatePresence>
                {index === WORLD_MESSAGES.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="mb-8 flex flex-wrap justify-center gap-4"
                  >
                    <Link
                      to="/celestial"
                      className="group relative flex items-center gap-3 px-6 py-2.5 rounded-full transition-all duration-500 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        fontFamily: "'Almarai', sans-serif",
                      }}
                    >
                      {/* Cosmic Glow Layer */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_100%)]" />
                      
                      <span className="text-white text-[10px] tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100 transition-all duration-300">
                        Enter Space
                      </span>
                      
                      <div className="relative">
                        <ArrowRight size={12} className="text-white opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </Link>

                    {/* Go Back Button */}
                    <button
                      onClick={onBack}
                      className="group relative flex items-center px-6 py-2.5 rounded-full transition-all duration-500 overflow-hidden border border-white/5 hover:border-white/20 hover:bg-white/5"
                      style={{
                        background: 'transparent',
                        backdropFilter: 'blur(10px)',
                        fontFamily: "'Almarai', sans-serif",
                      }}
                    >
                      <span className="text-white text-[10px] tracking-[0.3em] uppercase opacity-40 group-hover:opacity-80 transition-all duration-300">
                        Go Back
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <h1 style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                color: '#ffffff',
                margin: 0,
                fontWeight: 400
              }}>
                {msg.headline}
              </h1>

              <motion.p
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Almarai', sans-serif",
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: '1.5rem',
                  maxWidth: '700px',
                  marginInline: 'auto',
                  lineHeight: 1.6
                }}
              >
                {msg.sub}
              </motion.p>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Scroll Hint */}
        {msg.hint && !isDone && (
          <div className="th-hint-bob">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">{msg.hint}</span>
              <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
