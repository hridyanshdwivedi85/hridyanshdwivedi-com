import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import HumorousGreeting from './HumorousGreeting'

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4'

const CREAM = '#E1E0CC'
const CREAM_DIM = 'rgba(225, 224, 204, 0.8)'

const navItems = [
  { label: 'Our Story', href: '#about' },
  { label: 'Work',      href: '#work' },
  { label: 'Labs',      href: '/labs',      internal: true },
  { label: 'Branding',  href: '/branding',  internal: true },
  { label: 'Contact',   href: '/contact',   internal: true },
]

export default function Hero({ onTransform }) {
  const [isSequenceDone, setIsSequenceDone] = useState(false)
  const videoRef = useRef(null)

  // Force autoplay on mobile
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {
        // Fallback for extremely strict browsers
        console.log("Autoplay blocked, waiting for user interaction")
      })
    }
  }, [])

  return (
    <section id="home" className="h-screen w-full p-4 md:p-6 bg-black relative">
      <style>{`
        @keyframes custom-pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(225, 224, 204, 0.4), 0 0 20px rgba(225, 224, 204, 0.2); transform: scale(1); }
          50% { box-shadow: 0 0 25px rgba(225, 224, 204, 0.8), 0 0 40px rgba(225, 224, 204, 0.6); transform: scale(1.05); }
        }
        .hero-magic-btn {
          animation: custom-pulse-glow 2s infinite cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes slide-bounce-left {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        .animate-bounce-right {
          animation: slide-bounce-left 1.5s infinite ease-in-out;
        }
      `}</style>
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black">
        {/* ── Video background ── */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* ── Noise overlay ── */}
        <div className="noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" style={{ zIndex: 1 }} />

        {/* ── Gradient ── */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none"
          style={{ zIndex: 2 }}
        />

        {/* ── Navbar pill ── */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{ zIndex: 20 }}>
          <nav
            className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 whitespace-nowrap"
          >
            {navItems.map(({ label, href, internal }) => {
              const common = {
                className: 'text-[10px] sm:text-xs md:text-sm transition-colors',
                style: { color: CREAM_DIM, fontFamily: "'Almarai', sans-serif" },
                onMouseEnter: (e) => { e.currentTarget.style.color = CREAM },
                onMouseLeave: (e) => { e.currentTarget.style.color = CREAM_DIM },
              }
              return internal ? (
                <Link key={label} to={href} {...common}>{label}</Link>
              ) : (
                <a key={label} href={href} {...common}>{label}</a>
              )
            })}
          </nav>
        </div>
        
        {/* ── Top Right Magic Button ── */}
        <AnimatePresence>
          {isSequenceDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-4"
              style={{ zIndex: 40 }}
            >
              <div 
                className="text-xs md:text-sm italic animate-bounce-right hidden sm:flex items-center gap-2"
                style={{
                  fontFamily: "'Almarai', sans-serif",
                  color: 'rgba(225, 224, 204, 0.75)',
                }}
              >
                Click here to enter Hridyansh's world
                <ArrowRight size={14} className="opacity-80" />
              </div>
              
              <button
                onClick={onTransform}
                className="hero-magic-btn flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-transform hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md"
                style={{
                  background: 'rgba(225, 224, 204, 0.1)',
                  border: `1px solid ${CREAM}`,
                  color: CREAM
                }}
                aria-label="Enter my world"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom content ── */}
        <div
          className="absolute bottom-0 left-0 right-0 grid grid-cols-12 gap-x-2 md:gap-x-4 px-4 md:px-8 pb-4 md:pb-6"
          style={{ zIndex: 10 }}
        >
          {/* Left: giant name (full width on mobile, 8 cols on lg) */}
          <div className="col-span-12 lg:col-span-8">
            <HumorousGreeting onAtLastMessage={(isLast) => setIsSequenceDone(isLast)} />
          </div>

          {/* Right: desc + CTA */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-end gap-4 md:gap-6 pt-4 lg:pt-0">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm md:text-base pointer-events-none"
              style={{
                fontFamily: "'Almarai', sans-serif",
                color: 'rgba(222,219,200,0.7)',
                lineHeight: 1.2,
                maxWidth: 340,
                margin: 0,
              }}
            >
              Crafting production-grade systems and cinematic interfaces for
              founders who treat software as leverage — where engineering
              discipline meets aesthetic intent, and every line compounds into revenue.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href="/dino.html"
                className="group inline-flex items-center gap-2 hover:gap-3 rounded-full pl-5 pr-1.5 py-1.5 transition-[gap] duration-300 text-sm sm:text-base font-medium"
                style={{
                  background: CREAM,
                  color: '#000',
                  fontFamily: "'Almarai', sans-serif",
                  alignSelf: 'flex-start',
                }}
              >
                Wanna Play?
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="w-4 h-4" style={{ color: CREAM }} />
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
